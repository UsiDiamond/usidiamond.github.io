"use strict";
(self.webpackChunkusidiamond = self.webpackChunkusidiamond || []).push([
  [179],
  {
    663: () => {
      function Q(e) {
        return "function" == typeof e;
      }
      function Zr(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Di = Zr(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Qr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class Ge {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (Q(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Di ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Ud(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Di ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Di(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Ud(t);
            else {
              if (t instanceof Ge) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Qr(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Qr(n, t), t instanceof Ge && t._removeParent(this);
        }
      }
      Ge.EMPTY = (() => {
        const e = new Ge();
        return (e.closed = !0), e;
      })();
      const Bd = Ge.EMPTY;
      function Hd(e) {
        return (
          e instanceof Ge ||
          (e && "closed" in e && Q(e.remove) && Q(e.add) && Q(e.unsubscribe))
        );
      }
      function Ud(e) {
        Q(e) ? e() : e.unsubscribe();
      }
      const Dn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        wi = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = wi;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = wi;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function zd(e) {
        wi.setTimeout(() => {
          const { onUnhandledError: t } = Dn;
          if (!t) throw e;
          t(e);
        });
      }
      function Ra() {}
      const cC = xa("C", void 0, void 0);
      function xa(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let wn = null;
      function Ci(e) {
        if (Dn.useDeprecatedSynchronousErrorHandling) {
          const t = !wn;
          if ((t && (wn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = wn;
            if (((wn = null), n)) throw r;
          }
        } else e();
      }
      class Oa extends Ge {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Hd(t) && t.add(this))
              : (this.destination = mC);
        }
        static create(t, n, r) {
          return new Yr(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Fa(
                (function dC(e) {
                  return xa("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Fa(
                (function lC(e) {
                  return xa("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Fa(cC, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const hC = Function.prototype.bind;
      function Pa(e, t) {
        return hC.call(e, t);
      }
      class pC {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Ei(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Ei(r);
            }
          else Ei(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Ei(n);
            }
        }
      }
      class Yr extends Oa {
        constructor(t, n, r) {
          let o;
          if ((super(), Q(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Dn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && Pa(t.next, i),
                  error: t.error && Pa(t.error, i),
                  complete: t.complete && Pa(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new pC(o);
        }
      }
      function Ei(e) {
        Dn.useDeprecatedSynchronousErrorHandling
          ? (function fC(e) {
              Dn.useDeprecatedSynchronousErrorHandling &&
                wn &&
                ((wn.errorThrown = !0), (wn.error = e));
            })(e)
          : zd(e);
      }
      function Fa(e, t) {
        const { onStoppedNotification: n } = Dn;
        n && wi.setTimeout(() => n(e, t));
      }
      const mC = {
          closed: !0,
          next: Ra,
          error: function gC(e) {
            throw e;
          },
          complete: Ra,
        },
        ka =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Jt(e) {
        return e;
      }
      function Gd(e) {
        return 0 === e.length
          ? Jt
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let de = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function DC(e) {
              return (
                (e && e instanceof Oa) ||
                ((function yC(e) {
                  return e && Q(e.next) && Q(e.error) && Q(e.complete);
                })(e) &&
                  Hd(e))
              );
            })(n)
              ? n
              : new Yr(n, r, o);
            return (
              Ci(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = qd(r))((o, i) => {
              const s = new Yr({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [ka]() {
            return this;
          }
          pipe(...n) {
            return Gd(n)(this);
          }
          toPromise(n) {
            return new (n = qd(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function qd(e) {
        var t;
        return null !== (t = e ?? Dn.Promise) && void 0 !== t ? t : Promise;
      }
      const wC = Zr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let ct = (() => {
        class e extends de {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Wd(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new wC();
          }
          next(n) {
            Ci(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Ci(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Ci(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? Bd
              : ((this.currentObservers = null),
                i.push(n),
                new Ge(() => {
                  (this.currentObservers = null), Qr(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new de();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Wd(t, n)), e;
      })();
      class Wd extends ct {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Bd;
        }
      }
      function Zd(e) {
        return Q(e?.lift);
      }
      function fe(e) {
        return (t) => {
          if (Zd(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function he(e, t, n, r, o) {
        return new CC(e, t, n, r, o);
      }
      class CC extends Oa {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function K(e, t) {
        return fe((n, r) => {
          let o = 0;
          n.subscribe(
            he(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function en(e) {
        return this instanceof en ? ((this.v = e), this) : new en(e);
      }
      function Xd(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Va(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (c) {
                    i({ value: c, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Jd = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function ef(e) {
        return Q(e?.then);
      }
      function tf(e) {
        return Q(e[ka]);
      }
      function nf(e) {
        return Symbol.asyncIterator && Q(e?.[Symbol.asyncIterator]);
      }
      function rf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const sf = (function UC() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function af(e) {
        return Q(e?.[sf]);
      }
      function uf(e) {
        return (function Kd(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof en
                  ? Promise.resolve(f.value.v).then(c, l)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function c(f) {
            a("next", f);
          }
          function l(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield en(n.read());
              if (o) return yield en(void 0);
              yield yield en(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function cf(e) {
        return Q(e?.getReader);
      }
      function lt(e) {
        if (e instanceof de) return e;
        if (null != e) {
          if (tf(e))
            return (function zC(e) {
              return new de((t) => {
                const n = e[ka]();
                if (Q(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Jd(e))
            return (function GC(e) {
              return new de((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (ef(e))
            return (function qC(e) {
              return new de((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, zd);
              });
            })(e);
          if (nf(e)) return lf(e);
          if (af(e))
            return (function WC(e) {
              return new de((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (cf(e))
            return (function ZC(e) {
              return lf(uf(e));
            })(e);
        }
        throw rf(e);
      }
      function lf(e) {
        return new de((t) => {
          (function QC(e, t) {
            var n, r, o, i;
            return (function Qd(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(l) {
                  try {
                    c(r.next(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(l) {
                  try {
                    c(r.throw(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(l) {
                  l.done
                    ? i(l.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(l.value).then(a, u);
                }
                c((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Xd(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Ft(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function ve(e, t, n = 1 / 0) {
        return Q(t)
          ? ve((r, o) => K((i, s) => t(r, i, o, s))(lt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            fe((r, o) =>
              (function YC(e, t, n, r, o, i, s, a) {
                const u = [];
                let c = 0,
                  l = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !c && t.complete();
                  },
                  h = (g) => (c < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), c++;
                    let y = !1;
                    lt(n(g, l++)).subscribe(
                      he(
                        t,
                        (D) => {
                          o?.(D), i ? h(D) : t.next(D);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (c--; u.length && c < r; ) {
                                const D = u.shift();
                                s ? Ft(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    he(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function $n(e = 1 / 0) {
        return ve(Jt, e);
      }
      const Ct = new de((e) => e.complete());
      function Ba(e) {
        return e[e.length - 1];
      }
      function Kr(e) {
        return (function XC(e) {
          return e && Q(e.schedule);
        })(Ba(e))
          ? e.pop()
          : void 0;
      }
      function df(e, t = 0) {
        return fe((n, r) => {
          n.subscribe(
            he(
              r,
              (o) => Ft(r, e, () => r.next(o), t),
              () => Ft(r, e, () => r.complete(), t),
              (o) => Ft(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function ff(e, t = 0) {
        return fe((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function hf(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new de((n) => {
          Ft(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Ft(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ye(e, t) {
        return t
          ? (function sE(e, t) {
              if (null != e) {
                if (tf(e))
                  return (function tE(e, t) {
                    return lt(e).pipe(ff(t), df(t));
                  })(e, t);
                if (Jd(e))
                  return (function rE(e, t) {
                    return new de((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (ef(e))
                  return (function nE(e, t) {
                    return lt(e).pipe(ff(t), df(t));
                  })(e, t);
                if (nf(e)) return hf(e, t);
                if (af(e))
                  return (function oE(e, t) {
                    return new de((n) => {
                      let r;
                      return (
                        Ft(n, t, () => {
                          (r = e[sf]()),
                            Ft(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => Q(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (cf(e))
                  return (function iE(e, t) {
                    return hf(uf(e), t);
                  })(e, t);
              }
              throw rf(e);
            })(e, t)
          : lt(e);
      }
      class Xe extends ct {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function x(...e) {
        return ye(e, Kr(e));
      }
      function pf(e = {}) {
        const {
          connector: t = () => new ct(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let s,
            a,
            u,
            c = 0,
            l = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = u = void 0), (l = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return fe((g, y) => {
            c++, !d && !l && f();
            const D = (u = u ?? t());
            y.add(() => {
              c--, 0 === c && !d && !l && (a = Ha(p, o));
            }),
              D.subscribe(y),
              !s &&
                c > 0 &&
                ((s = new Yr({
                  next: (m) => D.next(m),
                  error: (m) => {
                    (d = !0), f(), (a = Ha(h, n, m)), D.error(m);
                  },
                  complete: () => {
                    (l = !0), f(), (a = Ha(h, r)), D.complete();
                  },
                })),
                lt(g).subscribe(s));
          })(i);
        };
      }
      function Ha(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new Yr({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function Et(e, t) {
        return fe((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            he(
              r,
              (u) => {
                o?.unsubscribe();
                let c = 0;
                const l = i++;
                lt(e(u, l)).subscribe(
                  (o = he(
                    r,
                    (d) => r.next(t ? t(u, d, l, c++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function cE(e, t) {
        return e === t;
      }
      function W(e) {
        for (let t in e) if (e[t] === W) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function pe(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(pe).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Ua(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const lE = W({ __forward_ref__: W });
      function za(e) {
        return (
          (e.__forward_ref__ = za),
          (e.toString = function () {
            return pe(this());
          }),
          e
        );
      }
      function R(e) {
        return Ga(e) ? e() : e;
      }
      function Ga(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(lE) &&
          e.__forward_ref__ === za
        );
      }
      function qa(e) {
        return e && !!e.ɵproviders;
      }
      class w extends Error {
        constructor(t, n) {
          super(
            (function Ii(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function q(e) {
        return "function" == typeof e
          ? e.name || e.toString()
          : "object" == typeof e && null != e && "function" == typeof e.type
          ? e.type.name || e.type.toString()
          : (function O(e) {
              return "string" == typeof e ? e : null == e ? "" : String(e);
            })(e);
      }
      function Wa(e, t) {
        throw new w(-201, !1);
      }
      function Je(e, t) {
        null == e &&
          (function T(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function S(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function tn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function bi(e) {
        return mf(e, Mi) || mf(e, vf);
      }
      function mf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Si(e) {
        return e && (e.hasOwnProperty(Za) || e.hasOwnProperty(yE))
          ? e[Za]
          : null;
      }
      const Mi = W({ ɵprov: W }),
        Za = W({ ɵinj: W }),
        vf = W({ ngInjectableDef: W }),
        yE = W({ ngInjectorDef: W });
      var j = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })(j || {});
      let Qa;
      function Le(e) {
        const t = Qa;
        return (Qa = e), t;
      }
      function Df(e, t, n) {
        const r = bi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & j.Optional
          ? null
          : void 0 !== t
          ? t
          : void Wa(pe(e));
      }
      const X = globalThis;
      class _ {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = S({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Xr = {},
        eu = "__NG_DI_FLAG__",
        Ti = "ngTempTokenPath",
        CE = /\n/gm,
        Cf = "__source";
      let Vn;
      function nn(e) {
        const t = Vn;
        return (Vn = e), t;
      }
      function IE(e, t = j.Default) {
        if (void 0 === Vn) throw new w(-203, !1);
        return null === Vn
          ? Df(e, void 0, t)
          : Vn.get(e, t & j.Optional ? null : void 0, t);
      }
      function b(e, t = j.Default) {
        return (
          (function yf() {
            return Qa;
          })() || IE
        )(R(e), t);
      }
      function E(e, t = j.Default) {
        return b(e, Ai(t));
      }
      function Ai(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function tu(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = R(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new w(900, !1);
            let o,
              i = j.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = bE(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(b(o, i));
          } else t.push(b(r));
        }
        return t;
      }
      function Jr(e, t) {
        return (e[eu] = t), (e.prototype[eu] = t), e;
      }
      function bE(e) {
        return e[eu];
      }
      function kt(e) {
        return { toString: e }.toString();
      }
      var Ni = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })(Ni || {}),
        dt = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })(dt || {});
      const _t = {},
        U = [],
        Ri = W({ ɵcmp: W }),
        nu = W({ ɵdir: W }),
        ru = W({ ɵpipe: W }),
        _f = W({ ɵmod: W }),
        Lt = W({ ɵfac: W }),
        eo = W({ __NG_ELEMENT_ID__: W }),
        If = W({ __NG_ENV_ID__: W });
      function bf(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      function ou(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            Mf(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function Sf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Mf(e) {
        return 64 === e.charCodeAt(0);
      }
      function to(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Tf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Tf(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      const Af = "ng-template";
      function TE(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== bf(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Nf(e) {
        return 4 === e.type && e.value !== Af;
      }
      function AE(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Af);
      }
      function NE(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function OE(e) {
            for (let t = 0; t < e.length; t++) if (Sf(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !AE(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (ft(r)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!TE(e.attrs, c, n)) {
                    if (ft(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = RE(8 & r ? "class" : u, o, Nf(e), n);
                if (-1 === d) {
                  if (ft(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== bf(h, c, 0)) || (2 & r && c !== f)) {
                    if (ft(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !ft(r) && !ft(u)) return !1;
            if (s && ft(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return ft(r) || s;
      }
      function ft(e) {
        return 0 == (1 & e);
      }
      function RE(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function PE(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Rf(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (NE(e, t[r], n)) return !0;
        return !1;
      }
      function xf(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function kE(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !ft(s) && ((t += xf(i, o)), (o = "")),
              (r = s),
              (i = i || !ft(r));
          n++;
        }
        return "" !== o && (t += xf(i, o)), t;
      }
      function no(e) {
        return kt(() => {
          const t = Pf(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Ni.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || dt.Emulated,
              styles: e.styles || U,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          Ff(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = xi(r, !1)),
            (n.pipeDefs = xi(r, !0)),
            (n.id = (function zE(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(n)),
            n
          );
        });
      }
      function VE(e) {
        return B(e) || De(e);
      }
      function BE(e) {
        return null !== e;
      }
      function En(e) {
        return kt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || U,
          declarations: e.declarations || U,
          imports: e.imports || U,
          exports: e.exports || U,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Of(e, t) {
        if (null == e) return _t;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function Me(e) {
        return kt(() => {
          const t = Pf(e);
          return Ff(t), t;
        });
      }
      function B(e) {
        return e[Ri] || null;
      }
      function De(e) {
        return e[nu] || null;
      }
      function Te(e) {
        return e[ru] || null;
      }
      function We(e, t) {
        const n = e[_f] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${pe(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function Pf(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || _t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || U,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Of(e.inputs, t),
          outputs: Of(e.outputs),
        };
      }
      function Ff(e) {
        e.features?.forEach((t) => t(e));
      }
      function xi(e, t) {
        if (!e) return null;
        const n = t ? Te : VE;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(BE);
      }
      const ie = 0,
        C = 1,
        k = 2,
        re = 3,
        ht = 4,
        ro = 5,
        _e = 6,
        Hn = 7,
        ae = 8,
        rn = 9,
        Un = 10,
        P = 11,
        oo = 12,
        kf = 13,
        zn = 14,
        ue = 15,
        io = 16,
        Gn = 17,
        It = 18,
        so = 19,
        Lf = 20,
        on = 21,
        jt = 22,
        ao = 23,
        uo = 24,
        $ = 25,
        iu = 1,
        jf = 2,
        bt = 7,
        qn = 9,
        we = 11;
      function $e(e) {
        return Array.isArray(e) && "object" == typeof e[iu];
      }
      function Ae(e) {
        return Array.isArray(e) && !0 === e[iu];
      }
      function su(e) {
        return 0 != (4 & e.flags);
      }
      function _n(e) {
        return e.componentOffset > -1;
      }
      function pt(e) {
        return !!e.template;
      }
      function au(e) {
        return 0 != (512 & e[k]);
      }
      function In(e, t) {
        return e.hasOwnProperty(Lt) ? e[Lt] : null;
      }
      let Ce = null,
        Fi = !1;
      function et(e) {
        const t = Ce;
        return (Ce = e), t;
      }
      const Bf = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      };
      function Uf(e) {
        if (!lo(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !qf(e)) return void (e.dirty = !1);
          e.producerRecomputeValue(e), (e.dirty = !1);
        }
      }
      function Gf(e) {
        (e.dirty = !0),
          (function zf(e) {
            if (void 0 === e.liveConsumerNode) return;
            const t = Fi;
            Fi = !0;
            try {
              for (const n of e.liveConsumerNode) n.dirty || Gf(n);
            } finally {
              Fi = t;
            }
          })(e),
          e.consumerMarkedDirty?.(e);
      }
      function cu(e) {
        return e && (e.nextProducerIndex = 0), et(e);
      }
      function lu(e, t) {
        if (
          (et(t),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (lo(e))
            for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
              ki(e.producerNode[n], e.producerIndexOfThis[n]);
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(),
              e.producerLastReadVersion.pop(),
              e.producerIndexOfThis.pop();
        }
      }
      function qf(e) {
        Wn(e);
        for (let t = 0; t < e.producerNode.length; t++) {
          const n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
          if (r !== n.version || (Uf(n), r !== n.version)) return !0;
        }
        return !1;
      }
      function Wf(e) {
        if ((Wn(e), lo(e)))
          for (let t = 0; t < e.producerNode.length; t++)
            ki(e.producerNode[t], e.producerIndexOfThis[t]);
        (e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode &&
            (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
      }
      function ki(e, t) {
        if (
          ((function Qf(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          Wn(e),
          1 === e.liveConsumerNode.length)
        )
          for (let r = 0; r < e.producerNode.length; r++)
            ki(e.producerNode[r], e.producerIndexOfThis[r]);
        const n = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
          (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          t < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[t],
            o = e.liveConsumerNode[t];
          Wn(o), (o.producerIndexOfThis[r] = t);
        }
      }
      function lo(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function Wn(e) {
        (e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= []);
      }
      let Yf = null;
      const eh = () => {},
        r_ = (() => ({
          ...Bf,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: (e) => {
            e.schedule(e.ref);
          },
          hasRun: !1,
          cleanupFn: eh,
        }))();
      class o_ {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function bn() {
        return th;
      }
      function th(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = s_), i_;
      }
      function i_() {
        const e = rh(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === _t) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function s_(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            rh(e) ||
            (function a_(e, t) {
              return (e[nh] = t);
            })(e, { previous: _t, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new o_(u && u.currentValue, t, a === _t)), (e[r] = t);
      }
      bn.ngInherit = !0;
      const nh = "__ngSimpleChanges__";
      function rh(e) {
        return e[nh] || null;
      }
      const St = function (e, t, n) {};
      function J(e) {
        for (; Array.isArray(e); ) e = e[ie];
        return e;
      }
      function Ve(e, t) {
        return J(t[e.index]);
      }
      function Ze(e, t) {
        const n = t[e];
        return $e(n) ? n : n[ie];
      }
      function an(e, t) {
        return null == t ? null : e[t];
      }
      function ah(e) {
        e[Gn] = 0;
      }
      function h_(e) {
        1024 & e[k] || ((e[k] |= 1024), ch(e, 1));
      }
      function uh(e) {
        1024 & e[k] && ((e[k] &= -1025), ch(e, -1));
      }
      function ch(e, t) {
        let n = e[re];
        if (null === n) return;
        n[ro] += t;
        let r = n;
        for (
          n = n[re];
          null !== n && ((1 === t && 1 === r[ro]) || (-1 === t && 0 === r[ro]));

        )
          (n[ro] += t), (r = n), (n = n[re]);
      }
      const A = {
        lFrame: wh(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function fh() {
        return A.bindingsEnabled;
      }
      function v() {
        return A.lFrame.lView;
      }
      function H() {
        return A.lFrame.tView;
      }
      function Ee() {
        let e = hh();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function hh() {
        return A.lFrame.currentTNode;
      }
      function Mt(e, t) {
        const n = A.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function gu() {
        return A.lFrame.isParent;
      }
      function M_(e, t) {
        const n = A.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), vu(t);
      }
      function vu(e) {
        A.lFrame.currentDirectiveIndex = e;
      }
      function Du(e) {
        A.lFrame.currentQueryIndex = e;
      }
      function A_(e) {
        const t = e[C];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[_e] : null;
      }
      function yh(e, t, n) {
        if (n & j.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & j.Host ||
              ((o = A_(i)), null === o || ((i = i[zn]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (A.lFrame = Dh());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function wu(e) {
        const t = Dh(),
          n = e[C];
        (A.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Dh() {
        const e = A.lFrame,
          t = null === e ? null : e.child;
        return null === t ? wh(e) : t;
      }
      function wh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Ch() {
        const e = A.lFrame;
        return (
          (A.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Eh = Ch;
      function Cu() {
        const e = Ch();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Sn(e) {
        A.lFrame.selectedIndex = e;
      }
      let Ih = !0;
      function ji() {
        return Ih;
      }
      function un(e) {
        Ih = e;
      }
      function $i(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: c,
              ngOnDestroy: l,
            } = i;
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            u && (e.viewHooks ??= []).push(-n, u),
            c &&
              ((e.viewHooks ??= []).push(n, c),
              (e.viewCheckHooks ??= []).push(n, c)),
            null != l && (e.destroyHooks ??= []).push(n, l);
        }
      }
      function Vi(e, t, n) {
        bh(e, t, 3, n);
      }
      function Bi(e, t, n, r) {
        (3 & e[k]) === n && bh(e, t, n, r);
      }
      function Eu(e, t) {
        let n = e[k];
        (3 & n) === t && ((n &= 8191), (n += 1), (e[k] = n));
      }
      function bh(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[Gn] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[Gn] += 65536),
              (a < i || -1 == i) &&
                (L_(e, n, t, u), (e[Gn] = (4294901760 & e[Gn]) + u + 2)),
              u++;
      }
      function Sh(e, t) {
        St(4, e, t);
        const n = et(null);
        try {
          t.call(e);
        } finally {
          et(n), St(5, e, t);
        }
      }
      function L_(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        o
          ? e[k] >> 13 < e[Gn] >> 16 &&
            (3 & e[k]) === t &&
            ((e[k] += 8192), Sh(a, i))
          : Sh(a, i);
      }
      const Kn = -1;
      class ho {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Iu(e) {
        return e !== Kn;
      }
      function po(e) {
        return 32767 & e;
      }
      function go(e, t) {
        let n = (function B_(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[zn]), n--;
        return r;
      }
      let bu = !0;
      function Hi(e) {
        const t = bu;
        return (bu = e), t;
      }
      const Mh = 255,
        Th = 5;
      let H_ = 0;
      const Tt = {};
      function Ui(e, t) {
        const n = Ah(e, t);
        if (-1 !== n) return n;
        const r = t[C];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Su(r.data, e),
          Su(t, null),
          Su(r.blueprint, null));
        const o = zi(e, t),
          i = e.injectorIndex;
        if (Iu(o)) {
          const s = po(o),
            a = go(o, t),
            u = a[C].data;
          for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c];
        }
        return (t[i + 8] = o), i;
      }
      function Su(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Ah(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function zi(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = Lh(o)), null === r)) return Kn;
          if ((n++, (o = o[zn]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Kn;
      }
      function Mu(e, t, n) {
        !(function U_(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(eo) && (r = n[eo]),
            null == r && (r = n[eo] = H_++);
          const o = r & Mh;
          t.data[e + (o >> Th)] |= 1 << o;
        })(e, t, n);
      }
      function Nh(e, t, n) {
        if (n & j.Optional || void 0 !== e) return e;
        Wa();
      }
      function Rh(e, t, n, r) {
        if (
          (n & j.Optional && void 0 === r && (r = null),
          !(n & (j.Self | j.Host)))
        ) {
          const o = e[rn],
            i = Le(void 0);
          try {
            return o ? o.get(t, r, n & j.Optional) : Df(t, r, n & j.Optional);
          } finally {
            Le(i);
          }
        }
        return Nh(r, 0, n);
      }
      function xh(e, t, n, r = j.Default, o) {
        if (null !== e) {
          if (2048 & t[k] && !(r & j.Self)) {
            const s = (function Q_(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 2048 & s[k] && !(512 & s[k]);

              ) {
                const a = Oh(i, s, n, r | j.Self, Tt);
                if (a !== Tt) return a;
                let u = i.parent;
                if (!u) {
                  const c = s[Lf];
                  if (c) {
                    const l = c.get(n, Tt, r);
                    if (l !== Tt) return l;
                  }
                  (u = Lh(s)), (s = s[zn]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Tt);
            if (s !== Tt) return s;
          }
          const i = Oh(e, t, n, r, Tt);
          if (i !== Tt) return i;
        }
        return Rh(t, n, r, o);
      }
      function Oh(e, t, n, r, o) {
        const i = (function q_(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(eo) ? e[eo] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & Mh : Z_) : t;
        })(n);
        if ("function" == typeof i) {
          if (!yh(t, e, r)) return r & j.Host ? Nh(o, 0, r) : Rh(t, n, r, o);
          try {
            let s;
            if (((s = i(r)), null != s || r & j.Optional)) return s;
            Wa();
          } finally {
            Eh();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Ah(e, t),
            u = Kn,
            c = r & j.Host ? t[ue][_e] : null;
          for (
            (-1 === a || r & j.SkipSelf) &&
            ((u = -1 === a ? zi(e, t) : t[a + 8]),
            u !== Kn && Fh(r, !1)
              ? ((s = t[C]), (a = po(u)), (t = go(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const l = t[C];
            if (Ph(i, a, l.data)) {
              const d = G_(a, t, n, s, r, c);
              if (d !== Tt) return d;
            }
            (u = t[a + 8]),
              u !== Kn && Fh(r, t[C].data[a + 8] === c) && Ph(i, a, t)
                ? ((s = l), (a = po(u)), (t = go(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function G_(e, t, n, r, o, i) {
        const s = t[C],
          a = s.data[e + 8],
          l = (function Gi(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              l = i >> 20,
              f = o ? a + l : e.directiveEnd;
            for (let h = r ? a : a + l; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && pt(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? _n(a) && bu : r != s && 0 != (3 & a.type),
            o & j.Host && i === a
          );
        return null !== l ? Mn(t, s, l, a) : Tt;
      }
      function Mn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function j_(e) {
            return e instanceof ho;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function dE(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new w(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(q(i[n]));
          const a = Hi(s.canSeeViewProviders);
          s.resolving = !0;
          const c = s.injectImpl ? Le(s.injectImpl) : null;
          yh(e, r, j.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function k_(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = th(t);
                    (n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== c && Le(c), Hi(a), (s.resolving = !1), Eh();
          }
        }
        return o;
      }
      function Ph(e, t, n) {
        return !!(n[t + (e >> Th)] & (1 << e));
      }
      function Fh(e, t) {
        return !(e & j.Self || (e & j.Host && t));
      }
      class xe {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return xh(this._tNode, this._lView, t, Ai(r), n);
        }
      }
      function Z_() {
        return new xe(Ee(), v());
      }
      function Tu(e) {
        return Ga(e)
          ? () => {
              const t = Tu(R(e));
              return t && t();
            }
          : In(e);
      }
      function Lh(e) {
        const t = e[C],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[_e] : null;
      }
      const Jn = "__parameters__";
      function tr(e, t, n) {
        return kt(() => {
          const r = (function Au(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, c, l) {
              const d = u.hasOwnProperty(Jn)
                ? u[Jn]
                : Object.defineProperty(u, Jn, { value: [] })[Jn];
              for (; d.length <= l; ) d.push(null);
              return (d[l] = d[l] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      function rr(e, t) {
        e.forEach((n) => (Array.isArray(n) ? rr(n, t) : t(n)));
      }
      function $h(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Wi(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const Qi = Jr(tr("Optional"), 8),
        Yi = Jr(tr("SkipSelf"), 4);
      function ts(e) {
        return 128 == (128 & e.flags);
      }
      var cn = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })(cn || {});
      const Fu = new Map();
      let SI = 0;
      const Lu = "__ngContext__";
      function Ie(e, t) {
        $e(t)
          ? ((e[Lu] = t[so]),
            (function TI(e) {
              Fu.set(e[so], e);
            })(t))
          : (e[Lu] = t);
      }
      let ju;
      function $u(e, t) {
        return ju(e, t);
      }
      function Co(e) {
        const t = e[re];
        return Ae(t) ? t[re] : t;
      }
      function sp(e) {
        return up(e[oo]);
      }
      function ap(e) {
        return up(e[ht]);
      }
      function up(e) {
        for (; null !== e && !Ae(e); ) e = e[ht];
        return e;
      }
      function ar(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Ae(r) ? (i = r) : $e(r) && ((s = !0), (r = r[ie]));
          const a = J(r);
          0 === e && null !== n
            ? null == o
              ? fp(t, n, a)
              : Tn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Tn(t, n, a, o || null, !0)
            : 2 === e
            ? (function us(e, t, n) {
                const r = ss(e, t);
                r &&
                  (function WI(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function YI(e, t, n, r, o) {
                const i = n[bt];
                i !== J(n) && ar(t, e, r, i, o);
                for (let a = we; a < n.length; a++) {
                  const u = n[a];
                  _o(u[C], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function os(e, t, n) {
        return e.createElement(t, n);
      }
      function lp(e, t) {
        const n = e[qn],
          r = n.indexOf(t);
        uh(t), n.splice(r, 1);
      }
      function is(e, t) {
        if (e.length <= we) return;
        const n = we + t,
          r = e[n];
        if (r) {
          const o = r[io];
          null !== o && o !== e && lp(o, r), t > 0 && (e[n - 1][ht] = r[ht]);
          const i = Wi(e, we + t);
          !(function $I(e, t) {
            _o(e, t, t[P], 2, null, null), (t[ie] = null), (t[_e] = null);
          })(r[C], r);
          const s = i[It];
          null !== s && s.detachView(i[C]),
            (r[re] = null),
            (r[ht] = null),
            (r[k] &= -129);
        }
        return r;
      }
      function Bu(e, t) {
        if (!(256 & t[k])) {
          const n = t[P];
          t[ao] && Wf(t[ao]),
            t[uo] && Wf(t[uo]),
            n.destroyNode && _o(e, t, n, 3, null, null),
            (function HI(e) {
              let t = e[oo];
              if (!t) return Hu(e[C], e);
              for (; t; ) {
                let n = null;
                if ($e(t)) n = t[oo];
                else {
                  const r = t[we];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[ht] && t !== e; )
                    $e(t) && Hu(t[C], t), (t = t[re]);
                  null === t && (t = e), $e(t) && Hu(t[C], t), (n = t && t[ht]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Hu(e, t) {
        if (!(256 & t[k])) {
          (t[k] &= -129),
            (t[k] |= 256),
            (function qI(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof ho)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        St(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          St(5, a, u);
                        }
                      }
                    else {
                      St(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        St(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function GI(e, t) {
              const n = e.cleanup,
                r = t[Hn];
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
                  } else n[i].call(r[n[i + 1]]);
              null !== r && (t[Hn] = null);
              const o = t[on];
              if (null !== o) {
                t[on] = null;
                for (let i = 0; i < o.length; i++) (0, o[i])();
              }
            })(e, t),
            1 === t[C].type && t[P].destroy();
          const n = t[io];
          if (null !== n && Ae(t[re])) {
            n !== t[re] && lp(n, t);
            const r = t[It];
            null !== r && r.detachView(e);
          }
          !(function AI(e) {
            Fu.delete(e[so]);
          })(t);
        }
      }
      function Uu(e, t, n) {
        return (function dp(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[ie];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === dt.None || i === dt.Emulated) return null;
            }
            return Ve(r, n);
          }
        })(e, t.parent, n);
      }
      function Tn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function fp(e, t, n) {
        e.appendChild(t, n);
      }
      function hp(e, t, n, r, o) {
        null !== r ? Tn(e, t, n, r, o) : fp(e, t, n);
      }
      function ss(e, t) {
        return e.parentNode(t);
      }
      let zu,
        Zu,
        mp = function gp(e, t, n) {
          return 40 & e.type ? Ve(e, n) : null;
        };
      function as(e, t, n, r) {
        const o = Uu(e, r, t),
          i = t[P],
          a = (function pp(e, t, n) {
            return mp(e, t, n);
          })(r.parent || t[_e], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) hp(i, o, n[u], a, !1);
          else hp(i, o, n, a, !1);
        void 0 !== zu && zu(i, r, t, n, o);
      }
      function Eo(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Ve(t, e);
          if (4 & n) return Gu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Eo(e, r);
            {
              const o = e[t.index];
              return Ae(o) ? Gu(-1, o) : J(o);
            }
          }
          if (32 & n) return $u(t, e)() || J(e[t.index]);
          {
            const r = yp(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Eo(Co(e[ue]), r)
              : Eo(e, t.next);
          }
        }
        return null;
      }
      function yp(e, t) {
        return null !== t ? e[ue][_e].projection[t.projection] : null;
      }
      function Gu(e, t) {
        const n = we + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[C].firstChild;
          if (null !== o) return Eo(r, o);
        }
        return t[bt];
      }
      function qu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Ie(J(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) qu(e, t, n.child, r, o, i, !1), ar(t, e, o, a, i);
            else if (32 & u) {
              const c = $u(n, r);
              let l;
              for (; (l = c()); ) ar(t, e, o, l, i);
              ar(t, e, o, a, i);
            } else 16 & u ? wp(e, t, r, n, o, i) : ar(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function _o(e, t, n, r, o, i) {
        qu(n, r, e.firstChild, t, o, i, !1);
      }
      function wp(e, t, n, r, o, i) {
        const s = n[ue],
          u = s[_e].projection[r.projection];
        if (Array.isArray(u))
          for (let c = 0; c < u.length; c++) ar(t, e, o, u[c], i);
        else {
          let c = u;
          const l = s[re];
          ts(r) && (c.flags |= 128), qu(e, t, c, l, o, i, !0);
        }
      }
      function Cp(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Ep(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && ou(e, t, r),
          null !== o && Cp(e, t, o),
          null !== i &&
            (function XI(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      const Mo = new _("ENVIRONMENT_INITIALIZER"),
        kp = new _("INJECTOR", -1),
        Lp = new _("INJECTOR_DEF_TYPES");
      class ec {
        get(t, n = Xr) {
          if (n === Xr) {
            const r = new Error(`NullInjectorError: No provider for ${pe(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function bb(...e) {
        return { ɵproviders: $p(0, e), ɵfromNgModule: !0 };
      }
      function $p(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        const i = (s) => {
          n.push(s);
        };
        return (
          rr(t, (s) => {
            const a = s;
            fs(a, i, [], r) && ((o ||= []), o.push(a));
          }),
          void 0 !== o && Vp(o, i),
          n
        );
      }
      function Vp(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { ngModule: r, providers: o } = e[n];
          tc(o, (i) => {
            t(i, r);
          });
        }
      }
      function fs(e, t, n, r) {
        if (!(e = R(e))) return !1;
        let o = null,
          i = Si(e);
        const s = !i && B(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = Si(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of u) fs(c, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let c;
              r.add(o);
              try {
                rr(i.imports, (l) => {
                  fs(l, t, n, r) && ((c ||= []), c.push(l));
                });
              } finally {
              }
              void 0 !== c && Vp(c, t);
            }
            if (!a) {
              const c = In(o) || (() => new o());
              t({ provide: o, useFactory: c, deps: U }, o),
                t({ provide: Lp, useValue: o, multi: !0 }, o),
                t({ provide: Mo, useValue: () => b(o), multi: !0 }, o);
            }
            const u = i.providers;
            if (null != u && !a) {
              const c = e;
              tc(u, (l) => {
                t(l, c);
              });
            }
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function tc(e, t) {
        for (let n of e)
          qa(n) && (n = n.ɵproviders), Array.isArray(n) ? tc(n, t) : t(n);
      }
      const Sb = W({ provide: String, useValue: W });
      function nc(e) {
        return null !== e && "object" == typeof e && Sb in e;
      }
      function An(e) {
        return "function" == typeof e;
      }
      const rc = new _("Set Injector scope."),
        hs = {},
        Tb = {};
      let oc;
      function ps() {
        return void 0 === oc && (oc = new ec()), oc;
      }
      class nt {}
      class dr extends nt {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            sc(t, (s) => this.processProvider(s)),
            this.records.set(kp, fr(void 0, this)),
            o.has("environment") && this.records.set(nt, fr(void 0, this));
          const i = this.records.get(rc);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Lp.multi, U, j.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = nn(this),
            r = Le(void 0);
          try {
            return t();
          } finally {
            nn(n), Le(r);
          }
        }
        get(t, n = Xr, r = j.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(If)))
            return t[If](this);
          r = Ai(r);
          const i = nn(this),
            s = Le(void 0);
          try {
            if (!(r & j.SkipSelf)) {
              let u = this.records.get(t);
              if (void 0 === u) {
                const c =
                  (function Ob(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof _)
                    );
                  })(t) && bi(t);
                (u = c && this.injectableDefInScope(c) ? fr(ic(t), hs) : null),
                  this.records.set(t, u);
              }
              if (null != u) return this.hydrate(t, u);
            }
            return (r & j.Self ? ps() : this.parent).get(
              t,
              (n = r & j.Optional && n === Xr ? null : n)
            );
          } catch (a) {
            if ("NullInjectorError" === a.name) {
              if (((a[Ti] = a[Ti] || []).unshift(pe(t)), i)) throw a;
              return (function SE(e, t, n, r) {
                const o = e[Ti];
                throw (
                  (t[Cf] && o.unshift(t[Cf]),
                  (e.message = (function ME(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = pe(t);
                    if (Array.isArray(t)) o = t.map(pe).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : pe(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      CE,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Ti] = null),
                  e)
                );
              })(a, t, "R3InjectorError", this.source);
            }
            throw a;
          } finally {
            Le(s), nn(i);
          }
        }
        resolveInjectorInitializers() {
          const t = nn(this),
            n = Le(void 0);
          try {
            const o = this.get(Mo.multi, U, j.Self);
            for (const i of o) i();
          } finally {
            nn(t), Le(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(pe(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new w(205, !1);
        }
        processProvider(t) {
          let n = An((t = R(t))) ? t : R(t && t.provide);
          const r = (function Nb(e) {
            return nc(e)
              ? fr(void 0, e.useValue)
              : fr(
                  (function Up(e, t, n) {
                    let r;
                    if (An(e)) {
                      const o = R(e);
                      return In(o) || ic(o);
                    }
                    if (nc(e)) r = () => R(e.useValue);
                    else if (
                      (function Hp(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...tu(e.deps || []));
                    else if (
                      (function Bp(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => b(R(e.useExisting));
                    else {
                      const o = R(e && (e.useClass || e.provide));
                      if (
                        !(function Rb(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return In(o) || ic(o);
                      r = () => new o(...tu(e.deps));
                    }
                    return r;
                  })(e),
                  hs
                );
          })(t);
          if (An(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = fr(void 0, hs, !0)),
              (o.factory = () => tu(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === hs && ((n.value = Tb), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function xb(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = R(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function ic(e) {
        const t = bi(e),
          n = null !== t ? t.factory : In(e);
        if (null !== n) return n;
        if (e instanceof _) throw new w(204, !1);
        if (e instanceof Function)
          return (function Ab(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function yo(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new w(204, !1))
              );
            const n = (function vE(e) {
              return (e && (e[Mi] || e[vf])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new w(204, !1);
      }
      function fr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function sc(e, t) {
        for (const n of e)
          Array.isArray(n) ? sc(n, t) : n && qa(n) ? sc(n.ɵproviders, t) : t(n);
      }
      const gs = new _("AppId", { providedIn: "root", factory: () => Pb }),
        Pb = "ng",
        zp = new _("Platform Initializer"),
        hr = new _("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        Gp = new _("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function cr() {
              if (void 0 !== Zu) return Zu;
              if (typeof document < "u") return document;
              throw new w(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let qp = (e, t, n) => null;
      function pc(e, t, n = !1) {
        return qp(e, t, n);
      }
      class zb {}
      class Qp {}
      class qb {
        resolveComponentFactory(t) {
          throw (function Gb(e) {
            const t = Error(`No component factory found for ${pe(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Cs = (() => {
        class e {
          static #e = (this.NULL = new qb());
        }
        return e;
      })();
      function Wb() {
        return mr(Ee(), v());
      }
      function mr(e, t) {
        return new dn(Ve(e, t));
      }
      let dn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
          static #e = (this.__NG_ELEMENT_ID__ = Wb);
        }
        return e;
      })();
      class Kp {}
      let Yb = (() => {
        class e {
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: "root",
            factory: () => null,
          }));
        }
        return e;
      })();
      class _s {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Kb = new _s("16.2.12"),
        vc = {};
      function tg(e, t = null, n = null, r) {
        const o = ng(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function ng(e, t = null, n = null, r, o = new Set()) {
        const i = [n || U, bb(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : pe(e))),
          new dr(i, t || ps(), r || null, o)
        );
      }
      let rt = (() => {
        class e {
          static #e = (this.THROW_IF_NOT_FOUND = Xr);
          static #t = (this.NULL = new ec());
          static create(n, r) {
            if (Array.isArray(n)) return tg({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return tg({ name: o }, n.parent, n.providers, o);
            }
          }
          static #n = (this.ɵprov = S({
            token: e,
            providedIn: "any",
            factory: () => b(kp),
          }));
          static #r = (this.__NG_ELEMENT_ID__ = -1);
        }
        return e;
      })();
      function Dc(e) {
        return e.ngOriginalError;
      }
      class Ht {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Dc(t);
          for (; n && Dc(n); ) n = Dc(n);
          return n || null;
        }
      }
      function Cc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Oe = class oS extends ct {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = Cc(i)), o && (o = Cc(o)), s && (s = Cc(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof Ge && t.add(a), a;
        }
      };
      function og(...e) {}
      class ee {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Oe(!1)),
            (this.onMicrotaskEmpty = new Oe(!1)),
            (this.onStable = new Oe(!1)),
            (this.onError = new Oe(!1)),
            typeof Zone > "u")
          )
            throw new w(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function iS() {
              const e = "function" == typeof X.requestAnimationFrame;
              let t = X[e ? "requestAnimationFrame" : "setTimeout"],
                n = X[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && t && n) {
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
                const o = n[Zone.__symbol__("OriginalDelegate")];
                o && (n = o);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function uS(e) {
              const t = () => {
                !(function aS(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(X, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                _c(e),
                                (e.isCheckStableRunning = !0),
                                Ec(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    _c(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  if (
                    (function lS(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      );
                    })(a)
                  )
                    return n.invokeTask(o, i, s, a);
                  try {
                    return ig(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      sg(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return ig(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), sg(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          _c(e),
                          Ec(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ee.isInAngularZone()) throw new w(909, !1);
        }
        static assertNotInAngularZone() {
          if (ee.isInAngularZone()) throw new w(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, sS, og, og);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const sS = {};
      function Ec(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function _c(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function ig(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function sg(e) {
        e._nesting--, Ec(e);
      }
      class cS {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Oe()),
            (this.onMicrotaskEmpty = new Oe()),
            (this.onStable = new Oe()),
            (this.onError = new Oe());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const ag = new _("", { providedIn: "root", factory: ug });
      function ug() {
        const e = E(ee);
        let t = !0;
        return (function aE(...e) {
          const t = Kr(e),
            n = (function eE(e, t) {
              return "number" == typeof Ba(e) ? e.pop() : t;
            })(e, 1 / 0),
            r = e;
          return r.length ? (1 === r.length ? lt(r[0]) : $n(n)(ye(r, t))) : Ct;
        })(
          new de((o) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete();
              });
          }),
          new de((o) => {
            let i;
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                ee.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              ee.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              i.unsubscribe(), s.unsubscribe();
            };
          }).pipe(pf())
        );
      }
      function Ut(e) {
        return e instanceof Function ? e() : e;
      }
      let Ic = (() => {
        class e {
          constructor() {
            (this.renderDepth = 0), (this.handler = null);
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++;
          }
          end() {
            this.renderDepth--,
              0 === this.renderDepth && this.handler?.execute();
          }
          ngOnDestroy() {
            this.handler?.destroy(), (this.handler = null);
          }
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function No(e) {
        for (; e; ) {
          e[k] |= 64;
          const t = Co(e);
          if (au(e) && !t) return e;
          e = t;
        }
        return null;
      }
      const hg = new _("", { providedIn: "root", factory: () => !1 });
      let bs = null;
      function vg(e, t) {
        return e[t] ?? wg();
      }
      function yg(e, t) {
        const n = wg();
        n.producerNode?.length && ((e[t] = bs), (n.lView = e), (bs = Dg()));
      }
      const wS = {
        ...Bf,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: (e) => {
          No(e.lView);
        },
        lView: null,
      };
      function Dg() {
        return Object.create(wS);
      }
      function wg() {
        return (bs ??= Dg()), bs;
      }
      const F = {};
      function M(e, t = j.Default) {
        const n = v();
        return null === n ? b(e, t) : xh(Ee(), n, R(e), t);
      }
      function Ss(e, t, n, r, o, i, s, a, u, c, l) {
        const d = t.blueprint.slice();
        return (
          (d[ie] = o),
          (d[k] = 140 | r),
          (null !== c || (e && 2048 & e[k])) && (d[k] |= 2048),
          ah(d),
          (d[re] = d[zn] = e),
          (d[ae] = n),
          (d[Un] = s || (e && e[Un])),
          (d[P] = a || (e && e[P])),
          (d[rn] = u || (e && e[rn]) || null),
          (d[_e] = i),
          (d[so] = (function MI() {
            return SI++;
          })()),
          (d[jt] = l),
          (d[Lf] = c),
          (d[ue] = 2 == t.type ? e[ue] : d),
          d
        );
      }
      function Dr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function bc(e, t, n, r, o) {
            const i = hh(),
              s = gu(),
              u = (e.data[t] = (function AS(e, t, n, r, o, i) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  (function Qn() {
                    return null !== A.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function S_() {
              return A.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function fo() {
            const e = A.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Mt(i, !0), i;
      }
      function Ro(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function _g(e, t, n, r, o) {
        const i = vg(t, ao),
          s = (function Re() {
            return A.lFrame.selectedIndex;
          })(),
          a = 2 & r;
        try {
          Sn(-1),
            a &&
              t.length > $ &&
              (function Cg(e, t, n, r) {
                if (!r)
                  if (3 == (3 & t[k])) {
                    const i = e.preOrderCheckHooks;
                    null !== i && Vi(t, i, n);
                  } else {
                    const i = e.preOrderHooks;
                    null !== i && Bi(t, i, 0, n);
                  }
                Sn(n);
              })(e, t, $, !1),
            St(a ? 2 : 0, o);
          const c = a ? i : null,
            l = cu(c);
          try {
            null !== c && (c.dirty = !1), n(r, o);
          } finally {
            lu(c, l);
          }
        } finally {
          a && null === t[ao] && yg(t, ao), Sn(s), St(a ? 3 : 1, o);
        }
      }
      function Sc(e, t, n) {
        if (su(t)) {
          const r = et(null);
          try {
            const i = t.directiveEnd;
            for (let s = t.directiveStart; s < i; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            et(r);
          }
        }
      }
      function Ig(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Ac(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function Ac(e, t, n, r, o, i, s, a, u, c, l) {
        const d = $ + r,
          f = d + o,
          h = (function _S(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : F);
            return n;
          })(d, f),
          p = "function" == typeof c ? c() : c;
        return (h[C] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: l,
        });
      }
      let bg = (e) => null;
      function Sg(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? Mg(n, t, o, i)
              : r.hasOwnProperty(o) && Mg(n, t, r[o], i);
          }
        return n;
      }
      function Mg(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Tg(e, t, n, r, o, i) {
        for (let c = 0; c < r.length; c++) Mu(Ui(n, t), e, r[c].type);
        !(function BS(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          l.providersResolver && l.providersResolver(l);
        }
        let s = !1,
          a = !1,
          u = Ro(e, t, r.length, null);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          (n.mergedAttrs = to(n.mergedAttrs, l.hostAttrs)),
            HS(e, n, t, u, l),
            VS(u, l, o),
            null !== l.contentQueries && (n.flags |= 4),
            (null !== l.hostBindings ||
              null !== l.hostAttrs ||
              0 !== l.hostVars) &&
              (n.flags |= 64);
          const d = l.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++;
        }
        !(function NS(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            c = null;
          for (let l = t.directiveStart; l < o; l++) {
            const d = i[l],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = Sg(d.inputs, l, u, f ? f.inputs : null)),
              (c = Sg(d.outputs, l, c, p));
            const g = null === u || null === s || Nf(t) ? null : GS(u, l, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = c);
        })(e, n, i);
      }
      function Ag(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function T_() {
            return A.lFrame.currentDirectiveIndex;
          })();
        try {
          Sn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              c = t[a];
            vu(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                LS(u, c);
          }
        } finally {
          Sn(-1), vu(s);
        }
      }
      function LS(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Rc(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function VS(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          pt(t) && (n[""] = e);
        }
      }
      function HS(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = In(o.type)),
          s = new ho(i, pt(o), M);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function PS(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function FS(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, Ro(e, n, o.hostVars, F), o);
      }
      function zS(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) Ng(r, n, s[a++], s[a++], s[a++]);
      }
      function Ng(e, t, n, r, o) {
        const i = et(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(r) && (o = s[r].call(t, o)),
            null !== e.setInput ? e.setInput(t, o, n, r) : (t[r] = o);
        } finally {
          et(i);
        }
      }
      function GS(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function xg(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Du(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Ms(e, t) {
        return e[oo] ? (e[kf][ht] = t) : (e[oo] = t), (e[kf] = t), t;
      }
      function Oc(e, t, n) {
        Du(0);
        const r = et(null);
        try {
          t(e, n);
        } finally {
          et(r);
        }
      }
      function Pc(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++];
          Ng(e.data[s], t[s], r, a, o);
        }
      }
      function qS(e, t) {
        const n = Ze(t, e),
          r = n[C];
        !(function WS(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const o = n[ie];
        null !== o && null === n[jt] && (n[jt] = pc(o, n[rn])), Fc(r, n, n[ae]);
      }
      function Fc(e, t, n) {
        wu(t);
        try {
          const r = e.viewQuery;
          null !== r && Oc(1, r, n);
          const o = e.template;
          null !== o && _g(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && xg(e, t),
            e.staticViewQueries && Oc(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function ZS(e, t) {
              for (let n = 0; n < t.length; n++) qS(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[k] &= -5), Cu();
        }
      }
      let Lg = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, r, o) {
            const i = typeof Zone > "u" ? null : Zone.current,
              s = (function n_(e, t, n) {
                const r = Object.create(r_);
                n && (r.consumerAllowSignalWrites = !0),
                  (r.fn = e),
                  (r.schedule = t);
                const o = (s) => {
                  r.cleanupFn = s;
                };
                return (
                  (r.ref = {
                    notify: () => Gf(r),
                    run: () => {
                      if (((r.dirty = !1), r.hasRun && !qf(r))) return;
                      r.hasRun = !0;
                      const s = cu(r);
                      try {
                        r.cleanupFn(), (r.cleanupFn = eh), r.fn(o);
                      } finally {
                        lu(r, s);
                      }
                    },
                    cleanup: () => r.cleanupFn(),
                  }),
                  r.ref
                );
              })(
                n,
                (c) => {
                  this.all.has(c) && this.queue.set(c, i);
                },
                o
              );
            let a;
            this.all.add(s), s.notify();
            const u = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (a = r?.onDestroy(u)), { destroy: u };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, r] of this.queue)
                this.queue.delete(n), r ? r.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function Ts(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Ua(o, a))
              : 2 == i && (r = Ua(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function xo(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          null !== i && r.push(J(i)), Ae(i) && jg(i, r);
          const s = n.type;
          if (8 & s) xo(e, t, n.child, r);
          else if (32 & s) {
            const a = $u(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = yp(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = Co(t[ue]);
              xo(u[C], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      function jg(e, t) {
        for (let n = we; n < e.length; n++) {
          const r = e[n],
            o = r[C].firstChild;
          null !== o && xo(r[C], r, o, t);
        }
        e[bt] !== e[ie] && t.push(e[bt]);
      }
      function As(e, t, n, r = !0) {
        const o = t[Un],
          i = o.rendererFactory,
          s = o.afterRenderEventManager;
        i.begin?.(), s?.begin();
        try {
          $g(e, t, e.template, n);
        } catch (u) {
          throw (
            (r &&
              (function kg(e, t) {
                const n = e[rn],
                  r = n ? n.get(Ht, null) : null;
                r && r.handleError(t);
              })(t, u),
            u)
          );
        } finally {
          i.end?.(), o.effectManager?.flush(), s?.end();
        }
      }
      function $g(e, t, n, r) {
        const o = t[k];
        if (256 != (256 & o)) {
          t[Un].effectManager?.flush(), wu(t);
          try {
            ah(t),
              (function gh(e) {
                return (A.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && _g(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const c = e.preOrderCheckHooks;
              null !== c && Vi(t, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && Bi(t, c, 0, null), Eu(t, 0);
            }
            if (
              ((function KS(e) {
                for (let t = sp(e); null !== t; t = ap(t)) {
                  if (!t[jf]) continue;
                  const n = t[qn];
                  for (let r = 0; r < n.length; r++) {
                    h_(n[r]);
                  }
                }
              })(t),
              Vg(t, 2),
              null !== e.contentQueries && xg(e, t),
              s)
            ) {
              const c = e.contentCheckHooks;
              null !== c && Vi(t, c);
            } else {
              const c = e.contentHooks;
              null !== c && Bi(t, c, 1), Eu(t, 1);
            }
            !(function ES(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = vg(t, uo);
              try {
                for (let o = 0; o < n.length; o++) {
                  const i = n[o];
                  if (i < 0) Sn(~i);
                  else {
                    const s = i,
                      a = n[++o],
                      u = n[++o];
                    M_(a, s), (r.dirty = !1);
                    const c = cu(r);
                    try {
                      u(2, t[s]);
                    } finally {
                      lu(r, c);
                    }
                  }
                }
              } finally {
                null === t[uo] && yg(t, uo), Sn(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a && Hg(t, a, 0);
            const u = e.viewQuery;
            if ((null !== u && Oc(2, u, r), s)) {
              const c = e.viewCheckHooks;
              null !== c && Vi(t, c);
            } else {
              const c = e.viewHooks;
              null !== c && Bi(t, c, 2), Eu(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[k] &= -73),
              uh(t);
          } finally {
            Cu();
          }
        }
      }
      function Vg(e, t) {
        for (let n = sp(e); null !== n; n = ap(n))
          for (let r = we; r < n.length; r++) Bg(n[r], t);
      }
      function XS(e, t, n) {
        Bg(Ze(t, e), n);
      }
      function Bg(e, t) {
        if (
          !(function d_(e) {
            return 128 == (128 & e[k]);
          })(e)
        )
          return;
        const n = e[C],
          r = e[k];
        if ((80 & r && 0 === t) || 1024 & r || 2 === t)
          $g(n, e, n.template, e[ae]);
        else if (e[ro] > 0) {
          Vg(e, 1);
          const o = n.components;
          null !== o && Hg(e, o, 1);
        }
      }
      function Hg(e, t, n) {
        for (let r = 0; r < t.length; r++) XS(e, t[r], n);
      }
      class Oo {
        get rootNodes() {
          const t = this._lView,
            n = t[C];
          return xo(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[ae];
        }
        set context(t) {
          this._lView[ae] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[k]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[re];
            if (Ae(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (is(t, r), Wi(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Bu(this._lView[C], this._lView);
        }
        onDestroy(t) {
          !(function lh(e, t) {
            if (256 == (256 & e[k])) throw new w(911, !1);
            null === e[on] && (e[on] = []), e[on].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          No(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[k] &= -129;
        }
        reattach() {
          this._lView[k] |= 128;
        }
        detectChanges() {
          As(this._lView[C], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new w(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function BI(e, t) {
              _o(e, t, t[P], 2, null, null);
            })(this._lView[C], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new w(902, !1);
          this._appRef = t;
        }
      }
      class JS extends Oo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          As(t[C], t, t[ae], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Ug extends Cs {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = B(t);
          return new Po(n, this.ngModule);
        }
      }
      function zg(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class tM {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Ai(r);
          const o = this.injector.get(t, vc, r);
          return o !== vc || n === vc ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Po extends Qp {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = zg(t.inputs);
          if (null !== n)
            for (const o of r)
              n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
          return r;
        }
        get outputs() {
          return zg(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function LE(e) {
              return e.map(kE).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof nt ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new tM(t, i) : t,
            a = s.get(Kp, null);
          if (null === a) throw new w(407, !1);
          const d = {
              rendererFactory: a,
              sanitizer: s.get(Yb, null),
              effectManager: s.get(Lg, null),
              afterRenderEventManager: s.get(Ic, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || "div",
            p = r
              ? (function IS(e, t, n, r) {
                  const i = r.get(hg, !1) || n === dt.ShadowDom,
                    s = e.selectRootElement(t, i);
                  return (
                    (function bS(e) {
                      bg(e);
                    })(s),
                    s
                  );
                })(f, r, this.componentDef.encapsulation, s)
              : os(
                  f,
                  h,
                  (function eM(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(h)
                ),
            D = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let m = null;
          null !== p && (m = pc(p, s, !0));
          const I = Ac(0, null, null, 1, 0, null, null, null, null, null, null),
            N = Ss(null, I, null, D, null, null, d, f, s, null, m);
          let V, ze;
          wu(N);
          try {
            const Xt = this.componentDef;
            let Wr,
              Vd = null;
            Xt.findHostDirectiveDefs
              ? ((Wr = []),
                (Vd = new Map()),
                Xt.findHostDirectiveDefs(Xt, Wr, Vd),
                Wr.push(Xt))
              : (Wr = [Xt]);
            const OF = (function rM(e, t) {
                const n = e[C],
                  r = $;
                return (e[r] = t), Dr(n, r, 2, "#host", null);
              })(N, p),
              PF = (function oM(e, t, n, r, o, i, s) {
                const a = o[C];
                !(function iM(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = to(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Ts(t, t.mergedAttrs, !0), null !== n && Ep(r, n, t));
                })(r, e, t, s);
                let u = null;
                null !== t && (u = pc(t, o[rn]));
                const c = i.rendererFactory.createRenderer(t, n);
                let l = 16;
                n.signals ? (l = 4096) : n.onPush && (l = 64);
                const d = Ss(
                  o,
                  Ig(n),
                  null,
                  l,
                  o[e.index],
                  e,
                  i,
                  c,
                  null,
                  null,
                  u
                );
                return (
                  a.firstCreatePass && Rc(a, e, r.length - 1),
                  Ms(o, d),
                  (o[e.index] = d)
                );
              })(OF, p, Xt, Wr, N, d, f);
            (ze = (function sh(e, t) {
              return e.data[t];
            })(I, $)),
              p &&
                (function aM(e, t, n, r) {
                  if (r) ou(e, n, ["ng-version", Kb.full]);
                  else {
                    const { attrs: o, classes: i } = (function jE(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!ft(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && ou(e, n, o),
                      i && i.length > 0 && Cp(e, n, i.join(" "));
                  }
                })(f, Xt, p, r),
              void 0 !== n &&
                (function uM(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(ze, this.ngContentSelectors, n),
              (V = (function sM(e, t, n, r, o, i) {
                const s = Ee(),
                  a = o[C],
                  u = Ve(s, o);
                Tg(a, o, s, n, null, r);
                for (let l = 0; l < n.length; l++)
                  Ie(Mn(o, a, s.directiveStart + l, s), o);
                Ag(a, o, s), u && Ie(u, o);
                const c = Mn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[ae] = o[ae] = c), null !== i))
                  for (const l of i) l(c, t);
                return Sc(a, s, e), c;
              })(PF, Xt, Wr, Vd, N, [cM])),
              Fc(I, N, null);
          } finally {
            Cu();
          }
          return new nM(this.componentType, V, mr(ze, N), N, ze);
        }
      }
      class nM extends zb {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new JS(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const i = this._rootLView;
            Pc(i[C], i, o, t, n),
              this.previousInputValues.set(t, n),
              No(Ze(this._tNode.index, i));
          }
        }
        get injector() {
          return new xe(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function cM() {
        const e = Ee();
        $i(v()[C], e);
      }
      function Uc(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Pc(e, n, t.inputs[s], s, r);
      }
      function $o(e, t, n, r) {
        const o = v(),
          i = H(),
          s = $ + e,
          a = o[P],
          u = i.firstCreatePass
            ? (function zM(e, t, n, r, o, i) {
                const s = t.consts,
                  u = Dr(t, e, 2, r, an(s, o));
                return (
                  (function Nc(e, t, n, r) {
                    if (fh()) {
                      const o = null === r ? null : { "": -1 },
                        i = (function jS(e, t) {
                          const n = e.directiveRegistry;
                          let r = null,
                            o = null;
                          if (n)
                            for (let i = 0; i < n.length; i++) {
                              const s = n[i];
                              if (Rf(t, s.selectors, !1))
                                if ((r || (r = []), pt(s)))
                                  if (null !== s.findHostDirectiveDefs) {
                                    const a = [];
                                    (o = o || new Map()),
                                      s.findHostDirectiveDefs(s, a, o),
                                      r.unshift(...a, s),
                                      Rc(e, t, a.length);
                                  } else r.unshift(s), Rc(e, t, 0);
                                else
                                  (o = o || new Map()),
                                    s.findHostDirectiveDefs?.(s, r, o),
                                    r.push(s);
                            }
                          return null === r ? null : [r, o];
                        })(e, n);
                      let s, a;
                      null === i ? (s = a = null) : ([s, a] = i),
                        null !== s && Tg(e, t, n, s, o, a),
                        o &&
                          (function $S(e, t, n) {
                            if (t) {
                              const r = (e.localNames = []);
                              for (let o = 0; o < t.length; o += 2) {
                                const i = n[t[o + 1]];
                                if (null == i) throw new w(-301, !1);
                                r.push(t[o], i);
                              }
                            }
                          })(n, r, o);
                    }
                    n.mergedAttrs = to(n.mergedAttrs, n.attrs);
                  })(t, n, u, an(s, i)),
                  null !== u.attrs && Ts(u, u.attrs, !1),
                  null !== u.mergedAttrs && Ts(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          c = fm(i, o, u, a, t, e);
        o[s] = c;
        const l = (function Pi(e) {
          return 1 == (1 & e.flags);
        })(u);
        return (
          Mt(u, !0),
          Ep(a, c, u),
          32 != (32 & u.flags) && ji() && as(i, o, c, u),
          0 ===
            (function g_() {
              return A.lFrame.elementDepthCount;
            })() && Ie(c, o),
          (function m_() {
            A.lFrame.elementDepthCount++;
          })(),
          l &&
            ((function Mc(e, t, n) {
              fh() &&
                ((function kS(e, t, n, r) {
                  const o = n.directiveStart,
                    i = n.directiveEnd;
                  _n(n) &&
                    (function US(e, t, n) {
                      const r = Ve(t, e),
                        o = Ig(n);
                      let s = 16;
                      n.signals ? (s = 4096) : n.onPush && (s = 64);
                      const a = Ms(
                        e,
                        Ss(
                          e,
                          o,
                          null,
                          s,
                          r,
                          t,
                          null,
                          e[Un].rendererFactory.createRenderer(r, n),
                          null,
                          null,
                          null
                        )
                      );
                      e[t.index] = a;
                    })(t, n, e.data[o + n.componentOffset]),
                    e.firstCreatePass || Ui(n, t),
                    Ie(r, t);
                  const s = n.initialInputs;
                  for (let a = o; a < i; a++) {
                    const u = e.data[a],
                      c = Mn(t, e, a, n);
                    Ie(c, t),
                      null !== s && zS(0, a - o, c, u, 0, s),
                      pt(u) && (Ze(n.index, t)[ae] = Mn(t, e, a, n));
                  }
                })(e, t, n, Ve(n, t)),
                64 == (64 & n.flags) && Ag(e, t, n));
            })(i, o, u),
            Sc(i, u, o)),
          null !== r &&
            (function Tc(e, t, n = Ve) {
              const r = t.localNames;
              if (null !== r) {
                let o = t.index + 1;
                for (let i = 0; i < r.length; i += 2) {
                  const s = r[i + 1],
                    a = -1 === s ? n(t, e) : e[s];
                  e[o++] = a;
                }
              }
            })(o, u),
          $o
        );
      }
      function Vo() {
        let e = Ee();
        gu()
          ? (function mu() {
              A.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Mt(e, !1));
        const t = e;
        (function y_(e) {
          return A.skipHydrationRootTNode === e;
        })(t) &&
          (function E_() {
            A.skipHydrationRootTNode = null;
          })(),
          (function v_() {
            A.lFrame.elementDepthCount--;
          })();
        const n = H();
        return (
          n.firstCreatePass && ($i(n, e), su(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function $_(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Uc(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function V_(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Uc(n, t, v(), t.stylesWithoutHost, !1),
          Vo
        );
      }
      function ks(e, t, n, r) {
        return $o(e, t, n, r), Vo(), ks;
      }
      let fm = (e, t, n, r, o, i) => (
        un(!0),
        os(
          r,
          o,
          (function _h() {
            return A.lFrame.currentNamespace;
          })()
        )
      );
      function Ls(e) {
        return !!e && "function" == typeof e.then;
      }
      function gm(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function Xc(e, t = "") {
        const n = v(),
          r = H(),
          o = e + $,
          i = r.firstCreatePass ? Dr(r, o, 1, t, null) : r.data[o],
          s = zm(r, n, i, t, e);
        (n[o] = s), ji() && as(r, n, s, i), Mt(i, !1);
      }
      let zm = (e, t, n, r, o) => (
        un(!0),
        (function rs(e, t) {
          return e.createText(t);
        })(t[P], r)
      );
      const Rr = "en-US";
      let hv = Rr;
      class On {}
      class $v {}
      class sl extends On {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Ug(this));
          const o = We(t);
          (this._bootstrapComponents = Ut(o.bootstrap)),
            (this._r3Injector = ng(
              t,
              n,
              [
                { provide: On, useValue: this },
                { provide: Cs, useValue: this.componentFactoryResolver },
                ...r,
              ],
              pe(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class al extends $v {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new sl(this.moduleType, t, []);
        }
      }
      class Vv extends On {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new Ug(this)),
            (this.instance = null);
          const n = new dr(
            [
              ...t.providers,
              { provide: On, useValue: this },
              { provide: Cs, useValue: this.componentFactoryResolver },
            ],
            t.parent || ps(),
            t.debugName,
            new Set(["environment"])
          );
          (this.injector = n),
            t.runEnvironmentInitializers && n.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function ul(e, t, n = null) {
        return new Vv({
          providers: e,
          parent: t,
          debugName: n,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let QT = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
              const r = $p(0, n.type),
                o =
                  r.length > 0
                    ? ul([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n, o);
            }
            return this.cachedInjectors.get(n);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: "environment",
            factory: () => new e(b(nt)),
          }));
        }
        return e;
      })();
      function Bv(e) {
        e.getStandaloneInjector = (t) =>
          t.get(QT).getOrCreateStandaloneInjector(e);
      }
      function _A(e, t, n, r = !0) {
        const o = t[C];
        if (
          ((function UI(e, t, n, r) {
            const o = we + r,
              i = n.length;
            r > 0 && (n[o - 1][ht] = t),
              r < i - we
                ? ((t[ht] = n[o]), $h(n, we + r, t))
                : (n.push(t), (t[ht] = null)),
              (t[re] = n);
            const s = t[io];
            null !== s &&
              n !== s &&
              (function zI(e, t) {
                const n = e[qn];
                t[ue] !== t[re][re][ue] && (e[jf] = !0),
                  null === n ? (e[qn] = [t]) : n.push(t);
              })(s, t);
            const a = t[It];
            null !== a && a.insertView(e), (t[k] |= 128);
          })(o, t, e, n),
          r)
        ) {
          const i = Gu(n, e),
            s = t[P],
            a = ss(s, e[bt]);
          null !== a &&
            (function VI(e, t, n, r, o, i) {
              (r[ie] = o), (r[_e] = t), _o(e, r, n, 1, o, i);
            })(o, e[_e], s, t, a, i);
        }
      }
      Symbol;
      let vt = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = xA);
        }
        return e;
      })();
      function xA() {
        return (function iy(e, t) {
          let n;
          const r = t[e.index];
          return (
            Ae(r)
              ? (n = r)
              : ((n = (function Rg(e, t, n, r) {
                  return [e, !0, !1, t, null, 0, r, n, null, null, null];
                })(r, t, null, e)),
                (t[e.index] = n),
                Ms(t, n)),
            sy(n, t, e, r),
            new ry(n, e, t)
          );
        })(Ee(), v());
      }
      const OA = vt,
        ry = class extends OA {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return mr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new xe(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = zi(this._hostTNode, this._hostLView);
            if (Iu(t)) {
              const n = go(t, this._hostLView),
                r = po(t);
              return new xe(n[C].data[r + 8], n);
            }
            return new xe(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = oy(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - we;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const a = t.createEmbeddedViewImpl(n || {}, i, null);
            return this.insertImpl(a, o, false), a;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function vo(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const g = n || {};
              (a = g.index),
                (r = g.injector),
                (o = g.projectableNodes),
                (i = g.environmentInjector || g.ngModuleRef);
            }
            const u = s ? t : new Po(B(t)),
              c = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const y = (s ? c : this.parentInjector).get(nt, null);
              y && (i = y);
            }
            B(u.componentType ?? {});
            const h = u.create(c, o, null, i);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1);
          }
          insertImpl(t, n, r) {
            const o = t._lView;
            if (
              (function f_(e) {
                return Ae(e[re]);
              })(o)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const c = o[re],
                  l = new ry(c, c[_e], c[re]);
                l.detach(l.indexOf(t));
              }
            }
            const s = this._adjustIndex(n),
              a = this._lContainer;
            return (
              _A(a, o, s, !r), t.attachToViewContainerRef(), $h(dl(a), s, t), t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = oy(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = is(this._lContainer, n);
            r && (Wi(dl(this._lContainer), n), Bu(r[C], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = is(this._lContainer, n);
            return r && null != Wi(dl(this._lContainer), n) ? new Oo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function oy(e) {
        return e[8];
      }
      function dl(e) {
        return e[8] || (e[8] = []);
      }
      let sy = function ay(e, t, n, r) {
        if (e[bt]) return;
        let o;
        (o =
          8 & n.type
            ? J(r)
            : (function PA(e, t) {
                const n = e[P],
                  r = n.createComment(""),
                  o = Ve(t, e);
                return (
                  Tn(
                    n,
                    ss(n, o),
                    r,
                    (function ZI(e, t) {
                      return e.nextSibling(t);
                    })(n, o),
                    !1
                  ),
                  r
                );
              })(t, n)),
          (e[bt] = o);
      };
      const El = new _("Application Initializer");
      let _l = (() => {
          class e {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((n, r) => {
                  (this.resolve = n), (this.reject = r);
                })),
                (this.appInits = E(El, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const n = [];
              for (const o of this.appInits) {
                const i = o();
                if (Ls(i)) n.push(i);
                else if (gm(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
              const r = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(n)
                .then(() => {
                  r();
                })
                .catch((o) => {
                  this.reject(o);
                }),
                0 === n.length && r(),
                (this.initialized = !0);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        xy = (() => {
          class e {
            log(n) {
              console.log(n);
            }
            warn(n) {
              console.warn(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            }));
          }
          return e;
        })();
      const qt = new _("LocaleId", {
        providedIn: "root",
        factory: () =>
          E(qt, j.Optional | j.SkipSelf) ||
          (function dN() {
            return (typeof $localize < "u" && $localize.locale) || Rr;
          })(),
      });
      let Oy = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new Xe(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      class pN {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Py = (() => {
        class e {
          compileModuleSync(n) {
            return new al(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = Ut(We(n).declarations).reduce((s, a) => {
                const u = B(a);
                return u && s.push(new Po(u)), s;
              }, []);
            return new pN(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const jy = new _(""),
        Zs = new _("");
      let Tl,
        Sl = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Tl ||
                  ((function kN(e) {
                    Tl = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ee.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(ee), b(Ml), b(Zs));
            });
            static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        Ml = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Tl?.findTestabilityInTree(this, n, r) ?? null;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            }));
          }
          return e;
        })(),
        hn = null;
      const $y = new _("AllowMultipleToken"),
        Al = new _("PlatformDestroyListeners"),
        Nl = new _("appBootstrapListener");
      class By {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Uy(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new _(r);
        return (i = []) => {
          let s = Rl();
          if (!s || s.injector.get($y, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function $N(e) {
                  if (hn && !hn.get($y, !1)) throw new w(400, !1);
                  (function Vy() {
                    !(function KE(e) {
                      Yf = e;
                    })(() => {
                      throw new w(600, !1);
                    });
                  })(),
                    (hn = e);
                  const t = e.get(Gy);
                  (function Hy(e) {
                    e.get(zp, null)?.forEach((n) => n());
                  })(e);
                })(
                  (function zy(e = [], t) {
                    return rt.create({
                      name: t,
                      providers: [
                        { provide: rc, useValue: "platform" },
                        { provide: Al, useValue: new Set([() => (hn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function BN(e) {
            const t = Rl();
            if (!t) throw new w(401, !1);
            return t;
          })();
        };
      }
      function Rl() {
        return hn?.get(Gy) ?? null;
      }
      let Gy = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function HN(e = "zone.js", t) {
              return "noop" === e ? new cS() : "zone.js" === e ? new ee(t) : e;
            })(
              r?.ngZone,
              (function qy(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return o.run(() => {
              const i = (function ZT(e, t, n) {
                  return new sl(e, t, n);
                })(
                  n.moduleType,
                  this.injector,
                  (function Ky(e) {
                    return [
                      { provide: ee, useFactory: e },
                      {
                        provide: Mo,
                        multi: !0,
                        useFactory: () => {
                          const t = E(zN, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: Yy, useFactory: UN },
                      { provide: ag, useFactory: ug },
                    ];
                  })(() => o)
                ),
                s = i.injector.get(Ht, null);
              return (
                o.runOutsideAngular(() => {
                  const a = o.onError.subscribe({
                    next: (u) => {
                      s.handleError(u);
                    },
                  });
                  i.onDestroy(() => {
                    Qs(this._modules, i), a.unsubscribe();
                  });
                }),
                (function Wy(e, t, n) {
                  try {
                    const r = n();
                    return Ls(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(s, o, () => {
                  const a = i.injector.get(_l);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function pv(e) {
                          Je(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (hv = e.toLowerCase().replace(/_/g, "-"));
                        })(i.injector.get(qt, Rr) || Rr),
                        this._moduleDoBootstrap(i),
                        i
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = Zy({}, r);
            return (function LN(e, t, n) {
              const r = new al(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Pr);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new w(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new w(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Al, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(rt));
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "platform",
          }));
        }
        return e;
      })();
      function Zy(e, t) {
        return Array.isArray(t) ? t.reduce(Zy, e) : { ...e, ...t };
      }
      let Pr = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = E(Yy)),
              (this.zoneIsStable = E(ag)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = E(Oy).hasPendingTasks.pipe(
                Et((n) => (n ? x(!1) : this.zoneIsStable)),
                (function uE(e, t = Jt) {
                  return (
                    (e = e ?? cE),
                    fe((n, r) => {
                      let o,
                        i = !0;
                      n.subscribe(
                        he(r, (s) => {
                          const a = t(s);
                          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
                        })
                      );
                    })
                  );
                })(),
                pf()
              )),
              (this._injector = E(nt));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof Qp;
            if (!this._injector.get(_l).done)
              throw (
                (!o &&
                  (function Bn(e) {
                    const t = B(e) || De(e) || Te(e);
                    return null !== t && t.standalone;
                  })(n),
                new w(405, !1))
              );
            let s;
            (s = o ? n : this._injector.get(Cs).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function jN(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(On),
              c = s.create(rt.NULL, [], r || s.selector, a),
              l = c.location.nativeElement,
              d = c.injector.get(jy, null);
            return (
              d?.registerApplication(l),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  Qs(this.components, c),
                  d?.unregisterApplication(l);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new w(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Qs(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(Nl, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Qs(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new w(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function Qs(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const Yy = new _("", {
        providedIn: "root",
        factory: () => E(Ht).handleError.bind(void 0),
      });
      function UN() {
        const e = E(ee),
          t = E(Ht);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let zN = (() => {
        class e {
          constructor() {
            (this.zone = E(ee)), (this.applicationRef = E(Pr));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      let xl = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = qN);
        }
        return e;
      })();
      function qN(e) {
        return (function WN(e, t, n) {
          if (_n(e) && !n) {
            const r = Ze(e.index, t);
            return new Oo(r, r);
          }
          return 47 & e.type ? new Oo(t[ue], t) : null;
        })(Ee(), v(), 16 == (16 & e));
      }
      const sR = Uy(null, "core", []);
      let aR = (() => {
          class e {
            constructor(n) {}
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(Pr));
            });
            static #t = (this.ɵmod = En({ type: e }));
            static #n = (this.ɵinj = tn({}));
          }
          return e;
        })(),
        $l = null;
      function Fr() {
        return $l;
      }
      class CR {}
      const it = new _("DocumentToken");
      let Vl = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: function () {
              return E(_R);
            },
            providedIn: "platform",
          }));
        }
        return e;
      })();
      const ER = new _("Location Initialized");
      let _R = (() => {
        class e extends Vl {
          constructor() {
            super(),
              (this._doc = E(it)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Fr().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Fr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Fr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            this._history.pushState(n, r, o);
          }
          replaceState(n, r, o) {
            this._history.replaceState(n, r, o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: "platform",
          }));
        }
        return e;
      })();
      function Bl(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function gD(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function Wt(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let pn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: function () {
              return E(vD);
            },
            providedIn: "root",
          }));
        }
        return e;
      })();
      const mD = new _("appBaseHref");
      let vD = (() => {
          class e extends pn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  E(it).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Bl(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Wt(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Wt(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Wt(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(Vl), b(mD, 8));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        yD = (() => {
          class e extends pn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Bl(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Wt(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Wt(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(Vl), b(mD, 8));
            });
            static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        Hl = (() => {
          class e {
            constructor(n) {
              (this._subject = new Oe()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function SR(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(gD(DD(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + Wt(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function bR(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, DD(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Wt(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Wt(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
            static #e = (this.normalizeQueryParams = Wt);
            static #t = (this.joinWithSlash = Bl);
            static #n = (this.stripTrailingSlash = gD);
            static #r = (this.ɵfac = function (r) {
              return new (r || e)(b(pn));
            });
            static #o = (this.ɵprov = S({
              token: e,
              factory: function () {
                return (function IR() {
                  return new Hl(b(pn));
                })();
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      function DD(e) {
        return e.replace(/\/index.html$/, "");
      }
      let Bx = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = En({ type: e }));
          static #n = (this.ɵinj = tn({}));
        }
        return e;
      })();
      function FD(e) {
        return "server" === e;
      }
      let Gx = (() => {
        class e {
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: "root",
            factory: () => new qx(b(it), window),
          }));
        }
        return e;
      })();
      class qx {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function Wx(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              "function" == typeof e.body.attachShadow
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          this.supportsScrolling() &&
            (this.window.history.scrollRestoration = t);
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      class vO extends CR {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class id extends vO {
        static makeCurrent() {
          !(function wR(e) {
            $l || ($l = e);
          })(new id());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function yO() {
            return (
              (ti = ti || document.querySelector("base")),
              ti ? ti.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function DO(e) {
                (fa = fa || document.createElement("a")),
                  fa.setAttribute("href", e);
                const t = fa.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          ti = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function lx(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let fa,
        ti = null,
        CO = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
          }
          return e;
        })();
      const sd = new _("EventManagerPlugins");
      let VD = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n);
            if (r) return r;
            if (((r = this._plugins.find((i) => i.supports(n))), !r))
              throw new w(5101, !1);
            return this._eventNameToPlugin.set(n, r), r;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(sd), b(ee));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class BD {
        constructor(t) {
          this._doc = t;
        }
      }
      const ad = "ng-app-id";
      let HD = (() => {
        class e {
          constructor(n, r, o, i = {}) {
            (this.doc = n),
              (this.appId = r),
              (this.nonce = o),
              (this.platformId = i),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = FD(i)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((r) => r.remove()), n.clear());
            for (const r of this.getAllStyles()) this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${ad}="${this.appId}"]`
            );
            if (n?.length) {
              const r = new Map();
              return (
                n.forEach((o) => {
                  null != o.textContent && r.set(o.textContent, o);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(n, r) {
            const o = this.styleRef;
            if (o.has(n)) {
              const i = o.get(n);
              return (i.usage += r), i.usage;
            }
            return o.set(n, { usage: r, elements: [] }), r;
          }
          getStyleElement(n, r) {
            const o = this.styleNodesInDOM,
              i = o?.get(r);
            if (i?.parentNode === n)
              return o.delete(r), i.removeAttribute(ad), i;
            {
              const s = this.doc.createElement("style");
              return (
                this.nonce && s.setAttribute("nonce", this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute(ad, this.appId),
                s
              );
            }
          }
          addStyleToHost(n, r) {
            const o = this.getStyleElement(n, r);
            n.appendChild(o);
            const i = this.styleRef,
              s = i.get(r)?.elements;
            s ? s.push(o) : i.set(r, { elements: [o], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(it), b(gs), b(Gp, 8), b(hr));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const ud = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        cd = /%COMP%/g,
        bO = new _("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !1,
        });
      function zD(e, t) {
        return t.map((n) => n.replace(cd, e));
      }
      let GD = (() => {
        class e {
          constructor(n, r, o, i, s, a, u, c = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestroy = i),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = u),
              (this.nonce = c),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = FD(a)),
              (this.defaultRenderer = new ld(n, s, u, this.platformIsServer));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === dt.ShadowDom &&
              (r = { ...r, encapsulation: dt.Emulated });
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof WD
                ? o.applyToHost(n)
                : o instanceof dd && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.doc,
                a = this.ngZone,
                u = this.eventManager,
                c = this.sharedStylesHost,
                l = this.removeStylesOnCompDestroy,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case dt.Emulated:
                  i = new WD(u, c, r, this.appId, l, s, a, d);
                  break;
                case dt.ShadowDom:
                  return new AO(u, c, n, r, s, a, this.nonce, d);
                default:
                  i = new dd(u, c, r, l, s, a, d);
              }
              o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(
              b(VD),
              b(HD),
              b(gs),
              b(bO),
              b(it),
              b(hr),
              b(ee),
              b(Gp)
            );
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class ld {
        constructor(t, n, r, o) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(ud[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (qD(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (qD(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new w(-5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = ud[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = ud[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (cn.DashCase | cn.Important)
            ? t.style.setProperty(n, r, o & cn.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & cn.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            "string" == typeof t &&
            !(t = Fr().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ("__ngUnwrap__" === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function qD(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class AO extends ld {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, u),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const c = zD(o.id, o.styles);
          for (const l of c) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = l),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class dd extends ld {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = u ? zD(u, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class WD extends dd {
        constructor(t, n, r, o, i, s, a, u) {
          const c = o + "-" + r.id;
          super(t, n, r, i, s, a, u, c),
            (this.contentAttr = (function SO(e) {
              return "_ngcontent-%COMP%".replace(cd, e);
            })(c)),
            (this.hostAttr = (function MO(e) {
              return "_nghost-%COMP%".replace(cd, e);
            })(c));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let NO = (() => {
        class e extends BD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(it));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const ZD = ["alt", "control", "meta", "shift"],
        RO = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        xO = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let OO = (() => {
        class e extends BD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Fr().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              ZD.forEach((c) => {
                const l = r.indexOf(c);
                l > -1 && (r.splice(l, 1), (s += c + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = RO[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                ZD.forEach((s) => {
                  s !== o && (0, xO[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(it));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const LO = Uy(sR, "browser", [
          { provide: hr, useValue: "browser" },
          {
            provide: zp,
            useValue: function PO() {
              id.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: it,
            useFactory: function kO() {
              return (
                (function nb(e) {
                  Zu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        jO = new _(""),
        KD = [
          {
            provide: Zs,
            useClass: class wO {
              addToWindow(t) {
                (X.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i) throw new w(5103, !1);
                  return i;
                }),
                  (X.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (X.getAllAngularRootElements = () => t.getAllRootElements()),
                  X.frameworkStabilizers || (X.frameworkStabilizers = []),
                  X.frameworkStabilizers.push((r) => {
                    const o = X.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach((u) => {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Fr().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: jy, useClass: Sl, deps: [ee, Ml, Zs] },
          { provide: Sl, useClass: Sl, deps: [ee, Ml, Zs] },
        ],
        XD = [
          { provide: rc, useValue: "root" },
          {
            provide: Ht,
            useFactory: function FO() {
              return new Ht();
            },
            deps: [],
          },
          { provide: sd, useClass: NO, multi: !0, deps: [it, ee, hr] },
          { provide: sd, useClass: OO, multi: !0, deps: [it] },
          GD,
          HD,
          VD,
          { provide: Kp, useExisting: GD },
          { provide: class Zx {}, useClass: CO, deps: [] },
          [],
        ];
      let $O = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [{ provide: gs, useValue: n.appId }],
              };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(jO, 12));
            });
            static #t = (this.ɵmod = En({ type: e }));
            static #n = (this.ɵinj = tn({
              providers: [...XD, ...KD],
              imports: [Bx, aR],
            }));
          }
          return e;
        })(),
        JD = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(it));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: function (r) {
                let o = null;
                return (
                  (o = r
                    ? new r()
                    : (function BO() {
                        return new JD(b(it));
                      })()),
                  o
                );
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      typeof window < "u" && window;
      const { isArray: WO } = Array,
        { getPrototypeOf: ZO, prototype: QO, keys: YO } = Object;
      const { isArray: JO } = Array;
      function hd(...e) {
        const t = Kr(e),
          n = (function JC(e) {
            return Q(Ba(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function KO(e) {
            if (1 === e.length) {
              const t = e[0];
              if (WO(t)) return { args: t, keys: null };
              if (
                (function XO(e) {
                  return e && "object" == typeof e && ZO(e) === QO;
                })(t)
              ) {
                const n = YO(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return ye([], t);
        const i = new de(
          (function rP(e, t, n = Jt) {
            return (r) => {
              rw(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    rw(
                      t,
                      () => {
                        const c = ye(e[u], t);
                        let l = !1;
                        c.subscribe(
                          he(
                            r,
                            (d) => {
                              (i[u] = d),
                                l || ((l = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            o
              ? (s) =>
                  (function nP(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : Jt
          )
        );
        return n
          ? i.pipe(
              (function tP(e) {
                return K((t) =>
                  (function eP(e, t) {
                    return JO(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : i;
      }
      function rw(e, t, n) {
        e ? Ft(n, e, t) : t();
      }
      const ha = Zr(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function pd(...e) {
        return (function oP() {
          return $n(1);
        })()(ye(e, Kr(e)));
      }
      function ow(e) {
        return new de((t) => {
          lt(e()).subscribe(t);
        });
      }
      function ni(e, t) {
        const n = Q(e) ? e : () => e,
          r = (o) => o.error(n());
        return new de(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function gd() {
        return fe((e, t) => {
          let n = null;
          e._refCount++;
          const r = he(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class iw extends de {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Zd(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new Ge();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                he(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = Ge.EMPTY));
          }
          return t;
        }
        refCount() {
          return gd()(this);
        }
      }
      function Lr(e) {
        return e <= 0
          ? () => Ct
          : fe((t, n) => {
              let r = 0;
              t.subscribe(
                he(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function mn(e, t) {
        return fe((n, r) => {
          let o = 0;
          n.subscribe(he(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function pa(e) {
        return fe((t, n) => {
          let r = !1;
          t.subscribe(
            he(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function sw(e = sP) {
        return fe((t, n) => {
          let r = !1;
          t.subscribe(
            he(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function sP() {
        return new ha();
      }
      function Fn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? mn((o, i) => e(o, i, r)) : Jt,
            Lr(1),
            n ? pa(t) : sw(() => new ha())
          );
      }
      function ri(e, t) {
        return Q(t) ? ve(e, t, 1) : ve(e, 1);
      }
      function Se(e, t, n) {
        const r = Q(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? fe((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                he(
                  i,
                  (u) => {
                    var c;
                    null === (c = r.next) || void 0 === c || c.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var c;
                    (a = !1),
                      null === (c = r.error) || void 0 === c || c.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, c;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (c = r.finalize) || void 0 === c || c.call(r);
                  }
                )
              );
            })
          : Jt;
      }
      function kn(e) {
        return fe((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            he(n, void 0, void 0, (s) => {
              (i = lt(e(s, kn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function md(e) {
        return e <= 0
          ? () => Ct
          : fe((t, n) => {
              let r = [];
              t.subscribe(
                he(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function vd(e) {
        return fe((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const L = "primary",
        oi = Symbol("RouteTitle");
      class fP {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function jr(e) {
        return new fP(e);
      }
      function hP(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Ot(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !aw(e[o], t[o]))) return !1;
        return !0;
      }
      function aw(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function uw(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function vn(e) {
        return (function qO(e) {
          return !!e && (e instanceof de || (Q(e.lift) && Q(e.subscribe)));
        })(e)
          ? e
          : Ls(e)
          ? ye(Promise.resolve(e))
          : x(e);
      }
      const gP = {
          exact: function dw(e, t, n) {
            if (
              !Ln(e.segments, t.segments) ||
              !ga(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !dw(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: fw,
        },
        cw = {
          exact: function mP(e, t) {
            return Ot(e, t);
          },
          subset: function vP(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => aw(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function lw(e, t, n) {
        return (
          gP[n.paths](e.root, t.root, n.matrixParams) &&
          cw[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function fw(e, t, n) {
        return hw(e, t, t.segments, n);
      }
      function hw(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!Ln(o, n) || t.hasChildren() || !ga(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Ln(e.segments, n) || !ga(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !fw(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(Ln(e.segments, o) && ga(e.segments, o, r) && e.children[L]) &&
            hw(e.children[L], t, i, r)
          );
        }
      }
      function ga(e, t, n) {
        return t.every((r, o) => cw[n](e[o].parameters, r.parameters));
      }
      class $r {
        constructor(t = new Z([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = jr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return wP.serialize(this);
        }
      }
      class Z {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Object.values(n).forEach((r) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return ma(this);
        }
      }
      class ii {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = jr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return mw(this);
        }
      }
      function Ln(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let si = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: function () {
              return new yd();
            },
            providedIn: "root",
          }));
        }
        return e;
      })();
      class yd {
        parse(t) {
          const n = new RP(t);
          return new $r(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${ai(t.root, !0)}`,
            r = (function _P(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${va(n)}=${va(o)}`).join("&")
                    : `${va(n)}=${va(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function CP(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const wP = new yd();
      function ma(e) {
        return e.segments.map((t) => mw(t)).join("/");
      }
      function ai(e, t) {
        if (!e.hasChildren()) return ma(e);
        if (t) {
          const n = e.children[L] ? ai(e.children[L], !1) : "",
            r = [];
          return (
            Object.entries(e.children).forEach(([o, i]) => {
              o !== L && r.push(`${o}:${ai(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function DP(e, t) {
            let n = [];
            return (
              Object.entries(e.children).forEach(([r, o]) => {
                r === L && (n = n.concat(t(o, r)));
              }),
              Object.entries(e.children).forEach(([r, o]) => {
                r !== L && (n = n.concat(t(o, r)));
              }),
              n
            );
          })(e, (r, o) =>
            o === L ? [ai(e.children[L], !1)] : [`${o}:${ai(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[L]
            ? `${ma(e)}/${n[0]}`
            : `${ma(e)}/(${n.join("//")})`;
        }
      }
      function pw(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function va(e) {
        return pw(e).replace(/%3B/gi, ";");
      }
      function Dd(e) {
        return pw(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function ya(e) {
        return decodeURIComponent(e);
      }
      function gw(e) {
        return ya(e.replace(/\+/g, "%20"));
      }
      function mw(e) {
        return `${Dd(e.path)}${(function EP(e) {
          return Object.keys(e)
            .map((t) => `;${Dd(t)}=${Dd(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const IP = /^[^\/()?;#]+/;
      function wd(e) {
        const t = e.match(IP);
        return t ? t[0] : "";
      }
      const bP = /^[^\/()?;=#]+/,
        MP = /^[^=?&#]+/,
        AP = /^[^&#]+/;
      class RP {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Z([], {})
              : new Z([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[L] = new Z(t, n)),
            r
          );
        }
        parseSegment() {
          const t = wd(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new w(4009, !1);
          return this.capture(t), new ii(ya(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = (function SP(e) {
            const t = e.match(bP);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = wd(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[ya(n)] = ya(r);
        }
        parseQueryParam(t) {
          const n = (function TP(e) {
            const t = e.match(MP);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function NP(e) {
              const t = e.match(AP);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = gw(n),
            i = gw(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = wd(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new w(4010, !1);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = L);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[L] : new Z([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new w(4011, !1);
        }
      }
      function vw(e) {
        return e.segments.length > 0 ? new Z([], { [L]: e }) : e;
      }
      function yw(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = yw(e.children[r]);
          if (r === L && 0 === i.segments.length && i.hasChildren())
            for (const [s, a] of Object.entries(i.children)) t[s] = a;
          else (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function xP(e) {
          if (1 === e.numberOfChildren && e.children[L]) {
            const t = e.children[L];
            return new Z(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new Z(e.segments, t));
      }
      function jn(e) {
        return e instanceof $r;
      }
      function Dw(e) {
        let t;
        const o = vw(
          (function n(i) {
            const s = {};
            for (const u of i.children) {
              const c = n(u);
              s[u.outlet] = c;
            }
            const a = new Z(i.url, s);
            return i === e && (t = a), a;
          })(e.root)
        );
        return t ?? o;
      }
      function ww(e, t, n, r) {
        let o = e;
        for (; o.parent; ) o = o.parent;
        if (0 === t.length) return Cd(o, o, o, n, r);
        const i = (function PP(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new Ew(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Object.entries(i.outlets).forEach(([u, c]) => {
                    a[u] = "string" == typeof c ? c.split("/") : c;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new Ew(n, t, r);
        })(t);
        if (i.toRoot()) return Cd(o, o, new Z([], {}), n, r);
        const s = (function FP(e, t, n) {
            if (e.isAbsolute) return new wa(t, !0, 0);
            if (!n) return new wa(t, !1, NaN);
            if (null === n.parent) return new wa(n, !0, 0);
            const r = Da(e.commands[0]) ? 0 : 1;
            return (function kP(e, t, n) {
              let r = e,
                o = t,
                i = n;
              for (; i > o; ) {
                if (((i -= o), (r = r.parent), !r)) throw new w(4005, !1);
                o = r.segments.length;
              }
              return new wa(r, !1, o - i);
            })(n, n.segments.length - 1 + r, e.numberOfDoubleDots);
          })(i, o, e),
          a = s.processChildren
            ? ci(s.segmentGroup, s.index, i.commands)
            : _w(s.segmentGroup, s.index, i.commands);
        return Cd(o, s.segmentGroup, a, n, r);
      }
      function Da(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function ui(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Cd(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Object.entries(r).forEach(([u, c]) => {
            i[u] = Array.isArray(c) ? c.map((l) => `${l}`) : `${c}`;
          }),
          (s = e === t ? n : Cw(e, t, n));
        const a = vw(yw(s));
        return new $r(a, i, o);
      }
      function Cw(e, t, n) {
        const r = {};
        return (
          Object.entries(e.children).forEach(([o, i]) => {
            r[o] = i === t ? n : Cw(i, t, n);
          }),
          new Z(e.segments, r)
        );
      }
      class Ew {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Da(r[0]))
          )
            throw new w(4003, !1);
          const o = r.find(ui);
          if (o && o !== uw(r)) throw new w(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class wa {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function _w(e, t, n) {
        if (
          (e || (e = new Z([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return ci(e, t, n);
        const r = (function jP(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (ui(a)) break;
              const u = `${a}`,
                c = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && c && "object" == typeof c && void 0 === c.outlets) {
                if (!bw(u, c, s)) return i;
                r += 2;
              } else {
                if (!bw(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new Z(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[L] = new Z(e.segments.slice(r.pathIndex), e.children)),
            ci(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new Z(e.segments, {})
          : r.match && !e.hasChildren()
          ? Ed(e, t, n)
          : r.match
          ? ci(e, 0, o)
          : Ed(e, t, n);
      }
      function ci(e, t, n) {
        if (0 === n.length) return new Z(e.segments, {});
        {
          const r = (function LP(e) {
              return ui(e[0]) ? e[0].outlets : { [L]: e };
            })(n),
            o = {};
          if (
            Object.keys(r).some((i) => i !== L) &&
            e.children[L] &&
            1 === e.numberOfChildren &&
            0 === e.children[L].segments.length
          ) {
            const i = ci(e.children[L], t, n);
            return new Z(e.segments, i.children);
          }
          return (
            Object.entries(r).forEach(([i, s]) => {
              "string" == typeof s && (s = [s]),
                null !== s && (o[i] = _w(e.children[i], t, s));
            }),
            Object.entries(e.children).forEach(([i, s]) => {
              void 0 === r[i] && (o[i] = s);
            }),
            new Z(e.segments, o)
          );
        }
      }
      function Ed(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (ui(i)) {
            const u = $P(i.outlets);
            return new Z(r, u);
          }
          if (0 === o && Da(n[0])) {
            r.push(new ii(e.segments[t].path, Iw(n[0]))), o++;
            continue;
          }
          const s = ui(i) ? i.outlets[L] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Da(a)
            ? (r.push(new ii(s, Iw(a))), (o += 2))
            : (r.push(new ii(s, {})), o++);
        }
        return new Z(r, {});
      }
      function $P(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([n, r]) => {
            "string" == typeof r && (r = [r]),
              null !== r && (t[n] = Ed(new Z([], {}), 0, r));
          }),
          t
        );
      }
      function Iw(e) {
        const t = {};
        return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
      }
      function bw(e, t, n) {
        return e == n.path && Ot(t, n.parameters);
      }
      const li = "imperative";
      class Pt {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Ca extends Pt {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class yn extends Pt {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class di extends Pt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Vr extends Pt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class Ea extends Pt {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class Sw extends Pt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class VP extends Pt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class BP extends Pt {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class HP extends Pt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class UP extends Pt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class zP {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class GP {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class qP {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class WP {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ZP {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class QP {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Mw {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class _d {}
      class Id {
        constructor(t) {
          this.url = t;
        }
      }
      class YP {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new fi()),
            (this.attachRef = null);
        }
      }
      let fi = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new YP()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      class Tw {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = bd(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = bd(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Sd(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return Sd(t, this._root).map((n) => n.value);
        }
      }
      function bd(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = bd(e, n);
          if (r) return r;
        }
        return null;
      }
      function Sd(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Sd(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class Yt {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Br(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Aw extends Tw {
        constructor(t, n) {
          super(t), (this.snapshot = n), Md(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Nw(e, t) {
        const n = (function KP(e, t) {
            const s = new _a([], {}, {}, "", {}, L, t, null, {});
            return new xw("", new Yt(s, []));
          })(0, t),
          r = new Xe([new ii("", {})]),
          o = new Xe({}),
          i = new Xe({}),
          s = new Xe({}),
          a = new Xe(""),
          u = new Hr(r, o, s, a, i, L, t, n.root);
        return (u.snapshot = n.root), new Aw(new Yt(u, []), n);
      }
      class Hr {
        constructor(t, n, r, o, i, s, a, u) {
          (this.urlSubject = t),
            (this.paramsSubject = n),
            (this.queryParamsSubject = r),
            (this.fragmentSubject = o),
            (this.dataSubject = i),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = u),
            (this.title = this.dataSubject?.pipe(K((c) => c[oi])) ?? x(void 0)),
            (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(K((t) => jr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(K((t) => jr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Rw(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function XP(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class _a {
        get title() {
          return this.data?.[oi];
        }
        constructor(t, n, r, o, i, s, a, u, c) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._resolve = c);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = jr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = jr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class xw extends Tw {
        constructor(t, n) {
          super(n), (this.url = t), Md(this, n);
        }
        toString() {
          return Ow(this._root);
        }
      }
      function Md(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Md(e, n));
      }
      function Ow(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Ow).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Td(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Ot(t.queryParams, n.queryParams) ||
              e.queryParamsSubject.next(n.queryParams),
            t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
            Ot(t.params, n.params) || e.paramsSubject.next(n.params),
            (function pP(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Ot(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.urlSubject.next(n.url),
            Ot(t.data, n.data) || e.dataSubject.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function Ad(e, t) {
        const n =
          Ot(e.params, t.params) &&
          (function yP(e, t) {
            return (
              Ln(e, t) && e.every((n, r) => Ot(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Ad(e.parent, t.parent))
        );
      }
      let Nd = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = L),
              (this.activateEvents = new Oe()),
              (this.deactivateEvents = new Oe()),
              (this.attachEvents = new Oe()),
              (this.detachEvents = new Oe()),
              (this.parentContexts = E(fi)),
              (this.location = E(vt)),
              (this.changeDetector = E(xl)),
              (this.environmentInjector = E(nt)),
              (this.inputBinder = E(Ia, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new w(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new w(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new w(4012, !1);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new w(4013, !1);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new JP(n, a, o.injector);
            (this.activated = o.createComponent(s, {
              index: o.length,
              injector: u,
              environmentInjector: r ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵdir = Me({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [bn],
          }));
        }
        return e;
      })();
      class JP {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Hr
            ? this.route
            : t === fi
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      const Ia = new _("");
      let Pw = (() => {
        class e {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(n) {
            this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
          }
          unsubscribeFromRouteData(n) {
            this.outletDataSubscriptions.get(n)?.unsubscribe(),
              this.outletDataSubscriptions.delete(n);
          }
          subscribeToRouteData(n) {
            const { activatedRoute: r } = n,
              o = hd([r.queryParams, r.params, r.data])
                .pipe(
                  Et(
                    ([i, s, a], u) => (
                      (a = { ...i, ...s, ...a }),
                      0 === u ? x(a) : Promise.resolve(a)
                    )
                  )
                )
                .subscribe((i) => {
                  if (
                    !n.isActivated ||
                    !n.activatedComponentRef ||
                    n.activatedRoute !== r ||
                    null === r.component
                  )
                    return void this.unsubscribeFromRouteData(n);
                  const s = (function DR(e) {
                    const t = B(e);
                    if (!t) return null;
                    const n = new Po(t);
                    return {
                      get selector() {
                        return n.selector;
                      },
                      get type() {
                        return n.componentType;
                      },
                      get inputs() {
                        return n.inputs;
                      },
                      get outputs() {
                        return n.outputs;
                      },
                      get ngContentSelectors() {
                        return n.ngContentSelectors;
                      },
                      get isStandalone() {
                        return t.standalone;
                      },
                      get isSignal() {
                        return t.signals;
                      },
                    };
                  })(r.component);
                  if (s)
                    for (const { templateName: a } of s.inputs)
                      n.activatedComponentRef.setInput(a, i[a]);
                  else this.unsubscribeFromRouteData(n);
                });
            this.outletDataSubscriptions.set(n, o);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function hi(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function t1(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return hi(e, r, o);
              return hi(e, r);
            });
          })(e, t, n);
          return new Yt(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => hi(e, a))),
                s
              );
            }
          }
          const r = (function n1(e) {
              return new Hr(
                new Xe(e.url),
                new Xe(e.params),
                new Xe(e.queryParams),
                new Xe(e.fragment),
                new Xe(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => hi(e, i));
          return new Yt(r, o);
        }
      }
      const Rd = "ngNavigationCancelingError";
      function Fw(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = jn(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = kw(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function kw(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Rd] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function Lw(e) {
        return e && e[Rd];
      }
      let jw = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = no({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Bv],
            decls: 1,
            vars: 0,
            template: function (r, o) {
              1 & r && ks(0, "router-outlet");
            },
            dependencies: [Nd],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      function xd(e) {
        const t = e.children && e.children.map(xd),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== L &&
            (n.component = jw),
          n
        );
      }
      function wt(e) {
        return e.outlet || L;
      }
      function pi(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class l1 {
        constructor(t, n, r, o, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o),
            (this.inputBindingEnabled = i);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Td(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Br(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Object.values(o).forEach((i) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Br(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Br(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = Br(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new QP(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new WP(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Td(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Td(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = pi(o.snapshot);
              (s.attachRef = null),
                (s.route = o),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class $w {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class ba {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function d1(e, t, n) {
        const r = e._root;
        return gi(r, t ? t._root : null, n, [r.value]);
      }
      function Ur(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function mE(e) {
              return null !== bi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function gi(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Br(t);
        return (
          e.children.forEach((s) => {
            (function h1(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function p1(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Ln(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Ln(e.url, t.url) || !Ot(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Ad(e, t) || !Ot(e.queryParams, t.queryParams);
                    default:
                      return !Ad(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new $w(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  gi(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new ba(a.outlet.component, s));
              } else
                s && mi(t, a, o),
                  o.canActivateChecks.push(new $w(r)),
                  gi(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Object.entries(i).forEach(([s, a]) => mi(a, n.getContext(s), o)),
          o
        );
      }
      function mi(e, t, n) {
        const r = Br(e),
          o = e.value;
        Object.entries(r).forEach(([i, s]) => {
          mi(s, o.component ? (t ? t.children.getContext(i) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new ba(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function vi(e) {
        return "function" == typeof e;
      }
      function Vw(e) {
        return e instanceof ha || "EmptyError" === e?.name;
      }
      const Sa = Symbol("INITIAL_VALUE");
      function zr() {
        return Et((e) =>
          hd(
            e.map((t) =>
              t.pipe(
                Lr(1),
                (function iP(...e) {
                  const t = Kr(e);
                  return fe((n, r) => {
                    (t ? pd(e, n, t) : pd(e, n)).subscribe(r);
                  });
                })(Sa)
              )
            )
          ).pipe(
            K((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Sa) return Sa;
                  if (!1 === n || n instanceof $r) return n;
                }
              return !0;
            }),
            mn((t) => t !== Sa),
            Lr(1)
          )
        );
      }
      function Bw(e) {
        return (function vC(...e) {
          return Gd(e);
        })(
          Se((t) => {
            if (jn(t)) throw Fw(0, t);
          }),
          K((t) => !0 === t)
        );
      }
      class Ma {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Hw {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Gr(e) {
        return ni(new Ma(e));
      }
      function Uw(e) {
        return ni(new Hw(e));
      }
      class P1 {
        constructor(t, n) {
          (this.urlSerializer = t), (this.urlTree = n);
        }
        noMatchError(t) {
          return new w(4002, !1);
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return x(r);
            if (o.numberOfChildren > 1 || !o.children[L])
              return ni(new w(4e3, !1));
            o = o.children[L];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new $r(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Object.entries(t).forEach(([o, i]) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[o] = n[a];
              } else r[o] = i;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Object.entries(n.children).forEach(([a, u]) => {
              s[a] = this.createSegmentGroup(t, u, r, o);
            }),
            new Z(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new w(4001, !1);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      const Od = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function F1(e, t, n, r, o) {
        const i = Pd(e, t, n);
        return i.matched
          ? ((r = (function o1(e, t) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = ul(e.providers, t, `Route: ${e.path}`)),
                e._injector ?? t
              );
            })(t, r)),
            (function R1(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? x(
                    o.map((s) => {
                      const a = Ur(s, e);
                      return vn(
                        (function w1(e) {
                          return e && vi(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(zr(), Bw())
                : x(!0);
            })(r, t, n).pipe(K((s) => (!0 === s ? i : { ...Od }))))
          : x(i);
      }
      function Pd(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Od }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || hP)(n, e, t);
        if (!o) return { ...Od };
        const i = {};
        Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
          i[a] = u.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function zw(e, t, n, r) {
        return n.length > 0 &&
          (function j1(e, t, n) {
            return n.some((r) => Ta(e, t, r) && wt(r) !== L);
          })(e, n, r)
          ? {
              segmentGroup: new Z(t, L1(r, new Z(n, e.children))),
              slicedSegments: [],
            }
          : 0 === n.length &&
            (function $1(e, t, n) {
              return n.some((r) => Ta(e, t, r));
            })(e, n, r)
          ? {
              segmentGroup: new Z(e.segments, k1(e, 0, n, r, e.children)),
              slicedSegments: n,
            }
          : { segmentGroup: new Z(e.segments, e.children), slicedSegments: n };
      }
      function k1(e, t, n, r, o) {
        const i = {};
        for (const s of r)
          if (Ta(e, n, s) && !o[wt(s)]) {
            const a = new Z([], {});
            i[wt(s)] = a;
          }
        return { ...o, ...i };
      }
      function L1(e, t) {
        const n = {};
        n[L] = t;
        for (const r of e)
          if ("" === r.path && wt(r) !== L) {
            const o = new Z([], {});
            n[wt(r)] = o;
          }
        return n;
      }
      function Ta(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      class U1 {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.configLoader = n),
            (this.rootComponentType = r),
            (this.config = o),
            (this.urlTree = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new P1(this.urlSerializer, this.urlTree));
        }
        noMatchError(t) {
          return new w(4002, !1);
        }
        recognize() {
          const t = zw(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            L
          ).pipe(
            kn((n) => {
              if (n instanceof Hw)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = n.urlTree),
                  this.match(n.urlTree)
                );
              throw n instanceof Ma ? this.noMatchError(n) : n;
            }),
            K((n) => {
              const r = new _a(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  L,
                  this.rootComponentType,
                  null,
                  {}
                ),
                o = new Yt(r, n),
                i = new xw("", o),
                s = (function OP(e, t, n = null, r = null) {
                  return ww(Dw(e), t, n, r);
                })(r, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (s.queryParams = this.urlTree.queryParams),
                (i.url = this.urlSerializer.serialize(s)),
                this.inheritParamsAndData(i._root),
                { state: i, tree: s }
              );
            })
          );
        }
        match(t) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t.root,
            L
          ).pipe(
            kn((r) => {
              throw r instanceof Ma ? this.noMatchError(r) : r;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Rw(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o, !0);
        }
        processChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return ye(o).pipe(
            ri((i) => {
              const s = r.children[i],
                a = (function u1(e, t) {
                  const n = e.filter((r) => wt(r) === t);
                  return n.push(...e.filter((r) => wt(r) !== t)), n;
                })(n, i);
              return this.processSegmentGroup(t, a, s, i);
            }),
            (function uP(e, t) {
              return fe(
                (function aP(e, t, n, r, o) {
                  return (i, s) => {
                    let a = n,
                      u = t,
                      c = 0;
                    i.subscribe(
                      he(
                        s,
                        (l) => {
                          const d = c++;
                          (u = a ? e(u, l, d) : ((a = !0), l)), r && s.next(u);
                        },
                        o &&
                          (() => {
                            a && s.next(u), s.complete();
                          })
                      )
                    );
                  };
                })(e, t, arguments.length >= 2, !0)
              );
            })((i, s) => (i.push(...s), i)),
            pa(null),
            (function cP(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? mn((o, i) => e(o, i, r)) : Jt,
                  md(1),
                  n ? pa(t) : sw(() => new ha())
                );
            })(),
            ve((i) => {
              if (null === i) return Gr(r);
              const s = Gw(i);
              return (
                (function z1(e) {
                  e.sort((t, n) =>
                    t.value.outlet === L
                      ? -1
                      : n.value.outlet === L
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(s),
                x(s)
              );
            })
          );
        }
        processSegment(t, n, r, o, i, s) {
          return ye(n).pipe(
            ri((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? t,
                n,
                a,
                r,
                o,
                i,
                s
              ).pipe(
                kn((u) => {
                  if (u instanceof Ma) return x(null);
                  throw u;
                })
              )
            ),
            Fn((a) => !!a),
            kn((a) => {
              if (Vw(a))
                return (function B1(e, t, n) {
                  return 0 === t.length && !e.children[n];
                })(r, o, i)
                  ? x([])
                  : Gr(r);
              throw a;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return (function V1(e, t, n, r) {
            return (
              !!(wt(e) === r || (r !== L && Ta(t, n, e))) &&
              ("**" === e.path || Pd(t, e, n).matched)
            );
          })(r, o, i, s)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, o, r, i, s, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s)
              : Gr(o)
            : Gr(o);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirects.applyRedirectCommands(
            [],
            r.redirectTo,
            {}
          );
          return r.redirectTo.startsWith("/")
            ? Uw(i)
            : this.applyRedirects.lineralizeSegments(r, i).pipe(
                ve((s) => {
                  const a = new Z(s, {});
                  return this.processSegment(t, n, a, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: c,
            positionalParamSegments: l,
          } = Pd(n, o, i);
          if (!a) return Gr(n);
          const d = this.applyRedirects.applyRedirectCommands(
            u,
            o.redirectTo,
            l
          );
          return o.redirectTo.startsWith("/")
            ? Uw(d)
            : this.applyRedirects
                .lineralizeSegments(o, d)
                .pipe(
                  ve((f) => this.processSegment(t, r, n, f.concat(c), s, !1))
                );
        }
        matchSegmentAgainstRoute(t, n, r, o, i, s) {
          let a;
          if ("**" === r.path) {
            const u = o.length > 0 ? uw(o).parameters : {};
            (a = x({
              snapshot: new _a(
                o,
                u,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                qw(r),
                wt(r),
                r.component ?? r._loadedComponent ?? null,
                r,
                Ww(r)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (n.children = {});
          } else
            a = F1(n, r, o, t).pipe(
              K(
                ({
                  matched: u,
                  consumedSegments: c,
                  remainingSegments: l,
                  parameters: d,
                }) =>
                  u
                    ? {
                        snapshot: new _a(
                          c,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          qw(r),
                          wt(r),
                          r.component ?? r._loadedComponent ?? null,
                          r,
                          Ww(r)
                        ),
                        consumedSegments: c,
                        remainingSegments: l,
                      }
                    : null
              )
            );
          return a.pipe(
            Et((u) =>
              null === u
                ? Gr(n)
                : this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                    Et(({ routes: c }) => {
                      const l = r._loadedInjector ?? t,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = u,
                        { segmentGroup: p, slicedSegments: g } = zw(n, f, h, c);
                      if (0 === g.length && p.hasChildren())
                        return this.processChildren(l, c, p).pipe(
                          K((D) => (null === D ? null : [new Yt(d, D)]))
                        );
                      if (0 === c.length && 0 === g.length)
                        return x([new Yt(d, [])]);
                      const y = wt(r) === i;
                      return this.processSegment(
                        l,
                        c,
                        p,
                        g,
                        y ? L : i,
                        !0
                      ).pipe(K((D) => [new Yt(d, D)]));
                    })
                  )
            )
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? x({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? x({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function N1(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? x(!0)
                    : x(
                        o.map((s) => {
                          const a = Ur(s, e);
                          return vn(
                            (function m1(e) {
                              return e && vi(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(zr(), Bw());
                })(t, n, r).pipe(
                  ve((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Se((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function O1(e) {
                          return ni(kw(!1, 3));
                        })()
                  )
                )
            : x({ routes: [], injector: t });
        }
      }
      function G1(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path;
      }
      function Gw(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!G1(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = Gw(r.children);
          t.push(new Yt(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function qw(e) {
        return e.data || {};
      }
      function Ww(e) {
        return e.resolve || {};
      }
      function Zw(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Fd(e) {
        return Et((t) => {
          const n = e(t);
          return n ? ye(n).pipe(K(() => t)) : x(t);
        });
      }
      const qr = new _("ROUTES");
      let kd = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = E(Py));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return x(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = vn(n.loadComponent()).pipe(
                K(Qw),
                Se((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                vd(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new iw(r, () => new ct()).pipe(gd());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return x({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = (function X1(e, t, n, r) {
                return vn(e.loadChildren()).pipe(
                  K(Qw),
                  ve((o) =>
                    o instanceof $v || Array.isArray(o)
                      ? x(o)
                      : ye(t.compileModuleAsync(o))
                  ),
                  K((o) => {
                    r && r(e);
                    let i,
                      s,
                      a = !1;
                    return (
                      Array.isArray(o)
                        ? ((s = o), !0)
                        : ((i = o.create(n).injector),
                          (s = i
                            .get(qr, [], { optional: !0, self: !0 })
                            .flat())),
                      { routes: s.map(xd), injector: i }
                    );
                  })
                );
              })(r, this.compiler, n, this.onLoadEndListener).pipe(
                vd(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new iw(i, () => new ct()).pipe(gd());
            return this.childrenLoaders.set(r, s), s;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function Qw(e) {
        return (function J1(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Aa = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.currentTransition = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new ct()),
              (this.transitionAbortSubject = new ct()),
              (this.configLoader = E(kd)),
              (this.environmentInjector = E(nt)),
              (this.urlSerializer = E(si)),
              (this.rootContexts = E(fi)),
              (this.inputBindingEnabled = null !== E(Ia, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => x(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new GP(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new zP(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n, r, o) {
            return (
              (this.transitions = new Xe({
                id: 0,
                currentUrlTree: r,
                currentRawUrl: r,
                currentBrowserUrl: r,
                extractedUrl: n.urlHandlingStrategy.extract(r),
                urlAfterRedirects: n.urlHandlingStrategy.extract(r),
                rawUrl: r,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: li,
                restoredState: null,
                currentSnapshot: o.snapshot,
                targetSnapshot: null,
                currentRouterState: o,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                mn((i) => 0 !== i.id),
                K((i) => ({
                  ...i,
                  extractedUrl: n.urlHandlingStrategy.extract(i.rawUrl),
                })),
                Et((i) => {
                  this.currentTransition = i;
                  let s = !1,
                    a = !1;
                  return x(i).pipe(
                    Se((u) => {
                      this.currentNavigation = {
                        id: u.id,
                        initialUrl: u.rawUrl,
                        extractedUrl: u.extractedUrl,
                        trigger: u.source,
                        extras: u.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Et((u) => {
                      const c = u.currentBrowserUrl.toString(),
                        l =
                          !n.navigated ||
                          u.extractedUrl.toString() !== c ||
                          c !== u.currentUrlTree.toString();
                      if (
                        !l &&
                        "reload" !==
                          (u.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const f = "";
                        return (
                          this.events.next(
                            new Vr(
                              u.id,
                              this.urlSerializer.serialize(u.rawUrl),
                              f,
                              0
                            )
                          ),
                          u.resolve(null),
                          Ct
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(u.rawUrl))
                        return x(u).pipe(
                          Et((f) => {
                            const h = this.transitions?.getValue();
                            return (
                              this.events.next(
                                new Ca(
                                  f.id,
                                  this.urlSerializer.serialize(f.extractedUrl),
                                  f.source,
                                  f.restoredState
                                )
                              ),
                              h !== this.transitions?.getValue()
                                ? Ct
                                : Promise.resolve(f)
                            );
                          }),
                          (function q1(e, t, n, r, o, i) {
                            return ve((s) =>
                              (function H1(e, t, n, r, o, i, s = "emptyOnly") {
                                return new U1(e, t, n, r, o, s, i).recognize();
                              })(e, t, n, r, s.extractedUrl, o, i).pipe(
                                K(({ state: a, tree: u }) => ({
                                  ...s,
                                  targetSnapshot: a,
                                  urlAfterRedirects: u,
                                }))
                              )
                            );
                          })(
                            this.environmentInjector,
                            this.configLoader,
                            this.rootComponentType,
                            n.config,
                            this.urlSerializer,
                            n.paramsInheritanceStrategy
                          ),
                          Se((f) => {
                            (i.targetSnapshot = f.targetSnapshot),
                              (i.urlAfterRedirects = f.urlAfterRedirects),
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: f.urlAfterRedirects,
                              });
                            const h = new Sw(
                              f.id,
                              this.urlSerializer.serialize(f.extractedUrl),
                              this.urlSerializer.serialize(f.urlAfterRedirects),
                              f.targetSnapshot
                            );
                            this.events.next(h);
                          })
                        );
                      if (
                        l &&
                        n.urlHandlingStrategy.shouldProcessUrl(u.currentRawUrl)
                      ) {
                        const {
                            id: f,
                            extractedUrl: h,
                            source: p,
                            restoredState: g,
                            extras: y,
                          } = u,
                          D = new Ca(f, this.urlSerializer.serialize(h), p, g);
                        this.events.next(D);
                        const m = Nw(0, this.rootComponentType).snapshot;
                        return (
                          (this.currentTransition = i =
                            {
                              ...u,
                              targetSnapshot: m,
                              urlAfterRedirects: h,
                              extras: {
                                ...y,
                                skipLocationChange: !1,
                                replaceUrl: !1,
                              },
                            }),
                          x(i)
                        );
                      }
                      {
                        const f = "";
                        return (
                          this.events.next(
                            new Vr(
                              u.id,
                              this.urlSerializer.serialize(u.extractedUrl),
                              f,
                              1
                            )
                          ),
                          u.resolve(null),
                          Ct
                        );
                      }
                    }),
                    Se((u) => {
                      const c = new VP(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot
                      );
                      this.events.next(c);
                    }),
                    K(
                      (u) => (
                        (this.currentTransition = i =
                          {
                            ...u,
                            guards: d1(
                              u.targetSnapshot,
                              u.currentSnapshot,
                              this.rootContexts
                            ),
                          }),
                        i
                      )
                    ),
                    (function E1(e, t) {
                      return ve((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? x({ ...n, guardsResult: !0 })
                          : (function _1(e, t, n, r) {
                              return ye(e).pipe(
                                ve((o) =>
                                  (function A1(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? x(
                                          i.map((a) => {
                                            const u = pi(t) ?? o,
                                              c = Ur(a, u);
                                            return vn(
                                              (function D1(e) {
                                                return e && vi(e.canDeactivate);
                                              })(c)
                                                ? c.canDeactivate(e, t, n, r)
                                                : u.runInContext(() =>
                                                    c(e, t, n, r)
                                                  )
                                            ).pipe(Fn());
                                          })
                                        ).pipe(zr())
                                      : x(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                Fn((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              ve((a) =>
                                a &&
                                (function g1(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function I1(e, t, n, r) {
                                      return ye(t).pipe(
                                        ri((o) =>
                                          pd(
                                            (function S1(e, t) {
                                              return (
                                                null !== e && t && t(new qP(e)),
                                                x(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function b1(e, t) {
                                              return (
                                                null !== e && t && t(new ZP(e)),
                                                x(!0)
                                              );
                                            })(o.route, r),
                                            (function T1(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function f1(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    ow(() =>
                                                      x(
                                                        s.guards.map((u) => {
                                                          const c =
                                                              pi(s.node) ?? n,
                                                            l = Ur(u, c);
                                                          return vn(
                                                            (function y1(e) {
                                                              return (
                                                                e &&
                                                                vi(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(l)
                                                              ? l.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : c.runInContext(
                                                                  () => l(r, e)
                                                                )
                                                          ).pipe(Fn());
                                                        })
                                                      ).pipe(zr())
                                                    )
                                                  );
                                              return x(i).pipe(zr());
                                            })(e, o.path, n),
                                            (function M1(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return x(!0);
                                              const o = r.map((i) =>
                                                ow(() => {
                                                  const s = pi(t) ?? n,
                                                    a = Ur(i, s);
                                                  return vn(
                                                    (function v1(e) {
                                                      return (
                                                        e && vi(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(Fn());
                                                })
                                              );
                                              return x(o).pipe(zr());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        Fn((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : x(a)
                              ),
                              K((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (u) => this.events.next(u)),
                    Se((u) => {
                      if (
                        ((i.guardsResult = u.guardsResult), jn(u.guardsResult))
                      )
                        throw Fw(0, u.guardsResult);
                      const c = new BP(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot,
                        !!u.guardsResult
                      );
                      this.events.next(c);
                    }),
                    mn(
                      (u) =>
                        !!u.guardsResult ||
                        (this.cancelNavigationTransition(u, "", 3), !1)
                    ),
                    Fd((u) => {
                      if (u.guards.canActivateChecks.length)
                        return x(u).pipe(
                          Se((c) => {
                            const l = new HP(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects),
                              c.targetSnapshot
                            );
                            this.events.next(l);
                          }),
                          Et((c) => {
                            let l = !1;
                            return x(c).pipe(
                              (function W1(e, t) {
                                return ve((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return x(n);
                                  let i = 0;
                                  return ye(o).pipe(
                                    ri((s) =>
                                      (function Z1(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !Zw(o) &&
                                            (i[oi] = o.title),
                                          (function Q1(e, t, n, r) {
                                            const o = (function Y1(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return x({});
                                            const i = {};
                                            return ye(o).pipe(
                                              ve((s) =>
                                                (function K1(e, t, n, r) {
                                                  const o = pi(t) ?? r,
                                                    i = Ur(e, o);
                                                  return vn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  Fn(),
                                                  Se((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              md(1),
                                              (function lP(e) {
                                                return K(() => e);
                                              })(i),
                                              kn((s) => (Vw(s) ? Ct : ni(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            K(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = Rw(e, n).resolve),
                                                o &&
                                                  Zw(o) &&
                                                  (e.data[oi] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    Se(() => i++),
                                    md(1),
                                    ve((s) => (i === o.length ? x(n) : Ct))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Se({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    this.cancelNavigationTransition(c, "", 2);
                                },
                              })
                            );
                          }),
                          Se((c) => {
                            const l = new UP(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects),
                              c.targetSnapshot
                            );
                            this.events.next(l);
                          })
                        );
                    }),
                    Fd((u) => {
                      const c = (l) => {
                        const d = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          d.push(
                            this.configLoader.loadComponent(l.routeConfig).pipe(
                              Se((f) => {
                                l.component = f;
                              }),
                              K(() => {})
                            )
                          );
                        for (const f of l.children) d.push(...c(f));
                        return d;
                      };
                      return hd(c(u.targetSnapshot.root)).pipe(pa(), Lr(1));
                    }),
                    Fd(() => this.afterPreactivation()),
                    K((u) => {
                      const c = (function e1(e, t, n) {
                        const r = hi(e, t._root, n ? n._root : void 0);
                        return new Aw(r, t);
                      })(
                        n.routeReuseStrategy,
                        u.targetSnapshot,
                        u.currentRouterState
                      );
                      return (
                        (this.currentTransition = i =
                          { ...u, targetRouterState: c }),
                        i
                      );
                    }),
                    Se(() => {
                      this.events.next(new _d());
                    }),
                    ((e, t, n, r) =>
                      K(
                        (o) => (
                          new l1(
                            t,
                            o.targetRouterState,
                            o.currentRouterState,
                            n,
                            r
                          ).activate(e),
                          o
                        )
                      ))(
                      this.rootContexts,
                      n.routeReuseStrategy,
                      (u) => this.events.next(u),
                      this.inputBindingEnabled
                    ),
                    Lr(1),
                    Se({
                      next: (u) => {
                        (s = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          this.events.next(
                            new yn(
                              u.id,
                              this.urlSerializer.serialize(u.extractedUrl),
                              this.urlSerializer.serialize(u.urlAfterRedirects)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            u.targetRouterState.snapshot
                          ),
                          u.resolve(!0);
                      },
                      complete: () => {
                        s = !0;
                      },
                    }),
                    (function dP(e) {
                      return fe((t, n) => {
                        lt(e).subscribe(he(n, () => n.complete(), Ra)),
                          !n.closed && t.subscribe(n);
                      });
                    })(
                      this.transitionAbortSubject.pipe(
                        Se((u) => {
                          throw u;
                        })
                      )
                    ),
                    vd(() => {
                      s || a || this.cancelNavigationTransition(i, "", 1),
                        this.currentNavigation?.id === i.id &&
                          (this.currentNavigation = null);
                    }),
                    kn((u) => {
                      if (((a = !0), Lw(u)))
                        this.events.next(
                          new di(
                            i.id,
                            this.urlSerializer.serialize(i.extractedUrl),
                            u.message,
                            u.cancellationCode
                          )
                        ),
                          (function r1(e) {
                            return Lw(e) && jn(e.url);
                          })(u)
                            ? this.events.next(new Id(u.url))
                            : i.resolve(!1);
                      else {
                        this.events.next(
                          new Ea(
                            i.id,
                            this.urlSerializer.serialize(i.extractedUrl),
                            u,
                            i.targetSnapshot ?? void 0
                          )
                        );
                        try {
                          i.resolve(n.errorHandler(u));
                        } catch (c) {
                          i.reject(c);
                        }
                      }
                      return Ct;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new di(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function Yw(e) {
        return e !== li;
      }
      let Kw = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === L));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[oi];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: function () {
                return E(eF);
              },
              providedIn: "root",
            }));
          }
          return e;
        })(),
        eF = (() => {
          class e extends Kw {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(JD));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        tF = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: function () {
                return E(rF);
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      class nF {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let rF = (() => {
        class e extends nF {
          static #e = (this.ɵfac = (function () {
            let n;
            return function (o) {
              return (
                n ||
                (n = (function kh(e) {
                  return kt(() => {
                    const t = e.prototype.constructor,
                      n = t[Lt] || Tu(t),
                      r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r; ) {
                      const i = o[Lt] || Tu(o);
                      if (i && i !== n) return i;
                      o = Object.getPrototypeOf(o);
                    }
                    return (i) => new i();
                  });
                })(e))
              )(o || e);
            };
          })());
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const Na = new _("", { providedIn: "root", factory: () => ({}) });
      let oF = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: function () {
                return E(iF);
              },
              providedIn: "root",
            }));
          }
          return e;
        })(),
        iF = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      var yi = (function (e) {
        return (
          (e[(e.COMPLETE = 0)] = "COMPLETE"),
          (e[(e.FAILED = 1)] = "FAILED"),
          (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
          e
        );
      })(yi || {});
      function Xw(e, t) {
        e.events
          .pipe(
            mn(
              (n) =>
                n instanceof yn ||
                n instanceof di ||
                n instanceof Ea ||
                n instanceof Vr
            ),
            K((n) =>
              n instanceof yn || n instanceof Vr
                ? yi.COMPLETE
                : n instanceof di && (0 === n.code || 1 === n.code)
                ? yi.REDIRECTING
                : yi.FAILED
            ),
            mn((n) => n !== yi.REDIRECTING),
            Lr(1)
          )
          .subscribe(() => {
            t();
          });
      }
      function sF(e) {
        throw e;
      }
      function aF(e, t, n) {
        return t.parse("/");
      }
      const uF = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        cF = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let ut = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return "computed" !== this.canceledNavigationResolution
              ? this.currentPageId
              : this.location.getState()?.ɵrouterPageId ?? this.currentPageId;
          }
          get events() {
            return this._events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = E(xy)),
              (this.isNgZoneEnabled = !1),
              (this._events = new ct()),
              (this.options = E(Na, { optional: !0 }) || {}),
              (this.pendingTasks = E(Oy)),
              (this.errorHandler = this.options.errorHandler || sF),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || aF),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = E(oF)),
              (this.routeReuseStrategy = E(tF)),
              (this.titleStrategy = E(Kw)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = E(qr, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = E(Aa)),
              (this.urlSerializer = E(si)),
              (this.location = E(Hl)),
              (this.componentInputBindingEnabled = !!E(Ia, { optional: !0 })),
              (this.eventsSubscription = new Ge()),
              (this.isNgZoneEnabled =
                E(ee) instanceof ee && ee.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new $r()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = Nw(0, null)),
              this.navigationTransitions
                .setupNavigations(this, this.currentUrlTree, this.routerState)
                .subscribe(
                  (n) => {
                    (this.lastSuccessfulId = n.id),
                      (this.currentPageId = this.browserPageId);
                  },
                  (n) => {
                    this.console.warn(`Unhandled Navigation Error: ${n}`);
                  }
                ),
              this.subscribeToNavigationEvents();
          }
          subscribeToNavigationEvents() {
            const n = this.navigationTransitions.events.subscribe((r) => {
              try {
                const { currentTransition: o } = this.navigationTransitions;
                if (null === o) return void (Jw(r) && this._events.next(r));
                if (r instanceof Ca)
                  Yw(o.source) && (this.browserUrlTree = o.extractedUrl);
                else if (r instanceof Vr) this.rawUrlTree = o.rawUrl;
                else if (r instanceof Sw) {
                  if ("eager" === this.urlUpdateStrategy) {
                    if (!o.extras.skipLocationChange) {
                      const i = this.urlHandlingStrategy.merge(
                        o.urlAfterRedirects,
                        o.rawUrl
                      );
                      this.setBrowserUrl(i, o);
                    }
                    this.browserUrlTree = o.urlAfterRedirects;
                  }
                } else if (r instanceof _d)
                  (this.currentUrlTree = o.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      o.urlAfterRedirects,
                      o.rawUrl
                    )),
                    (this.routerState = o.targetRouterState),
                    "deferred" === this.urlUpdateStrategy &&
                      (o.extras.skipLocationChange ||
                        this.setBrowserUrl(this.rawUrlTree, o),
                      (this.browserUrlTree = o.urlAfterRedirects));
                else if (r instanceof di)
                  0 !== r.code && 1 !== r.code && (this.navigated = !0),
                    (3 === r.code || 2 === r.code) && this.restoreHistory(o);
                else if (r instanceof Id) {
                  const i = this.urlHandlingStrategy.merge(
                      r.url,
                      o.currentRawUrl
                    ),
                    s = {
                      skipLocationChange: o.extras.skipLocationChange,
                      replaceUrl:
                        "eager" === this.urlUpdateStrategy || Yw(o.source),
                    };
                  this.scheduleNavigation(i, li, null, s, {
                    resolve: o.resolve,
                    reject: o.reject,
                    promise: o.promise,
                  });
                }
                r instanceof Ea && this.restoreHistory(o, !0),
                  r instanceof yn && (this.navigated = !0),
                  Jw(r) && this._events.next(r);
              } catch (o) {
                this.navigationTransitions.transitionAbortSubject.next(o);
              }
            });
            this.eventsSubscription.add(n);
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), li, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, r, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, r, o) {
            const i = { replaceUrl: !0 },
              s = o?.navigationId ? o : null;
            if (o) {
              const u = { ...o };
              delete u.navigationId,
                delete u.ɵrouterPageId,
                0 !== Object.keys(u).length && (i.state = u);
            }
            const a = this.parseUrl(n);
            this.scheduleNavigation(a, r, s, i);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(xd)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0),
              this.eventsSubscription.unsubscribe();
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              c = u ? this.currentUrlTree.fragment : s;
            let d,
              l = null;
            switch (a) {
              case "merge":
                l = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                l = this.currentUrlTree.queryParams;
                break;
              default:
                l = i || null;
            }
            null !== l && (l = this.removeEmptyProps(l));
            try {
              d = Dw(o ? o.snapshot : this.routerState.snapshot.root);
            } catch {
              ("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []),
                (d = this.currentUrlTree.root);
            }
            return ww(d, n, l, c ?? null);
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = jn(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, li, null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function lF(e) {
                for (let t = 0; t < e.length; t++)
                  if (null == e[t]) throw new w(4008, !1);
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...uF } : !1 === r ? { ...cF } : r), jn(n)))
              return lw(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return lw(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, u, c;
            s
              ? ((a = s.resolve), (u = s.reject), (c = s.promise))
              : (c = new Promise((d, f) => {
                  (a = d), (u = f);
                }));
            const l = this.pendingTasks.add();
            return (
              Xw(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(l));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                currentBrowserUrl: this.browserUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: u,
                promise: c,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              c.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n);
            if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
              const s = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId),
              };
              this.location.replaceState(o, "", s);
            } else {
              const i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId + 1),
              };
              this.location.go(o, "", i);
            }
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const i = this.currentPageId - this.browserPageId;
              0 !== i
                ? this.location.historyGo(i)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === i &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function Jw(e) {
        return !(e instanceof _d || e instanceof Id);
      }
      class eC {}
      let hF = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                mn((n) => n instanceof yn),
                ri(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = ul(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return ye(o).pipe($n());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : x(null);
              const i = o.pipe(
                ve((s) =>
                  null === s
                    ? x(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? ye([i, this.loader.loadComponent(r)]).pipe($n())
                : i;
            });
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(ut), b(Py), b(nt), b(eC), b(kd));
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const jd = new _("");
      let tC = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Ca
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof yn
                ? ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ))
                : n instanceof Vr &&
                  0 === n.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.url).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Mw &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new Mw(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            !(function Eg() {
              throw new Error("invalid");
            })();
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function Kt(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function rC() {
        const e = E(rt);
        return (t) => {
          const n = e.get(Pr);
          if (t !== n.components[0]) return;
          const r = e.get(ut),
            o = e.get(oC);
          1 === e.get($d) && r.initialNavigation(),
            e.get(iC, null, j.Optional)?.setUpPreloading(),
            e.get(jd, null, j.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const oC = new _("", { factory: () => new ct() }),
        $d = new _("", { providedIn: "root", factory: () => 1 }),
        iC = new _("");
      function vF(e) {
        return Kt(0, [
          { provide: iC, useExisting: hF },
          { provide: eC, useExisting: e },
        ]);
      }
      const sC = new _("ROUTER_FORROOT_GUARD"),
        DF = [
          Hl,
          { provide: si, useClass: yd },
          ut,
          fi,
          {
            provide: Hr,
            useFactory: function nC(e) {
              return e.routerState.root;
            },
            deps: [ut],
          },
          kd,
          [],
        ];
      function wF() {
        return new By("Router", ut);
      }
      let aC = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                DF,
                [],
                { provide: qr, multi: !0, useValue: n },
                {
                  provide: sC,
                  useFactory: IF,
                  deps: [[ut, new Qi(), new Yi()]],
                },
                { provide: Na, useValue: r || {} },
                r?.useHash
                  ? { provide: pn, useClass: yD }
                  : { provide: pn, useClass: vD },
                {
                  provide: jd,
                  useFactory: () => {
                    const e = E(Gx),
                      t = E(ee),
                      n = E(Na),
                      r = E(Aa),
                      o = E(si);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new tC(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? vF(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: By, multi: !0, useFactory: wF },
                r?.initialNavigation ? bF(r) : [],
                r?.bindToComponentInputs
                  ? Kt(8, [Pw, { provide: Ia, useExisting: Pw }]).ɵproviders
                  : [],
                [
                  { provide: uC, useFactory: rC },
                  { provide: Nl, multi: !0, useExisting: uC },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: qr, multi: !0, useValue: n }],
            };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(sC, 8));
          });
          static #t = (this.ɵmod = En({ type: e }));
          static #n = (this.ɵinj = tn({}));
        }
        return e;
      })();
      function IF(e) {
        return "guarded";
      }
      function bF(e) {
        return [
          "disabled" === e.initialNavigation
            ? Kt(3, [
                {
                  provide: El,
                  multi: !0,
                  useFactory: () => {
                    const t = E(ut);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: $d, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? Kt(2, [
                { provide: $d, useValue: 0 },
                {
                  provide: El,
                  multi: !0,
                  deps: [rt],
                  useFactory: (t) => {
                    const n = t.get(ER, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(ut),
                              i = t.get(oC);
                            Xw(o, () => {
                              r(!0);
                            }),
                              (t.get(Aa).afterPreactivation = () => (
                                r(!0), i.closed ? x(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const uC = new _(""),
        MF = [];
      let TF = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = En({ type: e }));
            static #n = (this.ɵinj = tn({ imports: [aC.forRoot(MF), aC] }));
          }
          return e;
        })(),
        AF = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = no({
              type: e,
              selectors: [["app-footer"]],
              decls: 2,
              vars: 0,
              template: function (r, o) {
                1 & r && ($o(0, "p"), Xc(1, "footer works!"), Vo());
              },
            }));
          }
          return e;
        })(),
        NF = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = no({
              type: e,
              selectors: [["app-header"]],
              decls: 2,
              vars: 0,
              template: function (r, o) {
                1 & r && ($o(0, "p"), Xc(1, "header works!"), Vo());
              },
            }));
          }
          return e;
        })(),
        RF = (() => {
          class e {
            constructor() {
              this.title = "usidiamond.github.io";
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = no({
              type: e,
              selectors: [["app-root"]],
              decls: 3,
              vars: 0,
              template: function (r, o) {
                1 & r &&
                  ks(0, "app-header")(1, "router-outlet")(2, "app-footer");
              },
              dependencies: [Nd, AF, NF],
            }));
          }
          return e;
        })(),
        xF = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = En({ type: e, bootstrap: [RF] }));
            static #n = (this.ɵinj = tn({
              providers: [{ provide: pn, useClass: yD }],
              imports: [$O, TF],
            }));
          }
          return e;
        })();
      LO()
        .bootstrapModule(xF)
        .catch((e) => console.error(e));
    },
  },
  (Q) => {
    Q((Q.s = 663));
  },
]);
