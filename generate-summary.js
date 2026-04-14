#!/usr/bin/env node
/**
 * Generates a GitHub Actions job summary from the Cucumber JSON report.
 * Writes a markdown table of pass/fail results per scenario, with a link
 * to the uploaded artifact that contains the HTML report with embedded screenshots.
 *
 * Usage: node e2e/generate-summary.js
 * Env:   GITHUB_STEP_SUMMARY - path to the GitHub Actions summary file
 *        ARTIFACT_URL        - direct URL to the uploaded test report artifact
 */

const fs = require("fs");
const path = require("path");

const REPORT_PATH = "integration-tests-report/cucumber-report.json";
const SUMMARY_FILE = process.env.GITHUB_STEP_SUMMARY;
const ARTIFACT_URL = process.env.ARTIFACT_URL || "";

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

const lines = [];
lines.push("## Integration Test Results\n");

let totalPassed = 0;
let totalFailed = 0;
let totalSkipped = 0;

for (const feature of features) {
  const featureFailed = feature.elements.some((scenario) =>
    scenario.steps.some(
      (step) => step.result && step.result.status === "failed"
    )
  );
  const featureIcon = featureFailed ? "❌" : "✅";

  lines.push(`### ${featureIcon} ${feature.name}\n`);
  lines.push("| Scenario | Status | Screenshot |");
  lines.push("|----------|--------|------------|");

  for (const scenario of feature.elements) {
    const failed = scenario.steps.some(
      (step) => step.result && step.result.status === "failed"
    );
    const skipped =
      !failed &&
      scenario.steps.some(
        (step) => step.result && step.result.status === "skipped"
      );

    let statusIcon, statusLabel;
    if (failed) {
      statusIcon = "❌";
      statusLabel = "Failed";
      totalFailed++;
    } else if (skipped) {
      statusIcon = "⏭️";
      statusLabel = "Skipped";
      totalSkipped++;
    } else {
      statusIcon = "✅";
      statusLabel = "Passed";
      totalPassed++;
    }

    // Check if a screenshot was attached to any step
    const hasScreenshot = scenario.steps.some(
      (step) =>
        step.embeddings &&
        step.embeddings.some((e) => e.mime_type === "image/png")
    );
    const screenshotNote = hasScreenshot ? "📸 In report" : "—";

    lines.push(
      `| ${scenario.name} | ${statusIcon} ${statusLabel} | ${screenshotNote} |`
    );
  }

  lines.push("");
}

lines.push("\n---\n");
lines.push(
  `**Summary:** ✅ ${totalPassed} passed &nbsp; ❌ ${totalFailed} failed &nbsp; ⏭️ ${totalSkipped} skipped\n`
);

if (ARTIFACT_URL) {
  lines.push(
    `> 📥 [Download the integration-test-report artifact](${ARTIFACT_URL}) to view the HTML report with screenshots embedded for each scenario.`
  );
} else {
  lines.push(
    `> 📥 Download the \`integration-test-report\` artifact from this workflow run to view the HTML report with screenshots embedded for each scenario.`
  );
}

const summary = lines.join("\n");

if (SUMMARY_FILE) {
  fs.appendFileSync(SUMMARY_FILE, summary + "\n");
  console.log("Summary written to GITHUB_STEP_SUMMARY");
} else {
  console.log("GITHUB_STEP_SUMMARY not set — preview:");
  console.log(summary);
}
