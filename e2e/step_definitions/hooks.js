const { After } = require("@cucumber/cucumber");
const fs = require("fs");
const path = require("path");

After(async function (scenario) {
  if (typeof browser === "undefined" || browser === null) {
    return;
  }

  const screenshotDir = path.resolve("integration-tests-report", "screenshots");
  try {
    fs.mkdirSync(screenshotDir, { recursive: true });
  } catch (e) {
    return;
  }

  const status = scenario.result ? scenario.result.status : "unknown";
  const safeName = scenario.pickle.name
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .substring(0, 60);
  const filename = `${status}_${safeName}.png`;
  const filepath = path.join(screenshotDir, filename);

  try {
    await browser.saveScreenshot(filepath);
    const imageData = fs.readFileSync(filepath);
    await this.attach(imageData, "image/png");
  } catch (err) {
    console.warn(
      `[hooks] Screenshot failed for "${scenario.pickle.name}": ${err.message}`,
    );
  }
});
