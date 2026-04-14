const { When, Then } = require("@cucumber/cucumber");

// Note: "Given I go to {string}" is already defined in basic.steps.js

When("I click the Introduction nav link", function () {
  browser.waitForElementVisible('button[routerlink="home"]');
  browser.click('button[routerlink="home"]');
});

When("I click the About nav link", function () {
  browser.waitForElementVisible('button[routerlink="about"]');
  browser.click('button[routerlink="about"]');
});

When("I click the Projects nav link", function () {
  browser.waitForElementVisible('button[routerlink="projects"]');
  browser.click('button[routerlink="projects"]');
});

When("I click the Contact nav link", function () {
  browser.waitForElementVisible('button[routerlink="contact"]');
  browser.click('button[routerlink="contact"]');
});

Then("the page header is visible", function () {
  browser.waitForElementVisible("h1");
});

Then("the navigation menu is visible", function () {
  browser.waitForElementVisible("nav.navbar");
});

Then("the URL contains {string}", function (urlFragment) {
  browser.assert.urlContains(urlFragment);
});

Then("project section cards are visible", function () {
  browser.waitForElementVisible(".project-section");
});

Then("the projects page contains {string}", function (text) {
  browser.assert.textContains("body", text);
});

Then("the main content area is present", function () {
  browser.assert.elementPresent("#maincontent");
});

Then("the contact page displays {string}", function (text) {
  browser.assert.textContains("body", text);
});

Then("a mailto link for {string} is present", function (email) {
  browser.assert.elementPresent(`a[href="mailto:${email}"]`);
});
