var HomePage = function () {
  this.navigateTo = (urlString) => {
    browser.navigateTo(urlString);
    browser.execute(function () { window.scrollTo(0, 0); });
    browser.waitForElementPresent('#maincontent', 10000);
  };
};

module.exports = { HomePage };
