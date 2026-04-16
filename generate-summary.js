#!/usr/bin/env node
/**
 * Generates a GitHub Actions job summary and sticky PR comment from the
 * Cucumber JSON report produced by Nightwatch + Cucumber.
 *
 * Env:
 *   GITHUB_STEP_SUMMARY  – path provided automatically by GitHub Actions
 *   ARTIFACT_URL         – direct URL to the uploaded artifact (optional)
 *   RUN_URL              – link back to the Actions run (optional)
 */

"use strict";

const fs = require("fs");
const path = require("path");

const REPORT_PATH = "integration-tests-report/cucumber-report.json";
const SUMMARY_FILE = process.env.GITHUB_STEP_SUMMARY;
const PR_COMMENT_FILE = "integration-tests-report/pr-comment.md";
const ARTIFACT_URL = process.env.ARTIFACT_URL || "";
const RUN_URL = process.env.RUN_URL || "";

// ── helpers ──────────────────────────────────────────────────────────────────

function ns2s(ns) {
  if (!ns || ns === 0) return "";
  return (ns / 1e9).toFixed(2) + "s";
}

/** Truncate a string and replace newlines for display in a table cell. */
function truncate(str, max = 180) {
  if (!str) return "";
  const flat = str.replace(/\r?\n|\r/g, " ").trim();
  return flat.length > max ? flat.slice(0, max) + "…" : flat;
}

function esc(str) {
  return (str || "").replace(/\|/g, "\\|").replace(/`/g, "'");
}

// ── load report ──────────────────────────────────────────────────────────────

if (!fs.existsSync(REPORT_PATH)) {
  console.log("No cucumber report found at", REPORT_PATH);
  process.exit(0);
}

let features;
try {
  features = JSON.parse(fs.readFileSync(REPORT_PATH, "utf8"));
} catch (e) {
  console.error("Failed to parse cucumber report:", e.message);
  process.exit(1);
}

// ── aggregate counts ──────────────────────────────────────────────────────────

let totalPassed = 0;
let totalFailed = 0;
let totalSkipped = 0;

for (const feature of features) {
  for (const scenario of feature.elements) {
    const failed = scenario.steps.some(
      (s) => s.result && s.result.status === "failed"
    );
    const skipped =
      !failed &&
      scenario.steps.some((s) => s.result && s.result.status === "skipped");
    if (failed) totalFailed++;
    else if (skipped) totalSkipped++;
    else totalPassed++;
  }
}

const totalScenarios = totalPassed + totalFailed + totalSkipped;
const allPassed = totalFailed === 0;

// ── build markdown ────────────────────────────────────────────────────────────

const out = [];

// ── banner ──
const bannerIcon = allPassed ? "✅" : "❌";
const bannerTitle = allPassed
  ? `All ${totalScenarios} scenarios passed`
  : `${totalFailed} of ${totalScenarios} scenarios failed`;

out.push(`## ${bannerIcon} Integration Tests — ${bannerTitle}\n`);
out.push(
  `> **${totalPassed}** passed &nbsp;·&nbsp; **${totalFailed}** failed &nbsp;·&nbsp; **${totalSkipped}** skipped &nbsp;·&nbsp; **${features.length}** feature${features.length === 1 ? "" : "s"}\n`
);
out.push("");

// ── per-feature details ──
for (const feature of features) {
  const featureFailed = feature.elements.some((sc) =>
    sc.steps.some((s) => s.result && s.result.status === "failed")
  );
  const featureIcon = featureFailed ? "❌" : "✅";
  const passed = feature.elements.filter(
    (sc) => !sc.steps.some((s) => s.result && s.result.status === "failed")
  ).length;
  const failed = feature.elements.length - passed;
  const subtitle = featureFailed
    ? ` — ${failed} failed`
    : ` — ${passed} passed`;

  // Failing features are open by default; passing ones are collapsed.
  const openAttr = featureFailed ? " open" : "";
  out.push(
    `<details${openAttr}><summary>${featureIcon} <strong>${esc(feature.name)}</strong>${subtitle} (${feature.elements.length} scenario${feature.elements.length === 1 ? "" : "s"})</summary>\n`
  );
  out.push("");
  out.push("| Scenario | Status | Duration |");
  out.push("|----------|--------|----------|");

  for (const scenario of feature.elements) {
    const failedStep = scenario.steps.find(
      (s) => s.result && s.result.status === "failed"
    );
    const skipped =
      !failedStep &&
      scenario.steps.some((s) => s.result && s.result.status === "skipped");

    let statusCell;
    if (failedStep) {
      const errMsg = truncate(failedStep.result.error_message);
      statusCell = errMsg
        ? `❌ Failed<br><sub><code>${esc(errMsg)}</code></sub>`
        : "❌ Failed";
    } else if (skipped) {
      statusCell = "⏭️ Skipped";
    } else {
      statusCell = "✅ Passed";
    }

    // Total duration = sum of all step durations
    const durationNs = scenario.steps.reduce(
      (acc, s) => acc + (s.result && s.result.duration ? s.result.duration : 0),
      0
    );
    const durationCell = ns2s(durationNs) || "—";

    out.push(
      `| ${esc(scenario.name)} | ${statusCell} | ${durationCell} |`
    );
  }

  out.push("");
  out.push("</details>\n");
}

// ── footer ──
out.push("---\n");

if (ARTIFACT_URL) {
  out.push(
    `📥 [Download HTML report with screenshots](${ARTIFACT_URL})`
  );
} else {
  out.push(
    `📥 Download the \`integration-test-report\` artifact from this run for the full HTML report with screenshots.`
  );
}

if (RUN_URL) {
  out.push(`\n[View workflow run ↗](${RUN_URL})`);
}

const markdown = out.join("\n");

// ── write outputs ─────────────────────────────────────────────────────────────

if (SUMMARY_FILE) {
  fs.appendFileSync(SUMMARY_FILE, markdown + "\n");
  console.log("Summary written to GITHUB_STEP_SUMMARY");
} else {
  console.log("GITHUB_STEP_SUMMARY not set — preview:");
  console.log(markdown);
}

try {
  fs.mkdirSync(path.dirname(PR_COMMENT_FILE), { recursive: true });
  fs.writeFileSync(PR_COMMENT_FILE, markdown + "\n");
  console.log("PR comment written to", PR_COMMENT_FILE);
} catch (e) {
  console.error("Failed to write PR comment file:", e.message);
}
