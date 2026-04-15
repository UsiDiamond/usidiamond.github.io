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

// Canonical pronouns-icon geometry. Kept in sync with the same constant in
// src/app/home/home.component.spec.ts — update both together if the icon is
// intentionally redesigned.
const PRONOUNS_PATH_D =
  "M396.52 174.35c1.35-2.4.21-4.35-2.54-4.35l-48.2.03c-2.75 0-6.15 1.94-7.54 4.31l-118.1 199.77c-16.48 27.15-39.48 33.15-61.58 30.47-37.94-4.6-58.34-32.45-58.34-69.54 0-37.25 30.31-67.56 67.56-67.56h75c2.75 0 6.12-1.95 7.48-4.34l27.03-47.2c1.37-2.39.23-4.34-2.52-4.34h-107c-68.06 0-123.44 55.37-123.44 123.44 0 32.89 12.85 68.36 36.22 91.54 23.03 22.84 53.8 31.21 86.64 31.89 18.54.21 69.46-.21 93.33-42.68 26.73-47.57 136-241.44 136-241.44zM571.94 244.44c-23.03-22.84-53.8-31.21-86.64-31.89-18.54-.21-69.46.21-93.33 42.68-26.72 47.55-136 241.42-136 241.42-1.35 2.4-.21 4.35 2.54 4.35l48.2-.03c2.75 0 6.15-1.94 7.54-4.31l118.1-199.77c16.48-27.15 39.48-33.15 61.58-30.47 37.94 4.6 58.34 32.45 58.34 69.54 0 37.25-30.31 67.56-67.56 67.56h-75c-2.75 0-6.12 1.95-7.48 4.34l-27.03 47.2c-1.37 2.39-.23 4.34 2.52 4.34h107c68.06 0 123.44-55.37 123.44-123.44 0-32.87-12.85-68.34-36.22-91.52z";

Then("the pronouns-page icon is present and not distorted", function () {
  browser.waitForElementVisible("svg.pronouns-svg");
  browser.assert.elementPresent("svg.pronouns-svg path");
  browser.assert.attributeEquals(
    "svg.pronouns-svg",
    "viewBox",
    "0 0 650 650",
  );
  browser.assert.attributeEquals("svg.pronouns-svg", "width", "100");
  browser.assert.attributeEquals(
    "svg.pronouns-svg path",
    "fill",
    "darkgrey",
  );
  browser.assert.attributeEquals(
    "svg.pronouns-svg path",
    "d",
    PRONOUNS_PATH_D,
  );
});
