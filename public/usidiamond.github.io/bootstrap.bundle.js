!(function (V, ot) {
  "object" == typeof exports && typeof module < "u"
    ? (module.exports = ot())
    : "function" == typeof define && define.amd
    ? define(ot)
    : ((V = typeof globalThis < "u" ? globalThis : V || self).bootstrap = ot());
})(this, function () {
  "use strict";
  const V = new Map(),
    ot = {
      set(n, t, e) {
        V.has(n) || V.set(n, new Map());
        const s = V.get(n);
        s.has(t) || 0 === s.size
          ? s.set(t, e)
          : console.error(
              `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                Array.from(s.keys())[0]
              }.`
            );
      },
      get: (n, t) => (V.has(n) && V.get(n).get(t)) || null,
      remove(n, t) {
        if (!V.has(n)) return;
        const e = V.get(n);
        e.delete(t), 0 === e.size && V.delete(n);
      },
    },
    ye = "transitionend",
    dn = (n) => (
      n &&
        window.CSS &&
        window.CSS.escape &&
        (n = n.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)),
      n
    ),
    fn = (n) => {
      n.dispatchEvent(new Event(ye));
    },
    q = (n) =>
      !(!n || "object" != typeof n) &&
      (typeof n.jquery < "u" && (n = n[0]), typeof n.nodeType < "u"),
    tt = (n) =>
      q(n)
        ? n.jquery
          ? n[0]
          : n
        : "string" == typeof n && n.length > 0
        ? document.querySelector(dn(n))
        : null,
    Tt = (n) => {
      if (!q(n) || 0 === n.getClientRects().length) return !1;
      const t =
          "visible" === getComputedStyle(n).getPropertyValue("visibility"),
        e = n.closest("details:not([open])");
      if (!e) return t;
      if (e !== n) {
        const s = n.closest("summary");
        if ((s && s.parentNode !== e) || null === s) return !1;
      }
      return t;
    },
    et = (n) =>
      !(
        n &&
        n.nodeType === Node.ELEMENT_NODE &&
        !n.classList.contains("disabled")
      ) ||
      (typeof n.disabled < "u"
        ? n.disabled
        : n.hasAttribute("disabled") && "false" !== n.getAttribute("disabled")),
    pn = (n) => {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof n.getRootNode) {
        const t = n.getRootNode();
        return t instanceof ShadowRoot ? t : null;
      }
      return n instanceof ShadowRoot
        ? n
        : n.parentNode
        ? pn(n.parentNode)
        : null;
    },
    Jt = () => {},
    _n = () =>
      window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
        ? window.jQuery
        : null,
    we = [],
    H = () => "rtl" === document.documentElement.dir,
    W = (n) => {
      ((n) => {
        "loading" === document.readyState
          ? (we.length ||
              document.addEventListener("DOMContentLoaded", () => {
                for (const t of we) t();
              }),
            we.push(n))
          : n();
      })(() => {
        const t = _n();
        if (t) {
          const e = n.NAME,
            s = t.fn[e];
          (t.fn[e] = n.jQueryInterface),
            (t.fn[e].Constructor = n),
            (t.fn[e].noConflict = () => ((t.fn[e] = s), n.jQueryInterface));
        }
      });
    },
    M = (n, t = [], e = n) => ("function" == typeof n ? n(...t) : e),
    mn = (n, t, e = !0) => {
      if (!e) return void M(n);
      const i =
        ((n) => {
          if (!n) return 0;
          let { transitionDuration: t, transitionDelay: e } =
            window.getComputedStyle(n);
          const s = Number.parseFloat(t),
            i = Number.parseFloat(e);
          return s || i
            ? ((t = t.split(",")[0]),
              (e = e.split(",")[0]),
              1e3 * (Number.parseFloat(t) + Number.parseFloat(e)))
            : 0;
        })(t) + 5;
      let r = !1;
      const o = ({ target: a }) => {
        a === t && ((r = !0), t.removeEventListener(ye, o), M(n));
      };
      t.addEventListener(ye, o),
        setTimeout(() => {
          r || fn(t);
        }, i);
    },
    Oe = (n, t, e, s) => {
      const i = n.length;
      let r = n.indexOf(t);
      return -1 === r
        ? !e && s
          ? n[i - 1]
          : n[0]
        : ((r += e ? 1 : -1),
          s && (r = (r + i) % i),
          n[Math.max(0, Math.min(r, i - 1))]);
    },
    li = /[^.]*(?=\..*)\.|.*/,
    ui = /\..*/,
    hi = /::\d+$/,
    Ce = {};
  let gn = 1;
  const En = { mouseenter: "mouseover", mouseleave: "mouseout" },
    di = new Set([
      "click",
      "dblclick",
      "mouseup",
      "mousedown",
      "contextmenu",
      "mousewheel",
      "DOMMouseScroll",
      "mouseover",
      "mouseout",
      "mousemove",
      "selectstart",
      "selectend",
      "keydown",
      "keypress",
      "keyup",
      "orientationchange",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointerleave",
      "pointercancel",
      "gesturestart",
      "gesturechange",
      "gestureend",
      "focus",
      "blur",
      "change",
      "reset",
      "select",
      "submit",
      "focusin",
      "focusout",
      "load",
      "unload",
      "beforeunload",
      "resize",
      "move",
      "DOMContentLoaded",
      "readystatechange",
      "error",
      "abort",
      "scroll",
    ]);
  function vn(n, t) {
    return (t && `${t}::${gn++}`) || n.uidEvent || gn++;
  }
  function bn(n) {
    const t = vn(n);
    return (n.uidEvent = t), (Ce[t] = Ce[t] || {}), Ce[t];
  }
  function An(n, t, e = null) {
    return Object.values(n).find(
      (s) => s.callable === t && s.delegationSelector === e
    );
  }
  function Tn(n, t, e) {
    const s = "string" == typeof t,
      i = s ? e : t || e;
    let r = wn(n);
    return di.has(r) || (r = n), [s, i, r];
  }
  function yn(n, t, e, s, i) {
    if ("string" != typeof t || !n) return;
    let [r, o, a] = Tn(t, e, s);
    var A;
    t in En &&
      ((A = o),
      (o = function (m) {
        if (
          !m.relatedTarget ||
          (m.relatedTarget !== m.delegateTarget &&
            !m.delegateTarget.contains(m.relatedTarget))
        )
          return A.call(this, m);
      }));
    const l = bn(n),
      h = l[a] || (l[a] = {}),
      u = An(h, o, r ? e : null);
    if (u) return void (u.oneOff = u.oneOff && i);
    const p = vn(o, t.replace(li, "")),
      _ = r
        ? (function pi(n, t, e) {
            return function s(i) {
              const r = n.querySelectorAll(t);
              for (let { target: o } = i; o && o !== this; o = o.parentNode)
                for (const a of r)
                  if (a === o)
                    return (
                      Se(i, { delegateTarget: o }),
                      s.oneOff && c.off(n, i.type, t, e),
                      e.apply(o, [i])
                    );
            };
          })(n, e, o)
        : (function fi(n, t) {
            return function e(s) {
              return (
                Se(s, { delegateTarget: n }),
                e.oneOff && c.off(n, s.type, t),
                t.apply(n, [s])
              );
            };
          })(n, o);
    (_.delegationSelector = r ? e : null),
      (_.callable = o),
      (_.oneOff = i),
      (_.uidEvent = p),
      (h[p] = _),
      n.addEventListener(a, _, r);
  }
  function Ne(n, t, e, s, i) {
    const r = An(t[e], s, i);
    r && (n.removeEventListener(e, r, !!i), delete t[e][r.uidEvent]);
  }
  function _i(n, t, e, s) {
    const i = t[e] || {};
    for (const [r, o] of Object.entries(i))
      r.includes(s) && Ne(n, t, e, o.callable, o.delegationSelector);
  }
  function wn(n) {
    return (n = n.replace(ui, "")), En[n] || n;
  }
  const c = {
    on(n, t, e, s) {
      yn(n, t, e, s, !1);
    },
    one(n, t, e, s) {
      yn(n, t, e, s, !0);
    },
    off(n, t, e, s) {
      if ("string" != typeof t || !n) return;
      const [i, r, o] = Tn(t, e, s),
        a = o !== t,
        l = bn(n),
        h = l[o] || {},
        u = t.startsWith(".");
      if (typeof r < "u") {
        if (!Object.keys(h).length) return;
        Ne(n, l, o, r, i ? e : null);
      } else {
        if (u) for (const p of Object.keys(l)) _i(n, l, p, t.slice(1));
        for (const [p, _] of Object.entries(h)) {
          const f = p.replace(hi, "");
          (!a || t.includes(f)) &&
            Ne(n, l, o, _.callable, _.delegationSelector);
        }
      }
    },
    trigger(n, t, e) {
      if ("string" != typeof t || !n) return null;
      const s = _n();
      let o = null,
        a = !0,
        l = !0,
        h = !1;
      t !== wn(t) &&
        s &&
        ((o = s.Event(t, e)),
        s(n).trigger(o),
        (a = !o.isPropagationStopped()),
        (l = !o.isImmediatePropagationStopped()),
        (h = o.isDefaultPrevented()));
      const u = Se(new Event(t, { bubbles: a, cancelable: !0 }), e);
      return (
        h && u.preventDefault(),
        l && n.dispatchEvent(u),
        u.defaultPrevented && o && o.preventDefault(),
        u
      );
    },
  };
  function Se(n, t = {}) {
    for (const [e, s] of Object.entries(t))
      try {
        n[e] = s;
      } catch {
        Object.defineProperty(n, e, { configurable: !0, get: () => s });
      }
    return n;
  }
  function On(n) {
    if ("true" === n) return !0;
    if ("false" === n) return !1;
    if (n === Number(n).toString()) return Number(n);
    if ("" === n || "null" === n) return null;
    if ("string" != typeof n) return n;
    try {
      return JSON.parse(decodeURIComponent(n));
    } catch {
      return n;
    }
  }
  function De(n) {
    return n.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
  }
  const X = {
    setDataAttribute(n, t, e) {
      n.setAttribute(`data-bs-${De(t)}`, e);
    },
    removeDataAttribute(n, t) {
      n.removeAttribute(`data-bs-${De(t)}`);
    },
    getDataAttributes(n) {
      if (!n) return {};
      const t = {},
        e = Object.keys(n.dataset).filter(
          (s) => s.startsWith("bs") && !s.startsWith("bsConfig")
        );
      for (const s of e) {
        let i = s.replace(/^bs/, "");
        (i = i.charAt(0).toLowerCase() + i.slice(1, i.length)),
          (t[i] = On(n.dataset[s]));
      }
      return t;
    },
    getDataAttribute: (n, t) => On(n.getAttribute(`data-bs-${De(t)}`)),
  };
  class Wt {
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error(
        'You have to implement the static method "NAME", for each component!'
      );
    }
    _getConfig(t) {
      return (
        (t = this._mergeConfigObj(t)),
        (t = this._configAfterMerge(t)),
        this._typeCheckConfig(t),
        t
      );
    }
    _configAfterMerge(t) {
      return t;
    }
    _mergeConfigObj(t, e) {
      const s = q(e) ? X.getDataAttribute(e, "config") : {};
      return {
        ...this.constructor.Default,
        ...("object" == typeof s ? s : {}),
        ...(q(e) ? X.getDataAttributes(e) : {}),
        ...("object" == typeof t ? t : {}),
      };
    }
    _typeCheckConfig(t, e = this.constructor.DefaultType) {
      for (const [s, i] of Object.entries(e)) {
        const r = t[s],
          o = q(r)
            ? "element"
            : null == (n = r)
            ? `${n}`
            : Object.prototype.toString
                .call(n)
                .match(/\s([a-z]+)/i)[1]
                .toLowerCase();
        if (!new RegExp(i).test(o))
          throw new TypeError(
            `${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${o}" but expected type "${i}".`
          );
      }
      var n;
    }
  }
  class Y extends Wt {
    constructor(t, e) {
      super(),
        (t = tt(t)) &&
          ((this._element = t),
          (this._config = this._getConfig(e)),
          ot.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      ot.remove(this._element, this.constructor.DATA_KEY),
        c.off(this._element, this.constructor.EVENT_KEY);
      for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
    }
    _queueCallback(t, e, s = !0) {
      mn(t, e, s);
    }
    _getConfig(t) {
      return (
        (t = this._mergeConfigObj(t, this._element)),
        (t = this._configAfterMerge(t)),
        this._typeCheckConfig(t),
        t
      );
    }
    static getInstance(t) {
      return ot.get(tt(t), this.DATA_KEY);
    }
    static getOrCreateInstance(t, e = {}) {
      return (
        this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
      );
    }
    static get VERSION() {
      return "5.3.2";
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(t) {
      return `${t}${this.EVENT_KEY}`;
    }
  }
  const $e = (n) => {
      let t = n.getAttribute("data-bs-target");
      if (!t || "#" === t) {
        let e = n.getAttribute("href");
        if (!e || (!e.includes("#") && !e.startsWith("."))) return null;
        e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`),
          (t = e && "#" !== e ? dn(e.trim()) : null);
      }
      return t;
    },
    d = {
      find: (n, t = document.documentElement) =>
        [].concat(...Element.prototype.querySelectorAll.call(t, n)),
      findOne: (n, t = document.documentElement) =>
        Element.prototype.querySelector.call(t, n),
      children: (n, t) => [].concat(...n.children).filter((e) => e.matches(t)),
      parents(n, t) {
        const e = [];
        let s = n.parentNode.closest(t);
        for (; s; ) e.push(s), (s = s.parentNode.closest(t));
        return e;
      },
      prev(n, t) {
        let e = n.previousElementSibling;
        for (; e; ) {
          if (e.matches(t)) return [e];
          e = e.previousElementSibling;
        }
        return [];
      },
      next(n, t) {
        let e = n.nextElementSibling;
        for (; e; ) {
          if (e.matches(t)) return [e];
          e = e.nextElementSibling;
        }
        return [];
      },
      focusableChildren(n) {
        const t = [
          "a",
          "button",
          "input",
          "textarea",
          "select",
          "details",
          "[tabindex]",
          '[contenteditable="true"]',
        ]
          .map((e) => `${e}:not([tabindex^="-"])`)
          .join(",");
        return this.find(t, n).filter((e) => !et(e) && Tt(e));
      },
      getSelectorFromElement(n) {
        const t = $e(n);
        return t && d.findOne(t) ? t : null;
      },
      getElementFromSelector(n) {
        const t = $e(n);
        return t ? d.findOne(t) : null;
      },
      getMultipleElementsFromSelector(n) {
        const t = $e(n);
        return t ? d.find(t) : [];
      },
    },
    te = (n, t = "hide") => {
      const s = n.NAME;
      c.on(
        document,
        `click.dismiss${n.EVENT_KEY}`,
        `[data-bs-dismiss="${s}"]`,
        function (i) {
          if (
            (["A", "AREA"].includes(this.tagName) && i.preventDefault(),
            et(this))
          )
            return;
          const r = d.getElementFromSelector(this) || this.closest(`.${s}`);
          n.getOrCreateInstance(r)[t]();
        }
      );
    },
    Cn = ".bs.alert",
    Ei = `close${Cn}`,
    vi = `closed${Cn}`;
  class Kt extends Y {
    static get NAME() {
      return "alert";
    }
    close() {
      if (c.trigger(this._element, Ei).defaultPrevented) return;
      this._element.classList.remove("show");
      const e = this._element.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(), this._element, e);
    }
    _destroyElement() {
      this._element.remove(), c.trigger(this._element, vi), this.dispose();
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Kt.getOrCreateInstance(this);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
            throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  te(Kt, "close"), W(Kt);
  const Nn = '[data-bs-toggle="button"]';
  class Bt extends Y {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute(
        "aria-pressed",
        this._element.classList.toggle("active")
      );
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Bt.getOrCreateInstance(this);
        "toggle" === t && e[t]();
      });
    }
  }
  c.on(document, "click.bs.button.data-api", Nn, (n) => {
    n.preventDefault();
    const t = n.target.closest(Nn);
    Bt.getOrCreateInstance(t).toggle();
  }),
    W(Bt);
  const yt = ".bs.swipe",
    Si = `touchstart${yt}`,
    Di = `touchmove${yt}`,
    $i = `touchend${yt}`,
    Li = `pointerdown${yt}`,
    Ii = `pointerup${yt}`,
    ki = { endCallback: null, leftCallback: null, rightCallback: null },
    Vi = {
      endCallback: "(function|null)",
      leftCallback: "(function|null)",
      rightCallback: "(function|null)",
    };
  class ee extends Wt {
    constructor(t, e) {
      super(),
        (this._element = t),
        t &&
          ee.isSupported() &&
          ((this._config = this._getConfig(e)),
          (this._deltaX = 0),
          (this._supportPointerEvents = !!window.PointerEvent),
          this._initEvents());
    }
    static get Default() {
      return ki;
    }
    static get DefaultType() {
      return Vi;
    }
    static get NAME() {
      return "swipe";
    }
    dispose() {
      c.off(this._element, yt);
    }
    _start(t) {
      this._supportPointerEvents
        ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX)
        : (this._deltaX = t.touches[0].clientX);
    }
    _end(t) {
      this._eventIsPointerPenTouch(t) &&
        (this._deltaX = t.clientX - this._deltaX),
        this._handleSwipe(),
        M(this._config.endCallback);
    }
    _move(t) {
      this._deltaX =
        t.touches && t.touches.length > 1
          ? 0
          : t.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const t = Math.abs(this._deltaX);
      if (t <= 40) return;
      const e = t / this._deltaX;
      (this._deltaX = 0),
        e && M(e > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      this._supportPointerEvents
        ? (c.on(this._element, Li, (t) => this._start(t)),
          c.on(this._element, Ii, (t) => this._end(t)),
          this._element.classList.add("pointer-event"))
        : (c.on(this._element, Si, (t) => this._start(t)),
          c.on(this._element, Di, (t) => this._move(t)),
          c.on(this._element, $i, (t) => this._end(t)));
    }
    _eventIsPointerPenTouch(t) {
      return (
        this._supportPointerEvents &&
        ("pen" === t.pointerType || "touch" === t.pointerType)
      );
    }
    static isSupported() {
      return (
        "ontouchstart" in document.documentElement ||
        navigator.maxTouchPoints > 0
      );
    }
  }
  const nt = ".bs.carousel",
    Sn = ".data-api",
    Yt = "next",
    wt = "prev",
    Ot = "left",
    ne = "right",
    Yi = `slide${nt}`,
    Le = `slid${nt}`,
    ji = `keydown${nt}`,
    Fi = `mouseenter${nt}`,
    Ui = `mouseleave${nt}`,
    zi = `dragstart${nt}`,
    Gi = `load${nt}${Sn}`,
    qi = `click${nt}${Sn}`,
    Dn = "carousel",
    se = "active",
    $n = ".active",
    Ln = ".carousel-item",
    er = $n + Ln,
    or = { ArrowLeft: ne, ArrowRight: Ot },
    ar = {
      interval: 5e3,
      keyboard: !0,
      pause: "hover",
      ride: !1,
      touch: !0,
      wrap: !0,
    },
    cr = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      pause: "(string|boolean)",
      ride: "(boolean|string)",
      touch: "boolean",
      wrap: "boolean",
    };
  class Ct extends Y {
    constructor(t, e) {
      super(t, e),
        (this._interval = null),
        (this._activeElement = null),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this._swipeHelper = null),
        (this._indicatorsElement = d.findOne(
          ".carousel-indicators",
          this._element
        )),
        this._addEventListeners(),
        this._config.ride === Dn && this.cycle();
    }
    static get Default() {
      return ar;
    }
    static get DefaultType() {
      return cr;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(Yt);
    }
    nextWhenVisible() {
      !document.hidden && Tt(this._element) && this.next();
    }
    prev() {
      this._slide(wt);
    }
    pause() {
      this._isSliding && fn(this._element), this._clearInterval();
    }
    cycle() {
      this._clearInterval(),
        this._updateInterval(),
        (this._interval = setInterval(
          () => this.nextWhenVisible(),
          this._config.interval
        ));
    }
    _maybeEnableCycle() {
      if (this._config.ride) {
        if (this._isSliding)
          return void c.one(this._element, Le, () => this.cycle());
        this.cycle();
      }
    }
    to(t) {
      const e = this._getItems();
      if (t > e.length - 1 || t < 0) return;
      if (this._isSliding)
        return void c.one(this._element, Le, () => this.to(t));
      const s = this._getItemIndex(this._getActive());
      s !== t && this._slide(t > s ? Yt : wt, e[t]);
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(t) {
      return (t.defaultInterval = t.interval), t;
    }
    _addEventListeners() {
      this._config.keyboard && c.on(this._element, ji, (t) => this._keydown(t)),
        "hover" === this._config.pause &&
          (c.on(this._element, Fi, () => this.pause()),
          c.on(this._element, Ui, () => this._maybeEnableCycle())),
        this._config.touch &&
          ee.isSupported() &&
          this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      for (const s of d.find(".carousel-item img", this._element))
        c.on(s, zi, (i) => i.preventDefault());
      this._swipeHelper = new ee(this._element, {
        leftCallback: () => this._slide(this._directionToOrder(Ot)),
        rightCallback: () => this._slide(this._directionToOrder(ne)),
        endCallback: () => {
          "hover" === this._config.pause &&
            (this.pause(),
            this.touchTimeout && clearTimeout(this.touchTimeout),
            (this.touchTimeout = setTimeout(
              () => this._maybeEnableCycle(),
              500 + this._config.interval
            )));
        },
      });
    }
    _keydown(t) {
      if (/input|textarea/i.test(t.target.tagName)) return;
      const e = or[t.key];
      e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
    }
    _getItemIndex(t) {
      return this._getItems().indexOf(t);
    }
    _setActiveIndicatorElement(t) {
      if (!this._indicatorsElement) return;
      const e = d.findOne($n, this._indicatorsElement);
      e.classList.remove(se), e.removeAttribute("aria-current");
      const s = d.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
      s && (s.classList.add(se), s.setAttribute("aria-current", "true"));
    }
    _updateInterval() {
      const t = this._activeElement || this._getActive();
      if (!t) return;
      const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
      this._config.interval = e || this._config.defaultInterval;
    }
    _slide(t, e = null) {
      if (this._isSliding) return;
      const s = this._getActive(),
        i = t === Yt,
        r = e || Oe(this._getItems(), s, i, this._config.wrap);
      if (r === s) return;
      const o = this._getItemIndex(r),
        a = (f) =>
          c.trigger(this._element, f, {
            relatedTarget: r,
            direction: this._orderToDirection(t),
            from: this._getItemIndex(s),
            to: o,
          });
      if (a(Yi).defaultPrevented || !s || !r) return;
      const h = !!this._interval;
      this.pause(),
        (this._isSliding = !0),
        this._setActiveIndicatorElement(o),
        (this._activeElement = r);
      const u = i ? "carousel-item-start" : "carousel-item-end",
        p = i ? "carousel-item-next" : "carousel-item-prev";
      r.classList.add(p),
        s.classList.add(u),
        r.classList.add(u),
        this._queueCallback(
          () => {
            r.classList.remove(u, p),
              r.classList.add(se),
              s.classList.remove(se, p, u),
              (this._isSliding = !1),
              a(Le);
          },
          s,
          this._isAnimated()
        ),
        h && this.cycle();
    }
    _isAnimated() {
      return this._element.classList.contains("slide");
    }
    _getActive() {
      return d.findOne(er, this._element);
    }
    _getItems() {
      return d.find(Ln, this._element);
    }
    _clearInterval() {
      this._interval &&
        (clearInterval(this._interval), (this._interval = null));
    }
    _directionToOrder(t) {
      return H() ? (t === Ot ? wt : Yt) : t === Ot ? Yt : wt;
    }
    _orderToDirection(t) {
      return H() ? (t === wt ? Ot : ne) : t === wt ? ne : Ot;
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Ct.getOrCreateInstance(this, t);
        if ("number" != typeof t) {
          if ("string" == typeof t) {
            if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
              throw new TypeError(`No method named "${t}"`);
            e[t]();
          }
        } else e.to(t);
      });
    }
  }
  c.on(document, qi, "[data-bs-slide], [data-bs-slide-to]", function (n) {
    const t = d.getElementFromSelector(this);
    if (!t || !t.classList.contains(Dn)) return;
    n.preventDefault();
    const e = Ct.getOrCreateInstance(t),
      s = this.getAttribute("data-bs-slide-to");
    return s
      ? (e.to(s), void e._maybeEnableCycle())
      : "next" === X.getDataAttribute(this, "slide")
      ? (e.next(), void e._maybeEnableCycle())
      : (e.prev(), void e._maybeEnableCycle());
  }),
    c.on(window, Gi, () => {
      const n = d.find('[data-bs-ride="carousel"]');
      for (const t of n) Ct.getOrCreateInstance(t);
    }),
    W(Ct);
  const jt = ".bs.collapse",
    hr = `show${jt}`,
    dr = `shown${jt}`,
    fr = `hide${jt}`,
    pr = `hidden${jt}`,
    _r = `click${jt}.data-api`,
    Ie = "show",
    Nt = "collapse",
    ie = "collapsing",
    gr = `:scope .${Nt} .${Nt}`,
    Me = '[data-bs-toggle="collapse"]',
    Tr = { parent: null, toggle: !0 },
    yr = { parent: "(null|element)", toggle: "boolean" };
  class St extends Y {
    constructor(t, e) {
      super(t, e), (this._isTransitioning = !1), (this._triggerArray = []);
      const s = d.find(Me);
      for (const i of s) {
        const r = d.getSelectorFromElement(i),
          o = d.find(r).filter((a) => a === this._element);
        null !== r && o.length && this._triggerArray.push(i);
      }
      this._initializeChildren(),
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
        this._config.toggle && this.toggle();
    }
    static get Default() {
      return Tr;
    }
    static get DefaultType() {
      return yr;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._isShown()) return;
      let t = [];
      if (
        (this._config.parent &&
          (t = this._getFirstLevelChildren(
            ".collapse.show, .collapse.collapsing"
          )
            .filter((a) => a !== this._element)
            .map((a) => St.getOrCreateInstance(a, { toggle: !1 }))),
        (t.length && t[0]._isTransitioning) ||
          c.trigger(this._element, hr).defaultPrevented)
      )
        return;
      for (const a of t) a.hide();
      const s = this._getDimension();
      this._element.classList.remove(Nt),
        this._element.classList.add(ie),
        (this._element.style[s] = 0),
        this._addAriaAndCollapsedClass(this._triggerArray, !0),
        (this._isTransitioning = !0);
      const o = `scroll${s[0].toUpperCase() + s.slice(1)}`;
      this._queueCallback(
        () => {
          (this._isTransitioning = !1),
            this._element.classList.remove(ie),
            this._element.classList.add(Nt, Ie),
            (this._element.style[s] = ""),
            c.trigger(this._element, dr);
        },
        this._element,
        !0
      ),
        (this._element.style[s] = `${this._element[o]}px`);
    }
    hide() {
      if (
        this._isTransitioning ||
        !this._isShown() ||
        c.trigger(this._element, fr).defaultPrevented
      )
        return;
      const e = this._getDimension();
      (this._element.style[e] = `${
        this._element.getBoundingClientRect()[e]
      }px`),
        this._element.classList.add(ie),
        this._element.classList.remove(Nt, Ie);
      for (const i of this._triggerArray) {
        const r = d.getElementFromSelector(i);
        r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
      }
      (this._isTransitioning = !0),
        (this._element.style[e] = ""),
        this._queueCallback(
          () => {
            (this._isTransitioning = !1),
              this._element.classList.remove(ie),
              this._element.classList.add(Nt),
              c.trigger(this._element, pr);
          },
          this._element,
          !0
        );
    }
    _isShown(t = this._element) {
      return t.classList.contains(Ie);
    }
    _configAfterMerge(t) {
      return (t.toggle = !!t.toggle), (t.parent = tt(t.parent)), t;
    }
    _getDimension() {
      return this._element.classList.contains("collapse-horizontal")
        ? "width"
        : "height";
    }
    _initializeChildren() {
      if (!this._config.parent) return;
      const t = this._getFirstLevelChildren(Me);
      for (const e of t) {
        const s = d.getElementFromSelector(e);
        s && this._addAriaAndCollapsedClass([e], this._isShown(s));
      }
    }
    _getFirstLevelChildren(t) {
      const e = d.find(gr, this._config.parent);
      return d.find(t, this._config.parent).filter((s) => !e.includes(s));
    }
    _addAriaAndCollapsedClass(t, e) {
      if (t.length)
        for (const s of t)
          s.classList.toggle("collapsed", !e),
            s.setAttribute("aria-expanded", e);
    }
    static jQueryInterface(t) {
      const e = {};
      return (
        "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1),
        this.each(function () {
          const s = St.getOrCreateInstance(this, e);
          if ("string" == typeof t) {
            if (typeof s[t] > "u")
              throw new TypeError(`No method named "${t}"`);
            s[t]();
          }
        })
      );
    }
  }
  c.on(document, _r, Me, function (n) {
    ("A" === n.target.tagName ||
      (n.delegateTarget && "A" === n.delegateTarget.tagName)) &&
      n.preventDefault();
    for (const t of d.getMultipleElementsFromSelector(this))
      St.getOrCreateInstance(t, { toggle: !1 }).toggle();
  }),
    W(St);
  var $ = "top",
    P = "bottom",
    R = "right",
    L = "left",
    re = "auto",
    Dt = [$, P, R, L],
    at = "start",
    $t = "end",
    In = "clippingParents",
    Pe = "viewport",
    Lt = "popper",
    Mn = "reference",
    Re = Dt.reduce(function (n, t) {
      return n.concat([t + "-" + at, t + "-" + $t]);
    }, []),
    xe = [].concat(Dt, [re]).reduce(function (n, t) {
      return n.concat([t, t + "-" + at, t + "-" + $t]);
    }, []),
    Pn = "beforeRead",
    xn = "afterRead",
    kn = "beforeMain",
    Hn = "afterMain",
    Wn = "beforeWrite",
    Bn = "afterWrite",
    Yn = [Pn, "read", xn, kn, "main", Hn, Wn, "write", Bn];
  function z(n) {
    return n ? (n.nodeName || "").toLowerCase() : null;
  }
  function x(n) {
    if (null == n) return window;
    if ("[object Window]" !== n.toString()) {
      var t = n.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return n;
  }
  function ct(n) {
    return n instanceof x(n).Element || n instanceof Element;
  }
  function K(n) {
    return n instanceof x(n).HTMLElement || n instanceof HTMLElement;
  }
  function ke(n) {
    return (
      !(typeof ShadowRoot > "u") &&
      (n instanceof x(n).ShadowRoot || n instanceof ShadowRoot)
    );
  }
  const Ve = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function wr(n) {
      var t = n.state;
      Object.keys(t.elements).forEach(function (e) {
        var s = t.styles[e] || {},
          i = t.attributes[e] || {},
          r = t.elements[e];
        !K(r) ||
          !z(r) ||
          (Object.assign(r.style, s),
          Object.keys(i).forEach(function (o) {
            var a = i[o];
            !1 === a
              ? r.removeAttribute(o)
              : r.setAttribute(o, !0 === a ? "" : a);
          }));
      });
    },
    effect: function Or(n) {
      var t = n.state,
        e = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, e.popper),
        (t.styles = e),
        t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow),
        function () {
          Object.keys(t.elements).forEach(function (s) {
            var i = t.elements[s],
              r = t.attributes[s] || {},
              a = Object.keys(
                t.styles.hasOwnProperty(s) ? t.styles[s] : e[s]
              ).reduce(function (l, h) {
                return (l[h] = ""), l;
              }, {});
            !K(i) ||
              !z(i) ||
              (Object.assign(i.style, a),
              Object.keys(r).forEach(function (l) {
                i.removeAttribute(l);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  function G(n) {
    return n.split("-")[0];
  }
  var lt = Math.max,
    oe = Math.min,
    It = Math.round;
  function He() {
    var n = navigator.userAgentData;
    return null != n && n.brands && Array.isArray(n.brands)
      ? n.brands
          .map(function (t) {
            return t.brand + "/" + t.version;
          })
          .join(" ")
      : navigator.userAgent;
  }
  function jn() {
    return !/^((?!chrome|android).)*safari/i.test(He());
  }
  function Mt(n, t, e) {
    void 0 === t && (t = !1), void 0 === e && (e = !1);
    var s = n.getBoundingClientRect(),
      i = 1,
      r = 1;
    t &&
      K(n) &&
      ((i = (n.offsetWidth > 0 && It(s.width) / n.offsetWidth) || 1),
      (r = (n.offsetHeight > 0 && It(s.height) / n.offsetHeight) || 1));
    var a = (ct(n) ? x(n) : window).visualViewport,
      l = !jn() && e,
      h = (s.left + (l && a ? a.offsetLeft : 0)) / i,
      u = (s.top + (l && a ? a.offsetTop : 0)) / r,
      p = s.width / i,
      _ = s.height / r;
    return {
      width: p,
      height: _,
      top: u,
      right: h + p,
      bottom: u + _,
      left: h,
      x: h,
      y: u,
    };
  }
  function We(n) {
    var t = Mt(n),
      e = n.offsetWidth,
      s = n.offsetHeight;
    return (
      Math.abs(t.width - e) <= 1 && (e = t.width),
      Math.abs(t.height - s) <= 1 && (s = t.height),
      { x: n.offsetLeft, y: n.offsetTop, width: e, height: s }
    );
  }
  function Fn(n, t) {
    var e = t.getRootNode && t.getRootNode();
    if (n.contains(t)) return !0;
    if (e && ke(e)) {
      var s = t;
      do {
        if (s && n.isSameNode(s)) return !0;
        s = s.parentNode || s.host;
      } while (s);
    }
    return !1;
  }
  function Q(n) {
    return x(n).getComputedStyle(n);
  }
  function Cr(n) {
    return ["table", "td", "th"].indexOf(z(n)) >= 0;
  }
  function st(n) {
    return (
      (ct(n) ? n.ownerDocument : n.document) || window.document
    ).documentElement;
  }
  function ae(n) {
    return "html" === z(n)
      ? n
      : n.assignedSlot || n.parentNode || (ke(n) ? n.host : null) || st(n);
  }
  function Un(n) {
    return K(n) && "fixed" !== Q(n).position ? n.offsetParent : null;
  }
  function Ft(n) {
    for (var t = x(n), e = Un(n); e && Cr(e) && "static" === Q(e).position; )
      e = Un(e);
    return e &&
      ("html" === z(e) || ("body" === z(e) && "static" === Q(e).position))
      ? t
      : e ||
          (function Nr(n) {
            var t = /firefox/i.test(He());
            if (/Trident/i.test(He()) && K(n) && "fixed" === Q(n).position)
              return null;
            var i = ae(n);
            for (
              ke(i) && (i = i.host);
              K(i) && ["html", "body"].indexOf(z(i)) < 0;

            ) {
              var r = Q(i);
              if (
                "none" !== r.transform ||
                "none" !== r.perspective ||
                "paint" === r.contain ||
                -1 !== ["transform", "perspective"].indexOf(r.willChange) ||
                (t && "filter" === r.willChange) ||
                (t && r.filter && "none" !== r.filter)
              )
                return i;
              i = i.parentNode;
            }
            return null;
          })(n) ||
          t;
  }
  function Ke(n) {
    return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
  }
  function Ut(n, t, e) {
    return lt(n, oe(t, e));
  }
  function Gn(n) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, n);
  }
  function qn(n, t) {
    return t.reduce(function (e, s) {
      return (e[s] = n), e;
    }, {});
  }
  const Xn = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function $r(n) {
      var t,
        e = n.state,
        s = n.name,
        i = n.options,
        r = e.elements.arrow,
        o = e.modifiersData.popperOffsets,
        a = G(e.placement),
        l = Ke(a),
        u = [L, R].indexOf(a) >= 0 ? "height" : "width";
      if (r && o) {
        var p = (function (t, e) {
            return Gn(
              "number" !=
                typeof (t =
                  "function" == typeof t
                    ? t(Object.assign({}, e.rects, { placement: e.placement }))
                    : t)
                ? t
                : qn(t, Dt)
            );
          })(i.padding, e),
          _ = We(r),
          f = "y" === l ? $ : L,
          A = "y" === l ? P : R,
          m =
            e.rects.reference[u] +
            e.rects.reference[l] -
            o[l] -
            e.rects.popper[u],
          E = o[l] - e.rects.reference[l],
          T = Ft(r),
          w = T ? ("y" === l ? T.clientHeight || 0 : T.clientWidth || 0) : 0,
          b = w / 2 - _[u] / 2 + (m / 2 - E / 2),
          y = Ut(p[f], b, w - _[u] - p[A]);
        e.modifiersData[s] = (((t = {})[l] = y), (t.centerOffset = y - b), t);
      }
    },
    effect: function Lr(n) {
      var t = n.state,
        s = n.options.element,
        i = void 0 === s ? "[data-popper-arrow]" : s;
      null != i &&
        (("string" == typeof i && !(i = t.elements.popper.querySelector(i))) ||
          (Fn(t.elements.popper, i) && (t.elements.arrow = i)));
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function Pt(n) {
    return n.split("-")[1];
  }
  var Ir = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function Qn(n) {
    var t,
      e = n.popper,
      s = n.popperRect,
      i = n.placement,
      r = n.variation,
      o = n.offsets,
      a = n.position,
      l = n.gpuAcceleration,
      h = n.adaptive,
      u = n.roundOffsets,
      p = n.isFixed,
      _ = o.x,
      f = void 0 === _ ? 0 : _,
      A = o.y,
      m = void 0 === A ? 0 : A,
      E = "function" == typeof u ? u({ x: f, y: m }) : { x: f, y: m };
    (f = E.x), (m = E.y);
    var T = o.hasOwnProperty("x"),
      w = o.hasOwnProperty("y"),
      O = L,
      g = $,
      v = window;
    if (h) {
      var b = Ft(e),
        y = "clientHeight",
        S = "clientWidth";
      b === x(e) &&
        "static" !== Q((b = st(e))).position &&
        "absolute" === a &&
        ((y = "scrollHeight"), (S = "scrollWidth")),
        (i === $ || ((i === L || i === R) && r === $t)) &&
          ((g = P),
          (m -=
            (p && b === v && v.visualViewport
              ? v.visualViewport.height
              : b[y]) - s.height),
          (m *= l ? 1 : -1)),
        (i !== L && ((i !== $ && i !== P) || r !== $t)) ||
          ((O = R),
          (f -=
            (p && b === v && v.visualViewport ? v.visualViewport.width : b[S]) -
            s.width),
          (f *= l ? 1 : -1));
    }
    var I,
      D = Object.assign({ position: a }, h && Ir),
      F =
        !0 === u
          ? (function Mr(n, t) {
              var s = n.y,
                i = t.devicePixelRatio || 1;
              return { x: It(n.x * i) / i || 0, y: It(s * i) / i || 0 };
            })({ x: f, y: m }, x(e))
          : { x: f, y: m };
    return (
      (f = F.x),
      (m = F.y),
      Object.assign(
        {},
        D,
        l
          ? (((I = {})[g] = w ? "0" : ""),
            (I[O] = T ? "0" : ""),
            (I.transform =
              (v.devicePixelRatio || 1) <= 1
                ? "translate(" + f + "px, " + m + "px)"
                : "translate3d(" + f + "px, " + m + "px, 0)"),
            I)
          : (((t = {})[g] = w ? m + "px" : ""),
            (t[O] = T ? f + "px" : ""),
            (t.transform = ""),
            t)
      )
    );
  }
  const Be = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: function Pr(n) {
      var t = n.state,
        e = n.options,
        s = e.gpuAcceleration,
        i = void 0 === s || s,
        r = e.adaptive,
        o = void 0 === r || r,
        a = e.roundOffsets,
        l = void 0 === a || a,
        h = {
          placement: G(t.placement),
          variation: Pt(t.placement),
          popper: t.elements.popper,
          popperRect: t.rects.popper,
          gpuAcceleration: i,
          isFixed: "fixed" === t.options.strategy,
        };
      null != t.modifiersData.popperOffsets &&
        (t.styles.popper = Object.assign(
          {},
          t.styles.popper,
          Qn(
            Object.assign({}, h, {
              offsets: t.modifiersData.popperOffsets,
              position: t.options.strategy,
              adaptive: o,
              roundOffsets: l,
            })
          )
        )),
        null != t.modifiersData.arrow &&
          (t.styles.arrow = Object.assign(
            {},
            t.styles.arrow,
            Qn(
              Object.assign({}, h, {
                offsets: t.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: l,
              })
            )
          )),
        (t.attributes.popper = Object.assign({}, t.attributes.popper, {
          "data-popper-placement": t.placement,
        }));
    },
    data: {},
  };
  var ce = { passive: !0 };
  const Ye = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: function Rr(n) {
      var t = n.state,
        e = n.instance,
        s = n.options,
        i = s.scroll,
        r = void 0 === i || i,
        o = s.resize,
        a = void 0 === o || o,
        l = x(t.elements.popper),
        h = [].concat(t.scrollParents.reference, t.scrollParents.popper);
      return (
        r &&
          h.forEach(function (u) {
            u.addEventListener("scroll", e.update, ce);
          }),
        a && l.addEventListener("resize", e.update, ce),
        function () {
          r &&
            h.forEach(function (u) {
              u.removeEventListener("scroll", e.update, ce);
            }),
            a && l.removeEventListener("resize", e.update, ce);
        }
      );
    },
    data: {},
  };
  var xr = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function le(n) {
    return n.replace(/left|right|bottom|top/g, function (t) {
      return xr[t];
    });
  }
  var kr = { start: "end", end: "start" };
  function Zn(n) {
    return n.replace(/start|end/g, function (t) {
      return kr[t];
    });
  }
  function je(n) {
    var t = x(n);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function Fe(n) {
    return Mt(st(n)).left + je(n).scrollLeft;
  }
  function Ue(n) {
    var t = Q(n);
    return /auto|scroll|overlay|hidden/.test(
      t.overflow + t.overflowY + t.overflowX
    );
  }
  function Jn(n) {
    return ["html", "body", "#document"].indexOf(z(n)) >= 0
      ? n.ownerDocument.body
      : K(n) && Ue(n)
      ? n
      : Jn(ae(n));
  }
  function zt(n, t) {
    var e;
    void 0 === t && (t = []);
    var s = Jn(n),
      i = s === (null == (e = n.ownerDocument) ? void 0 : e.body),
      r = x(s),
      o = i ? [r].concat(r.visualViewport || [], Ue(s) ? s : []) : s,
      a = t.concat(o);
    return i ? a : a.concat(zt(ae(o)));
  }
  function ze(n) {
    return Object.assign({}, n, {
      left: n.x,
      top: n.y,
      right: n.x + n.width,
      bottom: n.y + n.height,
    });
  }
  function ts(n, t, e) {
    return t === Pe
      ? ze(
          (function Vr(n, t) {
            var e = x(n),
              s = st(n),
              i = e.visualViewport,
              r = s.clientWidth,
              o = s.clientHeight,
              a = 0,
              l = 0;
            if (i) {
              (r = i.width), (o = i.height);
              var h = jn();
              (h || (!h && "fixed" === t)) &&
                ((a = i.offsetLeft), (l = i.offsetTop));
            }
            return { width: r, height: o, x: a + Fe(n), y: l };
          })(n, e)
        )
      : ct(t)
      ? (function Wr(n, t) {
          var e = Mt(n, !1, "fixed" === t);
          return (
            (e.top = e.top + n.clientTop),
            (e.left = e.left + n.clientLeft),
            (e.bottom = e.top + n.clientHeight),
            (e.right = e.left + n.clientWidth),
            (e.width = n.clientWidth),
            (e.height = n.clientHeight),
            (e.x = e.left),
            (e.y = e.top),
            e
          );
        })(t, e)
      : ze(
          (function Hr(n) {
            var t,
              e = st(n),
              s = je(n),
              i = null == (t = n.ownerDocument) ? void 0 : t.body,
              r = lt(
                e.scrollWidth,
                e.clientWidth,
                i ? i.scrollWidth : 0,
                i ? i.clientWidth : 0
              ),
              o = lt(
                e.scrollHeight,
                e.clientHeight,
                i ? i.scrollHeight : 0,
                i ? i.clientHeight : 0
              ),
              a = -s.scrollLeft + Fe(n),
              l = -s.scrollTop;
            return (
              "rtl" === Q(i || e).direction &&
                (a += lt(e.clientWidth, i ? i.clientWidth : 0) - r),
              { width: r, height: o, x: a, y: l }
            );
          })(st(n))
        );
  }
  function es(n) {
    var l,
      t = n.reference,
      e = n.element,
      s = n.placement,
      i = s ? G(s) : null,
      r = s ? Pt(s) : null,
      o = t.x + t.width / 2 - e.width / 2,
      a = t.y + t.height / 2 - e.height / 2;
    switch (i) {
      case $:
        l = { x: o, y: t.y - e.height };
        break;
      case P:
        l = { x: o, y: t.y + t.height };
        break;
      case R:
        l = { x: t.x + t.width, y: a };
        break;
      case L:
        l = { x: t.x - e.width, y: a };
        break;
      default:
        l = { x: t.x, y: t.y };
    }
    var h = i ? Ke(i) : null;
    if (null != h) {
      var u = "y" === h ? "height" : "width";
      switch (r) {
        case at:
          l[h] = l[h] - (t[u] / 2 - e[u] / 2);
          break;
        case $t:
          l[h] = l[h] + (t[u] / 2 - e[u] / 2);
      }
    }
    return l;
  }
  function Rt(n, t) {
    void 0 === t && (t = {});
    var s = t.placement,
      i = void 0 === s ? n.placement : s,
      r = t.strategy,
      o = void 0 === r ? n.strategy : r,
      a = t.boundary,
      l = void 0 === a ? In : a,
      h = t.rootBoundary,
      u = void 0 === h ? Pe : h,
      p = t.elementContext,
      _ = void 0 === p ? Lt : p,
      f = t.altBoundary,
      A = void 0 !== f && f,
      m = t.padding,
      E = void 0 === m ? 0 : m,
      T = Gn("number" != typeof E ? E : qn(E, Dt)),
      O = n.rects.popper,
      g = n.elements[A ? (_ === Lt ? Mn : Lt) : _],
      v = (function Br(n, t, e, s) {
        var i =
            "clippingParents" === t
              ? (function Kr(n) {
                  var t = zt(ae(n)),
                    s =
                      ["absolute", "fixed"].indexOf(Q(n).position) >= 0 && K(n)
                        ? Ft(n)
                        : n;
                  return ct(s)
                    ? t.filter(function (i) {
                        return ct(i) && Fn(i, s) && "body" !== z(i);
                      })
                    : [];
                })(n)
              : [].concat(t),
          r = [].concat(i, [e]),
          a = r.reduce(function (l, h) {
            var u = ts(n, h, s);
            return (
              (l.top = lt(u.top, l.top)),
              (l.right = oe(u.right, l.right)),
              (l.bottom = oe(u.bottom, l.bottom)),
              (l.left = lt(u.left, l.left)),
              l
            );
          }, ts(n, r[0], s));
        return (
          (a.width = a.right - a.left),
          (a.height = a.bottom - a.top),
          (a.x = a.left),
          (a.y = a.top),
          a
        );
      })(ct(g) ? g : g.contextElement || st(n.elements.popper), l, u, o),
      b = Mt(n.elements.reference),
      y = es({ reference: b, element: O, strategy: "absolute", placement: i }),
      S = ze(Object.assign({}, O, y)),
      N = _ === Lt ? S : b,
      C = {
        top: v.top - N.top + T.top,
        bottom: N.bottom - v.bottom + T.bottom,
        left: v.left - N.left + T.left,
        right: N.right - v.right + T.right,
      },
      D = n.modifiersData.offset;
    if (_ === Lt && D) {
      var F = D[i];
      Object.keys(C).forEach(function (I) {
        var gt = [R, P].indexOf(I) >= 0 ? 1 : -1,
          Et = [$, P].indexOf(I) >= 0 ? "y" : "x";
        C[I] += F[Et] * gt;
      });
    }
    return C;
  }
  const ns = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: function Fr(n) {
      var t = n.state,
        e = n.options,
        s = n.name;
      if (!t.modifiersData[s]._skip) {
        for (
          var i = e.mainAxis,
            r = void 0 === i || i,
            o = e.altAxis,
            a = void 0 === o || o,
            l = e.fallbackPlacements,
            h = e.padding,
            u = e.boundary,
            p = e.rootBoundary,
            _ = e.altBoundary,
            f = e.flipVariations,
            A = void 0 === f || f,
            m = e.allowedAutoPlacements,
            E = t.options.placement,
            T = G(E),
            O =
              l ||
              (T !== E && A
                ? (function jr(n) {
                    if (G(n) === re) return [];
                    var t = le(n);
                    return [Zn(n), t, Zn(t)];
                  })(E)
                : [le(E)]),
            g = [E].concat(O).reduce(function (Vt, rt) {
              return Vt.concat(
                G(rt) === re
                  ? (function Yr(n, t) {
                      void 0 === t && (t = {});
                      var i = t.boundary,
                        r = t.rootBoundary,
                        o = t.padding,
                        a = t.flipVariations,
                        l = t.allowedAutoPlacements,
                        h = void 0 === l ? xe : l,
                        u = Pt(t.placement),
                        p = u
                          ? a
                            ? Re
                            : Re.filter(function (A) {
                                return Pt(A) === u;
                              })
                          : Dt,
                        _ = p.filter(function (A) {
                          return h.indexOf(A) >= 0;
                        });
                      0 === _.length && (_ = p);
                      var f = _.reduce(function (A, m) {
                        return (
                          (A[m] = Rt(n, {
                            placement: m,
                            boundary: i,
                            rootBoundary: r,
                            padding: o,
                          })[G(m)]),
                          A
                        );
                      }, {});
                      return Object.keys(f).sort(function (A, m) {
                        return f[A] - f[m];
                      });
                    })(t, {
                      placement: rt,
                      boundary: u,
                      rootBoundary: p,
                      padding: h,
                      flipVariations: A,
                      allowedAutoPlacements: m,
                    })
                  : rt
              );
            }, []),
            v = t.rects.reference,
            b = t.rects.popper,
            y = new Map(),
            S = !0,
            N = g[0],
            C = 0;
          C < g.length;
          C++
        ) {
          var D = g[C],
            F = G(D),
            I = Pt(D) === at,
            gt = [$, P].indexOf(F) >= 0,
            Et = gt ? "width" : "height",
            k = Rt(t, {
              placement: D,
              boundary: u,
              rootBoundary: p,
              altBoundary: _,
              padding: h,
            }),
            U = gt ? (I ? R : L) : I ? P : $;
          v[Et] > b[Et] && (U = le(U));
          var Ee = le(U),
            vt = [];
          if (
            (r && vt.push(k[F] <= 0),
            a && vt.push(k[U] <= 0, k[Ee] <= 0),
            vt.every(function (Vt) {
              return Vt;
            }))
          ) {
            (N = D), (S = !1);
            break;
          }
          y.set(D, vt);
        }
        if (S)
          for (
            var cn = function (rt) {
                var Zt = g.find(function (Ae) {
                  var bt = y.get(Ae);
                  if (bt)
                    return bt.slice(0, rt).every(function (ln) {
                      return ln;
                    });
                });
                if (Zt) return (N = Zt), "break";
              },
              Qt = A ? 3 : 1;
            Qt > 0 && "break" !== cn(Qt);
            Qt--
          );
        t.placement !== N &&
          ((t.modifiersData[s]._skip = !0), (t.placement = N), (t.reset = !0));
      }
    },
    requiresIfExists: ["offset"],
    data: { _skip: !1 },
  };
  function ss(n, t, e) {
    return (
      void 0 === e && (e = { x: 0, y: 0 }),
      {
        top: n.top - t.height - e.y,
        right: n.right - t.width + e.x,
        bottom: n.bottom - t.height + e.y,
        left: n.left - t.width - e.x,
      }
    );
  }
  function is(n) {
    return [$, R, P, L].some(function (t) {
      return n[t] >= 0;
    });
  }
  const rs = {
      name: "hide",
      enabled: !0,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: function Ur(n) {
        var t = n.state,
          e = n.name,
          s = t.rects.reference,
          i = t.rects.popper,
          r = t.modifiersData.preventOverflow,
          o = Rt(t, { elementContext: "reference" }),
          a = Rt(t, { altBoundary: !0 }),
          l = ss(o, s),
          h = ss(a, i, r),
          u = is(l),
          p = is(h);
        (t.modifiersData[e] = {
          referenceClippingOffsets: l,
          popperEscapeOffsets: h,
          isReferenceHidden: u,
          hasPopperEscaped: p,
        }),
          (t.attributes.popper = Object.assign({}, t.attributes.popper, {
            "data-popper-reference-hidden": u,
            "data-popper-escaped": p,
          }));
      },
    },
    os = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function Gr(n) {
        var t = n.state,
          s = n.name,
          i = n.options.offset,
          r = void 0 === i ? [0, 0] : i,
          o = xe.reduce(function (u, p) {
            return (
              (u[p] = (function zr(n, t, e) {
                var s = G(n),
                  i = [L, $].indexOf(s) >= 0 ? -1 : 1,
                  r =
                    "function" == typeof e
                      ? e(Object.assign({}, t, { placement: n }))
                      : e,
                  o = r[0],
                  a = r[1];
                return (
                  (o = o || 0),
                  (a = (a || 0) * i),
                  [L, R].indexOf(s) >= 0 ? { x: a, y: o } : { x: o, y: a }
                );
              })(p, t.rects, r)),
              u
            );
          }, {}),
          a = o[t.placement],
          h = a.y;
        null != t.modifiersData.popperOffsets &&
          ((t.modifiersData.popperOffsets.x += a.x),
          (t.modifiersData.popperOffsets.y += h)),
          (t.modifiersData[s] = o);
      },
    },
    Ge = {
      name: "popperOffsets",
      enabled: !0,
      phase: "read",
      fn: function qr(n) {
        var t = n.state;
        t.modifiersData[n.name] = es({
          reference: t.rects.reference,
          element: t.rects.popper,
          strategy: "absolute",
          placement: t.placement,
        });
      },
      data: {},
    },
    as = {
      name: "preventOverflow",
      enabled: !0,
      phase: "main",
      fn: function Qr(n) {
        var t = n.state,
          e = n.options,
          s = n.name,
          i = e.mainAxis,
          r = void 0 === i || i,
          o = e.altAxis,
          a = void 0 !== o && o,
          _ = e.tether,
          f = void 0 === _ || _,
          A = e.tetherOffset,
          m = void 0 === A ? 0 : A,
          E = Rt(t, {
            boundary: e.boundary,
            rootBoundary: e.rootBoundary,
            padding: e.padding,
            altBoundary: e.altBoundary,
          }),
          T = G(t.placement),
          w = Pt(t.placement),
          O = !w,
          g = Ke(T),
          v = (function Xr(n) {
            return "x" === n ? "y" : "x";
          })(g),
          b = t.modifiersData.popperOffsets,
          y = t.rects.reference,
          S = t.rects.popper,
          N =
            "function" == typeof m
              ? m(Object.assign({}, t.rects, { placement: t.placement }))
              : m,
          C =
            "number" == typeof N
              ? { mainAxis: N, altAxis: N }
              : Object.assign({ mainAxis: 0, altAxis: 0 }, N),
          D = t.modifiersData.offset
            ? t.modifiersData.offset[t.placement]
            : null,
          F = { x: 0, y: 0 };
        if (b) {
          if (r) {
            var I,
              gt = "y" === g ? $ : L,
              Et = "y" === g ? P : R,
              k = "y" === g ? "height" : "width",
              U = b[g],
              Ee = U + E[gt],
              vt = U - E[Et],
              ve = f ? -S[k] / 2 : 0,
              cn = w === at ? y[k] : S[k],
              Qt = w === at ? -S[k] : -y[k],
              be = t.elements.arrow,
              Vt = f && be ? We(be) : { width: 0, height: 0 },
              rt = t.modifiersData["arrow#persistent"]
                ? t.modifiersData["arrow#persistent"].padding
                : { top: 0, right: 0, bottom: 0, left: 0 },
              Zt = rt[gt],
              Ae = rt[Et],
              bt = Ut(0, y[k], Vt[k]),
              ln = O
                ? y[k] / 2 - ve - bt - Zt - C.mainAxis
                : cn - bt - Zt - C.mainAxis,
              jc = O
                ? -y[k] / 2 + ve + bt + Ae + C.mainAxis
                : Qt + bt + Ae + C.mainAxis,
              un = t.elements.arrow && Ft(t.elements.arrow),
              Fc = un
                ? "y" === g
                  ? un.clientTop || 0
                  : un.clientLeft || 0
                : 0,
              Gs = null != (I = D?.[g]) ? I : 0,
              zc = U + jc - Gs,
              qs = Ut(
                f ? oe(Ee, U + ln - Gs - Fc) : Ee,
                U,
                f ? lt(vt, zc) : vt
              );
            (b[g] = qs), (F[g] = qs - U);
          }
          if (a) {
            var Xs,
              At = b[v],
              Te = "y" === v ? "height" : "width",
              Qs = At + E["x" === g ? $ : L],
              Zs = At - E["x" === g ? P : R],
              hn = -1 !== [$, L].indexOf(T),
              Js = null != (Xs = D?.[v]) ? Xs : 0,
              ti = hn ? Qs : At - y[Te] - S[Te] - Js + C.altAxis,
              ei = hn ? At + y[Te] + S[Te] - Js - C.altAxis : Zs,
              ni =
                f && hn
                  ? (function Sr(n, t, e) {
                      var s = Ut(n, t, e);
                      return s > e ? e : s;
                    })(ti, At, ei)
                  : Ut(f ? ti : Qs, At, f ? ei : Zs);
            (b[v] = ni), (F[v] = ni - At);
          }
          t.modifiersData[s] = F;
        }
      },
      requiresIfExists: ["offset"],
    };
  function eo(n, t, e) {
    void 0 === e && (e = !1);
    var s = K(t),
      i =
        K(t) &&
        (function to(n) {
          var t = n.getBoundingClientRect(),
            e = It(t.width) / n.offsetWidth || 1,
            s = It(t.height) / n.offsetHeight || 1;
          return 1 !== e || 1 !== s;
        })(t),
      r = st(t),
      o = Mt(n, i, e),
      a = { scrollLeft: 0, scrollTop: 0 },
      l = { x: 0, y: 0 };
    return (
      (s || (!s && !e)) &&
        (("body" !== z(t) || Ue(r)) &&
          (a = (function Jr(n) {
            return n !== x(n) && K(n)
              ? (function Zr(n) {
                  return { scrollLeft: n.scrollLeft, scrollTop: n.scrollTop };
                })(n)
              : je(n);
          })(t)),
        K(t)
          ? (((l = Mt(t, !0)).x += t.clientLeft), (l.y += t.clientTop))
          : r && (l.x = Fe(r))),
      {
        x: o.left + a.scrollLeft - l.x,
        y: o.top + a.scrollTop - l.y,
        width: o.width,
        height: o.height,
      }
    );
  }
  function no(n) {
    var t = new Map(),
      e = new Set(),
      s = [];
    function i(r) {
      e.add(r.name),
        []
          .concat(r.requires || [], r.requiresIfExists || [])
          .forEach(function (a) {
            if (!e.has(a)) {
              var l = t.get(a);
              l && i(l);
            }
          }),
        s.push(r);
    }
    return (
      n.forEach(function (r) {
        t.set(r.name, r);
      }),
      n.forEach(function (r) {
        e.has(r.name) || i(r);
      }),
      s
    );
  }
  function io(n) {
    var t;
    return function () {
      return (
        t ||
          (t = new Promise(function (e) {
            Promise.resolve().then(function () {
              (t = void 0), e(n());
            });
          })),
        t
      );
    };
  }
  var cs = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function ls() {
    for (var n = arguments.length, t = new Array(n), e = 0; e < n; e++)
      t[e] = arguments[e];
    return !t.some(function (s) {
      return !(s && "function" == typeof s.getBoundingClientRect);
    });
  }
  function ue(n) {
    void 0 === n && (n = {});
    var e = n.defaultModifiers,
      s = void 0 === e ? [] : e,
      i = n.defaultOptions,
      r = void 0 === i ? cs : i;
    return function (a, l, h) {
      void 0 === h && (h = r);
      var u = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, cs, r),
          modifiersData: {},
          elements: { reference: a, popper: l },
          attributes: {},
          styles: {},
        },
        p = [],
        _ = !1,
        f = {
          state: u,
          setOptions: function (T) {
            var w = "function" == typeof T ? T(u.options) : T;
            m(),
              (u.options = Object.assign({}, r, u.options, w)),
              (u.scrollParents = {
                reference: ct(a)
                  ? zt(a)
                  : a.contextElement
                  ? zt(a.contextElement)
                  : [],
                popper: zt(l),
              });
            var O = (function so(n) {
              var t = no(n);
              return Yn.reduce(function (e, s) {
                return e.concat(
                  t.filter(function (i) {
                    return i.phase === s;
                  })
                );
              }, []);
            })(
              (function ro(n) {
                var t = n.reduce(function (e, s) {
                  var i = e[s.name];
                  return (
                    (e[s.name] = i
                      ? Object.assign({}, i, s, {
                          options: Object.assign({}, i.options, s.options),
                          data: Object.assign({}, i.data, s.data),
                        })
                      : s),
                    e
                  );
                }, {});
                return Object.keys(t).map(function (e) {
                  return t[e];
                });
              })([].concat(s, u.options.modifiers))
            );
            return (
              (u.orderedModifiers = O.filter(function (g) {
                return g.enabled;
              })),
              (function A() {
                u.orderedModifiers.forEach(function (E) {
                  var w = E.options,
                    g = E.effect;
                  if ("function" == typeof g) {
                    var v = g({
                      state: u,
                      name: E.name,
                      instance: f,
                      options: void 0 === w ? {} : w,
                    });
                    p.push(v || function () {});
                  }
                });
              })(),
              f.update()
            );
          },
          forceUpdate: function () {
            if (!_) {
              var T = u.elements,
                w = T.reference,
                O = T.popper;
              if (ls(w, O)) {
                (u.rects = {
                  reference: eo(w, Ft(O), "fixed" === u.options.strategy),
                  popper: We(O),
                }),
                  (u.reset = !1),
                  (u.placement = u.options.placement),
                  u.orderedModifiers.forEach(function (C) {
                    return (u.modifiersData[C.name] = Object.assign(
                      {},
                      C.data
                    ));
                  });
                for (var g = 0; g < u.orderedModifiers.length; g++)
                  if (!0 !== u.reset) {
                    var v = u.orderedModifiers[g],
                      b = v.fn,
                      y = v.options;
                    "function" == typeof b &&
                      (u =
                        b({
                          state: u,
                          options: void 0 === y ? {} : y,
                          name: v.name,
                          instance: f,
                        }) || u);
                  } else (u.reset = !1), (g = -1);
              }
            }
          },
          update: io(function () {
            return new Promise(function (E) {
              f.forceUpdate(), E(u);
            });
          }),
          destroy: function () {
            m(), (_ = !0);
          },
        };
      if (!ls(a, l)) return f;
      function m() {
        p.forEach(function (E) {
          return E();
        }),
          (p = []);
      }
      return (
        f.setOptions(h).then(function (E) {
          !_ && h.onFirstUpdate && h.onFirstUpdate(E);
        }),
        f
      );
    };
  }
  var oo = ue(),
    co = ue({ defaultModifiers: [Ye, Ge, Be, Ve] }),
    qe = ue({ defaultModifiers: [Ye, Ge, Be, Ve, os, ns, as, Xn, rs] });
  const us = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          afterMain: Hn,
          afterRead: xn,
          afterWrite: Bn,
          applyStyles: Ve,
          arrow: Xn,
          auto: re,
          basePlacements: Dt,
          beforeMain: kn,
          beforeRead: Pn,
          beforeWrite: Wn,
          bottom: P,
          clippingParents: In,
          computeStyles: Be,
          createPopper: qe,
          createPopperBase: oo,
          createPopperLite: co,
          detectOverflow: Rt,
          end: $t,
          eventListeners: Ye,
          flip: ns,
          hide: rs,
          left: L,
          main: "main",
          modifierPhases: Yn,
          offset: os,
          placements: xe,
          popper: Lt,
          popperGenerator: ue,
          popperOffsets: Ge,
          preventOverflow: as,
          read: "read",
          reference: Mn,
          right: R,
          start: at,
          top: $,
          variationPlacements: Re,
          viewport: Pe,
          write: "write",
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    hs = "dropdown",
    ut = ".bs.dropdown",
    Xe = ".data-api",
    ho = "ArrowUp",
    fs = "ArrowDown",
    po = `hide${ut}`,
    _o = `hidden${ut}`,
    mo = `show${ut}`,
    go = `shown${ut}`,
    ps = `click${ut}${Xe}`,
    _s = `keydown${ut}${Xe}`,
    Eo = `keyup${ut}${Xe}`,
    xt = "show",
    ht = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    wo = `${ht}.${xt}`,
    he = ".dropdown-menu",
    So = H() ? "top-end" : "top-start",
    Do = H() ? "top-start" : "top-end",
    $o = H() ? "bottom-end" : "bottom-start",
    Lo = H() ? "bottom-start" : "bottom-end",
    Io = H() ? "left-start" : "right-start",
    Mo = H() ? "right-start" : "left-start",
    xo = {
      autoClose: !0,
      boundary: "clippingParents",
      display: "dynamic",
      offset: [0, 2],
      popperConfig: null,
      reference: "toggle",
    },
    ko = {
      autoClose: "(boolean|string)",
      boundary: "(string|element)",
      display: "string",
      offset: "(array|string|function)",
      popperConfig: "(null|object|function)",
      reference: "(string|element|object)",
    };
  class j extends Y {
    constructor(t, e) {
      super(t, e),
        (this._popper = null),
        (this._parent = this._element.parentNode),
        (this._menu =
          d.next(this._element, he)[0] ||
          d.prev(this._element, he)[0] ||
          d.findOne(he, this._parent)),
        (this._inNavbar = this._detectNavbar());
    }
    static get Default() {
      return xo;
    }
    static get DefaultType() {
      return ko;
    }
    static get NAME() {
      return hs;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (et(this._element) || this._isShown()) return;
      const t = { relatedTarget: this._element };
      if (!c.trigger(this._element, mo, t).defaultPrevented) {
        if (
          (this._createPopper(),
          "ontouchstart" in document.documentElement &&
            !this._parent.closest(".navbar-nav"))
        )
          for (const s of [].concat(...document.body.children))
            c.on(s, "mouseover", Jt);
        this._element.focus(),
          this._element.setAttribute("aria-expanded", !0),
          this._menu.classList.add(xt),
          this._element.classList.add(xt),
          c.trigger(this._element, go, t);
      }
    }
    hide() {
      !et(this._element) &&
        this._isShown() &&
        this._completeHide({ relatedTarget: this._element });
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      (this._inNavbar = this._detectNavbar()),
        this._popper && this._popper.update();
    }
    _completeHide(t) {
      if (!c.trigger(this._element, po, t).defaultPrevented) {
        if ("ontouchstart" in document.documentElement)
          for (const s of [].concat(...document.body.children))
            c.off(s, "mouseover", Jt);
        this._popper && this._popper.destroy(),
          this._menu.classList.remove(xt),
          this._element.classList.remove(xt),
          this._element.setAttribute("aria-expanded", "false"),
          X.removeDataAttribute(this._menu, "popper"),
          c.trigger(this._element, _o, t);
      }
    }
    _getConfig(t) {
      if (
        "object" == typeof (t = super._getConfig(t)).reference &&
        !q(t.reference) &&
        "function" != typeof t.reference.getBoundingClientRect
      )
        throw new TypeError(
          `${hs.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
        );
      return t;
    }
    _createPopper() {
      if (typeof us > "u")
        throw new TypeError(
          "Bootstrap's dropdowns require Popper (https://popper.js.org)"
        );
      let t = this._element;
      "parent" === this._config.reference
        ? (t = this._parent)
        : q(this._config.reference)
        ? (t = tt(this._config.reference))
        : "object" == typeof this._config.reference &&
          (t = this._config.reference);
      const e = this._getPopperConfig();
      this._popper = qe(t, this._menu, e);
    }
    _isShown() {
      return this._menu.classList.contains(xt);
    }
    _getPlacement() {
      const t = this._parent;
      if (t.classList.contains("dropend")) return Io;
      if (t.classList.contains("dropstart")) return Mo;
      if (t.classList.contains("dropup-center")) return "top";
      if (t.classList.contains("dropdown-center")) return "bottom";
      const e =
        "end" ===
        getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return t.classList.contains("dropup") ? (e ? Do : So) : e ? Lo : $o;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: t } = this._config;
      return "string" == typeof t
        ? t.split(",").map((e) => Number.parseInt(e, 10))
        : "function" == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _getPopperConfig() {
      const t = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          { name: "offset", options: { offset: this._getOffset() } },
        ],
      };
      return (
        (this._inNavbar || "static" === this._config.display) &&
          (X.setDataAttribute(this._menu, "popper", "static"),
          (t.modifiers = [{ name: "applyStyles", enabled: !1 }])),
        { ...t, ...M(this._config.popperConfig, [t]) }
      );
    }
    _selectMenuItem({ key: t, target: e }) {
      const s = d
        .find(
          ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
          this._menu
        )
        .filter((i) => Tt(i));
      s.length && Oe(s, e, t === fs, !s.includes(e)).focus();
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = j.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
    static clearMenus(t) {
      if (2 === t.button || ("keyup" === t.type && "Tab" !== t.key)) return;
      const e = d.find(wo);
      for (const s of e) {
        const i = j.getInstance(s);
        if (!i || !1 === i._config.autoClose) continue;
        const r = t.composedPath(),
          o = r.includes(i._menu);
        if (
          r.includes(i._element) ||
          ("inside" === i._config.autoClose && !o) ||
          ("outside" === i._config.autoClose && o) ||
          (i._menu.contains(t.target) &&
            (("keyup" === t.type && "Tab" === t.key) ||
              /input|select|option|textarea|form/i.test(t.target.tagName)))
        )
          continue;
        const a = { relatedTarget: i._element };
        "click" === t.type && (a.clickEvent = t), i._completeHide(a);
      }
    }
    static dataApiKeydownHandler(t) {
      const e = /input|textarea/i.test(t.target.tagName),
        s = "Escape" === t.key,
        i = [ho, fs].includes(t.key);
      if ((!i && !s) || (e && !s)) return;
      t.preventDefault();
      const r = this.matches(ht)
          ? this
          : d.prev(this, ht)[0] ||
            d.next(this, ht)[0] ||
            d.findOne(ht, t.delegateTarget.parentNode),
        o = j.getOrCreateInstance(r);
      if (i) return t.stopPropagation(), o.show(), void o._selectMenuItem(t);
      o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
    }
  }
  c.on(document, _s, ht, j.dataApiKeydownHandler),
    c.on(document, _s, he, j.dataApiKeydownHandler),
    c.on(document, ps, j.clearMenus),
    c.on(document, Eo, j.clearMenus),
    c.on(document, ps, ht, function (n) {
      n.preventDefault(), j.getOrCreateInstance(this).toggle();
    }),
    W(j);
  const ms = "backdrop",
    Es = `mousedown.bs.${ms}`,
    Ho = {
      className: "modal-backdrop",
      clickCallback: null,
      isAnimated: !1,
      isVisible: !0,
      rootElement: "body",
    },
    Wo = {
      className: "string",
      clickCallback: "(function|null)",
      isAnimated: "boolean",
      isVisible: "boolean",
      rootElement: "(element|string)",
    };
  class vs extends Wt {
    constructor(t) {
      super(),
        (this._config = this._getConfig(t)),
        (this._isAppended = !1),
        (this._element = null);
    }
    static get Default() {
      return Ho;
    }
    static get DefaultType() {
      return Wo;
    }
    static get NAME() {
      return ms;
    }
    show(t) {
      if (!this._config.isVisible) return void M(t);
      this._append();
      this._getElement().classList.add("show"),
        this._emulateAnimation(() => {
          M(t);
        });
    }
    hide(t) {
      this._config.isVisible
        ? (this._getElement().classList.remove("show"),
          this._emulateAnimation(() => {
            this.dispose(), M(t);
          }))
        : M(t);
    }
    dispose() {
      this._isAppended &&
        (c.off(this._element, Es),
        this._element.remove(),
        (this._isAppended = !1));
    }
    _getElement() {
      if (!this._element) {
        const t = document.createElement("div");
        (t.className = this._config.className),
          this._config.isAnimated && t.classList.add("fade"),
          (this._element = t);
      }
      return this._element;
    }
    _configAfterMerge(t) {
      return (t.rootElement = tt(t.rootElement)), t;
    }
    _append() {
      if (this._isAppended) return;
      const t = this._getElement();
      this._config.rootElement.append(t),
        c.on(t, Es, () => {
          M(this._config.clickCallback);
        }),
        (this._isAppended = !0);
    }
    _emulateAnimation(t) {
      mn(t, this._getElement(), this._config.isAnimated);
    }
  }
  const de = ".bs.focustrap",
    Bo = `focusin${de}`,
    Yo = `keydown.tab${de}`,
    bs = "backward",
    Uo = { autofocus: !0, trapElement: null },
    zo = { autofocus: "boolean", trapElement: "element" };
  class As extends Wt {
    constructor(t) {
      super(),
        (this._config = this._getConfig(t)),
        (this._isActive = !1),
        (this._lastTabNavDirection = null);
    }
    static get Default() {
      return Uo;
    }
    static get DefaultType() {
      return zo;
    }
    static get NAME() {
      return "focustrap";
    }
    activate() {
      this._isActive ||
        (this._config.autofocus && this._config.trapElement.focus(),
        c.off(document, de),
        c.on(document, Bo, (t) => this._handleFocusin(t)),
        c.on(document, Yo, (t) => this._handleKeydown(t)),
        (this._isActive = !0));
    }
    deactivate() {
      this._isActive && ((this._isActive = !1), c.off(document, de));
    }
    _handleFocusin(t) {
      const { trapElement: e } = this._config;
      if (t.target === document || t.target === e || e.contains(t.target))
        return;
      const s = d.focusableChildren(e);
      0 === s.length
        ? e.focus()
        : this._lastTabNavDirection === bs
        ? s[s.length - 1].focus()
        : s[0].focus();
    }
    _handleKeydown(t) {
      "Tab" === t.key &&
        (this._lastTabNavDirection = t.shiftKey ? bs : "forward");
    }
  }
  const Ts = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    ys = ".sticky-top",
    fe = "padding-right",
    ws = "margin-right";
  class Qe {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const t = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - t);
    }
    hide() {
      const t = this.getWidth();
      this._disableOverFlow(),
        this._setElementAttributes(this._element, fe, (e) => e + t),
        this._setElementAttributes(Ts, fe, (e) => e + t),
        this._setElementAttributes(ys, ws, (e) => e - t);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"),
        this._resetElementAttributes(this._element, fe),
        this._resetElementAttributes(Ts, fe),
        this._resetElementAttributes(ys, ws);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"),
        (this._element.style.overflow = "hidden");
    }
    _setElementAttributes(t, e, s) {
      const i = this.getWidth();
      this._applyManipulationCallback(t, (o) => {
        if (o !== this._element && window.innerWidth > o.clientWidth + i)
          return;
        this._saveInitialAttribute(o, e);
        const a = window.getComputedStyle(o).getPropertyValue(e);
        o.style.setProperty(e, `${s(Number.parseFloat(a))}px`);
      });
    }
    _saveInitialAttribute(t, e) {
      const s = t.style.getPropertyValue(e);
      s && X.setDataAttribute(t, e, s);
    }
    _resetElementAttributes(t, e) {
      this._applyManipulationCallback(t, (i) => {
        const r = X.getDataAttribute(i, e);
        null !== r
          ? (X.removeDataAttribute(i, e), i.style.setProperty(e, r))
          : i.style.removeProperty(e);
      });
    }
    _applyManipulationCallback(t, e) {
      if (q(t)) e(t);
      else for (const s of d.find(t, this._element)) e(s);
    }
  }
  const B = ".bs.modal",
    Qo = `hide${B}`,
    Zo = `hidePrevented${B}`,
    Os = `hidden${B}`,
    Cs = `show${B}`,
    Jo = `shown${B}`,
    ta = `resize${B}`,
    ea = `click.dismiss${B}`,
    na = `mousedown.dismiss${B}`,
    sa = `keydown.dismiss${B}`,
    ia = `click${B}.data-api`,
    Ns = "modal-open",
    Ze = "modal-static",
    ua = { backdrop: !0, focus: !0, keyboard: !0 },
    ha = {
      backdrop: "(boolean|string)",
      focus: "boolean",
      keyboard: "boolean",
    };
  class dt extends Y {
    constructor(t, e) {
      super(t, e),
        (this._dialog = d.findOne(".modal-dialog", this._element)),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        (this._isShown = !1),
        (this._isTransitioning = !1),
        (this._scrollBar = new Qe()),
        this._addEventListeners();
    }
    static get Default() {
      return ua;
    }
    static get DefaultType() {
      return ha;
    }
    static get NAME() {
      return "modal";
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      this._isShown ||
        this._isTransitioning ||
        c.trigger(this._element, Cs, { relatedTarget: t }).defaultPrevented ||
        ((this._isShown = !0),
        (this._isTransitioning = !0),
        this._scrollBar.hide(),
        document.body.classList.add(Ns),
        this._adjustDialog(),
        this._backdrop.show(() => this._showElement(t)));
    }
    hide() {
      !this._isShown ||
        this._isTransitioning ||
        c.trigger(this._element, Qo).defaultPrevented ||
        ((this._isShown = !1),
        (this._isTransitioning = !0),
        this._focustrap.deactivate(),
        this._element.classList.remove("show"),
        this._queueCallback(
          () => this._hideModal(),
          this._element,
          this._isAnimated()
        ));
    }
    dispose() {
      c.off(window, B),
        c.off(this._dialog, B),
        this._backdrop.dispose(),
        this._focustrap.deactivate(),
        super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new vs({
        isVisible: !!this._config.backdrop,
        isAnimated: this._isAnimated(),
      });
    }
    _initializeFocusTrap() {
      return new As({ trapElement: this._element });
    }
    _showElement(t) {
      document.body.contains(this._element) ||
        document.body.append(this._element),
        (this._element.style.display = "block"),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        (this._element.scrollTop = 0);
      const e = d.findOne(".modal-body", this._dialog);
      e && (e.scrollTop = 0),
        this._element.classList.add("show"),
        this._queueCallback(
          () => {
            this._config.focus && this._focustrap.activate(),
              (this._isTransitioning = !1),
              c.trigger(this._element, Jo, { relatedTarget: t });
          },
          this._dialog,
          this._isAnimated()
        );
    }
    _addEventListeners() {
      c.on(this._element, sa, (t) => {
        if ("Escape" === t.key) {
          if (this._config.keyboard) return void this.hide();
          this._triggerBackdropTransition();
        }
      }),
        c.on(window, ta, () => {
          this._isShown && !this._isTransitioning && this._adjustDialog();
        }),
        c.on(this._element, na, (t) => {
          c.one(this._element, ea, (e) => {
            if (this._element === t.target && this._element === e.target) {
              if ("static" === this._config.backdrop)
                return void this._triggerBackdropTransition();
              this._config.backdrop && this.hide();
            }
          });
        });
    }
    _hideModal() {
      (this._element.style.display = "none"),
        this._element.setAttribute("aria-hidden", !0),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        (this._isTransitioning = !1),
        this._backdrop.hide(() => {
          document.body.classList.remove(Ns),
            this._resetAdjustments(),
            this._scrollBar.reset(),
            c.trigger(this._element, Os);
        });
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (c.trigger(this._element, Zo).defaultPrevented) return;
      const e =
          this._element.scrollHeight > document.documentElement.clientHeight,
        s = this._element.style.overflowY;
      "hidden" === s ||
        this._element.classList.contains(Ze) ||
        (e || (this._element.style.overflowY = "hidden"),
        this._element.classList.add(Ze),
        this._queueCallback(() => {
          this._element.classList.remove(Ze),
            this._queueCallback(() => {
              this._element.style.overflowY = s;
            }, this._dialog);
        }, this._dialog),
        this._element.focus());
    }
    _adjustDialog() {
      const t =
          this._element.scrollHeight > document.documentElement.clientHeight,
        e = this._scrollBar.getWidth(),
        s = e > 0;
      if (s && !t) {
        const i = H() ? "paddingLeft" : "paddingRight";
        this._element.style[i] = `${e}px`;
      }
      if (!s && t) {
        const i = H() ? "paddingRight" : "paddingLeft";
        this._element.style[i] = `${e}px`;
      }
    }
    _resetAdjustments() {
      (this._element.style.paddingLeft = ""),
        (this._element.style.paddingRight = "");
    }
    static jQueryInterface(t, e) {
      return this.each(function () {
        const s = dt.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (typeof s[t] > "u") throw new TypeError(`No method named "${t}"`);
          s[t](e);
        }
      });
    }
  }
  c.on(document, ia, '[data-bs-toggle="modal"]', function (n) {
    const t = d.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && n.preventDefault(),
      c.one(t, Cs, (i) => {
        i.defaultPrevented ||
          c.one(t, Os, () => {
            Tt(this) && this.focus();
          });
      });
    const e = d.findOne(".modal.show");
    e && dt.getInstance(e).hide(), dt.getOrCreateInstance(t).toggle(this);
  }),
    te(dt),
    W(dt);
  const Z = ".bs.offcanvas",
    Ds = ".data-api",
    fa = `load${Z}${Ds}`,
    Ls = "showing",
    Ms = ".offcanvas.show",
    ma = `show${Z}`,
    ga = `shown${Z}`,
    Ea = `hide${Z}`,
    Ps = `hidePrevented${Z}`,
    Rs = `hidden${Z}`,
    va = `resize${Z}`,
    ba = `click${Z}${Ds}`,
    Aa = `keydown.dismiss${Z}`,
    ya = { backdrop: !0, keyboard: !0, scroll: !1 },
    wa = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      scroll: "boolean",
    };
  class J extends Y {
    constructor(t, e) {
      super(t, e),
        (this._isShown = !1),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        this._addEventListeners();
    }
    static get Default() {
      return ya;
    }
    static get DefaultType() {
      return wa;
    }
    static get NAME() {
      return "offcanvas";
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      this._isShown ||
        c.trigger(this._element, ma, { relatedTarget: t }).defaultPrevented ||
        ((this._isShown = !0),
        this._backdrop.show(),
        this._config.scroll || new Qe().hide(),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        this._element.classList.add(Ls),
        this._queueCallback(
          () => {
            (!this._config.scroll || this._config.backdrop) &&
              this._focustrap.activate(),
              this._element.classList.add("show"),
              this._element.classList.remove(Ls),
              c.trigger(this._element, ga, { relatedTarget: t });
          },
          this._element,
          !0
        ));
    }
    hide() {
      this._isShown &&
        !c.trigger(this._element, Ea).defaultPrevented &&
        (this._focustrap.deactivate(),
        this._element.blur(),
        (this._isShown = !1),
        this._element.classList.add("hiding"),
        this._backdrop.hide(),
        this._queueCallback(
          () => {
            this._element.classList.remove("show", "hiding"),
              this._element.removeAttribute("aria-modal"),
              this._element.removeAttribute("role"),
              this._config.scroll || new Qe().reset(),
              c.trigger(this._element, Rs);
          },
          this._element,
          !0
        ));
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
      const e = !!this._config.backdrop;
      return new vs({
        className: "offcanvas-backdrop",
        isVisible: e,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: e
          ? () => {
              "static" !== this._config.backdrop
                ? this.hide()
                : c.trigger(this._element, Ps);
            }
          : null,
      });
    }
    _initializeFocusTrap() {
      return new As({ trapElement: this._element });
    }
    _addEventListeners() {
      c.on(this._element, Aa, (t) => {
        if ("Escape" === t.key) {
          if (this._config.keyboard) return void this.hide();
          c.trigger(this._element, Ps);
        }
      });
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = J.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
            throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  c.on(document, ba, '[data-bs-toggle="offcanvas"]', function (n) {
    const t = d.getElementFromSelector(this);
    if ((["A", "AREA"].includes(this.tagName) && n.preventDefault(), et(this)))
      return;
    c.one(t, Rs, () => {
      Tt(this) && this.focus();
    });
    const e = d.findOne(Ms);
    e && e !== t && J.getInstance(e).hide(),
      J.getOrCreateInstance(t).toggle(this);
  }),
    c.on(window, fa, () => {
      for (const n of d.find(Ms)) J.getOrCreateInstance(n).show();
    }),
    c.on(window, va, () => {
      for (const n of d.find("[aria-modal][class*=show][class*=offcanvas-]"))
        "fixed" !== getComputedStyle(n).position &&
          J.getOrCreateInstance(n).hide();
    }),
    te(J),
    W(J);
  const xs = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "srcset", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
    },
    Oa = new Set([
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ]),
    Ca = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
    Na = (n, t) => {
      const e = n.nodeName.toLowerCase();
      return t.includes(e)
        ? !Oa.has(e) || !!Ca.test(n.nodeValue)
        : t.filter((s) => s instanceof RegExp).some((s) => s.test(e));
    },
    $a = {
      allowList: xs,
      content: {},
      extraClass: "",
      html: !1,
      sanitize: !0,
      sanitizeFn: null,
      template: "<div></div>",
    },
    La = {
      allowList: "object",
      content: "object",
      extraClass: "(string|function)",
      html: "boolean",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      template: "string",
    },
    Ia = {
      entry: "(string|element|function|null)",
      selector: "(string|element)",
    };
  class Ma extends Wt {
    constructor(t) {
      super(), (this._config = this._getConfig(t));
    }
    static get Default() {
      return $a;
    }
    static get DefaultType() {
      return La;
    }
    static get NAME() {
      return "TemplateFactory";
    }
    getContent() {
      return Object.values(this._config.content)
        .map((t) => this._resolvePossibleFunction(t))
        .filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(t) {
      return (
        this._checkContent(t),
        (this._config.content = { ...this._config.content, ...t }),
        this
      );
    }
    toHtml() {
      const t = document.createElement("div");
      t.innerHTML = this._maybeSanitize(this._config.template);
      for (const [i, r] of Object.entries(this._config.content))
        this._setContent(t, r, i);
      const e = t.children[0],
        s = this._resolvePossibleFunction(this._config.extraClass);
      return s && e.classList.add(...s.split(" ")), e;
    }
    _typeCheckConfig(t) {
      super._typeCheckConfig(t), this._checkContent(t.content);
    }
    _checkContent(t) {
      for (const [e, s] of Object.entries(t))
        super._typeCheckConfig({ selector: e, entry: s }, Ia);
    }
    _setContent(t, e, s) {
      const i = d.findOne(s, t);
      if (i) {
        if (!(e = this._resolvePossibleFunction(e))) return void i.remove();
        if (q(e)) return void this._putElementInTemplate(tt(e), i);
        if (this._config.html)
          return void (i.innerHTML = this._maybeSanitize(e));
        i.textContent = e;
      }
    }
    _maybeSanitize(t) {
      return this._config.sanitize
        ? (function Sa(n, t, e) {
            if (!n.length) return n;
            if (e && "function" == typeof e) return e(n);
            const i = new window.DOMParser().parseFromString(n, "text/html"),
              r = [].concat(...i.body.querySelectorAll("*"));
            for (const o of r) {
              const a = o.nodeName.toLowerCase();
              if (!Object.keys(t).includes(a)) {
                o.remove();
                continue;
              }
              const l = [].concat(...o.attributes),
                h = [].concat(t["*"] || [], t[a] || []);
              for (const u of l) Na(u, h) || o.removeAttribute(u.nodeName);
            }
            return i.body.innerHTML;
          })(t, this._config.allowList, this._config.sanitizeFn)
        : t;
    }
    _resolvePossibleFunction(t) {
      return M(t, [this]);
    }
    _putElementInTemplate(t, e) {
      if (this._config.html) return (e.innerHTML = ""), void e.append(t);
      e.textContent = t.textContent;
    }
  }
  const Ra = new Set(["sanitize", "allowList", "sanitizeFn"]),
    Je = "fade",
    pe = "show",
    Vs = "hide.bs.modal",
    Gt = "hover",
    tn = "focus",
    Xa = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: H() ? "left" : "right",
      BOTTOM: "bottom",
      LEFT: H() ? "right" : "left",
    },
    Qa = {
      allowList: xs,
      animation: !0,
      boundary: "clippingParents",
      container: !1,
      customClass: "",
      delay: 0,
      fallbackPlacements: ["top", "right", "bottom", "left"],
      html: !1,
      offset: [0, 6],
      placement: "top",
      popperConfig: null,
      sanitize: !0,
      sanitizeFn: null,
      selector: !1,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: "",
      trigger: "hover focus",
    },
    Za = {
      allowList: "object",
      animation: "boolean",
      boundary: "(string|element)",
      container: "(string|element|boolean)",
      customClass: "(string|function)",
      delay: "(number|object)",
      fallbackPlacements: "array",
      html: "boolean",
      offset: "(array|string|function)",
      placement: "(string|function)",
      popperConfig: "(null|object|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      selector: "(string|boolean)",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
    };
  class ft extends Y {
    constructor(t, e) {
      if (typeof us > "u")
        throw new TypeError(
          "Bootstrap's tooltips require Popper (https://popper.js.org)"
        );
      super(t, e),
        (this._isEnabled = !0),
        (this._timeout = 0),
        (this._isHovered = null),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this._templateFactory = null),
        (this._newContent = null),
        (this.tip = null),
        this._setListeners(),
        this._config.selector || this._fixTitle();
    }
    static get Default() {
      return Qa;
    }
    static get DefaultType() {
      return Za;
    }
    static get NAME() {
      return "tooltip";
    }
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      if (this._isEnabled) {
        if (
          ((this._activeTrigger.click = !this._activeTrigger.click),
          this._isShown())
        )
          return void this._leave();
        this._enter();
      }
    }
    dispose() {
      clearTimeout(this._timeout),
        c.off(this._element.closest(".modal"), Vs, this._hideModalHandler),
        this._element.getAttribute("data-bs-original-title") &&
          this._element.setAttribute(
            "title",
            this._element.getAttribute("data-bs-original-title")
          ),
        this._disposePopper(),
        super.dispose();
    }
    show() {
      if ("none" === this._element.style.display)
        throw new Error("Please use show on visible elements");
      if (!this._isWithContent() || !this._isEnabled) return;
      const t = c.trigger(this._element, this.constructor.eventName("show")),
        s = (
          pn(this._element) || this._element.ownerDocument.documentElement
        ).contains(this._element);
      if (t.defaultPrevented || !s) return;
      this._disposePopper();
      const i = this._getTipElement();
      this._element.setAttribute("aria-describedby", i.getAttribute("id"));
      const { container: r } = this._config;
      if (
        (this._element.ownerDocument.documentElement.contains(this.tip) ||
          (r.append(i),
          c.trigger(this._element, this.constructor.eventName("inserted"))),
        (this._popper = this._createPopper(i)),
        i.classList.add(pe),
        "ontouchstart" in document.documentElement)
      )
        for (const a of [].concat(...document.body.children))
          c.on(a, "mouseover", Jt);
      this._queueCallback(
        () => {
          c.trigger(this._element, this.constructor.eventName("shown")),
            !1 === this._isHovered && this._leave(),
            (this._isHovered = !1);
        },
        this.tip,
        this._isAnimated()
      );
    }
    hide() {
      if (
        this._isShown() &&
        !c.trigger(this._element, this.constructor.eventName("hide"))
          .defaultPrevented
      ) {
        if (
          (this._getTipElement().classList.remove(pe),
          "ontouchstart" in document.documentElement)
        )
          for (const i of [].concat(...document.body.children))
            c.off(i, "mouseover", Jt);
        (this._activeTrigger.click = !1),
          (this._activeTrigger[tn] = !1),
          (this._activeTrigger[Gt] = !1),
          (this._isHovered = null),
          this._queueCallback(
            () => {
              this._isWithActiveTrigger() ||
                (this._isHovered || this._disposePopper(),
                this._element.removeAttribute("aria-describedby"),
                c.trigger(this._element, this.constructor.eventName("hidden")));
            },
            this.tip,
            this._isAnimated()
          );
      }
    }
    update() {
      this._popper && this._popper.update();
    }
    _isWithContent() {
      return !!this._getTitle();
    }
    _getTipElement() {
      return (
        this.tip ||
          (this.tip = this._createTipElement(
            this._newContent || this._getContentForTemplate()
          )),
        this.tip
      );
    }
    _createTipElement(t) {
      const e = this._getTemplateFactory(t).toHtml();
      if (!e) return null;
      e.classList.remove(Je, pe),
        e.classList.add(`bs-${this.constructor.NAME}-auto`);
      const s = ((n) => {
        do {
          n += Math.floor(1e6 * Math.random());
        } while (document.getElementById(n));
        return n;
      })(this.constructor.NAME).toString();
      return (
        e.setAttribute("id", s), this._isAnimated() && e.classList.add(Je), e
      );
    }
    setContent(t) {
      (this._newContent = t),
        this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(t) {
      return (
        this._templateFactory
          ? this._templateFactory.changeContent(t)
          : (this._templateFactory = new Ma({
              ...this._config,
              content: t,
              extraClass: this._resolvePossibleFunction(
                this._config.customClass
              ),
            })),
        this._templateFactory
      );
    }
    _getContentForTemplate() {
      return { ".tooltip-inner": this._getTitle() };
    }
    _getTitle() {
      return (
        this._resolvePossibleFunction(this._config.title) ||
        this._element.getAttribute("data-bs-original-title")
      );
    }
    _initializeOnDelegatedTarget(t) {
      return this.constructor.getOrCreateInstance(
        t.delegateTarget,
        this._getDelegateConfig()
      );
    }
    _isAnimated() {
      return (
        this._config.animation || (this.tip && this.tip.classList.contains(Je))
      );
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(pe);
    }
    _createPopper(t) {
      const e = M(this._config.placement, [this, t, this._element]),
        s = Xa[e.toUpperCase()];
      return qe(this._element, t, this._getPopperConfig(s));
    }
    _getOffset() {
      const { offset: t } = this._config;
      return "string" == typeof t
        ? t.split(",").map((e) => Number.parseInt(e, 10))
        : "function" == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _resolvePossibleFunction(t) {
      return M(t, [this._element]);
    }
    _getPopperConfig(t) {
      const e = {
        placement: t,
        modifiers: [
          {
            name: "flip",
            options: { fallbackPlacements: this._config.fallbackPlacements },
          },
          { name: "offset", options: { offset: this._getOffset() } },
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          {
            name: "arrow",
            options: { element: `.${this.constructor.NAME}-arrow` },
          },
          {
            name: "preSetPlacement",
            enabled: !0,
            phase: "beforeMain",
            fn: (s) => {
              this._getTipElement().setAttribute(
                "data-popper-placement",
                s.state.placement
              );
            },
          },
        ],
      };
      return { ...e, ...M(this._config.popperConfig, [e]) };
    }
    _setListeners() {
      const t = this._config.trigger.split(" ");
      for (const e of t)
        if ("click" === e)
          c.on(
            this._element,
            this.constructor.eventName("click"),
            this._config.selector,
            (s) => {
              this._initializeOnDelegatedTarget(s).toggle();
            }
          );
        else if ("manual" !== e) {
          const s = this.constructor.eventName(
              e === Gt ? "mouseenter" : "focusin"
            ),
            i = this.constructor.eventName(
              e === Gt ? "mouseleave" : "focusout"
            );
          c.on(this._element, s, this._config.selector, (r) => {
            const o = this._initializeOnDelegatedTarget(r);
            (o._activeTrigger["focusin" === r.type ? tn : Gt] = !0), o._enter();
          }),
            c.on(this._element, i, this._config.selector, (r) => {
              const o = this._initializeOnDelegatedTarget(r);
              (o._activeTrigger["focusout" === r.type ? tn : Gt] =
                o._element.contains(r.relatedTarget)),
                o._leave();
            });
        }
      (this._hideModalHandler = () => {
        this._element && this.hide();
      }),
        c.on(this._element.closest(".modal"), Vs, this._hideModalHandler);
    }
    _fixTitle() {
      const t = this._element.getAttribute("title");
      t &&
        (!this._element.getAttribute("aria-label") &&
          !this._element.textContent.trim() &&
          this._element.setAttribute("aria-label", t),
        this._element.setAttribute("data-bs-original-title", t),
        this._element.removeAttribute("title"));
    }
    _enter() {
      this._isShown() || this._isHovered
        ? (this._isHovered = !0)
        : ((this._isHovered = !0),
          this._setTimeout(() => {
            this._isHovered && this.show();
          }, this._config.delay.show));
    }
    _leave() {
      this._isWithActiveTrigger() ||
        ((this._isHovered = !1),
        this._setTimeout(() => {
          this._isHovered || this.hide();
        }, this._config.delay.hide));
    }
    _setTimeout(t, e) {
      clearTimeout(this._timeout), (this._timeout = setTimeout(t, e));
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(!0);
    }
    _getConfig(t) {
      const e = X.getDataAttributes(this._element);
      for (const s of Object.keys(e)) Ra.has(s) && delete e[s];
      return (
        (t = { ...e, ...("object" == typeof t && t ? t : {}) }),
        (t = this._mergeConfigObj(t)),
        (t = this._configAfterMerge(t)),
        this._typeCheckConfig(t),
        t
      );
    }
    _configAfterMerge(t) {
      return (
        (t.container = !1 === t.container ? document.body : tt(t.container)),
        "number" == typeof t.delay &&
          (t.delay = { show: t.delay, hide: t.delay }),
        "number" == typeof t.title && (t.title = t.title.toString()),
        "number" == typeof t.content && (t.content = t.content.toString()),
        t
      );
    }
    _getDelegateConfig() {
      const t = {};
      for (const [e, s] of Object.entries(this._config))
        this.constructor.Default[e] !== s && (t[e] = s);
      return (t.selector = !1), (t.trigger = "manual"), t;
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), (this._popper = null)),
        this.tip && (this.tip.remove(), (this.tip = null));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = ft.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  W(ft);
  const nc = {
      ...ft.Default,
      content: "",
      offset: [0, 8],
      placement: "right",
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      trigger: "click",
    },
    sc = { ...ft.DefaultType, content: "(null|string|element|function)" };
  class _e extends ft {
    static get Default() {
      return nc;
    }
    static get DefaultType() {
      return sc;
    }
    static get NAME() {
      return "popover";
    }
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
      return {
        ".popover-header": this._getTitle(),
        ".popover-body": this._getContent(),
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = _e.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  W(_e);
  const en = ".bs.scrollspy",
    oc = `activate${en}`,
    Hs = `click${en}`,
    ac = `load${en}.data-api`,
    kt = "active",
    nn = "[href]",
    Ws = ".nav-link",
    hc = `${Ws}, .nav-item > ${Ws}, .list-group-item`,
    pc = {
      offset: null,
      rootMargin: "0px 0px -25%",
      smoothScroll: !1,
      target: null,
      threshold: [0.1, 0.5, 1],
    },
    _c = {
      offset: "(number|null)",
      rootMargin: "string",
      smoothScroll: "boolean",
      target: "element",
      threshold: "array",
    };
  class qt extends Y {
    constructor(t, e) {
      super(t, e),
        (this._targetLinks = new Map()),
        (this._observableSections = new Map()),
        (this._rootElement =
          "visible" === getComputedStyle(this._element).overflowY
            ? null
            : this._element),
        (this._activeTarget = null),
        (this._observer = null),
        (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
        this.refresh();
    }
    static get Default() {
      return pc;
    }
    static get DefaultType() {
      return _c;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      this._initializeTargetsAndObservables(),
        this._maybeEnableSmoothScroll(),
        this._observer
          ? this._observer.disconnect()
          : (this._observer = this._getNewObserver());
      for (const t of this._observableSections.values())
        this._observer.observe(t);
    }
    dispose() {
      this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(t) {
      return (
        (t.target = tt(t.target) || document.body),
        (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
        "string" == typeof t.threshold &&
          (t.threshold = t.threshold
            .split(",")
            .map((e) => Number.parseFloat(e))),
        t
      );
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll &&
        (c.off(this._config.target, Hs),
        c.on(this._config.target, Hs, nn, (t) => {
          const e = this._observableSections.get(t.target.hash);
          if (e) {
            t.preventDefault();
            const s = this._rootElement || window,
              i = e.offsetTop - this._element.offsetTop;
            if (s.scrollTo)
              return void s.scrollTo({ top: i, behavior: "smooth" });
            s.scrollTop = i;
          }
        }));
    }
    _getNewObserver() {
      return new IntersectionObserver((e) => this._observerCallback(e), {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin,
      });
    }
    _observerCallback(t) {
      const e = (o) => this._targetLinks.get(`#${o.target.id}`),
        s = (o) => {
          (this._previousScrollData.visibleEntryTop = o.target.offsetTop),
            this._process(e(o));
        },
        i = (this._rootElement || document.documentElement).scrollTop,
        r = i >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = i;
      for (const o of t) {
        if (!o.isIntersecting) {
          (this._activeTarget = null), this._clearActiveClass(e(o));
          continue;
        }
        const a =
          o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (r && a) {
          if ((s(o), !i)) return;
        } else !r && !a && s(o);
      }
    }
    _initializeTargetsAndObservables() {
      (this._targetLinks = new Map()), (this._observableSections = new Map());
      const t = d.find(nn, this._config.target);
      for (const e of t) {
        if (!e.hash || et(e)) continue;
        const s = d.findOne(decodeURI(e.hash), this._element);
        Tt(s) &&
          (this._targetLinks.set(decodeURI(e.hash), e),
          this._observableSections.set(e.hash, s));
      }
    }
    _process(t) {
      this._activeTarget !== t &&
        (this._clearActiveClass(this._config.target),
        (this._activeTarget = t),
        t.classList.add(kt),
        this._activateParents(t),
        c.trigger(this._element, oc, { relatedTarget: t }));
    }
    _activateParents(t) {
      if (t.classList.contains("dropdown-item"))
        d.findOne(".dropdown-toggle", t.closest(".dropdown")).classList.add(kt);
      else
        for (const e of d.parents(t, ".nav, .list-group"))
          for (const s of d.prev(e, hc)) s.classList.add(kt);
    }
    _clearActiveClass(t) {
      t.classList.remove(kt);
      const e = d.find(`${nn}.${kt}`, t);
      for (const s of e) s.classList.remove(kt);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = qt.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
            throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  c.on(window, ac, () => {
    for (const n of d.find('[data-bs-spy="scroll"]')) qt.getOrCreateInstance(n);
  }),
    W(qt);
  const pt = ".bs.tab",
    gc = `hide${pt}`,
    Ec = `hidden${pt}`,
    vc = `show${pt}`,
    bc = `shown${pt}`,
    Ac = `click${pt}`,
    Tc = `keydown${pt}`,
    yc = `load${pt}`,
    wc = "ArrowLeft",
    Ks = "ArrowRight",
    Oc = "ArrowUp",
    Bs = "ArrowDown",
    sn = "Home",
    Ys = "End",
    _t = "active",
    rn = "show",
    Fs = ".dropdown-toggle",
    on = `:not(${Fs})`,
    Us =
      '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    an = `.nav-link${on}, .list-group-item${on}, [role="tab"]${on}, ${Us}`,
    Lc = `.${_t}[data-bs-toggle="tab"], .${_t}[data-bs-toggle="pill"], .${_t}[data-bs-toggle="list"]`;
  class mt extends Y {
    constructor(t) {
      super(t),
        (this._parent = this._element.closest(
          '.list-group, .nav, [role="tablist"]'
        )),
        this._parent &&
          (this._setInitialAttributes(this._parent, this._getChildren()),
          c.on(this._element, Tc, (e) => this._keydown(e)));
    }
    static get NAME() {
      return "tab";
    }
    show() {
      const t = this._element;
      if (this._elemIsActive(t)) return;
      const e = this._getActiveElem(),
        s = e ? c.trigger(e, gc, { relatedTarget: t }) : null;
      c.trigger(t, vc, { relatedTarget: e }).defaultPrevented ||
        (s && s.defaultPrevented) ||
        (this._deactivate(e, t), this._activate(t, e));
    }
    _activate(t, e) {
      t &&
        (t.classList.add(_t),
        this._activate(d.getElementFromSelector(t)),
        this._queueCallback(
          () => {
            "tab" === t.getAttribute("role")
              ? (t.removeAttribute("tabindex"),
                t.setAttribute("aria-selected", !0),
                this._toggleDropDown(t, !0),
                c.trigger(t, bc, { relatedTarget: e }))
              : t.classList.add(rn);
          },
          t,
          t.classList.contains("fade")
        ));
    }
    _deactivate(t, e) {
      t &&
        (t.classList.remove(_t),
        t.blur(),
        this._deactivate(d.getElementFromSelector(t)),
        this._queueCallback(
          () => {
            "tab" === t.getAttribute("role")
              ? (t.setAttribute("aria-selected", !1),
                t.setAttribute("tabindex", "-1"),
                this._toggleDropDown(t, !1),
                c.trigger(t, Ec, { relatedTarget: e }))
              : t.classList.remove(rn);
          },
          t,
          t.classList.contains("fade")
        ));
    }
    _keydown(t) {
      if (![wc, Ks, Oc, Bs, sn, Ys].includes(t.key)) return;
      t.stopPropagation(), t.preventDefault();
      const e = this._getChildren().filter((i) => !et(i));
      let s;
      if ([sn, Ys].includes(t.key)) s = e[t.key === sn ? 0 : e.length - 1];
      else {
        const i = [Ks, Bs].includes(t.key);
        s = Oe(e, t.target, i, !0);
      }
      s && (s.focus({ preventScroll: !0 }), mt.getOrCreateInstance(s).show());
    }
    _getChildren() {
      return d.find(an, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((t) => this._elemIsActive(t)) || null;
    }
    _setInitialAttributes(t, e) {
      this._setAttributeIfNotExists(t, "role", "tablist");
      for (const s of e) this._setInitialAttributesOnChild(s);
    }
    _setInitialAttributesOnChild(t) {
      t = this._getInnerElement(t);
      const e = this._elemIsActive(t),
        s = this._getOuterElement(t);
      t.setAttribute("aria-selected", e),
        s !== t && this._setAttributeIfNotExists(s, "role", "presentation"),
        e || t.setAttribute("tabindex", "-1"),
        this._setAttributeIfNotExists(t, "role", "tab"),
        this._setInitialAttributesOnTargetPanel(t);
    }
    _setInitialAttributesOnTargetPanel(t) {
      const e = d.getElementFromSelector(t);
      e &&
        (this._setAttributeIfNotExists(e, "role", "tabpanel"),
        t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`));
    }
    _toggleDropDown(t, e) {
      const s = this._getOuterElement(t);
      if (!s.classList.contains("dropdown")) return;
      const i = (r, o) => {
        const a = d.findOne(r, s);
        a && a.classList.toggle(o, e);
      };
      i(Fs, _t), i(".dropdown-menu", rn), s.setAttribute("aria-expanded", e);
    }
    _setAttributeIfNotExists(t, e, s) {
      t.hasAttribute(e) || t.setAttribute(e, s);
    }
    _elemIsActive(t) {
      return t.classList.contains(_t);
    }
    _getInnerElement(t) {
      return t.matches(an) ? t : d.findOne(an, t);
    }
    _getOuterElement(t) {
      return t.closest(".nav-item, .list-group-item") || t;
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = mt.getOrCreateInstance(this);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
            throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  c.on(document, Ac, Us, function (n) {
    ["A", "AREA"].includes(this.tagName) && n.preventDefault(),
      !et(this) && mt.getOrCreateInstance(this).show();
  }),
    c.on(window, yc, () => {
      for (const n of d.find(Lc)) mt.getOrCreateInstance(n);
    }),
    W(mt);
  const it = ".bs.toast",
    Mc = `mouseover${it}`,
    Pc = `mouseout${it}`,
    Rc = `focusin${it}`,
    xc = `focusout${it}`,
    kc = `hide${it}`,
    Vc = `hidden${it}`,
    Hc = `show${it}`,
    Wc = `shown${it}`,
    me = "show",
    ge = "showing",
    Bc = { animation: "boolean", autohide: "boolean", delay: "number" },
    Yc = { animation: !0, autohide: !0, delay: 5e3 };
  class Xt extends Y {
    constructor(t, e) {
      super(t, e),
        (this._timeout = null),
        (this._hasMouseInteraction = !1),
        (this._hasKeyboardInteraction = !1),
        this._setListeners();
    }
    static get Default() {
      return Yc;
    }
    static get DefaultType() {
      return Bc;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      c.trigger(this._element, Hc).defaultPrevented ||
        (this._clearTimeout(),
        this._config.animation && this._element.classList.add("fade"),
        this._element.classList.remove("hide"),
        this._element.classList.add(me, ge),
        this._queueCallback(
          () => {
            this._element.classList.remove(ge),
              c.trigger(this._element, Wc),
              this._maybeScheduleHide();
          },
          this._element,
          this._config.animation
        ));
    }
    hide() {
      this.isShown() &&
        !c.trigger(this._element, kc).defaultPrevented &&
        (this._element.classList.add(ge),
        this._queueCallback(
          () => {
            this._element.classList.add("hide"),
              this._element.classList.remove(ge, me),
              c.trigger(this._element, Vc);
          },
          this._element,
          this._config.animation
        ));
    }
    dispose() {
      this._clearTimeout(),
        this.isShown() && this._element.classList.remove(me),
        super.dispose();
    }
    isShown() {
      return this._element.classList.contains(me);
    }
    _maybeScheduleHide() {
      this._config.autohide &&
        (this._hasMouseInteraction ||
          this._hasKeyboardInteraction ||
          (this._timeout = setTimeout(() => {
            this.hide();
          }, this._config.delay)));
    }
    _onInteraction(t, e) {
      switch (t.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = e;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = e;
      }
      if (e) return void this._clearTimeout();
      const s = t.relatedTarget;
      this._element === s ||
        this._element.contains(s) ||
        this._maybeScheduleHide();
    }
    _setListeners() {
      c.on(this._element, Mc, (t) => this._onInteraction(t, !0)),
        c.on(this._element, Pc, (t) => this._onInteraction(t, !1)),
        c.on(this._element, Rc, (t) => this._onInteraction(t, !0)),
        c.on(this._element, xc, (t) => this._onInteraction(t, !1));
    }
    _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Xt.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  return (
    te(Xt),
    W(Xt),
    {
      Alert: Kt,
      Button: Bt,
      Carousel: Ct,
      Collapse: St,
      Dropdown: j,
      Modal: dt,
      Offcanvas: J,
      Popover: _e,
      ScrollSpy: qt,
      Tab: mt,
      Toast: Xt,
      Tooltip: ft,
    }
  );
});
