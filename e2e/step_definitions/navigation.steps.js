const { When, Then } = require("@cucumber/cucumber");

// Note: "Given I go to {string}" is already defined in basic.steps.js

const navLabelToRoute = {
  Introduction: "home",
  Projects: "projects",
  Education: "education",
  Volunteering: "volunteering",
  Reading: "reading",
  Contact: "contact",
};

When("I click the {string} nav link", function (label) {
  const route = navLabelToRoute[label] || label.toLowerCase();
  browser.waitForElementVisible(`button[routerlink="${route}"]`);
  browser.click(`button[routerlink="${route}"]`);
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

Then("the main content area is present", function () {
  browser.assert.elementPresent("#maincontent");
});

Then("the page contains {string}", function (text) {
  browser.assert.textContains("body", text);
});

Then("project section cards are visible", function () {
  browser.waitForElementVisible(".project-section");
});

Then("education section cards are visible", function () {
  browser.waitForElementVisible(".education-section");
});

Then("volunteering section cards are visible", function () {
  browser.waitForElementVisible(".volunteering-section");
});

Then("reading section cards are visible", function () {
  browser.waitForElementVisible(".reading-subject-pane");
});

Then("a link to {string} is present", function (urlFragment) {
  browser.assert.elementPresent(`a[href*="${urlFragment}"]`);
});

Then("a mailto link for {string} is present", function (email) {
  browser.assert.elementPresent(`a[href="mailto:${email}"]`);
});
