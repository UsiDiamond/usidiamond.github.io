const { Given, Then } = require("@cucumber/cucumber");

Given("the viewport is {int}x{int}", function (width, height) {
  browser.resizeWindow(width, height);
});

Then("every h1 and h2 stays within the viewport", function () {
  browser.execute(
    function () {
      const out = [];
      const vw = document.documentElement.clientWidth;
      document.querySelectorAll("h1, h2").forEach(function (h, i) {
        const r = h.getBoundingClientRect();
        if (r.left < -1 || r.right > vw + 1) {
          out.push({
            i: i,
            text: (h.textContent || "").trim().slice(0, 60),
            left: r.left,
            right: r.right,
            vw: vw,
          });
        }
      });
      return out;
    },
    [],
    function (result) {
      const violations = (result && result.value) || [];
      if (violations.length > 0) {
        throw new Error(
          "Headings exceed viewport: " + JSON.stringify(violations, null, 2),
        );
      }
    },
  );
});

Then("every diamond-card stays within its column", function () {
  browser.execute(
    function () {
      const out = [];
      document.querySelectorAll(".diamond-card").forEach(function (card, i) {
        const col = card.closest('[class*="col-"]') || card.parentElement;
        if (!col) return;
        const c = card.getBoundingClientRect();
        const p = col.getBoundingClientRect();
        if (c.left < p.left - 1 || c.right > p.right + 1) {
          out.push({
            i: i,
            cardLeft: c.left,
            cardRight: c.right,
            colLeft: p.left,
            colRight: p.right,
          });
        }
      });
      return out;
    },
    [],
    function (result) {
      const violations = (result && result.value) || [];
      if (violations.length > 0) {
        throw new Error(
          "Cards overflow their columns: " +
            JSON.stringify(violations, null, 2),
        );
      }
    },
  );
});

Then("the first page-title heading is horizontally centred", function () {
  browser.execute(
    function () {
      const title = document.querySelector(".row .col-12 h2");
      if (!title) return { skipped: true };
      const r = title.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const titleMid = r.left + r.width / 2;
      return { offset: Math.abs(titleMid - vw / 2), vw: vw };
    },
    [],
    function (result) {
      const v = (result && result.value) || {};
      if (v.skipped) return;
      const tolerance = Math.max(10, v.vw * 0.05);
      if (v.offset > tolerance) {
        throw new Error(
          "Title is not centred: offset " +
            v.offset +
            "px from viewport mid (tolerance " +
            tolerance +
            "px)",
        );
      }
    },
  );
});
