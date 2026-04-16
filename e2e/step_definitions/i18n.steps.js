const { When, Then } = require("@cucumber/cucumber");

When("the language is set to {string}", function (lang) {
  browser.execute(
    function (code) {
      localStorage.setItem("usidiamond.lang", code);
    },
    [lang],
  );
  browser.refresh();
  browser.waitForElementVisible("body");
});

Then("the bg-toggle label reads {string}", function (expectedText) {
  browser.waitForElementVisible(".bg-toggle__label");
  browser.getText(".bg-toggle__label", function (result) {
    const actual = (result.value || "").trim();
    browser.assert.ok(
      actual === expectedText,
      `Expected bg-toggle label "${expectedText}" but got "${actual}"`,
    );
  });
});

Then("the bg-toggle label does not contain {string}", function (forbidden) {
  browser.getText(".bg-toggle__label", function (result) {
    const actual = result.value || "";
    browser.assert.ok(
      !actual.includes(forbidden),
      `bg-toggle label must not contain "${forbidden}" but got "${actual}"`,
    );
  });
});

Then("the skip link reads {string}", function (expectedText) {
  browser.waitForElementVisible(".skip");
  browser.getText(".skip", function (result) {
    const actual = (result.value || "").trim();
    browser.assert.ok(
      actual === expectedText,
      `Expected skip link text "${expectedText}" but got "${actual}"`,
    );
  });
});

Then("the main content area has focus", function () {
  browser.execute(
    function () {
      const active = document.activeElement;
      return active ? active.id : null;
    },
    [],
    function (result) {
      browser.assert.ok(
        result.value === "maincontent",
        `Expected focus on #maincontent but focused element id was "${result.value}"`,
      );
    },
  );
});
