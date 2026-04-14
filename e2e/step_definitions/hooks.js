const { After } = require("@cucumber/cucumber");
const fs = require("fs");
const path = require("path");

/**
 * After each scenario, take a screenshot and:
 *  1. Save it to integration-tests-report/screenshots/ (used by generate-summary.js)
 *  2. Attach it to the Cucumber JSON so it is embedded inline in the HTML report
 *
 * Two code paths:
 *  - PASSED: use browser.screenshot(false) — the Nightwatch command queue is still active
 *  - FAILED/other: use browser.driver.takeScreenshot() directly, bypassing the Nightwatch
 *    queue which is terminated after an assertion failure (using it would call process.exit())
 */
After(async function (scenario) {
  if (typeof browser === "undefined" || browser === null || !browser.sessionId) {
    return;
  }

  const screenshotDir = path.resolve("integration-tests-report", "screenshots");
  try {
    fs.mkdirSync(screenshotDir, { recursive: true });
  } catch {
    return;
  }

  // @cucumber/cucumber v12 uses uppercase status: PASSED, FAILED, SKIPPED, etc.
  const status = scenario.result?.status ?? "UNKNOWN";
  const safeName = scenario.pickle.name
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .substring(0, 60);
  const filepath = path.join(screenshotDir, `${status}_${safeName}.png`);

  try {
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
      `[hooks] Screenshot failed for "${scenario.pickle.name}": ${err.message}\n`
    );
  }
});
