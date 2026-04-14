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

Then("the page header is visible", function () {
  browser.waitForElementVisible("h1");
});

Then("the navigation menu is visible", function () {
  browser.waitForElementVisible("nav.navbar");
});

Then("the URL contains {string}", function (urlFragment) {
  browser.assert.urlContains(urlFragment);
});
