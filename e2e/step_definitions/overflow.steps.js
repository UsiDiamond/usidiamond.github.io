const { Then } = require("@cucumber/cucumber");

Then("the page does not scroll horizontally", function () {
  browser.waitForElementVisible("body");
  browser.execute(
    function () {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    },
    [],
    function (result) {
      const v = (result && result.value) || {};
      if (v.scrollWidth > v.clientWidth + 1) {
        throw new Error(
          "Page overflows horizontally: scrollWidth=" +
            v.scrollWidth +
            ", clientWidth=" +
            v.clientWidth,
        );
      }
    },
  );
});

Then("every h2 inside a diamond-card stays within the card", function () {
  browser.waitForElementVisible(".diamond-card");
  browser.execute(
    function () {
      const violations = [];
      document.querySelectorAll(".diamond-card h2").forEach(function (h2, i) {
        const card = h2.closest(".diamond-card");
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const overlay = h2.querySelector("canvas");
        const rects = overlay
          ? [h2.getBoundingClientRect(), overlay.getBoundingClientRect()]
          : [h2.getBoundingClientRect()];
        rects.forEach(function (r) {
          if (r.right > cardRect.right + 1 || r.left < cardRect.left - 1) {
            violations.push({
              i: i,
              text: (h2.textContent || "").trim().slice(0, 60),
              cardLeft: cardRect.left,
              cardRight: cardRect.right,
              elLeft: r.left,
              elRight: r.right,
            });
          }
        });
      });
      return violations;
    },
    [],
    function (result) {
      const violations = (result && result.value) || [];
      if (violations.length > 0) {
        throw new Error(
          "Headings overflow card bounds: " +
            JSON.stringify(violations, null, 2),
        );
      }
    },
  );
});
