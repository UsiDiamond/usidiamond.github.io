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
      const { scrollWidth, clientWidth } = result.value;
      // Allow 1px rounding slack on sub-pixel devices.
      browser.assert.ok(
        scrollWidth <= clientWidth + 1,
        `Page overflows horizontally: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`,
      );
    },
  );
});

Then("every h2 inside a diamond-card stays within the card", function () {
  browser.waitForElementVisible(".diamond-card");
  browser.execute(
    function () {
      // For each h2 inside a .diamond-card, walk up to find the card's
      // content box and verify the h2 (or any canvas overlay added by the
      // WebGL text effect) does not extend past the card bounds.
      const violations = [];
      document.querySelectorAll(".diamond-card h2").forEach(function (h2, i) {
        const card = h2.closest(".diamond-card");
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        // Include any canvas overlays appended by the WebGL text service.
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
      const violations = result.value || [];
      browser.assert.ok(
        violations.length === 0,
        "Headings overflow card bounds: " + JSON.stringify(violations, null, 2),
      );
    },
  );
});
