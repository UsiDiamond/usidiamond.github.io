#!/usr/bin/env node
/**
 * Generates a GitHub Actions job summary that mirrors the Cucumber HTML report.
 * Shows a color-coded table per feature with inline thumbnail screenshots.
 *
 * Usage: node generate-summary.js
 * Env:   GITHUB_STEP_SUMMARY - path to the GitHub Actions summary file
 *        ARTIFACT_URL        - direct URL to the uploaded test report artifact
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");

const REPORT_PATH = "integration-tests-report/cucumber-report.json";
const SCREENSHOTS_DIR = "integration-tests-report/screenshots";
const SUMMARY_FILE = process.env.GITHUB_STEP_SUMMARY;
const ARTIFACT_URL = process.env.ARTIFACT_URL || "";
const THUMB_WIDTH = 300;

// Cucumber HTML report color palette
const COLORS = {
  passed: { bg: "#d4edda", text: "#155724", border: "#c3e6cb" },
  failed: { bg: "#f8d7da", text: "#721c24", border: "#f5c6cb" },
  skipped: { bg: "#fff3cd", text: "#856404", border: "#ffeeba" },
  featurePassed: { bg: "#c3e6cb", text: "#155724" },
  featureFailed: { bg: "#f5c6cb", text: "#721c24" },
};

/** Same sanitisation as hooks.js so names match on disk. */
function toSafeName(name) {
  return name
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .substring(0, 60);
}

/** Find the screenshot saved by Nightwatch (UPPERCASE) or hooks.js (lowercase). */
function findScreenshotFile(scenarioName, status) {
  const safe = toSafeName(scenarioName);
  const candidates = [
    path.join(SCREENSHOTS_DIR, `${status.toUpperCase()}_${safe}.png`),
    path.join(SCREENSHOTS_DIR, `${status.toLowerCase()}_${safe}.png`),
  ];
  return candidates.find((f) => fs.existsSync(f)) || null;
}

/**
 * Resize a PNG to a small JPEG thumbnail via ImageMagick `convert`.
 * Returns base64-encoded JPEG, or null if ImageMagick is unavailable.
 */
function thumbnail(imagePath) {
  const tmp = path.join(
    os.tmpdir(),
    `nw_thumb_${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`
  );
  try {
    const r = spawnSync(
      "convert",
      [imagePath, "-resize", `${THUMB_WIDTH}x`, "-quality", "70", tmp],
      { timeout: 15_000 }
    );
    if (r.status !== 0 || !fs.existsSync(tmp)) return null;
    return fs.readFileSync(tmp).toString("base64");
  } catch {
    return null;
  } finally {
    try {
      fs.unlinkSync(tmp);
    } catch {
      // ignore
    }
  }
}

// ─── Load report ────────────────────────────────────────────────────────────

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

// ─── Build HTML ──────────────────────────────────────────────────────────────

let totalPassed = 0,
  totalFailed = 0,
  totalSkipped = 0;

let html = `
<h2>🥒 Integration Test Results</h2>
<style>
  .nw-table { border-collapse: collapse; width: 100%; margin-bottom: 1.5rem; font-family: system-ui, sans-serif; font-size: 0.9rem; }
  .nw-table th, .nw-table td { padding: 8px 12px; border: 1px solid #dee2e6; vertical-align: top; }
  .nw-table th { text-align: left; }
  .nw-feature { font-weight: 700; font-size: 1rem; }
  .nw-thumb { border-radius: 4px; display: block; max-width: ${THUMB_WIDTH}px; }
  .nw-none { color: #6c757d; font-style: italic; }
</style>
`;

for (const feature of features) {
  const featureFailed = feature.elements.some((s) =>
    s.steps.some((st) => st.result?.status === "failed")
  );
  const fc = featureFailed ? COLORS.featureFailed : COLORS.featurePassed;
  const featureIcon = featureFailed ? "❌" : "✅";

  html += `
<table class="nw-table">
  <thead>
    <tr style="background:${fc.bg};color:${fc.text}">
      <th colspan="3" class="nw-feature">${featureIcon} ${escHtml(feature.name)}</th>
    </tr>
    <tr style="background:#f8f9fa">
      <th>Scenario</th><th>Status</th><th>Last screenshot</th>
    </tr>
  </thead>
  <tbody>`;

  for (const scenario of feature.elements) {
    const failed = scenario.steps.some((s) => s.result?.status === "failed");
    const skipped =
      !failed && scenario.steps.some((s) => s.result?.status === "skipped");
    const statusKey = failed ? "failed" : skipped ? "skipped" : "passed";

    if (statusKey === "passed") totalPassed++;
    else if (statusKey === "failed") totalFailed++;
    else totalSkipped++;

    const c = COLORS[statusKey];
    const statusLabel =
      statusKey === "passed"
        ? "✅ Passed"
        : statusKey === "failed"
          ? "❌ Failed"
          : "⏭️ Skipped";

    // Screenshot cell
    const shotFile = findScreenshotFile(scenario.name, statusKey);
    let shotHtml = `<span class="nw-none">no screenshot</span>`;
    if (shotFile) {
      const b64 = thumbnail(shotFile);
      if (b64) {
        shotHtml = `<img class="nw-thumb" src="data:image/jpeg;base64,${b64}" alt="${escHtml(scenario.name)}" width="${THUMB_WIDTH}">`;
      }
    }

    html += `
    <tr style="background:${c.bg};color:${c.text}">
      <td>${escHtml(scenario.name)}</td>
      <td style="white-space:nowrap"><strong>${statusLabel}</strong></td>
      <td>${shotHtml}</td>
    </tr>`;
  }

  html += `\n  </tbody>\n</table>\n`;
}

// Summary footer
html += `
<p>
  <strong>Summary:</strong>
  ✅ ${totalPassed} passed &nbsp;
  ❌ ${totalFailed} failed &nbsp;
  ⏭️ ${totalSkipped} skipped
</p>`;

if (ARTIFACT_URL) {
  html += `<p>📥 <a href="${ARTIFACT_URL}">Download integration-test-report artifact</a> for the full Cucumber HTML report with embedded screenshots.</p>`;
}

// ─── Write ───────────────────────────────────────────────────────────────────

if (SUMMARY_FILE) {
  fs.appendFileSync(SUMMARY_FILE, html + "\n");
  console.log(
    `Summary written (${Math.round(html.length / 1024)}KB, ` +
      `${totalPassed + totalFailed + totalSkipped} scenarios).`
  );
} else {
  console.log("GITHUB_STEP_SUMMARY not set — local preview:");
  console.log(
    `[${totalPassed} passed, ${totalFailed} failed, ${totalSkipped} skipped | ` +
      `HTML ${Math.round(html.length / 1024)}KB]`
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function escHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
