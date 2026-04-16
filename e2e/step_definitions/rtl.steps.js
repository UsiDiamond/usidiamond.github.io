const { When, Then } = require("@cucumber/cucumber");

// ── Set language via LocalStorage (faster than interacting with the select) ──
When("the language is set to {string}", function (langCode) {
  browser.execute(
    function (code) {
      localStorage.setItem("usidiamond.lang", code);
    },
    [langCode],
  );
  // Reload so Angular picks up the stored preference on init.
  browser.refresh();
  browser.waitForElementVisible("body");
});

// ── Every nav-link button text must not overflow its own bounding box ─────────
Then("every nav link text stays within its button", function () {
  browser.execute(
    function () {
      const violations = [];
      document.querySelectorAll(".nav-link").forEach(function (btn, i) {
        const btnRect = btn.getBoundingClientRect();
        if (btnRect.width === 0) return;
        // scrollWidth > offsetWidth means text is clipped/overflowing.
        if (btn.scrollWidth > btn.clientWidth + 2) {
          violations.push({
            i: i,
            text: (btn.textContent || "").trim().slice(0, 60),
            scrollWidth: btn.scrollWidth,
            clientWidth: btn.clientWidth,
          });
        }
      });
      return violations;
    },
    [],
    function (result) {
      const violations = (result && result.value) || [];
      if (violations.length > 0) {
        throw new Error(
          "Nav link text overflows its button: " +
            JSON.stringify(violations, null, 2),
        );
      }
    },
  );
});

// ── bg-toggle must not overlap the language switcher ─────────────────────────
Then(
  "the bg-toggle button does not overlap the language switcher",
  function () {
    browser.execute(
      function () {
        const btn = document.querySelector(".bg-toggle");
        const switcher = document.querySelector(".language-switcher");
        if (!btn || !switcher) return { skipped: true };
        const bR = btn.getBoundingClientRect();
        const sR = switcher.getBoundingClientRect();
        // Two rects overlap when they intersect on both axes.
        const overlapX = bR.left < sR.right + 1 && bR.right > sR.left - 1;
        const overlapY = bR.top < sR.bottom + 1 && bR.bottom > sR.top - 1;
        return {
          overlaps: overlapX && overlapY,
          btn: { left: bR.left, right: bR.right, top: bR.top, bottom: bR.bottom },
          switcher: { left: sR.left, right: sR.right, top: sR.top, bottom: sR.bottom },
        };
      },
      [],
      function (result) {
        const v = (result && result.value) || {};
        if (v.skipped) return;
        if (v.overlaps) {
          throw new Error(
            "bg-toggle overlaps the language switcher: btn=" +
              JSON.stringify(v.btn) +
              " switcher=" +
              JSON.stringify(v.switcher),
          );
        }
      },
    );
  },
);
