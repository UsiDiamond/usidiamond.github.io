const { When, Then } = require("@cucumber/cucumber");
const { PRONOUNS_PATH_D } = require("../constants");

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
  const selector = `button[routerlink="${route}"]`;
  browser.execute(function () { window.scrollTo(0, 0); });
  browser.waitForElementVisible(selector);
  browser.click(selector);
});

Then("the page header is visible", function () {
  browser.waitForElementVisible("h1");
});

Then("the navigation menu is visible", function () {
  browser.waitForElementVisible('[data-testid="nav-menu"]');
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
  browser.waitForElementVisible('[data-testid="project-card"]');
});

Then("education section cards are visible", function () {
  browser.waitForElementVisible('[data-testid="education-card"]');
});

Then("volunteering section cards are visible", function () {
  browser.waitForElementVisible('[data-testid="volunteering-card"]');
});

Then("reading section cards are visible", function () {
  browser.waitForElementVisible('[data-testid="reading-pane"]');
});

Then("a link to {string} is present", function (urlFragment) {
  browser.assert.elementPresent(`a[href*="${urlFragment}"]`);
});

Then("a mailto link for {string} is present", function (email) {
  browser.assert.elementPresent(`a[href="mailto:${email}"]`);
});

Then("the pronouns-page icon is present and not distorted", function () {
  browser.waitForElementVisible('[data-testid="pronouns-icon"]');
  browser.assert.elementPresent('[data-testid="pronouns-icon"] path');
  browser.assert.attributeEquals('[data-testid="pronouns-icon"]', "width", "100");
  browser.assert.attributeEquals('[data-testid="pronouns-icon"] path', "fill", "darkgrey");
  browser.assert.attributeEquals('[data-testid="pronouns-icon"] path', "d", PRONOUNS_PATH_D);
});
