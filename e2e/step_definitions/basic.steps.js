const { Before, Given, When } = require("@cucumber/cucumber");
const { HomePage } = require("../pages/home.po");

Before(function (scenario, callback) {
  this.homepage = new HomePage();
  callback();
});

Given("I go to {string}", function (string) {
  return this.homepage.navigateTo(string);
});

When("I click on the Skip to Content link", function () {
  browser.click(".skip");
});
