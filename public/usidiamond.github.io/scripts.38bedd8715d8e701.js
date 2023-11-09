(function (I, vt) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = I.document
        ? vt(I, !0)
        : function (at) {
            if (!at.document)
              throw new Error("jQuery requires a window with a document");
            return vt(at);
          })
    : vt(I);
})(typeof window < "u" ? window : this, function (I, vt) {
  "use strict";
  var at = [],
    ne = Object.getPrototypeOf,
    bt = at.slice,
    Gt = at.flat
      ? function (t) {
          return at.flat.call(t);
        }
      : function (t) {
          return at.concat.apply([], t);
        },
    qt = at.push,
    Pt = at.indexOf,
    re = {},
    ue = re.toString,
    At = re.hasOwnProperty,
    Ve = At.toString,
    Ye = Ve.call(Object),
    X = {},
    V = function (t) {
      return (
        "function" == typeof t &&
        "number" != typeof t.nodeType &&
        "function" != typeof t.item
      );
    },
    Tt = function (t) {
      return null != t && t === t.window;
    },
    $ = I.document,
    De = { type: !0, src: !0, nonce: !0, noModule: !0 };
  function Ge(t, e, n) {
    var r,
      o,
      a = (n = n || $).createElement("script");
    if (((a.text = t), e))
      for (r in De)
        (o = e[r] || (e.getAttribute && e.getAttribute(r))) &&
          a.setAttribute(r, o);
    n.head.appendChild(a).parentNode.removeChild(a);
  }
  function Kt(t) {
    return null == t
      ? t + ""
      : "object" == typeof t || "function" == typeof t
      ? re[ue.call(t)] || "object"
      : typeof t;
  }
  var je = /HTML$/i,
    i = function (t, e) {
      return new i.fn.init(t, e);
    };
  function ye(t) {
    var e = !!t && "length" in t && t.length,
      n = Kt(t);
    return (
      !V(t) &&
      !Tt(t) &&
      ("array" === n ||
        0 === e ||
        ("number" == typeof e && 0 < e && e - 1 in t))
    );
  }
  function nt(t, e) {
    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
  }
  (i.fn = i.prototype =
    {
      jquery: "3.7.1",
      constructor: i,
      length: 0,
      toArray: function () {
        return bt.call(this);
      },
      get: function (t) {
        return null == t
          ? bt.call(this)
          : t < 0
          ? this[t + this.length]
          : this[t];
      },
      pushStack: function (t) {
        var e = i.merge(this.constructor(), t);
        return (e.prevObject = this), e;
      },
      each: function (t) {
        return i.each(this, t);
      },
      map: function (t) {
        return this.pushStack(
          i.map(this, function (e, n) {
            return t.call(e, n, e);
          })
        );
      },
      slice: function () {
        return this.pushStack(bt.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      even: function () {
        return this.pushStack(
          i.grep(this, function (t, e) {
            return (e + 1) % 2;
          })
        );
      },
      odd: function () {
        return this.pushStack(
          i.grep(this, function (t, e) {
            return e % 2;
          })
        );
      },
      eq: function (t) {
        var e = this.length,
          n = +t + (t < 0 ? e : 0);
        return this.pushStack(0 <= n && n < e ? [this[n]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: qt,
      sort: at.sort,
      splice: at.splice,
    }),
    (i.extend = i.fn.extend =
      function () {
        var t,
          e,
          n,
          r,
          o,
          a,
          u = arguments[0] || {},
          p = 1,
          c = arguments.length,
          g = !1;
        for (
          "boolean" == typeof u && ((g = u), (u = arguments[p] || {}), p++),
            "object" == typeof u || V(u) || (u = {}),
            p === c && ((u = this), p--);
          p < c;
          p++
        )
          if (null != (t = arguments[p]))
            for (e in t)
              (r = t[e]),
                "__proto__" !== e &&
                  u !== r &&
                  (g && r && (i.isPlainObject(r) || (o = Array.isArray(r)))
                    ? ((n = u[e]),
                      (a =
                        o && !Array.isArray(n)
                          ? []
                          : o || i.isPlainObject(n)
                          ? n
                          : {}),
                      (o = !1),
                      (u[e] = i.extend(g, a, r)))
                    : void 0 !== r && (u[e] = r));
        return u;
      }),
    i.extend({
      expando: "jQuery" + ("3.7.1" + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (t) {
        throw new Error(t);
      },
      noop: function () {},
      isPlainObject: function (t) {
        var e, n;
        return !(
          !t ||
          "[object Object]" !== ue.call(t) ||
          ((e = ne(t)) &&
            ("function" !=
              typeof (n = At.call(e, "constructor") && e.constructor) ||
              Ve.call(n) !== Ye))
        );
      },
      isEmptyObject: function (t) {
        var e;
        for (e in t) return !1;
        return !0;
      },
      globalEval: function (t, e, n) {
        Ge(t, { nonce: e && e.nonce }, n);
      },
      each: function (t, e) {
        var n,
          r = 0;
        if (ye(t))
          for (n = t.length; r < n && !1 !== e.call(t[r], r, t[r]); r++);
        else for (r in t) if (!1 === e.call(t[r], r, t[r])) break;
        return t;
      },
      text: function (t) {
        var e,
          n = "",
          r = 0,
          o = t.nodeType;
        if (!o) for (; (e = t[r++]); ) n += i.text(e);
        return 1 === o || 11 === o
          ? t.textContent
          : 9 === o
          ? t.documentElement.textContent
          : 3 === o || 4 === o
          ? t.nodeValue
          : n;
      },
      makeArray: function (t, e) {
        var n = e || [];
        return (
          null != t &&
            (ye(Object(t))
              ? i.merge(n, "string" == typeof t ? [t] : t)
              : qt.call(n, t)),
          n
        );
      },
      inArray: function (t, e, n) {
        return null == e ? -1 : Pt.call(e, t, n);
      },
      isXMLDoc: function (t) {
        var n = t && (t.ownerDocument || t).documentElement;
        return !je.test((t && t.namespaceURI) || (n && n.nodeName) || "HTML");
      },
      merge: function (t, e) {
        for (var n = +e.length, r = 0, o = t.length; r < n; r++) t[o++] = e[r];
        return (t.length = o), t;
      },
      grep: function (t, e, n) {
        for (var r = [], o = 0, a = t.length, u = !n; o < a; o++)
          !e(t[o], o) !== u && r.push(t[o]);
        return r;
      },
      map: function (t, e, n) {
        var r,
          o,
          a = 0,
          u = [];
        if (ye(t))
          for (r = t.length; a < r; a++)
            null != (o = e(t[a], a, n)) && u.push(o);
        else for (a in t) null != (o = e(t[a], a, n)) && u.push(o);
        return Gt(u);
      },
      guid: 1,
      support: X,
    }),
    "function" == typeof Symbol &&
      (i.fn[Symbol.iterator] = at[Symbol.iterator]),
    i.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (t, e) {
        re["[object " + e + "]"] = e.toLowerCase();
      }
    );
  var Ke = at.pop,
    be = at.sort,
    Qe = at.splice,
    J = "[\\x20\\t\\r\\n\\f]",
    le = new RegExp("^" + J + "+|((?:^|[^\\\\])(?:\\\\.)*)" + J + "+$", "g");
  i.contains = function (t, e) {
    var n = e && e.parentNode;
    return (
      t === n ||
      !(
        !n ||
        1 !== n.nodeType ||
        !(t.contains
          ? t.contains(n)
          : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n))
      )
    );
  };
  var Je = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
  function hn(t, e) {
    return e
      ? "\0" === t
        ? "\ufffd"
        : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " "
      : "\\" + t;
  }
  i.escapeSelector = function (t) {
    return (t + "").replace(Je, hn);
  };
  var jt = $,
    ce = qt;
  !(function () {
    var t,
      e,
      n,
      r,
      o,
      a,
      u,
      p,
      c,
      g,
      b = ce,
      w = i.expando,
      v = 0,
      S = 0,
      M = ut(),
      _ = ut(),
      U = ut(),
      st = ut(),
      ht = function (l, h) {
        return l === h && (o = !0), 0;
      },
      zt =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      Xt =
        "(?:\\\\[\\da-fA-F]{1,6}" +
        J +
        "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
      Q =
        "\\[" +
        J +
        "*(" +
        Xt +
        ")(?:" +
        J +
        "*([*^$|!~]?=)" +
        J +
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
        Xt +
        "))|)" +
        J +
        "*\\]",
      ge =
        ":(" +
        Xt +
        ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
        Q +
        ")*)|.*)\\)|)",
      tt = new RegExp(J + "+", "g"),
      ot = new RegExp("^" + J + "*," + J + "*"),
      Ue = new RegExp("^" + J + "*([>+~]|" + J + ")" + J + "*"),
      Ln = new RegExp(J + "|>"),
      Vt = new RegExp(ge),
      ze = new RegExp("^" + Xt + "$"),
      ee = {
        ID: new RegExp("^#(" + Xt + ")"),
        CLASS: new RegExp("^\\.(" + Xt + ")"),
        TAG: new RegExp("^(" + Xt + "|[*])"),
        ATTR: new RegExp("^" + Q),
        PSEUDO: new RegExp("^" + ge),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            J +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            J +
            "*(?:([+-]|)" +
            J +
            "*(\\d+)|))" +
            J +
            "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + zt + ")$", "i"),
        needsContext: new RegExp(
          "^" +
            J +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            J +
            "*((?:-\\d)?\\d*)" +
            J +
            "*\\)|)(?=[^-]|$)",
          "i"
        ),
      },
      oe = /^(?:input|select|textarea|button)$/i,
      Se = /^h\d$/i,
      Ht = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      gt = /[+~]/,
      ft = new RegExp("\\\\[\\da-fA-F]{1,6}" + J + "?|\\\\([^\\r\\n\\f])", "g"),
      Et = function (l, h) {
        var y = "0x" + l.slice(1) - 65536;
        return (
          h ||
          (y < 0
            ? String.fromCharCode(y + 65536)
            : String.fromCharCode((y >> 10) | 55296, (1023 & y) | 56320))
        );
      },
      ae = function () {
        se();
      },
      Ct = fn(
        function (l) {
          return !0 === l.disabled && nt(l, "fieldset");
        },
        { dir: "parentNode", next: "legend" }
      );
    try {
      b.apply((at = bt.call(jt.childNodes)), jt.childNodes);
    } catch {
      b = {
        apply: function (h, y) {
          ce.apply(h, bt.call(y));
        },
        call: function (h) {
          ce.apply(h, bt.call(arguments, 1));
        },
      };
    }
    function F(l, h, y, x) {
      var E,
        N,
        L,
        q,
        j,
        et,
        z,
        Y = h && h.ownerDocument,
        Z = h ? h.nodeType : 9;
      if (
        ((y = y || []),
        "string" != typeof l || !l || (1 !== Z && 9 !== Z && 11 !== Z))
      )
        return y;
      if (!x && (se(h), (h = h || a), p)) {
        if (11 !== Z && (j = Ht.exec(l)))
          if ((E = j[1])) {
            if (9 === Z) {
              if (!(L = h.getElementById(E))) return y;
              if (L.id === E) return b.call(y, L), y;
            } else if (
              Y &&
              (L = Y.getElementById(E)) &&
              F.contains(h, L) &&
              L.id === E
            )
              return b.call(y, L), y;
          } else {
            if (j[2]) return b.apply(y, h.getElementsByTagName(l)), y;
            if ((E = j[3]) && h.getElementsByClassName)
              return b.apply(y, h.getElementsByClassName(E)), y;
          }
        if (!(st[l + " "] || (c && c.test(l)))) {
          if (((z = l), (Y = h), 1 === Z && (Ln.test(l) || Ue.test(l)))) {
            for (
              ((Y = (gt.test(l) && On(h.parentNode)) || h) == h && X.scope) ||
                ((q = h.getAttribute("id"))
                  ? (q = i.escapeSelector(q))
                  : h.setAttribute("id", (q = w))),
                N = (et = Xe(l)).length;
              N--;

            )
              et[N] = (q ? "#" + q : ":scope") + " " + cn(et[N]);
            z = et.join(",");
          }
          try {
            return b.apply(y, Y.querySelectorAll(z)), y;
          } catch {
            st(l, !0);
          } finally {
            q === w && h.removeAttribute("id");
          }
        }
      }
      return ur(l.replace(le, "$1"), h, y, x);
    }
    function ut() {
      var l = [];
      return function h(y, x) {
        return (
          l.push(y + " ") > e.cacheLength && delete h[l.shift()],
          (h[y + " "] = x)
        );
      };
    }
    function lt(l) {
      return (l[w] = !0), l;
    }
    function rt(l) {
      var h = a.createElement("fieldset");
      try {
        return !!l(h);
      } catch {
        return !1;
      } finally {
        h.parentNode && h.parentNode.removeChild(h), (h = null);
      }
    }
    function Yt(l) {
      return function (h) {
        return nt(h, "input") && h.type === l;
      };
    }
    function ke(l) {
      return function (h) {
        return (nt(h, "input") || nt(h, "button")) && h.type === l;
      };
    }
    function ln(l) {
      return function (h) {
        return "form" in h
          ? h.parentNode && !1 === h.disabled
            ? "label" in h
              ? "label" in h.parentNode
                ? h.parentNode.disabled === l
                : h.disabled === l
              : h.isDisabled === l || (h.isDisabled !== !l && Ct(h) === l)
            : h.disabled === l
          : "label" in h && h.disabled === l;
      };
    }
    function me(l) {
      return lt(function (h) {
        return (
          (h = +h),
          lt(function (y, x) {
            for (var E, N = l([], y.length, h), L = N.length; L--; )
              y[(E = N[L])] && (y[E] = !(x[E] = y[E]));
          })
        );
      });
    }
    function On(l) {
      return l && typeof l.getElementsByTagName < "u" && l;
    }
    function se(l) {
      var h,
        y = l ? l.ownerDocument || l : jt;
      return (
        y != a &&
          9 === y.nodeType &&
          y.documentElement &&
          ((u = (a = y).documentElement),
          (p = !i.isXMLDoc(a)),
          (g = u.matches || u.webkitMatchesSelector || u.msMatchesSelector),
          u.msMatchesSelector &&
            jt != a &&
            (h = a.defaultView) &&
            h.top !== h &&
            h.addEventListener("unload", ae),
          (X.getById = rt(function (x) {
            return (
              (u.appendChild(x).id = i.expando),
              !a.getElementsByName || !a.getElementsByName(i.expando).length
            );
          })),
          (X.disconnectedMatch = rt(function (x) {
            return g.call(x, "*");
          })),
          (X.scope = rt(function () {
            return a.querySelectorAll(":scope");
          })),
          (X.cssHas = rt(function () {
            try {
              return a.querySelector(":has(*,:jqfake)"), !1;
            } catch {
              return !0;
            }
          })),
          X.getById
            ? ((e.filter.ID = function (x) {
                var E = x.replace(ft, Et);
                return function (N) {
                  return N.getAttribute("id") === E;
                };
              }),
              (e.find.ID = function (x, E) {
                if (typeof E.getElementById < "u" && p) {
                  var N = E.getElementById(x);
                  return N ? [N] : [];
                }
              }))
            : ((e.filter.ID = function (x) {
                var E = x.replace(ft, Et);
                return function (N) {
                  var L =
                    typeof N.getAttributeNode < "u" && N.getAttributeNode("id");
                  return L && L.value === E;
                };
              }),
              (e.find.ID = function (x, E) {
                if (typeof E.getElementById < "u" && p) {
                  var N,
                    L,
                    q,
                    j = E.getElementById(x);
                  if (j) {
                    if ((N = j.getAttributeNode("id")) && N.value === x)
                      return [j];
                    for (q = E.getElementsByName(x), L = 0; (j = q[L++]); )
                      if ((N = j.getAttributeNode("id")) && N.value === x)
                        return [j];
                  }
                  return [];
                }
              })),
          (e.find.TAG = function (x, E) {
            return typeof E.getElementsByTagName < "u"
              ? E.getElementsByTagName(x)
              : E.querySelectorAll(x);
          }),
          (e.find.CLASS = function (x, E) {
            if (typeof E.getElementsByClassName < "u" && p)
              return E.getElementsByClassName(x);
          }),
          (c = []),
          rt(function (x) {
            var E;
            (u.appendChild(x).innerHTML =
              "<a id='" +
              w +
              "' href='' disabled='disabled'></a><select id='" +
              w +
              "-\r\\' disabled='disabled'><option selected=''></option></select>"),
              x.querySelectorAll("[selected]").length ||
                c.push("\\[" + J + "*(?:value|" + zt + ")"),
              x.querySelectorAll("[id~=" + w + "-]").length || c.push("~="),
              x.querySelectorAll("a#" + w + "+*").length || c.push(".#.+[+~]"),
              x.querySelectorAll(":checked").length || c.push(":checked"),
              (E = a.createElement("input")).setAttribute("type", "hidden"),
              x.appendChild(E).setAttribute("name", "D"),
              (u.appendChild(x).disabled = !0),
              2 !== x.querySelectorAll(":disabled").length &&
                c.push(":enabled", ":disabled"),
              (E = a.createElement("input")).setAttribute("name", ""),
              x.appendChild(E),
              x.querySelectorAll("[name='']").length ||
                c.push("\\[" + J + "*name" + J + "*=" + J + "*(?:''|\"\")");
          }),
          X.cssHas || c.push(":has"),
          (c = c.length && new RegExp(c.join("|"))),
          (ht = function (x, E) {
            if (x === E) return (o = !0), 0;
            var N = !x.compareDocumentPosition - !E.compareDocumentPosition;
            return (
              N ||
              (1 &
                (N =
                  (x.ownerDocument || x) == (E.ownerDocument || E)
                    ? x.compareDocumentPosition(E)
                    : 1) ||
              (!X.sortDetached && E.compareDocumentPosition(x) === N)
                ? x === a || (x.ownerDocument == jt && F.contains(jt, x))
                  ? -1
                  : E === a || (E.ownerDocument == jt && F.contains(jt, E))
                  ? 1
                  : r
                  ? Pt.call(r, x) - Pt.call(r, E)
                  : 0
                : 4 & N
                ? -1
                : 1)
            );
          })),
        a
      );
    }
    for (t in ((F.matches = function (l, h) {
      return F(l, null, null, h);
    }),
    (F.matchesSelector = function (l, h) {
      if ((se(l), p && !st[h + " "] && (!c || !c.test(h))))
        try {
          var y = g.call(l, h);
          if (
            y ||
            X.disconnectedMatch ||
            (l.document && 11 !== l.document.nodeType)
          )
            return y;
        } catch {
          st(h, !0);
        }
      return 0 < F(h, a, null, [l]).length;
    }),
    (F.contains = function (l, h) {
      return (l.ownerDocument || l) != a && se(l), i.contains(l, h);
    }),
    (F.attr = function (l, h) {
      (l.ownerDocument || l) != a && se(l);
      var y = e.attrHandle[h.toLowerCase()],
        x = y && At.call(e.attrHandle, h.toLowerCase()) ? y(l, h, !p) : void 0;
      return void 0 !== x ? x : l.getAttribute(h);
    }),
    (F.error = function (l) {
      throw new Error("Syntax error, unrecognized expression: " + l);
    }),
    (i.uniqueSort = function (l) {
      var h,
        y = [],
        x = 0,
        E = 0;
      if (
        ((o = !X.sortStable),
        (r = !X.sortStable && bt.call(l, 0)),
        be.call(l, ht),
        o)
      ) {
        for (; (h = l[E++]); ) h === l[E] && (x = y.push(E));
        for (; x--; ) Qe.call(l, y[x], 1);
      }
      return (r = null), l;
    }),
    (i.fn.uniqueSort = function () {
      return this.pushStack(i.uniqueSort(bt.apply(this)));
    }),
    ((e = i.expr =
      {
        cacheLength: 50,
        createPseudo: lt,
        match: ee,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (l) {
            return (
              (l[1] = l[1].replace(ft, Et)),
              (l[3] = (l[3] || l[4] || l[5] || "").replace(ft, Et)),
              "~=" === l[2] && (l[3] = " " + l[3] + " "),
              l.slice(0, 4)
            );
          },
          CHILD: function (l) {
            return (
              (l[1] = l[1].toLowerCase()),
              "nth" === l[1].slice(0, 3)
                ? (l[3] || F.error(l[0]),
                  (l[4] = +(l[4]
                    ? l[5] + (l[6] || 1)
                    : 2 * ("even" === l[3] || "odd" === l[3]))),
                  (l[5] = +(l[7] + l[8] || "odd" === l[3])))
                : l[3] && F.error(l[0]),
              l
            );
          },
          PSEUDO: function (l) {
            var h,
              y = !l[6] && l[2];
            return ee.CHILD.test(l[0])
              ? null
              : (l[3]
                  ? (l[2] = l[4] || l[5] || "")
                  : y &&
                    Vt.test(y) &&
                    (h = Xe(y, !0)) &&
                    (h = y.indexOf(")", y.length - h) - y.length) &&
                    ((l[0] = l[0].slice(0, h)), (l[2] = y.slice(0, h))),
                l.slice(0, 3));
          },
        },
        filter: {
          TAG: function (l) {
            var h = l.replace(ft, Et).toLowerCase();
            return "*" === l
              ? function () {
                  return !0;
                }
              : function (y) {
                  return nt(y, h);
                };
          },
          CLASS: function (l) {
            var h = M[l + " "];
            return (
              h ||
              ((h = new RegExp("(^|" + J + ")" + l + "(" + J + "|$)")) &&
                M(l, function (y) {
                  return h.test(
                    ("string" == typeof y.className && y.className) ||
                      (typeof y.getAttribute < "u" &&
                        y.getAttribute("class")) ||
                      ""
                  );
                }))
            );
          },
          ATTR: function (l, h, y) {
            return function (x) {
              var E = F.attr(x, l);
              return null == E
                ? "!=" === h
                : !h ||
                    ((E += ""),
                    "=" === h
                      ? E === y
                      : "!=" === h
                      ? E !== y
                      : "^=" === h
                      ? y && 0 === E.indexOf(y)
                      : "*=" === h
                      ? y && -1 < E.indexOf(y)
                      : "$=" === h
                      ? y && E.slice(-y.length) === y
                      : "~=" === h
                      ? -1 < (" " + E.replace(tt, " ") + " ").indexOf(y)
                      : "|=" === h &&
                        (E === y || E.slice(0, y.length + 1) === y + "-"));
            };
          },
          CHILD: function (l, h, y, x, E) {
            var N = "nth" !== l.slice(0, 3),
              L = "last" !== l.slice(-4),
              q = "of-type" === h;
            return 1 === x && 0 === E
              ? function (j) {
                  return !!j.parentNode;
                }
              : function (j, et, z) {
                  var Y,
                    Z,
                    B,
                    pt,
                    wt,
                    mt = N !== L ? "nextSibling" : "previousSibling",
                    kt = j.parentNode,
                    Dt = q && j.nodeName.toLowerCase(),
                    Bt = !z && !q,
                    it = !1;
                  if (kt) {
                    if (N) {
                      for (; mt; ) {
                        for (B = j; (B = B[mt]); )
                          if (q ? nt(B, Dt) : 1 === B.nodeType) return !1;
                        wt = mt = "only" === l && !wt && "nextSibling";
                      }
                      return !0;
                    }
                    if (((wt = [L ? kt.firstChild : kt.lastChild]), L && Bt)) {
                      for (
                        it =
                          (pt =
                            (Y = (Z = kt[w] || (kt[w] = {}))[l] || [])[0] ===
                              v && Y[1]) && Y[2],
                          B = pt && kt.childNodes[pt];
                        (B = (++pt && B && B[mt]) || (it = pt = 0) || wt.pop());

                      )
                        if (1 === B.nodeType && ++it && B === j) {
                          Z[l] = [v, pt, it];
                          break;
                        }
                    } else if (
                      (Bt &&
                        (it = pt =
                          (Y = (Z = j[w] || (j[w] = {}))[l] || [])[0] === v &&
                          Y[1]),
                      !1 === it)
                    )
                      for (
                        ;
                        (B =
                          (++pt && B && B[mt]) || (it = pt = 0) || wt.pop()) &&
                        (!(q ? nt(B, Dt) : 1 === B.nodeType) ||
                          !++it ||
                          (Bt && ((Z = B[w] || (B[w] = {}))[l] = [v, it]),
                          B !== j));

                      );
                    return (it -= E) === x || (it % x == 0 && 0 <= it / x);
                  }
                };
          },
          PSEUDO: function (l, h) {
            var y,
              x =
                e.pseudos[l] ||
                e.setFilters[l.toLowerCase()] ||
                F.error("unsupported pseudo: " + l);
            return x[w]
              ? x(h)
              : 1 < x.length
              ? ((y = [l, l, "", h]),
                e.setFilters.hasOwnProperty(l.toLowerCase())
                  ? lt(function (E, N) {
                      for (var L, q = x(E, h), j = q.length; j--; )
                        E[(L = Pt.call(E, q[j]))] = !(N[L] = q[j]);
                    })
                  : function (E) {
                      return x(E, 0, y);
                    })
              : x;
          },
        },
        pseudos: {
          not: lt(function (l) {
            var h = [],
              y = [],
              x = Mn(l.replace(le, "$1"));
            return x[w]
              ? lt(function (E, N, L, q) {
                  for (var j, et = x(E, null, q, []), z = E.length; z--; )
                    (j = et[z]) && (E[z] = !(N[z] = j));
                })
              : function (E, N, L) {
                  return (h[0] = E), x(h, null, L, y), (h[0] = null), !y.pop();
                };
          }),
          has: lt(function (l) {
            return function (h) {
              return 0 < F(l, h).length;
            };
          }),
          contains: lt(function (l) {
            return (
              (l = l.replace(ft, Et)),
              function (h) {
                return -1 < (h.textContent || i.text(h)).indexOf(l);
              }
            );
          }),
          lang: lt(function (l) {
            return (
              ze.test(l || "") || F.error("unsupported lang: " + l),
              (l = l.replace(ft, Et).toLowerCase()),
              function (h) {
                var y;
                do {
                  if (
                    (y = p
                      ? h.lang
                      : h.getAttribute("xml:lang") || h.getAttribute("lang"))
                  )
                    return (
                      (y = y.toLowerCase()) === l || 0 === y.indexOf(l + "-")
                    );
                } while ((h = h.parentNode) && 1 === h.nodeType);
                return !1;
              }
            );
          }),
          target: function (l) {
            var h = I.location && I.location.hash;
            return h && h.slice(1) === l.id;
          },
          root: function (l) {
            return l === u;
          },
          focus: function (l) {
            return (
              l ===
                (function () {
                  try {
                    return a.activeElement;
                  } catch {}
                })() &&
              a.hasFocus() &&
              !!(l.type || l.href || ~l.tabIndex)
            );
          },
          enabled: ln(!1),
          disabled: ln(!0),
          checked: function (l) {
            return (
              (nt(l, "input") && !!l.checked) ||
              (nt(l, "option") && !!l.selected)
            );
          },
          selected: function (l) {
            return !0 === l.selected;
          },
          empty: function (l) {
            for (l = l.firstChild; l; l = l.nextSibling)
              if (l.nodeType < 6) return !1;
            return !0;
          },
          parent: function (l) {
            return !e.pseudos.empty(l);
          },
          header: function (l) {
            return Se.test(l.nodeName);
          },
          input: function (l) {
            return oe.test(l.nodeName);
          },
          button: function (l) {
            return (nt(l, "input") && "button" === l.type) || nt(l, "button");
          },
          text: function (l) {
            var h;
            return (
              nt(l, "input") &&
              "text" === l.type &&
              (null == (h = l.getAttribute("type")) ||
                "text" === h.toLowerCase())
            );
          },
          first: me(function () {
            return [0];
          }),
          last: me(function (l, h) {
            return [h - 1];
          }),
          eq: me(function (l, h, y) {
            return [y < 0 ? y + h : y];
          }),
          even: me(function (l, h) {
            for (var y = 0; y < h; y += 2) l.push(y);
            return l;
          }),
          odd: me(function (l, h) {
            for (var y = 1; y < h; y += 2) l.push(y);
            return l;
          }),
          lt: me(function (l, h, y) {
            var x;
            for (x = y < 0 ? y + h : h < y ? h : y; 0 <= --x; ) l.push(x);
            return l;
          }),
          gt: me(function (l, h, y) {
            for (var x = y < 0 ? y + h : y; ++x < h; ) l.push(x);
            return l;
          }),
        },
      }).pseudos.nth = e.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      e.pseudos[t] = Yt(t);
    for (t in { submit: !0, reset: !0 }) e.pseudos[t] = ke(t);
    function sr() {}
    function Xe(l, h) {
      var y,
        x,
        E,
        N,
        L,
        q,
        j,
        et = _[l + " "];
      if (et) return h ? 0 : et.slice(0);
      for (L = l, q = [], j = e.preFilter; L; ) {
        for (N in ((y && !(x = ot.exec(L))) ||
          (x && (L = L.slice(x[0].length) || L), q.push((E = []))),
        (y = !1),
        (x = Ue.exec(L)) &&
          ((y = x.shift()),
          E.push({ value: y, type: x[0].replace(le, " ") }),
          (L = L.slice(y.length))),
        e.filter))
          !(x = ee[N].exec(L)) ||
            (j[N] && !(x = j[N](x))) ||
            ((y = x.shift()),
            E.push({ value: y, type: N, matches: x }),
            (L = L.slice(y.length)));
        if (!y) break;
      }
      return h ? L.length : L ? F.error(l) : _(l, q).slice(0);
    }
    function cn(l) {
      for (var h = 0, y = l.length, x = ""; h < y; h++) x += l[h].value;
      return x;
    }
    function fn(l, h, y) {
      var x = h.dir,
        E = h.next,
        N = E || x,
        L = y && "parentNode" === N,
        q = S++;
      return h.first
        ? function (j, et, z) {
            for (; (j = j[x]); ) if (1 === j.nodeType || L) return l(j, et, z);
            return !1;
          }
        : function (j, et, z) {
            var Y,
              Z,
              B = [v, q];
            if (z) {
              for (; (j = j[x]); )
                if ((1 === j.nodeType || L) && l(j, et, z)) return !0;
            } else
              for (; (j = j[x]); )
                if (1 === j.nodeType || L)
                  if (((Z = j[w] || (j[w] = {})), E && nt(j, E))) j = j[x] || j;
                  else {
                    if ((Y = Z[N]) && Y[0] === v && Y[1] === q)
                      return (B[2] = Y[2]);
                    if (((Z[N] = B)[2] = l(j, et, z))) return !0;
                  }
            return !1;
          };
    }
    function Hn(l) {
      return 1 < l.length
        ? function (h, y, x) {
            for (var E = l.length; E--; ) if (!l[E](h, y, x)) return !1;
            return !0;
          }
        : l[0];
    }
    function pn(l, h, y, x, E) {
      for (var N, L = [], q = 0, j = l.length, et = null != h; q < j; q++)
        (N = l[q]) && ((y && !y(N, x, E)) || (L.push(N), et && h.push(q)));
      return L;
    }
    function qn(l, h, y, x, E, N) {
      return (
        x && !x[w] && (x = qn(x)),
        E && !E[w] && (E = qn(E, N)),
        lt(function (L, q, j, et) {
          var z,
            Y,
            Z,
            B,
            pt = [],
            wt = [],
            mt = q.length,
            kt =
              L ||
              (function (Bt, it, ve) {
                for (var $t = 0, dn = it.length; $t < dn; $t++)
                  F(Bt, it[$t], ve);
                return ve;
              })(h || "*", j.nodeType ? [j] : j, []),
            Dt = !l || (!L && h) ? kt : pn(kt, pt, l, j, et);
          if (
            (y ? y(Dt, (B = E || (L ? l : mt || x) ? [] : q), j, et) : (B = Dt),
            x)
          )
            for (z = pn(B, wt), x(z, [], j, et), Y = z.length; Y--; )
              (Z = z[Y]) && (B[wt[Y]] = !(Dt[wt[Y]] = Z));
          if (L) {
            if (E || l) {
              if (E) {
                for (z = [], Y = B.length; Y--; )
                  (Z = B[Y]) && z.push((Dt[Y] = Z));
                E(null, (B = []), z, et);
              }
              for (Y = B.length; Y--; )
                (Z = B[Y]) &&
                  -1 < (z = E ? Pt.call(L, Z) : pt[Y]) &&
                  (L[z] = !(q[z] = Z));
            }
          } else (B = pn(B === q ? B.splice(mt, B.length) : B)), E ? E(null, q, B, et) : b.apply(q, B);
        })
      );
    }
    function Pn(l) {
      for (
        var h,
          y,
          x,
          E = l.length,
          N = e.relative[l[0].type],
          L = N || e.relative[" "],
          q = N ? 1 : 0,
          j = fn(
            function (Y) {
              return Y === h;
            },
            L,
            !0
          ),
          et = fn(
            function (Y) {
              return -1 < Pt.call(h, Y);
            },
            L,
            !0
          ),
          z = [
            function (Y, Z, B) {
              var pt =
                (!N && (B || Z != n)) ||
                ((h = Z).nodeType ? j(Y, Z, B) : et(Y, Z, B));
              return (h = null), pt;
            },
          ];
        q < E;
        q++
      )
        if ((y = e.relative[l[q].type])) z = [fn(Hn(z), y)];
        else {
          if ((y = e.filter[l[q].type].apply(null, l[q].matches))[w]) {
            for (x = ++q; x < E && !e.relative[l[x].type]; x++);
            return qn(
              1 < q && Hn(z),
              1 < q &&
                cn(
                  l
                    .slice(0, q - 1)
                    .concat({ value: " " === l[q - 2].type ? "*" : "" })
                ).replace(le, "$1"),
              y,
              q < x && Pn(l.slice(q, x)),
              x < E && Pn((l = l.slice(x))),
              x < E && cn(l)
            );
          }
          z.push(y);
        }
      return Hn(z);
    }
    function Mn(l, h) {
      var y,
        x,
        E,
        N,
        L,
        q,
        j = [],
        et = [],
        z = U[l + " "];
      if (!z) {
        for (h || (h = Xe(l)), y = h.length; y--; )
          (z = Pn(h[y]))[w] ? j.push(z) : et.push(z);
        (z = U(
          l,
          ((x = et),
          (N = 0 < (E = j).length),
          (L = 0 < x.length),
          (q = function (Y, Z, B, pt, wt) {
            var mt,
              kt,
              Dt,
              Bt = 0,
              it = "0",
              ve = Y && [],
              $t = [],
              dn = n,
              lr = Y || (L && e.find.TAG("*", wt)),
              cr = (v += null == dn ? 1 : Math.random() || 0.1),
              qr = lr.length;
            for (
              wt && (n = Z == a || Z || wt);
              it !== qr && null != (mt = lr[it]);
              it++
            ) {
              if (L && mt) {
                for (
                  kt = 0, Z || mt.ownerDocument == a || (se(mt), (B = !p));
                  (Dt = x[kt++]);

                )
                  if (Dt(mt, Z || a, B)) {
                    b.call(pt, mt);
                    break;
                  }
                wt && (v = cr);
              }
              N && ((mt = !Dt && mt) && Bt--, Y && ve.push(mt));
            }
            if (((Bt += it), N && it !== Bt)) {
              for (kt = 0; (Dt = E[kt++]); ) Dt(ve, $t, Z, B);
              if (Y) {
                if (0 < Bt)
                  for (; it--; ) ve[it] || $t[it] || ($t[it] = Ke.call(pt));
                $t = pn($t);
              }
              b.apply(pt, $t),
                wt &&
                  !Y &&
                  0 < $t.length &&
                  1 < Bt + E.length &&
                  i.uniqueSort(pt);
            }
            return wt && ((v = cr), (n = dn)), ve;
          }),
          N ? lt(q) : q)
        )).selector = l;
      }
      return z;
    }
    function ur(l, h, y, x) {
      var E,
        N,
        L,
        q,
        j,
        et = "function" == typeof l && l,
        z = !x && Xe((l = et.selector || l));
      if (((y = y || []), 1 === z.length)) {
        if (
          2 < (N = z[0] = z[0].slice(0)).length &&
          "ID" === (L = N[0]).type &&
          9 === h.nodeType &&
          p &&
          e.relative[N[1].type]
        ) {
          if (!(h = (e.find.ID(L.matches[0].replace(ft, Et), h) || [])[0]))
            return y;
          et && (h = h.parentNode), (l = l.slice(N.shift().value.length));
        }
        for (
          E = ee.needsContext.test(l) ? 0 : N.length;
          E-- && !e.relative[(q = (L = N[E]).type)];

        )
          if (
            (j = e.find[q]) &&
            (x = j(
              L.matches[0].replace(ft, Et),
              (gt.test(N[0].type) && On(h.parentNode)) || h
            ))
          ) {
            if ((N.splice(E, 1), !(l = x.length && cn(N))))
              return b.apply(y, x), y;
            break;
          }
      }
      return (
        (et || Mn(l, z))(
          x,
          h,
          !p,
          y,
          !h || (gt.test(l) && On(h.parentNode)) || h
        ),
        y
      );
    }
    (sr.prototype = e.filters = e.pseudos),
      (e.setFilters = new sr()),
      (X.sortStable = w.split("").sort(ht).join("") === w),
      se(),
      (X.sortDetached = rt(function (l) {
        return 1 & l.compareDocumentPosition(a.createElement("fieldset"));
      })),
      (i.find = F),
      (i.expr[":"] = i.expr.pseudos),
      (i.unique = i.uniqueSort),
      (F.compile = Mn),
      (F.select = ur),
      (F.setDocument = se),
      (F.tokenize = Xe),
      (F.escape = i.escapeSelector),
      (F.getText = i.text),
      (F.isXML = i.isXMLDoc),
      (F.selectors = i.expr),
      (F.support = i.support),
      (F.uniqueSort = i.uniqueSort);
  })();
  var ie = function (t, e, n) {
      for (var r = [], o = void 0 !== n; (t = t[e]) && 9 !== t.nodeType; )
        if (1 === t.nodeType) {
          if (o && i(t).is(n)) break;
          r.push(t);
        }
      return r;
    },
    Ne = function (t, e) {
      for (var n = []; t; t = t.nextSibling)
        1 === t.nodeType && t !== e && n.push(t);
      return n;
    },
    Le = i.expr.match.needsContext,
    Ze = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function Oe(t, e, n) {
    return V(e)
      ? i.grep(t, function (r, o) {
          return !!e.call(r, o, r) !== n;
        })
      : e.nodeType
      ? i.grep(t, function (r) {
          return (r === e) !== n;
        })
      : "string" != typeof e
      ? i.grep(t, function (r) {
          return -1 < Pt.call(e, r) !== n;
        })
      : i.filter(e, t, n);
  }
  (i.filter = function (t, e, n) {
    var r = e[0];
    return (
      n && (t = ":not(" + t + ")"),
      1 === e.length && 1 === r.nodeType
        ? i.find.matchesSelector(r, t)
          ? [r]
          : []
        : i.find.matches(
            t,
            i.grep(e, function (o) {
              return 1 === o.nodeType;
            })
          )
    );
  }),
    i.fn.extend({
      find: function (t) {
        var e,
          n,
          r = this.length,
          o = this;
        if ("string" != typeof t)
          return this.pushStack(
            i(t).filter(function () {
              for (e = 0; e < r; e++) if (i.contains(o[e], this)) return !0;
            })
          );
        for (n = this.pushStack([]), e = 0; e < r; e++) i.find(t, o[e], n);
        return 1 < r ? i.uniqueSort(n) : n;
      },
      filter: function (t) {
        return this.pushStack(Oe(this, t || [], !1));
      },
      not: function (t) {
        return this.pushStack(Oe(this, t || [], !0));
      },
      is: function (t) {
        return !!Oe(
          this,
          "string" == typeof t && Le.test(t) ? i(t) : t || [],
          !1
        ).length;
      },
    });
  var tn,
    gn = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((i.fn.init = function (t, e, n) {
    var r, o;
    if (!t) return this;
    if (((n = n || tn), "string" == typeof t)) {
      if (
        !(r =
          "<" === t[0] && ">" === t[t.length - 1] && 3 <= t.length
            ? [null, t, null]
            : gn.exec(t)) ||
        (!r[1] && e)
      )
        return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
      if (r[1]) {
        if (
          (i.merge(
            this,
            i.parseHTML(
              r[1],
              (e = e instanceof i ? e[0] : e) && e.nodeType
                ? e.ownerDocument || e
                : $,
              !0
            )
          ),
          Ze.test(r[1]) && i.isPlainObject(e))
        )
          for (r in e) V(this[r]) ? this[r](e[r]) : this.attr(r, e[r]);
        return this;
      }
      return (
        (o = $.getElementById(r[2])) && ((this[0] = o), (this.length = 1)), this
      );
    }
    return t.nodeType
      ? ((this[0] = t), (this.length = 1), this)
      : V(t)
      ? void 0 !== n.ready
        ? n.ready(t)
        : t(i)
      : i.makeArray(t, this);
  }).prototype = i.fn),
    (tn = i($));
  var He = /^(?:parents|prev(?:Until|All))/,
    qe = { children: !0, contents: !0, next: !0, prev: !0 };
  function en(t, e) {
    for (; (t = t[e]) && 1 !== t.nodeType; );
    return t;
  }
  i.fn.extend({
    has: function (t) {
      var e = i(t, this),
        n = e.length;
      return this.filter(function () {
        for (var r = 0; r < n; r++) if (i.contains(this, e[r])) return !0;
      });
    },
    closest: function (t, e) {
      var n,
        r = 0,
        o = this.length,
        a = [],
        u = "string" != typeof t && i(t);
      if (!Le.test(t))
        for (; r < o; r++)
          for (n = this[r]; n && n !== e; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (u
                ? -1 < u.index(n)
                : 1 === n.nodeType && i.find.matchesSelector(n, t))
            ) {
              a.push(n);
              break;
            }
      return this.pushStack(1 < a.length ? i.uniqueSort(a) : a);
    },
    index: function (t) {
      return t
        ? "string" == typeof t
          ? Pt.call(i(t), this[0])
          : Pt.call(this, t.jquery ? t[0] : t)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (t, e) {
      return this.pushStack(i.uniqueSort(i.merge(this.get(), i(t, e))));
    },
    addBack: function (t) {
      return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
    },
  }),
    i.each(
      {
        parent: function (t) {
          var e = t.parentNode;
          return e && 11 !== e.nodeType ? e : null;
        },
        parents: function (t) {
          return ie(t, "parentNode");
        },
        parentsUntil: function (t, e, n) {
          return ie(t, "parentNode", n);
        },
        next: function (t) {
          return en(t, "nextSibling");
        },
        prev: function (t) {
          return en(t, "previousSibling");
        },
        nextAll: function (t) {
          return ie(t, "nextSibling");
        },
        prevAll: function (t) {
          return ie(t, "previousSibling");
        },
        nextUntil: function (t, e, n) {
          return ie(t, "nextSibling", n);
        },
        prevUntil: function (t, e, n) {
          return ie(t, "previousSibling", n);
        },
        siblings: function (t) {
          return Ne((t.parentNode || {}).firstChild, t);
        },
        children: function (t) {
          return Ne(t.firstChild);
        },
        contents: function (t) {
          return null != t.contentDocument && ne(t.contentDocument)
            ? t.contentDocument
            : (nt(t, "template") && (t = t.content || t),
              i.merge([], t.childNodes));
        },
      },
      function (t, e) {
        i.fn[t] = function (n, r) {
          var o = i.map(this, e, n);
          return (
            "Until" !== t.slice(-5) && (r = n),
            r && "string" == typeof r && (o = i.filter(r, o)),
            1 < this.length &&
              (qe[t] || i.uniqueSort(o), He.test(t) && o.reverse()),
            this.pushStack(o)
          );
        };
      }
    );
  var Nt = /[^\x20\t\r\n\f]+/g;
  function Qt(t) {
    return t;
  }
  function xe(t) {
    throw t;
  }
  function Pe(t, e, n, r) {
    var o;
    try {
      t && V((o = t.promise))
        ? o.call(t).done(e).fail(n)
        : t && V((o = t.then))
        ? o.call(t, e, n)
        : e.apply(void 0, [t].slice(r));
    } catch (a) {
      n.apply(void 0, [a]);
    }
  }
  (i.Callbacks = function (t) {
    var n;
    t =
      "string" == typeof t
        ? ((n = {}),
          i.each(t.match(Nt) || [], function (v, S) {
            n[S] = !0;
          }),
          n)
        : i.extend({}, t);
    var r,
      o,
      a,
      u,
      p = [],
      c = [],
      g = -1,
      b = function () {
        for (u = u || t.once, a = r = !0; c.length; g = -1)
          for (o = c.shift(); ++g < p.length; )
            !1 === p[g].apply(o[0], o[1]) &&
              t.stopOnFalse &&
              ((g = p.length), (o = !1));
        t.memory || (o = !1), (r = !1), u && (p = o ? [] : "");
      },
      w = {
        add: function () {
          return (
            p &&
              (o && !r && ((g = p.length - 1), c.push(o)),
              (function v(S) {
                i.each(S, function (M, _) {
                  V(_)
                    ? (t.unique && w.has(_)) || p.push(_)
                    : _ && _.length && "string" !== Kt(_) && v(_);
                });
              })(arguments),
              o && !r && b()),
            this
          );
        },
        remove: function () {
          return (
            i.each(arguments, function (v, S) {
              for (var M; -1 < (M = i.inArray(S, p, M)); )
                p.splice(M, 1), M <= g && g--;
            }),
            this
          );
        },
        has: function (v) {
          return v ? -1 < i.inArray(v, p) : 0 < p.length;
        },
        empty: function () {
          return p && (p = []), this;
        },
        disable: function () {
          return (u = c = []), (p = o = ""), this;
        },
        disabled: function () {
          return !p;
        },
        lock: function () {
          return (u = c = []), o || r || (p = o = ""), this;
        },
        locked: function () {
          return !!u;
        },
        fireWith: function (v, S) {
          return (
            u ||
              ((S = [v, (S = S || []).slice ? S.slice() : S]),
              c.push(S),
              r || b()),
            this
          );
        },
        fire: function () {
          return w.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!a;
        },
      };
    return w;
  }),
    i.extend({
      Deferred: function (t) {
        var e = [
            [
              "notify",
              "progress",
              i.Callbacks("memory"),
              i.Callbacks("memory"),
              2,
            ],
            [
              "resolve",
              "done",
              i.Callbacks("once memory"),
              i.Callbacks("once memory"),
              0,
              "resolved",
            ],
            [
              "reject",
              "fail",
              i.Callbacks("once memory"),
              i.Callbacks("once memory"),
              1,
              "rejected",
            ],
          ],
          n = "pending",
          r = {
            state: function () {
              return n;
            },
            always: function () {
              return o.done(arguments).fail(arguments), this;
            },
            catch: function (a) {
              return r.then(null, a);
            },
            pipe: function () {
              var a = arguments;
              return i
                .Deferred(function (u) {
                  i.each(e, function (p, c) {
                    var g = V(a[c[4]]) && a[c[4]];
                    o[c[1]](function () {
                      var b = g && g.apply(this, arguments);
                      b && V(b.promise)
                        ? b
                            .promise()
                            .progress(u.notify)
                            .done(u.resolve)
                            .fail(u.reject)
                        : u[c[0] + "With"](this, g ? [b] : arguments);
                    });
                  }),
                    (a = null);
                })
                .promise();
            },
            then: function (a, u, p) {
              var c = 0;
              function g(b, w, v, S) {
                return function () {
                  var M = this,
                    _ = arguments,
                    U = function () {
                      var ht, zt;
                      if (!(b < c)) {
                        if ((ht = v.apply(M, _)) === w.promise())
                          throw new TypeError("Thenable self-resolution");
                        V(
                          (zt =
                            ht &&
                            ("object" == typeof ht ||
                              "function" == typeof ht) &&
                            ht.then)
                        )
                          ? S
                            ? zt.call(ht, g(c, w, Qt, S), g(c, w, xe, S))
                            : (c++,
                              zt.call(
                                ht,
                                g(c, w, Qt, S),
                                g(c, w, xe, S),
                                g(c, w, Qt, w.notifyWith)
                              ))
                          : (v !== Qt && ((M = void 0), (_ = [ht])),
                            (S || w.resolveWith)(M, _));
                      }
                    },
                    st = S
                      ? U
                      : function () {
                          try {
                            U();
                          } catch (ht) {
                            i.Deferred.exceptionHook &&
                              i.Deferred.exceptionHook(ht, st.error),
                              c <= b + 1 &&
                                (v !== xe && ((M = void 0), (_ = [ht])),
                                w.rejectWith(M, _));
                          }
                        };
                  b
                    ? st()
                    : (i.Deferred.getErrorHook
                        ? (st.error = i.Deferred.getErrorHook())
                        : i.Deferred.getStackHook &&
                          (st.error = i.Deferred.getStackHook()),
                      I.setTimeout(st));
                };
              }
              return i
                .Deferred(function (b) {
                  e[0][3].add(g(0, b, V(p) ? p : Qt, b.notifyWith)),
                    e[1][3].add(g(0, b, V(a) ? a : Qt)),
                    e[2][3].add(g(0, b, V(u) ? u : xe));
                })
                .promise();
            },
            promise: function (a) {
              return null != a ? i.extend(a, r) : r;
            },
          },
          o = {};
        return (
          i.each(e, function (a, u) {
            var p = u[2],
              c = u[5];
            (r[u[1]] = p.add),
              c &&
                p.add(
                  function () {
                    n = c;
                  },
                  e[3 - a][2].disable,
                  e[3 - a][3].disable,
                  e[0][2].lock,
                  e[0][3].lock
                ),
              p.add(u[3].fire),
              (o[u[0]] = function () {
                return (
                  o[u[0] + "With"](this === o ? void 0 : this, arguments), this
                );
              }),
              (o[u[0] + "With"] = p.fireWith);
          }),
          r.promise(o),
          t && t.call(o, o),
          o
        );
      },
      when: function (t) {
        var e = arguments.length,
          n = e,
          r = Array(n),
          o = bt.call(arguments),
          a = i.Deferred(),
          u = function (p) {
            return function (c) {
              (r[p] = this),
                (o[p] = 1 < arguments.length ? bt.call(arguments) : c),
                --e || a.resolveWith(r, o);
            };
          };
        if (
          e <= 1 &&
          (Pe(t, a.done(u(n)).resolve, a.reject, !e),
          "pending" === a.state() || V(o[n] && o[n].then))
        )
          return a.then();
        for (; n--; ) Pe(o[n], u(n), a.reject);
        return a.promise();
      },
    });
  var mn = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (i.Deferred.exceptionHook = function (t, e) {
    I.console &&
      I.console.warn &&
      t &&
      mn.test(t.name) &&
      I.console.warn("jQuery.Deferred exception: " + t.message, t.stack, e);
  }),
    (i.readyException = function (t) {
      I.setTimeout(function () {
        throw t;
      });
    });
  var Me = i.Deferred();
  function we() {
    $.removeEventListener("DOMContentLoaded", we),
      I.removeEventListener("load", we),
      i.ready();
  }
  (i.fn.ready = function (t) {
    return (
      Me.then(t).catch(function (e) {
        i.readyException(e);
      }),
      this
    );
  }),
    i.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (t) {
        (!0 === t ? --i.readyWait : i.isReady) ||
          ((i.isReady = !0) !== t && 0 < --i.readyWait) ||
          Me.resolveWith($, [i]);
      },
    }),
    (i.ready.then = Me.then),
    "complete" === $.readyState ||
    ("loading" !== $.readyState && !$.documentElement.doScroll)
      ? I.setTimeout(i.ready)
      : ($.addEventListener("DOMContentLoaded", we),
        I.addEventListener("load", we));
  var Lt = function (t, e, n, r, o, a, u) {
      var p = 0,
        c = t.length,
        g = null == n;
      if ("object" === Kt(n))
        for (p in ((o = !0), n)) Lt(t, e, p, n[p], !0, a, u);
      else if (
        void 0 !== r &&
        ((o = !0),
        V(r) || (u = !0),
        g &&
          (u
            ? (e.call(t, r), (e = null))
            : ((g = e),
              (e = function (b, w, v) {
                return g.call(i(b), v);
              }))),
        e)
      )
        for (; p < c; p++) e(t[p], n, u ? r : r.call(t[p], p, e(t[p], n)));
      return o ? t : g ? e.call(t) : c ? e(t[0], n) : a;
    },
    Re = /^-ms-/,
    nn = /-([a-z])/g;
  function Mt(t, e) {
    return e.toUpperCase();
  }
  function xt(t) {
    return t.replace(Re, "ms-").replace(nn, Mt);
  }
  var fe = function (t) {
    return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
  };
  function pe() {
    this.expando = i.expando + pe.uid++;
  }
  (pe.uid = 1),
    (pe.prototype = {
      cache: function (t) {
        var e = t[this.expando];
        return (
          e ||
            ((e = {}),
            fe(t) &&
              (t.nodeType
                ? (t[this.expando] = e)
                : Object.defineProperty(t, this.expando, {
                    value: e,
                    configurable: !0,
                  }))),
          e
        );
      },
      set: function (t, e, n) {
        var r,
          o = this.cache(t);
        if ("string" == typeof e) o[xt(e)] = n;
        else for (r in e) o[xt(r)] = e[r];
        return o;
      },
      get: function (t, e) {
        return void 0 === e
          ? this.cache(t)
          : t[this.expando] && t[this.expando][xt(e)];
      },
      access: function (t, e, n) {
        return void 0 === e || (e && "string" == typeof e && void 0 === n)
          ? this.get(t, e)
          : (this.set(t, e, n), void 0 !== n ? n : e);
      },
      remove: function (t, e) {
        var n,
          r = t[this.expando];
        if (void 0 !== r) {
          if (void 0 !== e)
            for (
              n = (e = Array.isArray(e)
                ? e.map(xt)
                : ((e = xt(e)) in r)
                ? [e]
                : e.match(Nt) || []).length;
              n--;

            )
              delete r[e[n]];
          (void 0 === e || i.isEmptyObject(r)) &&
            (t.nodeType ? (t[this.expando] = void 0) : delete t[this.expando]);
        }
      },
      hasData: function (t) {
        var e = t[this.expando];
        return void 0 !== e && !i.isEmptyObject(e);
      },
    });
  var P = new pe(),
    yt = new pe(),
    rn = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    vn = /[A-Z]/g;
  function on(t, e, n) {
    var r, o;
    if (void 0 === n && 1 === t.nodeType)
      if (
        ((r = "data-" + e.replace(vn, "-$&").toLowerCase()),
        "string" == typeof (n = t.getAttribute(r)))
      ) {
        try {
          n =
            "true" === (o = n) ||
            ("false" !== o &&
              ("null" === o
                ? null
                : o === +o + ""
                ? +o
                : rn.test(o)
                ? JSON.parse(o)
                : o));
        } catch {}
        yt.set(t, e, n);
      } else n = void 0;
    return n;
  }
  i.extend({
    hasData: function (t) {
      return yt.hasData(t) || P.hasData(t);
    },
    data: function (t, e, n) {
      return yt.access(t, e, n);
    },
    removeData: function (t, e) {
      yt.remove(t, e);
    },
    _data: function (t, e, n) {
      return P.access(t, e, n);
    },
    _removeData: function (t, e) {
      P.remove(t, e);
    },
  }),
    i.fn.extend({
      data: function (t, e) {
        var n,
          r,
          o,
          a = this[0],
          u = a && a.attributes;
        if (void 0 === t) {
          if (
            this.length &&
            ((o = yt.get(a)), 1 === a.nodeType && !P.get(a, "hasDataAttrs"))
          ) {
            for (n = u.length; n--; )
              u[n] &&
                0 === (r = u[n].name).indexOf("data-") &&
                ((r = xt(r.slice(5))), on(a, r, o[r]));
            P.set(a, "hasDataAttrs", !0);
          }
          return o;
        }
        return "object" == typeof t
          ? this.each(function () {
              yt.set(this, t);
            })
          : Lt(
              this,
              function (p) {
                var c;
                if (a && void 0 === p)
                  return void 0 !== (c = yt.get(a, t)) ||
                    void 0 !== (c = on(a, t))
                    ? c
                    : void 0;
                this.each(function () {
                  yt.set(this, t, p);
                });
              },
              null,
              e,
              1 < arguments.length,
              null,
              !0
            );
      },
      removeData: function (t) {
        return this.each(function () {
          yt.remove(this, t);
        });
      },
    }),
    i.extend({
      queue: function (t, e, n) {
        var r;
        if (t)
          return (
            (r = P.get(t, (e = (e || "fx") + "queue"))),
            n &&
              (!r || Array.isArray(n)
                ? (r = P.access(t, e, i.makeArray(n)))
                : r.push(n)),
            r || []
          );
      },
      dequeue: function (t, e) {
        var n = i.queue(t, (e = e || "fx")),
          r = n.length,
          o = n.shift(),
          a = i._queueHooks(t, e);
        "inprogress" === o && ((o = n.shift()), r--),
          o &&
            ("fx" === e && n.unshift("inprogress"),
            delete a.stop,
            o.call(
              t,
              function () {
                i.dequeue(t, e);
              },
              a
            )),
          !r && a && a.empty.fire();
      },
      _queueHooks: function (t, e) {
        var n = e + "queueHooks";
        return (
          P.get(t, n) ||
          P.access(t, n, {
            empty: i.Callbacks("once memory").add(function () {
              P.remove(t, [e + "queue", n]);
            }),
          })
        );
      },
    }),
    i.fn.extend({
      queue: function (t, e) {
        var n = 2;
        return (
          "string" != typeof t && ((e = t), (t = "fx"), n--),
          arguments.length < n
            ? i.queue(this[0], t)
            : void 0 === e
            ? this
            : this.each(function () {
                var r = i.queue(this, t, e);
                i._queueHooks(this, t),
                  "fx" === t && "inprogress" !== r[0] && i.dequeue(this, t);
              })
        );
      },
      dequeue: function (t) {
        return this.each(function () {
          i.dequeue(this, t);
        });
      },
      clearQueue: function (t) {
        return this.queue(t || "fx", []);
      },
      promise: function (t, e) {
        var n,
          r = 1,
          o = i.Deferred(),
          a = this,
          u = this.length,
          p = function () {
            --r || o.resolveWith(a, [a]);
          };
        for (
          "string" != typeof t && ((e = t), (t = void 0)), t = t || "fx";
          u--;

        )
          (n = P.get(a[u], t + "queueHooks")) &&
            n.empty &&
            (r++, n.empty.add(p));
        return p(), o.promise(e);
      },
    });
  var Jt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    dt = new RegExp("^(?:([+-])=|)(" + Jt + ")([a-z%]*)$", "i"),
    Rt = ["Top", "Right", "Bottom", "Left"],
    _t = $.documentElement,
    Ut = function (t) {
      return i.contains(t.ownerDocument, t);
    },
    Fe = { composed: !0 };
  _t.getRootNode &&
    (Ut = function (t) {
      return (
        i.contains(t.ownerDocument, t) || t.getRootNode(Fe) === t.ownerDocument
      );
    });
  var Zt = function (t, e) {
    return (
      "none" === (t = e || t).style.display ||
      ("" === t.style.display && Ut(t) && "none" === i.css(t, "display"))
    );
  };
  function s(t, e, n, r) {
    var o,
      a,
      u = 20,
      p = r
        ? function () {
            return r.cur();
          }
        : function () {
            return i.css(t, e, "");
          },
      c = p(),
      g = (n && n[3]) || (i.cssNumber[e] ? "" : "px"),
      b =
        t.nodeType &&
        (i.cssNumber[e] || ("px" !== g && +c)) &&
        dt.exec(i.css(t, e));
    if (b && b[3] !== g) {
      for (g = g || b[3], b = +(c /= 2) || 1; u--; )
        i.style(t, e, b + g),
          (1 - a) * (1 - (a = p() / c || 0.5)) <= 0 && (u = 0),
          (b /= a);
      i.style(t, e, (b *= 2) + g), (n = n || []);
    }
    return (
      n &&
        ((b = +b || +c || 0),
        (o = n[1] ? b + (n[1] + 1) * n[2] : +n[2]),
        r && ((r.unit = g), (r.start = b), (r.end = o))),
      o
    );
  }
  var f = {};
  function d(t, e) {
    for (var n, r, o, a, u, p, c, g = [], b = 0, w = t.length; b < w; b++)
      (r = t[b]).style &&
        ((n = r.style.display),
        e
          ? ("none" === n &&
              ((g[b] = P.get(r, "display") || null),
              g[b] || (r.style.display = "")),
            "" === r.style.display &&
              Zt(r) &&
              (g[b] =
                ((c = u = a = void 0),
                (u = (o = r).ownerDocument),
                (c = f[(p = o.nodeName)]) ||
                  ((a = u.body.appendChild(u.createElement(p))),
                  (c = i.css(a, "display")),
                  a.parentNode.removeChild(a),
                  "none" === c && (c = "block"),
                  (f[p] = c)))))
          : "none" !== n && ((g[b] = "none"), P.set(r, "display", n)));
    for (b = 0; b < w; b++) null != g[b] && (t[b].style.display = g[b]);
    return t;
  }
  i.fn.extend({
    show: function () {
      return d(this, !0);
    },
    hide: function () {
      return d(this);
    },
    toggle: function (t) {
      return "boolean" == typeof t
        ? t
          ? this.show()
          : this.hide()
        : this.each(function () {
            Zt(this) ? i(this).show() : i(this).hide();
          });
    },
  });
  var m,
    k,
    C = /^(?:checkbox|radio)$/i,
    T = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    A = /^$|^module$|\/(?:java|ecma)script/i;
  (m = $.createDocumentFragment().appendChild($.createElement("div"))),
    (k = $.createElement("input")).setAttribute("type", "radio"),
    k.setAttribute("checked", "checked"),
    k.setAttribute("name", "t"),
    m.appendChild(k),
    (X.checkClone = m.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (m.innerHTML = "<textarea>x</textarea>"),
    (X.noCloneChecked = !!m.cloneNode(!0).lastChild.defaultValue),
    (m.innerHTML = "<option></option>"),
    (X.option = !!m.lastChild);
  var D = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""],
  };
  function O(t, e) {
    var n;
    return (
      (n =
        typeof t.getElementsByTagName < "u"
          ? t.getElementsByTagName(e || "*")
          : typeof t.querySelectorAll < "u"
          ? t.querySelectorAll(e || "*")
          : []),
      void 0 === e || (e && nt(t, e)) ? i.merge([t], n) : n
    );
  }
  function W(t, e) {
    for (var n = 0, r = t.length; n < r; n++)
      P.set(t[n], "globalEval", !e || P.get(e[n], "globalEval"));
  }
  (D.tbody = D.tfoot = D.colgroup = D.caption = D.thead),
    (D.th = D.td),
    X.option ||
      (D.optgroup = D.option =
        [1, "<select multiple='multiple'>", "</select>"]);
  var H = /<|&#?\w+;/;
  function R(t, e, n, r, o) {
    for (
      var a,
        u,
        p,
        c,
        g,
        b,
        w = e.createDocumentFragment(),
        v = [],
        S = 0,
        M = t.length;
      S < M;
      S++
    )
      if ((a = t[S]) || 0 === a)
        if ("object" === Kt(a)) i.merge(v, a.nodeType ? [a] : a);
        else if (H.test(a)) {
          for (
            u = u || w.appendChild(e.createElement("div")),
              p = (T.exec(a) || ["", ""])[1].toLowerCase(),
              u.innerHTML =
                (c = D[p] || D._default)[1] + i.htmlPrefilter(a) + c[2],
              b = c[0];
            b--;

          )
            u = u.lastChild;
          i.merge(v, u.childNodes), ((u = w.firstChild).textContent = "");
        } else v.push(e.createTextNode(a));
    for (w.textContent = "", S = 0; (a = v[S++]); )
      if (r && -1 < i.inArray(a, r)) o && o.push(a);
      else if (((g = Ut(a)), (u = O(w.appendChild(a), "script")), g && W(u), n))
        for (b = 0; (a = u[b++]); ) A.test(a.type || "") && n.push(a);
    return w;
  }
  var G = /^([^.]*)(?:\.(.+)|)/;
  function K() {
    return !0;
  }
  function ct() {
    return !1;
  }
  function Ot(t, e, n, r, o, a) {
    var u, p;
    if ("object" == typeof e) {
      for (p in ("string" != typeof n && ((r = r || n), (n = void 0)), e))
        Ot(t, p, n, r, e[p], a);
      return t;
    }
    if (
      (null == r && null == o
        ? ((o = n), (r = n = void 0))
        : null == o &&
          ("string" == typeof n
            ? ((o = r), (r = void 0))
            : ((o = r), (r = n), (n = void 0))),
      !1 === o)
    )
      o = ct;
    else if (!o) return t;
    return (
      1 === a &&
        ((u = o),
        ((o = function (c) {
          return i().off(c), u.apply(this, arguments);
        }).guid = u.guid || (u.guid = i.guid++))),
      t.each(function () {
        i.event.add(this, e, o, r, n);
      })
    );
  }
  function Ft(t, e, n) {
    n
      ? (P.set(t, e, !1),
        i.event.add(t, e, {
          namespace: !1,
          handler: function (r) {
            var o,
              a = P.get(this, e);
            if (1 & r.isTrigger && this[e]) {
              if (a)
                (i.event.special[e] || {}).delegateType && r.stopPropagation();
              else if (
                ((a = bt.call(arguments)),
                P.set(this, e, a),
                this[e](),
                (o = P.get(this, e)),
                P.set(this, e, !1),
                a !== o)
              )
                return r.stopImmediatePropagation(), r.preventDefault(), o;
            } else
              a &&
                (P.set(this, e, i.event.trigger(a[0], a.slice(1), this)),
                r.stopPropagation(),
                (r.isImmediatePropagationStopped = K));
          },
        }))
      : void 0 === P.get(t, e) && i.event.add(t, e, K);
  }
  (i.event = {
    global: {},
    add: function (t, e, n, r, o) {
      var a,
        u,
        p,
        c,
        g,
        b,
        w,
        v,
        S,
        M,
        _,
        U = P.get(t);
      if (fe(t))
        for (
          n.handler && ((n = (a = n).handler), (o = a.selector)),
            o && i.find.matchesSelector(_t, o),
            n.guid || (n.guid = i.guid++),
            (c = U.events) || (c = U.events = Object.create(null)),
            (u = U.handle) ||
              (u = U.handle =
                function (st) {
                  return typeof i < "u" && i.event.triggered !== st.type
                    ? i.event.dispatch.apply(t, arguments)
                    : void 0;
                }),
            g = (e = (e || "").match(Nt) || [""]).length;
          g--;

        )
          (S = _ = (p = G.exec(e[g]) || [])[1]),
            (M = (p[2] || "").split(".").sort()),
            S &&
              ((w = i.event.special[S] || {}),
              (w =
                i.event.special[(S = (o ? w.delegateType : w.bindType) || S)] ||
                {}),
              (b = i.extend(
                {
                  type: S,
                  origType: _,
                  data: r,
                  handler: n,
                  guid: n.guid,
                  selector: o,
                  needsContext: o && i.expr.match.needsContext.test(o),
                  namespace: M.join("."),
                },
                a
              )),
              (v = c[S]) ||
                (((v = c[S] = []).delegateCount = 0),
                (w.setup && !1 !== w.setup.call(t, r, M, u)) ||
                  (t.addEventListener && t.addEventListener(S, u))),
              w.add &&
                (w.add.call(t, b), b.handler.guid || (b.handler.guid = n.guid)),
              o ? v.splice(v.delegateCount++, 0, b) : v.push(b),
              (i.event.global[S] = !0));
    },
    remove: function (t, e, n, r, o) {
      var a,
        u,
        p,
        c,
        g,
        b,
        w,
        v,
        S,
        M,
        _,
        U = P.hasData(t) && P.get(t);
      if (U && (c = U.events)) {
        for (g = (e = (e || "").match(Nt) || [""]).length; g--; )
          if (
            ((S = _ = (p = G.exec(e[g]) || [])[1]),
            (M = (p[2] || "").split(".").sort()),
            S)
          ) {
            for (
              w = i.event.special[S] || {},
                v = c[(S = (r ? w.delegateType : w.bindType) || S)] || [],
                p =
                  p[2] &&
                  new RegExp("(^|\\.)" + M.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                u = a = v.length;
              a--;

            )
              (b = v[a]),
                (!o && _ !== b.origType) ||
                  (n && n.guid !== b.guid) ||
                  (p && !p.test(b.namespace)) ||
                  (r && r !== b.selector && ("**" !== r || !b.selector)) ||
                  (v.splice(a, 1),
                  b.selector && v.delegateCount--,
                  w.remove && w.remove.call(t, b));
            u &&
              !v.length &&
              ((w.teardown && !1 !== w.teardown.call(t, M, U.handle)) ||
                i.removeEvent(t, S, U.handle),
              delete c[S]);
          } else for (S in c) i.event.remove(t, S + e[g], n, r, !0);
        i.isEmptyObject(c) && P.remove(t, "handle events");
      }
    },
    dispatch: function (t) {
      var e,
        n,
        r,
        o,
        a,
        u,
        p = new Array(arguments.length),
        c = i.event.fix(t),
        g = (P.get(this, "events") || Object.create(null))[c.type] || [],
        b = i.event.special[c.type] || {};
      for (p[0] = c, e = 1; e < arguments.length; e++) p[e] = arguments[e];
      if (
        ((c.delegateTarget = this),
        !b.preDispatch || !1 !== b.preDispatch.call(this, c))
      ) {
        for (
          u = i.event.handlers.call(this, c, g), e = 0;
          (o = u[e++]) && !c.isPropagationStopped();

        )
          for (
            c.currentTarget = o.elem, n = 0;
            (a = o.handlers[n++]) && !c.isImmediatePropagationStopped();

          )
            (c.rnamespace &&
              !1 !== a.namespace &&
              !c.rnamespace.test(a.namespace)) ||
              ((c.handleObj = a),
              (c.data = a.data),
              void 0 !==
                (r = (
                  (i.event.special[a.origType] || {}).handle || a.handler
                ).apply(o.elem, p)) &&
                !1 === (c.result = r) &&
                (c.preventDefault(), c.stopPropagation()));
        return b.postDispatch && b.postDispatch.call(this, c), c.result;
      }
    },
    handlers: function (t, e) {
      var n,
        r,
        o,
        a,
        u,
        p = [],
        c = e.delegateCount,
        g = t.target;
      if (c && g.nodeType && !("click" === t.type && 1 <= t.button))
        for (; g !== this; g = g.parentNode || this)
          if (1 === g.nodeType && ("click" !== t.type || !0 !== g.disabled)) {
            for (a = [], u = {}, n = 0; n < c; n++)
              void 0 === u[(o = (r = e[n]).selector + " ")] &&
                (u[o] = r.needsContext
                  ? -1 < i(o, this).index(g)
                  : i.find(o, this, null, [g]).length),
                u[o] && a.push(r);
            a.length && p.push({ elem: g, handlers: a });
          }
      return (
        (g = this), c < e.length && p.push({ elem: g, handlers: e.slice(c) }), p
      );
    },
    addProp: function (t, e) {
      Object.defineProperty(i.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: V(e)
          ? function () {
              if (this.originalEvent) return e(this.originalEvent);
            }
          : function () {
              if (this.originalEvent) return this.originalEvent[t];
            },
        set: function (n) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n,
          });
        },
      });
    },
    fix: function (t) {
      return t[i.expando] ? t : new i.Event(t);
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function (t) {
          var e = this || t;
          return (
            C.test(e.type) && e.click && nt(e, "input") && Ft(e, "click", !0),
            !1
          );
        },
        trigger: function (t) {
          var e = this || t;
          return (
            C.test(e.type) && e.click && nt(e, "input") && Ft(e, "click"), !0
          );
        },
        _default: function (t) {
          var e = t.target;
          return (
            (C.test(e.type) &&
              e.click &&
              nt(e, "input") &&
              P.get(e, "click")) ||
            nt(e, "a")
          );
        },
      },
      beforeunload: {
        postDispatch: function (t) {
          void 0 !== t.result &&
            t.originalEvent &&
            (t.originalEvent.returnValue = t.result);
        },
      },
    },
  }),
    (i.removeEvent = function (t, e, n) {
      t.removeEventListener && t.removeEventListener(e, n);
    }),
    (i.Event = function (t, e) {
      if (!(this instanceof i.Event)) return new i.Event(t, e);
      t && t.type
        ? ((this.originalEvent = t),
          (this.type = t.type),
          (this.isDefaultPrevented =
            t.defaultPrevented ||
            (void 0 === t.defaultPrevented && !1 === t.returnValue)
              ? K
              : ct),
          (this.target =
            t.target && 3 === t.target.nodeType
              ? t.target.parentNode
              : t.target),
          (this.currentTarget = t.currentTarget),
          (this.relatedTarget = t.relatedTarget))
        : (this.type = t),
        e && i.extend(this, e),
        (this.timeStamp = (t && t.timeStamp) || Date.now()),
        (this[i.expando] = !0);
    }),
    (i.Event.prototype = {
      constructor: i.Event,
      isDefaultPrevented: ct,
      isPropagationStopped: ct,
      isImmediatePropagationStopped: ct,
      isSimulated: !1,
      preventDefault: function () {
        var t = this.originalEvent;
        (this.isDefaultPrevented = K),
          t && !this.isSimulated && t.preventDefault();
      },
      stopPropagation: function () {
        var t = this.originalEvent;
        (this.isPropagationStopped = K),
          t && !this.isSimulated && t.stopPropagation();
      },
      stopImmediatePropagation: function () {
        var t = this.originalEvent;
        (this.isImmediatePropagationStopped = K),
          t && !this.isSimulated && t.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    i.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0,
      },
      i.event.addProp
    ),
    i.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
      function n(r) {
        if ($.documentMode) {
          var o = P.get(this, "handle"),
            a = i.event.fix(r);
          (a.type = "focusin" === r.type ? "focus" : "blur"),
            (a.isSimulated = !0),
            o(r),
            a.target === a.currentTarget && o(a);
        } else i.event.simulate(e, r.target, i.event.fix(r));
      }
      (i.event.special[t] = {
        setup: function () {
          var r;
          if ((Ft(this, t, !0), !$.documentMode)) return !1;
          (r = P.get(this, e)) || this.addEventListener(e, n),
            P.set(this, e, (r || 0) + 1);
        },
        trigger: function () {
          return Ft(this, t), !0;
        },
        teardown: function () {
          var r;
          if (!$.documentMode) return !1;
          (r = P.get(this, e) - 1)
            ? P.set(this, e, r)
            : (this.removeEventListener(e, n), P.remove(this, e));
        },
        _default: function (r) {
          return P.get(r.target, t);
        },
        delegateType: e,
      }),
        (i.event.special[e] = {
          setup: function () {
            var r = this.ownerDocument || this.document || this,
              o = $.documentMode ? this : r,
              a = P.get(o, e);
            a ||
              ($.documentMode
                ? this.addEventListener(e, n)
                : r.addEventListener(t, n, !0)),
              P.set(o, e, (a || 0) + 1);
          },
          teardown: function () {
            var r = this.ownerDocument || this.document || this,
              o = $.documentMode ? this : r,
              a = P.get(o, e) - 1;
            a
              ? P.set(o, e, a)
              : ($.documentMode
                  ? this.removeEventListener(e, n)
                  : r.removeEventListener(t, n, !0),
                P.remove(o, e));
          },
        });
    }),
    i.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (t, e) {
        i.event.special[t] = {
          delegateType: e,
          bindType: e,
          handle: function (n) {
            var r,
              o = n.relatedTarget,
              a = n.handleObj;
            return (
              (o && (o === this || i.contains(this, o))) ||
                ((n.type = a.origType),
                (r = a.handler.apply(this, arguments)),
                (n.type = e)),
              r
            );
          },
        };
      }
    ),
    i.fn.extend({
      on: function (t, e, n, r) {
        return Ot(this, t, e, n, r);
      },
      one: function (t, e, n, r) {
        return Ot(this, t, e, n, r, 1);
      },
      off: function (t, e, n) {
        var r, o;
        if (t && t.preventDefault && t.handleObj)
          return (
            (r = t.handleObj),
            i(t.delegateTarget).off(
              r.namespace ? r.origType + "." + r.namespace : r.origType,
              r.selector,
              r.handler
            ),
            this
          );
        if ("object" == typeof t) {
          for (o in t) this.off(o, e, t[o]);
          return this;
        }
        return (
          (!1 !== e && "function" != typeof e) || ((n = e), (e = void 0)),
          !1 === n && (n = ct),
          this.each(function () {
            i.event.remove(this, t, n, e);
          })
        );
      },
    });
  var St = /<script|<style|<link/i,
    te = /checked\s*(?:[^=]|=\s*.checked.)/i,
    yn = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
  function We(t, e) {
    return (
      (nt(t, "table") &&
        nt(11 !== e.nodeType ? e : e.firstChild, "tr") &&
        i(t).children("tbody")[0]) ||
      t
    );
  }
  function fr(t) {
    return (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t;
  }
  function pr(t) {
    return (
      "true/" === (t.type || "").slice(0, 5)
        ? (t.type = t.type.slice(5))
        : t.removeAttribute("type"),
      t
    );
  }
  function Rn(t, e) {
    var n, r, o, a, u, p;
    if (1 === e.nodeType) {
      if (P.hasData(t) && (p = P.get(t).events))
        for (o in (P.remove(e, "handle events"), p))
          for (n = 0, r = p[o].length; n < r; n++) i.event.add(e, o, p[o][n]);
      yt.hasData(t) &&
        ((a = yt.access(t)), (u = i.extend({}, a)), yt.set(e, u));
    }
  }
  function Te(t, e, n, r) {
    e = Gt(e);
    var o,
      a,
      u,
      p,
      c,
      g,
      b = 0,
      w = t.length,
      v = w - 1,
      S = e[0],
      M = V(S);
    if (M || (1 < w && "string" == typeof S && !X.checkClone && te.test(S)))
      return t.each(function (_) {
        var U = t.eq(_);
        M && (e[0] = S.call(this, _, U.html())), Te(U, e, n, r);
      });
    if (
      w &&
      ((a = (o = R(e, t[0].ownerDocument, !1, t, r)).firstChild),
      1 === o.childNodes.length && (o = a),
      a || r)
    ) {
      for (p = (u = i.map(O(o, "script"), fr)).length; b < w; b++)
        (c = o),
          b !== v &&
            ((c = i.clone(c, !0, !0)), p && i.merge(u, O(c, "script"))),
          n.call(t[b], c, b);
      if (p)
        for (g = u[u.length - 1].ownerDocument, i.map(u, pr), b = 0; b < p; b++)
          A.test((c = u[b]).type || "") &&
            !P.access(c, "globalEval") &&
            i.contains(g, c) &&
            (c.src && "module" !== (c.type || "").toLowerCase()
              ? i._evalUrl &&
                !c.noModule &&
                i._evalUrl(
                  c.src,
                  { nonce: c.nonce || c.getAttribute("nonce") },
                  g
                )
              : Ge(c.textContent.replace(yn, ""), c, g));
    }
    return t;
  }
  function Fn(t, e, n) {
    for (var r, o = e ? i.filter(e, t) : t, a = 0; null != (r = o[a]); a++)
      n || 1 !== r.nodeType || i.cleanData(O(r)),
        r.parentNode &&
          (n && Ut(r) && W(O(r, "script")), r.parentNode.removeChild(r));
    return t;
  }
  i.extend({
    htmlPrefilter: function (t) {
      return t;
    },
    clone: function (t, e, n) {
      var r,
        o,
        a,
        u,
        p,
        c,
        g,
        b = t.cloneNode(!0),
        w = Ut(t);
      if (
        !(
          X.noCloneChecked ||
          (1 !== t.nodeType && 11 !== t.nodeType) ||
          i.isXMLDoc(t)
        )
      )
        for (u = O(b), r = 0, o = (a = O(t)).length; r < o; r++)
          (p = a[r]),
            "input" === (g = (c = u[r]).nodeName.toLowerCase()) &&
            C.test(p.type)
              ? (c.checked = p.checked)
              : ("input" !== g && "textarea" !== g) ||
                (c.defaultValue = p.defaultValue);
      if (e)
        if (n)
          for (a = a || O(t), u = u || O(b), r = 0, o = a.length; r < o; r++)
            Rn(a[r], u[r]);
        else Rn(t, b);
      return 0 < (u = O(b, "script")).length && W(u, !w && O(t, "script")), b;
    },
    cleanData: function (t) {
      for (var e, n, r, o = i.event.special, a = 0; void 0 !== (n = t[a]); a++)
        if (fe(n)) {
          if ((e = n[P.expando])) {
            if (e.events)
              for (r in e.events)
                o[r] ? i.event.remove(n, r) : i.removeEvent(n, r, e.handle);
            n[P.expando] = void 0;
          }
          n[yt.expando] && (n[yt.expando] = void 0);
        }
    },
  }),
    i.fn.extend({
      detach: function (t) {
        return Fn(this, t, !0);
      },
      remove: function (t) {
        return Fn(this, t);
      },
      text: function (t) {
        return Lt(
          this,
          function (e) {
            return void 0 === e
              ? i.text(this)
              : this.empty().each(function () {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    (this.textContent = e);
                });
          },
          null,
          t,
          arguments.length
        );
      },
      append: function () {
        return Te(this, arguments, function (t) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            We(this, t).appendChild(t);
        });
      },
      prepend: function () {
        return Te(this, arguments, function (t) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var e = We(this, t);
            e.insertBefore(t, e.firstChild);
          }
        });
      },
      before: function () {
        return Te(this, arguments, function (t) {
          this.parentNode && this.parentNode.insertBefore(t, this);
        });
      },
      after: function () {
        return Te(this, arguments, function (t) {
          this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
        });
      },
      empty: function () {
        for (var t, e = 0; null != (t = this[e]); e++)
          1 === t.nodeType && (i.cleanData(O(t, !1)), (t.textContent = ""));
        return this;
      },
      clone: function (t, e) {
        return (
          (t = null != t && t),
          (e = e ?? t),
          this.map(function () {
            return i.clone(this, t, e);
          })
        );
      },
      html: function (t) {
        return Lt(
          this,
          function (e) {
            var n = this[0] || {},
              r = 0,
              o = this.length;
            if (void 0 === e && 1 === n.nodeType) return n.innerHTML;
            if (
              "string" == typeof e &&
              !St.test(e) &&
              !D[(T.exec(e) || ["", ""])[1].toLowerCase()]
            ) {
              e = i.htmlPrefilter(e);
              try {
                for (; r < o; r++)
                  1 === (n = this[r] || {}).nodeType &&
                    (i.cleanData(O(n, !1)), (n.innerHTML = e));
                n = 0;
              } catch {}
            }
            n && this.empty().append(e);
          },
          null,
          t,
          arguments.length
        );
      },
      replaceWith: function () {
        var t = [];
        return Te(
          this,
          arguments,
          function (e) {
            var n = this.parentNode;
            i.inArray(this, t) < 0 &&
              (i.cleanData(O(this)), n && n.replaceChild(e, this));
          },
          t
        );
      },
    }),
    i.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (t, e) {
        i.fn[t] = function (n) {
          for (var r, o = [], a = i(n), u = a.length - 1, p = 0; p <= u; p++)
            (r = p === u ? this : this.clone(!0)),
              i(a[p])[e](r),
              qt.apply(o, r.get());
          return this.pushStack(o);
        };
      }
    );
  var bn = new RegExp("^(" + Jt + ")(?!px)[a-z%]+$", "i"),
    xn = /^--/,
    an = function (t) {
      var e = t.ownerDocument.defaultView;
      return (e && e.opener) || (e = I), e.getComputedStyle(t);
    },
    Wn = function (t, e, n) {
      var r,
        o,
        a = {};
      for (o in e) (a[o] = t.style[o]), (t.style[o] = e[o]);
      for (o in ((r = n.call(t)), e)) t.style[o] = a[o];
      return r;
    },
    dr = new RegExp(Rt.join("|"), "i");
  function Ie(t, e, n) {
    var r,
      o,
      a,
      u,
      p = xn.test(e),
      c = t.style;
    return (
      (n = n || an(t)) &&
        ((u = n.getPropertyValue(e) || n[e]),
        p && u && (u = u.replace(le, "$1") || void 0),
        "" !== u || Ut(t) || (u = i.style(t, e)),
        !X.pixelBoxStyles() &&
          bn.test(u) &&
          dr.test(e) &&
          ((r = c.width),
          (o = c.minWidth),
          (a = c.maxWidth),
          (c.minWidth = c.maxWidth = c.width = u),
          (u = n.width),
          (c.width = r),
          (c.minWidth = o),
          (c.maxWidth = a))),
      void 0 !== u ? u + "" : u
    );
  }
  function In(t, e) {
    return {
      get: function () {
        if (!t()) return (this.get = e).apply(this, arguments);
        delete this.get;
      },
    };
  }
  !(function () {
    function t() {
      if (g) {
        (c.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
          (g.style.cssText =
            "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
          _t.appendChild(c).appendChild(g);
        var b = I.getComputedStyle(g);
        (n = "1%" !== b.top),
          (p = 12 === e(b.marginLeft)),
          (g.style.right = "60%"),
          (a = 36 === e(b.right)),
          (r = 36 === e(b.width)),
          (g.style.position = "absolute"),
          (o = 12 === e(g.offsetWidth / 3)),
          _t.removeChild(c),
          (g = null);
      }
    }
    function e(b) {
      return Math.round(parseFloat(b));
    }
    var n,
      r,
      o,
      a,
      u,
      p,
      c = $.createElement("div"),
      g = $.createElement("div");
    g.style &&
      ((g.style.backgroundClip = "content-box"),
      (g.cloneNode(!0).style.backgroundClip = ""),
      (X.clearCloneStyle = "content-box" === g.style.backgroundClip),
      i.extend(X, {
        boxSizingReliable: function () {
          return t(), r;
        },
        pixelBoxStyles: function () {
          return t(), a;
        },
        pixelPosition: function () {
          return t(), n;
        },
        reliableMarginLeft: function () {
          return t(), p;
        },
        scrollboxSize: function () {
          return t(), o;
        },
        reliableTrDimensions: function () {
          var b, w, v, S;
          return (
            null == u &&
              ((b = $.createElement("table")),
              (w = $.createElement("tr")),
              (v = $.createElement("div")),
              (b.style.cssText =
                "position:absolute;left:-11111px;border-collapse:separate"),
              (w.style.cssText = "box-sizing:content-box;border:1px solid"),
              (w.style.height = "1px"),
              (v.style.height = "9px"),
              (v.style.display = "block"),
              _t.appendChild(b).appendChild(w).appendChild(v),
              (S = I.getComputedStyle(w)),
              (u =
                parseInt(S.height, 10) +
                  parseInt(S.borderTopWidth, 10) +
                  parseInt(S.borderBottomWidth, 10) ===
                w.offsetHeight),
              _t.removeChild(b)),
            u
          );
        },
      }));
  })();
  var Bn = ["Webkit", "Moz", "ms"],
    $n = $.createElement("div").style,
    _n = {};
  function wn(t) {
    return (
      i.cssProps[t] ||
      _n[t] ||
      (t in $n
        ? t
        : (_n[t] =
            (function (n) {
              for (
                var r = n[0].toUpperCase() + n.slice(1), o = Bn.length;
                o--;

              )
                if ((n = Bn[o] + r) in $n) return n;
            })(t) || t))
    );
  }
  var hr = /^(none|table(?!-c[ea]).+)/,
    gr = { position: "absolute", visibility: "hidden", display: "block" },
    Un = { letterSpacing: "0", fontWeight: "400" };
  function zn(t, e, n) {
    var r = dt.exec(e);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : e;
  }
  function Tn(t, e, n, r, o, a) {
    var u = "width" === e ? 1 : 0,
      p = 0,
      c = 0,
      g = 0;
    if (n === (r ? "border" : "content")) return 0;
    for (; u < 4; u += 2)
      "margin" === n && (g += i.css(t, n + Rt[u], !0, o)),
        r
          ? ("content" === n && (c -= i.css(t, "padding" + Rt[u], !0, o)),
            "margin" !== n &&
              (c -= i.css(t, "border" + Rt[u] + "Width", !0, o)))
          : ((c += i.css(t, "padding" + Rt[u], !0, o)),
            "padding" !== n
              ? (c += i.css(t, "border" + Rt[u] + "Width", !0, o))
              : (p += i.css(t, "border" + Rt[u] + "Width", !0, o)));
    return (
      !r &&
        0 <= a &&
        (c +=
          Math.max(
            0,
            Math.ceil(
              t["offset" + e[0].toUpperCase() + e.slice(1)] - a - c - p - 0.5
            )
          ) || 0),
      c + g
    );
  }
  function Xn(t, e, n) {
    var r = an(t),
      o =
        (!X.boxSizingReliable() || n) &&
        "border-box" === i.css(t, "boxSizing", !1, r),
      a = o,
      u = Ie(t, e, r),
      p = "offset" + e[0].toUpperCase() + e.slice(1);
    if (bn.test(u)) {
      if (!n) return u;
      u = "auto";
    }
    return (
      ((!X.boxSizingReliable() && o) ||
        (!X.reliableTrDimensions() && nt(t, "tr")) ||
        "auto" === u ||
        (!parseFloat(u) && "inline" === i.css(t, "display", !1, r))) &&
        t.getClientRects().length &&
        ((o = "border-box" === i.css(t, "boxSizing", !1, r)),
        (a = p in t) && (u = t[p])),
      (u = parseFloat(u) || 0) +
        Tn(t, e, n || (o ? "border" : "content"), a, r, u) +
        "px"
    );
  }
  function Wt(t, e, n, r, o) {
    return new Wt.prototype.init(t, e, n, r, o);
  }
  i.extend({
    cssHooks: {
      opacity: {
        get: function (t, e) {
          if (e) {
            var n = Ie(t, "opacity");
            return "" === n ? "1" : n;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageSlice: !0,
      columnCount: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      scale: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
    },
    cssProps: {},
    style: function (t, e, n, r) {
      if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
        var o,
          a,
          u,
          p = xt(e),
          c = xn.test(e),
          g = t.style;
        if (
          (c || (e = wn(p)), (u = i.cssHooks[e] || i.cssHooks[p]), void 0 === n)
        )
          return u && "get" in u && void 0 !== (o = u.get(t, !1, r)) ? o : g[e];
        "string" == (a = typeof n) &&
          (o = dt.exec(n)) &&
          o[1] &&
          ((n = s(t, e, o)), (a = "number")),
          null != n &&
            n == n &&
            ("number" !== a ||
              c ||
              (n += (o && o[3]) || (i.cssNumber[p] ? "" : "px")),
            X.clearCloneStyle ||
              "" !== n ||
              0 !== e.indexOf("background") ||
              (g[e] = "inherit"),
            (u && "set" in u && void 0 === (n = u.set(t, n, r))) ||
              (c ? g.setProperty(e, n) : (g[e] = n)));
      }
    },
    css: function (t, e, n, r) {
      var o,
        a,
        u,
        p = xt(e);
      return (
        xn.test(e) || (e = wn(p)),
        (u = i.cssHooks[e] || i.cssHooks[p]) &&
          "get" in u &&
          (o = u.get(t, !0, n)),
        void 0 === o && (o = Ie(t, e, r)),
        "normal" === o && e in Un && (o = Un[e]),
        "" === n || n
          ? ((a = parseFloat(o)), !0 === n || isFinite(a) ? a || 0 : o)
          : o
      );
    },
  }),
    i.each(["height", "width"], function (t, e) {
      i.cssHooks[e] = {
        get: function (n, r, o) {
          if (r)
            return !hr.test(i.css(n, "display")) ||
              (n.getClientRects().length && n.getBoundingClientRect().width)
              ? Xn(n, e, o)
              : Wn(n, gr, function () {
                  return Xn(n, e, o);
                });
        },
        set: function (n, r, o) {
          var a,
            u = an(n),
            p = !X.scrollboxSize() && "absolute" === u.position,
            c = (p || o) && "border-box" === i.css(n, "boxSizing", !1, u),
            g = o ? Tn(n, e, o, c, u) : 0;
          return (
            c &&
              p &&
              (g -= Math.ceil(
                n["offset" + e[0].toUpperCase() + e.slice(1)] -
                  parseFloat(u[e]) -
                  Tn(n, e, "border", !1, u) -
                  0.5
              )),
            g &&
              (a = dt.exec(r)) &&
              "px" !== (a[3] || "px") &&
              ((n.style[e] = r), (r = i.css(n, e))),
            zn(0, r, g)
          );
        },
      };
    }),
    (i.cssHooks.marginLeft = In(X.reliableMarginLeft, function (t, e) {
      if (e)
        return (
          (parseFloat(Ie(t, "marginLeft")) ||
            t.getBoundingClientRect().left -
              Wn(t, { marginLeft: 0 }, function () {
                return t.getBoundingClientRect().left;
              })) + "px"
        );
    })),
    i.each({ margin: "", padding: "", border: "Width" }, function (t, e) {
      (i.cssHooks[t + e] = {
        expand: function (n) {
          for (
            var r = 0, o = {}, a = "string" == typeof n ? n.split(" ") : [n];
            r < 4;
            r++
          )
            o[t + Rt[r] + e] = a[r] || a[r - 2] || a[0];
          return o;
        },
      }),
        "margin" !== t && (i.cssHooks[t + e].set = zn);
    }),
    i.fn.extend({
      css: function (t, e) {
        return Lt(
          this,
          function (n, r, o) {
            var a,
              u,
              p = {},
              c = 0;
            if (Array.isArray(r)) {
              for (a = an(n), u = r.length; c < u; c++)
                p[r[c]] = i.css(n, r[c], !1, a);
              return p;
            }
            return void 0 !== o ? i.style(n, r, o) : i.css(n, r);
          },
          t,
          e,
          1 < arguments.length
        );
      },
    }),
    (((i.Tween = Wt).prototype = {
      constructor: Wt,
      init: function (t, e, n, r, o, a) {
        (this.elem = t),
          (this.prop = n),
          (this.easing = o || i.easing._default),
          (this.options = e),
          (this.start = this.now = this.cur()),
          (this.end = r),
          (this.unit = a || (i.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var t = Wt.propHooks[this.prop];
        return t && t.get ? t.get(this) : Wt.propHooks._default.get(this);
      },
      run: function (t) {
        var e,
          n = Wt.propHooks[this.prop];
        return (
          (this.pos = e =
            this.options.duration
              ? i.easing[this.easing](
                  t,
                  this.options.duration * t,
                  0,
                  1,
                  this.options.duration
                )
              : t),
          (this.now = (this.end - this.start) * e + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : Wt.propHooks._default.set(this),
          this
        );
      },
    }).init.prototype = Wt.prototype),
    ((Wt.propHooks = {
      _default: {
        get: function (t) {
          var e;
          return 1 !== t.elem.nodeType ||
            (null != t.elem[t.prop] && null == t.elem.style[t.prop])
            ? t.elem[t.prop]
            : (e = i.css(t.elem, t.prop, "")) && "auto" !== e
            ? e
            : 0;
        },
        set: function (t) {
          i.fx.step[t.prop]
            ? i.fx.step[t.prop](t)
            : 1 !== t.elem.nodeType ||
              (!i.cssHooks[t.prop] && null == t.elem.style[wn(t.prop)])
            ? (t.elem[t.prop] = t.now)
            : i.style(t.elem, t.prop, t.now + t.unit);
        },
      },
    }).scrollTop = Wt.propHooks.scrollLeft =
      {
        set: function (t) {
          t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
        },
      }),
    (i.easing = {
      linear: function (t) {
        return t;
      },
      swing: function (t) {
        return 0.5 - Math.cos(t * Math.PI) / 2;
      },
      _default: "swing",
    }),
    (i.fx = Wt.prototype.init),
    (i.fx.step = {});
  var Ee,
    sn,
    Ce,
    Vn,
    mr = /^(?:toggle|show|hide)$/,
    vr = /queueHooks$/;
  function En() {
    sn &&
      (!1 === $.hidden && I.requestAnimationFrame
        ? I.requestAnimationFrame(En)
        : I.setTimeout(En, i.fx.interval),
      i.fx.tick());
  }
  function Yn() {
    return (
      I.setTimeout(function () {
        Ee = void 0;
      }),
      (Ee = Date.now())
    );
  }
  function un(t, e) {
    var n,
      r = 0,
      o = { height: t };
    for (e = e ? 1 : 0; r < 4; r += 2 - e)
      o["margin" + (n = Rt[r])] = o["padding" + n] = t;
    return e && (o.opacity = o.width = t), o;
  }
  function Gn(t, e, n) {
    for (
      var r,
        o = (It.tweeners[e] || []).concat(It.tweeners["*"]),
        a = 0,
        u = o.length;
      a < u;
      a++
    )
      if ((r = o[a].call(n, e, t))) return r;
  }
  function It(t, e, n) {
    var r,
      o,
      a = 0,
      u = It.prefilters.length,
      p = i.Deferred().always(function () {
        delete c.elem;
      }),
      c = function () {
        if (o) return !1;
        for (
          var w = Ee || Yn(),
            v = Math.max(0, g.startTime + g.duration - w),
            S = 1 - (v / g.duration || 0),
            M = 0,
            _ = g.tweens.length;
          M < _;
          M++
        )
          g.tweens[M].run(S);
        return (
          p.notifyWith(t, [g, S, v]),
          S < 1 && _
            ? v
            : (_ || p.notifyWith(t, [g, 1, 0]), p.resolveWith(t, [g]), !1)
        );
      },
      g = p.promise({
        elem: t,
        props: i.extend({}, e),
        opts: i.extend(!0, { specialEasing: {}, easing: i.easing._default }, n),
        originalProperties: e,
        originalOptions: n,
        startTime: Ee || Yn(),
        duration: n.duration,
        tweens: [],
        createTween: function (w, v) {
          var S = i.Tween(
            t,
            g.opts,
            w,
            v,
            g.opts.specialEasing[w] || g.opts.easing
          );
          return g.tweens.push(S), S;
        },
        stop: function (w) {
          var v = 0,
            S = w ? g.tweens.length : 0;
          if (o) return this;
          for (o = !0; v < S; v++) g.tweens[v].run(1);
          return (
            w
              ? (p.notifyWith(t, [g, 1, 0]), p.resolveWith(t, [g, w]))
              : p.rejectWith(t, [g, w]),
            this
          );
        },
      }),
      b = g.props;
    for (
      (function (w, v) {
        var S, M, _, U, st;
        for (S in w)
          if (
            ((_ = v[(M = xt(S))]),
            (U = w[S]),
            Array.isArray(U) && ((_ = U[1]), (U = w[S] = U[0])),
            S !== M && ((w[M] = U), delete w[S]),
            (st = i.cssHooks[M]) && ("expand" in st))
          )
            for (S in ((U = st.expand(U)), delete w[M], U))
              (S in w) || ((w[S] = U[S]), (v[S] = _));
          else v[M] = _;
      })(b, g.opts.specialEasing);
      a < u;
      a++
    )
      if ((r = It.prefilters[a].call(g, t, b, g.opts)))
        return (
          V(r.stop) &&
            (i._queueHooks(g.elem, g.opts.queue).stop = r.stop.bind(r)),
          r
        );
    return (
      i.map(b, Gn, g),
      V(g.opts.start) && g.opts.start.call(t, g),
      g
        .progress(g.opts.progress)
        .done(g.opts.done, g.opts.complete)
        .fail(g.opts.fail)
        .always(g.opts.always),
      i.fx.timer(i.extend(c, { elem: t, anim: g, queue: g.opts.queue })),
      g
    );
  }
  (i.Animation = i.extend(It, {
    tweeners: {
      "*": [
        function (t, e) {
          var n = this.createTween(t, e);
          return s(n.elem, t, dt.exec(e), n), n;
        },
      ],
    },
    tweener: function (t, e) {
      V(t) ? ((e = t), (t = ["*"])) : (t = t.match(Nt));
      for (var n, r = 0, o = t.length; r < o; r++)
        (It.tweeners[(n = t[r])] = It.tweeners[n] || []).unshift(e);
    },
    prefilters: [
      function (t, e, n) {
        var r,
          o,
          a,
          u,
          p,
          c,
          g,
          b,
          w = "width" in e || "height" in e,
          v = this,
          S = {},
          M = t.style,
          _ = t.nodeType && Zt(t),
          U = P.get(t, "fxshow");
        for (r in (n.queue ||
          (null == (u = i._queueHooks(t, "fx")).unqueued &&
            ((u.unqueued = 0),
            (p = u.empty.fire),
            (u.empty.fire = function () {
              u.unqueued || p();
            })),
          u.unqueued++,
          v.always(function () {
            v.always(function () {
              u.unqueued--, i.queue(t, "fx").length || u.empty.fire();
            });
          })),
        e))
          if (mr.test((o = e[r]))) {
            if (
              (delete e[r],
              (a = a || "toggle" === o),
              o === (_ ? "hide" : "show"))
            ) {
              if ("show" !== o || !U || void 0 === U[r]) continue;
              _ = !0;
            }
            S[r] = (U && U[r]) || i.style(t, r);
          }
        if ((c = !i.isEmptyObject(e)) || !i.isEmptyObject(S))
          for (r in (w &&
            1 === t.nodeType &&
            ((n.overflow = [M.overflow, M.overflowX, M.overflowY]),
            null == (g = U && U.display) && (g = P.get(t, "display")),
            "none" === (b = i.css(t, "display")) &&
              (g
                ? (b = g)
                : (d([t], !0),
                  (g = t.style.display || g),
                  (b = i.css(t, "display")),
                  d([t]))),
            ("inline" === b || ("inline-block" === b && null != g)) &&
              "none" === i.css(t, "float") &&
              (c ||
                (v.done(function () {
                  M.display = g;
                }),
                null == g && (g = "none" === (b = M.display) ? "" : b)),
              (M.display = "inline-block"))),
          n.overflow &&
            ((M.overflow = "hidden"),
            v.always(function () {
              (M.overflow = n.overflow[0]),
                (M.overflowX = n.overflow[1]),
                (M.overflowY = n.overflow[2]);
            })),
          (c = !1),
          S))
            c ||
              (U
                ? "hidden" in U && (_ = U.hidden)
                : (U = P.access(t, "fxshow", { display: g })),
              a && (U.hidden = !_),
              _ && d([t], !0),
              v.done(function () {
                for (r in (_ || d([t]), P.remove(t, "fxshow"), S))
                  i.style(t, r, S[r]);
              })),
              (c = Gn(_ ? U[r] : 0, r, v)),
              r in U ||
                ((U[r] = c.start), _ && ((c.end = c.start), (c.start = 0)));
      },
    ],
    prefilter: function (t, e) {
      e ? It.prefilters.unshift(t) : It.prefilters.push(t);
    },
  })),
    (i.speed = function (t, e, n) {
      var r =
        t && "object" == typeof t
          ? i.extend({}, t)
          : {
              complete: n || (!n && e) || (V(t) && t),
              duration: t,
              easing: (n && e) || (e && !V(e) && e),
            };
      return (
        i.fx.off
          ? (r.duration = 0)
          : "number" != typeof r.duration &&
            (r.duration =
              r.duration in i.fx.speeds
                ? i.fx.speeds[r.duration]
                : i.fx.speeds._default),
        (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
        (r.old = r.complete),
        (r.complete = function () {
          V(r.old) && r.old.call(this), r.queue && i.dequeue(this, r.queue);
        }),
        r
      );
    }),
    i.fn.extend({
      fadeTo: function (t, e, n, r) {
        return this.filter(Zt)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: e }, t, n, r);
      },
      animate: function (t, e, n, r) {
        var o = i.isEmptyObject(t),
          a = i.speed(e, n, r),
          u = function () {
            var p = It(this, i.extend({}, t), a);
            (o || P.get(this, "finish")) && p.stop(!0);
          };
        return (
          (u.finish = u),
          o || !1 === a.queue ? this.each(u) : this.queue(a.queue, u)
        );
      },
      stop: function (t, e, n) {
        var r = function (o) {
          var a = o.stop;
          delete o.stop, a(n);
        };
        return (
          "string" != typeof t && ((n = e), (e = t), (t = void 0)),
          e && this.queue(t || "fx", []),
          this.each(function () {
            var o = !0,
              a = null != t && t + "queueHooks",
              u = i.timers,
              p = P.get(this);
            if (a) p[a] && p[a].stop && r(p[a]);
            else for (a in p) p[a] && p[a].stop && vr.test(a) && r(p[a]);
            for (a = u.length; a--; )
              u[a].elem !== this ||
                (null != t && u[a].queue !== t) ||
                (u[a].anim.stop(n), (o = !1), u.splice(a, 1));
            (!o && n) || i.dequeue(this, t);
          })
        );
      },
      finish: function (t) {
        return (
          !1 !== t && (t = t || "fx"),
          this.each(function () {
            var e,
              n = P.get(this),
              r = n[t + "queue"],
              o = n[t + "queueHooks"],
              a = i.timers,
              u = r ? r.length : 0;
            for (
              n.finish = !0,
                i.queue(this, t, []),
                o && o.stop && o.stop.call(this, !0),
                e = a.length;
              e--;

            )
              a[e].elem === this &&
                a[e].queue === t &&
                (a[e].anim.stop(!0), a.splice(e, 1));
            for (e = 0; e < u; e++)
              r[e] && r[e].finish && r[e].finish.call(this);
            delete n.finish;
          })
        );
      },
    }),
    i.each(["toggle", "show", "hide"], function (t, e) {
      var n = i.fn[e];
      i.fn[e] = function (r, o, a) {
        return null == r || "boolean" == typeof r
          ? n.apply(this, arguments)
          : this.animate(un(e, !0), r, o, a);
      };
    }),
    i.each(
      {
        slideDown: un("show"),
        slideUp: un("hide"),
        slideToggle: un("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (t, e) {
        i.fn[t] = function (n, r, o) {
          return this.animate(e, n, r, o);
        };
      }
    ),
    (i.timers = []),
    (i.fx.tick = function () {
      var t,
        e = 0,
        n = i.timers;
      for (Ee = Date.now(); e < n.length; e++)
        (t = n[e])() || n[e] !== t || n.splice(e--, 1);
      n.length || i.fx.stop(), (Ee = void 0);
    }),
    (i.fx.timer = function (t) {
      i.timers.push(t), i.fx.start();
    }),
    (i.fx.interval = 13),
    (i.fx.start = function () {
      sn || ((sn = !0), En());
    }),
    (i.fx.stop = function () {
      sn = null;
    }),
    (i.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (i.fn.delay = function (t, e) {
      return (
        (t = (i.fx && i.fx.speeds[t]) || t),
        this.queue((e = e || "fx"), function (n, r) {
          var o = I.setTimeout(n, t);
          r.stop = function () {
            I.clearTimeout(o);
          };
        })
      );
    }),
    (Ce = $.createElement("input")),
    (Vn = $.createElement("select").appendChild($.createElement("option"))),
    (Ce.type = "checkbox"),
    (X.checkOn = "" !== Ce.value),
    (X.optSelected = Vn.selected),
    ((Ce = $.createElement("input")).value = "t"),
    (Ce.type = "radio"),
    (X.radioValue = "t" === Ce.value);
  var Kn,
    Be = i.expr.attrHandle;
  i.fn.extend({
    attr: function (t, e) {
      return Lt(this, i.attr, t, e, 1 < arguments.length);
    },
    removeAttr: function (t) {
      return this.each(function () {
        i.removeAttr(this, t);
      });
    },
  }),
    i.extend({
      attr: function (t, e, n) {
        var r,
          o,
          a = t.nodeType;
        if (3 !== a && 8 !== a && 2 !== a)
          return typeof t.getAttribute > "u"
            ? i.prop(t, e, n)
            : ((1 === a && i.isXMLDoc(t)) ||
                (o =
                  i.attrHooks[e.toLowerCase()] ||
                  (i.expr.match.bool.test(e) ? Kn : void 0)),
              void 0 !== n
                ? null === n
                  ? void i.removeAttr(t, e)
                  : o && "set" in o && void 0 !== (r = o.set(t, n, e))
                  ? r
                  : (t.setAttribute(e, n + ""), n)
                : o && "get" in o && null !== (r = o.get(t, e))
                ? r
                : null == (r = i.find.attr(t, e))
                ? void 0
                : r);
      },
      attrHooks: {
        type: {
          set: function (t, e) {
            if (!X.radioValue && "radio" === e && nt(t, "input")) {
              var n = t.value;
              return t.setAttribute("type", e), n && (t.value = n), e;
            }
          },
        },
      },
      removeAttr: function (t, e) {
        var n,
          r = 0,
          o = e && e.match(Nt);
        if (o && 1 === t.nodeType) for (; (n = o[r++]); ) t.removeAttribute(n);
      },
    }),
    (Kn = {
      set: function (t, e, n) {
        return !1 === e ? i.removeAttr(t, n) : t.setAttribute(n, n), n;
      },
    }),
    i.each(i.expr.match.bool.source.match(/\w+/g), function (t, e) {
      var n = Be[e] || i.find.attr;
      Be[e] = function (r, o, a) {
        var u,
          p,
          c = o.toLowerCase();
        return (
          a ||
            ((p = Be[c]),
            (Be[c] = u),
            (u = null != n(r, o, a) ? c : null),
            (Be[c] = p)),
          u
        );
      };
    });
  var yr = /^(?:input|select|textarea|button)$/i,
    br = /^(?:a|area)$/i;
  function de(t) {
    return (t.match(Nt) || []).join(" ");
  }
  function he(t) {
    return (t.getAttribute && t.getAttribute("class")) || "";
  }
  function Cn(t) {
    return Array.isArray(t) ? t : ("string" == typeof t && t.match(Nt)) || [];
  }
  i.fn.extend({
    prop: function (t, e) {
      return Lt(this, i.prop, t, e, 1 < arguments.length);
    },
    removeProp: function (t) {
      return this.each(function () {
        delete this[i.propFix[t] || t];
      });
    },
  }),
    i.extend({
      prop: function (t, e, n) {
        var r,
          o,
          a = t.nodeType;
        if (3 !== a && 8 !== a && 2 !== a)
          return (
            (1 === a && i.isXMLDoc(t)) ||
              (o = i.propHooks[(e = i.propFix[e] || e)]),
            void 0 !== n
              ? o && "set" in o && void 0 !== (r = o.set(t, n, e))
                ? r
                : (t[e] = n)
              : o && "get" in o && null !== (r = o.get(t, e))
              ? r
              : t[e]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (t) {
            var e = i.find.attr(t, "tabindex");
            return e
              ? parseInt(e, 10)
              : yr.test(t.nodeName) || (br.test(t.nodeName) && t.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    }),
    X.optSelected ||
      (i.propHooks.selected = {
        get: function (t) {
          return null;
        },
        set: function (t) {},
      }),
    i.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        i.propFix[this.toLowerCase()] = this;
      }
    ),
    i.fn.extend({
      addClass: function (t) {
        var e, n, r, o, a, u;
        return V(t)
          ? this.each(function (p) {
              i(this).addClass(t.call(this, p, he(this)));
            })
          : (e = Cn(t)).length
          ? this.each(function () {
              if (
                ((r = he(this)), (n = 1 === this.nodeType && " " + de(r) + " "))
              ) {
                for (a = 0; a < e.length; a++)
                  n.indexOf(" " + (o = e[a]) + " ") < 0 && (n += o + " ");
                (u = de(n)), r !== u && this.setAttribute("class", u);
              }
            })
          : this;
      },
      removeClass: function (t) {
        var e, n, r, o, a, u;
        return V(t)
          ? this.each(function (p) {
              i(this).removeClass(t.call(this, p, he(this)));
            })
          : arguments.length
          ? (e = Cn(t)).length
            ? this.each(function () {
                if (
                  ((r = he(this)),
                  (n = 1 === this.nodeType && " " + de(r) + " "))
                ) {
                  for (a = 0; a < e.length; a++)
                    for (o = e[a]; -1 < n.indexOf(" " + o + " "); )
                      n = n.replace(" " + o + " ", " ");
                  (u = de(n)), r !== u && this.setAttribute("class", u);
                }
              })
            : this
          : this.attr("class", "");
      },
      toggleClass: function (t, e) {
        var n,
          r,
          o,
          a,
          u = typeof t,
          p = "string" === u || Array.isArray(t);
        return V(t)
          ? this.each(function (c) {
              i(this).toggleClass(t.call(this, c, he(this), e), e);
            })
          : "boolean" == typeof e && p
          ? e
            ? this.addClass(t)
            : this.removeClass(t)
          : ((n = Cn(t)),
            this.each(function () {
              if (p)
                for (a = i(this), o = 0; o < n.length; o++)
                  a.hasClass((r = n[o])) ? a.removeClass(r) : a.addClass(r);
              else
                (void 0 !== t && "boolean" !== u) ||
                  ((r = he(this)) && P.set(this, "__className__", r),
                  this.setAttribute &&
                    this.setAttribute(
                      "class",
                      r || !1 === t ? "" : P.get(this, "__className__") || ""
                    ));
            }));
      },
      hasClass: function (t) {
        var e,
          n,
          r = 0;
        for (e = " " + t + " "; (n = this[r++]); )
          if (1 === n.nodeType && -1 < (" " + de(he(n)) + " ").indexOf(e))
            return !0;
        return !1;
      },
    });
  var xr = /\r/g;
  i.fn.extend({
    val: function (t) {
      var e,
        n,
        r,
        o = this[0];
      return arguments.length
        ? ((r = V(t)),
          this.each(function (a) {
            var u;
            1 === this.nodeType &&
              (null == (u = r ? t.call(this, a, i(this).val()) : t)
                ? (u = "")
                : "number" == typeof u
                ? (u += "")
                : Array.isArray(u) &&
                  (u = i.map(u, function (p) {
                    return null == p ? "" : p + "";
                  })),
              ((e =
                i.valHooks[this.type] ||
                i.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in e &&
                void 0 !== e.set(this, u, "value")) ||
                (this.value = u));
          }))
        : o
        ? (e = i.valHooks[o.type] || i.valHooks[o.nodeName.toLowerCase()]) &&
          "get" in e &&
          void 0 !== (n = e.get(o, "value"))
          ? n
          : "string" == typeof (n = o.value)
          ? n.replace(xr, "")
          : n ?? ""
        : void 0;
    },
  }),
    i.extend({
      valHooks: {
        option: {
          get: function (t) {
            return i.find.attr(t, "value") ?? de(i.text(t));
          },
        },
        select: {
          get: function (t) {
            var e,
              n,
              r,
              o = t.options,
              a = t.selectedIndex,
              u = "select-one" === t.type,
              p = u ? null : [],
              c = u ? a + 1 : o.length;
            for (r = a < 0 ? c : u ? a : 0; r < c; r++)
              if (
                ((n = o[r]).selected || r === a) &&
                !n.disabled &&
                (!n.parentNode.disabled || !nt(n.parentNode, "optgroup"))
              ) {
                if (((e = i(n).val()), u)) return e;
                p.push(e);
              }
            return p;
          },
          set: function (t, e) {
            for (
              var n, r, o = t.options, a = i.makeArray(e), u = o.length;
              u--;

            )
              ((r = o[u]).selected =
                -1 < i.inArray(i.valHooks.option.get(r), a)) && (n = !0);
            return n || (t.selectedIndex = -1), a;
          },
        },
      },
    }),
    i.each(["radio", "checkbox"], function () {
      (i.valHooks[this] = {
        set: function (t, e) {
          if (Array.isArray(e))
            return (t.checked = -1 < i.inArray(i(t).val(), e));
        },
      }),
        X.checkOn ||
          (i.valHooks[this].get = function (t) {
            return null === t.getAttribute("value") ? "on" : t.value;
          });
    });
  var $e = I.location,
    Qn = { guid: Date.now() },
    Sn = /\?/;
  i.parseXML = function (t) {
    var e, n;
    if (!t || "string" != typeof t) return null;
    try {
      e = new I.DOMParser().parseFromString(t, "text/xml");
    } catch {}
    return (
      (n = e && e.getElementsByTagName("parsererror")[0]),
      (e && !n) ||
        i.error(
          "Invalid XML: " +
            (n
              ? i
                  .map(n.childNodes, function (r) {
                    return r.textContent;
                  })
                  .join("\n")
              : t)
        ),
      e
    );
  };
  var Jn = /^(?:focusinfocus|focusoutblur)$/,
    Zn = function (t) {
      t.stopPropagation();
    };
  i.extend(i.event, {
    trigger: function (t, e, n, r) {
      var o,
        a,
        u,
        p,
        c,
        g,
        b,
        w,
        v = [n || $],
        S = At.call(t, "type") ? t.type : t,
        M = At.call(t, "namespace") ? t.namespace.split(".") : [];
      if (
        ((a = w = u = n = n || $),
        3 !== n.nodeType &&
          8 !== n.nodeType &&
          !Jn.test(S + i.event.triggered) &&
          (-1 < S.indexOf(".") && ((S = (M = S.split(".")).shift()), M.sort()),
          (c = S.indexOf(":") < 0 && "on" + S),
          ((t = t[i.expando]
            ? t
            : new i.Event(S, "object" == typeof t && t)).isTrigger = r ? 2 : 3),
          (t.namespace = M.join(".")),
          (t.rnamespace = t.namespace
            ? new RegExp("(^|\\.)" + M.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (t.result = void 0),
          t.target || (t.target = n),
          (e = null == e ? [t] : i.makeArray(e, [t])),
          (b = i.event.special[S] || {}),
          r || !b.trigger || !1 !== b.trigger.apply(n, e)))
      ) {
        if (!r && !b.noBubble && !Tt(n)) {
          for (
            Jn.test((p = b.delegateType || S) + S) || (a = a.parentNode);
            a;
            a = a.parentNode
          )
            v.push(a), (u = a);
          u === (n.ownerDocument || $) &&
            v.push(u.defaultView || u.parentWindow || I);
        }
        for (o = 0; (a = v[o++]) && !t.isPropagationStopped(); )
          (w = a),
            (t.type = 1 < o ? p : b.bindType || S),
            (g =
              (P.get(a, "events") || Object.create(null))[t.type] &&
              P.get(a, "handle")) && g.apply(a, e),
            (g = c && a[c]) &&
              g.apply &&
              fe(a) &&
              ((t.result = g.apply(a, e)),
              !1 === t.result && t.preventDefault());
        return (
          (t.type = S),
          r ||
            t.isDefaultPrevented() ||
            (b._default && !1 !== b._default.apply(v.pop(), e)) ||
            !fe(n) ||
            (c &&
              V(n[S]) &&
              !Tt(n) &&
              ((u = n[c]) && (n[c] = null),
              (i.event.triggered = S),
              t.isPropagationStopped() && w.addEventListener(S, Zn),
              n[S](),
              t.isPropagationStopped() && w.removeEventListener(S, Zn),
              (i.event.triggered = void 0),
              u && (n[c] = u))),
          t.result
        );
      }
    },
    simulate: function (t, e, n) {
      var r = i.extend(new i.Event(), n, { type: t, isSimulated: !0 });
      i.event.trigger(r, null, e);
    },
  }),
    i.fn.extend({
      trigger: function (t, e) {
        return this.each(function () {
          i.event.trigger(t, e, this);
        });
      },
      triggerHandler: function (t, e) {
        var n = this[0];
        if (n) return i.event.trigger(t, e, n, !0);
      },
    });
  var wr = /\[\]$/,
    tr = /\r?\n/g,
    Tr = /^(?:submit|button|image|reset|file)$/i,
    Er = /^(?:input|select|textarea|keygen)/i;
  function kn(t, e, n, r) {
    var o;
    if (Array.isArray(e))
      i.each(e, function (a, u) {
        n || wr.test(t)
          ? r(t, u)
          : kn(
              t + "[" + ("object" == typeof u && null != u ? a : "") + "]",
              u,
              n,
              r
            );
      });
    else if (n || "object" !== Kt(e)) r(t, e);
    else for (o in e) kn(t + "[" + o + "]", e[o], n, r);
  }
  (i.param = function (t, e) {
    var n,
      r = [],
      o = function (a, u) {
        var p = V(u) ? u() : u;
        r[r.length] = encodeURIComponent(a) + "=" + encodeURIComponent(p ?? "");
      };
    if (null == t) return "";
    if (Array.isArray(t) || (t.jquery && !i.isPlainObject(t)))
      i.each(t, function () {
        o(this.name, this.value);
      });
    else for (n in t) kn(n, t[n], e, o);
    return r.join("&");
  }),
    i.fn.extend({
      serialize: function () {
        return i.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var t = i.prop(this, "elements");
          return t ? i.makeArray(t) : this;
        })
          .filter(function () {
            var t = this.type;
            return (
              this.name &&
              !i(this).is(":disabled") &&
              Er.test(this.nodeName) &&
              !Tr.test(t) &&
              (this.checked || !C.test(t))
            );
          })
          .map(function (t, e) {
            var n = i(this).val();
            return null == n
              ? null
              : Array.isArray(n)
              ? i.map(n, function (r) {
                  return { name: e.name, value: r.replace(tr, "\r\n") };
                })
              : { name: e.name, value: n.replace(tr, "\r\n") };
          })
          .get();
      },
    });
  var Cr = /%20/g,
    Sr = /#.*$/,
    kr = /([?&])_=[^&]*/,
    Dr = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Ar = /^(?:GET|HEAD)$/,
    jr = /^\/\//,
    er = {},
    Dn = {},
    nr = "*/".concat("*"),
    An = $.createElement("a");
  function rr(t) {
    return function (e, n) {
      "string" != typeof e && ((n = e), (e = "*"));
      var r,
        o = 0,
        a = e.toLowerCase().match(Nt) || [];
      if (V(n))
        for (; (r = a[o++]); )
          "+" === r[0]
            ? ((r = r.slice(1) || "*"), (t[r] = t[r] || []).unshift(n))
            : (t[r] = t[r] || []).push(n);
    };
  }
  function ir(t, e, n, r) {
    var o = {},
      a = t === Dn;
    function u(p) {
      var c;
      return (
        (o[p] = !0),
        i.each(t[p] || [], function (g, b) {
          var w = b(e, n, r);
          return "string" != typeof w || a || o[w]
            ? a
              ? !(c = w)
              : void 0
            : (e.dataTypes.unshift(w), u(w), !1);
        }),
        c
      );
    }
    return u(e.dataTypes[0]) || (!o["*"] && u("*"));
  }
  function jn(t, e) {
    var n,
      r,
      o = i.ajaxSettings.flatOptions || {};
    for (n in e) void 0 !== e[n] && ((o[n] ? t : r || (r = {}))[n] = e[n]);
    return r && i.extend(!0, t, r), t;
  }
  (An.href = $e.href),
    i.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: $e.href,
        type: "GET",
        isLocal:
          /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
            $e.protocol
          ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": nr,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": i.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (t, e) {
        return e ? jn(jn(t, i.ajaxSettings), e) : jn(i.ajaxSettings, t);
      },
      ajaxPrefilter: rr(er),
      ajaxTransport: rr(Dn),
      ajax: function (t, e) {
        "object" == typeof t && ((e = t), (t = void 0));
        var n,
          r,
          o,
          a,
          u,
          p,
          c,
          g,
          b,
          w,
          v = i.ajaxSetup({}, (e = e || {})),
          S = v.context || v,
          M = v.context && (S.nodeType || S.jquery) ? i(S) : i.event,
          _ = i.Deferred(),
          U = i.Callbacks("once memory"),
          st = v.statusCode || {},
          ht = {},
          zt = {},
          Xt = "canceled",
          Q = {
            readyState: 0,
            getResponseHeader: function (tt) {
              var ot;
              if (c) {
                if (!a)
                  for (a = {}; (ot = Dr.exec(o)); )
                    a[ot[1].toLowerCase() + " "] = (
                      a[ot[1].toLowerCase() + " "] || []
                    ).concat(ot[2]);
                ot = a[tt.toLowerCase() + " "];
              }
              return null == ot ? null : ot.join(", ");
            },
            getAllResponseHeaders: function () {
              return c ? o : null;
            },
            setRequestHeader: function (tt, ot) {
              return (
                null == c &&
                  ((tt = zt[tt.toLowerCase()] = zt[tt.toLowerCase()] || tt),
                  (ht[tt] = ot)),
                this
              );
            },
            overrideMimeType: function (tt) {
              return null == c && (v.mimeType = tt), this;
            },
            statusCode: function (tt) {
              var ot;
              if (tt)
                if (c) Q.always(tt[Q.status]);
                else for (ot in tt) st[ot] = [st[ot], tt[ot]];
              return this;
            },
            abort: function (tt) {
              var ot = tt || Xt;
              return n && n.abort(ot), ge(0, ot), this;
            },
          };
        if (
          (_.promise(Q),
          (v.url = ((t || v.url || $e.href) + "").replace(
            jr,
            $e.protocol + "//"
          )),
          (v.type = e.method || e.type || v.method || v.type),
          (v.dataTypes = (v.dataType || "*").toLowerCase().match(Nt) || [""]),
          null == v.crossDomain)
        ) {
          p = $.createElement("a");
          try {
            (p.href = v.url),
              (p.href = p.href),
              (v.crossDomain =
                An.protocol + "//" + An.host != p.protocol + "//" + p.host);
          } catch {
            v.crossDomain = !0;
          }
        }
        if (
          (v.data &&
            v.processData &&
            "string" != typeof v.data &&
            (v.data = i.param(v.data, v.traditional)),
          ir(er, v, e, Q),
          c)
        )
          return Q;
        for (b in ((g = i.event && v.global) &&
          0 == i.active++ &&
          i.event.trigger("ajaxStart"),
        (v.type = v.type.toUpperCase()),
        (v.hasContent = !Ar.test(v.type)),
        (r = v.url.replace(Sr, "")),
        v.hasContent
          ? v.data &&
            v.processData &&
            0 ===
              (v.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
            (v.data = v.data.replace(Cr, "+"))
          : ((w = v.url.slice(r.length)),
            v.data &&
              (v.processData || "string" == typeof v.data) &&
              ((r += (Sn.test(r) ? "&" : "?") + v.data), delete v.data),
            !1 === v.cache &&
              ((r = r.replace(kr, "$1")),
              (w = (Sn.test(r) ? "&" : "?") + "_=" + Qn.guid++ + w)),
            (v.url = r + w)),
        v.ifModified &&
          (i.lastModified[r] &&
            Q.setRequestHeader("If-Modified-Since", i.lastModified[r]),
          i.etag[r] && Q.setRequestHeader("If-None-Match", i.etag[r])),
        ((v.data && v.hasContent && !1 !== v.contentType) || e.contentType) &&
          Q.setRequestHeader("Content-Type", v.contentType),
        Q.setRequestHeader(
          "Accept",
          v.dataTypes[0] && v.accepts[v.dataTypes[0]]
            ? v.accepts[v.dataTypes[0]] +
                ("*" !== v.dataTypes[0] ? ", " + nr + "; q=0.01" : "")
            : v.accepts["*"]
        ),
        v.headers))
          Q.setRequestHeader(b, v.headers[b]);
        if (v.beforeSend && (!1 === v.beforeSend.call(S, Q, v) || c))
          return Q.abort();
        if (
          ((Xt = "abort"),
          U.add(v.complete),
          Q.done(v.success),
          Q.fail(v.error),
          (n = ir(Dn, v, e, Q)))
        ) {
          if (((Q.readyState = 1), g && M.trigger("ajaxSend", [Q, v]), c))
            return Q;
          v.async &&
            0 < v.timeout &&
            (u = I.setTimeout(function () {
              Q.abort("timeout");
            }, v.timeout));
          try {
            (c = !1), n.send(ht, ge);
          } catch (tt) {
            if (c) throw tt;
            ge(-1, tt);
          }
        } else ge(-1, "No Transport");
        function ge(tt, ot, Ue, Ln) {
          var Vt,
            ze,
            ee,
            oe,
            Se,
            Ht = ot;
          c ||
            ((c = !0),
            u && I.clearTimeout(u),
            (n = void 0),
            (o = Ln || ""),
            (Q.readyState = 0 < tt ? 4 : 0),
            (Vt = (200 <= tt && tt < 300) || 304 === tt),
            Ue &&
              (oe = (function (gt, ft, Et) {
                for (
                  var ae, Ct, F, ut, lt = gt.contents, rt = gt.dataTypes;
                  "*" === rt[0];

                )
                  rt.shift(),
                    void 0 === ae &&
                      (ae =
                        gt.mimeType || ft.getResponseHeader("Content-Type"));
                if (ae)
                  for (Ct in lt)
                    if (lt[Ct] && lt[Ct].test(ae)) {
                      rt.unshift(Ct);
                      break;
                    }
                if (rt[0] in Et) F = rt[0];
                else {
                  for (Ct in Et) {
                    if (!rt[0] || gt.converters[Ct + " " + rt[0]]) {
                      F = Ct;
                      break;
                    }
                    ut || (ut = Ct);
                  }
                  F = F || ut;
                }
                if (F) return F !== rt[0] && rt.unshift(F), Et[F];
              })(v, Q, Ue)),
            !Vt &&
              -1 < i.inArray("script", v.dataTypes) &&
              i.inArray("json", v.dataTypes) < 0 &&
              (v.converters["text script"] = function () {}),
            (oe = (function (gt, ft, Et, ae) {
              var Ct,
                F,
                ut,
                lt,
                rt,
                Yt = {},
                ke = gt.dataTypes.slice();
              if (ke[1])
                for (ut in gt.converters)
                  Yt[ut.toLowerCase()] = gt.converters[ut];
              for (F = ke.shift(); F; )
                if (
                  (gt.responseFields[F] && (Et[gt.responseFields[F]] = ft),
                  !rt &&
                    ae &&
                    gt.dataFilter &&
                    (ft = gt.dataFilter(ft, gt.dataType)),
                  (rt = F),
                  (F = ke.shift()))
                )
                  if ("*" === F) F = rt;
                  else if ("*" !== rt && rt !== F) {
                    if (!(ut = Yt[rt + " " + F] || Yt["* " + F]))
                      for (Ct in Yt)
                        if (
                          (lt = Ct.split(" "))[1] === F &&
                          (ut = Yt[rt + " " + lt[0]] || Yt["* " + lt[0]])
                        ) {
                          !0 === ut
                            ? (ut = Yt[Ct])
                            : !0 !== Yt[Ct] && ((F = lt[0]), ke.unshift(lt[1]));
                          break;
                        }
                    if (!0 !== ut)
                      if (ut && gt.throws) ft = ut(ft);
                      else
                        try {
                          ft = ut(ft);
                        } catch (ln) {
                          return {
                            state: "parsererror",
                            error: ut
                              ? ln
                              : "No conversion from " + rt + " to " + F,
                          };
                        }
                  }
              return { state: "success", data: ft };
            })(v, oe, Q, Vt)),
            Vt
              ? (v.ifModified &&
                  ((Se = Q.getResponseHeader("Last-Modified")) &&
                    (i.lastModified[r] = Se),
                  (Se = Q.getResponseHeader("etag")) && (i.etag[r] = Se)),
                204 === tt || "HEAD" === v.type
                  ? (Ht = "nocontent")
                  : 304 === tt
                  ? (Ht = "notmodified")
                  : ((Ht = oe.state), (ze = oe.data), (Vt = !(ee = oe.error))))
              : ((ee = Ht),
                (!tt && Ht) || ((Ht = "error"), tt < 0 && (tt = 0))),
            (Q.status = tt),
            (Q.statusText = (ot || Ht) + ""),
            Vt ? _.resolveWith(S, [ze, Ht, Q]) : _.rejectWith(S, [Q, Ht, ee]),
            Q.statusCode(st),
            (st = void 0),
            g &&
              M.trigger(Vt ? "ajaxSuccess" : "ajaxError", [Q, v, Vt ? ze : ee]),
            U.fireWith(S, [Q, Ht]),
            g &&
              (M.trigger("ajaxComplete", [Q, v]),
              --i.active || i.event.trigger("ajaxStop")));
        }
        return Q;
      },
      getJSON: function (t, e, n) {
        return i.get(t, e, n, "json");
      },
      getScript: function (t, e) {
        return i.get(t, void 0, e, "script");
      },
    }),
    i.each(["get", "post"], function (t, e) {
      i[e] = function (n, r, o, a) {
        return (
          V(r) && ((a = a || o), (o = r), (r = void 0)),
          i.ajax(
            i.extend(
              { url: n, type: e, dataType: a, data: r, success: o },
              i.isPlainObject(n) && n
            )
          )
        );
      };
    }),
    i.ajaxPrefilter(function (t) {
      var e;
      for (e in t.headers)
        "content-type" === e.toLowerCase() &&
          (t.contentType = t.headers[e] || "");
    }),
    (i._evalUrl = function (t, e, n) {
      return i.ajax({
        url: t,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        converters: { "text script": function () {} },
        dataFilter: function (r) {
          i.globalEval(r, e, n);
        },
      });
    }),
    i.fn.extend({
      wrapAll: function (t) {
        var e;
        return (
          this[0] &&
            (V(t) && (t = t.call(this[0])),
            (e = i(t, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && e.insertBefore(this[0]),
            e
              .map(function () {
                for (var n = this; n.firstElementChild; )
                  n = n.firstElementChild;
                return n;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function (t) {
        return V(t)
          ? this.each(function (e) {
              i(this).wrapInner(t.call(this, e));
            })
          : this.each(function () {
              var e = i(this),
                n = e.contents();
              n.length ? n.wrapAll(t) : e.append(t);
            });
      },
      wrap: function (t) {
        var e = V(t);
        return this.each(function (n) {
          i(this).wrapAll(e ? t.call(this, n) : t);
        });
      },
      unwrap: function (t) {
        return (
          this.parent(t)
            .not("body")
            .each(function () {
              i(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    }),
    (i.expr.pseudos.hidden = function (t) {
      return !i.expr.pseudos.visible(t);
    }),
    (i.expr.pseudos.visible = function (t) {
      return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
    }),
    (i.ajaxSettings.xhr = function () {
      try {
        return new I.XMLHttpRequest();
      } catch {}
    });
  var Nr = { 0: 200, 1223: 204 },
    _e = i.ajaxSettings.xhr();
  (X.cors = !!_e && "withCredentials" in _e),
    (X.ajax = _e = !!_e),
    i.ajaxTransport(function (t) {
      var e, n;
      if (X.cors || (_e && !t.crossDomain))
        return {
          send: function (r, o) {
            var a,
              u = t.xhr();
            if (
              (u.open(t.type, t.url, t.async, t.username, t.password),
              t.xhrFields)
            )
              for (a in t.xhrFields) u[a] = t.xhrFields[a];
            for (a in (t.mimeType &&
              u.overrideMimeType &&
              u.overrideMimeType(t.mimeType),
            t.crossDomain ||
              r["X-Requested-With"] ||
              (r["X-Requested-With"] = "XMLHttpRequest"),
            r))
              u.setRequestHeader(a, r[a]);
            (e = function (p) {
              return function () {
                e &&
                  ((e =
                    n =
                    u.onload =
                    u.onerror =
                    u.onabort =
                    u.ontimeout =
                    u.onreadystatechange =
                      null),
                  "abort" === p
                    ? u.abort()
                    : "error" === p
                    ? "number" != typeof u.status
                      ? o(0, "error")
                      : o(u.status, u.statusText)
                    : o(
                        Nr[u.status] || u.status,
                        u.statusText,
                        "text" !== (u.responseType || "text") ||
                          "string" != typeof u.responseText
                          ? { binary: u.response }
                          : { text: u.responseText },
                        u.getAllResponseHeaders()
                      ));
              };
            }),
              (u.onload = e()),
              (n = u.onerror = u.ontimeout = e("error")),
              void 0 !== u.onabort
                ? (u.onabort = n)
                : (u.onreadystatechange = function () {
                    4 === u.readyState &&
                      I.setTimeout(function () {
                        e && n();
                      });
                  }),
              (e = e("abort"));
            try {
              u.send((t.hasContent && t.data) || null);
            } catch (p) {
              if (e) throw p;
            }
          },
          abort: function () {
            e && e();
          },
        };
    }),
    i.ajaxPrefilter(function (t) {
      t.crossDomain && (t.contents.script = !1);
    }),
    i.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (t) {
          return i.globalEval(t), t;
        },
      },
    }),
    i.ajaxPrefilter("script", function (t) {
      void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
    }),
    i.ajaxTransport("script", function (t) {
      var e, n;
      if (t.crossDomain || t.scriptAttrs)
        return {
          send: function (r, o) {
            (e = i("<script>")
              .attr(t.scriptAttrs || {})
              .prop({ charset: t.scriptCharset, src: t.url })
              .on(
                "load error",
                (n = function (a) {
                  e.remove(),
                    (n = null),
                    a && o("error" === a.type ? 404 : 200, a.type);
                })
              )),
              $.head.appendChild(e[0]);
          },
          abort: function () {
            n && n();
          },
        };
    });
  var or,
    ar = [],
    Nn = /(=)\?(?=&|$)|\?\?/;
  i.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var t = ar.pop() || i.expando + "_" + Qn.guid++;
      return (this[t] = !0), t;
    },
  }),
    i.ajaxPrefilter("json jsonp", function (t, e, n) {
      var r,
        o,
        a,
        u =
          !1 !== t.jsonp &&
          (Nn.test(t.url)
            ? "url"
            : "string" == typeof t.data &&
              0 ===
                (t.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              Nn.test(t.data) &&
              "data");
      if (u || "jsonp" === t.dataTypes[0])
        return (
          (r = t.jsonpCallback =
            V(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
          u
            ? (t[u] = t[u].replace(Nn, "$1" + r))
            : !1 !== t.jsonp &&
              (t.url += (Sn.test(t.url) ? "&" : "?") + t.jsonp + "=" + r),
          (t.converters["script json"] = function () {
            return a || i.error(r + " was not called"), a[0];
          }),
          (t.dataTypes[0] = "json"),
          (o = I[r]),
          (I[r] = function () {
            a = arguments;
          }),
          n.always(function () {
            void 0 === o ? i(I).removeProp(r) : (I[r] = o),
              t[r] && ((t.jsonpCallback = e.jsonpCallback), ar.push(r)),
              a && V(o) && o(a[0]),
              (a = o = void 0);
          }),
          "script"
        );
    }),
    (X.createHTMLDocument =
      (((or = $.implementation.createHTMLDocument("").body).innerHTML =
        "<form></form><form></form>"),
      2 === or.childNodes.length)),
    (i.parseHTML = function (t, e, n) {
      return "string" != typeof t
        ? []
        : ("boolean" == typeof e && ((n = e), (e = !1)),
          e ||
            (X.createHTMLDocument
              ? (((r = (e =
                  $.implementation.createHTMLDocument("")).createElement(
                  "base"
                )).href = $.location.href),
                e.head.appendChild(r))
              : (e = $)),
          (a = !n && []),
          (o = Ze.exec(t))
            ? [e.createElement(o[1])]
            : ((o = R([t], e, a)),
              a && a.length && i(a).remove(),
              i.merge([], o.childNodes)));
      var r, o, a;
    }),
    (i.fn.load = function (t, e, n) {
      var r,
        o,
        a,
        u = this,
        p = t.indexOf(" ");
      return (
        -1 < p && ((r = de(t.slice(p))), (t = t.slice(0, p))),
        V(e)
          ? ((n = e), (e = void 0))
          : e && "object" == typeof e && (o = "POST"),
        0 < u.length &&
          i
            .ajax({ url: t, type: o || "GET", dataType: "html", data: e })
            .done(function (c) {
              (a = arguments),
                u.html(r ? i("<div>").append(i.parseHTML(c)).find(r) : c);
            })
            .always(
              n &&
                function (c, g) {
                  u.each(function () {
                    n.apply(this, a || [c.responseText, g, c]);
                  });
                }
            ),
        this
      );
    }),
    (i.expr.pseudos.animated = function (t) {
      return i.grep(i.timers, function (e) {
        return t === e.elem;
      }).length;
    }),
    (i.offset = {
      setOffset: function (t, e, n) {
        var r,
          o,
          a,
          u,
          p,
          c,
          g = i.css(t, "position"),
          b = i(t),
          w = {};
        "static" === g && (t.style.position = "relative"),
          (p = b.offset()),
          (a = i.css(t, "top")),
          (c = i.css(t, "left")),
          ("absolute" === g || "fixed" === g) && -1 < (a + c).indexOf("auto")
            ? ((u = (r = b.position()).top), (o = r.left))
            : ((u = parseFloat(a) || 0), (o = parseFloat(c) || 0)),
          V(e) && (e = e.call(t, n, i.extend({}, p))),
          null != e.top && (w.top = e.top - p.top + u),
          null != e.left && (w.left = e.left - p.left + o),
          "using" in e ? e.using.call(t, w) : b.css(w);
      },
    }),
    i.fn.extend({
      offset: function (t) {
        if (arguments.length)
          return void 0 === t
            ? this
            : this.each(function (o) {
                i.offset.setOffset(this, t, o);
              });
        var e,
          n,
          r = this[0];
        return r
          ? r.getClientRects().length
            ? {
                top:
                  (e = r.getBoundingClientRect()).top +
                  (n = r.ownerDocument.defaultView).pageYOffset,
                left: e.left + n.pageXOffset,
              }
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var t,
            e,
            n,
            r = this[0],
            o = { top: 0, left: 0 };
          if ("fixed" === i.css(r, "position")) e = r.getBoundingClientRect();
          else {
            for (
              e = this.offset(),
                n = r.ownerDocument,
                t = r.offsetParent || n.documentElement;
              t &&
              (t === n.body || t === n.documentElement) &&
              "static" === i.css(t, "position");

            )
              t = t.parentNode;
            t &&
              t !== r &&
              1 === t.nodeType &&
              (((o = i(t).offset()).top += i.css(t, "borderTopWidth", !0)),
              (o.left += i.css(t, "borderLeftWidth", !0)));
          }
          return {
            top: e.top - o.top - i.css(r, "marginTop", !0),
            left: e.left - o.left - i.css(r, "marginLeft", !0),
          };
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var t = this.offsetParent;
            t && "static" === i.css(t, "position");

          )
            t = t.offsetParent;
          return t || _t;
        });
      },
    }),
    i.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (t, e) {
        var n = "pageYOffset" === e;
        i.fn[t] = function (r) {
          return Lt(
            this,
            function (o, a, u) {
              var p;
              if (
                (Tt(o) ? (p = o) : 9 === o.nodeType && (p = o.defaultView),
                void 0 === u)
              )
                return p ? p[e] : o[a];
              p
                ? p.scrollTo(n ? p.pageXOffset : u, n ? u : p.pageYOffset)
                : (o[a] = u);
            },
            t,
            r,
            arguments.length
          );
        };
      }
    ),
    i.each(["top", "left"], function (t, e) {
      i.cssHooks[e] = In(X.pixelPosition, function (n, r) {
        if (r)
          return (r = Ie(n, e)), bn.test(r) ? i(n).position()[e] + "px" : r;
      });
    }),
    i.each({ Height: "height", Width: "width" }, function (t, e) {
      i.each(
        { padding: "inner" + t, content: e, "": "outer" + t },
        function (n, r) {
          i.fn[r] = function (o, a) {
            var u = arguments.length && (n || "boolean" != typeof o),
              p = n || (!0 === o || !0 === a ? "margin" : "border");
            return Lt(
              this,
              function (c, g, b) {
                var w;
                return Tt(c)
                  ? 0 === r.indexOf("outer")
                    ? c["inner" + t]
                    : c.document.documentElement["client" + t]
                  : 9 === c.nodeType
                  ? ((w = c.documentElement),
                    Math.max(
                      c.body["scroll" + t],
                      w["scroll" + t],
                      c.body["offset" + t],
                      w["offset" + t],
                      w["client" + t]
                    ))
                  : void 0 === b
                  ? i.css(c, g, p)
                  : i.style(c, g, b, p);
              },
              e,
              u ? o : void 0,
              u
            );
          };
        }
      );
    }),
    i.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (t, e) {
        i.fn[e] = function (n) {
          return this.on(e, n);
        };
      }
    ),
    i.fn.extend({
      bind: function (t, e, n) {
        return this.on(t, null, e, n);
      },
      unbind: function (t, e) {
        return this.off(t, null, e);
      },
      delegate: function (t, e, n, r) {
        return this.on(e, t, n, r);
      },
      undelegate: function (t, e, n) {
        return 1 === arguments.length
          ? this.off(t, "**")
          : this.off(e, t || "**", n);
      },
      hover: function (t, e) {
        return this.on("mouseenter", t).on("mouseleave", e || t);
      },
    }),
    i.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
        " "
      ),
      function (t, e) {
        i.fn[e] = function (n, r) {
          return 0 < arguments.length
            ? this.on(e, null, n, r)
            : this.trigger(e);
        };
      }
    );
  var Lr = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
  (i.proxy = function (t, e) {
    var n, r, o;
    if (("string" == typeof e && ((n = t[e]), (e = t), (t = n)), V(t)))
      return (
        (r = bt.call(arguments, 2)),
        ((o = function () {
          return t.apply(e || this, r.concat(bt.call(arguments)));
        }).guid = t.guid =
          t.guid || i.guid++),
        o
      );
  }),
    (i.holdReady = function (t) {
      t ? i.readyWait++ : i.ready(!0);
    }),
    (i.isArray = Array.isArray),
    (i.parseJSON = JSON.parse),
    (i.nodeName = nt),
    (i.isFunction = V),
    (i.isWindow = Tt),
    (i.camelCase = xt),
    (i.type = Kt),
    (i.now = Date.now),
    (i.isNumeric = function (t) {
      var e = i.type(t);
      return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t));
    }),
    (i.trim = function (t) {
      return null == t ? "" : (t + "").replace(Lr, "$1");
    }),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return i;
      });
  var Or = I.jQuery,
    Hr = I.$;
  return (
    (i.noConflict = function (t) {
      return I.$ === i && (I.$ = Hr), t && I.jQuery === i && (I.jQuery = Or), i;
    }),
    typeof vt > "u" && (I.jQuery = I.$ = i),
    i
  );
}),
  (function (I, vt) {
    "object" == typeof exports && typeof module < "u"
      ? (module.exports = vt())
      : "function" == typeof define && define.amd
      ? define(vt)
      : (I.Popper = vt());
  })(this, function () {
    "use strict";
    function I(s) {
      return s && "[object Function]" === {}.toString.call(s);
    }
    function vt(s, f) {
      if (1 !== s.nodeType) return [];
      var m = s.ownerDocument.defaultView.getComputedStyle(s, null);
      return f ? m[f] : m;
    }
    function at(s) {
      return "HTML" === s.nodeName ? s : s.parentNode || s.host;
    }
    function ne(s) {
      if (!s) return document.body;
      switch (s.nodeName) {
        case "HTML":
        case "BODY":
          return s.ownerDocument.body;
        case "#document":
          return s.body;
      }
      var f = vt(s);
      return /(auto|scroll|overlay)/.test(
        f.overflow + f.overflowY + f.overflowX
      )
        ? s
        : ne(at(s));
    }
    function bt(s) {
      return s && s.referenceNode ? s.referenceNode : s;
    }
    function Gt(s) {
      return 11 === s ? yt : 10 === s ? rn : yt || rn;
    }
    function qt(s) {
      if (!s) return document.documentElement;
      for (
        var f = Gt(10) ? document.body : null, d = s.offsetParent || null;
        d === f && s.nextElementSibling;

      )
        d = (s = s.nextElementSibling).offsetParent;
      var m = d && d.nodeName;
      return m && "BODY" !== m && "HTML" !== m
        ? -1 !== ["TH", "TD", "TABLE"].indexOf(d.nodeName) &&
          "static" === vt(d, "position")
          ? qt(d)
          : d
        : s
        ? s.ownerDocument.documentElement
        : document.documentElement;
    }
    function re(s) {
      return null === s.parentNode ? s : re(s.parentNode);
    }
    function ue(s, f) {
      if (!(s && s.nodeType && f && f.nodeType))
        return document.documentElement;
      var d = s.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING,
        m = d ? s : f,
        k = d ? f : s,
        C = document.createRange();
      C.setStart(m, 0), C.setEnd(k, 0);
      var T = C.commonAncestorContainer;
      if ((s !== T && f !== T) || m.contains(k))
        return (function Pt(s) {
          var f = s.nodeName;
          return (
            "BODY" !== f && ("HTML" === f || qt(s.firstElementChild) === s)
          );
        })(T)
          ? T
          : qt(T);
      var A = re(s);
      return A.host ? ue(A.host, f) : ue(s, re(f).host);
    }
    function At(s) {
      var d =
          "top" ===
          (1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : "top")
            ? "scrollTop"
            : "scrollLeft",
        m = s.nodeName;
      return "BODY" === m || "HTML" === m
        ? (s.ownerDocument.scrollingElement || s.ownerDocument.documentElement)[
            d
          ]
        : s[d];
    }
    function Ye(s, f) {
      var d = "x" === f ? "Left" : "Top",
        m = "Left" == d ? "Right" : "Bottom";
      return (
        parseFloat(s["border" + d + "Width"]) +
        parseFloat(s["border" + m + "Width"])
      );
    }
    function X(s, f, d, m) {
      return Mt(
        f["offset" + s],
        f["scroll" + s],
        d["client" + s],
        d["offset" + s],
        d["scroll" + s],
        Gt(10)
          ? parseInt(d["offset" + s]) +
              parseInt(m["margin" + ("Height" === s ? "Top" : "Left")]) +
              parseInt(m["margin" + ("Height" === s ? "Bottom" : "Right")])
          : 0
      );
    }
    function V(s) {
      var f = s.body,
        d = s.documentElement,
        m = Gt(10) && getComputedStyle(d);
      return { height: X("Height", f, d, m), width: X("Width", f, d, m) };
    }
    function Tt(s) {
      return dt({}, s, { right: s.left + s.width, bottom: s.top + s.height });
    }
    function $(s) {
      var f = {};
      try {
        if (Gt(10)) {
          f = s.getBoundingClientRect();
          var d = At(s, "top"),
            m = At(s, "left");
          (f.top += d), (f.left += m), (f.bottom += d), (f.right += m);
        } else f = s.getBoundingClientRect();
      } catch {}
      var k = {
          left: f.left,
          top: f.top,
          width: f.right - f.left,
          height: f.bottom - f.top,
        },
        C = "HTML" === s.nodeName ? V(s.ownerDocument) : {},
        D = s.offsetWidth - (C.width || s.clientWidth || k.width),
        O = s.offsetHeight - (C.height || s.clientHeight || k.height);
      if (D || O) {
        var W = vt(s);
        (D -= Ye(W, "x")), (O -= Ye(W, "y")), (k.width -= D), (k.height -= O);
      }
      return Tt(k);
    }
    function De(s, f) {
      var d = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        m = Gt(10),
        k = "HTML" === f.nodeName,
        C = $(s),
        T = $(f),
        A = ne(s),
        D = vt(f),
        O = parseFloat(D.borderTopWidth),
        W = parseFloat(D.borderLeftWidth);
      d && k && ((T.top = Mt(T.top, 0)), (T.left = Mt(T.left, 0)));
      var H = Tt({
        top: C.top - T.top - O,
        left: C.left - T.left - W,
        width: C.width,
        height: C.height,
      });
      if (((H.marginTop = 0), (H.marginLeft = 0), !m && k)) {
        var R = parseFloat(D.marginTop),
          G = parseFloat(D.marginLeft);
        (H.top -= O - R),
          (H.bottom -= O - R),
          (H.left -= W - G),
          (H.right -= W - G),
          (H.marginTop = R),
          (H.marginLeft = G);
      }
      return (
        (m && !d ? f.contains(A) : f === A && "BODY" !== A.nodeName) &&
          (H = (function Ve(s, f) {
            var d =
                2 < arguments.length && void 0 !== arguments[2] && arguments[2],
              m = At(f, "top"),
              k = At(f, "left"),
              C = d ? -1 : 1;
            return (
              (s.top += m * C),
              (s.bottom += m * C),
              (s.left += k * C),
              (s.right += k * C),
              s
            );
          })(H, f)),
        H
      );
    }
    function Kt(s) {
      var f = s.nodeName;
      if ("BODY" === f || "HTML" === f) return !1;
      if ("fixed" === vt(s, "position")) return !0;
      var d = at(s);
      return !!d && Kt(d);
    }
    function Ae(s) {
      if (!s || !s.parentElement || Gt()) return document.documentElement;
      for (var f = s.parentElement; f && "none" === vt(f, "transform"); )
        f = f.parentElement;
      return f || document.documentElement;
    }
    function je(s, f, d, m) {
      var k = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
        C = { top: 0, left: 0 },
        T = k ? Ae(s) : ue(s, bt(f));
      if ("viewport" === m)
        C = (function Ge(s) {
          var f =
              1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            d = s.ownerDocument.documentElement,
            m = De(s, d),
            k = Mt(d.clientWidth, window.innerWidth || 0),
            C = Mt(d.clientHeight, window.innerHeight || 0),
            T = f ? 0 : At(d),
            A = f ? 0 : At(d, "left");
          return Tt({
            top: T - m.top + m.marginTop,
            left: A - m.left + m.marginLeft,
            width: k,
            height: C,
          });
        })(T, k);
      else {
        var A;
        "scrollParent" === m
          ? "BODY" === (A = ne(at(f))).nodeName &&
            (A = s.ownerDocument.documentElement)
          : (A = "window" === m ? s.ownerDocument.documentElement : m);
        var D = De(A, T, k);
        if ("HTML" !== A.nodeName || Kt(T)) C = D;
        else {
          var O = V(s.ownerDocument),
            W = O.height,
            H = O.width;
          (C.top += D.top - D.marginTop),
            (C.bottom = W + D.top),
            (C.left += D.left - D.marginLeft),
            (C.right = H + D.left);
        }
      }
      var R = "number" == typeof (d = d || 0);
      return (
        (C.left += R ? d : d.left || 0),
        (C.top += R ? d : d.top || 0),
        (C.right -= R ? d : d.right || 0),
        (C.bottom -= R ? d : d.bottom || 0),
        C
      );
    }
    function i(s) {
      return s.width * s.height;
    }
    function ye(s, f, d, m, k) {
      var C =
        5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
      if (-1 === s.indexOf("auto")) return s;
      var T = je(d, m, C, k),
        A = {
          top: { width: T.width, height: f.top - T.top },
          right: { width: T.right - f.right, height: T.height },
          bottom: { width: T.width, height: T.bottom - f.bottom },
          left: { width: f.left - T.left, height: T.height },
        },
        D = Object.keys(A)
          .map(function (R) {
            return dt({ key: R }, A[R], { area: i(A[R]) });
          })
          .sort(function (R, G) {
            return G.area - R.area;
          }),
        O = D.filter(function (R) {
          return R.width >= d.clientWidth && R.height >= d.clientHeight;
        }),
        W = 0 < O.length ? O[0].key : D[0].key,
        H = s.split("-")[1];
      return W + (H ? "-" + H : "");
    }
    function nt(s, f, d) {
      var m =
        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return De(d, m ? Ae(f) : ue(f, bt(d)), m);
    }
    function Ke(s) {
      var d = s.ownerDocument.defaultView.getComputedStyle(s),
        m = parseFloat(d.marginTop || 0) + parseFloat(d.marginBottom || 0),
        k = parseFloat(d.marginLeft || 0) + parseFloat(d.marginRight || 0);
      return { width: s.offsetWidth + k, height: s.offsetHeight + m };
    }
    function be(s) {
      var f = { left: "right", right: "left", bottom: "top", top: "bottom" };
      return s.replace(/left|right|bottom|top/g, function (d) {
        return f[d];
      });
    }
    function Qe(s, f, d) {
      d = d.split("-")[0];
      var m = Ke(s),
        k = { width: m.width, height: m.height },
        C = -1 !== ["right", "left"].indexOf(d),
        T = C ? "top" : "left",
        A = C ? "left" : "top",
        D = C ? "height" : "width",
        O = C ? "width" : "height";
      return (
        (k[T] = f[T] + f[D] / 2 - m[D] / 2),
        (k[A] = d === A ? f[A] - m[O] : f[be(A)]),
        k
      );
    }
    function J(s, f) {
      return Array.prototype.find ? s.find(f) : s.filter(f)[0];
    }
    function Je(s, f, d) {
      var m =
        void 0 === d
          ? s
          : s.slice(
              0,
              (function le(s, f, d) {
                if (Array.prototype.findIndex)
                  return s.findIndex(function (k) {
                    return k[f] === d;
                  });
                var m = J(s, function (k) {
                  return k[f] === d;
                });
                return s.indexOf(m);
              })(s, "name", d)
            );
      return (
        m.forEach(function (k) {
          k.function &&
            console.warn(
              "`modifier.function` is deprecated, use `modifier.fn`!"
            );
          var C = k.function || k.fn;
          k.enabled &&
            I(C) &&
            ((f.offsets.popper = Tt(f.offsets.popper)),
            (f.offsets.reference = Tt(f.offsets.reference)),
            (f = C(f, k)));
        }),
        f
      );
    }
    function hn() {
      if (!this.state.isDestroyed) {
        var s = {
          instance: this,
          styles: {},
          arrowStyles: {},
          attributes: {},
          flipped: !1,
          offsets: {},
        };
        (s.offsets.reference = nt(
          this.state,
          this.popper,
          this.reference,
          this.options.positionFixed
        )),
          (s.placement = ye(
            this.options.placement,
            s.offsets.reference,
            this.popper,
            this.reference,
            this.options.modifiers.flip.boundariesElement,
            this.options.modifiers.flip.padding
          )),
          (s.originalPlacement = s.placement),
          (s.positionFixed = this.options.positionFixed),
          (s.offsets.popper = Qe(
            this.popper,
            s.offsets.reference,
            s.placement
          )),
          (s.offsets.popper.position = this.options.positionFixed
            ? "fixed"
            : "absolute"),
          (s = Je(this.modifiers, s)),
          this.state.isCreated
            ? this.options.onUpdate(s)
            : ((this.state.isCreated = !0), this.options.onCreate(s));
      }
    }
    function jt(s, f) {
      return s.some(function (d) {
        return d.enabled && d.name === f;
      });
    }
    function ce(s) {
      for (
        var f = [!1, "ms", "Webkit", "Moz", "O"],
          d = s.charAt(0).toUpperCase() + s.slice(1),
          m = 0;
        m < f.length;
        m++
      ) {
        var k = f[m],
          C = k ? "" + k + d : s;
        if (typeof document.body.style[C] < "u") return C;
      }
      return null;
    }
    function ie() {
      return (
        (this.state.isDestroyed = !0),
        jt(this.modifiers, "applyStyle") &&
          (this.popper.removeAttribute("x-placement"),
          (this.popper.style.position = ""),
          (this.popper.style.top = ""),
          (this.popper.style.left = ""),
          (this.popper.style.right = ""),
          (this.popper.style.bottom = ""),
          (this.popper.style.willChange = ""),
          (this.popper.style[ce("transform")] = "")),
        this.disableEventListeners(),
        this.options.removeOnDestroy &&
          this.popper.parentNode.removeChild(this.popper),
        this
      );
    }
    function Ne(s) {
      var f = s.ownerDocument;
      return f ? f.defaultView : window;
    }
    function Le(s, f, d, m) {
      var k = "BODY" === s.nodeName,
        C = k ? s.ownerDocument.defaultView : s;
      C.addEventListener(f, d, { passive: !0 }),
        k || Le(ne(C.parentNode), f, d, m),
        m.push(C);
    }
    function Ze(s, f, d, m) {
      (d.updateBound = m),
        Ne(s).addEventListener("resize", d.updateBound, { passive: !0 });
      var k = ne(s);
      return (
        Le(k, "scroll", d.updateBound, d.scrollParents),
        (d.scrollElement = k),
        (d.eventsEnabled = !0),
        d
      );
    }
    function Oe() {
      this.state.eventsEnabled ||
        (this.state = Ze(this.reference, 0, this.state, this.scheduleUpdate));
    }
    function gn() {
      this.state.eventsEnabled &&
        (cancelAnimationFrame(this.scheduleUpdate),
        (this.state = (function tn(s, f) {
          return (
            Ne(s).removeEventListener("resize", f.updateBound),
            f.scrollParents.forEach(function (d) {
              d.removeEventListener("scroll", f.updateBound);
            }),
            (f.updateBound = null),
            (f.scrollParents = []),
            (f.scrollElement = null),
            (f.eventsEnabled = !1),
            f
          );
        })(this.reference, this.state)));
    }
    function He(s) {
      return "" !== s && !isNaN(parseFloat(s)) && isFinite(s);
    }
    function qe(s, f) {
      Object.keys(f).forEach(function (d) {
        var m = "";
        -1 !==
          ["width", "height", "top", "right", "bottom", "left"].indexOf(d) &&
          He(f[d]) &&
          (m = "px"),
          (s.style[d] = f[d] + m);
      });
    }
    function Qt(s, f, d) {
      var m = J(s, function (T) {
          return T.name === f;
        }),
        k =
          !!m &&
          s.some(function (T) {
            return T.name === d && T.enabled && T.order < m.order;
          });
      if (!k) {
        var C = "`" + f + "`";
        console.warn(
          "`" +
            d +
            "` modifier is required by " +
            C +
            " modifier in order to work, be sure to include it before " +
            C +
            "!"
        );
      }
      return k;
    }
    function Pe(s) {
      var f = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        d = Ut.indexOf(s),
        m = Ut.slice(d + 1).concat(Ut.slice(0, d));
      return f ? m.reverse() : m;
    }
    var Lt = Math.min,
      Re = Math.floor,
      nn = Math.round,
      Mt = Math.max,
      xt =
        typeof window < "u" && typeof document < "u" && typeof navigator < "u",
      fe = (function () {
        for (
          var s = ["Edge", "Trident", "Firefox"], f = 0;
          f < s.length;
          f += 1
        )
          if (xt && 0 <= navigator.userAgent.indexOf(s[f])) return 1;
        return 0;
      })(),
      P =
        xt && window.Promise
          ? function (s) {
              var f = !1;
              return function () {
                f ||
                  ((f = !0),
                  window.Promise.resolve().then(function () {
                    (f = !1), s();
                  }));
              };
            }
          : function (s) {
              var f = !1;
              return function () {
                f ||
                  ((f = !0),
                  setTimeout(function () {
                    (f = !1), s();
                  }, fe));
              };
            },
      yt = xt && !(!window.MSInputMethodContext || !document.documentMode),
      rn = xt && /MSIE 10/.test(navigator.userAgent),
      on = (function () {
        function s(f, d) {
          for (var m, k = 0; k < d.length; k++)
            ((m = d[k]).enumerable = m.enumerable || !1),
              (m.configurable = !0),
              "value" in m && (m.writable = !0),
              Object.defineProperty(f, m.key, m);
        }
        return function (f, d, m) {
          return d && s(f.prototype, d), m && s(f, m), f;
        };
      })(),
      Jt = function (s, f, d) {
        return (
          f in s
            ? Object.defineProperty(s, f, {
                value: d,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (s[f] = d),
          s
        );
      },
      dt =
        Object.assign ||
        function (s) {
          for (var f, d = 1; d < arguments.length; d++)
            for (var m in (f = arguments[d]))
              Object.prototype.hasOwnProperty.call(f, m) && (s[m] = f[m]);
          return s;
        },
      Rt = xt && /Firefox/i.test(navigator.userAgent),
      _t = [
        "auto-start",
        "auto",
        "auto-end",
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-end",
        "bottom",
        "bottom-start",
        "left-end",
        "left",
        "left-start",
      ],
      Ut = _t.slice(3),
      Zt = (function () {
        function s(f, d) {
          var m = this,
            k =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : {};
          (function (s, f) {
            if (!(s instanceof f))
              throw new TypeError("Cannot call a class as a function");
          })(this, s),
            (this.scheduleUpdate = function () {
              return requestAnimationFrame(m.update);
            }),
            (this.update = P(this.update.bind(this))),
            (this.options = dt({}, s.Defaults, k)),
            (this.state = {
              isDestroyed: !1,
              isCreated: !1,
              scrollParents: [],
            }),
            (this.reference = f && f.jquery ? f[0] : f),
            (this.popper = d && d.jquery ? d[0] : d),
            (this.options.modifiers = {}),
            Object.keys(dt({}, s.Defaults.modifiers, k.modifiers)).forEach(
              function (T) {
                m.options.modifiers[T] = dt(
                  {},
                  s.Defaults.modifiers[T] || {},
                  k.modifiers ? k.modifiers[T] : {}
                );
              }
            ),
            (this.modifiers = Object.keys(this.options.modifiers)
              .map(function (T) {
                return dt({ name: T }, m.options.modifiers[T]);
              })
              .sort(function (T, A) {
                return T.order - A.order;
              })),
            this.modifiers.forEach(function (T) {
              T.enabled &&
                I(T.onLoad) &&
                T.onLoad(m.reference, m.popper, m.options, T, m.state);
            }),
            this.update();
          var C = this.options.eventsEnabled;
          C && this.enableEventListeners(), (this.state.eventsEnabled = C);
        }
        return (
          on(s, [
            {
              key: "update",
              value: function () {
                return hn.call(this);
              },
            },
            {
              key: "destroy",
              value: function () {
                return ie.call(this);
              },
            },
            {
              key: "enableEventListeners",
              value: function () {
                return Oe.call(this);
              },
            },
            {
              key: "disableEventListeners",
              value: function () {
                return gn.call(this);
              },
            },
          ]),
          s
        );
      })();
    return (
      (Zt.Utils = (typeof window > "u" ? global : window).PopperUtils),
      (Zt.placements = _t),
      (Zt.Defaults = {
        placement: "bottom",
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function () {},
        onUpdate: function () {},
        modifiers: {
          shift: {
            order: 100,
            enabled: !0,
            fn: function (s) {
              var f = s.placement,
                d = f.split("-")[0],
                m = f.split("-")[1];
              if (m) {
                var k = s.offsets,
                  C = k.reference,
                  T = k.popper,
                  A = -1 !== ["bottom", "top"].indexOf(d),
                  D = A ? "left" : "top",
                  O = A ? "width" : "height",
                  W = {
                    start: Jt({}, D, C[D]),
                    end: Jt({}, D, C[D] + C[O] - T[O]),
                  };
                s.offsets.popper = dt({}, T, W[m]);
              }
              return s;
            },
          },
          offset: {
            order: 200,
            enabled: !0,
            fn: function we(s, f) {
              var d,
                m = f.offset,
                C = s.offsets,
                T = C.popper,
                A = C.reference,
                D = s.placement.split("-")[0];
              return (
                (d = He(+m)
                  ? [+m, 0]
                  : (function Me(s, f, d, m) {
                      var k = [0, 0],
                        C = -1 !== ["right", "left"].indexOf(m),
                        T = s.split(/(\+|\-)/).map(function (W) {
                          return W.trim();
                        }),
                        A = T.indexOf(
                          J(T, function (W) {
                            return -1 !== W.search(/,|\s/);
                          })
                        );
                      T[A] &&
                        -1 === T[A].indexOf(",") &&
                        console.warn(
                          "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
                        );
                      var D = /\s*,\s*|\s+/,
                        O =
                          -1 === A
                            ? [T]
                            : [
                                T.slice(0, A).concat([T[A].split(D)[0]]),
                                [T[A].split(D)[1]].concat(T.slice(A + 1)),
                              ];
                      return (
                        (O = O.map(function (W, H) {
                          var R = (1 === H ? !C : C) ? "height" : "width",
                            G = !1;
                          return W.reduce(function (K, ct) {
                            return "" === K[K.length - 1] &&
                              -1 !== ["+", "-"].indexOf(ct)
                              ? ((K[K.length - 1] = ct), (G = !0), K)
                              : G
                              ? ((K[K.length - 1] += ct), (G = !1), K)
                              : K.concat(ct);
                          }, []).map(function (K) {
                            return (function mn(s, f, d, m) {
                              var k = s.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                C = +k[1],
                                T = k[2];
                              return C
                                ? 0 === T.indexOf("%")
                                  ? (Tt("%p" === T ? d : m)[f] / 100) * C
                                  : "vh" === T || "vw" === T
                                  ? (("vh" === T
                                      ? Mt(
                                          document.documentElement.clientHeight,
                                          window.innerHeight || 0
                                        )
                                      : Mt(
                                          document.documentElement.clientWidth,
                                          window.innerWidth || 0
                                        )) /
                                      100) *
                                    C
                                  : C
                                : s;
                            })(K, R, f, d);
                          });
                        })),
                        O.forEach(function (W, H) {
                          W.forEach(function (R, G) {
                            He(R) && (k[H] += R * ("-" === W[G - 1] ? -1 : 1));
                          });
                        }),
                        k
                      );
                    })(m, T, A, D)),
                "left" === D
                  ? ((T.top += d[0]), (T.left -= d[1]))
                  : "right" === D
                  ? ((T.top += d[0]), (T.left += d[1]))
                  : "top" === D
                  ? ((T.left += d[0]), (T.top -= d[1]))
                  : "bottom" === D && ((T.left += d[0]), (T.top += d[1])),
                (s.popper = T),
                s
              );
            },
            offset: 0,
          },
          preventOverflow: {
            order: 300,
            enabled: !0,
            fn: function (s, f) {
              var d = f.boundariesElement || qt(s.instance.popper);
              s.instance.reference === d && (d = qt(d));
              var m = ce("transform"),
                k = s.instance.popper.style,
                C = k.top,
                T = k.left,
                A = k[m];
              (k.top = ""), (k.left = ""), (k[m] = "");
              var D = je(
                s.instance.popper,
                s.instance.reference,
                f.padding,
                d,
                s.positionFixed
              );
              (k.top = C), (k.left = T), (k[m] = A), (f.boundaries = D);
              var W = s.offsets.popper,
                H = {
                  primary: function (R) {
                    var G = W[R];
                    return (
                      W[R] < D[R] &&
                        !f.escapeWithReference &&
                        (G = Mt(W[R], D[R])),
                      Jt({}, R, G)
                    );
                  },
                  secondary: function (R) {
                    var G = "right" === R ? "left" : "top",
                      K = W[G];
                    return (
                      W[R] > D[R] &&
                        !f.escapeWithReference &&
                        (K = Lt(
                          W[G],
                          D[R] - ("right" === R ? W.width : W.height)
                        )),
                      Jt({}, G, K)
                    );
                  },
                };
              return (
                f.priority.forEach(function (R) {
                  var G =
                    -1 === ["left", "top"].indexOf(R) ? "secondary" : "primary";
                  W = dt({}, W, H[G](R));
                }),
                (s.offsets.popper = W),
                s
              );
            },
            priority: ["left", "right", "top", "bottom"],
            padding: 5,
            boundariesElement: "scrollParent",
          },
          keepTogether: {
            order: 400,
            enabled: !0,
            fn: function (s) {
              var f = s.offsets,
                d = f.popper,
                m = f.reference,
                k = s.placement.split("-")[0],
                C = Re,
                T = -1 !== ["top", "bottom"].indexOf(k),
                A = T ? "right" : "bottom",
                D = T ? "left" : "top",
                O = T ? "width" : "height";
              return (
                d[A] < C(m[D]) && (s.offsets.popper[D] = C(m[D]) - d[O]),
                d[D] > C(m[A]) && (s.offsets.popper[D] = C(m[A])),
                s
              );
            },
          },
          arrow: {
            order: 500,
            enabled: !0,
            fn: function (s, f) {
              var d;
              if (!Qt(s.instance.modifiers, "arrow", "keepTogether")) return s;
              var m = f.element;
              if ("string" == typeof m) {
                if (!(m = s.instance.popper.querySelector(m))) return s;
              } else if (!s.instance.popper.contains(m))
                return (
                  console.warn(
                    "WARNING: `arrow.element` must be child of its popper element!"
                  ),
                  s
                );
              var k = s.placement.split("-")[0],
                C = s.offsets,
                T = C.popper,
                A = C.reference,
                D = -1 !== ["left", "right"].indexOf(k),
                O = D ? "height" : "width",
                W = D ? "Top" : "Left",
                H = W.toLowerCase(),
                R = D ? "left" : "top",
                G = D ? "bottom" : "right",
                K = Ke(m)[O];
              A[G] - K < T[H] && (s.offsets.popper[H] -= T[H] - (A[G] - K)),
                A[H] + K > T[G] && (s.offsets.popper[H] += A[H] + K - T[G]),
                (s.offsets.popper = Tt(s.offsets.popper));
              var ct = A[H] + A[O] / 2 - K / 2,
                Ot = vt(s.instance.popper),
                Ft = parseFloat(Ot["margin" + W]),
                St = parseFloat(Ot["border" + W + "Width"]),
                te = ct - s.offsets.popper[H] - Ft - St;
              return (
                (te = Mt(Lt(T[O] - K, te), 0)),
                (s.arrowElement = m),
                (s.offsets.arrow = (Jt((d = {}), H, nn(te)), Jt(d, R, ""), d)),
                s
              );
            },
            element: "[x-arrow]",
          },
          flip: {
            order: 600,
            enabled: !0,
            fn: function (s, f) {
              if (
                jt(s.instance.modifiers, "inner") ||
                (s.flipped && s.placement === s.originalPlacement)
              )
                return s;
              var d = je(
                  s.instance.popper,
                  s.instance.reference,
                  f.padding,
                  f.boundariesElement,
                  s.positionFixed
                ),
                m = s.placement.split("-")[0],
                k = be(m),
                C = s.placement.split("-")[1] || "",
                T = [];
              switch (f.behavior) {
                case "flip":
                  T = [m, k];
                  break;
                case "clockwise":
                  T = Pe(m);
                  break;
                case "counterclockwise":
                  T = Pe(m, !0);
                  break;
                default:
                  T = f.behavior;
              }
              return (
                T.forEach(function (A, D) {
                  if (m !== A || T.length === D + 1) return s;
                  (m = s.placement.split("-")[0]), (k = be(m));
                  var O = s.offsets.popper,
                    W = s.offsets.reference,
                    H = Re,
                    R =
                      ("left" === m && H(O.right) > H(W.left)) ||
                      ("right" === m && H(O.left) < H(W.right)) ||
                      ("top" === m && H(O.bottom) > H(W.top)) ||
                      ("bottom" === m && H(O.top) < H(W.bottom)),
                    G = H(O.left) < H(d.left),
                    K = H(O.right) > H(d.right),
                    ct = H(O.top) < H(d.top),
                    Ot = H(O.bottom) > H(d.bottom),
                    Ft =
                      ("left" === m && G) ||
                      ("right" === m && K) ||
                      ("top" === m && ct) ||
                      ("bottom" === m && Ot),
                    St = -1 !== ["top", "bottom"].indexOf(m),
                    We =
                      (!!f.flipVariations &&
                        ((St && "start" === C && G) ||
                          (St && "end" === C && K) ||
                          (!St && "start" === C && ct) ||
                          (!St && "end" === C && Ot))) ||
                      (!!f.flipVariationsByContent &&
                        ((St && "start" === C && K) ||
                          (St && "end" === C && G) ||
                          (!St && "start" === C && Ot) ||
                          (!St && "end" === C && ct)));
                  (R || Ft || We) &&
                    ((s.flipped = !0),
                    (R || Ft) && (m = T[D + 1]),
                    We &&
                      (C = (function xe(s) {
                        return "end" === s
                          ? "start"
                          : "start" === s
                          ? "end"
                          : s;
                      })(C)),
                    (s.placement = m + (C ? "-" + C : "")),
                    (s.offsets.popper = dt(
                      {},
                      s.offsets.popper,
                      Qe(s.instance.popper, s.offsets.reference, s.placement)
                    )),
                    (s = Je(s.instance.modifiers, s, "flip")));
                }),
                s
              );
            },
            behavior: "flip",
            padding: 5,
            boundariesElement: "viewport",
            flipVariations: !1,
            flipVariationsByContent: !1,
          },
          inner: {
            order: 700,
            enabled: !1,
            fn: function (s) {
              var f = s.placement,
                d = f.split("-")[0],
                m = s.offsets,
                k = m.popper,
                C = m.reference,
                T = -1 !== ["left", "right"].indexOf(d),
                A = -1 === ["top", "left"].indexOf(d);
              return (
                (k[T ? "left" : "top"] =
                  C[d] - (A ? k[T ? "width" : "height"] : 0)),
                (s.placement = be(f)),
                (s.offsets.popper = Tt(k)),
                s
              );
            },
          },
          hide: {
            order: 800,
            enabled: !0,
            fn: function (s) {
              if (!Qt(s.instance.modifiers, "hide", "preventOverflow"))
                return s;
              var f = s.offsets.reference,
                d = J(s.instance.modifiers, function (m) {
                  return "preventOverflow" === m.name;
                }).boundaries;
              if (
                f.bottom < d.top ||
                f.left > d.right ||
                f.top > d.bottom ||
                f.right < d.left
              ) {
                if (!0 === s.hide) return s;
                (s.hide = !0), (s.attributes["x-out-of-boundaries"] = "");
              } else {
                if (!1 === s.hide) return s;
                (s.hide = !1), (s.attributes["x-out-of-boundaries"] = !1);
              }
              return s;
            },
          },
          computeStyle: {
            order: 850,
            enabled: !0,
            fn: function (s, f) {
              var d = f.x,
                m = f.y,
                k = s.offsets.popper,
                C = J(s.instance.modifiers, function (te) {
                  return "applyStyle" === te.name;
                }).gpuAcceleration;
              void 0 !== C &&
                console.warn(
                  "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                );
              var T,
                A,
                D = void 0 === C ? f.gpuAcceleration : C,
                O = qt(s.instance.popper),
                W = $(O),
                H = { position: k.position },
                R = (function Nt(s, f) {
                  var d = s.offsets,
                    m = d.popper,
                    C = nn,
                    T = function (G) {
                      return G;
                    },
                    A = C(d.reference.width),
                    D = C(m.width),
                    O = -1 !== ["left", "right"].indexOf(s.placement),
                    W = -1 !== s.placement.indexOf("-"),
                    H = f ? (O || W || A % 2 == D % 2 ? C : Re) : T,
                    R = f ? C : T;
                  return {
                    left: H(
                      A % 2 == 1 && D % 2 == 1 && !W && f ? m.left - 1 : m.left
                    ),
                    top: R(m.top),
                    bottom: R(m.bottom),
                    right: H(m.right),
                  };
                })(s, 2 > window.devicePixelRatio || !Rt),
                G = "bottom" === d ? "top" : "bottom",
                K = "right" === m ? "left" : "right",
                ct = ce("transform");
              if (
                ((A =
                  "bottom" == G
                    ? "HTML" === O.nodeName
                      ? -O.clientHeight + R.bottom
                      : -W.height + R.bottom
                    : R.top),
                (T =
                  "right" == K
                    ? "HTML" === O.nodeName
                      ? -O.clientWidth + R.right
                      : -W.width + R.right
                    : R.left),
                D && ct)
              )
                (H[ct] = "translate3d(" + T + "px, " + A + "px, 0)"),
                  (H[G] = 0),
                  (H[K] = 0),
                  (H.willChange = "transform");
              else {
                var Ft = "right" == K ? -1 : 1;
                (H[G] = A * ("bottom" == G ? -1 : 1)),
                  (H[K] = T * Ft),
                  (H.willChange = G + ", " + K);
              }
              return (
                (s.attributes = dt(
                  {},
                  { "x-placement": s.placement },
                  s.attributes
                )),
                (s.styles = dt({}, H, s.styles)),
                (s.arrowStyles = dt({}, s.offsets.arrow, s.arrowStyles)),
                s
              );
            },
            gpuAcceleration: !0,
            x: "bottom",
            y: "right",
          },
          applyStyle: {
            order: 900,
            enabled: !0,
            fn: function (s) {
              return (
                qe(s.instance.popper, s.styles),
                (function en(s, f) {
                  Object.keys(f).forEach(function (d) {
                    !1 === f[d]
                      ? s.removeAttribute(d)
                      : s.setAttribute(d, f[d]);
                  });
                })(s.instance.popper, s.attributes),
                s.arrowElement &&
                  Object.keys(s.arrowStyles).length &&
                  qe(s.arrowElement, s.arrowStyles),
                s
              );
            },
            onLoad: function (s, f, d, m, k) {
              var C = nt(k, f, s, d.positionFixed),
                T = ye(
                  d.placement,
                  C,
                  f,
                  s,
                  d.modifiers.flip.boundariesElement,
                  d.modifiers.flip.padding
                );
              return (
                f.setAttribute("x-placement", T),
                qe(f, { position: d.positionFixed ? "fixed" : "absolute" }),
                d
              );
            },
            gpuAcceleration: void 0,
          },
        },
      }),
      Zt
    );
  });
