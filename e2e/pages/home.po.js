var HomePage = function () {
  this.navigateTo = (urlString) => {
    browser.navigateTo(urlString);
    browser.waitForElementPresent('#maincontent', 10000);
  };
};

module.exports = { HomePage };
