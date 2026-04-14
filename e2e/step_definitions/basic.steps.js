const { Before, Given, When, Then } = require("@cucumber/cucumber");
const { HomePage } = require("../pages/home.po");

Before(function (scenario, callback) {
  this.homepage = new HomePage();
  callback();
});

Given("I go to {string}", function (string) {
  return this.homepage.navigateTo(string);
});

When("I click on the Skip to Content link", function () {
  // The skip link is visually hidden (off-screen at 0,0) so a pointer-based
  // click is intercepted by the element on top. Use JS click instead.
  browser.execute(function () {
    document.querySelector(".skip").click();
  });
});

Then("a skip to content link is present", function () {
  browser.assert.elementPresent(".skip");
});
