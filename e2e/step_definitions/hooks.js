const { Before, After } = require("@cucumber/cucumber");
const fs = require("fs");
const path = require("path");

const SCREENSHOT_DIR = "integration-tests-report/screenshots";

function ensureScreenshotDir() {
  fs.mkdirSync(path.resolve(SCREENSHOT_DIR), { recursive: true });
}

function toSafeName(name) {
  return name
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .substring(0, 60);
}

/**
 * Before each scenario: capture the browser state on entry.
 * Uses the Nightwatch command queue (which is always active at this point).
 * Saves to BEFORE_<safeName>.png and attaches to the Cucumber report for
 * inline embedding in the HTML output.
 */
Before(async function (scenario) {
  if (typeof browser === "undefined" || browser === null || !browser.sessionId) {
    return;
  }

  try {
    ensureScreenshotDir();
    const safeName = toSafeName(scenario.pickle.name);
    const filepath = path.join(SCREENSHOT_DIR, `BEFORE_${safeName}.png`);

    const base64 = await browser.screenshot(false);
    if (base64) {
      const buf = Buffer.from(base64, "base64");
      fs.writeFileSync(filepath, buf);
      await this.attach(buf, "image/png");
    }
  } catch (err) {
    process.stderr.write(
      `[hooks] Before screenshot failed for "${scenario.pickle.name}": ${err.message}\n`
    );
  }
});

/**
 * After each scenario: capture the browser state on exit.
 *
 * Two code paths:
 *  - PASSED: use browser.screenshot(false) — the Nightwatch command queue is still active
 *  - FAILED/other: use browser.driver.takeScreenshot() directly, bypassing the Nightwatch
 *    queue which is terminated after an assertion failure (using it would call process.exit())
 *
 * Saves to <STATUS>_<safeName>.png and attaches to the Cucumber report.
 */
After(async function (scenario) {
  if (typeof browser === "undefined" || browser === null || !browser.sessionId) {
    return;
  }

  try {
    ensureScreenshotDir();

    // @cucumber/cucumber v12 uses uppercase status: PASSED, FAILED, SKIPPED, etc.
    const status = scenario.result?.status ?? "UNKNOWN";
    const safeName = toSafeName(scenario.pickle.name);
    const filepath = path.join(SCREENSHOT_DIR, `${status}_${safeName}.png`);

    let base64;

    if (status === "PASSED") {
      // Queue is still active — use the standard Nightwatch API
      base64 = await browser.screenshot(false);
    } else {
      // Queue was terminated by the assertion failure — go direct to selenium-webdriver
      // to avoid Nightwatch's fatal error handler calling process.exit()
      const driver = browser.driver ?? browser.transport?.driver;
      if (driver && typeof driver.takeScreenshot === "function") {
        base64 = await driver.takeScreenshot();
      }
    }

    if (base64) {
      const buf = Buffer.from(base64, "base64");
      fs.writeFileSync(filepath, buf);
      await this.attach(buf, "image/png");
    }
  } catch (err) {
    process.stderr.write(
      `[hooks] After screenshot failed for "${scenario.pickle.name}": ${err.message}\n`
    );
  }
});
