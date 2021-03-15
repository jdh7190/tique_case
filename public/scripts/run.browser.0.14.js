! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e(require("bsv")) : "function" == typeof define && define.amd ? define(["bsv"], e) : "object" == typeof exports ? exports.Run = e(require("bsv")) : t.Run = e(t.bsv)
}(window, (function(__WEBPACK_EXTERNAL_MODULE__9__) {
    return function(t) {
        var e = {};

        function n(r) {
            if (e[r]) return e[r].exports;
            var o = e[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }
        return n.m = t, n.c = e, n.d = function(t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: r
            })
        }, n.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "u", {
                value: !0
            })
        }, n.t = function(t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.u) return t;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var o in t) n.d(r, o, function(e) {
                    return t[e]
                }.bind(null, o));
            return r
        }, n.n = function(t) {
            var e = t && t.u ? function() {
                return t.default
            } : function() {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "", n(n.s = 57)
    }([function(t, e, n) {
        const {
            InternalError,
            TimeoutError
        } = n(4), r = n(43), {
            g: o
        } = n(7), i = new WeakSet, s = new WeakSet, c = new WeakSet, a = ["toString", "upgrade", "sync", "destroy", "auth", "load", "init"], u = ["sync", "interactive"], h = ["interactive"], f = [...a, "deps"], l = [...u, "init"], p = [...h, "init"];

        function d() {
            const t = n(42);
            if (!t._) throw new Error("Run instance not active");
            return t._
        }

        function w(t) {
            return o((() => {
                switch (typeof t) {
                    case "string":
                        return `"${t.length>20?t.slice(0,20)+"…":t}"`;
                    case "object": {
                        if (!t) return "null";
                        if (!t.constructor.name) return "[anonymous object]";
                        const Jig = n(5),
                            Berry = n(12);
                        return `[${t instanceof Jig?"jig":t instanceof Berry?"berry":"object"} ${t.constructor.name}]`
                    }
                    case "function": {
                        let e = null;
                        const Code = n(1);
                        if (t instanceof Code) e = Code.prototype.toString.apply(t);
                        else {
                            e = "function" == typeof t.toString && !t.toString.toString().startsWith("class") ? t.toString() : Function.prototype.toString.apply(t)
                        }
                        if (/^\(/.test(e) || /^function\s*\(/.test(e) || /^[a-zA-Z0-9_$]+\s*=>/.test(e)) return "[anonymous function]";
                        return /^class\s*{/.test(e) ? "[anonymous class]" : t.name
                    }
                    case "undefined":
                        return "undefined";
                    default:
                        return t.toString()
                }
            }))
        }

        function y(t) {
            return "object" == typeof t && !!t && 2 === A(t)
        }

        function b(t) {
            return Array.isArray(t) && 3 === A(t)
        }

        function g(t) {
            const e = n(8),
                r = e.P;
            return (t instanceof e.O.Set || t instanceof r.Set) && 3 === A(t)
        }

        function _(t) {
            const e = n(8),
                r = e.P;
            return (t instanceof e.O.Map || t instanceof r.Map) && 3 === A(t)
        }

        function m(t) {
            const e = n(8),
                r = e.P;
            return (t instanceof e.O.Uint8Array || t instanceof r.Uint8Array) && 4 === A(t)
        }

        function E(t) {
            if ("object" != typeof t || !t) return !1;
            const Code = n(1);
            if (!(t.constructor instanceof Code)) return !1;
            if (t instanceof n(5)) return !1;
            return !(t instanceof n(12))
        }

        function v(t) {
            const e = n(8);
            return !!e.$.has(t) || !!e.S.has(t)
        }

        function P(t) {
            if (void 0 === t) return !0;
            if ("boolean" == typeof t) return !0;
            if ("number" == typeof t) return !0;
            if ("string" == typeof t) return !0;
            if (null === t) return !0;
            if (v(t)) return !1;
            if (y(t)) return !0;
            if (b(t)) return !0;
            if (g(t)) return !0;
            if (_(t)) return !0;
            if (m(t)) return !0;
            if (E(t)) return !0;
            return t instanceof n(6)
        }
        const O = /^class\s*{/,
            S = /^class\s+(extends)?\s+\S+\s*{/,
            $ = /^function\s*\(/;

        function A(t) {
            if (!t) return 0;
            let e = 0;
            do {
                e++, t = Object.getPrototypeOf(t)
            } while (t);
            return e
        }

        function x(t, e) {
            const Creation = n(6),
                {
                    A: r
                } = n(11);
            return t instanceof Creation && (e instanceof Creation && o((() => {
                if (t === e) return !0;
                if (r(t.origin).ae) return !1;
                if (r(e.origin).ae) return !1;
                if (t.origin !== e.origin) return !1;
                if (t.location !== e.location) {
                    const n = `${w(t)}: ${t.location}`,
                        r = `${w(e)}: ${e.location}`;
                    throw new Error(`Inconsistent worldview\n\n${n}\n${r}`)
                }
                return !0
            })))
        }
        const I = (t, e) => t.some((t => x(t, e)));

        function R(t, e = "limit") {
            if (null === t) return Number.MAX_VALUE;
            if (-1 === t) return Number.MAX_VALUE;
            if (t === 1 / 0) return Number.MAX_VALUE;
            if ("number" != typeof t || t < 0) throw new Error(`Invalid ${e}: ${w(t)}`);
            return t
        }
        const T = r(j);

        function j(t, e) {
            if (typeof t != typeof e) return "symbol" == typeof t ? 1 : -1;
            "symbol" == typeof t && (t = t.toString()), "symbol" == typeof e && (e = e.toString());
            const n = parseInt(t),
                r = parseInt(e),
                o = n.toString() === t,
                i = r.toString() === e;
            return o && !i ? -1 : i && !o ? 1 : o && i ? n - r : t < e ? -1 : e < t ? 1 : 0
        }
        t.exports = {
            I: i,
            R: s,
            C: c,
            j: ["encryption", "blockhash", "blocktime", "blockheight", "latest", "recent", "mustBeLatest", "mustBeRecent", "checkForUpdates", "recover", "replicate", "makeBackup", "restricts", "delegate", "consume", "eject", "armored", "armoured"],
            gu: a,
            _u: u,
            mu: h,
            F: f,
            D: l,
            M: p,
            B: d,
            L: function(t) {
                if (!t) throw new InternalError("assert failed")
            },
            G: function(t) {
                return t.startsWith("main") ? "mainnet" : "testnet"
            },
            V: function(t) {
                if ("function" != typeof t) return;
                const e = n(8),
                    Code = n(1),
                    r = e.P.Object,
                    o = e.O.Object,
                    i = Object.getPrototypeOf(t);
                return i !== o.getPrototypeOf(o) && i !== r.getPrototypeOf(r) && i !== Code.prototype ? i : void 0
            },
            J: function(t) {
                const e = t.match(/^\s*class\s+[a-zA-Z0-9_$]+\s+extends\s+([a-zA-Z0-9_$]+)\s*{/);
                return e && e[1]
            },
            W: function(t, B) {
                for (; t;)
                    if ((t = Object.getPrototypeOf(t)) === B) return !0;
                return !1
            },
            Y: w,
            H: function(t, e) {
                const n = Object.getPrototypeOf(e);
                if (n.prototype) {
                    const r = /^class\s+[a-zA-Z0-9_$]+\s+extends\s+[a-zA-Z0-9_.$]+\s*{/;
                    return t.replace(r, `class ${e.name} extends ${n.name} {`)
                }
                const r = t.match(/^([a-zA-Z0-9_$]+)\s*\(/);
                return r && "function" !== r[1] ? `function ${t}` : t
            },
            K: function(t) {
                const e = t.match(/^(function\s+)([a-zA-Z0-9$_]+)(\s*)\((.*)/ms);
                if (e) return `${e[1]}${e[3]}(${e[4]}`;
                const n = t.match(/^(class\s+)([a-zA-Z0-9$_]+)(\s*){(.*)/ms);
                if (n) return `${n[1]}${n[3]}{${n[4]}`;
                const r = t.match(/^(class\s+)([a-zA-Z0-9$_]+)(\s*)extends(.*)/ms);
                if (r) return `${r[1]}${r[3]}extends${r[4]}`;
                throw new Error(`Bad source code: ${t}`)
            },
            q: function(t, e) {
                if (n(8).Z.includes(e)) return t;
                const r = t.match(/^(function\s)(.*)/ms);
                if (r) return `${r[1]}${e}${r[2]}`;
                const o = t.match(/^(class\s)(.*)/ms);
                if (o) return `${o[1]}${e}${o[2]}`;
                throw new Error(`Bad source code: ${t}`)
            },
            X: y,
            tt: b,
            et: g,
            nt: _,
            rt: m,
            ot: E,
            it: function(t) {
                return void 0 !== t
            },
            st: function(t) {
                return 0 === t && 1 / t == -1 / 0
            },
            ct: v,
            at: function(t) {
                const {
                    ut: e
                } = n(13);
                let r = !0;
                try {
                    o((() => e(t, (t => {
                        r = r && P(t)
                    }))))
                } catch (t) {}
                return r
            },
            ht: P,
            ft: function(t) {
                if ("function" != typeof t) return !1;
                if (!t.name) return !0;
                const e = t.toString();
                return !e.startsWith("class") && !e.startsWith("function") || (O.test(e) || S.test(e) || $.test(e))
            },
            lt: A,
            dt: function(t, e) {
                if (!t || "function" != typeof t && "object" != typeof t) return;
                const n = Object.getOwnPropertyDescriptor(t, e);
                return n && n.value
            },
            wt: function(t, e) {
                return !(!t || "function" != typeof t && "object" != typeof t) && ("string" == typeof e ? Object.getOwnPropertyNames(t).includes(e) : "symbol" == typeof e ? Object.getOwnPropertySymbols(t).includes(e) : void 0)
            },
            yt: function(t, e, n) {
                let r = Object.getOwnPropertyDescriptor(t, e);
                (!r || r.get || r.set) && (r = {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), r.value = n, Object.defineProperty(t, e, r)
            },
            gt: function(t, e, n) {
                Object.defineProperty(t, e, {
                    get: n,
                    configurable: !0,
                    enumerable: !0
                })
            },
            bt: function(t) {
                return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t)).filter((e => Object.getOwnPropertyDescriptor(t, e).get))
            },
            _t: function(t) {
                return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t)).filter((t => "constructor" !== t)).filter((e => "function" == typeof Object.getOwnPropertyDescriptor(t, e).value))
            },
            Et: x,
            Pt: I,
            Ot: function(t, e) {
                return t.concat(e.filter((e => !I(t, e))))
            },
            vt: function(t, e) {
                return t.filter((t => !I(e, t)))
            },
            $t: R,
            St: class {
                constructor(t, e = d().At) {
                    this.xt = new Date, this.It = t, this.At = e
                }
                Rt() {
                    if (new Date - this.xt > R(this.At, "timeout")) throw new TimeoutError(`${this.It} timeout`)
                }
            },
            Ct: T,
            jt: function(t) {
                return Object.keys(t).sort(j)
            },
            Tt: j
        }
    }, function(t, e, n) {
        class CodeDeps {
            static get kt() {
                return n(17)
            }
            static get Nt() {
                return n(3)
            }
            static get Ut() {
                return n(2)
            }
            static get Ft() {
                return n(0)
            }
            static get Dt() {
                return n(10)
            }
            static get g() {
                return n(7).g
            }
            static get Mt() {
                return n(48)
            }
            static get Bt() {
                return "Code"
            }
            static get Lt() {
                return n(25)
            }
        }
        class Code {
            constructor() {
                throw new Error("Cannot instantiate Code")
            }
            toString() {
                const t = CodeDeps.Nt,
                    e = CodeDeps.g,
                    {
                        L: n
                    } = CodeDeps.Ft,
                    r = t.Gt(this);
                if (!r) return e((() => this.toString()));
                const o = r.Vt,
                    i = r.Jt;
                return n(i), r.Wt ? i.startsWith("class") ? `class ${o.name} { [native code] }` : `function ${o.name}() { [native code] }` : i
            }
            sync(t = {}) {
                const e = CodeDeps.Nt,
                    n = CodeDeps.Ut,
                    r = CodeDeps.Mt,
                    o = CodeDeps.Bt,
                    {
                        Y: i
                    } = CodeDeps.Ft,
                    s = CodeDeps.Lt;
                if (n.zt && n.Yt(o, "Sync", i(this)), s.Ht) throw new Error("sync disabled during atomic update");
                const c = e.Gt(this);
                if (!c) throw new Error("sync unavailable");
                if (!c.Wt) return r(this, t).then((() => this))
            }
            upgrade(t) {
                return CodeDeps.Nt.Kt(this, t), this
            }
            auth() {
                const t = CodeDeps.kt,
                    e = CodeDeps.Nt,
                    {
                        Y: n,
                        Pt: r
                    } = CodeDeps.Ft,
                    o = CodeDeps.Dt,
                    i = CodeDeps.Ut,
                    s = CodeDeps.Bt;
                i.zt && i.Yt(s, "Auth", n(this));
                const c = e.Gt(this);
                if (!c) throw new Error("auth unavailable on non-jigs");
                if (c.Wt) throw new Error("auth unavailable on native jigs");
                if (r(o.Zt.qt, this)) throw new Error("auth unavailable on new jigs");
                return t.Qt(this), this
            }
            destroy() {
                const t = CodeDeps.kt,
                    e = CodeDeps.Nt,
                    n = CodeDeps.Ut,
                    {
                        Y: r
                    } = CodeDeps.Ft,
                    o = CodeDeps.Bt;
                n.zt && n.Yt(o, "Destroy", r(this));
                const i = e.Gt(this);
                if (!i || i.Wt) throw new Error("destroy unavailable");
                return t.Xt(this), this
            } [Symbol.hasInstance](t) {
                const e = CodeDeps.Nt,
                    n = CodeDeps.g;
                if ("object" != typeof t || !t) return !1;
                const r = e.te(this);
                return !!r && n((() => {
                    let e = Object.getPrototypeOf(t);
                    for (; e;) {
                        if (e.constructor.origin && e.constructor.origin === r.origin) return !0;
                        e = Object.getPrototypeOf(e)
                    }
                    return !1
                }))
            }
            static[Symbol.hasInstance](t) {
                return CodeDeps.Ft.R.has(t)
            }
        }
        Code.deps = {
            CodeDeps
        }, Code.sealed = !0, Code.toString();
        const r = CodeDeps.Nt.ee();
        CodeDeps.Nt.Gt(r).ne(Code, !1), t.exports = r
    }, function(t, e, n) {
        const {
            gt: r
        } = n(0), o = {};

        function i(t, e, ...n) {
            o.re && o.re[t] && "function" == typeof o.re[t] && o.re[t]((new Date).toISOString(), t.toUpperCase(), `[${e}]`, ...n)
        }
        o.oe = {
            warn: console.warn,
            error: console.error
        }, o.re = o.oe, o.ie = (...t) => i("info", ...t), o.ce = (...t) => i("warn", ...t), o.ae = (...t) => i("error", ...t), o.Yt = (...t) => i("debug", ...t);
        const [s, c, a, u] = Object.keys({
            ue: 1,
            he: 2,
            fe: 3,
            zt: 4
        });
        r(o, s, (() => o.re && o.re.info && "function" == typeof o.re.info)), r(o, c, (() => o.re && o.re.warn && "function" == typeof o.re.warn)), r(o, a, (() => o.re && o.re.error && "function" == typeof o.re.error)), r(o, u, (() => o.re && o.re.debug && "function" == typeof o.re.debug)), t.exports = o
    }, function(t, e, n) {
        (function(e) {
            const {
                Y: r,
                B: o,
                V: i,
                ft: s,
                it: c,
                Et: a,
                R: u,
                X: h,
                wt: f,
                yt: l,
                L: p,
                W: d,
                q: w,
                j: y,
                gu: b,
                _u: g
            } = n(0), {
                le: _
            } = n(27), m = n(45), E = n(2), {
                pe: v,
                ut: P
            } = n(13), O = n(11), {
                g: S
            } = n(7), {
                de: $,
                A,
                we: x,
                ye: I,
                ge: R
            } = O, T = n(20), j = n(8), C = n(21), {
                ArgumentError,
                StateError
            } = n(4), k = j.P, N = "Editor", U = new WeakMap, M = {}, F = new Map, D = {};
            class L {
                be(t, e) {
                    this._e = void 0, this.Vt = e, this.me = t, this.Ee = void 0, this.Jt = void 0, this.Pe = !1, this.Oe = !1, this.ve = !1, this.$e = "";
                    try {
                        this.$e = o().Se().network
                    } catch (t) {}
                    this.Wt = void 0, this.Ae = !1
                }
                xe(t, e = !0, o = [], i) {
                    const Code = n(1);
                    if (E.zt && E.Yt(N, "Install", r(t)), this.Pe) return p(t === this._e || t === this.me), this.Ie();
                    p(!this.Wt);
                    const s = m.Re(this.Vt);
                    M[this.$e] = M[this.$e] || new Map, M[this.$e].delete(this._e), e && M[this.$e].set(t, this.me);
                    try {
                        this.Ce(t, e, o), this.je(), this.Te(this.Oe ? s : null), this._e = t, this.Ee = t.name, this.Jt = i || w(this.Vt.toString(), this.Ee), this.ve = e, this.Pe = !1, this.Oe = !0, this.Wt = !1, this.Ae = !1, f(t, "presets") && f(t.presets, this.$e) && f(t.presets[this.$e], "location") && (S((() => P(this.me, (t => {
                            if (t instanceof Code && t !== this.me && A(t.location).wu) throw new ArgumentError(`${r(t)} must have presets`)
                        })))), this.ke(this._e.presets[this.$e]))
                    } catch (e) {
                        throw M[this.$e].delete(t), this.local && M[this.$e].set(this._e, this.me), m.Ne(this.Vt, s), e
                    }
                }
                Ue() {
                    if (this.Wt) throw new StateError("Cannot uninstall native code");
                    this.Oe && (M[this.$e].delete(this._e), this.Oe = !1), this.Pe && (F.delete(this._e), this.Pe = !1), this._e && ($.forEach((t => {
                        delete this._e[t]
                    })), delete this._e.presets), f(this._e, Symbol.hasInstance) && delete this._e[Symbol.hasInstance], this._e = void 0, this.ve = !1
                }
                Fe(t) {
                    if (this.Pe) return;
                    let e = !0;
                    try {
                        o()
                    } catch (t) {
                        e = !1
                    }
                    if (e) this.xe(t);
                    else {
                        if (E.zt && E.Yt(N, "Preinstall", r(t)), this.Oe || this.Wt) throw new Error(`Cannot preinstall ${r(t)}`);
                        F.set(t, this.me);
                        try {
                            this.Ce(t, !0), this._e = t, this.Ee = t.name, this.Jt = w(this.Vt.toString(), this.Ee), this.ve = !0, this.Pe = !0, this.Oe = !1, this.Wt = !1, this.Ae = !1
                        } catch (e) {
                            throw F.delete(t), e
                        }
                    }
                }
                Ie() {
                    if (this.Pe) {
                        E.zt && E.Yt(N, "Postinstall", r(this._e)), this.$e = o().Se().network;
                        try {
                            F.delete(this._e), M[this.$e] = M[this.$e] || new Map, M[this.$e].set(this._e, this.me), this.je(), this.Te(), this.Pe = !1, this.Oe = !0;
                            const Code = n(1),
                                t = t => {
                                    t instanceof Code && L.Gt(t).Ie()
                                };
                            S((() => P(this.me, t)))
                        } catch (t) {
                            throw F.set(this._e, this.me), M[this.$e].delete(this._e), this.$e = "", t
                        }
                    }
                }
                Ce(t, e = !1, o = []) {
                    const i = e ? q(this.me, t, e, o)[0] : t,
                        Jig = n(5),
                        Berry = n(12);
                    let s = null;
                    if (d(t, Jig)) s = T.De();
                    else {
                        const e = t.toString().startsWith("class");
                        s = T.Me(e)
                    }
                    if (C.Le(this.me).Be = s, this.Oe) {
                        if (d(this._e, Jig) !== d(t, Jig)) throw new StateError("Cannot change staticness of code in upgrade")
                    }
                    if (this.Oe && d(this._e, Berry)) throw new StateError(`Cannot upgrade from berry class: ${r(this._e)}`);
                    if (this.Oe && d(t, Berry)) throw new StateError(`Cannot upgrade to berry class: ${r(t)}`);
                    if (Q(i, this.me), !d(t, Jig) && !d(t, Berry) && !f(t, Symbol.hasInstance)) {
                        const e = {
                                configurable: !0,
                                enumerable: !0,
                                writable: !1
                            },
                            Code = n(1);
                        e.value = Code.prototype[Symbol.hasInstance], Object.defineProperty(t, Symbol.hasInstance, e)
                    }
                    m.Ne(this.Vt, i)
                }
                je() {
                    S((() => {
                        if (f(this.me, "presets")) {
                            const t = this.me.presets[this.$e];
                            Object.getOwnPropertyNames(t || {}).forEach((e => l(this.me, e, t[e]))), delete this.me.presets
                        }
                    }))
                }
                Te(t) {
                    S((() => {
                        t ? $.forEach((e => l(this.me, e, t[e]))) : f(this.me, "location") || O.Ge(this.me)
                    }))
                }
                ne(t, n = !1) {
                    E.zt && E.Yt(N, "Install native", r(t)), p(void 0 === this.Wt), p(!i(t)), p(!(t.name in D));
                    const [o, s] = j.Ve(t, {}, !0, !1);
                    Object.assign(s, t.deps);
                    const a = t.sealed,
                        u = t.upgradable,
                        h = t.interactive;
                    e.env.COVER && Object.keys(o).forEach((t => {
                        delete o[t]
                    })), c(a) && l(o, "sealed", a), c(u) && l(o, "upgradable", u), c(h) && l(o, "interactive", h), Q(o, this.me), m.Ne(this.Vt, o), o.origin = `native://${t.name}`, o.location = `native://${t.name}`, o.nonce = 0, o.owner = null, o.satoshis = 0, D[t.name] = this.me, C.Le(this.me).Be = T.Je(), this._e = t, this.Ee = t.name, this.Jt = w(this.Vt.toString(), this.Ee), this.Pe = !1, this.Oe = !0, this.ve = !0, this.Wt = !0, this.Ae = n
                }
                We() {
                    E.ue && E.ie(N, "Deploy", r(this.me)), this.Wt || (this.Ie(), tt(this.me))
                }
                ke(t) {
                    if (!this.ve) return;
                    const e = this._e;
                    f(e, "presets") || l(e, "presets", {}), f(e.presets, this.$e) || l(e.presets, this.$e, {}), S((() => {
                        $.forEach((n => {
                            const r = e.presets[this.$e];
                            f(r, n) || l(r, n, t[n]), f(e, n) || l(e, n, t[n])
                        }))
                    }))
                }
                ze() {
                    return {
                        me: this.me,
                        _e: this._e,
                        Ee: this.Ee,
                        Jt: this.Jt,
                        Ye: m.Re(this.Vt)
                    }
                }
                He(t) {
                    p(this.me === t.me), this._e = t._e, this.Ee = t.Ee, this.Jt = t.Jt, m.Ne(this.Vt, t.Ye)
                }
            }

            function G(t, e = !0, r = []) {
                p(!nt(t));
                const o = new m,
                    i = new L,
                    s = new(n(18))(o);
                return m.Ke(o, s), i.be(s, o), U.set(s, i), u.add(s), t && i.xe(t, e, r), r.push(s), s
            }

            function V(t, e = !0, n = []) {
                return nt(t) || G(t, e, n)
            }

            function W(t) {
                const Jig = n(5),
                    Berry = n(12);
                if ("function" != typeof t) throw new ArgumentError(`Only functions and classes are supported: ${r(t)}`);
                if (H(t), d(t, Jig) && function(t) {
                        const e = Object.getOwnPropertyNames(t.prototype),
                            r = y.find((t => e.includes(t))) || g.find((t => e.includes(t))) || $.find((t => e.includes(t)));
                        if (r) throw new ArgumentError(`Must not have any reserved jig words: ${r}`);
                        const Jig = n(5),
                            o = [];
                        let i = t;
                        for (; i !== Jig;) o.push(i), i = Object.getPrototypeOf(i);
                        const s = /\s+constructor\s*\(/;
                        if (o.some((t => s.test(t.toString())))) throw new Error("Jig must use init() instead of constructor()")
                    }(t), d(t, Berry) && function(t) {
                        const e = Object.getOwnPropertyNames(t.prototype),
                            r = y.find((t => e.includes(t))) || $.find((t => e.includes(t)));
                        if (r) throw new ArgumentError(`Must not have any reserved berry words: ${r}`);
                        const Berry = n(12),
                            o = [];
                        let i = t;
                        for (; i !== Berry;) o.push(i), i = Object.getPrototypeOf(i);
                        const s = /\s+constructor\s*\(/;
                        if (o.some((t => s.test(t.toString())))) throw new Error("Berry must use init() instead of constructor()")
                    }(t), t.prototype && t.prototype.constructor !== t) throw new ArgumentError(`Prototypal inheritance not supported: ${r(t)}`);
                if (s(t)) throw new ArgumentError(`Anonymous types not supported: ${r(t)}`);
                if (-1 !== t.toString().indexOf("[native code]")) throw new ArgumentError(`Cannot install intrinsic: ${r(t)}`);
                ! function(t) {
                    S((() => {
                        if (Object.getOwnPropertySymbols(t).length || Object.getOwnPropertySymbols(t.prototype).length) throw new StateError("Symbol methods not supported")
                    }))
                }(t),
                function(t) {
                    const e = t => {
                        if ("get" in t || "set" in t) throw new StateError("Getters and setters not supported")
                    };
                    S((() => {
                        Object.getOwnPropertyNames(t).map((e => Object.getOwnPropertyDescriptor(t, e))).forEach((t => e(t))), Object.getOwnPropertyNames(t.prototype).map((e => Object.getOwnPropertyDescriptor(t.prototype, e))).forEach((t => e(t)))
                    }))
                }(t)
            }

            function J(t) {
                f(t, "sealed") && z(t.sealed), f(t, "upgradable") && Y(t.upgradable), f(t, "interactive") && K(t.interactive)
            }

            function z(t) {
                if (!0 !== t && !1 !== t && "owner" !== t) throw new ArgumentError(`Invalid sealed option: ${t}`)
            }

            function Y(t) {
                if (!0 !== t && !1 !== t) throw new ArgumentError(`Invalid upgradable option: ${t}`)
            }

            function K(t) {
                if (!0 !== t && !1 !== t) throw new ArgumentError(`Invalid interactive option: ${t}`)
            }

            function H(t) {
                const e = Object.getOwnPropertyNames(t),
                    n = y.find((t => e.includes(t))) || b.find((t => e.includes(t)));
                if (n) throw new ArgumentError(`Must not have any reserved words: ${n}`)
            }

            function q(t, e, o = !1, s) {
                W(e),
                    function(t, e) {
                        if (!e.Oe) return;
                        if (e.Wt) throw new StateError("Cannot upgrade native code");
                        if (t instanceof n(1)) throw new ArgumentError("Cannot upgrade to a code jig");
                        if (f(t, "presets")) {
                            const n = t.presets[e.$e],
                                r = t => {
                                    if (t in n) throw new StateError("Preset bindings not supported for upgrades")
                                };
                            O.de.forEach((t => r(t)))
                        }
                        if (S((() => e.me.origin)) === O.qe) throw new StateError("Cannot upgrade undeployed code")
                    }(e, U.get(t));
                const u = i(e),
                    p = u && V(u, o, s);
                if (p) {
                    if (!0 === p.sealed) throw new ArgumentError(`${r(p)} is sealed`);
                    L.Gt(p).Ie()
                }! function(t, e) {
                    if (f(t, "deps")) {
                        if (!h(t.deps)) throw new ArgumentError("deps must be a basic object");
                        if (e) {
                            const n = t.deps[e.name],
                                r = nt(n);
                            if (n && !a(r, e)) throw new ArgumentError("Parent dependency mismatch")
                        }
                        if (t.name in t.deps) throw new ArgumentError("Illegal dependency")
                    }
                }(e, p),
                function(t) {
                    if (!f(t, "presets")) return;
                    const e = t.presets;
                    if (!h(e)) throw new ArgumentError("presets must be a basic object");
                    for (const t of Object.keys(e)) {
                        const n = e[t];
                        if (!h(n)) throw new ArgumentError(`Presets for ${t} network must be an object`);
                        const r = $.some((t => c(n[t]))),
                            o = $.find((t => !c(n[t])));
                        if (r && o) throw new ArgumentError(`${t} presets not fully defined: ${o} missing`);
                        if (r) {
                            const t = A(n.location);
                            if (!t.pu || !c(t.fu) && !c(t.lu) || c(t.du)) throw new ArgumentError("Bad location");
                            const e = A(n.origin);
                            if (!e.pu || !c(e.fu) && !c(e.lu) || c(e.du)) throw new ArgumentError("Bad origin");
                            x(n.nonce), I(n.owner, !0), R(n.satoshis)
                        }
                        if ("deps" in n) throw new ArgumentError(`${t} presets must not contain deps`);
                        if ("presets" in n) throw new ArgumentError(`${t} presets must not contain presets`);
                        H(n), J(n)
                    }
                }(e), J(e),
                    function(t) {
                        const e = Object.getOwnPropertyNames(t),
                            n = $.find((t => e.includes(t)));
                        if (n) throw new ArgumentError(`Must not have any bindings: ${n}`)
                    }(e);
                const d = {};
                p && (d[p.name] = p);
                const [w, y] = j.Ve(e, d, !1, !0);
                Object.defineProperty(w, "name", {
                    value: e.name,
                    configurable: !0
                });
                const b = Object.assign({}, e),
                    g = v(b, k, (t => "function" == typeof t ? V(t, o, s) : void 0));
                return _(g), "deps" in g || (g.deps = new k.Object), p && (g.deps[p.name] = p), Object.keys(g.deps || {}).forEach((e => {
                    Object.defineProperty(y, e, {
                        get: () => t.deps[e],
                        set: n => {
                            t.deps[e] = n
                        },
                        configurable: !0,
                        enumerable: !0
                    })
                })), l(y, e.name, t), g.deps = Z(t, y, g.deps), Object.keys(g).forEach((t => l(w, t, g[t]))), X(y), [w, y]
            }

            function Z(t, e, n) {
                return new k.Proxy(n, {
                    defineProperty: (n, r, o) => {
                        const i = Reflect.defineProperty(n, r, o);
                        return Object.defineProperty(e, r, {
                            get: () => t.deps[r],
                            set: e => {
                                t.deps[r] = e
                            },
                            configurable: !0,
                            enumerable: !0
                        }), i
                    },
                    deleteProperty: (t, n) => {
                        const r = Reflect.deleteProperty(t, n);
                        return Reflect.deleteProperty(e, n), "caller" === n && X(e), r
                    },
                    set: (n, r, o, i) => {
                        l(n, r, o);
                        return Object.defineProperty(e, r, {
                            get: () => t.deps[r],
                            set: e => {
                                t.deps[r] = e
                            },
                            configurable: !0,
                            enumerable: !0
                        }), !0
                    }
                })
            }

            function X(t) {
                if ("caller" in t) return;
                const e = n(10);
                Object.defineProperty(t, "caller", {
                    get: () => e.Zt.Ze(),
                    set: () => {
                        throw new Error("Cannot set caller")
                    },
                    configurable: !0,
                    enumerable: !0
                })
            }

            function Q(t, e) {
                Object.getOwnPropertyNames(t.prototype).concat(Object.getOwnPropertySymbols(t.prototype)).filter((t => "constructor" !== t)).forEach((r => {
                    const o = n(18),
                        i = T.Qe(e, !0);
                    t.prototype[r] = new o(t.prototype[r], i)
                }))
            }

            function tt(...t) {
                const e = n(17),
                    r = new Set;
                t.forEach((t => {
                    const e = U.get(t);
                    p(!e.Wt);
                    et(t = nt(t)).forEach((t => r.add(t)))
                })), r.size && e.We([...r])
            }

            function et(t, e = new Set) {
                const Code = n(1);
                if (p(t instanceof Code), e.has(t)) return;
                L.Gt(t).Ie();
                const r = S((() => t.location)),
                    {
                        wu: o
                    } = A(r);
                if (!o) return e;
                const s = i(t);
                s && et(s, e), e.add(t);
                const c = S((() => Object.assign({}, t))),
                    Creation = n(6);
                return S((() => P(c, (t => (t instanceof Code && et(t, e), !(t instanceof Creation)))))), e
            }

            function nt(t) {
                if (U.has(t)) return t;
                if (F.has(t)) return F.get(t);
                let e = "";
                try {
                    e = o().Se().network
                } catch (t) {}
                const n = M[e];
                if (!n) return;
                if (n.has(t)) return n.get(t);
                const r = f(t, "presets") && f(t.presets, e) && t.presets[e].location;
                if (r)
                    for (const t of n.values())
                        if (S((() => t.location)) === r) return t
            }
            L.ee = G, L.Xe = V, L.Kt = function(t, e, o = !0, i) {
                const s = n(10),
                    c = n(29),
                    a = n(17);
                if (E.zt && E.Yt(N, "Upgrade", r(t), "to", r(e)), s.Zt.tn.length) throw new Error("upgrade unavailable");
                const u = L.Gt(t);
                if (!u || u.Wt) throw new Error("upgrade unavailable");
                if (!S((() => !f(t, "upgradable") || t.upgradable))) throw new Error(`${r(t)} is non-upgradable`);
                const h = new c(t);
                try {
                    const n = [];
                    u.xe(e, o, n, i), s.Zt.en((() => {
                        n.length && tt(...n), a.nn(t, h)
                    }))
                } catch (t) {
                    throw h.rn(t), t
                }
            }, L.te = nt, L.sn = function(t) {
                const e = D[t];
                if (e) return p(!U.get(e).Ae), e
            }, L.cn = function() {
                let t = "";
                try {
                    t = o().Se().network
                } catch (t) {}

                function e(t, e) {
                    j.Z.includes(e.name) || $.forEach((t => {
                        delete e[t]
                    }))
                }
                E.ue && E.ie(N, "Deactivate", t, "bindings"), M[t] && S((() => M[t].forEach(e)))
            }, L.an = function() {
                let t = "";
                try {
                    t = o().Se().network
                } catch (t) {}

                function e(e, n) {
                    f(n, "presets") && f(n.presets, t) ? $.forEach((e => l(n, e, n.presets[t][e]))) : j.Z.includes(n.name) || O.Ge(n)
                }
                E.ue && E.ie(N, "Activate", t, "bindings"), Array.from(F.values()).forEach((t => L.Gt(t).Ie())), M[t] && S((() => M[t].forEach(e)))
            }, L.un = q, L.hn = Z, L.Fe = function(t) {
                const e = nt(t);
                if (e) return e;
                const n = L.ee();
                return L.Gt(n).Fe(t), n
            }, L.Gt = t => U.get(t), L.fn = z, L.ln = Y, L.hu = K, L.pn = U, t.exports = L
        }).call(this, n(34))
    }, function(t, e) {
        class ArgumentError extends Error {
            constructor(t = "Unknown reason") {
                super(t), this.name = this.constructor.name
            }
        }
        class InternalError extends Error {
            constructor(t) {
                super(t), this.name = this.constructor.name
            }
        }
        class RequestError extends Error {
            constructor(t, e, n, r, o) {
                super(`${e} ${n}\n\n${r} ${o}\n\n${t}`), this.reason = t, this.status = e, this.statusText = n, this.method = r, this.url = o, this.name = this.constructor.name
            }
        }
        class StateError extends Error {
            constructor(t = "Unknown reason") {
                super(t), this.name = this.constructor.name
            }
        }
        class TimeoutError extends Error {
            constructor(t) {
                super(t), this.name = this.constructor.name
            }
        }
        class NotImplementedError extends Error {
            constructor(t) {
                super(t), this.name = this.constructor.name
            }
        }
        t.exports = {
            ArgumentError,
            InternalError,
            RequestError,
            StateError,
            TimeoutError,
            NotImplementedError
        }
    }, function(t, e, n) {
        class JigDeps {
            static get kt() {
                return n(17)
            }
            static get dn() {
                return n(11)
            }
            static get wn() {
                return n(1)
            }
            static get yn() {
                return n(13)
            }
            static get Nt() {
                return n(3)
            }
            static get gn() {
                return n(14)
            }
            static get Ut() {
                return n(2)
            }
            static get bn() {
                return n(18)
            }
            static get Ft() {
                return n(0)
            }
            static get _n() {
                return n(5)
            }
            static get Dt() {
                return n(10)
            }
            static get mn() {
                return n(20)
            }
            static get En() {
                return n(8)
            }
            static get g() {
                return n(7).g
            }
            static get Mt() {
                return n(48)
            }
            static get Lt() {
                return n(25)
            }
            static get Bt() {
                return "Jig"
            }
        }
        class Jig {
            constructor(...t) {
                const e = JigDeps.kt,
                    n = JigDeps.dn,
                    Code = JigDeps.wn,
                    r = JigDeps.Nt,
                    o = JigDeps.yn.pe,
                    i = JigDeps.Ft.I,
                    s = JigDeps.bn,
                    c = JigDeps._n,
                    a = JigDeps.Dt,
                    u = JigDeps.mn,
                    h = JigDeps.En.P,
                    f = JigDeps.g,
                    l = a.Zt;
                if (this.constructor === c) throw new Error("Jig must be extended");
                if (!(this.constructor instanceof Code)) return l.en((() => {
                    const e = r.Xe(this.constructor);
                    return r.Gt(e).We(), new e(...t)
                }));
                r.Gt(this.constructor).We(), n.Ge(this);
                const p = l.tn,
                    d = p.length && p[p.length - 1];
                d && (this.owner = f((() => o(d.owner, h))));
                const w = new s(this, u.Pn(!1));
                i.add(w);
                const y = !d || l.On(d, !0);
                return e.vn(this.constructor, w, t, y), w
            }
            init() {}
            sync(t = {}) {
                const e = JigDeps.Ut,
                    n = JigDeps.Bt,
                    r = JigDeps.Mt,
                    o = JigDeps.Ft.Y,
                    i = JigDeps._n,
                    s = JigDeps.Dt.Zt;
                if (JigDeps.Lt.Ht) throw new Error("sync disabled during atomic update");
                if (e.zt && e.Yt(n, "Sync", o(this)), !(this instanceof i)) throw new Error("sync unavailable");
                if (s.tn.length) throw new Error("sync cannot be called internally");
                return r(this, t).then((() => this))
            }
            destroy() {
                const t = JigDeps.Ut,
                    e = JigDeps.Bt,
                    n = JigDeps.Ft.Y,
                    r = JigDeps._n,
                    o = JigDeps.kt;
                if (t.zt && t.Yt(e, "Destroy", n(this)), !(this instanceof r)) throw new Error("destroy unavailable");
                return o.Xt(this), this
            }
            auth() {
                const t = JigDeps.Ut,
                    e = JigDeps.Bt,
                    n = JigDeps.Ft.Y,
                    r = JigDeps._n,
                    o = JigDeps.kt,
                    i = JigDeps.Dt,
                    s = JigDeps.Ft.Pt;
                if (t.zt && t.Yt(e, "Auth", n(this)), !(this instanceof r)) throw new Error("auth unavailable on native jigs");
                if (s(i.Zt.qt, this)) throw new Error("auth unavailable on new jigs");
                return o.Qt(this), this
            }
            toString() {
                return `[jig ${this.constructor.name}]`
            }
            static load(t) {
                const {
                    B: e,
                    Y: n,
                    W: r
                } = JigDeps.Ft, o = JigDeps.gn, i = JigDeps._n, s = JigDeps.Dt.Zt;
                if (JigDeps.Lt.Ht) throw new Error("load disabled during atomic update");
                if (this !== i && !r(this, i)) throw new Error("load unavailable");
                if (s.tn.length) throw new Error("load cannot be called internally");
                return (async () => {
                    const r = e(),
                        i = new o(r),
                        s = await i.$n(t);
                    if (s instanceof this) return s;
                    throw new Error(`Cannot load ${t}\n\n${n(s)} not an instance of ${n(this)}`)
                })()
            }
            static[Symbol.hasInstance](t) {
                if (!JigDeps.Ft.I.has(t)) return !1;
                if (this === JigDeps._n) return !0;
                const e = JigDeps.Nt.te(this);
                return !!e && JigDeps.g((() => {
                    let n = Object.getPrototypeOf(t);
                    for (; n;) {
                        if (n.constructor.origin === e.origin) return !0;
                        n = Object.getPrototypeOf(n)
                    }
                    return !1
                }))
            }
        }
        Jig.deps = {
            JigDeps
        }, Jig.sealed = !1, Jig.toString();
        const r = JigDeps.Nt.ee();
        JigDeps.Nt.Gt(r).ne(Jig, !1), t.exports = r
    }, function(t, e, n) {
        class CreationDeps {
            static get Nt() {
                return n(3)
            }
            static get Ft() {
                return n(0)
            }
        }
        class Creation {
            static[Symbol.hasInstance](t) {
                const {
                    I: e,
                    R: n,
                    C: r
                } = CreationDeps.Ft;
                return !!e.has(t) || (!!n.has(t) || !!r.has(t))
            }
        }
        Creation.deps = {
            CreationDeps
        }, Creation.sealed = !0, Creation.toString();
        const r = CreationDeps.Nt.ee();
        CreationDeps.Nt.Gt(r).ne(Creation, !1), t.exports = r
    }, function(t, e) {
        let n = !1;
        t.exports = {
            g: function(t) {
                const e = n;
                try {
                    return n = !0, t()
                } finally {
                    n = e
                }
            },
            Sn: function() {
                return n
            }
        }
    }, function(module, exports, __webpack_require__) {
        (function(process, global) {
            const DeterministicRealm = __webpack_require__(44),
                {
                    H: _sandboxSourceCode,
                    K: _anonymizeSourceCode,
                    gt: _defineGetter
                } = __webpack_require__(0),
                Log = __webpack_require__(2),
                TAG = "Sandbox";
            class Sandbox {
                constructor() {
                    this.Z = [], Log.zt && Log.Yt(TAG, "Creating deterministic realm"), this.An = new DeterministicRealm, this.xn = new WeakSet;
                    const compartment = this.An.makeCompartment();
                    this.P = compartment.evaluate(_getIntrinsicsSrc), this.O = eval(_getIntrinsicsSrc), this.S = new Set(Object.entries(this.P).map((([t, e]) => e))), this.$ = new Set(Object.entries(this.O).map((([t, e]) => e)))
                }
                Ve(t, e, n = !1, r = !1) {
                    let o = t.toString();
                    if (process.env.COVER && (n || this.Z.includes(t.name))) {
                        if (!this.xn.has(t)) {
                            return [t, void 0 !== global ? global : window]
                        }
                        const e = /(cov_[a-zA-Z0-9]+\(\).[a-zA-Z0-9\[\]]+\+\+,?)/g;
                        o = o.replace(e, "")
                    }
                    const i = _sandboxSourceCode(o, t),
                        s = r ? _anonymizeSourceCode(i) : i;
                    return this.In(s, e)
                }
                In(t, e = {}) {
                    const n = this.An.makeCompartment();
                    Object.assign(n.global, this.P, e);
                    const r = t.startsWith("class") ? "AnonymousClass" : "anonymousFunction",
                        o = `const ${r}=${t};${r}`;
                    "Math" in e || _defineGetter(n.global, "Math", (() => {
                        throw new ReferenceError("Math is not defined\n\nHint: Math is disabled because it is non-deterministic.")
                    })), "Date" in e || _defineGetter(n.global, "Date", (() => {
                        throw new ReferenceError("Date is not defined\n\nHint: Date is disabled because it is non-deterministic.")
                    }));
                    const i = n.evaluate(o);
                    return "function" == typeof i && this.xn.add(i), [i, n.global]
                }
            }
            const _intrinsicNames = ["console", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "Object", "Function", "Boolean", "Symbol", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "Number", "BigInt", "Math", "Date", "String", "RegExp", "Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array", "Map", "Set", "WeakMap", "WeakSet", "ArrayBuffer", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl", "WebAssembly"];
            let _getIntrinsicsSrc = "const x = {}\n";
            _intrinsicNames.forEach((t => {
                _getIntrinsicsSrc += `x.${t} = typeof ${t} !== 'undefined' ? ${t} : undefined\n`
            })), _getIntrinsicsSrc += "x", module.exports = new Sandbox
        }).call(this, __webpack_require__(34), __webpack_require__(33))
    }, function(t, e) {
        t.exports = __WEBPACK_EXTERNAL_MODULE__9__
    }, function(t, e, n) {
        const r = n(9),
            {
                crypto: o
            } = r,
            {
                L: i,
                Y: s,
                Pt: c,
                B: a,
                it: u,
                Ot: h,
                vt: f
            } = n(0),
            {
                A: l,
                Rn: p,
                qe: d
            } = n(11),
            {
                g: w
            } = n(7),
            y = n(29),
            b = n(2),
            {
                StateError
            } = n(4),
            g = n(21),
            {
                ut: _
            } = n(13),
            m = "Record";
        class E {
            constructor() {
                this.Cn = o.Random.getRandomBuffer(32).toString("hex"), this.jn = 0, this.Tn = [], this.tn = [], this.ae = null, this.qt = [], this.kn = [], this.Nn = [], this.Un = [], this.Fn = [], this.Dn = [], this.Mn = [], this.Bn = [], this.Ln = [], this.Gn = [], this.Vn = new Map, this.Jn = !0, this.Wn = !1, this.zn = !1
            }
            Yn() {
                i(!this.zn), b.zt && b.Yt(m, "Begin"), this.jn++
            }
            Hn() {
                i(this.jn), b.zt && b.Yt(m, "End"), this.jn--, this.jn || !this.Jn || this.zn || this.Kn()
            }
            qn(t) {
                const Creation = n(6);
                i(!this.zn), i(t instanceof Creation), b.zt && b.Yt(m, `Push ${s(t)}`), this.tn.push(t)
            }
            Zn() {
                i(this.tn.length);
                const t = this.tn.pop();
                b.zt && b.Yt(m, `Pop ${s(t)}`)
            }
            Qn(t) {
                if (i(!this.tn.length), b.zt && b.Yt(m, `Action ${t}`), this.Tn.push(t), this.Xn(), !this.Wn) {
                    const t = a();
                    this.Bn.concat(this.Un).forEach((e => t.tr("update", e)))
                }!this.jn && this.Jn && this.Kn()
            }
            Xn() {
                var t;
                (t = this).Mn = f(h(h(t.Nn, t.Fn), t.Un), t.qt), t.Bn = f(h(t.Mn, t.qt), t.Un), t.Ln = f(f(f(t.kn, t.Mn), t.Bn), t.Un),
                    function(t) {
                        const e = e => {
                            const n = l(e.origin);
                            return n.wu || n.Hr === t.Cn
                        };
                        w((() => {
                            t.Bn.forEach(((n, r) => {
                                n.location = p({
                                    Hr: t.Cn,
                                    fu: r + 1
                                }), e(n) && (n.origin = n.location), n.nonce = t.Vn.get(n).er.nonce + 1
                            })), t.Un.forEach(((n, r) => {
                                n.location = p({
                                    Hr: t.Cn,
                                    lu: r
                                }), e(n) && (n.origin = n.location), n.nonce = t.Vn.get(n).er.nonce + 1
                            }))
                        }))
                    }(this)
            }
            nr(t) {
                i(!this.zn), c(this.Dn, t) || (b.zt && b.Yt(m, `Unbind ${s(t)}`), this.Dn.push(t))
            }
            Kn() {
                i(!this.zn);
                const t = n(30);
                if (b.zt && b.Yt(m, "Commit"), this.Cn === E.Zt.Cn && (i(!E.Zt.jn), E.Zt = new E), !this.Tn.length) return b.he && b.ce(m, "No actions found"), i(!this.qt.length), i(!this.Nn.length), i(!this.Un.length), void i(!this.Fn.length);
                if (!this.Tn.length || this.qt.length || this.Nn.length || this.Un.length || this.Fn.length) {
                    this.Pu();
                    try {
                        return new t(this)
                    } catch (t) {
                        throw this.rn(t), t
                    }
                }
            }
            Pu() {
                const Code = n(1),
                    Creation = n(6),
                    t = this.Bn.concat(this.Un).concat(this.Ln).map((t => t instanceof Code ? t : t.constructor));
                t.filter((t => !1 === t.interactive)).forEach((e => {
                    const n = new Set([e]);
                    w((() => _(e, (t => {
                        t instanceof Creation && n.add(t)
                    }))));
                    const r = t.find((t => !n.has(t)));
                    if (r) throw new Error(`${e.name} is not permitted to interact with ${r.name}`)
                }))
            }
            rr(t) {
                if (this.ir(t, "create"), i(!this.zn), c(this.qt, t)) return void this.sr();
                b.zt && b.Yt(m, "Create", s(t));
                const Code = n(1),
                    Jig = n(5);
                i(t instanceof Code || t instanceof Jig);
                const e = w((() => l(t.origin).Wt));
                i(!u(e)), i(!c(this.Nn, t)), i(!c(this.Un, t)), i(!c(this.Fn, t)), i(!c(this.Dn, t)), this.qt.push(t), this.cr(t, !1, "create"), this.ar(t), this.sr(t)
            }
            _read(t) {
                if (i(!this.zn), c(this.kn, t)) return;
                b.zt && b.Yt(m, "Read", s(t));
                const Creation = n(6);
                i(t instanceof Creation), this.kn.push(t), this.cr(t, !0, "read"), this.ar(t, void 0, !0)
            }
            ur(t, e) {
                if (this.ir(t, "update"), i(!this.zn), c(this.Nn, t)) return this.hr(t, "update"), void this.sr(t);
                b.zt && b.Yt(m, "Update", s(t));
                const Code = n(1),
                    Jig = n(5);
                i(t instanceof Code || t instanceof Jig);
                const r = w((() => t.origin === d));
                i(!r || c(this.qt, t));
                const o = w((() => l(t.origin).Wt));
                i(!u(o)), this.hr(t, "update"), this.Nn.push(t), this.cr(t, !1, "update"), this.ar(t, e), this.sr(t)
            }
            lr(t) {
                if (this.ir(t, "delete"), i(!this.zn), c(this.Un, t)) return this.hr(t, "delete"), void this.sr(t);
                b.zt && b.Yt(m, "Delete", s(t));
                const Code = n(1),
                    Jig = n(5);
                i(t instanceof Code || t instanceof Jig);
                const e = w((() => l(t.origin).Wt));
                i(!u(e)), this.hr(t, "delete"), this.Un.push(t), this.cr(t, !1, "delete"), this.ar(t), this.sr(t), w((() => {
                    t.owner = null, t.satoshis = 0
                }))
            }
            Qt(t, e) {
                if (this.ir(t, "auth"), i(!this.zn), c(this.Fn, t)) return this.hr(t, "auth", !e), void(e || this.sr(t));
                b.zt && b.Yt(m, "Auth", s(t));
                const Code = n(1),
                    Jig = n(5);
                i(t instanceof Code || t instanceof Jig), i(!c(this.qt, t)), this.hr(t, "auth", !e), this.Fn.push(t), this.cr(t, !1, "auth"), this.ar(t), this.sr(t)
            }
            sr(t) {
                i(!this.zn), this.tn.filter((e => t !== e)).filter((t => !!t)).filter((t => !c(this.qt, t))).forEach((t => this.Qt(t, !0)))
            }
            hr(t, e, n) {
                if (this.On(t, n)) {
                    const n = c(this.Un, t) ? `${s(t)} deleted` : `${s(t)} has an unbound owner or satoshis value`;
                    throw new StateError(`${e} disabled: ${n}`)
                }
            }
            On(t, e) {
                return c(this.Dn, t) || e && g.Le(t).pr()
            }
            ir(t, e) {
                if (!this.tn.length) return;
                const Berry = n(12);
                if (this.tn.some((t => t instanceof Berry))) throw new StateError(`Cannot ${e} ${s(t)} in berry`)
            }
            ar(t, e, n) {
                const r = n || !(() => {
                        try {
                            return a().dr
                        } catch (t) {
                            return !1
                        }
                    })(),
                    o = this.Vn.get(t);
                if (o) return !r && o.wr && o.yr(), void(n || (o.gr = !1));
                const i = e || new y(t, r, n);
                this.Vn.set(t, i)
            }
            cr(t, e, r) {
                i(!this.zn);
                const o = w((() => t.location)),
                    c = l(o);
                if (u(c.Hr)) {
                    if (c.Hr === this.Cn) return;
                    const o = n(30).br(c.Hr);
                    if (!o && !e) throw new Error(`Cannot ${r} ${s(t)}: open transaction`);
                    !o || this.Gn.includes(o) || o._r || this.Gn.push(o)
                }
            }
            rn(t) {
                if (this.zn) return;
                b.zt && b.Yt(m, "Rollback"), this.Vn.forEach((e => e.rn(t))), this.Cn === E.Zt.Cn && (E.Zt = new E);
                const e = a();
                this.Bn.concat(this.Un).forEach((t => e.tr("update", t))), this.zn = !0
            }
            Ze() {
                return this.tn.length < 2 ? null : this.tn[this.tn.length - 2]
            }
            en(t) {
                try {
                    this.Yn();
                    const e = t();
                    return this.Hn(), e
                } catch (t) {
                    throw this.rn(t), t
                }
            }
        }
        E.Zt = new E, t.exports = E
    }, function(t, e, n) {
        const {
            Address: r,
            PublicKey: o
        } = n(9), {
            Y: i,
            yt: s,
            it: c,
            L: a
        } = n(0), {
            g: u
        } = n(7), {
            mr: h
        } = n(15), f = 1e8, l = /^(?<protocol>error):\/\/(?<error>.*)/s, p = /^(?<protocol>native):\/\/(?<native>[a-zA-Z0-9_$]+)/s, d = /^(?<protocol>record):\/\/(?<record>[a-f0-9]{64})_(?:o(?<vout>[0-9]+)|(?:d(?<vdel>[0-9]+)))$/, w = /^(?<txid>[a-f0-9]{64})?_(?:(?:o(?<vout>[0-9]+))|(?:d(?<vdel>[0-9]+)))$/s, y = /^(?<txid>[a-f0-9]{64})_(?:(?:o(?<vout>[0-9]+))|(?:d(?<vdel>[0-9]+)))(?:\?berry=(?<berry>[a-zA-Z0-9\-_.!~*'()%]*)(&hash=(?<hash>[a-f0-9]{64}))?(&version=(?<version>[1-9][0-9]*))?)?$/s, b = ["location", "origin", "nonce"], g = ["owner", "satoshis"], _ = b.concat(g), m = "error://Undeployed";
        t.exports = {
            A: function(t) {
                if ("string" != typeof t) throw new Error(`Location is not a string: ${i(t)}`);
                const e = t.match(w) || t.match(y) || t.match(d) || t.match(l) || t.match(p);
                if (e) {
                    const n = {},
                        r = e.groups;
                    return "record" === r.protocol && (n.Hr = r.record), "error" === r.protocol && (n.ae = r.error), "native" === r.protocol && (n.Wt = r.native), c(r.txid) && (n.pu = r.txid), c(r.vout) && (n.fu = parseInt(r.vout)), c(r.vdel) && (n.lu = parseInt(r.vdel)), c(r.berry) && (n.du = decodeURIComponent(r.berry)), c(r.hash) && (n._hash = r.hash), c(r.version) && (n.mr = h(parseInt(r.version))), t === m && (n.wu = !0), n
                }
                throw new Error(`Bad location: ${i(t)}`)
            },
            Rn: function(t) {
                if (a("object" == typeof t && t), c(t.ae)) return `error://${t.ae}`;
                if (c(t.Wt)) return `native://${t.Wt}`;
                let e = "";
                c(t.Hr) && (e = `record://${t.Hr}`), c(t.pu) && (e = t.pu);
                let n = "";
                c(t.fu) && (n = `_o${t.fu}`), c(t.lu) && (n = `_d${t.lu}`);
                const r = [];
                return c(t.du) && (r.push(`berry=${encodeURIComponent(t.du)}`), c(t._hash) && r.push(`hash=${t._hash}`), c(t.mr) && r.push(`version=${t.mr}`)), `${e}${n}${r.length?`?${r.join("&")}`:""}`
            },
            we: function(t) {
                if (Number.isInteger(t) && t >= 1) return t;
                throw new Error(`Invalid nonce: ${i(t)}`)
            },
            ye: function(t, e = !1, s) {
                const CommonLock = n(35);
                if ("string" == typeof t) {
                    try {
                        const e = new o(t, {
                                network: s
                            }),
                            n = s ? "testnet" === s : void 0;
                        return new CommonLock(e.toAddress().toString(), n)
                    } catch (t) {}
                    try {
                        new r(t, s);
                        return new CommonLock(t, s ? "testnet" === s : void 0)
                    } catch (t) {}
                }
                const {
                    Lock: c
                } = n(36);
                if (t instanceof c) return t;
                if (null === t && e) return null;
                throw new Error(`Invalid owner: ${i(t)}`)
            },
            ge: function(t) {
                if ("number" != typeof t) throw new Error("satoshis must be a number");
                if (!Number.isInteger(t)) throw new Error("satoshis must be an integer");
                if (t < 0) throw new Error("satoshis must be non-negative");
                if (t > f) throw new Error("satoshis must be <= 100000000");
                return t
            },
            Ge: function(t) {
                u((() => {
                    s(t, "location", m), s(t, "origin", m), s(t, "nonce", 0), s(t, "owner", undefined), s(t, "satoshis", undefined)
                }))
            },
            Er: b,
            Pr: g,
            de: _,
            qe: m,
            Or: 0
        }
    }, function(t, e, n) {
        class BerryDeps {
            static get kt() {
                return n(17)
            }
            static get Nt() {
                return n(3)
            }
            static get gn() {
                return n(14)
            }
            static get bn() {
                return n(18)
            }
            static get Ft() {
                return n(0)
            }
            static get vr() {
                return n(12)
            }
            static get Dt() {
                return n(10)
            }
            static get mn() {
                return n(20)
            }
            static get g() {
                return n(7).g
            }
            static get Lt() {
                return n(25)
            }
        }
        class Berry {
            constructor(...t) {
                const e = BerryDeps.kt,
                    n = BerryDeps.Ft.C,
                    r = BerryDeps.vr,
                    o = BerryDeps.bn,
                    i = BerryDeps.gn.$r,
                    s = BerryDeps.mn;
                if (this.constructor === r) throw new Error("Berry must be extended");
                const c = i(this.constructor);
                this.location = c, this.origin = c, this.nonce = 0, this.owner = null, this.satoshis = 0;
                const a = s.Sr(!1),
                    u = new o(this, a);
                return n.add(u), a.Ar = !1, e.Ir(this.constructor, u, t), a.Ar = !0, u
            }
            static[Symbol.hasInstance](t) {
                if (!BerryDeps.Ft.C.has(t)) return !1;
                if (this === BerryDeps.vr) return !0;
                const e = BerryDeps.Nt.te(this);
                return !!e && BerryDeps.g((() => {
                    let n = Object.getPrototypeOf(t);
                    for (; n;) {
                        if (n.constructor.location === e.location) return !0;
                        n = Object.getPrototypeOf(n)
                    }
                    return !1
                }))
            }
            static async pluck(t, e, n) {
                return new this
            }
            static load(t) {
                const {
                    B: e,
                    Y: n,
                    W: r
                } = BerryDeps.Ft, o = BerryDeps.gn, i = BerryDeps.vr, s = BerryDeps.Dt.Zt;
                if (BerryDeps.Lt.Ht) throw new Error("load disabled during atomic update");
                if (this !== i && !r(this, i)) throw new Error("load unavailable");
                if (s.tn.length) throw new Error("load cannot be called internally");
                const B = this === i ? void 0 : this,
                    c = new o(e()).$n(t, B);
                return (async () => {
                    const e = await c;
                    if (e instanceof this) return e;
                    throw new Error(`Cannot load ${t}\n\n${n(e)} not an instance of ${n(this)}`)
                })()
            }
            init(...t) {}
        }
        Berry.deps = {
            BerryDeps
        }, Berry.sealed = !1, Berry.toString();
        const r = BerryDeps.Nt.ee();
        BerryDeps.Nt.Gt(r).ne(Berry, !1), t.exports = r
    }, function(t, e, n) {
        const {
            tt: r,
            X: o,
            Y: i,
            et: s,
            nt: c,
            rt: a,
            ot: u,
            Et: h,
            yt: f,
            jt: l,
            L: p
        } = n(0), d = n(8), w = d.O, y = d.P, b = d.$, g = d.S, _ = w.Object, m = y.Object, {
            StateError
        } = n(4);
        t.exports = {
            ut: function t(e, n, r = new Set) {
                if ("function" != typeof e && "object" != typeof e || !e) return void n(e);
                if (r.has(e)) return;
                if (r.add(e), !1 === n(e)) return;
                if (e instanceof w.Set || e instanceof y.Set)
                    for (const o of e) t(o, n, r);
                if (e instanceof w.Map || e instanceof y.Map)
                    for (const [o, i] of e) t(o, n, r), t(i, n, r);
                l(e).forEach((o => {
                    t(e[o], n, r)
                })), "object" != typeof e || b.has(e.constructor) || g.has(e.constructor) || t(e.constructor, n, r);
                const o = Object.getPrototypeOf(e);
                "function" == typeof e && o !== _.getPrototypeOf(_) && o !== m.getPrototypeOf(m) && t(o, n, r)
            },
            Rr: function t(e, r, o = new Map) {
                if ("function" != typeof e && "object" != typeof e || !e) return e;
                if (o.has(e)) return o.get(e);
                let i = !0;
                const s = r(e, (t => {
                    i = t
                })) || e;
                if (o.set(e, s), "function" != typeof s && "object" != typeof s || !s || !i) return s;
                const c = n(8),
                    Code = n(1),
                    a = c.O,
                    u = c.P,
                    h = c.$,
                    d = c.S,
                    w = a.Object,
                    y = u.Object;
                if (s instanceof a.Set || s instanceof u.Set) {
                    const e = Array.from(s);
                    for (let n = 0; n < e.length; n++) e[n] = t(e[n], r, o);
                    s.clear(), e.forEach((t => s.add(t)))
                }
                if (s instanceof a.Map || s instanceof u.Map) {
                    const e = Array.from(s);
                    for (let n = 0; n < e.length; n++) e[n][0] = t(e[n][0], r, o), e[n][1] = t(e[n][1], r, o);
                    s.clear(), e.forEach((t => s.set(t[0], t[1])))
                }
                if (l(s).forEach((e => {
                        const n = s[e],
                            i = t(n, r, o);
                        n !== i && f(s, e, i)
                    })), "object" == typeof s && !h.has(s.constructor) && !d.has(s.constructor)) {
                    const e = t(s.constructor, r, o);
                    Object.getPrototypeOf(s) !== e.prototype && Object.setPrototypeOf(s, e.prototype)
                }
                const b = Object.getPrototypeOf(s);
                if ("function" == typeof s && b !== w.getPrototypeOf(w) && b !== y.getPrototypeOf(y)) {
                    const e = t(b, r, o);
                    if (b !== e) {
                        p(s !== e), Object.setPrototypeOf(s, e);
                        const t = s instanceof Code ? Object.getPrototypeOf(s.prototype) : s.prototype;
                        Object.setPrototypeOf(t, e.prototype)
                    }
                }
                return s
            },
            pe: function t(e, h, p, d = new Map) {
                if ("symbol" == typeof e) throw new Error(`Cannot clone: ${i(e)}`);
                if ("function" != typeof e && "object" != typeof e || !e) return e;
                if (d.has(e)) return d.get(e);
                if (p) {
                    const t = p(e);
                    if (t) return d.set(e, t), t
                }
                const w = n(8),
                    Creation = n(6),
                    y = w.O,
                    b = w.$,
                    g = w.S;
                if (h = h || y, e instanceof Creation) return e;
                if ("function" == typeof e) throw new Error(`Cannot clone non-code function: ${i(e)}`);
                if (b.has(e) || g.has(e)) throw new Error(`Cannot clone intrinsic: ${i(e)}`);
                let _ = null;
                if (r(e) && (_ = new h.Array), o(e) && (_ = new h.Object), a(e)) return new h.Uint8Array(h.Array.from(e));
                s(e) && (_ = new h.Set), c(e) && (_ = new h.Map);
                let m = !1;
                if (_ || (m = !0, _ = new h.Object), !_) throw new Error(`Cannot clone: ${i(e)}`);
                if (d.set(e, _), _ instanceof h.Set)
                    for (const n of e) {
                        const e = t(n, h, p, d);
                        _.add(e)
                    }
                if (_ instanceof h.Map)
                    for (const n of e) {
                        const e = t(n[0], h, p, d),
                            r = t(n[1], h, p, d);
                        _.set(e, r)
                    }
                if (l(e).forEach((n => {
                        if ("symbol" == typeof n) throw new Error(`Cannot clone: ${i(n)}`);
                        f(_, n, t(e[n], h, p, d))
                    })), !b.has(e.constructor) && !g.has(e.constructor)) {
                    const n = t(e.constructor, h, p, d);
                    Object.setPrototypeOf(_, n.prototype)
                }
                if (m && !u(_)) throw new StateError(`Cannot clone: ${i(e)}`);
                return _
            },
            Cr: function t(e, i, u = {}) {
                if (typeof e != typeof i) return !1;
                if ("number" == typeof e && isNaN(e) && isNaN(i)) return !0;
                const Creation = n(6);
                if (e instanceof Creation) return i instanceof Creation && !!h(e, i);
                if ("object" != typeof e || !e || !i) return e === i;
                const f = Object.getOwnPropertyNames(e),
                    l = Object.getOwnPropertyNames(i),
                    p = Object.getOwnPropertyDescriptors(e),
                    d = Object.getOwnPropertyDescriptors(i),
                    w = f.filter((t => p[t].enumerable)),
                    y = l.filter((t => d[t].enumerable));
                if (w.length !== y.length) return !1;
                if (u.jr)
                    for (let n = 0; n < w.length; n++) {
                        const r = w[n],
                            o = y[n];
                        if (r !== o) return !1;
                        if (!t(e[r], i[o])) return !1
                    } else {
                        if (w.some((t => !y.includes(t)))) return !1;
                        if (w.some((n => !t(e[n], i[n], u)))) return !1
                    }
                if (o(e)) return !!o(i);
                if (r(e)) return !!r(i);
                if (s(e)) return !!s(i) && (e.size === i.size && !!t(Array.from(e.entries()), Array.from(i.entries())));
                if (c(e)) return !!c(i) && (e.size === i.size && !!t(Array.from(e.entries()), Array.from(i.entries())));
                if (a(e)) return !!a(i);
                throw new Error(`Unsupported: ${e}`)
            }
        }
    }, function(t, e, n) {
        const r = n(9),
            {
                Transaction: o
            } = r,
            i = n(2),
            {
                L: s,
                W: c,
                Y: a,
                St: u,
                Ct: h,
                it: f
            } = n(0),
            {
                A: l,
                Rn: p,
                qe: d
            } = n(11),
            {
                g: w
            } = n(7),
            y = n(8),
            {
                ArgumentError,
                StateError
            } = n(4),
            {
                Tr: b
            } = n(15),
            Code = n(1),
            g = n(3),
            _ = y.P,
            m = y.O,
            E = "Loader",
            v = new Map;
        let P = null,
            O = null,
            S = 0,
            $ = null;
        class A {
            constructor(t, e = new u("load", t.At)) {
                s(t), this.kr = new Map, this.Nr = new Map, this.Ur = [], this.B = t, this.At = e
            }
            async $n(t, e, n = !1) {
                try {
                    if (this.At.Rt(), !e) {
                        const e = this.kr.get(t);
                        if (e) return e
                    }
                    const r = this.Fr(t, e);
                    e || this.kr.set(t, r);
                    const o = await r;
                    if (!n)
                        for (; this.Ur.length;) {
                            const t = this.Ur;
                            this.Ur = [], await Promise.all(t)
                        }
                    return o
                } catch (t) {
                    throw S && ($ = $ || t), t
                }
            }
            async Fr(t, e) {
                this.At.Rt(), e ? i.ue && i.ie(E, "Load", t, "with", a(e)) : i.ue && i.ie(E, "Load", t);
                const n = new Date;
                try {
                    if (e) return await this.Dr(t, e);
                    const r = l(t);
                    if (f(r.ae) || f(r.Hr)) throw new ArgumentError(`Bad location: ${t}`);
                    if (f(r.Wt)) return this.Mr(t);
                    if (!r.pu) throw new ArgumentError(`Bad location: ${t}`);
                    return f(r.du) ? await this.Br(t) : await this.Lr(t)
                } finally {
                    i.zt && i.Yt(E, "Load (end): " + (new Date - n) + "ms")
                }
            }
            async Br(t) {
                this.At.Rt();
                const {
                    Gr: e
                } = n(22), r = l(t), o = r.pu + (f(r.fu) ? `_o${r.fu}` : `'_d${r.lu}`), i = r.du, s = r._hash, c = r.mr || b, a = `jig://${p({pu:r.pu,lu:r.lu,fu:r.fu,du:i,mr:c})}`, u = await e(a, s, this);
                if (u) return this.Ur.push(u.Vr), u.Jr;
                const h = new A(this.B, this.At),
                    d = await h.$n(o);
                return this.Wr(i, s, c, d)
            }
            async Lr(t) {
                this.At.Rt();
                const {
                    pu: e,
                    fu: r,
                    lu: i
                } = l(t), s = await this.B.Se().fetch(e), c = new o(s), a = x(c), u = "number" == typeof r && r >= 1 && r <= a.out.length, h = "number" == typeof i && i >= 0 && i < a.del.length;
                if (!u && !h) throw new ArgumentError(`Not a jig: ${t}`);
                const f = u ? a.out[r - 1] : a.del[i],
                    p = `jig://${t}`,
                    {
                        Gr: d
                    } = n(22),
                    w = await d(p, f, this);
                return w ? (this.Ur.push(w.Vr), w.Jr) : this.zr(c, a, t)
            }
            async zr(t, e, r) {
                if (this.At.Rt(), this.B.Yr) throw new StateError(`Cannot load ${r}\n\nOnly cached jigs may be loaded in client mode`);
                const {
                    pu: o,
                    fu: i,
                    lu: s
                } = l(r);
                let c = null;
                if (this.Nr.has(o)) c = await this.Nr.get(o);
                else {
                    if (v.has(o)) return await v.get(o), await this.Lr(r);
                    try {
                        const r = n(28),
                            i = !0,
                            s = null,
                            a = !1,
                            u = r(t, o, e, this.B, i, s, this.At, a);
                        this.Nr.set(o, u), v.set(o, u), c = await u
                    } finally {
                        this.Nr.delete(o), v.delete(o)
                    }
                }
                const a = c.Hr;
                if (a.Bn.forEach((t => this.B.tr("load", t))), a.Un.forEach((t => this.B.tr("load", t))), "number" == typeof i && i >= 1 && i <= a.Bn.length) return a.Bn[i - 1];
                if ("number" == typeof s && s >= 0 && s <= a.Un.length - 1) return a.Un[s];
                throw new ArgumentError(`Jig not found: ${r}`)
            }
            async Dr(t, e) {
                this.At.Rt();
                const Berry = n(12),
                    {
                        Gr: r
                    } = n(22);
                if (!c(e, Berry)) throw new ArgumentError("Berry class must extend from Berry");
                if ("string" != typeof t) throw new ArgumentError("Berry path must be a string");
                const B = g.Xe(e);
                if (!!w((() => l(B.location))).pu) {
                    const e = {
                            du: t,
                            mr: b
                        },
                        n = Object.assign(l(B.location), e),
                        o = `jig://${p(n)}`,
                        i = await r(o, void 0, this);
                    if (i) return this.Ur.push(i.Vr), i.Jr
                }
                return this.Wr(t, null, b, B)
            }
            async Wr(t, e, o, B) {
                this.At.Rt(), s(B instanceof Code), i.ue && i.ie(E, "Pluck", a(B), t);
                const c = {
                        b: this.B.Se(),
                        se: t => {
                            $ = $ || t
                        }
                    },
                    [u] = y.In("async function(txid) {\n      try {\n        return await b.fetch(txid)\n      } catch (e) {\n        se(e)\n        throw e\n      }\n    }", c);
                Object.freeze(u);
                const f = P,
                    b = O;
                try {
                    const i = !!w((() => l(B.location))).pu;
                    let s = d;
                    if (i && (s = p(Object.assign(l(B.location), {
                            du: t,
                            mr: o
                        }))), P = B, O = s, S++, $) throw $;
                    const c = B.pluck(t, u);
                    if (!(c instanceof _.Promise || c instanceof m.Promise)) throw new StateError("pluck method must be async");
                    const y = await c;
                    if (!y || y.constructor !== B) throw new StateError(`Berry must be an instance of ${a(B)}`);
                    if (i) {
                        const {
                            Kr: t
                        } = n(22), i = t(y, o), c = h(i), a = new r.deps.Buffer(c, "utf8"), u = r.crypto.Hash.sha256(a).toString("hex");
                        if (e && e !== u) throw new Error("Berry state mismatch");
                        const f = p(Object.assign({
                            _hash: u
                        }, l(s)));
                        w((() => {
                            y.location = y.origin = f
                        }));
                        const d = `jig://${s}`;
                        await this.B.qr().set(d, i)
                    }
                    if ($) throw $;
                    return y
                } catch (t) {
                    throw $ = $ || t, t
                } finally {
                    P = f, O = b, S--, S || ($ = null)
                }
            }
            Mr(t) {
                this.At.Rt();
                const {
                    Wt: e
                } = l(t), n = g.sn(e);
                if (!n) throw new ArgumentError(`Native code not found: ${e}`);
                if (g.Gt(n).Ae) throw new ArgumentError(`${a(n)} cannot be a dependency`);
                return n
            }
        }

        function x(t) {
            const {
                Zr: e
            } = n(15), r = "Not a run transaction: invalid op_return protocol", o = "Not a run transaction: invalid run payload";
            if (!t.outputs.length) throw new StateError(r);
            const i = t.outputs[0].script.chunks;
            if (i.length < 6 || 0 !== i[0].opcodenum || 106 !== i[1].opcodenum || "run" !== i[2].buf.toString()) throw new StateError(r);
            const s = e(i[3].buf.toString("hex")),
                c = i[4].buf ? i[4].buf.toString() : "";
            try {
                const t = i[5].buf.toString("utf8"),
                    e = JSON.parse(t);
                if ("number" != typeof e.in || !Array.isArray(e.ref) || !Array.isArray(e.out) || !Array.isArray(e.del) || !Array.isArray(e.cre) || !Array.isArray(e.exec) || e.ref.some((t => "string" != typeof t)) || e.out.some((t => "string" != typeof t)) || e.del.some((t => "string" != typeof t)) || e.exec.some((t => "object" != typeof t))) throw new StateError(o);
                return e.app = c, e.version = s, e
            } catch (t) {
                throw new StateError(o)
            }
        }
        A.Qr = x, A.$r = function(B) {
            if (P !== B) throw new Error("Must only create berry from its berry class");
            const t = O;
            return P = null, O = null, t
        }, t.exports = A
    }, function(t, e, n) {
        const {
            StateError
        } = n(4);
        t.exports = {
            Tr: 5,
            mr: function(t) {
                if (5 !== t) throw new StateError(`Unsupported version: ${t}`);
                return t
            },
            Zr: function(t) {
                if ("05" === t) return 5;
                throw new StateError(`Unsupported payload version: ${t}`)
            },
            Xr: function(t) {
                if ("04" === t) return 5;
                throw new StateError(`Unsupported state version: ${t}`)
            },
            eo: function(t) {
                if (5 === t) return "05";
                throw new StateError(`Unsupported protocol version: ${t}`)
            },
            no: function(t) {
                if (5 === t) return "04";
                throw new StateError(`Unsupported protocol version: ${t}`)
            }
        }
    }, function(t, e, n) {
        (function(e) {
            const r = n(9),
                {
                    Script: o,
                    Transaction: i
                } = r,
                {
                    Interpreter: s
                } = o,
                {
                    Input: c
                } = i,
                {
                    ECDSA: a,
                    Hash: u,
                    Signature: h
                } = r.crypto,
                {
                    BufferReader: f,
                    BufferWriter: l
                } = r.encoding,
                {
                    BN: p
                } = r.deps.bnjs;

            function d(t, n, r, o, i) {
                const s = t.inputs[r];

                function c(e) {
                    const n = new l;
                    if (void 0 === e) {
                        if (t._hashOutputsAll) return t._hashOutputsAll;
                        t.outputs.forEach((t => {
                            t.toBufferWriter(n)
                        }))
                    } else t.outputs[e].toBufferWriter(n);
                    const r = n.toBuffer(),
                        o = u.sha256sha256(r);
                    return void 0 === e && (t._hashOutputsAll = o), o
                }
                let a = e.alloc(32),
                    p = e.alloc(32),
                    d = e.alloc(32);
                n & h.SIGHASH_ANYONECANPAY || (a = function() {
                    if (t._hashPrevouts) return t._hashPrevouts;
                    const e = new l;
                    t.inputs.forEach((t => {
                        e.writeReverse(t.prevTxId), e.writeUInt32LE(t.outputIndex)
                    }));
                    const n = e.toBuffer();
                    return t._hashPrevouts = u.sha256sha256(n), t._hashPrevouts
                }()), n & h.SIGHASH_ANYONECANPAY || (31 & n) === h.SIGHASH_SINGLE || (31 & n) === h.SIGHASH_NONE || (p = function() {
                    if (t._hashSequence) return t._hashSequence;
                    const e = new l;
                    t.inputs.forEach((t => {
                        e.writeUInt32LE(t.sequenceNumber)
                    }));
                    const n = e.toBuffer();
                    return t._hashSequence = u.sha256sha256(n), t._hashSequence
                }()), (31 & n) !== h.SIGHASH_SINGLE && (31 & n) !== h.SIGHASH_NONE ? d = c() : (31 & n) === h.SIGHASH_SINGLE && r < t.outputs.length && (d = c(r));
                const w = new l;
                w.writeInt32LE(t.version), w.write(a), w.write(p), w.writeReverse(s.prevTxId), w.writeUInt32LE(s.outputIndex), w.writeVarintNum(o.toBuffer().length), w.write(o.toBuffer()), w.writeUInt64LEBN(i), w.writeUInt32LE(s.sequenceNumber), w.write(d), w.writeUInt32LE(t.nLockTime), w.writeUInt32LE(n >>> 0);
                const y = w.toBuffer(),
                    b = u.sha256sha256(y);
                return new f(b).readReverse()
            }
            t.exports = {
                Es: function(t) {
                    if (t.Ps) return;
                    t.Ps = !0, i.FEE_PER_KB = 500;
                    const e = i.prototype.sign;
                    i.prototype.sign = function(...t) {
                        const n = c.prototype.isValidSignature;
                        c.prototype.isValidSignature = () => !0;
                        const r = e.call(this, ...t);
                        return c.prototype.isValidSignature = n, r
                    }, c.prototype.clearSignatures = () => {}, c.prototype.getSignatures = () => [], c.prototype.isFullySigned = function() {
                        return !!this.script.toBuffer().length
                    }, i.prototype.isFullySigned = function() {
                        return !this.inputs.some((t => !t.isFullySigned()))
                    }, i.prototype.isValidSignature = function(t) {
                        const e = new s,
                            n = t.inputIndex,
                            r = this.inputs[n],
                            o = s.SCRIPT_VERIFY_STRICTENC | s.SCRIPT_VERIFY_DERSIG | s.SCRIPT_VERIFY_LOW_S | s.SCRIPT_VERIFY_NULLDUMMY | s.SCRIPT_VERIFY_SIGPUSHONLY | s.SCRIPT_ENABLE_MONOLITH_OPCODES | s.SCRIPT_ENABLE_MAGNETIC_OPCODES | s.SCRIPT_ENABLE_SIGHASH_FORKID;
                        return e.verify(r.script, r.output.script, this, n, o, r.output.satoshisBN)
                    }
                },
                $u: function(t, e) {
                    const n = 8 + (t <= 75 ? 1 : t <= 255 ? 2 : t <= 65535 ? 3 : 5) + t + 148;
                    return Math.ceil(3 * n * e / 1e3)
                },
                Os: function(t) {
                    const {
                        Hash: e
                    } = r.crypto;
                    return t._hash = t._hash || e.sha256(t.toBuffer()).reverse().toString("hex"), t._hash
                },
                vs: d,
                $s: function(t, n, r, o, i, s = h.SIGHASH_ALL) {
                    const c = d(t, s |= h.SIGHASH_FORKID, n, r, new p(o)),
                        u = a.sign(c, i, "little"),
                        f = e.from(u.toDER());
                    return e.concat([f, e.from([255 & s])]).toString("hex")
                }
            }
        }).call(this, n(46).Buffer)
    }, function(t, e, n) {
        const {
            ro: r
        } = n(18), {
            de: o,
            A: i
        } = n(11), {
            L: s,
            Y: c,
            V: a,
            Pt: u,
            wt: h,
            it: f
        } = n(0), {
            ut: l,
            pe: p
        } = n(13), {
            StateError,
            NotImplementedError
        } = n(4), {
            g: d
        } = n(7), w = n(2), y = n(21), b = "Action";
        class g {
            constructor(t) {
                this.oo = t
            }
            toString() {
                return `${this.constructor.name}`
            }
            op() {
                throw new NotImplementedError
            }
            data() {
                throw new NotImplementedError
            }
        }
        class _ extends g {
            constructor() {
                super(null), this.io = [], this.so = []
            }
            toString() {
                return `Deploy (count: ${this.io.length})`
            }
            op() {
                return "DEPLOY"
            }
            data() {
                s(this.io.length === this.so.length);
                const t = [];
                for (let e = 0; e < this.io.length; e++) {
                    const n = this.io[e],
                        r = this.so[e];
                    t.push(n), t.push(r)
                }
                return t
            }
        }
        class m extends g {
            constructor(t, e, n) {
                super(t), this.Jt = e, this.er = n
            }
            toString() {
                return `Upgrade ${c(this.oo)}`
            }
            op() {
                return "UPGRADE"
            }
            data() {
                const t = [];
                return t.push(this.oo), t.push(this.Jt), t.push(this.er), t
            }
        }
        class E extends g {
            constructor(t, e, n) {
                super(t), this.It = e, this.co = n
            }
            toString() {
                return `Call ${c(this.oo)} ${this.It}`
            }
            op() {
                return "CALL"
            }
            data() {
                const t = [];
                return t.push(this.oo), t.push(this.It), t.push(this.co), t
            }
        }
        class v extends g {
            constructor(t, e, n) {
                super(e), this.ao = t, this.co = n
            }
            toString() {
                return `New ${c(this.oo)}`
            }
            op() {
                return "NEW"
            }
            data() {
                const t = [];
                return t.push(this.ao), t.push(this.co), t
            }
        }

        function P(t, e) {
            const r = n(3),
                o = n(10).Zt,
                i = a(t);
            if (!i) return;
            P(i, e);
            if (r.Gt(i).Wt) return;
            const s = h(i, "sealed") ? i.sealed : "owner";
            switch (s) {
                case "owner":
                    u(o.qt, i) || o.Qt(i);
                    break;
                case !0:
                    throw new StateError(`Cannot ${e}: ${c(i)} is sealed`);
                case !1:
                    break;
                default:
                    throw new StateError(`Invalid sealed option: ${s}`)
            }
        }

        function O(t) {
            const Creation = n(6),
                e = n(10).Zt;
            d((() => l(t, (t => {
                if (t instanceof Creation) return e._read(t), !1
            }))))
        }
        t.exports = {
            kt: g,
            uo: _,
            ho: m,
            fo: E,
            lo: v,
            We: function(t) {
                const Code = n(1),
                    e = n(10).Zt;
                s(t.length), s(t.every((t => t instanceof Code))), w.zt && w.Yt(b, "Deploy", t.map((t => c(t))).join(", ")), e.en((() => {
                    t.forEach((t => e.rr(t))), t.forEach((t => P(t, "deploy"))), t.forEach((t => e.nr(t)));
                    const n = new _;
                    for (const e of t) {
                        const t = e.toString(),
                            r = d((() => p(Object.assign({}, e))));
                        O(r), o.forEach((t => delete r[t])), s(!r.presets), n.io.push(t), n.so.push(r)
                    }
                    e.Qn(n)
                }))
            },
            nn: function(t, e) {
                const Code = n(1),
                    r = n(10).Zt;
                if (s(t instanceof Code), w.zt && w.Yt(b, "Upgrade", c(t)), f(i(d((() => t.location))).lu)) throw new StateError("Cannot upgrade destroyed jig");
                r.en((() => {
                    P(t, "upgrade");
                    const n = t.toString(),
                        i = d((() => p(Object.assign({}, t))));
                    O(i), o.forEach((t => delete i[t])), s(!i.presets);
                    const c = new m(t, n, i);
                    r.ur(t, e), r.Qn(c)
                }))
            },
            Xt: function(t) {
                const e = n(10),
                    Code = n(1),
                    Jig = n(5),
                    r = e.Zt;
                s(t instanceof Code || t instanceof Jig), w.ue && w.ie(b, "Destroy", c(t)), f(i(d((() => t.location))).lu) || r.en((() => {
                    r.lr(t);
                    if (!r.tn.length) {
                        const e = new E(t, "destroy", []);
                        r.Qn(e)
                    }
                }))
            },
            Qt: function(t) {
                const e = n(10).Zt,
                    Code = n(1),
                    Jig = n(5);
                if (s(t instanceof Code || t instanceof Jig), w.ue && w.ie(b, "Auth", c(t)), f(i(d((() => t.location))).lu)) throw new StateError("Cannot auth destroyed jigs");
                e.en((() => {
                    e.Qt(t);
                    if (!e.tn.length) {
                        const n = new E(t, "auth", []);
                        e.Qn(n)
                    }
                }))
            },
            po: function(t, e, r, o, i = !0) {
                const s = n(10).Zt;
                w.ue && w.ie(b, "Call", c(t), e), s.en((() => {
                    O(r), s.qn(t), o(), s.Zn();
                    if (!s.tn.length && i) {
                        const n = new E(t, e, r);
                        s.Qn(n)
                    }
                }))
            },
            vn: function(t, e, o, i) {
                const Jig = n(5),
                    s = n(10).Zt;
                w.ue && w.ie(b, "New", c(t)), s.en((() => {
                    let n = t;
                    for (; n !== Jig;) s._read(n), n = Object.getPrototypeOf(n);
                    const c = r(e, o);
                    O(c), s.rr(e);
                    if (void 0 !== e.init(...c)) throw new StateError("init must not return a value");
                    i && s.nr(e), y.Le(e).Be.do.push("init");
                    if (!s.tn.length) {
                        const n = new v(t, e, c);
                        s.Qn(n)
                    }
                }))
            },
            Ir: function(t, e, o) {
                const Berry = n(12),
                    i = n(10).Zt;
                w.ue && w.ie(b, "Pluck", c(t)), i.en((() => {
                    let n = t;
                    for (; n !== Berry;) i._read(n), n = Object.getPrototypeOf(n);
                    const s = r(e, o);
                    O(s);
                    if (void 0 !== e.init(...s)) throw new StateError("init must not return a value");
                    y.Le(e).Be.do.push("init")
                }))
            }
        }
    }, function(t, e, n) {
        const {
            Sn: r,
            g: o
        } = n(7), {
            L: i,
            Y: s,
            wt: c,
            yt: a,
            at: u,
            ht: h,
            j: f,
            gu: l,
            _u: p,
            mu: d,
            F: w,
            D: y,
            M: b,
            dt: g,
            Tt: _,
            et: m,
            nt: E,
            it: v
        } = n(0), {
            A: P,
            ye: O,
            ge: S,
            Er: $,
            Pr: A
        } = n(11), {
            pe: x,
            ut: I,
            Rr: R
        } = n(13), T = n(8), j = T.P, C = T.O, k = n(21), {
            le: N
        } = n(27), U = n(20), M = n(3), {
            StateError
        } = n(4), F = () => n(10).Zt, D = () => F().tn;
        let L;
        let G = null;
        class V {
            constructor(t, e = new U) {
                return i(!k.wo(t)), this.yo = new k(t, this), this.Be = e, this.oo = e.oo || this.yo, e.oo || (this.bo = new WeakMap), this.yo
            }
            _o(t, e, r) {
                return this.mo() ? Reflect.apply(t, e, r) : this.Eo((() => {
                    this.Po();
                    const c = this.Be;
                    c.Oo && (e = void 0), this.vo() && F()._read(this.oo);
                    let a = k.Le(e),
                        u = a && a.Be,
                        h = !a || !u.$o || !c.So;
                    c.Ao && h && "function" == typeof e && (e = M.Xe(e), a = k.Le(e), u = a && a.Be, h = !a || !u.$o || !c.So);
                    const Berry = n(12);
                    e instanceof Berry && "init" === t.name && (h = !1);
                    const f = a && a.Be.do;
                    if (f && f.includes(t.name)) throw new StateError(`${t.name} disabled`);
                    if (c.So && !a) throw new Error(`Cannot call ${t.name} on ${s(e)}`);
                    if (h) return Reflect.apply(t, e, r);
                    const l = !a.xo();
                    return F().en((() => {
                        D().length || (r = Y(e, r)), D().length && z(r), a.Io(t.name, "call");
                        const c = l ? o((() => x(r, j))) : r;
                        let u = null;
                        const h = G;
                        try {
                            !l && G || (G = {
                                Ro: new Set,
                                nr: !1,
                                oo: e
                            });
                            const f = () => {
                                    const r = function(t, e) {
                                        if (!t) return e;
                                        const Creation = n(6);
                                        if (!(t instanceof Creation)) return null;
                                        const r = k.wo(e).name;
                                        if ("function" != typeof t[r]) return null;
                                        if (t[r] === e) return e;
                                        const i = k.Le(e).oo,
                                            s = o((() => i.origin)),
                                            c = o((() => i.nonce)),
                                            a = k.Le(t).Co(r),
                                            u = o((() => a.origin)),
                                            h = o((() => a.nonce));
                                        if (u === s) {
                                            if (h < c) throw new StateError("Method time travel");
                                            return t[r]
                                        }
                                        const f = F().tn;
                                        if (!(f.length >= 2 && f[f.length - 2] === t)) return null;
                                        let l = Object.getPrototypeOf(t);
                                        for (; l;) {
                                            const t = g(l, r);
                                            if (t === e) return t;
                                            const n = "function" == typeof l ? l : l.constructor;
                                            if (t && o((() => n.origin === s))) return o((() => {
                                                if (n.nonce < c) throw new StateError("Method time travel")
                                            })), t;
                                            l = Object.getPrototypeOf(l)
                                        }
                                        return null
                                    }(e, this.yo);
                                    if (!r) throw new StateError(`Cannot call ${t.name} on ${s(e)}`);
                                    const i = k.wo(r),
                                        h = k.Le(r).oo;
                                    this.vo() && F()._read(h), u = Reflect.apply(i, e, c);
                                    if (u instanceof j.Promise || u instanceof C.Promise) throw new StateError("async methods not supported");
                                    z(u), u = a.jo(u, l), l && a.To()
                                },
                                p = !a.Be.ko || !a.Be.ko.includes(t.name);
                            if (n(17).po(e, t.name, r, f, p), l) {
                                const Creation = n(6);
                                o((() => I(k.wo(e), (t => {
                                    if (t instanceof Creation) return !1;
                                    i(!k.wo(t))
                                }))))
                            }
                            return u
                        } finally {
                            G = h
                        }
                    }))
                }))
            }
            No(t, e, n) {
                return this.mo() ? Reflect.construct(t, e, n) : this.Eo((() => (this.Po(), this.vo() && F()._read(this.oo), Reflect.construct(t, e, n))))
            }
            Uo(t, e, n) {
                return this.mo() ? Reflect.defineProperty(t, e, n) : this.Eo((() => (this.Po(), this.Fo(e, n.value, "define"), J(n), this.Do() && F().ur(this.oo), n.value = this.Mo(n.value), this.Bo(e) && (G.nr = !0), Reflect.defineProperty(t, e, n))))
            }
            Lo(t, e) {
                return this.mo() ? Reflect.deleteProperty(t, e) : this.Eo((() => (this.Po(), this.Fo(e, void 0, "delete"), this.Do() && F().ur(this.oo), Reflect.deleteProperty(t, e))))
            }
            Gt(t, e, r) {
                return this.mo() ? Reflect.get(t, e, r) : this.Eo((() => {
                    this.Po();
                    const i = e === Symbol.hasInstance && t[Symbol.hasInstance] !== j.Function.prototype[Symbol.hasInstance] && t[Symbol.hasInstance] !== C.Function.prototype[Symbol.hasInstance];
                    if (this.Go(e) && !i) return s = e, o((() => Object.getPrototypeOf(n(1).prototype)[s]));
                    var s;
                    if (this.Vo(e)) return Reflect.get(t, e, r);
                    if (this.vo() && F()._read(this.oo), this.Jo(e)) return Reflect.get(t, e, r);
                    this.Wo(e, "get");
                    let c = Reflect.get(t, e, r);
                    if (!c) return c;
                    const a = this.Co(e);
                    return a && (c = k.Le(a).zo(c)), c
                }))
            }
            Yo(t, e) {
                return this.mo() ? Reflect.getOwnPropertyDescriptor(t, e) : this.Eo((() => {
                    if (this.Po(), this.Vo(e)) return;
                    if (this.vo() && F()._read(this.oo), this.Jo(e)) return Reflect.getOwnPropertyDescriptor(t, e);
                    this.Wo(e, "get descriptor for");
                    const n = Reflect.getOwnPropertyDescriptor(t, e);
                    return n ? (n.value = this.zo(n.value), n) : n
                }))
            }
            Ho(t) {
                return this.mo() ? Reflect.getPrototypeOf(t) : this.Eo((() => (this.Po(), this.vo() && F()._read(this.oo), Reflect.getPrototypeOf(t))))
            }
            Ko(t, e) {
                return this.mo() ? Reflect.has(t, e) : this.Eo((() => (this.Po(), this.vo() && F()._read(this.oo), !!this.qo(e) || (this.Io(e, "check"), this.Zo(e, "check"), Reflect.has(t, e)))))
            }
            Qo(t) {
                return this.mo() ? Reflect.isExtensible(t) : this.Eo((() => (this.Po(), !0)))
            }
            Xo(t) {
                return this.mo() ? Reflect.ownKeys(t) : this.Eo((() => {
                    this.Po(), this.vo() && F()._read(this.oo);
                    let e = Reflect.ownKeys(t);
                    return e = e.sort(_), e = e.filter((t => this.ti(t))), e
                }))
            }
            ei(t) {
                return this.mo() ? Reflect.preventExtensions(t) : this.Eo((() => {
                    throw this.Po(), new Error("preventExtensions disabled")
                }))
            }
            ni(t, e, n, r) {
                return this.mo() ? (a(t, e, n), !0) : this.Eo((() => (this.Po(), r !== this.yo ? (a(r, e, n), !0) : (this.Fo(e, n, "set"), this.Do() && F().ur(this.oo), n = this.Mo(n), this.Bo(e) && (G.nr = !0), o((() => a(t, e, n))), !0))))
            }
            ri(t, e) {
                return this.mo() ? Reflect.setPrototypeOf(t, e) : this.Eo((() => {
                    throw this.Po(), new Error("setPrototypeOf disabled")
                }))
            }
            oi() {
                if (!this.mo()) return this.Eo((() => {
                    this.Po(), this.vo() && F()._read(this.oo)
                }))
            }
            ii(t) {
                return this.mo() ? t : this.Eo((() => (this.Po(), this.zo(t))))
            }
            si(t) {
                return this.mo() ? t : this.Eo((() => (this.Po(), z(t), t = this.Mo(t))))
            }
            ci() {
                if (!this.mo()) return this.Eo((() => {
                    this.Po(), this.vo() && F()._read(this.oo)
                }))
            }
            ai() {
                if (!this.mo()) return this.Eo((() => {
                    this.Po(), this.Do() && F().ur(this.oo), this.ui("update", s(this.oo))
                }))
            }
            Eo(t) {
                const e = F();
                try {
                    const n = t();
                    if (e.ae) throw e.ae;
                    return n
                } catch (t) {
                    throw e.tn.length && !e.ae && (e.ae = t), t
                }
            }
            Po() {
                const t = k.wo(this.oo);
                if (!c(t, "location")) return;
                const {
                    ae: e,
                    wu: n
                } = P(t.location);
                if (e && !n) throw new Error(e)
            }
            Fo(t, e, n) {
                if ("__proto__" === t) throw new Error(`${n} __proto__ disabled`);
                if ("symbol" == typeof t) throw new Error(`Cannot ${n} symbol property`);
                if (this.qo(t)) throw new Error(`Cannot ${n} ${t}: reserved`);
                this.hi(t, e, n), this.fi(t, e, n), this.li(t, e, n), this.Zo(t, n), this.Io(t, n), this.ui(n, t), z(e)
            }
            ui(t, e) {
                if (this.Be.Ar) throw new Error(`Cannot ${t} ${e}: immutable`);
                if (this.pi(), F().Dn.includes(this.oo)) throw new Error(`Cannot ${t} ${e}: unbound`)
            }
            Wo(t, e) {
                this.di(t), this.wi(t), this.Io(t, e), this.Zo(t, e)
            }
            Jo(t) {
                return "function" == typeof this.yo && "prototype" === t || ("constructor" === t || "symbol" == typeof t)
            }
            di(t) {
                if (this.yi(t)) try {
                    const e = k.wo(this.yo);
                    if ("location" === t || "origin" === t || "nonce" === t) {
                        const n = Reflect.get(e, t),
                            r = P("nonce" === t ? e.location : n);
                        if (v(r.wu)) throw new Error("Hint: Sync the jig to deploy it");
                        if (v(r.ae)) throw new Error(`A previous error occurred\n\n${r.ae}`);
                        if (v(r.Wt)) return;
                        if (!v(r.pu)) throw new Error("Hint: Sync the jig to assign it in a transaction");
                        if (v(r.du) && !v(r._hash)) throw new Error
                    }
                } catch (e) {
                    throw new Error(`Cannot read ${t}${e.message?"\n\n"+e.message:""}`)
                }
            }
            wi(t) {
                if (this.Bo(t)) try {
                    const e = k.wo(this.yo);
                    if ("owner" === t || "satoshis" === t) {
                        const n = Reflect.get(e, t);
                        if (void 0 === n) throw new StateError("Hint: Sync the jig to bind it in a transaction");
                        const r = !0;
                        "owner" === t && O(n, r), "satoshis" === t && S(n)
                    }
                } catch (e) {
                    throw new Error(`Cannot read ${t}\n\n${e.message}`)
                }
            }
            fi(t, e, n) {
                if (this.yi(t)) throw new StateError(`Cannot ${n} ${t}`)
            }
            li(t, e, n) {
                if (!this.Bo(t)) return;
                if ("delete" === n) throw new StateError(`Cannot ${n} ${t}`);
                if (this.gi()) throw new StateError(`Cannot ${n} ${t}`);
                "owner" === t && O(e, !1), "satoshis" === t && S(e)
            }
            hi(t, e, n) {
                this.Be.Eu && ("sealed" === t && "delete" !== n && M.fn(e), "upgradable" === t && "delete" !== n && M.ln(e), "interactive" === t && "delete" !== n && M.hu(e))
            }
            Zo(t, e) {
                if (!this.Be._i) return;
                const n = () => {
                    const n = `Cannot ${e} ${"symbol"==typeof t?t.toString():t}: reserved`;
                    throw new StateError(n)
                };
                f.includes(t) && n(), this.Be.Ou && p.includes(t) && n(), this.Be.Eu && l.includes(t) && n(), this.Be.vu && d.includes(t) && n()
            }
            Io(t, e) {
                const n = "call" === e,
                    r = n ? "method" : "property";
                if (!this.ti(t, n)) throw new Error(`Cannot ${e} private ${r} ${t}`)
            }
            ti(t, e = !1) {
                if (!this.Be.Pi) return !0;
                if ("string" != typeof t || !t.startsWith("_")) return !0;
                if ("__proto__" === t) return !0;
                const Jig = n(5),
                    Berry = n(12),
                    r = D();
                if (!r.length) return !e;
                const o = r[r.length - 1];
                return "function" == typeof this.oo ? o === this.oo || o.constructor === this.oo : (i(this.oo instanceof Jig || this.oo instanceof Berry), o.constructor === this.oo.constructor || o === this.oo.constructor)
            }
            pi() {
                if (this.Be.Oi && !this.xo()) throw new Error(`Attempt to update ${s(this.oo)} outside of a method`)
            }
            zo(t) {
                if (W(t)) return t;
                return t instanceof n(6) || this.vi(t) ? t : this.$i(t)
            }
            jo(t, e, n = new Set) {
                if (W(t)) return t;
                if (n.has(t)) return t;
                if (k.wo(t)) return t;
                const r = this.vi(t);
                if (!r) {
                    n.add(t);
                    const r = t => this.jo(t, e, n);
                    return o((() => function(t, e) {
                        if (Object.keys(t).forEach((n => {
                                a(t, n, e(t[n]))
                            })), m(t)) {
                            const n = Array.from(t.values());
                            t.clear(), n.forEach((n => t.add(e(n))))
                        }
                        if (E(t)) {
                            const n = Array.from(t.entries());
                            t.clear(), n.forEach((([n, r]) => t.set(e(n), e(r))))
                        }
                    }(t, r))), t
                }
                return !e && r ? t : this.$i(t)
            }
            $i(t) {
                if (W(t)) return t;
                if (k.wo(t)) return t;
                const e = this.Si();
                if (e.has(t)) return e.get(t);
                const n = "function" == typeof t,
                    r = U.Qe(this.oo, n),
                    o = new V(t, r);
                return e.set(t, o), o
            }
            Mo(t) {
                if (W(t)) return t;
                if (t instanceof n(6)) return t;
                const e = k.Le(t),
                    r = k.wo(t) || t;
                return e ? e.Be.oo === this.oo ? r : x(e.yo, j) : (D().length && G.Ro && G.Ro.add(r), r)
            }
            Co(t) {
                let e = this.oo,
                    r = this.yo;
                for (; !c(r, t);) {
                    r = Object.getPrototypeOf(r), i(r), e = "object" == typeof r ? r.constructor : r;
                    e instanceof n(6) || (e = null), e && this.vo() && k.Le(e).vo() && F()._read(e)
                }
                return e
            }
            To() {
                i(G), R(G.Ro, ((t, e) => {
                    if (!h(t)) throw new Error(`Not serializable: ${s(t)}`);
                    if (W(t)) return;
                    if (t instanceof n(6)) return void e(!1);
                    ! function(t) {
                        o((() => {
                            if (Object.getOwnPropertySymbols(t).length) throw new Error("Symbol properties not supported");
                            const e = [];
                            (t instanceof j.Array || t instanceof C.Array) && e.push("length");
                            const n = t instanceof j.Uint8Array || t instanceof C.Uint8Array;
                            Object.getOwnPropertyNames(t).filter((t => !e.includes(t))).map((e => Object.getOwnPropertyDescriptor(t, e))).forEach((t => J(t, !n)))
                        }))
                    }(t);
                    const r = k.Le(t);
                    if (!r) return void e(!0);
                    const i = k.wo(t);
                    return e(!1), r.Be.oo === this.oo ? i : x(r.yo, j)
                })), this.gi() && (G.nr = !0), G.nr && F().nr(this.oo)
            }
            vi(t) {
                if (!G) return !1;
                if (k.wo(t)) return !1;
                const e = F().tn;
                if (!(e.length && e[e.length - 1] === this.oo)) return !1;
                if (G.Ro.has(t)) return !0;
                let n = !1;
                return I(G.Ro, (e => !n && (!k.wo(e) && (e === t ? (n = !0, !1) : void 0)))), n && G.Ro.add(t), n
            }
            mo() {
                return this.Be.Sn && r()
            }
            Go(t) {
                return this.Be.Eu && function() {
                    if (!L) {
                        const t = o((() => Object.getPrototypeOf(n(1).prototype)));
                        L = Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
                    }
                    return L
                }().includes(t)
            }
            qo(t) {
                return this.Ai(t) || this.xi(t) || this.Ii(t)
            }
            Ai(t) {
                return this.Be.Eu && w.includes(t)
            }
            xi(t) {
                return this.Be.Ou && y.includes(t)
            }
            Ii(t) {
                return this.Be.vu && b.includes(t)
            }
            Vo(t) {
                return this.Ai(t) && l.includes(t) || this.xi(t) && p.includes(t) || this.Ii(t) && d.includes(t)
            }
            vo() {
                return this.Be.Ri && D().length
            }
            Do() {
                return this.Be.Ci && D().length
            }
            yi(t) {
                return this.Be.ji && $.includes(t)
            }
            Bo(t) {
                return this.Be.Ti && A.includes(t)
            }
            xo() {
                const t = D();
                return t.length && t[t.length - 1] === this.oo
            }
            Si() {
                return k.Le(this.oo).bo
            }
            gi() {
                const t = k.wo(this.oo);
                return null === t.owner && 0 === t.satoshis
            }
            pr() {
                return G && G.oo === this.oo && G.nr
            }
        }

        function W(t) {
            return ["undefined", "boolean", "number", "string", "symbol"].includes(typeof t) || null === t
        }

        function J(t, e = !0) {
            if (!("value" in t)) throw new StateError("Descriptor must have a value");
            if ("get" in t) throw new StateError("Getters are not supported");
            if ("set" in t) throw new StateError("Getters are not supported");
            if (e && !t.configurable) throw new StateError("Descriptor must be configurable");
            if (!e && t.configurable) throw new StateError("Descriptor must be non-configurable");
            if (!t.writable) throw new StateError("Descriptor must be writable");
            if (!t.enumerable) throw new StateError("Descriptor must be enumerable")
        }

        function z(t) {
            if (!u(t)) throw new StateError(`Not serializable: ${s(t)}`)
        }

        function Y(t, e) {
            const Code = n(1);
            t instanceof Code && M.Gt(t).We();
            const Creation = n(6),
                r = x(e, j, (t => {
                    if ("function" == typeof t && !(t instanceof Creation)) {
                        const e = M.Xe(t);
                        return M.Gt(e).We(), e
                    }
                    t instanceof Code && M.Gt(t).We()
                }));
            return N([t, r], [t]), r
        }
        V.ro = Y, t.exports = V
    }, function(t, e, n) {
        const r = n(9),
            o = n(14),
            {
                L: i,
                Y: s,
                G: c,
                Ot: a,
                St: u,
                B: h,
                it: f
            } = n(0),
            {
                pe: l,
                ut: p
            } = n(13),
            {
                StateError
            } = n(4),
            d = n(2),
            w = n(24),
            {
                $u: y
            } = n(16),
            {
                A: b,
                ye: g
            } = n(11),
            {
                g: _
            } = n(7),
            m = n(47),
            E = n(8).ki,
            {
                eo: v
            } = n(15),
            P = n(3),
            O = n(10),
            {
                Transaction: S,
                Script: $
            } = r,
            A = "Publish",
            x = new m,
            I = new m;
        async function R(t) {
            try {
                d.zt && d.Yt(A, "Publish", t.Hr.Cn);
                const e = new Date,
                    n = t.B,
                    o = t.Hr;
                t.Ni() || t.Ui(!0);
                const i = new u("publish", n.At);
                await j(t), i.Rt();
                const c = await C(t);
                i.Rt(), await T(t, i), i.Rt(), k(t);
                const a = N(o),
                    h = await U(t, i);
                i.Rt();
                const f = M(h),
                    l = F(o, a),
                    p = D(t, f, l, a),
                    w = r.Transaction.FEE_PER_KB,
                    y = L(t, p, c, w);
                await G(n, o, h, p, y, i), i.Rt();
                const b = await I.Fi((async () => {
                    const e = await W(y, t, w);
                    i.Rt();
                    const n = await Y(e, t, w);
                    i.Rt(), K(n, o, y);
                    const r = await H(t, n, i);
                    if ("string" != typeof r || 64 !== r.length) throw new StateError(`Invalid txid: ${s(r)}`);
                    return i.Rt(), r
                }));
                i.Rt(), V(t, b), await q(t, h, b), i.Rt();
                (p.exec.some((t => "DEPLOY" === t.op)) || p.exec.some((t => "UPGRADE" === t.op))) && n.yu.add(b), t.Mi(), d.zt && d.Yt(A, "Publish (end): " + (new Date - e) + "ms")
            } catch (e) {
                t.Bi(e)
            }
        }
        async function T(t, e) {
            const n = await t.Li(),
                r = t.Hr;
            for (const t of r.Ln) {
                const e = r.Vn.get(t);
                if (!(e.er.origin in n)) continue;
                const o = n[e.er.origin][1];
                if (e.er.nonce < o) throw new StateError(`Time travel for ${s(t)}`)
            }
        }
        async function j(t) {
            const Creation = n(6),
                e = t.Hr;
            async function r() {
                const n = [];
                for (let r = 0; r < e.qt.length; r++) {
                    const o = e.qt[r],
                        i = void 0 === t.Gi.get(o).er.owner && await t.B.Vi().nextOwner();
                    n.push(i)
                }
                return n
            }

            function o(e) {
                p(e, (e => {
                    if (e instanceof Creation) return t.Hr._read(e), !1
                }))
            }
            d.zt && d.Yt(A, "Assign owners"), await x.Fi((async () => {
                const n = await r(),
                    i = [],
                    s = O.Zt;
                try {
                    O.Zt = t.Hr, t.Hr.Jn = !1;
                    for (const t of n) {
                        if (!t) {
                            i.push(t);
                            continue
                        }
                        const e = l(t, E, (t => {
                            if ("function" != typeof t) return;
                            const e = P.Xe(t);
                            return P.Gt(e).We(), e
                        }));
                        i.push(e)
                    }
                } finally {
                    O.Zt = s
                }
                o(i), t.Ji(), i.forEach(((n, r) => {
                    if (!n) return;
                    const o = e.qt[r];
                    t.Gi.get(o).er.owner = n
                }));
                const c = await r(),
                    a = [];
                for (const t of c) {
                    if (!t) {
                        a.push(t);
                        continue
                    }
                    const e = l(t, E, (t => {
                        if ("function" != typeof t) return;
                        return P.Xe(t)
                    }));
                    a.push(e)
                }
                a.forEach(((n, r) => {
                    if (!n) return;
                    const o = e.qt[r];
                    t.Gi.get(o).er.owner = n
                })), o(a), t.Hr.Xn()
            })), await t.Wi()
        }
        async function C(t) {
            const e = c(t.B.Se().network),
                n = [],
                r = O.Zt;
            try {
                O.Zt = t.Hr, t.Hr.Bn.forEach((r => {
                    try {
                        t.Hr.qn(r);
                        const o = t.Gi.get(r).er.owner,
                            i = g(o, false, e).script();
                        n.push(i)
                    } finally {
                        t.Hr.Zn()
                    }
                })), t.Hr.Xn()
            } finally {
                O.Zt = r
            }
            return await t.Wi(), n
        }

        function k(t) {
            const e = t.Hr;
            e.Bn.forEach((e => {
                const n = t.Gi.get(e).er;
                n.satoshis = n.satoshis || 0, _((() => {
                    f(e.owner) || (e.owner = n.owner), f(e.satoshis) || (e.satoshis = n.satoshis)
                }))
            })), e.Un.forEach((t => {
                _((() => {
                    i(null === t.owner), i(0 === t.satoshis)
                }))
            }))
        }

        function N(t) {
            let e = a(t.Mn, t.Ln);
            return e = a(e, t.qt), e
        }
        async function U(t, e) {
            const {
                zi: r
            } = n(22), o = new Map, i = t.Hr, s = i.Bn.concat(i.Un);
            for (const n of s) {
                const i = await r(n, t, e);
                o.set(n, i)
            }
            return o
        }

        function M(t) {
            const {
                Yi: e
            } = n(22), r = new Map;
            for (const [n, o] of t) {
                if (r.has(n)) continue;
                const t = e(o);
                r.set(n, t)
            }
            return r
        }

        function F(t, e) {
            const n = (new w).Hi((t => {
                const n = e.indexOf(t);
                return i(n >= 0), n
            }));
            return t.Tn.map((t => ({
                op: t.op(),
                data: n.Ki(t.data())
            })))
        }

        function D(t, e, n, r) {
            const o = t.Hr,
                s = o.Bn.map((t => e.get(t))),
                c = o.Un.map((t => e.get(t))),
                a = (new w).Hi((t => {
                    const e = r.indexOf(t);
                    return i(e >= 0), e
                })),
                u = o.qt.map((e => t.Gi.get(e).er.owner)).map((t => a.Ki(t))),
                h = o.Ln.map((t => o.Vn.get(t).er.location)),
                f = {
                    app: t.qi,
                    version: t.mr,
                    in: o.Mn.length,
                    ref: h,
                    out: s,
                    del: c,
                    cre: u,
                    exec: n
                };
            return d.zt && d.Yt(A, "Payload", JSON.stringify(f, 0, 2)), f
        }

        function L(t, e, n, o) {
            d.zt && d.Yt(A, "Create partial tx");
            const i = new S,
                s = r.deps.Buffer,
                a = s.from("run", "utf8"),
                u = v(e.version),
                h = s.from(u, "hex"),
                f = s.from(e.app, "utf8"),
                l = Object.assign({}, e);
            delete l.app, delete l.version;
            const p = s.from(JSON.stringify(l), "utf8"),
                w = $.buildSafeDataOut([a, h, f, p]),
                _ = new S.Output({
                    script: w,
                    satoshis: 0
                });
            i.addOutput(_);
            const m = c(t.B.Se().network),
                E = t.Hr;
            return E.Mn.forEach((t => {
                const e = E.Vn.get(t),
                    n = e.er.location,
                    {
                        pu: r,
                        fu: o
                    } = b(n),
                    s = e.er.satoshis,
                    c = e.er.owner,
                    a = g(c, false, m).script(),
                    u = {
                        txid: r,
                        vout: o,
                        script: $.fromHex(a),
                        satoshis: s
                    };
                i.from(u)
            })), E.Bn.forEach(((e, r) => {
                const s = t.Gi.get(e),
                    c = n[r].length / 2,
                    a = Math.max(s.er.satoshis, y(c, o)),
                    u = $.fromHex(n[r]);
                i.addOutput(new S.Output({
                    script: u,
                    satoshis: a
                }))
            })), i
        }
        async function G(t, e, r, o, i, s) {
            if (t.Zi) {
                d.ue && d.ie(A, "Preverify");
                const c = new Date;
                try {
                    const c = n(28),
                        {
                            Qi: a
                        } = c,
                        u = "0000000000000000000000000000000000000000000000000000000000000000",
                        h = !1,
                        f = null,
                        l = new a(e, r);
                    await c(i, u, o, t, h, f, s, l)
                } catch (t) {
                    throw d.fe && d.ae(A, t), new Error(`Pre-verification failed: ${t.message}`)
                }
                d.zt && d.Yt(A, "Preverify (end): " + (new Date - c) + "ms")
            }
        }

        function V(t, e) {
            const Code = n(1),
                r = t.Hr;
            r.Bn.forEach(((n, r) => {
                const o = r + 1,
                    i = t.Gi.get(n),
                    s = `${e}_o${o}`;
                i.er.origin.startsWith("record://") && (i.er.origin = s), i.er.location = s, _((() => {
                    n.origin.startsWith("record://") && (n.origin = s), t.Xi(n) || (n.location = s)
                })), n instanceof Code && P.Gt(n).ke(i.er)
            })), r.Un.forEach(((n, r) => {
                const o = t.Gi.get(n),
                    i = `${e}_d${r}`;
                o.er.origin.startsWith("record://") && (o.er.origin = i), o.er.location = i, _((() => {
                    n.origin.startsWith("record://") && (n.origin = i), n.location = i
                })), n instanceof Code && P.Gt(n).ke(o.er)
            }))
        }
        async function W(t, e, n) {
            const o = r.deps.Buffer,
                i = J(e.Hr),
                s = await z(t, e.Hr, i, n),
                c = i.map((t => o.alloc(t.domain()))),
                a = [...Array(i.length).keys()].filter((e => !t.inputs[e].script.toBuffer().length));
            a.forEach((e => t.inputs[e].setScript(c[e])));
            const u = t.toString("hex"),
                h = await e.B.ts().pay(u, s),
                f = new S(h);
            return a.forEach((t => f.inputs[t].setScript(""))), f
        }

        function J(t) {
            return t.Mn.map((e => t.Vn.get(e))).map((t => t.er.owner)).map((t => g(t)))
        }
        async function z(t, e, n, o) {
            const i = n.map((t => t.script())),
                s = e.Mn.map(((t, n) => e.Vn.get(t))).map(((t, e) => Math.max(t.er.satoshis, y(i[e].length / 2, o)))),
                c = i.map(((t, e) => ({
                    script: t,
                    satoshis: s[e]
                }))),
                a = t.inputs.slice(e.Mn.length),
                u = (await Promise.all(a.map((t => h().Se().fetch(t.prevTxId.toString("hex")))))).map((t => new r.Transaction(t))),
                f = a.map(((t, e) => u[e].outputs[t.outputIndex])),
                l = f.map((t => t.script.toHex())),
                p = f.map((t => t.satoshis)),
                d = l.map(((t, e) => ({
                    script: t,
                    satoshis: p[e]
                })));
            return c.concat(d)
        }
        async function Y(t, e, n) {
            const r = e.Hr,
                o = J(r),
                i = await z(t, r, o, n),
                s = t.toString("hex"),
                c = await e.B.Vi().sign(s, i, o);
            return new S(c)
        }

        function K(t, e, n) {
            e.Mn.forEach(((n, r) => {
                if (t.inputs[r].isFullySigned()) return;
                const o = e.Vn.get(n),
                    i = `${`origin: ${o.er.origin}`}\n${`location: ${o.er.location}`}\n${`owner: ${o.er.owner}`}`,
                    c = t.inputs[r].script.toBuffer().length ? "Bad signature" : "Missing signature";
                throw new StateError(`${c} for ${s(n)}\n\n${i}`)
            }));
            for (let e = 0; e < n.inputs.length; e++)
                if (n.inputs[e].prevTxId.toString("hex") !== t.inputs[e].prevTxId.toString("hex") || n.inputs[e].outputIndex !== t.inputs[e].outputIndex) throw new StateError(`Transaction input ${e} changed`);
            for (let e = 0; e < n.outputs.length; e++)
                if (n.outputs[e].script.toHex() !== t.outputs[e].script.toHex()) throw new StateError(`Transaction output ${e} changed`)
        }
        async function H(t, e, r) {
            let i = null;
            try {
                await t.B.ts().broadcast(e.toString("hex"))
            } catch (t) {
                d.fe && d.ae(A, t.toString())
            }
            try {
                i = await t.B.Se().broadcast(e.toString("hex"))
            } catch (i) {
                throw await async function(t, e, r, i) {
                    const s = t.toString();
                    let c = `Broadcast failed: ${t.message}`;
                    if (-1 !== s.indexOf("tx has no inputs") || -1 !== s.indexOf("insufficient priority")) {
                        c = `${c}\n\n${"Hint: Is the purse funded to pay for this transaction?"}`
                    }
                    if (-1 !== s.indexOf("Missing inputs") || -1 !== s.indexOf("txn-mempool-conflict"))
                        for (const s of r.inputs) try {
                            const r = s.prevTxId.toString("hex"),
                                a = s.outputIndex,
                                u = `${r}_o${a}`,
                                h = await e.B.Se().spends(r, a);
                            if (!h) continue;
                            let f = "Payment";
                            try {
                                const t = new o(e.B, i),
                                    r = await t.$n(u);
                                f = r instanceof n(1) ? r.name : r.toString()
                            } catch (t) {}
                            c = `${c}\n\n${f} was spent in another transaction\n`, c = `${c}\nLocation: ${u}`, c = `${c}\nSpending Tx: ${h}`
                        } catch (t) {}
                    return new Error(c)
                }(i, t, e, r)
            }
            return i
        }
        async function q(t, e, n) {
            const r = [],
                o = t.Hr;
            for (let s = 0; s < o.Bn.length; s++) {
                const c = o.Bn[s],
                    a = e.get(c);
                i(a);
                const u = `jig://${n}_o${s+1}`;
                r.push(t.B.qr().set(u, a))
            }
            for (let s = 0; s < o.Un.length; s++) {
                const c = o.Un[s],
                    a = e.get(c);
                i(a);
                const u = `jig://${n}_d${s}`;
                r.push(t.B.qr().set(u, a))
            }
            await Promise.all(r)
        }
        R.es = T, R.ns = j, R.rs = C, R.os = k, R.ss = N, R.cs = U, R.us = M, R.hs = F, R.fs = D, R.ls = L, R.Zi = G, R.ps = I, R.ds = W, R.ws = Y, R.ys = K, R.gs = H, R.bs = V, R._s = q, t.exports = R
    }, function(t, e, n) {
        const {
            L: r
        } = n(0), o = n(21), {
            Tr: i
        } = n(15);
        class s {
            constructor() {
                this.oo = void 0, this.Sn = !1, this.ji = !1, this.Ti = !1, this._i = !1, this.Eu = !1, this.Ou = !1, this.vu = !1, this.Pi = !1, this.Ar = !1, this.Ri = !1, this.Ci = !1, this.So = !1, this.$o = !1, this.Oi = !1, this.Oo = !1, this.ko = [], this.do = [], this.Ao = !1, this.mr = i
            }
            static De() {
                const t = new s;
                return t.oo = void 0, t.Sn = !0, t.ji = !0, t.Ti = !0, t._i = !0, t.Eu = !0, t.Ou = !1, t.vu = !1, t.Pi = !0, t.Ar = !1, t.Ri = !0, t.Ci = !0, t.So = !0, t.$o = !0, t.Oi = !0, t.Oo = !1, t.do = [], t.ko = [], t.Ao = !0, t
            }
            static Me(t) {
                const e = new s;
                return e.oo = void 0, e.Sn = !0, e.ji = !0, e.Ti = !0, e._i = !0, e.Eu = !0, e.Ou = !1, e.vu = !1, e.Pi = !1, e.Ar = !0, e.Ri = !0, e.Ci = !1, e.So = !1, e.$o = !1, e.Oi = !1, e.Oo = !t, e.do = [], e.ko = [], e.Ao = !1, e
            }
            static Je() {
                const t = new s;
                return t.oo = void 0, t.Sn = !0, t.ji = !0, t.Ti = !0, t._i = !1, t.Eu = !0, t.Ou = !1, t.vu = !1, t.Pi = !1, t.Ar = !0, t.Ri = !1, t.Ci = !1, t.So = !1, t.$o = !1, t.Oi = !0, t.Oo = !1, t.do = [], t.ko = [], t.Ao = !1, t
            }
            static Pn(t) {
                const e = new s;
                return e.oo = void 0, e.Sn = !0, e.ji = !0, e.Ti = !0, e._i = !0, e.Eu = !1, e.Ou = !0, e.vu = !1, e.Pi = !0, e.Ar = !1, e.Ri = !0, e.Ci = !0, e.So = !0, e.$o = !0, e.Oi = !0, e.Oo = !1, e.do = t ? ["init"] : [], e.ko = ["init"], e.Ao = !1, e
            }
            static Sr(t) {
                const e = new s;
                return e.oo = void 0, e.Sn = !0, e.ji = !0, e.Ti = !0, e._i = !0, e.Eu = !1, e.Ou = !1, e.vu = !0, e.Pi = !1, e.Ar = !0, e.Ri = !0, e.Ci = !1, e.So = !1, e.$o = !1, e.Oi = !1, e.Oo = !1, e.do = t ? ["init"] : [], e.ko = ["init"], e.Ao = !1, e
            }
            static Qe(t, e) {
                const n = o.Le(t);
                r(n);
                const i = n.Be,
                    c = new s;
                return c.oo = t, c.Sn = i.Sn, c.ji = !1, c.Ti = !1, c._i = !1, c.Eu = !1, c.Ou = !1, c.vu = !1, c.Pi = i.Pi, c.Ar = i.Ar || e, c.Ri = i.Ri, c.Ci = i.Ci, c.So = i.So, c.$o = !1, c.Oi = i.Oi, c.Oo = i.Oo, c.do = [], c.ko = [], c.Ao = i.Ao, c
            }
        }
        t.exports = s
    }, function(t, e, n) {
        const {
            et: r,
            nt: o,
            rt: i,
            bt: s,
            _t: c,
            L: a
        } = n(0), u = n(8), h = u.P, f = new WeakMap, l = new WeakMap, p = new WeakMap, d = new WeakMap, w = s(Set.prototype), y = s(Map.prototype), b = s(Uint8Array.prototype).concat(s(Object.getPrototypeOf(Uint8Array.prototype))), g = c(Set.prototype), _ = c(Map.prototype), m = c(Uint8Array.prototype).concat(c(Object.getPrototypeOf(Uint8Array.prototype))), E = ["add", "clear", "copyWithin", "delete", "fill", "reverse", "set", "sort"], v = ["entries", "every", "filter", "find", "findIndex", "forEach", "get", "has", "includes", "indexOf", "join", "keys", "lastIndexOf", "map", "reduce", "reduceRight", "slice", "some", "subarray", "toLocaleString", "toString", "values", Symbol.iterator];
        class P {
            constructor(t, e) {
                const n = new h.Proxy(t, this);
                return f.set(n, t), l.set(t, e), l.set(n, e), p.set(n, this), this.Ss = e, this.As = t, this.xs = r(t), this.Is = o(t), this.Rs = i(t), n
            }
            apply(t, e, n) {
                return this.Ss._o ? this.Ss._o(this.As, e, n) : Reflect.apply(this.As, e, n)
            }
            construct(t, e, n) {
                return this.Ss.No ? this.Ss.No(this.As, e, n) : Reflect.construct(this.As, e, n)
            }
            defineProperty(t, e, n) {
                return this.Ss.Uo ? this.Ss.Uo(this.As, e, n) : Reflect.defineProperty(this.As, e, n)
            }
            deleteProperty(t, e) {
                return this.Ss.Lo ? this.Ss.Lo(this.As, e) : Reflect.deleteProperty(this.As, e)
            }
            getOwnPropertyDescriptor(t, e) {
                return this.Ss.Yo ? this.Ss.Yo(this.As, e) : Reflect.getOwnPropertyDescriptor(this.As, e)
            }
            getPrototypeOf(t) {
                return this.Ss.Ho ? this.Ss.Ho(this.As) : Reflect.getPrototypeOf(this.As)
            }
            has(t, e) {
                return this.Ss.Ko ? this.Ss.Ko(this.As, e) : Reflect.has(this.As, e)
            }
            isExtensible(t) {
                return this.Ss.Qo ? this.Ss.Qo(this.As) : Reflect.isExtensible(this.As)
            }
            ownKeys(t) {
                return this.Ss.Xo ? this.Ss.Xo(this.As) : Reflect.ownKeys(this.As)
            }
            preventExtensions(t) {
                return this.Ss.ei ? this.Ss.ei(this.As) : Reflect.preventExtensions(this.As)
            }
            set(t, e, n, r) {
                return this.Ss.ni ? this.Ss.ni(this.As, e, n, r) : Reflect.set(this.As, e, n, r)
            }
            setPrototypeOf(t, e) {
                return this.Ss.ri ? this.Ss.ri(this.As, e) : Reflect.setPrototypeOf(this.As, e)
            }
            get(t, e, n) {
                if (this.xs && w.includes(e) || this.Is && y.includes(e) || this.Rs && b.includes(e)) return this.Ss.oi && this.Ss.oi(), Reflect.get(this.As, e, this.As);
                if (this.xs && g.includes(e) || this.Is && _.includes(e) || this.Rs && m.includes(e)) {
                    const t = Reflect.get(this.As, e, n);
                    if (this.Ss.oi && this.Ss.oi(), d.has(t)) return d.get(t);
                    const r = new O(this.xs, this.Is, this.Rs, e),
                        o = new Proxy(t, r);
                    return d.set(t, o), o
                }
                return this.Ss.Gt ? this.Ss.Gt(this.As, e, n) : Reflect.get(this.As, e, n)
            }
            static Le(t) {
                return l.get(t)
            }
            static wo(t) {
                return f.get(t)
            }
            static Cs(t, e) {
                const n = f.get(t),
                    r = l.get(t),
                    o = p.get(t);
                a(n), o.As = e, l.delete(n), l.set(e, r), f.set(t, e)
            }
        }
        class O {
            constructor(t, e, n, r) {
                this.xs = t, this.Is = e, this.rt = n, this.js = r, this._read = v.includes(r), this.ur = E.includes(r), this.Ts = t && ["add"].includes(r) || e && ["set"].includes(r) || n && ["copyWithin", "fill", "reverse", "sort"].includes(r), this.ks = t && ["entries", "values", Symbol.iterator].includes(r) || e && ["entries", "keys", "values", Symbol.iterator].includes(r), this.Ns = this.ks && "entries" === r, this.Us = e && "get" === r, this.Fs = t && ["add", "delete", "has"].includes(r) || e && ["delete", "get", "has", "set"].includes(r), this.Ds = e && "set" === r, this.Ms = t && "forEach" === r || e && "forEach" === r
            }
            apply(t, e, n) {
                const r = P.Le(e);
                r && (r.ci && this._read && r.ci(), r.ai && this.ur && r.ai()), this.Ms && (n[0] = t => r && r.ii && t ? r.ii(t) : t), this.Fs && n[0] && r && r.si && (n[0] = r.si(n[0])), this.Ds && n[1] && r && r.si && (n[1] = r.si(n[1]));
                const o = P.wo(e) || e,
                    i = Reflect.apply(t, o, n);
                return this.Ts ? e : this.Us ? r && r.ii && i ? r.ii(i) : i : this.ks ? new $(i, r, this.Ns) : i
            }
        }
        class S {
            constructor(t, e, n) {
                this.Bs = t, this.Ss = e, this.Ls = n
            }
            next() {
                const t = this.Bs.next(),
                    e = {};
                if (e.done = t.done, e.value = t.value, this.Ss && this.Ss.ii)
                    if (this.Ls && e.value) {
                        const t = e.value[0] ? this.Ss.ii(e.value[0]) : e.value[0],
                            n = e.value[1] ? this.Ss.ii(e.value[1]) : e.value[1];
                        e.value = [t, n]
                    } else e.value = e.value ? this.Ss.ii(e.value) : e.value;
                return e
            } [Symbol.iterator]() {
                return this
            }
        }
        const $ = u.Ve(S, {}, !0, !1)[0];
        t.exports = P
    }, function(t, e, n) {
        const r = n(9),
            o = n(2),
            {
                B: i,
                L: s,
                J: c,
                Et: a,
                Y: u,
                yt: h,
                Ct: f,
                it: l,
                I: p,
                C: d
            } = n(0),
            {
                A: w,
                Rn: y
            } = n(11),
            {
                StateError
            } = n(4),
            {
                g: b
            } = n(7),
            g = n(3),
            _ = n(18),
            m = n(20),
            E = n(24),
            v = n(8),
            {
                no: P,
                Xr: O
            } = n(15),
            S = "State";
        class $ {
            constructor(t, e) {
                s(e instanceof Promise), this.Jr = t, this.Vr = e
            }
        }
        t.exports = {
            zi: async function(t, e, n) {
                o.zt && o.Yt(S, "Capture", u(t));
                const r = e.Hr,
                    i = e.Gi.get(t);
                s(i);
                const c = await e.Li(n);
                n.Rt();
                const h = (new E).Hi((t => {
                        const e = r.Bn.findIndex((e => a(t, e)));
                        if (e >= 0) return `_o${e+1}`;
                        const n = r.Un.findIndex((e => a(t, e)));
                        if (n >= 0) return `_d${n}`;
                        const o = r.Ln.find((e => a(t, e)));
                        if (o) return r.Vn.get(o).er.location;
                        const i = b((() => t.origin));
                        if (i.startsWith("native://")) return i;
                        const u = c[i] && c[i][0];
                        return s(u), u
                    })),
                    f = {};
                i.Gs && (f.cls = h.Ki(i.Gs)), f.kind = i.Vs;
                const l = Object.assign({}, i.er),
                    p = r.Bn.findIndex((e => a(e, t))),
                    d = r.Un.findIndex((e => a(e, t))),
                    w = -1 === p ? `_d${d}` : `_o${p+1}`;
                return l.location = w, s(!l.origin.startsWith("record://") || l.origin.startsWith(`record://${r.Cn}`)), l.origin.startsWith(`record://${r.Cn}`) && (l.origin = w), f.props = h.Ki(l), i.Jt && (f.src = i.Jt), f.version = P(e.mr), f
            },
            Kr: function(t, e) {
                const n = (new E).Hi((t => {
                        const e = b((() => t.location)),
                            n = w(e);
                        return s(l(n.pu) && !l(n.Hr) && !l(n.ae)), e
                    })),
                    r = {};
                r.cls = n.Ki(t.constructor), r.kind = "berry";
                const o = b((() => Object.assign({}, t)));
                return r.props = n.Ki(o), r.version = P(e), r
            },
            Gr: async function(t, e, s) {
                const a = n(14);
                s = s || new a(i());
                const u = await s.B.qr().get(t);
                if (!u) return;
                o.ue && o.ie(S, "Recreate", t), O(u.version);
                const l = f(u),
                    P = new r.deps.Buffer(l, "utf8"),
                    A = r.crypto.Hash.sha256(P).toString("hex");
                if (e && A !== e) throw new StateError(`State hash mismatch for ${t}`);
                const x = new Map,
                    I = (new E).Ws().Js((t => (x.set(t, null), (t => {
                        class e {}
                        return e.location = t, e
                    })(t)))),
                    R = I.zs(u.props);
                switch (u.cls && I.zs(u.cls), u.kind) {
                    case "code": {
                        const e = t.split("//")[1].split("_")[0];
                        return async function(t, e, n, r, o) {
                            const i = {},
                                s = e.origin.startsWith("_") ? r : e.origin.slice(0, 64),
                                a = o.B;
                            try {
                                a.bu(s, "cache")
                            } catch (t) {
                                a.bu(r, "cache")
                            }
                            const u = c(t.src);
                            if (u) {
                                const t = e.deps[u].location,
                                    s = y(Object.assign({
                                        pu: r
                                    }, w(t))),
                                    c = await o.$n(s, void 0, !0);
                                n.set(t, c), i[u] = c
                            }
                            const f = g.ee(),
                                l = v.In(t.src, i)[0],
                                [p, d] = g.un(f, l),
                                _ = !1;
                            g.Gt(f).xe(p, _);
                            const m = (async () => {
                                for (const t of n.keys()) {
                                    if (n.get(t)) continue;
                                    const e = y(Object.assign({
                                            pu: r
                                        }, w(t))),
                                        i = await o.$n(e, void 0, !0);
                                    n.set(t, i)
                                }

                                function e(t) {
                                    const e = n.get(t),
                                        o = y(Object.assign({
                                            pu: r
                                        }, w(t)));
                                    if (!e) throw new StateError(`Jig not loaded: ${o}`);
                                    return e
                                }
                                const i = (new E).Ws().Js(e).zs(t.props);
                                b((() => {
                                    Object.keys(f).forEach((t => {
                                        delete f[t]
                                    })), Object.keys(i).forEach((t => h(f, t, i[t])))
                                })), b((() => {
                                    f.location = y(Object.assign({
                                        pu: r
                                    }, w(f.location))), f.origin = y(Object.assign({
                                        pu: r
                                    }, w(f.origin)))
                                })), b((() => {
                                    const t = g.hn(f, d, f.deps);
                                    h(f, "deps", t), Object.keys(i.deps || {}).forEach((t => {
                                        f.deps[t] = i.deps[t]
                                    }))
                                })), o.B.tr("load", f)
                            })();
                            return new $(f, m)
                        }(u, R, x, e, s)
                    }
                    case "jig": {
                        const e = t.split("//")[1].split("_")[0];
                        return async function(t, e, n, r, o) {
                            const i = !0,
                                s = m.Pn(i),
                                c = new _(e, s);
                            async function a() {
                                for (const t of n.keys()) {
                                    if (n.get(t)) continue;
                                    const e = y(Object.assign({
                                            pu: r
                                        }, w(t))),
                                        i = await o.$n(e, void 0, !0);
                                    n.set(t, i)
                                }
                                const e = n.get(t.cls.$jig);

                                function i(t) {
                                    const e = n.get(t),
                                        o = y(Object.assign({
                                            pu: r
                                        }, w(t)));
                                    if (!e) throw new StateError(`Jig not loaded: ${o}`);
                                    return e
                                }
                                b((() => Object.setPrototypeOf(c, e.prototype)));
                                const s = (new E).Ws().Js(i).zs(t.props);
                                b((() => {
                                    Object.keys(s).forEach((t => {
                                        h(c, t, s[t])
                                    }))
                                })), b((() => {
                                    c.location = y(Object.assign({
                                        pu: r
                                    }, w(c.location))), c.origin = y(Object.assign({
                                        pu: r
                                    }, w(c.origin)))
                                })), o.B.tr("load", c)
                            }
                            p.add(c);
                            const u = a();
                            return new $(c, u)
                        }(u, R, x, e, s)
                    }
                    case "berry":
                        return async function(t, e, n, r, o) {
                            const i = !0,
                                s = m.Sr(i),
                                c = new _(e, s);
                            async function a() {
                                for (const t of n.keys()) {
                                    if (n.get(t)) continue;
                                    const e = y(Object.assign({
                                            _hash: r
                                        }, w(t))),
                                        i = await o.$n(e, void 0, !0);
                                    n.set(t, i)
                                }
                                const B = n.get(t.cls.$jig);

                                function e(t) {
                                    const e = n.get(t),
                                        o = y(Object.assign({
                                            _hash: r
                                        }, w(t)));
                                    if (!e) throw new StateError(`Jig not loaded: ${o}`);
                                    return e
                                }
                                b((() => Object.setPrototypeOf(c, B.prototype)));
                                const i = (new E).Ws().Js(e).zs(t.props);
                                b((() => {
                                    Object.keys(i).forEach((t => {
                                        h(c, t, i[t])
                                    }))
                                })), b((() => {
                                    c.location = y(Object.assign({
                                        _hash: r
                                    }, w(c.location))), c.origin = y(Object.assign({
                                        _hash: r
                                    }, w(c.origin)))
                                })), o.B.tr("load", c)
                            }
                            d.add(c);
                            const u = a();
                            return new $(c, u)
                        }(u, R, x, A, s);
                    default:
                        throw new StateError(`Unknown jig kind: ${u.kind}`)
                }
            },
            Yi: function(t) {
                const e = f(t),
                    n = r.deps.Buffer.from(e, "utf8");
                return r.crypto.Hash.sha256(n).toString("hex")
            }
        }
    }, function(t, e, n) {
        const r = n(2),
            {
                RequestError,
                TimeoutError
            } = n(4),
            {
                $t: o
            } = n(0),
            i = "REST";
        class s {
            static async Gt(t, e = s.At, n = {}) {
                for (let o = 0; o <= s.Ys; o++) try {
                    return await s.Hs(t, "GET", void 0, e, n)
                } catch (e) {
                    if (o === s.Ys) throw e;
                    r.he && r.ce(e.toString()), r.he && r.ie(i, "GET", t, `(Retry ${o+1}/${s.Ys})`)
                }
            }
            static async Ks(t, e, n = s.At, o = {}) {
                for (let c = 0; c <= s.Ys; c++) try {
                    return await s.Hs(t, "POST", e, n, o)
                } catch (e) {
                    if (c === s.Ys) throw e;
                    r.he && r.ce(e.toString()), r.he && r.ie(i, "POST", t, `(Retry ${c+1}/${s.Ys})`)
                }
            }
            static async Hs(t, e, n, o, s) {
                r.ue && r.ie(i, e, t);
                let a = null;
                try {
                    a = await c(t, e, n, o, s)
                } catch (n) {
                    throw n.message += `\n\n${e} ${t}`, n
                }
                const {
                    data: u,
                    status: h,
                    statusText: f
                } = a;
                if (h >= 200 && h < 300) return u;
                const l = u.message ? u.message.message || u.message : u,
                    p = u.name && l ? `${u.name}: ${l}` : u.name || l;
                throw new RequestError(p, h, f, e, t)
            }
        }
        let c = null;
        c = async function(t, e, n, r, i) {
            const {
                AbortController: s,
                fetch: c
            } = window, a = new s;
            i.accept = "application/json", n && (i["content-type"] = "application/json");
            const u = {
                method: e,
                body: JSON.stringify(n),
                headers: i,
                signal: a.signal
            };
            let h = !1;
            const f = setTimeout((() => {
                h = !0, a.abort()
            }), o(r, "timeout"));
            try {
                const e = await c(t, u);
                let n = null;
                const r = e.headers.get("content-type");
                return n = r && r.includes("application/json") ? await e.json() : await e.text(), {
                    data: n,
                    status: e.status,
                    statusText: e.statusText
                }
            } catch (t) {
                if (h) throw new TimeoutError(`Request timed out after ${r}ms`);
                throw t
            } finally {
                clearTimeout(f)
            }
        }, s.At = 3e4, s.Ys = 2, t.exports = s
    }, function(t, e, n) {
        (function(e) {
            const {
                Y: r,
                X: o,
                tt: i,
                et: s,
                nt: c,
                rt: a,
                it: u,
                st: h,
                jt: f
            } = n(0), l = n(8), p = l.P, d = l.O, w = l.S, y = l.$, b = new Set;
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split("").forEach((t => b.add(t)));
            const g = t => {
                    throw new Error(`Cannot encode ${r(t)}`)
                },
                _ = t => {
                    throw new Error(`Cannot decode ${r(JSON.stringify(t))}`)
                };
            t.exports = class {
                constructor() {
                    this.qs = d, this.Zs = void 0, this.Qs = void 0, this.Xs = new Map, this.tc = new Map, this.ec = null
                }
                Ki(t) {
                    return this.Xs = new Map, this.nc(t, [])
                }
                zs(t) {
                    return this.tc = new Map, this.ec = t, this.rc(t)
                }
                Ws() {
                    return this.qs = p, this
                }
                Hi(t) {
                    return this.Zs = t, this
                }
                Js(t) {
                    return this.Qs = t, this
                }
                nc(t, e) {
                    switch (typeof t) {
                        case "undefined": {
                            const t = this.oc();
                            return t.$und = 1, t
                        }
                        case "string":
                        case "boolean":
                            return t;
                        case "number":
                            if (isNaN(t) || !isFinite(t) || h(t)) {
                                const e = this.oc();
                                return isNaN(t) && (e.$nan = 1), t === 1 / 0 && (e.$inf = 1), t === -1 / 0 && (e.$ninf = 1), h(t) && (e.$n0 = 1), e
                            }
                            return t;
                        case "symbol":
                            break;
                        case "object":
                        case "function":
                            if (!t) return null;
                            if (this.Xs.has(t)) {
                                const e = this.oc();
                                return e.$dup = this.qs.Array.from(this.Xs.get(t)), e
                            }
                            return this.Xs.set(t, e), this.ic(t, e)
                    }
                    g(t)
                }
                ic(t, r) {
                    if ((w.has(t) || y.has(t)) && g(t), o(t)) {
                        const e = f(t).some((t => t.startsWith("$"))),
                            n = this.oc();
                        let o = n,
                            i = r;
                        return e && (n.$obj = this.oc(), o = n.$obj, i = r.concat(["$obj"])), f(t).forEach((e => {
                            o[e] = this.nc(t[e], i.concat([e.toString()]))
                        })), n
                    }
                    if (i(t)) {
                        const e = f(t);
                        if (e.length === t.length) {
                            const n = this.sc();
                            return e.forEach((e => n.push(this.nc(t[e], r.concat([e.toString()]))))), n
                        } {
                            const n = this.oc(),
                                o = this.oc(),
                                i = r.concat(["$arr"]);
                            return e.forEach((e => {
                                o[e] = this.nc(t[e], i.concat([e.toString()]))
                            })), n.$arr = o, n
                        }
                    }
                    if (s(t)) {
                        const e = this.oc();
                        e.$set = this.sc();
                        let n = 0;
                        const o = r.concat(["$set"]);
                        for (const r of t) e.$set.push(this.nc(r, o.concat([n.toString()]))), n++;
                        if (f(t).length) {
                            e.props = this.oc();
                            const n = r.concat(["props"]);
                            f(t).forEach((r => {
                                e.props[r] = this.nc(t[r], n.concat([r.toString()]))
                            }))
                        }
                        return e
                    }
                    if (c(t)) {
                        const e = this.oc();
                        e.$map = this.sc();
                        let n = 0;
                        const o = r.concat(["$map"]);
                        for (const [r, i] of t) {
                            const t = this.sc();
                            t.push(this.nc(r, o.concat([n.toString(), "0"]))), t.push(this.nc(i, o.concat([n.toString(), "1"]))), e.$map.push(t), n++
                        }
                        if (f(t).length) {
                            e.props = this.oc();
                            const n = r.concat(["props"]);
                            f(t).forEach((r => {
                                e.props[r] = this.nc(t[r], n.concat([r.toString()]))
                            }))
                        }
                        return e
                    }
                    if (a(t)) {
                        f(t).length !== t.length && g(t);
                        const n = this.oc(),
                            r = e.from(new Uint8Array(t));
                        return n.$ui8a = r.toString("base64"), n
                    }
                    if (this.Zs) {
                        const Creation = n(6);
                        if (t instanceof Creation) {
                            const e = this.oc();
                            return e.$jig = this.Zs(t), e
                        }
                        const e = this.oc(),
                            o = Object.assign({}, t),
                            i = r.concat(["$arb"]),
                            s = r.concat(["T"]);
                        return e.$arb = this.nc(o, i), e.T = this.nc(t.constructor, s), e
                    }
                    g(t)
                }
                rc(t) {
                    switch (typeof t) {
                        case "string":
                        case "boolean":
                            return t;
                        case "number":
                            if (isNaN(t) || !isFinite(t)) break;
                            return h(t) ? 0 : t;
                        case "object":
                        case "function":
                            return t ? this.cc(t) : null
                    }
                    _(t)
                }
                cc(t) {
                    if (o(t)) {
                        let n;
                        if (f(t).forEach((e => {
                                e.startsWith("$") && (n && _(t), n = e)
                            })), "$und" === n && 1 === t.$und) return;
                        if ("$n0" === n && 1 === t.$n0) return -0;
                        if ("$nan" === n && 1 === t.$nan) return NaN;
                        if ("$inf" === n && 1 === t.$inf) return 1 / 0;
                        if ("$ninf" === n && 1 === t.$ninf) return -1 / 0;
                        if (!n) {
                            const e = this.oc();
                            return this.tc.set(t, e), f(t).forEach((n => {
                                e[n] = this.rc(t[n])
                            })), e
                        }
                        if ("$obj" === n) {
                            const e = t.$obj;
                            o(e) && e || _(t);
                            const n = this.oc();
                            return this.tc.set(t, n), f(e).forEach((t => {
                                n[t] = this.rc(e[t])
                            })), n
                        }
                        if ("$arr" === n) {
                            o(t.$arr) && t.$arr || _(t);
                            const e = this.sc();
                            this.tc.set(t, e);
                            const n = t.$arr;
                            return f(n).forEach((t => {
                                e[t] = this.rc(n[t])
                            })), e
                        }
                        if ("$dup" === n) {
                            const e = t.$dup;
                            i(e) || _(t);
                            let n = this.ec;
                            for (let r = 0; r < e.length; r++) {
                                const o = e[r];
                                o in n || _(t), n = n[o]
                            }
                            this.tc.has(n) || _(t);
                            const r = this.tc.get(n);
                            return this.tc.set(t, r), r
                        }
                        if ("$set" === n) {
                            i(t.$set) || _(t), u(t.props) && !o(t.props) && _(t);
                            const e = this.ac();
                            this.tc.set(t, e);
                            for (const n of t.$set) e.add(this.rc(n));
                            const n = t.props;
                            return n && f(n).forEach((t => {
                                e[t] = this.rc(n[t])
                            })), e
                        }
                        if ("$map" === n) {
                            i(t.$map) || _(t), u(t.props) && !o(t.props) && _(t);
                            const e = this.uc();
                            this.tc.set(t, e);
                            for (const n of t.$map) i(n) && 2 === n.length || _(t), e.set(this.rc(n[0]), this.rc(n[1]));
                            const n = t.props;
                            return n && f(n).forEach((t => {
                                e[t] = this.rc(n[t])
                            })), e
                        }
                        if ("$ui8a" === n) {
                            "string" != typeof t.$ui8a && _(t), t.$ui8a.split("").some((t => !b.has(t))) && _(t);
                            const n = e.from(t.$ui8a, "base64"),
                                r = new this.qs.Uint8Array(n);
                            return this.tc.set(r, r), r
                        }
                    }
                    if (i(t)) {
                        const e = this.sc();
                        this.tc.set(t, e);
                        for (const n of t) e.push(this.rc(n));
                        return e
                    }
                    if (this.Qs) {
                        if (o(t) && u(t.$jig)) {
                            const e = this.Qs(t.$jig);
                            if (e) return this.tc.set(t, e), e
                        }
                        if (o(t) && u(t.$arb) && u(t.T)) {
                            const e = this.oc();
                            this.tc.set(t, e), Object.assign(e, this.rc(t.$arb));
                            const n = this.rc(t.T);
                            return Object.setPrototypeOf(e, n.prototype), e
                        }
                    }
                    _(t)
                }
                oc() {
                    return new this.qs.Object
                }
                sc() {
                    return new this.qs.Array
                }
                ac() {
                    return new this.qs.Set
                }
                uc() {
                    return new this.qs.Map
                }
            }
        }).call(this, n(46).Buffer)
    }, function(t, e, n) {
        const r = n(9),
            o = n(10),
            i = n(28),
            s = n(2),
            {
                L: c,
                Y: a,
                B: u,
                St: h
            } = n(0),
            {
                Qr: f
            } = n(14),
            {
                ArgumentError,
                StateError
            } = n(4),
            l = "Transaction";
        class p {
            constructor() {
                this.Hr = new o, this.Hr.Wn = !1, this.Hr.Jn = !1, this.Kn = null, this.hc = null, this.fc = null, this.lc = null, this.dc = null, this.wc = null, this.yc = null, this._r = !1
            }
            get outputs() {
                return [...this.Hr.Bn]
            }
            get deletes() {
                return [...this.Hr.Un]
            }
            update(t) {
                if ("function" != typeof t) throw new ArgumentError("Invalid callback");
                if (s.ue && s.ie(l, "Update"), p.Ht) throw new StateError("update disabled during atomic update");
                if (this.wc) throw new Error("update disabled during export");
                if (this.yc) throw new Error("update disabled during publish");
                if (this.lc) throw new Error("update disabled during pay");
                if (this.dc) throw new Error("update disabled during sign");
                if (this.fc) throw new Error("update disabled during build");
                if (this._r) throw new Error("update disabled once published");
                this.Kn = null, this.hc = null;
                const e = o.Zt;
                try {
                    o.Zt = this.Hr, o.Zt.Yn();
                    let n = null;
                    try {
                        p.Ht = !0, n = t()
                    } finally {
                        p.Ht = !1
                    }
                    if (n instanceof Promise) throw new Error("async transactions not supported");
                    return o.Zt.Hn(), n
                } catch (t) {
                    throw this.rollback(), t
                } finally {
                    o.Zt = e
                }
            }
            pay() {
                if (p.Ht) throw new StateError("pay disabled during atomic update");
                if (this.dc) throw new Error("pay disabled during sign");
                if (this.wc) throw new Error("pay disabled during export");
                if (this.yc) throw new Error("pay disabled during publish");
                if (this.lc) return this.lc;
                if (this.fc) throw new Error("pay disabled during build");
                const t = new h("pay"),
                    e = async () => {
                        const {
                            ps: e,
                            ds: o
                        } = n(19);
                        await e.Fi((async () => {
                            const e = r.Transaction.FEE_PER_KB;
                            this.hc = await o(this.hc, this.Kn, e), t.Rt()
                        }))
                    };
                return this.lc = this.gc(t, !1).then((() => e())), this.lc.then((() => {
                    this.lc = null
                })).catch((t => {
                    throw this.lc = null, t
                })), this.lc
            }
            sign() {
                if (p.Ht) throw new StateError("sign disabled during atomic update");
                if (this.lc) throw new Error("sign disabled during pay");
                if (this.wc) throw new Error("sign disabled during export");
                if (this.yc) throw new Error("sign disabled during publish");
                if (this.dc) return this.dc;
                if (this.fc) throw new Error("sign disabled during build");
                const t = new h("sign"),
                    e = async () => {
                        const {
                            ps: e,
                            ws: o
                        } = n(19);
                        await e.Fi((async () => {
                            const e = r.Transaction.FEE_PER_KB;
                            this.hc = await o(this.hc, this.Kn, e), t.Rt()
                        }))
                    };
                return this.dc = this.gc(t, !1).then((() => e())), this.dc.then((() => {
                    this.dc = null
                })).catch((t => {
                    throw this.dc = null, t
                })), this.dc
            }
            publish(t = {}) {
                s.ue && s.ie(l, "Publish");
                const e = new Date;
                if (p.Ht) throw new StateError("publish disabled during atomic update");
                if (this.lc) throw new Error("publish disabled during pay");
                if (this.dc) throw new Error("publish disabled during sign");
                if (this.wc) throw new Error("publish disabled during export");
                if (this.yc) return this.yc;
                if (this._r) return !0;
                if (this.fc) throw new Error("publish disabled during build");
                if (void 0 !== t.pay && "boolean" != typeof t.pay) throw new ArgumentError(`Invalid pay: ${a(t.pay)}`);
                if (void 0 !== t.sign && "boolean" != typeof t.sign) throw new ArgumentError(`Invalid sign: ${a(t.sign)}`);
                const n = void 0 === t.pay || t.pay,
                    r = void 0 === t.sign || t.sign,
                    o = new h("publish");
                this.yc = this.gc(o, !0).then((() => this.bc(n, r, o)));
                return this.yc.then((() => {
                    s.zt && s.Yt(l, "Publish (end): " + (new Date - e) + "ms"), this._r = !0, this.yc = null
                })).catch((t => {
                    throw this.yc = null, t
                })), this.yc
            }
            export (t = {}) {
                s.ue && s.ie(l, "Export");
                const e = new Date;
                if (p.Ht) throw new StateError("export disabled during atomic update");
                if (this.lc) throw new Error("export disabled during pay");
                if (this.dc) throw new Error("export disabled during sign");
                if (this.yc) throw new Error("export disabled during publish");
                if (this.wc) return this.wc;
                if (void 0 !== t.pay && "boolean" != typeof t.pay) throw new ArgumentError(`Invalid pay: ${a(t.pay)}`);
                if (void 0 !== t.sign && "boolean" != typeof t.sign) throw new ArgumentError(`Invalid sign: ${a(t.sign)}`);
                const n = void 0 === t.pay || t.pay,
                    r = void 0 === t.sign || t.sign,
                    o = new h("export");
                this.wc = this.gc(o, !1).then((() => this._c(n, r, o)));
                return this.wc.then((t => (s.zt && s.Yt(l, "Export (end): " + (new Date - e) + "ms"), this.wc = null, t))).catch((t => {
                    throw this.wc = null, t
                })), this.wc
            }
            rollback() {
                if (s.ue && s.ie(l, "Rollback"), p.Ht) throw new StateError("rollback disabled during atomic update");
                if (this.wc) throw new Error("rollback disabled during export");
                if (this.yc) throw new Error("rollback disabled during publish");
                if (this.lc) throw new Error("rollback disabled during pay");
                if (this.dc) throw new Error("rollback disabled during sign");
                if (this.fc) throw new Error("rollback disabled during build");
                if (this._r) throw new Error("rollback disabled once published");
                this.Hr.rn(), this.Hr = new o, this.Hr.Wn = !1, this.Hr.Jn = !1
            }
            static async mc(t, e) {
                s.ue && s.ie(l, "Replay");
                const n = f(t),
                    r = u(),
                    o = await i(t, e, n, r, !1, null, undefined, !1),
                    c = new p;
                return c.Hr = o.Hr, c.Kn = o, c.hc = t, c
            }
            gc(t, e) {
                if (this.Kn && this.hc) return e && this.Kn.Ui(!0), Promise.resolve();
                if (c(!this.Kn && !this.hc), this.fc) return this.fc;
                const n = this.Hr.Kn();
                if (!n) throw new Error("Nothing to commit");
                return e && n.Ui(!0), this.fc = this.Ec(n, t), this.fc.then((t => (this.fc = null, t))).catch((t => {
                    throw this.fc = null, t
                })), this.fc
            }
            async Ec(t, e) {
                try {
                    await t.Wi();
                    const o = t.Hr;
                    c(!o.Gn.length);
                    const {
                        es: i,
                        ns: s,
                        rs: a,
                        os: u,
                        ss: h,
                        cs: f,
                        us: l,
                        hs: p,
                        fs: d,
                        ls: w,
                        Zi: y
                    } = n(19);
                    await s(t), e.Rt();
                    const b = await a(t);
                    e.Rt(), await i(t, e), e.Rt(), u(t);
                    const g = h(o),
                        _ = await f(t, e);
                    e.Rt();
                    const m = l(_),
                        E = d(t, m, p(o, g), g),
                        v = w(t, E, b, r.Transaction.FEE_PER_KB);
                    await y(t.B, o, _, E, v, e), e.Rt(), this.Kn = t, this.hc = v
                } catch (e) {
                    throw t.Ni() && t.Bi(e), e
                }
            }
            async bc(t, e, o) {
                const {
                    cs: i,
                    ps: s,
                    ds: c,
                    ws: u,
                    ys: h,
                    gs: f,
                    bs: l,
                    _s: p
                } = n(19);
                this.Kn.Ni() || this.Kn.Ui(!0);
                try {
                    const n = this.Kn.Hr,
                        d = await i(this.Kn, o);
                    o.Rt();
                    const w = await s.Fi((async () => {
                        const i = this.hc,
                            s = r.Transaction.FEE_PER_KB,
                            l = t ? await c(i, this.Kn, s) : i;
                        o.Rt();
                        const p = e ? await u(l, this.Kn, s) : l;
                        o.Rt(), h(p, n, i);
                        const d = await f(this.Kn, p, o);
                        if ("string" != typeof d || 64 !== d.length) throw new StateError(`Invalid txid: ${a(d)}`);
                        return o.Rt(), d
                    }));
                    o.Rt(), l(this.Kn, w), await p(this.Kn, d, w), o.Rt();
                    (n.Tn.some((t => "DEPLOY" === t.op())) || n.Tn.some((t => "UPGRADE" === t.op()))) && this.Kn.B.yu.add(w), this.Kn.Mi()
                } catch (t) {
                    throw this.Kn.Bi(t), t
                }
            }
            async _c(t, e, o) {
                const {
                    ps: i,
                    ds: s,
                    ws: c
                } = n(19), a = await i.Fi((async () => {
                    const n = this.hc,
                        i = r.Transaction.FEE_PER_KB,
                        a = t ? await s(n, this.Kn, i) : n;
                    o.Rt();
                    const u = e ? await c(a, this.Kn, i) : a;
                    return o.Rt(), u
                }));
                return o.Rt(), a.toString("hex")
            }
        }
        p.Ht = !1, t.exports = p
    }, function(t, e, n) {
        const r = n(3);
        class Hex {
            static stringToBytes(t) {
                if ("string" != typeof t || t.length % 2 != 0) throw new Error(`Bad hex: ${t}`);
                t = t.toLowerCase();
                const e = "0123456789abcdef".split(""),
                    n = [];
                for (let r = 0; r < t.length; r += 2) {
                    const o = e.indexOf(t[r]),
                        i = e.indexOf(t[r + 1]);
                    if (-1 === o || -1 === i) throw new Error(`Bad hex: ${t}`);
                    n.push(16 * o + i)
                }
                return n
            }
            static bytesToString(t) {
                if (!Array.isArray(t)) throw new Error(`Bad bytes: ${t}`);
                return t.forEach((t => {
                    if (!(t => Number.isInteger(t) && t >= 0 && t < 256)(t)) throw new Error(`Bad digit: ${t}`)
                })), t.map((t => t.toString("16"))).map((t => 1 === t.length ? "0" + t : t)).join("")
            }
        }
        Hex.toString(), Hex.presets = {}, Hex.presets.main = {}, Hex.presets.test = {}, Hex.presets.main.location = "727e7b423b7ee40c0b5be87fba7fa5673ea2d20a74259040a7295d9c32a90011_o1", Hex.presets.main.origin = "727e7b423b7ee40c0b5be87fba7fa5673ea2d20a74259040a7295d9c32a90011_o1", Hex.presets.main.nonce = 1, Hex.presets.main.owner = "1PytriYokKN3GpKw84L4vvrGBwUvTYzCpx", Hex.presets.main.satoshis = 0, Hex.presets.test.location = "1f0abf8d94477b1cb57629d861376616f6e1d7b78aba23a19da3e6169caf489e_o2", Hex.presets.test.origin = "1f0abf8d94477b1cb57629d861376616f6e1d7b78aba23a19da3e6169caf489e_o2", Hex.presets.test.nonce = 1, Hex.presets.test.owner = "n3CiECgxW1pB1rGbYiX67e4U7AnS3MpJeE", Hex.presets.test.satoshis = 0, t.exports = r.Fe(Hex)
    }, function(t, e, n) {
        const {
            Y: r,
            L: o,
            wt: i
        } = n(0), {
            ut: s,
            Rr: c
        } = n(13), {
            g: a
        } = n(7), {
            StateError
        } = n(4);
        let u = !0;
        t.exports = {
            Oc: function(t, e, i) {
                return a((() => {
                    const u = t.concat(e),
                        h = {};
                    u.forEach((t => {
                        const e = h[t.origin];
                        if (e) {
                            const n = `1st location: ${t.location}`,
                                o = `2nd location: ${e.location}`,
                                i = `Inconsistent reference: ${r(t)}\n\n${n}\n${o}`;
                            throw new StateError(i)
                        }
                        h[t.origin] = t
                    }));
                    const f = {},
                        l = new Set,
                        p = new Map;
                    u.forEach((t => {
                        f[t.origin] = t
                    }));
                    const Creation = n(6);
                    a((() => s(u, (t => {
                        if (t instanceof Creation) {
                            l.add(t);
                            const e = t.origin,
                                n = h[e];
                            if (n && t.nonce > n.nonce) {
                                const e = `1st location: ${t.location}`,
                                    o = `2nd location: ${n.location}`;
                                throw new StateError(`Time travel: ${r(t)}\n\n${e}\n${o}`)
                            }
                            const o = f[e];
                            (!o || t.nonce > o.nonce) && (f[e] = t)
                        }
                    })))), i && (f[i.origin] = i), c(i, ((t, e) => {
                        if (t !== i && t instanceof Creation) return e(!1), f[t.origin]
                    }));
                    for (const e of l) {
                        const n = new Map;
                        c(e, ((t, r) => {
                            if (t !== e && t instanceof Creation) {
                                const e = f[t.origin];
                                return t !== e && n.set(e, t), o(e), r(!1), e
                            }
                        })), t.includes(e) || p.set(e, n)
                    }
                    const d = {};
                    return Object.entries(f).forEach((([t, e]) => {
                        d[t] = [e.location, e.nonce]
                    })), {
                        vc: d,
                        $c: p
                    }
                }))
            },
            Sc: function(t) {
                a((() => {
                    for (const [e, r] of t.entries()) {
                        const Creation = n(6);
                        c(e, ((t, n) => {
                            if (t !== e && t instanceof Creation) return n(!1), r.get(t) || t
                        }))
                    }
                }))
            },
            le: function(t, e = []) {
                const Creation = n(6);
                if (!u) return;
                const h = t => a((() => !i(t, "origin") || t.origin.startsWith("error://") ? t : t.origin));
                return a((() => {
                    const n = new Map;
                    return e.forEach((t => {
                        o(t instanceof Creation);
                        const e = h(t);
                        if (!(!n.has(e) || n.get(e).nonce === t.nonce)) throw new StateError(`Cannot unify inconsistent ${r(t)}`);
                        n.set(e, t)
                    })), a((() => s(t, (t => {
                        if (t instanceof Creation) {
                            const o = h(t),
                                i = n.get(o) || t;
                            if (n.has(o) || n.set(o, t), t.nonce > i.nonce) {
                                if (e.includes(i)) {
                                    const e = `1st location: ${t.location}`,
                                        n = `2nd location: ${i.location}`;
                                    throw new Error(`Cannot unify inconsistent ${r(t)}\n\n${e}\n${n}`)
                                }
                                n.set(o, t)
                            }
                        }
                    })))), c(t, (t => {
                        if (t instanceof Creation) return n.get(h(t))
                    }))
                }))
            },
            Ac: function(t) {
                u = t
            }
        }
    }, function(t, e, n) {
        const {
            Y: r,
            Ot: o,
            Ct: i,
            St: s
        } = n(0), c = n(2), a = n(14), u = n(10), {
            Oc: h,
            Sc: f,
            Ac: l
        } = n(27), {
            g: p
        } = n(7), d = n(24), {
            ss: w,
            os: y,
            cs: b,
            us: g,
            rs: _,
            hs: m,
            fs: E,
            ls: v,
            bs: P,
            _s: O
        } = n(19), {
            StateError
        } = n(4), S = "Replay";
        async function $(t, e, $, A, x, I, R, T) {
            const j = n(64);
            c.ue && c.ie(S, "Replay", e);
            const C = new Date;
            (R = R || new s("replay", A.At)).Rt();
            !T && ($.exec.some((t => "DEPLOY" === t.op)) || $.exec.some((t => "UPGRADE" === t.op))) && A.bu(e, "replay");
            let k = [],
                N = [];
            const U = new a(A, R);
            for (let e = 0; e < $.in; e++) {
                const n = t.inputs[e],
                    r = `${n.prevTxId.toString("hex")}_o${n.outputIndex}`,
                    o = U.$n(r);
                k.push(o)
            }
            for (let t = 0; t < $.ref.length; t++) {
                const e = $.ref[t],
                    n = U.$n(e);
                N.push(n)
            }
            if (k = await Promise.all(k), N = await Promise.all(N), I && !k.some((t => t.location === I.location))) throw new StateError(`${r(I)} not found in the transaction\n\ntxid: ${e}\njig: ${I.location}`);
            const {
                vc: M,
                $c: F
            } = h(k, N, I);
            I && (k[k.findIndex((t => t.location === I.location))] = I);
            const D = new u;
            D.Wn = !0, D.Jn = !1;
            const L = u.Zt;
            l(!1);
            try {
                k.forEach((t => D.ur(t))), N.forEach((t => D._read(t))), u.Zt = D;
                for (const t of $.exec) {
                    const {
                        op: e,
                        data: n
                    } = t;
                    if (2 !== Object.keys(t).length) throw new StateError("Invalid exec");
                    if ("string" != typeof e) throw new StateError(`Invalid op: ${e}`);
                    if ("object" != typeof n || !n) throw new StateError(`Invalid data: ${n}`);
                    j(e, n, o(o(k, N), D.qt))
                }
            } catch (t) {
                throw D.rn(t), t
            } finally {
                u.Zt = L, l(!0)
            }
            let G = null;
            try {
                if (G = D.Kn(), !G) throw new StateError("Invalid payload: no commit generated");
                return G.qi = $.app, G.mr = $.version, G.vc = M, await async function(t, e, n, r, o, s, a) {
                    c.zt && c.Yt(S, "Verify", n);
                    const u = new Date,
                        h = t.Hr,
                        f = w(h);
                    ! function(t, e, n) {
                        const r = (new d).Ws().Js((t => n[t])),
                            o = e.cre.map((t => r.zs(t)));
                        if (t.Hr.qt.length !== e.cre.length) throw new StateError("Invalid locks");
                        for (let e = 0; e < o.length; e++) {
                            const n = o[e],
                                r = t.Hr.qt[e],
                                i = t.Gi.get(r);
                            p((() => {
                                r.owner = n
                            })), i.er.owner = n
                        }
                    }(t, r, f);
                    const l = await _(t);
                    y(t);
                    const $ = await b(t, s);
                    s.Rt();
                    const A = g($),
                        x = m(h, f),
                        I = E(t, A, x, f),
                        R = v(t, I, l, 0);
                    i(I) !== i(r) && function(t, e, n, r, o) {
                        c.fe && c.ae(S, "Expected payload:", JSON.stringify(t, 0, 3));
                        c.fe && c.ae(S, "Actual payload:", JSON.stringify(e, 0, 3));

                        function i(t, e, n, o) {
                            if (t === e) return;
                            const i = r.get(n);
                            o ? (c.ae(S, "Expected state:", JSON.stringify(o, 0, 3)), c.ae(S, "Actual state:", JSON.stringify(i, 0, 3))) : c.ae(S, "State mismatch:", JSON.stringify(i, 0, 3))
                        }
                        c.fe && (t.out.length === e.out.length ? t.out.forEach(((t, r) => {
                            i(t, e.out[r], n.Bn[r], o && o.xc(r))
                        })) : c.ae(S, `Expected ${t.out.length} outputs but actual was ${e.out.length}`), t.del.length === e.del.length ? t.del.forEach(((t, r) => {
                            i(t, e.del[r], n.Un[r], o && o.lr(r))
                        })) : c.ae(S, `Expected ${t.del.length} deletes but actual was ${e.del.length}`));
                        throw new Error("Payload mismatch\n\nHint: See logs")
                    }(r, I, h, $, a);
                    for (let t = 0; t < I.in; t++) {
                        const n = e.inputs[t],
                            r = R.inputs[t];
                        if (n.prevTxId.toString("hex") !== r.prevTxId.toString("hex")) throw new StateError(`Txid mismatch on input ${t}`);
                        if (n.outputIndex !== r.outputIndex) throw new StateError(`Vout mismatch on input ${t}`)
                    }
                    for (let t = 1; t <= I.out.length; t++) {
                        const n = e.outputs[t],
                            r = R.outputs[t];
                        if (n.script.toString("hex") !== r.script.toString("hex")) throw new StateError(`Script mismatch on output ${t}`);
                        if (n.satoshis < r.satoshis) {
                            const e = `Hint: Transaction has ${n.satoshis} but expected ${r.satoshis}`;
                            throw new StateError(`Satoshis mismatch on output ${t}\n\n${e}`)
                        }
                    }
                    c.zt && c.Yt(S, "Verify (end): " + (new Date - u) + "ms");
                    o && (P(t, n), await O(t, $, n), s.Rt())
                }(G, t, e, $, x, R, T), f(F), G
            } finally {
                c.zt && c.Yt(S, "Replay (end): " + (new Date - C) + "ms")
            }
        }
        $.Qi = class {
            constructor(t, e) {
                this.Hr = t, this.Ic = e
            }
            xc(t) {
                return this.Ic.get(this.Hr.Bn[t])
            }
            lr(t) {
                return this.Ic.get(this.Hr.Un[t])
            }
        }, t.exports = $
    }, function(t, e, n) {
        const {
            Y: r,
            yt: o
        } = n(0), {
            pe: i
        } = n(13), {
            g: s
        } = n(7), {
            qe: c,
            Rn: a
        } = n(11), u = n(8).P, h = n(2);
        t.exports = class {
            constructor(t, e, n) {
                h.zt && h.Yt("Snapshot", "Snapshot", r(t), e ? "(bindings only)" : ""), this.oo = t, e ? this.Rc(n) : this.yr()
            }
            Rc(t) {
                const e = this.oo,
                    n = this.er = {};
                this.wr = !0, this.gr = t, s((() => {
                    n.location = e.location, n.origin = e.origin, n.nonce = e.nonce, n.owner = i(e.owner, u), n.satoshis = e.satoshis
                }))
            }
            yr() {
                const t = this.oo;
                this.wr = !1, this.gr = !1;
                const Jig = n(5),
                    Code = n(1),
                    Berry = n(12),
                    e = n(3);
                if (t instanceof Jig) this.Vs = "jig";
                else if (t instanceof Code) this.Vs = e.Gt(t).Wt ? "native" : "code";
                else {
                    if (!(t instanceof Berry)) throw new Error(`Must only snapshot creations: ${r(t)}`);
                    this.Vs = "berry"
                }
                if (s((() => {
                        const e = Object.assign({}, t),
                            n = i(e, u);
                        this.er = n
                    })), "jig" !== this.Vs && "berry" !== this.Vs || (this.Gs = s((() => t.constructor))), "code" === this.Vs) {
                    const n = e.Gt(t);
                    this.Jt = n.Jt, this.Cc = n.ze()
                }
            }
            rn(t) {
                if ("native" !== this.Vs && !this.gr) return s((() => {
                    if (this.wr)
                        if (t) {
                            const e = a({
                                ae: `A previous error occurred\n\n${t}`
                            });
                            o(this.oo, "location", e)
                        } else o(this.oo, "location", c);
                    else {
                        if ("code" === this.Vs) {
                            n(3).Gt(this.oo).He(this.Cc)
                        }
                        if (Object.keys(this.oo).forEach((t => {
                                delete this.oo[t]
                            })), Object.keys(this.er).forEach((t => {
                                o(this.oo, t, this.er[t])
                            })), t) {
                            const Jig = n(5);
                            if (this.oo instanceof Jig && this.er.location === c) {
                                const e = a({
                                    ae: `Deploy failed\n\n${t}`
                                });
                                o(this.oo, "origin", e), o(this.oo, "location", e)
                            }
                        }
                    }
                }))
            }
        }
    }, function(t, e, n) {
        const {
            L: r,
            B: o,
            Et: i,
            it: s
        } = n(0), {
            g: c
        } = n(7), {
            ut: a
        } = n(13), {
            de: u,
            Rn: h
        } = n(11), f = n(29), l = n(2), p = n(19), {
            Tr: d
        } = n(15), w = "Commit", y = new Map;
        class b {
            constructor(t) {
                l.zt && l.Yt(w, "Create", t.Cn), r(t.Tn.length), r(t.Mn.length || t.Bn.length || t.Un.length), this.Hr = t, this.B = o(), this.qi = this.B.qi, this.mr = d, this.jc = [], this.Gi = new Map, this.Ji(), this.vc = null, this.Tc = [], this.kc = [], this._r = !1, this.Hr.Jn && (this.Ui(!0), this.Wi().then((() => p(this)))), this.Hr.Wn || (this.Hr.Bn.forEach((t => this.B.tr("update", t))), this.Hr.Un.forEach((t => this.B.tr("update", t))))
            }
            Ji() {
                this.Hr.Bn.concat(this.Hr.Un).filter((t => !this.Gi.has(t))).forEach((t => this.Gi.set(t, new f(t))))
            }
            Ui(t) {
                t ? (r(!this._r), r(!y.has(this.Hr.Cn)), y.set(this.Hr.Cn, this)) : (y.delete(this.Hr.Cn), r(!this.kc.length), r(!this.jc.length))
            }
            Ni() {
                return y.has(this.Hr.Cn)
            }
            async Wi() {
                const t = this.Hr;
                t.Gn = t.Gn.filter((t => !t._r)), t.Gn.length && (t.Gn.filter((t => !t.jc.includes(this))).forEach((t => t.jc.push(this))), await new Promise(((t, e) => this.Tc.push({
                    resolve: t,
                    reject: e
                }))))
            }
            async Nc() {
                r(this.Ni()), await new Promise(((t, e) => this.kc.push({
                    resolve: t,
                    reject: e
                })))
            }
            Uc(t) {
                const e = this.Hr;
                for (const [n, r] of t.Gi) {
                    const t = e.Mn.find((t => i(t, n))) || e.Ln.find((t => i(t, n)));
                    if (!t) continue;
                    const o = e.Vn.get(t);
                    o && u.forEach((t => {
                        o.er[t] = r.er[t]
                    }));
                    const a = this.Gi.get(t);
                    if (a) {
                        const t = a.er;
                        a.er.origin = r.er.origin, s(t.owner) || (t.owner = r.er.owner), s(t.satoshis) || (t.satoshis = r.er.satoshis)
                    }
                    c((() => {
                        t.origin = r.er.origin, s(t.owner) || (t.owner = r.er.owner), s(t.satoshis) || (t.satoshis = r.er.satoshis)
                    }))
                }
                e.Gn = e.Gn.filter((e => e !== t)), e.Gn.length || (this.Tc.forEach((t => t.resolve())), this.Tc = [])
            }
            Xi(t) {
                for (const e of this.jc)
                    for (const n of e.Hr.Mn)
                        if (i(t, n)) return !0;
                return !1
            }
            async Li(t) {
                if (this.vc) return this.vc;
                const e = new(n(14))(this.B, t),
                    r = this.Hr,
                    o = r.Mn.concat(r.Ln).map((t => r.Vn.get(t).er.location)),
                    i = await Promise.all(o.map((t => e.$n(t))));
                return this.vc = b.Fc(i, t), this.vc
            }
            static async Fc(t, e) {
                l.zt && l.Yt(w, "Build refmap");
                const Creation = n(6),
                    r = {};
                return c((() => a(t, (e => {
                    if (e instanceof Creation) return c((() => {
                        (!(e.origin in r) || r[e.origin][1] <= e.nonce) && (r[e.origin] = [e.location, e.nonce])
                    })), t.includes(e)
                })))), r
            }
            Mi() {
                this._r = !0, this.kc.forEach((t => t.resolve())), this.kc = [], this.jc.forEach((t => t.Uc(this))), this.Hr.Bn.filter((t => !this.Xi(t))).forEach((t => this.B.tr("publish", t))), this.Hr.Un.filter((t => !this.Xi(t))).forEach((t => this.B.tr("publish", t))), this.jc = [], this.Ui(!1)
            }
            Bi(t) {
                r(t);
                const e = this.Hr;
                this._r = !1, this.jc.forEach((e => e.Bi(t))), this.jc = [];
                const n = t && 0 === this.kc.length;
                if (l.fe && l.ae(w, n ? "Unhandled" : "", t), this.Hr.rn(t), n) {
                    const n = h({
                        ae: `Unhandled ${t}`
                    });
                    c((() => {
                        e.Bn.forEach((t => {
                            t.location = n
                        })), e.Un.forEach((t => {
                            t.location = n
                        }))
                    }))
                }
                e.Wn || (e.Bn.forEach((t => this.B.tr("update", t))), e.Un.forEach((t => this.B.tr("update", t)))), t && (this.kc.forEach((e => e.reject(t))), this.kc = []), this.Ui(!1)
            }
        }
        b.br = t => y.get(t), b.Dc = async () => {
            const t = [];
            for (const e of y.values()) t.push(e.Nc());
            return Promise.all(t)
        }, t.exports = b
    }, function(t, e, n) {
        const {
            Address: r,
            Script: o,
            Transaction: i
        } = n(9), {
            G: s,
            Y: c
        } = n(0), {
            NotImplementedError
        } = n(4), {
            Os: a
        } = n(16), {
            Cache: u
        } = n(36), h = n(2);
        class f {
            async Mc(t) {
                throw new NotImplementedError
            }
            async Bc(t) {
                throw new NotImplementedError
            }
            async Lc(t, e) {
                throw new NotImplementedError
            }
            constructor(t = {}) {
                this.network = l(t.network), this.api = p(t.api), this.apiKey = function(t) {
                    if ("string" == typeof t || void 0 === t) return t;
                    throw new Error(`Unsupported apiKey: ${t}`)
                }(t.apiKey), this.cache = d(t.cache), this.bsvNetwork = s(this.network), this.Gc = new Map, this.Vc = [], this.Jc = 1e4, this.Wc(t.lastBlockchain)
            }
            async broadcast(t) {
                const e = new i(t),
                    n = e.hash;
                if (t = e.toString("hex"), 0 === e.inputs.length) throw new Error("tx has no inputs");
                if (0 === e.outputs.length) throw new Error("tx has no outputs");
                if (!0 !== e.verify()) throw new Error(e.verify());
                await this.Mc(t);
                const r = [];
                if (!await this.cache.get(`time://${n}`)) {
                    const t = this.cache.set(`time://${n}`, Date.now());
                    t instanceof Promise && t.catch((t => {})), r.push(t)
                }
                for (const t of e.inputs) {
                    const e = `${t.prevTxId.toString("hex")}_o${t.outputIndex}`;
                    r.push(this.cache.set(`spend://${e}`, n))
                }
                return r.push(this.cache.set(`tx://${n}`, t)), await Promise.all(r), this.Vc.filter((([t]) => Date.now() - t.time < this.Jc)), e.time = Date.now(), this.Vc.push([e, n]), n
            }
            async fetch(t) {
                const e = await this.cache.get(`tx://${t}`);
                if (e) return e;
                const {
                    rawtx: n
                } = await this.zc(t);
                return n
            }
            async utxos(t) {
                if ("string" == typeof t) try {
                        t = o.fromAddress(t)
                    } catch (e) {
                        t = new o(t)
                    } else if (t instanceof r) t = o.fromAddress(t);
                    else if (!(t instanceof o)) throw new Error(`Invalid script: ${c(t)}`);
                const e = a(t),
                    n = this.Gc.get(e);
                if (n) return new Promise(((t, e) => n.push({
                    resolve: t,
                    reject: e
                })));
                this.Gc.set(e, []);
                try {
                    const n = await this.Lc(e, t.toString("hex"));
                    if (!Array.isArray(n)) throw new Error(`Received invalid utxos for ${t}\n\n: Type: ${typeof n}\n\nNetwork: ${this.network}`);
                    const r = this.Yc(n),
                        o = await this.Hc(r, t);
                    return this.Gc.get(e).forEach((t => t.resolve(o))), o
                } catch (t) {
                    throw this.Gc.get(e).forEach((e => e.reject(t))), t
                } finally {
                    this.Gc.delete(e)
                }
            }
            async time(t) {
                const e = await this.cache.get(`time://${t}`);
                if (e) return e;
                const {
                    time: n
                } = await this.zc(t);
                return n
            }
            async spends(t, e) {
                const n = await this.cache.get(`spend://${t}_o${e}`);
                if (n) return n;
                const {
                    spends: r
                } = await this.zc(t);
                return r[e]
            }
            async zc(t) {
                const e = this.Gc.get(t);
                if (e) return new Promise(((t, n) => e.push({
                    resolve: t,
                    reject: n
                })));
                this.Gc.set(t, []);
                try {
                    const {
                        rawtx: e,
                        time: n,
                        spends: r
                    } = await this.Bc(t), o = [];
                    if (o.push(this.cache.set(`tx://${t}`, e)), !await this.cache.get(`time://${t}`)) {
                        const e = this.cache.set(`time://${t}`, 1e3 * n);
                        e instanceof Promise && e.catch((t => {})), o.push(e)
                    }
                    r.forEach(((e, n) => {
                        e && o.push(this.cache.set(`spend://${t}_o${n}`, e))
                    }));
                    const s = new i(e);
                    for (const e of s.inputs) {
                        const n = `${e.prevTxId.toString("hex")}_o${e.outputIndex}`;
                        o.push(this.cache.set(`spend://${n}`, t))
                    }
                    await Promise.all(o);
                    const c = {
                        rawtx: e,
                        time: n,
                        spends: r
                    };
                    return this.Gc.get(t).forEach((t => t.resolve(c))), c
                } catch (e) {
                    throw this.Gc.get(t).forEach((t => t.reject(e))), e
                } finally {
                    this.Gc.delete(t)
                }
            }
            Wc(t) {
                t && this.network === t.network && (this.cache = t.cache, this.Vc = t.Vc)
            }
            Yc(t) {
                const e = new Set;
                return t.filter((t => {
                    const n = `${t.txid}_o${t.vout}`;
                    return e.has(n) ? (h.he && h.ce("RemoteBlockchain", "Duplicate utxo returned from server:", n), !1) : (e.add(n), !0)
                }))
            }
            async Hc(t, e) {
                this.Vc.filter((([t]) => Date.now() - t.time < this.Jc)), this.Vc.forEach((([n, r]) => {
                    n.outputs.forEach(((n, o) => {
                        n.script.equals(e) && !t.some((t => t.txid === r && t.vout === o)) && t.push({
                            txid: r,
                            vout: o,
                            script: n.script,
                            satoshis: n.satoshis
                        })
                    }))
                })), this.Vc.forEach((([e]) => {
                    t = t.filter((t => !e.inputs.some((e => ((t, e) => t.prevTxId.toString("hex") === e.txid && t.outputIndex === e.vout)(e, t)))))
                }));
                const n = t.map((t => t.txid + "_o" + t.vout)).map((t => this.cache.get("spend://" + t))),
                    r = await Promise.all(n);
                return t = t.filter(((t, e) => !r[e]))
            }
        }

        function l(t) {
            if (void 0 === t) return "main";
            if ("main" === t || "test" === t || "stn" === t) return t;
            throw new Error(`Unsupported network: ${t}`)
        }

        function p(t) {
            if ("string" == typeof t) return t;
            throw new Error(`Unsupported api: ${t}`)
        }

        function d(t) {
            if (t instanceof u) return t;
            if (void 0 === t) return new Map;
            throw new Error(`Unsupported cache: ${t}`)
        }
        f.create = (t = {}) => {
            const e = n(52),
                r = n(51),
                o = n(53);
            switch (typeof t.api) {
                case "string":
                    switch (t.api) {
                        case "run":
                            return new e(t);
                        case "bitindex":
                        case "mattercloud":
                            return new r(t);
                        case "whatsonchain":
                            return new o(t)
                    }
                    break;
                case "undefined":
                    return "stn" === t.network ? new o(t) : new e(t)
            }
            throw new Error(`Invalid blockchain API: ${t.api}`)
        }, f.Kc = l, f.qc = p, f.Zc = d, t.exports = f
    }, function(t, e, n) {
        const Jig = n(5),
            r = n(3);
        class Token extends Jig {
            init(t, e) {
                this.Pc(t);
                if (!(this.constructor !== Token)) throw new Error("Token must be extended");
                const n = caller === this.constructor,
                    r = caller && caller.constructor === this.constructor;
                if (!n && !r) throw new Error("Must create token using mint()");
                this.sender = r ? caller.owner : null, this.amount = t, e && (this.owner = e)
            }
            static mint(t, e) {
                return this.supply += t, new this(t, e)
            }
            send(t, e = this.amount) {
                if (this.Pc(e), this.amount === e) this.destroy();
                else {
                    if (!(this.amount > e)) throw new Error("Not enough funds");
                    this.amount -= e
                }
                return new this.constructor(e, t)
            }
            combine(...t) {
                if (!t.length) return this;
                const e = t.concat(this);
                if (e.some((t => t.constructor !== this.constructor))) throw new Error("Cannot combine different token classes");
                if (e.some((t => (t => e.reduce(((e, n) => n === t ? e + 1 : e), 0))(t) > 1))) throw new Error("Cannot combine duplicate tokens");
                return t.forEach((t => {
                    this.amount += t.amount, t.destroy()
                })), this.sender = null, this.Pc(this.amount), this
            }
            destroy() {
                super.destroy(), this.amount = 0, this.sender = null
            }
            Pc(t) {
                if ("number" != typeof t) throw new Error("amount is not a number");
                if (!Number.isInteger(t)) throw new Error("amount must be an integer");
                if (t <= 0) throw new Error("amount must be positive");
                if (t > Number.MAX_SAFE_INTEGER) throw new Error("amount too large")
            }
        }
        Token.sealed = !1, Token.decimals = 0, Token.icon = {
            emoji: null
        }, Token.symbol = null, Token.supply = 0, Token.version = "2.0", Token.toString(), Token.presets = {}, Token.presets.main = {}, Token.presets.test = {}, Token.presets.main.location = "72a61eb990ffdb6b38e5f955e194fed5ff6b014f75ac6823539ce5613aea0be8_o1", Token.presets.main.origin = "72a61eb990ffdb6b38e5f955e194fed5ff6b014f75ac6823539ce5613aea0be8_o1", Token.presets.main.nonce = 1, Token.presets.main.owner = "1PytriYokKN3GpKw84L4vvrGBwUvTYzCpx", Token.presets.main.satoshis = 0, Token.presets.test.location = "7d14c868fe39439edffe6982b669e7b4d3eb2729eee7c262ec2494ee3e310e99_o1", Token.presets.test.origin = "7d14c868fe39439edffe6982b669e7b4d3eb2729eee7c262ec2494ee3e310e99_o1", Token.presets.test.nonce = 1, Token.presets.test.owner = "n3CiECgxW1pB1rGbYiX67e4U7AnS3MpJeE", Token.presets.test.satoshis = 0, t.exports = r.Fe(Token)
    }, function(t, e) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || new Function("return this")()
        } catch (t) {
            "object" == typeof window && (n = window)
        }
        t.exports = n
    }, function(t, e) {
        var n, r, o = t.exports = {};

        function i() {
            throw new Error("setTimeout has not been defined")
        }

        function s() {
            throw new Error("clearTimeout has not been defined")
        }

        function c(t) {
            if (n === setTimeout) return setTimeout(t, 0);
            if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
            try {
                return n(t, 0)
            } catch (e) {
                try {
                    return n.call(null, t, 0)
                } catch (e) {
                    return n.call(this, t, 0)
                }
            }
        }! function() {
            try {
                n = "function" == typeof setTimeout ? setTimeout : i
            } catch (t) {
                n = i
            }
            try {
                r = "function" == typeof clearTimeout ? clearTimeout : s
            } catch (t) {
                r = s
            }
        }();
        var a, u = [],
            h = !1,
            f = -1;

        function l() {
            h && a && (h = !1, a.length ? u = a.concat(u) : f = -1, u.length && p())
        }

        function p() {
            if (!h) {
                var t = c(l);
                h = !0;
                for (var e = u.length; e;) {
                    for (a = u, u = []; ++f < e;) a && a[f].run();
                    f = -1, e = u.length
                }
                a = null, h = !1,
                    function(t) {
                        if (r === clearTimeout) return clearTimeout(t);
                        if ((r === s || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
                        try {
                            r(t)
                        } catch (e) {
                            try {
                                return r.call(null, t)
                            } catch (e) {
                                return r.call(this, t)
                            }
                        }
                    }(t)
            }
        }

        function d(t, e) {
            this.fun = t, this.array = e
        }

        function w() {}
        o.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            u.push(new d(t, e)), 1 !== u.length || h || c(p)
        }, d.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = w, o.addListener = w, o.once = w, o.off = w, o.removeListener = w, o.removeAllListeners = w, o.emit = w, o.prependListener = w, o.prependOnceListener = w, o.listeners = function(t) {
            return []
        }, o.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, o.cwd = function() {
            return "/"
        }, o.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }, o.umask = function() {
            return 0
        }
    }, function(t, e, n) {
        const r = n(3);
        class CommonLock {
            constructor(t, e) {
                this.address = t, this.testnet = e
            }
            script() {
                if ("string" != typeof this.address) throw new Error(`Address is not a string: ${this.address}`);
                const t = [],
                    e = [];
                let n, r, o;
                const i = this.address;
                for (let s = 0; s < i.length; s++) {
                    if (n = 0, r = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz".indexOf(i[s]), r < 0) throw new Error(`Invalid character in address: ${i}\n\nDetails: i=${s}, c=${i[s]}`);
                    for (r || e.length ^ s || e.push(0); n in t || r;) o = t[n], o = o ? 58 * o + r : r, r = o >> 8, t[n] = o % 256, n++
                }
                for (; n--;) e.push(t[n]);
                if (e.length < 6) throw new Error(`Address too short: ${i}`);
                if (0 !== e[0] && 111 !== e[0]) throw new Error(`Address may only be a P2PKH type: ${i}`);
                if (!0 === this.testnet && 0 === e[0] || !1 === this.testnet && 111 === e[0]) throw new Error("Invalid network");
                return [118, 169, 20, ...e.slice(1, e.length - 4), 136, 172].map((t => t.toString("16"))).map((t => 1 === t.length ? "0" + t : t)).join("")
            }
            domain() {
                return 108
            }
        }
        CommonLock.sealed = !0, CommonLock.toString();
        const o = r.ee();
        r.Gt(o).ne(CommonLock, !0), t.exports = o
    }, function(t, e, n) {
        const {
            NotImplementedError
        } = n(4);
        class r {
            get network() {
                throw new NotImplementedError
            }
            async broadcast(t) {
                throw new NotImplementedError
            }
            async fetch(t) {
                throw new NotImplementedError
            }
            async utxos(t) {
                throw new NotImplementedError
            }
            async time(t) {
                throw new NotImplementedError
            }
            async spends(t, e) {
                throw new NotImplementedError
            }
            static[Symbol.hasInstance](t) {
                return ("object" == typeof t || "function" == typeof t) && (!!t && ("string" == typeof t.network && ("function" == typeof t.broadcast && ("function" == typeof t.fetch && ("function" == typeof t.utxos && ("function" == typeof t.time && "function" == typeof t.spends))))))
            }
        }
        class o {
            async pay(t, e) {
                throw new NotImplementedError
            }
            async broadcast(t) {
                throw new NotImplementedError
            }
            static[Symbol.hasInstance](t) {
                return ("object" == typeof t || "function" == typeof t) && (!!t && "function" == typeof t.pay)
            }
        }
        class i {
            async sign(t, e, n) {
                throw new NotImplementedError
            }
            async nextOwner() {
                throw new NotImplementedError
            }
            static[Symbol.hasInstance](t) {
                return ("object" == typeof t || "function" == typeof t) && (!!t && ("function" == typeof t.sign && ("function" == typeof t.nextOwner || "function" == typeof t.owner)))
            }
        }
        class s {
            info(...t) {}
            debug(...t) {}
            warn(...t) {}
            error(...t) {}
            static[Symbol.hasInstance](t) {
                return ("object" == typeof t || "function" == typeof t) && !!t
            }
        }
        class c {
            async get(t) {
                throw new NotImplementedError
            }
            async set(t, e) {
                throw new NotImplementedError
            }
            static[Symbol.hasInstance](t) {
                return ("object" == typeof t || "function" == typeof t) && (!!t && ("function" == typeof t.get && "function" == typeof t.set))
            }
        }
        class a {
            script() {
                throw new NotImplementedError
            }
            domain() {
                throw new NotImplementedError
            }
            static[Symbol.hasInstance](t) {
                if ("object" != typeof t || !t) return !1;
                if ("function" != typeof t.constructor.prototype.script) return !1;
                if (Object.getOwnPropertyNames(t).includes("script")) return !1;
                const e = t.script();
                if (e.length % 2 != 0) return !1;
                const n = "01234567890abcdefABCDEF".split("");
                if (e.split("").some((t => !n.includes(t)))) return !1;
                return "function" == typeof t.constructor.prototype.domain && (!Object.getOwnPropertyNames(t).includes("domain") && (!!Number.isSafeInteger(t.domain()) && !(t.domain() < 0)))
            }
        }
        t.exports = {
            Blockchain: r,
            Purse: o,
            Logger: s,
            Cache: c,
            Lock: a,
            Owner: i
        }
    }, function(t, e, n) {
        const r = n(3),
            asm = n(38),
            Hex = n(26);
        class Group {
            constructor(t, e) {
                this.pubkeys = t, this.required = void 0 === e ? this.pubkeys.length : e
            }
            script() {
                if (!Array.isArray(this.pubkeys)) throw new Error("pubkeys not an array");
                if (this.pubkeys.length < 1) throw new Error("pubkeys must have at least one entry");
                if (this.pubkeys.length > 16) throw new Error("No more than 16 pubkeys allowed");
                const t = new Set;
                for (const e of this.pubkeys) t.add(e);
                if (t.size !== this.pubkeys.length) throw new Error("pubkeys contains duplicates");
                this.pubkeys.forEach((t => Hex.stringToBytes(t)));
                if ("number" != typeof this.required || !Number.isInteger(this.required) || this.required < 1) throw new Error("required must be a non-negative integer");
                if (this.required > this.pubkeys.length) throw new Error("required must be <= the number of pubkeys");
                return asm(`OP_${this.required} ${this.pubkeys.join(" ")} OP_${this.pubkeys.length} OP_CHECKMULTISIG`)
            }
            domain() {
                return 1 + 74 * this.required
            }
            add(t) {
                this.pubkeys.includes(t) || this.pubkeys.push(t)
            }
        }
        Group.deps = {
            asm,
            Hex
        }, Group.sealed = !1, Group.toString(), Group.presets = {}, Group.presets.main = {}, Group.presets.test = {}, Group.presets.main.location = "780ab8919cb89323707338070323c24ce42cdec2f57d749bd7aceef6635e7a4d_o1", Group.presets.main.origin = "90a3ece416f696731430efac9657d28071cc437ebfff5fb1eaf710fe4b3c8d4e_o1", Group.presets.main.nonce = 2, Group.presets.main.owner = "1PytriYokKN3GpKw84L4vvrGBwUvTYzCpx", Group.presets.main.satoshis = 0, Group.presets.test.location = "63e0e1268d8ab021d1c578afb8eaa0828ccbba431ffffd9309d04b78ebeb6e56_o1", Group.presets.test.origin = "03320f1244e509bb421e6f1ff724bf1156182890c3768cfa4ea127a78f9913d2_o1", Group.presets.test.nonce = 3, Group.presets.test.owner = "n3CiECgxW1pB1rGbYiX67e4U7AnS3MpJeE", Group.presets.test.satoshis = 0, t.exports = r.Fe(Group)
    }, function(t, e, n) {
        const r = n(3),
            Hex = n(26);

        function asm(t) {
            const e = t.split(" ");
            let n = [];
            for (const t of e) {
                if (void 0 !== asm.OP_CODES[t]) {
                    n.push(asm.OP_CODES[t]);
                    continue
                }
                const e = Hex.stringToBytes(1 === t.length ? "0" + t : t);
                if (0 === e[0]) {
                    n.push(e[0]);
                    continue
                }
                if (1 === e.length && e[0] >= 1 && e[0] <= 16) {
                    n.push(e[0] + 80);
                    continue
                }
                if (e.length <= 75) {
                    n = n.concat(e.length).concat(e);
                    continue
                }
                if (e.length < 256) {
                    n = n.concat(asm.OP_CODES.OP_PUSHDATA1).concat([e.length]).concat(e);
                    continue
                }
                const r = t => parseInt(t.toString(), 10);
                if (e.length < 65536) {
                    const t = [r(e.length / 256), e.length % 256];
                    n = n.concat(asm.OP_CODES.OP_PUSHDATA2).concat(t).concat(e);
                    continue
                }
                const o = [r(e.length / 256 / 256 / 256), r(e.length / 256 / 256) % 256, r(e.length / 256) % 256, e.length % 256];
                n = n.concat(asm.OP_CODES.OP_PUSHDATA4).concat(o).concat(e)
            }
            return Hex.bytesToString(n)
        }
        asm.OP_CODES = {
            OP_FALSE: 0,
            OP_0: 0,
            OP_PUSHDATA1: 76,
            OP_PUSHDATA2: 77,
            OP_PUSHDATA4: 78,
            OP_1NEGATE: 79,
            OP_TRUE: 81,
            OP_1: 81,
            OP_2: 82,
            OP_3: 83,
            OP_4: 84,
            OP_5: 85,
            OP_6: 86,
            OP_7: 87,
            OP_8: 88,
            OP_9: 89,
            OP_10: 90,
            OP_11: 91,
            OP_12: 92,
            OP_13: 93,
            OP_14: 94,
            OP_15: 95,
            OP_16: 96,
            OP_NOP: 97,
            OP_IF: 99,
            OP_NOTIF: 100,
            OP_ELSE: 103,
            OP_ENDIF: 104,
            OP_VERIFY: 105,
            OP_RETURN: 106,
            OP_TOALTSTACK: 107,
            OP_FROMALTSTACK: 108,
            OP_2DROP: 109,
            OP_2DUP: 110,
            OP_3DUP: 111,
            OP_2OVER: 112,
            OP_2ROT: 113,
            OP_2SWAP: 114,
            OP_IFDUP: 115,
            OP_DEPTH: 116,
            OP_DROP: 117,
            OP_DUP: 118,
            OP_NIP: 119,
            OP_OVER: 120,
            OP_PICK: 121,
            OP_ROLL: 122,
            OP_ROT: 123,
            OP_SWAP: 124,
            OP_TUCK: 125,
            OP_CAT: 126,
            OP_SPLIT: 127,
            OP_NUM2BIN: 128,
            OP_BIN2NUM: 129,
            OP_SIZE: 130,
            OP_INVERT: 131,
            OP_AND: 132,
            OP_OR: 133,
            OP_XOR: 134,
            OP_EQUAL: 135,
            OP_EQUALVERIFY: 136,
            OP_1ADD: 139,
            OP_1SUB: 140,
            OP_NEGATE: 143,
            OP_ABS: 144,
            OP_NOT: 145,
            OP_0NOTEQUAL: 146,
            OP_ADD: 147,
            OP_SUB: 148,
            OP_MUL: 149,
            OP_DIV: 150,
            OP_MOD: 151,
            OP_LSHIFT: 152,
            OP_RSHIFT: 153,
            OP_BOOLAND: 154,
            OP_BOOLOR: 155,
            OP_NUMEQUAL: 156,
            OP_NUMEQUALVERIFY: 157,
            OP_NUMNOTEQUAL: 158,
            OP_LESSTHAN: 159,
            OP_GREATERTHAN: 160,
            OP_LESSTHANOREQUAL: 161,
            OP_GREATERTHANOREQUAL: 162,
            OP_MIN: 163,
            OP_MAX: 164,
            OP_WITHIN: 165,
            OP_RIPEMD160: 166,
            OP_SHA1: 167,
            OP_SHA256: 168,
            OP_HASH160: 169,
            OP_HASH256: 170,
            OP_CODESEPARATOR: 171,
            OP_CHECKSIG: 172,
            OP_CHECKSIGVERIFY: 173,
            OP_CHECKMULTISIG: 174,
            OP_CHECKMULTISIGVERIFY: 175,
            OP_NOP1: 176,
            OP_NOP2: 177,
            OP_NOP3: 178,
            OP_NOP4: 179,
            OP_NOP5: 180,
            OP_NOP6: 181,
            OP_NOP7: 182,
            OP_NOP8: 183,
            OP_NOP9: 184,
            OP_NOP10: 185,
            OP_PUBKEYHASH: 253,
            OP_PUBKEY: 254,
            OP_INVALIDOPCODE: 255
        }, asm.deps = {
            Hex
        }, asm.toString(), asm.presets = {}, asm.presets.main = {}, asm.presets.test = {}, asm.presets.main.location = "61e1265acb3d93f1bf24a593d70b2a6b1c650ec1df90ddece8d6954ae3cdd915_o1", asm.presets.main.origin = "61e1265acb3d93f1bf24a593d70b2a6b1c650ec1df90ddece8d6954ae3cdd915_o1", asm.presets.main.nonce = 1, asm.presets.main.owner = "1PytriYokKN3GpKw84L4vvrGBwUvTYzCpx", asm.presets.main.satoshis = 0, asm.presets.test.location = "1f0abf8d94477b1cb57629d861376616f6e1d7b78aba23a19da3e6169caf489e_o1", asm.presets.test.origin = "1f0abf8d94477b1cb57629d861376616f6e1d7b78aba23a19da3e6169caf489e_o1", asm.presets.test.nonce = 1, asm.presets.test.owner = "n3CiECgxW1pB1rGbYiX67e4U7AnS3MpJeE", asm.presets.test.satoshis = 0, t.exports = r.Fe(asm)
    }, function(t, e, n) {
        const r = n(3),
            Tx = n(40),
            Hex = n(26);

        function txo(t) {
            const e = {};

            function n(t, e) {
                const n = {};
                return function(t) {
                    const e = Hex.stringToBytes(t);
                    let n = 0;

                    function r() {
                        return e[n++]
                    }

                    function o() {
                        return r() + 256 * r()
                    }

                    function i(t) {
                        const r = Hex.bytesToString(e.slice(n, n + t));
                        return n += t, r
                    }
                    const s = [];
                    for (; n < e.length;) {
                        const t = r();
                        if (t > 0 && t < 76) s.push({
                            buf: i(t),
                            len: t,
                            opcodenum: t
                        });
                        else if (76 === t) {
                            const e = r();
                            s.push({
                                buf: i(e),
                                len: e,
                                opcodenum: t
                            })
                        } else if (77 === t) {
                            const e = o();
                            s.push({
                                buf: i(e),
                                len: e,
                                opcodenum: t
                            })
                        } else if (78 === t) {
                            const e = o() + 256 * o() * 256;
                            s.push({
                                buf: i(e),
                                len: e,
                                opcodenum: t
                            })
                        } else s.push({
                            opcodenum: t
                        })
                    }
                    return s
                }(t).forEach(((t, r) => {
                    if (t.buf) {
                        n["b" + r] = function(t) {
                            const e = t => t.toString(2).padStart(8, 0),
                                n = t.length;
                            let r = "";
                            for (let o = 0; o <= (n - 1) / 3; o++) {
                                const i = 3 * o + 1 >= n,
                                    s = 3 * o + 2 >= n;
                                r += (e(t[3 * o]) + e(i ? 0 : t[3 * o + 1]) + e(s ? 0 : t[3 * o + 2])).match(/.{1,6}/g).map(((t, e) => 3 === e && s || 2 === e && i ? "=" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [+("0b" + t)])).join("")
                            }
                            return r
                        }(Hex.stringToBytes(t.buf));
                        const o = t.buf.replace(/[0-9a-f]{2}/g, "%$&");
                        if (e) try {
                            n["s" + r] = decodeURIComponent(o)
                        } catch (t) {}
                        e && (n["h" + r] = t.buf)
                    } else n["b" + r] = {
                        op: t.opcodenum
                    }
                })), n
            }
            const r = new Tx(t);
            return e.in = r.inputs.map((function(t, e) {
                const r = n(t.script);
                return r.e = {
                    h: t.prevTxId,
                    i: t.outputIndex
                }, r.i = e, r.seq = t.sequenceNumber, r
            })), e.out = r.outputs.map((function(t, e) {
                const r = n(t.script, !0);
                return r.e = {
                    v: t.satoshis,
                    i: e
                }, r.i = e, r
            })), e.lock = r.nLockTime, e
        }
        txo.deps = {
            Tx,
            Hex
        }, Tx.toString(), txo.presets = {}, txo.presets.main = {}, txo.presets.test = {}, txo.presets.main.location = "312985bd960ae4c59856b3089b04017ede66506ea181333eec7c9bb88b11c490_o1", txo.presets.main.origin = "312985bd960ae4c59856b3089b04017ede66506ea181333eec7c9bb88b11c490_o1", txo.presets.main.nonce = 1, txo.presets.main.owner = "1PytriYokKN3GpKw84L4vvrGBwUvTYzCpx", txo.presets.main.satoshis = 0, txo.presets.test.location = "33e78fa7c43b6d7a60c271d783295fa180b7e9fce07d41ff1b52686936b3e6ae_o1", txo.presets.test.origin = "33e78fa7c43b6d7a60c271d783295fa180b7e9fce07d41ff1b52686936b3e6ae_o1", txo.presets.test.nonce = 1, txo.presets.test.owner = "n3CiECgxW1pB1rGbYiX67e4U7AnS3MpJeE", txo.presets.test.satoshis = 0, t.exports = r.Fe(txo)
    }, function(t, e, n) {
        const r = n(3),
            Hex = n(26);
        class Tx {
            constructor(t) {
                const e = Hex.stringToBytes(t);
                let n = 0;

                function r() {
                    return e[n++]
                }

                function o() {
                    return r() + 256 * r()
                }

                function i() {
                    return o() + 256 * o() * 256
                }

                function s() {
                    return i() + 256 * i() * 256 * 256 * 256
                }

                function c() {
                    const t = r();
                    return 255 === t ? s() : 243 === t ? i() : 253 === t ? o() : t
                }

                function a() {
                    const t = Hex.bytesToString(e.slice(n, n + 32).reverse());
                    return n += 32, t
                }

                function u() {
                    const t = c(),
                        r = Hex.bytesToString(e.slice(n, n + t));
                    return n += t, r
                }
                this.version = i();
                const h = c();
                this.inputs = [];
                for (let t = 0; t < h; t++) this.inputs.push({
                    prevTxId: a(),
                    outputIndex: i(),
                    script: u(),
                    sequenceNumber: i()
                });
                const f = c();
                this.outputs = [];
                for (let t = 0; t < f; t++) this.outputs.push({
                    satoshis: s(),
                    script: u()
                });
                this.nLockTime = i()
            }
        }
        Tx.deps = {
            Hex
        }, Tx.toString(), Tx.presets = {}, Tx.presets.main = {}, Tx.presets.test = {}, Tx.presets.main.location = "312985bd960ae4c59856b3089b04017ede66506ea181333eec7c9bb88b11c490_o2", Tx.presets.main.origin = "312985bd960ae4c59856b3089b04017ede66506ea181333eec7c9bb88b11c490_o2", Tx.presets.main.nonce = 1, Tx.presets.main.owner = "1PytriYokKN3GpKw84L4vvrGBwUvTYzCpx", Tx.presets.main.satoshis = 0, Tx.presets.test.location = "33e78fa7c43b6d7a60c271d783295fa180b7e9fce07d41ff1b52686936b3e6ae_o2", Tx.presets.test.origin = "33e78fa7c43b6d7a60c271d783295fa180b7e9fce07d41ff1b52686936b3e6ae_o2", Tx.presets.test.nonce = 1, Tx.presets.test.owner = "n3CiECgxW1pB1rGbYiX67e4U7AnS3MpJeE", Tx.presets.test.satoshis = 0, t.exports = r.Fe(Tx)
    }, function(t, e, n) {
        (function(e) {
            const r = n(9);

            function o() {
                if ("string" != typeof r.version || !r.version.startsWith("v1.")) {
                    throw new Error(`Run requires version 1.x of the bsv library\n\n${"Hint: Please install bsv version 1.5.4 or install Run from NPM"}`)
                }
            }

            function i() {
                if (e && e.version) {
                    const t = Number(e.version.match(/^v(\d+\.\d+)/)[1]);
                    if (t < 10) throw new Error("Run is supported only on Node v10 and above");
                    if (t >= 15) throw new Error("Run is not yet supported on Node 15 and above")
                }
            }

            function s() {
                if ("undefined" == typeof window) return;
                const t = window.navigator.userAgent;
                if (-1 !== t.indexOf("MSIE") || -1 !== t.indexOf("Trident")) throw new Error("Run is not supported on Internet Explorer. Please upgrade to Edge.");
                if (/iP(hone|od|ad)/.test(navigator.platform)) {
                    var e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                    if ([parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)][0] < 13) throw new Error("Run is not supported on this iOS version. Please upgrade to iOS 13 or above.")
                }
            }
            t.exports = {
                Rt: function() {
                    o(), i(), s()
                },
                su: o,
                cu: i,
                au: s
            }
        }).call(this, n(34))
    }, function(t, e, n) {
        const r = n(9),
            {
                L: o,
                G: i
            } = n(0),
            s = n(3),
            c = n(2),
            a = ["load", "sync", "publish", "update"];
        class u {
            constructor() {
                this.Qc = null, this.Xc = null, this.ye = null, this.ta = null, this.qi = null, this.ea = [], this.At = 1e4, this.yu = new Set, this.Zi = !0, this.Yr = !1, this.dr = !1
            }
            Se() {
                const t = this.Qc;
                return {
                    get network() {
                        return t.network
                    },
                    async broadcast(e) {
                        if (c.ue) {
                            const t = new r.Transaction(e).hash;
                            c.ie("Blockchain", "Broadcast", t)
                        }
                        const n = new Date,
                            o = await t.broadcast(e);
                        return c.zt && c.Yt("Blockchain", "Broadcast (end): " + (new Date - n) + "ms"), o
                    },
                    async fetch(e) {
                        c.ue && c.ie("Blockchain", "Fetch", e);
                        const n = new Date,
                            r = await t.fetch(e);
                        return c.zt && c.Yt("Blockchain", "Fetch (end): " + (new Date - n) + "ms"), r
                    },
                    async utxos(e) {
                        c.ue && c.ie("Blockchain", "Utxos", e);
                        const n = new Date,
                            r = await t.utxos(e);
                        return c.zt && c.Yt("Blockchain", "Utxos (end): " + (new Date - n) + "ms"), r
                    },
                    async spends(e, n) {
                        c.ue && c.ie("Blockchain", `Spends ${e}_o${n}`);
                        const r = new Date,
                            o = await t.spends(e, n);
                        return c.zt && c.Yt("Blockchain", "Spends (end): " + (new Date - r) + "ms"), o
                    },
                    async time(e) {
                        c.ue && c.ie("Blockchain", "Time", e);
                        const n = new Date,
                            r = await t.time(e);
                        return c.zt && c.Yt("Blockchain", "Time (end): " + (new Date - n) + "ms"), r
                    }
                }
            }
            qr() {
                const t = this.Xc;
                return {
                    async get(e) {
                        c.ue && c.ie("Cache", "Get", e);
                        const n = new Date,
                            r = await t.get(e);
                        return c.zt && c.Yt("Cache", "Get (end): " + (new Date - n) + "ms"), c.zt && c.Yt("Cache", "Value", JSON.stringify(r, 0, 3)), r
                    },
                    async set(e, n) {
                        c.ue && c.ie("Cache", "Set", e), c.zt && c.Yt("Cache", "Value", JSON.stringify(n, 0, 3));
                        const r = new Date,
                            o = await t.set(e, n);
                        return c.zt && c.Yt("Cache", "Set (end): " + (new Date - r) + "ms"), o
                    }
                }
            }
            Vi() {
                const t = this.ye;
                return {
                    async nextOwner() {
                        c.ue && c.ie("Owner", "Next owner");
                        const e = new Date;
                        let n = null;
                        return "function" == typeof t.owner ? (c.ce("Kernel", "Owner.prototype.owner() is deprecated. Please rename owner() to nextOwner()."), n = await t.owner()) : n = await t.nextOwner(), c.zt && c.Yt("Owner", "Next owner (end): " + (new Date - e) + "ms"), n
                    },
                    async sign(e, n, r) {
                        c.ue && c.ie("Owner", "Sign");
                        const o = new Date,
                            i = await t.sign(e, n, r);
                        return c.zt && c.Yt("Owner", "Sign (end): " + (new Date - o) + "ms"), i
                    }
                }
            }
            ts() {
                const t = this.ta;
                return {
                    async pay(e, n) {
                        c.ue && c.ie("Purse", "Pay");
                        const r = new Date,
                            o = await t.pay(e, n);
                        return c.zt && c.Yt("Purse", "Pay (end): " + (new Date - r) + "ms"), o
                    },
                    async broadcast(e) {
                        if ("function" == typeof t.broadcast) {
                            c.ue && c.ie("Purse", "Broadcast");
                            const n = new Date,
                                r = await t.broadcast(e);
                            return c.zt && c.Yt("Purse", "Broadcast (end): " + (new Date - n) + "ms"), r
                        }
                    }
                }
            }
            an() {
                u._ !== this && (u._ && u._.cn(), u._ = this, r.Networks.defaultNetwork = r.Networks[i(this.Se().network)], s.an())
            }
            cn() {
                u._ && (s.cn(), u._ = null)
            }
            tr(t, e) {
                o(a.includes(t)), this.ea.filter((e => e.na === t)).forEach((n => n.ra(t, e)))
            }
            bu(t, e) {
                if (!(this.yu.has("*") || this.yu.has(t))) {
                    throw new Error(`Cannot load untrusted code via ${e}: ${t}\n\n${"Hint: Trust this txid using run.trust(txid) if you know it is safe"}`)
                }
            }
        }
        u._ = null, u.oa = a, t.exports = u
    }, function(t, e) {
        t.exports = function(t) {
            const e = JSON.stringify;
            return function(n, r, o) {
                "number" == typeof o && (o = Array(o + 1).join(" ")), "string" != typeof o && (o = "");
                const i = new Set;
                return function n(s, c, a, u) {
                    const h = o ? "\n" + new Array(u + 1).join(o) : "",
                        f = o ? ": " : ":";
                    if (a && "function" == typeof a.toJSON && (a = a.toJSON()), void 0 === (a = r ? r.call(s, c, a) : a)) return;
                    if ("object" != typeof a || null === a) return e(a);
                    if (i.has(a)) throw new TypeError("Converting circular structure to JSON");
                    let l;
                    if (i.add(a), Array.isArray(a)) {
                        const t = [];
                        for (let r = 0; r < a.length; r++) {
                            const i = n(a, r, a[r], u + 1) || e(null);
                            t.push(h + o + i)
                        }
                        l = "[" + t.join(",") + (t.length ? h : "") + "]"
                    } else {
                        let r = Object.keys(a);
                        t && (r = r.sort(t));
                        const i = [];
                        for (let t = 0; t < r.length; t++) {
                            const s = r[t],
                                c = n(a, s, a[s], u + 1);
                            if (!c) continue;
                            const l = e(s) + f + c;
                            i.push(h + o + l)
                        }
                        l = "{" + i.join(",") + (i.length ? h : "") + "}"
                    }
                    return i.delete(a), l
                }({
                    "": n
                }, "", n, 0)
            }
        }
    }, function(t, e, n) {
        const r = n(59),
            {
                makeDeterministic: o,
                nonDeterministicIntrinsics: i
            } = n(60),
            s = n(43),
            {
                g: c
            } = n(7);
        t.exports = class {
            constructor() {
                const t = `var n=${s.toString()};var m=${o.toString()};m(n);`,
                    e = `(()=>{\n      ${r};\n      ${t};\n      SES.lockdown();\n      var C = this.Compartment;\n      delete this.SES;\n      delete this.Compartment;\n      return C\n    })()`; {
                    const t = document.createElement("iframe");
                    t.style || (t.style = {}), t.style.display = "none", document.documentElement.appendChild(t), this.iframeEval = t.contentWindow.eval, this.Compartment = this.iframeEval(e)
                }
                this.globalOverrides = {}, i.forEach((t => {
                    this.globalOverrides[t] = void 0
                }));
                const n = this.ia();
                n.global.c = console, n.global.s = c, this.globalOverrides.console = n.evaluate("\n      const o = { }\n      Object.keys(c).forEach(name => {\n        o[name] = (...args) => s(() => c[name](...args))\n      })\n      o\n    ")
            }
            makeCompartment() {
                const t = this.ia();
                Object.assign(t.global, this.globalOverrides);
                return {
                    evaluate: e => (this.sa(e), t.evaluate(e)),
                    global: new Proxy({}, {
                        set: (e, n, r) => (e[n] = t.global[n] = r, !0),
                        deleteProperty: (e, n) => (delete e[n], n in this.globalOverrides ? t.global[n] = this.globalOverrides[n] : delete t.global[n], !0),
                        defineProperty: (e, n, r) => (Object.defineProperty(e, n, r), Object.defineProperty(t.global, n, r), !0)
                    })
                }
            }
            ia() {
                return new this.Compartment
            }
            sa(t) {
                if (/for\s*\([^)]+\s+in\s+\S+\)/g.test(t)) throw new Error("for-in loops are not supported")
            }
        }
    }, function(t, e, n) {
        const r = n(8),
            {
                Y: o
            } = n(0),
            {
                Sn: i
            } = n(7),
            {
                ArgumentError
            } = n(4),
            s = r.P,
            c = new WeakMap;

        function a(t) {
            const e = c.get(t);
            if (!e) throw new ArgumentError(`Not a dynamic type: ${o(t)}`);
            return e
        }

        function u() {
            const t = c.get(this),
                e = t ? t.Ye : this;
            return s.Function.prototype.toString.apply(e)
        }
        class h {
            constructor() {
                const t = r.In("function dynamic() {}")[0],
                    e = e => {
                        delete t.prototype[e]
                    };
                Object.getOwnPropertyNames(t.prototype).forEach(e), Object.getOwnPropertySymbols(t.prototype).forEach(e);
                const n = {},
                    o = new l,
                    i = new Proxy(n, o),
                    s = Object.getPrototypeOf(t.prototype);
                Object.setPrototypeOf(n, s), Object.setPrototypeOf(t.prototype, i), Object.freeze(t.prototype);
                const a = new f;
                o.be(i, a);
                const u = new Proxy(t, a);
                return a.be(t, n, u), c.set(u, a), u
            }
            static Re(t) {
                return a(t).Ye
            }
            static Ne(t, e) {
                a(t).Ne(e)
            }
            static ca(t) {
                return a(t).aa
            }
            static Ke(t, e) {
                a(t).Ke(e)
            }
        }
        class f {
            be(t, e, n) {
                this.ua = t, this.Ye = t, this.aa = n, this.yo = n, this.ha = e
            }
            apply(t, e, n) {
                return Reflect.apply(this.Ye, e, n)
            }
            construct(t, e, n) {
                let r = n;
                try {
                    r = h.ca(n)
                } catch (t) {}
                return Reflect.construct(this.Ye, e, r)
            }
            defineProperty(t, e, n) {
                if ("prototype" === e) throw new Error("Cannot define prototype");
                if ("toString" === e) throw new Error("Cannot define toString");
                if (!n.configurable) throw new Error("Cannot define nonconfigurable property");
                return Reflect.defineProperty(this.Ye, e, n), !0
            }
            deleteProperty(t, e) {
                if ("prototype" === e) throw new Error("Cannot delete prototype");
                if ("toString" === e) throw new Error("Cannot delete toString");
                return Reflect.deleteProperty(this.Ye, e), !0
            }
            get(t, e, n) {
                return "prototype" === e ? this.ua.prototype : "toString" === e ? u : Reflect.get(this.Ye, e, n)
            }
            getPrototypeOf(t) {
                return Reflect.getPrototypeOf(this.Ye)
            }
            getOwnPropertyDescriptor(t, e) {
                if ("prototype" === e) return Object.getOwnPropertyDescriptor(this.ua, e);
                const n = Reflect.getOwnPropertyDescriptor(this.Ye, e);
                if (!n) return n;
                const r = Reflect.getOwnPropertyDescriptor(t, e);
                return r && !r.configurable || (n.configurable = !0), n
            }
            has(t, e) {
                return Reflect.has(this.Ye, e)
            }
            isExtensible(t) {
                return Reflect.isExtensible(this.ua)
            }
            ownKeys(t) {
                return Reflect.ownKeys(this.Ye)
            }
            preventExtensions(t) {
                return Object.preventExtensions(this.ua), Object.preventExtensions(this.Ye), !0
            }
            set(t, e, n, r) {
                if ("prototype" === e) throw new Error("Cannot set prototype");
                if ("toString" === e) throw new Error("Cannot set toString");
                return Reflect.set(this.Ye, e, n), !0
            }
            setPrototypeOf(t, e) {
                return Reflect.setPrototypeOf(this.Ye, e), !0
            }
            Ne(t) {
                if ("function" != typeof t) throw new ArgumentError(`Inner type must be a function type: ${o(t)}`);
                let e = t;
                for (; e && e !== Function.prototype && e !== s.Function.prototype;) {
                    if (Object.getOwnPropertyNames(e).includes("toString")) throw new ArgumentError(`toString is a reserved property: ${t}`);
                    e = Reflect.getPrototypeOf(e)
                }
                Reflect.isExtensible(this.ua) && Reflect.isExtensible(t) || (Reflect.preventExtensions(this.ua), Reflect.preventExtensions(t));
                const n = this.Ye === this.ua || t === this.ua,
                    r = this.Ye.toString().startsWith("class"),
                    i = t.toString().startsWith("class");
                if (!n && r !== i) throw new ArgumentError(`Classes can only be changed to classes and functions to functions: ${o(t)}`);
                const c = t => {
                    delete this.ha[t]
                };
                Object.getOwnPropertyNames(this.ha).forEach(c), Object.getOwnPropertySymbols(this.ha).forEach(c);
                const a = Reflect.getPrototypeOf(t.prototype);
                Reflect.setPrototypeOf(this.ha, a);
                Object.getOwnPropertyNames(t.prototype).concat(Object.getOwnPropertySymbols(t.prototype)).forEach((e => {
                    const n = Reflect.getOwnPropertyDescriptor(t.prototype, e);
                    Reflect.defineProperty(this.ha, e, n)
                })), this.ha.constructor = this.aa, this.Ye = t
            }
            Ke(t) {
                this.aa !== this.yo && c.delete(this.aa), c.set(t, this), this.aa = t, this.ha.constructor = t
            }
        }
        class l {
            be(t, e) {
                this.yo = t, this.fa = e
            }
            defineProperty(t, e, n) {
                throw new Error("defineProperty disabled")
            }
            deleteProperty(t, e) {
                throw new Error("deleteProperty disabled")
            }
            preventExtensions() {
                throw new Error("preventExtensions disabled")
            }
            set(t, e, n, r) {
                if (r === this.yo) throw new Error("Cannot set property");
                const o = Reflect.getPrototypeOf(r);
                try {
                    return Reflect.setPrototypeOf(r, Reflect.getPrototypeOf(Object)), r[e] = n, !0
                } catch (t) {
                    throw new Error("Cannot set property")
                } finally {
                    Reflect.setPrototypeOf(r, o)
                }
            }
            setPrototypeOf(t, e) {
                if (!i()) throw new Error("setPrototypeOf disabled");
                return Reflect.setPrototypeOf(t, e), Reflect.setPrototypeOf(this.fa.Ye.prototype, e), !0
            }
        }
        t.exports = h
    }, function(t, e, n) {
        "use strict";
        (function(t) {
            /*!
             * The buffer module from node.js, for the browser.
             *
             * @author   Feross Aboukhadijeh <http://feross.org>
             * @license  MIT
             */
            var r = n(61),
                o = n(62),
                i = n(63);

            function s() {
                return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }

            function c(t, e) {
                if (s() < e) throw new RangeError("Invalid typed array length");
                return a.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = a.prototype : (null === t && (t = new a(e)), t.length = e), t
            }

            function a(t, e, n) {
                if (!(a.TYPED_ARRAY_SUPPORT || this instanceof a)) return new a(t, e, n);
                if ("number" == typeof t) {
                    if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                    return f(this, t)
                }
                return u(this, t, e, n)
            }

            function u(t, e, n, r) {
                if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, n, r) {
                    if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
                    if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                    e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
                    a.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = a.prototype : t = l(t, e);
                    return t
                }(t, e, n, r) : "string" == typeof e ? function(t, e, n) {
                    "string" == typeof n && "" !== n || (n = "utf8");
                    if (!a.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                    var r = 0 | d(e, n),
                        o = (t = c(t, r)).write(e, n);
                    o !== r && (t = t.slice(0, o));
                    return t
                }(t, e, n) : function(t, e) {
                    if (a.isBuffer(e)) {
                        var n = 0 | p(e.length);
                        return 0 === (t = c(t, n)).length || e.copy(t, 0, 0, n), t
                    }
                    if (e) {
                        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? c(t, 0) : l(t, e);
                        if ("Buffer" === e.type && i(e.data)) return l(t, e.data)
                    }
                    var r;
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                }(t, e)
            }

            function h(t) {
                if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                if (t < 0) throw new RangeError('"size" argument must not be negative')
            }

            function f(t, e) {
                if (h(e), t = c(t, e < 0 ? 0 : 0 | p(e)), !a.TYPED_ARRAY_SUPPORT)
                    for (var n = 0; n < e; ++n) t[n] = 0;
                return t
            }

            function l(t, e) {
                var n = e.length < 0 ? 0 : 0 | p(e.length);
                t = c(t, n);
                for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                return t
            }

            function p(t) {
                if (t >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
                return 0 | t
            }

            function d(t, e) {
                if (a.isBuffer(t)) return t.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                "string" != typeof t && (t = "" + t);
                var n = t.length;
                if (0 === n) return 0;
                for (var r = !1;;) switch (e) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return n;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return G(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * n;
                    case "hex":
                        return n >>> 1;
                    case "base64":
                        return V(t).length;
                    default:
                        if (r) return G(t).length;
                        e = ("" + e).toLowerCase(), r = !0
                }
            }

            function w(t, e, n) {
                var r = !1;
                if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                if ((n >>>= 0) <= (e >>>= 0)) return "";
                for (t || (t = "utf8");;) switch (t) {
                    case "hex":
                        return R(this, e, n);
                    case "utf8":
                    case "utf-8":
                        return $(this, e, n);
                    case "ascii":
                        return x(this, e, n);
                    case "latin1":
                    case "binary":
                        return I(this, e, n);
                    case "base64":
                        return S(this, e, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return T(this, e, n);
                    default:
                        if (r) throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(), r = !0
                }
            }

            function y(t, e, n) {
                var r = t[e];
                t[e] = t[n], t[n] = r
            }

            function b(t, e, n, r, o) {
                if (0 === t.length) return -1;
                if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                    if (o) return -1;
                    n = t.length - 1
                } else if (n < 0) {
                    if (!o) return -1;
                    n = 0
                }
                if ("string" == typeof e && (e = a.from(e, r)), a.isBuffer(e)) return 0 === e.length ? -1 : g(t, e, n, r, o);
                if ("number" == typeof e) return e &= 255, a.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : g(t, [e], n, r, o);
                throw new TypeError("val must be string, number or Buffer")
            }

            function g(t, e, n, r, o) {
                var i, s = 1,
                    c = t.length,
                    a = e.length;
                if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                    if (t.length < 2 || e.length < 2) return -1;
                    s = 2, c /= 2, a /= 2, n /= 2
                }

                function u(t, e) {
                    return 1 === s ? t[e] : t.readUInt16BE(e * s)
                }
                if (o) {
                    var h = -1;
                    for (i = n; i < c; i++)
                        if (u(t, i) === u(e, -1 === h ? 0 : i - h)) {
                            if (-1 === h && (h = i), i - h + 1 === a) return h * s
                        } else -1 !== h && (i -= i - h), h = -1
                } else
                    for (n + a > c && (n = c - a), i = n; i >= 0; i--) {
                        for (var f = !0, l = 0; l < a; l++)
                            if (u(t, i + l) !== u(e, l)) {
                                f = !1;
                                break
                            } if (f) return i
                    }
                return -1
            }

            function _(t, e, n, r) {
                n = Number(n) || 0;
                var o = t.length - n;
                r ? (r = Number(r)) > o && (r = o) : r = o;
                var i = e.length;
                if (i % 2 != 0) throw new TypeError("Invalid hex string");
                r > i / 2 && (r = i / 2);
                for (var s = 0; s < r; ++s) {
                    var c = parseInt(e.substr(2 * s, 2), 16);
                    if (isNaN(c)) return s;
                    t[n + s] = c
                }
                return s
            }

            function m(t, e, n, r) {
                return W(G(e, t.length - n), t, n, r)
            }

            function E(t, e, n, r) {
                return W(function(t) {
                    for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                    return e
                }(e), t, n, r)
            }

            function v(t, e, n, r) {
                return E(t, e, n, r)
            }

            function P(t, e, n, r) {
                return W(V(e), t, n, r)
            }

            function O(t, e, n, r) {
                return W(function(t, e) {
                    for (var n, r, o, i = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) r = (n = t.charCodeAt(s)) >> 8, o = n % 256, i.push(o), i.push(r);
                    return i
                }(e, t.length - n), t, n, r)
            }

            function S(t, e, n) {
                return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
            }

            function $(t, e, n) {
                n = Math.min(t.length, n);
                for (var r = [], o = e; o < n;) {
                    var i, s, c, a, u = t[o],
                        h = null,
                        f = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                    if (o + f <= n) switch (f) {
                        case 1:
                            u < 128 && (h = u);
                            break;
                        case 2:
                            128 == (192 & (i = t[o + 1])) && (a = (31 & u) << 6 | 63 & i) > 127 && (h = a);
                            break;
                        case 3:
                            i = t[o + 1], s = t[o + 2], 128 == (192 & i) && 128 == (192 & s) && (a = (15 & u) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (a < 55296 || a > 57343) && (h = a);
                            break;
                        case 4:
                            i = t[o + 1], s = t[o + 2], c = t[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & c) && (a = (15 & u) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & c) > 65535 && a < 1114112 && (h = a)
                    }
                    null === h ? (h = 65533, f = 1) : h > 65535 && (h -= 65536, r.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h), r.push(h), o += f
                }
                return function(t) {
                    var e = t.length;
                    if (e <= A) return String.fromCharCode.apply(String, t);
                    var n = "",
                        r = 0;
                    for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += A));
                    return n
                }(r)
            }
            e.Buffer = a, e.SlowBuffer = function(t) {
                +t != t && (t = 0);
                return a.alloc(+t)
            }, e.INSPECT_MAX_BYTES = 50, a.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                try {
                    var t = new Uint8Array(1);
                    return t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                } catch (t) {
                    return !1
                }
            }(), e.kMaxLength = s(), a.poolSize = 8192, a.nu = function(t) {
                return t.__proto__ = a.prototype, t
            }, a.from = function(t, e, n) {
                return u(null, t, e, n)
            }, a.TYPED_ARRAY_SUPPORT && (a.prototype.__proto__ = Uint8Array.prototype, a.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && a[Symbol.species] === a && Object.defineProperty(a, Symbol.species, {
                value: null,
                configurable: !0
            })), a.alloc = function(t, e, n) {
                return function(t, e, n, r) {
                    return h(e), e <= 0 ? c(t, e) : void 0 !== n ? "string" == typeof r ? c(t, e).fill(n, r) : c(t, e).fill(n) : c(t, e)
                }(null, t, e, n)
            }, a.allocUnsafe = function(t) {
                return f(null, t)
            }, a.allocUnsafeSlow = function(t) {
                return f(null, t)
            }, a.isBuffer = function(t) {
                return !(null == t || !t.ru)
            }, a.compare = function(t, e) {
                if (!a.isBuffer(t) || !a.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                if (t === e) return 0;
                for (var n = t.length, r = e.length, o = 0, i = Math.min(n, r); o < i; ++o)
                    if (t[o] !== e[o]) {
                        n = t[o], r = e[o];
                        break
                    } return n < r ? -1 : r < n ? 1 : 0
            }, a.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, a.concat = function(t, e) {
                if (!i(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length) return a.alloc(0);
                var n;
                if (void 0 === e)
                    for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                var r = a.allocUnsafe(e),
                    o = 0;
                for (n = 0; n < t.length; ++n) {
                    var s = t[n];
                    if (!a.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                    s.copy(r, o), o += s.length
                }
                return r
            }, a.byteLength = d, a.prototype.ru = !0, a.prototype.swap16 = function() {
                var t = this.length;
                if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var e = 0; e < t; e += 2) y(this, e, e + 1);
                return this
            }, a.prototype.swap32 = function() {
                var t = this.length;
                if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var e = 0; e < t; e += 4) y(this, e, e + 3), y(this, e + 1, e + 2);
                return this
            }, a.prototype.swap64 = function() {
                var t = this.length;
                if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var e = 0; e < t; e += 8) y(this, e, e + 7), y(this, e + 1, e + 6), y(this, e + 2, e + 5), y(this, e + 3, e + 4);
                return this
            }, a.prototype.toString = function() {
                var t = 0 | this.length;
                return 0 === t ? "" : 0 === arguments.length ? $(this, 0, t) : w.apply(this, arguments)
            }, a.prototype.equals = function(t) {
                if (!a.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                return this === t || 0 === a.compare(this, t)
            }, a.prototype.inspect = function() {
                var t = "",
                    n = e.INSPECT_MAX_BYTES;
                return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">"
            }, a.prototype.compare = function(t, e, n, r, o) {
                if (!a.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || r < 0 || o > this.length) throw new RangeError("out of range index");
                if (r >= o && e >= n) return 0;
                if (r >= o) return -1;
                if (e >= n) return 1;
                if (this === t) return 0;
                for (var i = (o >>>= 0) - (r >>>= 0), s = (n >>>= 0) - (e >>>= 0), c = Math.min(i, s), u = this.slice(r, o), h = t.slice(e, n), f = 0; f < c; ++f)
                    if (u[f] !== h[f]) {
                        i = u[f], s = h[f];
                        break
                    } return i < s ? -1 : s < i ? 1 : 0
            }, a.prototype.includes = function(t, e, n) {
                return -1 !== this.indexOf(t, e, n)
            }, a.prototype.indexOf = function(t, e, n) {
                return b(this, t, e, n, !0)
            }, a.prototype.lastIndexOf = function(t, e, n) {
                return b(this, t, e, n, !1)
            }, a.prototype.write = function(t, e, n, r) {
                if (void 0 === e) r = "utf8", n = this.length, e = 0;
                else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
                else {
                    if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                }
                var o = this.length - e;
                if ((void 0 === n || n > o) && (n = o), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                r || (r = "utf8");
                for (var i = !1;;) switch (r) {
                    case "hex":
                        return _(this, t, e, n);
                    case "utf8":
                    case "utf-8":
                        return m(this, t, e, n);
                    case "ascii":
                        return E(this, t, e, n);
                    case "latin1":
                    case "binary":
                        return v(this, t, e, n);
                    case "base64":
                        return P(this, t, e, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return O(this, t, e, n);
                    default:
                        if (i) throw new TypeError("Unknown encoding: " + r);
                        r = ("" + r).toLowerCase(), i = !0
                }
            }, a.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this.ou || this, 0)
                }
            };
            var A = 4096;

            function x(t, e, n) {
                var r = "";
                n = Math.min(t.length, n);
                for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);
                return r
            }

            function I(t, e, n) {
                var r = "";
                n = Math.min(t.length, n);
                for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);
                return r
            }

            function R(t, e, n) {
                var r = t.length;
                (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                for (var o = "", i = e; i < n; ++i) o += L(t[i]);
                return o
            }

            function T(t, e, n) {
                for (var r = t.slice(e, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);
                return o
            }

            function j(t, e, n) {
                if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
            }

            function C(t, e, n, r, o, i) {
                if (!a.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');
                if (n + r > t.length) throw new RangeError("Index out of range")
            }

            function k(t, e, n, r) {
                e < 0 && (e = 65535 + e + 1);
                for (var o = 0, i = Math.min(t.length - n, 2); o < i; ++o) t[n + o] = (e & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o)
            }

            function N(t, e, n, r) {
                e < 0 && (e = 4294967295 + e + 1);
                for (var o = 0, i = Math.min(t.length - n, 4); o < i; ++o) t[n + o] = e >>> 8 * (r ? o : 3 - o) & 255
            }

            function U(t, e, n, r, o, i) {
                if (n + r > t.length) throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("Index out of range")
            }

            function M(t, e, n, r, i) {
                return i || U(t, 0, n, 4), o.write(t, e, n, r, 23, 4), n + 4
            }

            function F(t, e, n, r, i) {
                return i || U(t, 0, n, 8), o.write(t, e, n, r, 52, 8), n + 8
            }
            a.prototype.slice = function(t, e) {
                var n, r = this.length;
                if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), a.TYPED_ARRAY_SUPPORT)(n = this.subarray(t, e)).__proto__ = a.prototype;
                else {
                    var o = e - t;
                    n = new a(o, void 0);
                    for (var i = 0; i < o; ++i) n[i] = this[i + t]
                }
                return n
            }, a.prototype.readUIntLE = function(t, e, n) {
                t |= 0, e |= 0, n || j(t, e, this.length);
                for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;
                return r
            }, a.prototype.readUIntBE = function(t, e, n) {
                t |= 0, e |= 0, n || j(t, e, this.length);
                for (var r = this[t + --e], o = 1; e > 0 && (o *= 256);) r += this[t + --e] * o;
                return r
            }, a.prototype.readUInt8 = function(t, e) {
                return e || j(t, 1, this.length), this[t]
            }, a.prototype.readUInt16LE = function(t, e) {
                return e || j(t, 2, this.length), this[t] | this[t + 1] << 8
            }, a.prototype.readUInt16BE = function(t, e) {
                return e || j(t, 2, this.length), this[t] << 8 | this[t + 1]
            }, a.prototype.readUInt32LE = function(t, e) {
                return e || j(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
            }, a.prototype.readUInt32BE = function(t, e) {
                return e || j(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
            }, a.prototype.readIntLE = function(t, e, n) {
                t |= 0, e |= 0, n || j(t, e, this.length);
                for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;
                return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r
            }, a.prototype.readIntBE = function(t, e, n) {
                t |= 0, e |= 0, n || j(t, e, this.length);
                for (var r = e, o = 1, i = this[t + --r]; r > 0 && (o *= 256);) i += this[t + --r] * o;
                return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i
            }, a.prototype.readInt8 = function(t, e) {
                return e || j(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            }, a.prototype.readInt16LE = function(t, e) {
                e || j(t, 2, this.length);
                var n = this[t] | this[t + 1] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, a.prototype.readInt16BE = function(t, e) {
                e || j(t, 2, this.length);
                var n = this[t + 1] | this[t] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, a.prototype.readInt32LE = function(t, e) {
                return e || j(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
            }, a.prototype.readInt32BE = function(t, e) {
                return e || j(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
            }, a.prototype.readFloatLE = function(t, e) {
                return e || j(t, 4, this.length), o.read(this, t, !0, 23, 4)
            }, a.prototype.readFloatBE = function(t, e) {
                return e || j(t, 4, this.length), o.read(this, t, !1, 23, 4)
            }, a.prototype.readDoubleLE = function(t, e) {
                return e || j(t, 8, this.length), o.read(this, t, !0, 52, 8)
            }, a.prototype.readDoubleBE = function(t, e) {
                return e || j(t, 8, this.length), o.read(this, t, !1, 52, 8)
            }, a.prototype.writeUIntLE = function(t, e, n, r) {
                (t = +t, e |= 0, n |= 0, r) || C(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                var o = 1,
                    i = 0;
                for (this[e] = 255 & t; ++i < n && (o *= 256);) this[e + i] = t / o & 255;
                return e + n
            }, a.prototype.writeUIntBE = function(t, e, n, r) {
                (t = +t, e |= 0, n |= 0, r) || C(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                var o = n - 1,
                    i = 1;
                for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) this[e + o] = t / i & 255;
                return e + n
            }, a.prototype.writeUInt8 = function(t, e, n) {
                return t = +t, e |= 0, n || C(this, t, e, 1, 255, 0), a.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
            }, a.prototype.writeUInt16LE = function(t, e, n) {
                return t = +t, e |= 0, n || C(this, t, e, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : k(this, t, e, !0), e + 2
            }, a.prototype.writeUInt16BE = function(t, e, n) {
                return t = +t, e |= 0, n || C(this, t, e, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : k(this, t, e, !1), e + 2
            }, a.prototype.writeUInt32LE = function(t, e, n) {
                return t = +t, e |= 0, n || C(this, t, e, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : N(this, t, e, !0), e + 4
            }, a.prototype.writeUInt32BE = function(t, e, n) {
                return t = +t, e |= 0, n || C(this, t, e, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : N(this, t, e, !1), e + 4
            }, a.prototype.writeIntLE = function(t, e, n, r) {
                if (t = +t, e |= 0, !r) {
                    var o = Math.pow(2, 8 * n - 1);
                    C(this, t, e, n, o - 1, -o)
                }
                var i = 0,
                    s = 1,
                    c = 0;
                for (this[e] = 255 & t; ++i < n && (s *= 256);) t < 0 && 0 === c && 0 !== this[e + i - 1] && (c = 1), this[e + i] = (t / s >> 0) - c & 255;
                return e + n
            }, a.prototype.writeIntBE = function(t, e, n, r) {
                if (t = +t, e |= 0, !r) {
                    var o = Math.pow(2, 8 * n - 1);
                    C(this, t, e, n, o - 1, -o)
                }
                var i = n - 1,
                    s = 1,
                    c = 0;
                for (this[e + i] = 255 & t; --i >= 0 && (s *= 256);) t < 0 && 0 === c && 0 !== this[e + i + 1] && (c = 1), this[e + i] = (t / s >> 0) - c & 255;
                return e + n
            }, a.prototype.writeInt8 = function(t, e, n) {
                return t = +t, e |= 0, n || C(this, t, e, 1, 127, -128), a.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
            }, a.prototype.writeInt16LE = function(t, e, n) {
                return t = +t, e |= 0, n || C(this, t, e, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : k(this, t, e, !0), e + 2
            }, a.prototype.writeInt16BE = function(t, e, n) {
                return t = +t, e |= 0, n || C(this, t, e, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : k(this, t, e, !1), e + 2
            }, a.prototype.writeInt32LE = function(t, e, n) {
                return t = +t, e |= 0, n || C(this, t, e, 4, 2147483647, -2147483648), a.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : N(this, t, e, !0), e + 4
            }, a.prototype.writeInt32BE = function(t, e, n) {
                return t = +t, e |= 0, n || C(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : N(this, t, e, !1), e + 4
            }, a.prototype.writeFloatLE = function(t, e, n) {
                return M(this, t, e, !0, n)
            }, a.prototype.writeFloatBE = function(t, e, n) {
                return M(this, t, e, !1, n)
            }, a.prototype.writeDoubleLE = function(t, e, n) {
                return F(this, t, e, !0, n)
            }, a.prototype.writeDoubleBE = function(t, e, n) {
                return F(this, t, e, !1, n)
            }, a.prototype.copy = function(t, e, n, r) {
                if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (e < 0) throw new RangeError("targetStart out of bounds");
                if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                if (r < 0) throw new RangeError("sourceEnd out of bounds");
                r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                var o, i = r - n;
                if (this === t && n < e && e < r)
                    for (o = i - 1; o >= 0; --o) t[o + e] = this[o + n];
                else if (i < 1e3 || !a.TYPED_ARRAY_SUPPORT)
                    for (o = 0; o < i; ++o) t[o + e] = this[o + n];
                else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e);
                return i
            }, a.prototype.fill = function(t, e, n, r) {
                if ("string" == typeof t) {
                    if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
                        var o = t.charCodeAt(0);
                        o < 256 && (t = o)
                    }
                    if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                    if ("string" == typeof r && !a.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                } else "number" == typeof t && (t &= 255);
                if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                if (n <= e) return this;
                var i;
                if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t)
                    for (i = e; i < n; ++i) this[i] = t;
                else {
                    var s = a.isBuffer(t) ? t : G(new a(t, r).toString()),
                        c = s.length;
                    for (i = 0; i < n - e; ++i) this[i + e] = s[i % c]
                }
                return this
            };
            var D = /[^+\/0-9A-Za-z-_]/g;

            function L(t) {
                return t < 16 ? "0" + t.toString(16) : t.toString(16)
            }

            function G(t, e) {
                var n;
                e = e || 1 / 0;
                for (var r = t.length, o = null, i = [], s = 0; s < r; ++s) {
                    if ((n = t.charCodeAt(s)) > 55295 && n < 57344) {
                        if (!o) {
                            if (n > 56319) {
                                (e -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            if (s + 1 === r) {
                                (e -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            o = n;
                            continue
                        }
                        if (n < 56320) {
                            (e -= 3) > -1 && i.push(239, 191, 189), o = n;
                            continue
                        }
                        n = 65536 + (o - 55296 << 10 | n - 56320)
                    } else o && (e -= 3) > -1 && i.push(239, 191, 189);
                    if (o = null, n < 128) {
                        if ((e -= 1) < 0) break;
                        i.push(n)
                    } else if (n < 2048) {
                        if ((e -= 2) < 0) break;
                        i.push(n >> 6 | 192, 63 & n | 128)
                    } else if (n < 65536) {
                        if ((e -= 3) < 0) break;
                        i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                    } else {
                        if (!(n < 1114112)) throw new Error("Invalid code point");
                        if ((e -= 4) < 0) break;
                        i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                    }
                }
                return i
            }

            function V(t) {
                return r.toByteArray(function(t) {
                    if ((t = function(t) {
                            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                        }(t).replace(D, "")).length < 2) return "";
                    for (; t.length % 4 != 0;) t += "=";
                    return t
                }(t))
            }

            function W(t, e, n, r) {
                for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o) e[o + n] = t[o];
                return o
            }
        }).call(this, n(33))
    }, function(t, e) {
        t.exports = class {
            constructor() {
                this.tasks = []
            }
            async Fi(t) {
                return new Promise(((e, n) => {
                    this.tasks.push({
                        func: t,
                        reject: n,
                        resolve: e
                    }), 1 === this.tasks.length && this.la()
                }))
            }
            async la() {
                const t = this.tasks[0];
                try {
                    const e = t.func();
                    t.resolve(e instanceof Promise ? await e : e)
                } catch (e) {
                    t.reject(e)
                } finally {
                    this.tasks.shift(), this.tasks.length && this.la()
                }
            }
        }
    }, function(t, e, n) {
        const {
            Transaction: r
        } = n(9), {
            L: o,
            B: i,
            Y: s,
            St: c,
            it: a
        } = n(0), u = n(2), {
            ut: h,
            Rr: f
        } = n(13), {
            g: l
        } = n(7), {
            A: p
        } = n(11), {
            StateError
        } = n(4), d = "Sync";
        async function w(t, e) {
            if (!1 === e.forward) return;
            const {
                Qr: c
            } = n(14), h = i();
            let f = l((() => t.location)),
                w = p(f);
            for (; e.At.Rt(), !a(w.lu);) {
                if (a(w.Hr)) throw new StateError(`Cannot sync ${s(t)}: transaction in progress`);
                o(a(w.pu) && a(w.fu));
                const i = await h.Se().spends(w.pu, w.fu);
                if (!i) break;
                e.At.Rt(), u.ue && u.ie(d, "Forward syncing to", i);
                const y = await h.Se().fetch(i);
                e.At.Rt();
                const b = new r(y);
                let g = null;
                try {
                    g = c(b)
                } catch (t) {
                    u.fe && u.ae(d, t);
                    break
                }
                const _ = n(28),
                    m = !0,
                    E = t,
                    v = !1;
                await _(b, i, g, h, m, E, e.At, v), e.At.Rt(), f = l((() => t.location)), w = p(f)
            }
            h.tr("sync", t)
        }
        t.exports = async function(t, e = {}) {
            const Jig = n(5),
                Code = n(1),
                r = n(3);
            if (n(25).Ht) throw new StateError("sync disabled in atomic update");
            o(t instanceof Jig || t instanceof Code), e.At = e.At || new c("sync"), e.pa = e.pa || new Map, u.ue && u.ie(d, "Sync", s(t));
            const y = new Date;
            if (e.pa.has(t)) return;
            t instanceof Code && l((() => p(t.location))).wu && r.Gt(t).We();
            let b = !1,
                g = null;
            const _ = async function() {
                try {
                    b = await async function(t, e) {
                        const r = n(30);
                        let o = !1;
                        for (;;) {
                            const n = l((() => t.location)),
                                i = p(n);
                            if (a(i.ae)) throw new StateError(`Cannot sync\n\n${i.ae}`);
                            if (!a(i.Hr)) break;
                            u.zt && u.Yt(d, `Waiting to publish ${s(t)}`), o = !0;
                            const c = r.br(i.Hr);
                            if (!c) throw new Error(`Cannot sync ${s(t)}: transaction in progress`);
                            u.zt && u.Yt(d, "Sync", c.Hr.Cn), await c.Nc(), e.At.Rt()
                        }
                        return i().tr("sync", t), o
                    }(t, e)
                } catch (t) {
                    g = t
                }
                e.At.Rt();
                try {
                    b || await w(t, e)
                } catch (t) {
                    g = g || t
                }
                return e.At.Rt(), t
            }();
            e.pa.set(t, _), e.pa.set(l((() => t.origin)), _), await _;
            try {
                await async function(t, e, r) {
                    if (!1 === e.inner) return;
                    if (void 0 === e.inner && r) return;
                    u.zt && u.Yt(d, "Inner sync");
                    const Jig = n(5),
                        Code = n(1),
                        o = new Set;
                    l((() => h(t, (e => e === t || (e instanceof Jig || e instanceof Code ? (o.add(e), !1) : void 0)))));
                    const i = [],
                        s = new Map;
                    for (const t of o) {
                        const n = e.pa.get(t) || e.pa.get(l((() => t.origin)));
                        !1 !== e.forward && n ? s.set(t, n) : i.push(t.sync(e))
                    }
                    await Promise.all(i);
                    for (const t of s.keys()) s.set(t, await s.get(t));
                    e.At.Rt(), !1 !== e.forward && l((() => f(t, (t => s.get(t)))))
                }(t, e, b)
            } catch (t) {
                if (!g) throw t
            }
            if (e.At.Rt(), g) throw g;
            u.zt && u.Yt(d, "Sync (end): " + (new Date - y) + "ms")
        }
    }, function(t, e, n) {
        const r = n(2),
            {
                Y: o,
                $t: i
            } = n(0),
            {
                Cr: s
            } = n(13),
            c = "LocalCache";
        class a {
            constructor(t = {}) {
                this.da = new Map, this.wa = 0, this.ya = 1e3 * u(t.maxSizeMB) * 1e3
            }
            get maxSizeMB() {
                return this.ya / 1e3 / 1e3
            }
            set maxSizeMB(t) {
                this.ya = 1e3 * u(t) * 1e3, this.ga()
            }
            get sizeBytes() {
                return this.wa
            }
            async get(t) {
                const e = this.da.has(t),
                    n = this.da.get(t);
                if (e) return this.da.delete(t), this.da.set(t, n), n
            }
            async set(t, e) {
                const n = this.da.has(t),
                    o = this.da.get(t);
                if (n && !s(e, o)) {
                    r.fe && r.ae(c, "Expected:", JSON.stringify(o, 0, 3)), r.fe && r.ae(c, "Actual:", JSON.stringify(e, 0, 3));
                    throw new Error(`Attempt to set different values for the same key: ${t}\n\n${"This is an internal Run bug. Please report it to the library developers."}`)
                }
                this.da.delete(t), this.da.set(t, e), n || (this.wa += a.ba(t), this.wa += a.ba(e), this.ga())
            }
            clear() {
                r.zt && r.Yt(c, "Clear"), this.da.clear(), this.wa = 0
            }
            ga() {
                for (; this.wa > i(this.ya);) {
                    const t = this.da.keys().next().value,
                        e = this.da.get(t);
                    this.da.delete(t), this.wa -= a.ba(t), this.wa -= a.ba(e)
                }
            }
            static ba(t) {
                switch (typeof t) {
                    case "undefined":
                        throw new Error("Cannot cache undefined");
                    case "boolean":
                        return 5;
                    case "number":
                        if (Number.isFinite(t)) return 9;
                        throw new Error(`Cannot cache number: ${o(t)}`);
                    case "string":
                        return 2 * t.length + 1;
                    case "object": {
                        if (!t) return 5;
                        const e = Object.keys(t);
                        let n = 1 + 4 * e.length;
                        return e.forEach((e => {
                            n += a.ba(e), n += a.ba(t[e])
                        })), n
                    }
                    case "function":
                        throw new Error(`Cannot cache function: ${o(t)}`);
                    case "symbol":
                        throw new Error(`Cannot cache symbol: ${o(t)}`)
                }
            }
        }

        function u(t) {
            if (void 0 === t) return 10;
            if ("number" == typeof t && !Number.isNaN(t) && t >= 0) return t;
            throw new Error(`Invalid maxSizeMB: ${o(t)}`)
        }
        t.exports = a
    }, function(t, e) {
        t.exports = class {
            constructor(t = {}) {
                if ("undefined" == typeof window || void 0 === window.indexedDB) throw new Error("Your browser doesn't support IndexedDB");
                let e, n;
                this.Ee = void 0 !== t.dbName ? t.dbName : "run-browser-cache", this.mr = void 0 !== t.dbVersion ? t.dbVersion : 1, this._a = void 0 !== t.dbStore ? t.dbStore : "run-objects", this.ma = new Promise(((t, r) => {
                    e = t, n = r
                }));
                const r = window.indexedDB.open(this.Ee, this.mr);
                r.onsuccess = () => e(r.result), r.onerror = () => n(new Error(`Cannot access database: ${r.error.message}`)), r.onblocked = () => n(new Error("Upgrade not supported")), r.onupgradeneeded = t => {
                    if (0 !== t.oldVersion) return void n(new Error("Upgrade not supported"));
                    r.result.createObjectStore(this._a)
                }
            }
            async set(t, e) {
                const n = (await this.ma).transaction(this._a, "readwrite").objectStore(this._a);
                return new Promise(((r, o) => {
                    const i = n.put(e, t);
                    i.onsuccess = () => r(i.result), i.onerror = () => r(i.error)
                }))
            }
            async get(t) {
                const e = (await this.ma).transaction(this._a, "readonly").objectStore(this._a);
                return new Promise(((n, r) => {
                    const o = e.get(t);
                    o.onsuccess = () => n(o.result), o.onerror = () => n(o.error)
                }))
            }
        }
    }, function(t, e, n) {
        const r = n(31),
            o = n(9),
            i = n(23),
            {
                RequestError
            } = n(4),
            s = n(2),
            {
                Kc: c
            } = r;
        t.exports = class extends r {
            constructor(t) {
                if (t.network = c(t.network), "main" !== t.network) throw new Error("MatterCloud API only supports mainnet");
                t.api = "mattercloud", super(t), o.Transaction.FEE_PER_KB = 1e3
            }
            async Mc(t) {
                const e = `https://merchantapi.mattercloud.net/mapi/tx${this.Ea}`,
                    n = await i.Ks(e, {
                        rawtx: t
                    }),
                    r = JSON.parse(n.payload);
                if ("failure" === r.returnResult) {
                    if ("ERROR: Transaction already in the mempool" === r.resultDescription) return;
                    throw s.zt && s.Yt(JSON.stringify(r, 0, 3)), new Error(r.resultDescription)
                }
            }
            async Bc(t) {
                let e = null;
                const n = `https://api.mattercloud.net/api/v3/${this.network}/tx/${t}${this.Ea}`;
                try {
                    const t = await i.Gt(n);
                    e = {
                        rawtx: t.rawtx,
                        time: t.time,
                        spends: []
                    }
                } catch (t) {
                    throw t instanceof RequestError && 404 === t.status ? new Error("No such mempool or blockchain transaction") : t
                }
                const r = new o.Transaction(e.rawtx);
                e.spends = [];
                for (let n = 0; n < Math.ceil(r.outputs.length / 400); n++) {
                    const o = [],
                        s = 400 * n,
                        c = Math.min(400 * (n + 1), r.outputs.length);
                    for (let e = s; e < c; e++) o.push(`${t}_o${e}`);
                    const a = `https://txdb.mattercloud.io/api/v1/spends${this.Ea}`,
                        u = await i.Ks(a, {
                            outputs: o.join(",")
                        }),
                        h = Object.keys(u.result).map((t => u.result[t] ? u.result[t].spend_txid : null));
                    e.spends = e.spends.concat(h)
                }
                return e
            }
            async Lc(t, e) {
                const n = `https://api.mattercloud.net/api/v3/${this.network}/scripthash/${t}/utxo${this.Ea}`;
                return (await i.Gt(n)).map((t => Object.assign({}, t, {
                    script: e
                })))
            }
            get Ea() {
                return this.apiKey ? `?api_key=${this.apiKey}` : ""
            }
        }
    }, function(t, e, n) {
        const r = n(31),
            o = n(23),
            {
                Kc: i
            } = r;
        t.exports = class extends r {
            constructor(t) {
                if (t.network = i(t.network), "main" !== t.network && "test" !== t.network) throw new Error("Run Blockchain Server only supports mainnet and testnet");
                t.api = "run", super(t)
            }
            async Mc(t) {
                const e = `https://api.run.network/v1/${this.network}/tx`;
                await o.Ks(e, {
                    rawtx: t
                })
            }
            async Bc(t) {
                const e = `https://api.run.network/v1/${this.network}/tx/${t}`,
                    n = await o.Gt(e);
                return {
                    rawtx: n.hex,
                    time: n.time || Date.now() / 1e3,
                    spends: n.vout.map((t => t.spentTxId))
                }
            }
            async Lc(t, e) {
                const n = `https://api.run.network/v1/${this.network}/utxos/${t}`;
                return await o.Gt(n)
            }
        }
    }, function(t, e, n) {
        const r = n(31),
            o = n(2),
            i = n(23),
            {
                RequestError,
                NotImplementedError
            } = n(4),
            {
                Kc: s
            } = r,
            c = "WhatsOnChain";
        t.exports = class extends r {
            constructor(t) {
                if (t.network = s(t.network), "main" !== t.network && "test" !== t.network && "stn" !== t.network) throw new Error("WhatsOnChain API only supports mainnet, testnet, and STN");
                t.api = "whatsonchain", super(t)
            }
            async spends(t, e) {
                throw o.zt && o.Yt(c, "Spends", t, e), new NotImplementedError("WhatsOnChain API does not support spends")
            }
            async Mc(t) {
                const e = `https://api.whatsonchain.com/v1/bsv/${this.network}/tx/raw`;
                await i.Ks(e, {
                    txhex: t
                }, void 0, this.Pa)
            }
            async Bc(t) {
                const e = `https://api.whatsonchain.com/v1/bsv/${this.network}/tx/hash/${t}`,
                    n = `https://api.whatsonchain.com/v1/bsv/${this.network}/tx/${t}/hex`;
                try {
                    const [t, r] = await Promise.all([i.Gt(e, void 0, this.Pa), i.Gt(n, void 0, this.Pa)]), {
                        time: o
                    } = t;
                    return {
                        rawtx: r,
                        time: o,
                        spends: []
                    }
                } catch (t) {
                    throw t instanceof RequestError && 404 === t.status ? new Error("No such mempool or blockchain transaction") : t
                }
            }
            async Lc(t, e) {
                if ("stn" === this.network) return o.he && o.ce(c, "Utxos are not available on STN"), [];
                const n = `https://api.whatsonchain.com/v1/bsv/${this.network}/script/${t}/unspent`;
                return (await i.Gt(n, void 0, this.Pa)).map((t => ({
                    txid: t.tx_hash,
                    vout: t.tx_pos,
                    satoshis: t.value,
                    script: e
                })))
            }
            get Pa() {
                return this.apiKey ? {
                    "woc-api-key": this.apiKey
                } : {}
            }
        }
    }, function(t, e, n) {
        const Berry = n(12),
            r = n(3),
            txo = n(39);
        class B extends Berry {
            init(t, e, n, r = {}) {
                this.base64Data = t, this.mediaType = e, this.filename = n, this.metadata = r, "image/svg+xml" !== e && "image/png" !== e || (this.metadata.image = this)
            }
            static async pluck(t, e) {
                const n = 64 === t.length ? t : JSON.parse(t).txid,
                    r = 64 === t.length ? {} : JSON.parse(t).metadata,
                    o = txo(await e(n)).out.find((t => "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut" === t.s2 && "binary" === t.s5));
                if (!o) throw new Error(`Cannot find B:// binary data in ${n}`);
                return new B(o.b3, o.s4, o.s6, r)
            }
            static async loadWithMetadata(t, e) {
                return this.load(JSON.stringify({
                    txid: t,
                    metadata: e
                }))
            }
        }
        B.metadata = {
            author: "Run ▸ Extra",
            website: "https://www.run.network",
            license: "MIT"
        }, B.deps = {
            txo
        }, B.toString(), B.presets = {}, B.presets.main = {}, B.presets.test = {}, B.presets.main.location = "6fe169894d313b44bd54154f88e1f78634c7f5a23863d1713342526b86a39b8b_o1", B.presets.main.origin = "6fe169894d313b44bd54154f88e1f78634c7f5a23863d1713342526b86a39b8b_o1", B.presets.main.nonce = 1, B.presets.main.owner = "1PytriYokKN3GpKw84L4vvrGBwUvTYzCpx", B.presets.main.satoshis = 0, B.presets.test.location = "5435ae2760dc35f4329501c61c42e24f6a744861c22f8e0f04735637c20ce987_o1", B.presets.test.origin = "5435ae2760dc35f4329501c61c42e24f6a744861c22f8e0f04735637c20ce987_o1", B.presets.test.nonce = 1, B.presets.test.owner = "n3CiECgxW1pB1rGbYiX67e4U7AnS3MpJeE", B.presets.test.satoshis = 0, t.exports = r.Fe(B)
    }, function(t, e, n) {
        const Jig = n(5),
            r = n(3);

        function expect(t) {
            let e = !1;
            const n = t => {
                if ("object" != typeof t || !t) return t;
                try {
                    return JSON.stringify(t)
                } catch (e) {
                    return t.toString()
                }
            };

            function r(r, o, i) {
                if (e ? r : !r) throw new Error(i || `expected value${e?" not":""} to be ${o} but was ${n(t)}`)
            }

            function o(t, e) {
                if (t === e) return !0;
                if (typeof t != typeof e) return !1;
                if ("object" != typeof t) return !1;
                if (null === t || null === e) return !1;
                if (Object.getPrototypeOf(t) !== Object.getPrototypeOf(e)) return !1;
                if (Object.keys(t).length !== Object.keys(e).length) return !1;
                if (!Object.keys(t).every((n => o(t[n], e[n])))) return !1;
                if (t instanceof Set) {
                    if (t.size !== e.size) return !1;
                    if (!o(Array.from(t.entries()), Array.from(e.entries()))) return !1
                }
                if (t instanceof Map) {
                    if (t.size !== e.size) return !1;
                    if (!o(Array.from(t.entries()), Array.from(e.entries()))) return !1
                }
                return !0
            }

            function i(t, e) {
                if ("function" != typeof t) return !1;
                if ("function" != typeof e) return !1;
                for (; t;)
                    if ((t = Object.getPrototypeOf(t)) === e) return !0;
                return !1
            }
            return {
                get not() {
                    return e = !e, this
                },
                toBe: (e, o) => r(t === e, `${n(e)}`, o),
                toEqual: (e, i) => r(o(t, e), `equal to ${n(e)}`, i),
                toBeInstanceOf: (e, n) => r(t && t instanceof e, `an instance of ${e&&e.name}`, n),
                toBeDefined: e => r(void 0 !== t, "defined", e),
                toBeNull: e => r(null === t, "null", e),
                toBeNumber: e => r("number" == typeof t, "a number", e),
                toBeInteger: e => r(Number.isInteger(t), "an integer", e),
                toBeLessThan: (e, n) => r(t < e && "number" == typeof t && "number" == typeof e, `less than ${e}`, n),
                toBeLessThanOrEqualTo: (e, n) => r(t <= e && "number" == typeof t && "number" == typeof e, `less than or equal to ${e}`, n),
                toBeGreaterThan: (e, n) => r(t > e && "number" == typeof t && "number" == typeof e, `greater than ${e}`, n),
                toBeGreaterThanOrEqualTo: (e, n) => r(t >= e && "number" == typeof t && "number" == typeof e, `greater than or equal to ${e}`, n),
                toBeBoolean: e => r("boolean" == typeof t, "a boolean", e),
                toBeString: e => r("string" == typeof t, "a string", e),
                toBeObject: e => r(t && "object" == typeof t, "an object", e),
                toBeArray: e => r(Array.isArray(t), "an array", e),
                toBeSet: e => r(t instanceof Set, "a set", e),
                toBeMap: e => r(t instanceof Map, "a map", e),
                toBeUint8Array: e => r(t instanceof Uint8Array, "a uint8array", e),
                toBeClass: e => r("function" == typeof t && t.toString().startsWith("class"), "a class", e),
                toBeFunction: e => r("function" == typeof t && !t.toString().startsWith("class"), "a function", e),
                toBeJigClass: e => r("function" == typeof t && t.toString().startsWith("class") && i(t, Jig), "a jig class", e),
                toExtendFrom: (e, n) => r(i(t, e), `an extension of ${e&&e.name}`, n)
            }
        }
        expect.deps = {
            Jig
        }, expect.toString(), expect.presets = {}, expect.presets.main = {}, expect.presets.test = {}, expect.presets.main.location = "71fba386341b932380ec5bfedc3a40bce43d4974decdc94c419a94a8ce5dfc23_o1", expect.presets.main.origin = "71fba386341b932380ec5bfedc3a40bce43d4974decdc94c419a94a8ce5dfc23_o1", expect.presets.main.nonce = 1, expect.presets.main.owner = "1PytriYokKN3GpKw84L4vvrGBwUvTYzCpx", expect.presets.main.satoshis = 0, expect.presets.test.location = "f97d4ac2a3d6f5ed09fad4a4f341619dc5a3773d9844ff95c99c5d4f8388de2f_o1", expect.presets.test.origin = "f97d4ac2a3d6f5ed09fad4a4f341619dc5a3773d9844ff95c99c5d4f8388de2f_o1", expect.presets.test.nonce = 1, expect.presets.test.owner = "n3CiECgxW1pB1rGbYiX67e4U7AnS3MpJeE", expect.presets.test.satoshis = 0, t.exports = r.Fe(expect)
    }, function(t, e, n) {
        const Jig = n(5),
            r = n(3);
        class Token extends Jig {
            init(...t) {
                if (Object.getPrototypeOf(this.constructor) === Jig) throw new Error("Token must be extended");
                if (caller === this.constructor) return this.Pc(caller.mintAmount), this.amount = caller.mintAmount, void(this.sender = null);
                if (caller && caller.constructor === this.constructor) return this.Pc(caller.sendAmount), this.amount = caller.sendAmount, this.owner = caller.sendOwner, void(this.sender = caller.owner);
                if (!Array.isArray(t) || t.length < 2) throw new Error("Invalid tokens to combine");
                if (t.some((t => t.constructor !== this.constructor))) throw new Error("Cannot combine different token classes");
                if (t.some((e => (e => t.reduce(((t, n) => n === e ? t + 1 : t), 0))(e) > 1))) throw new Error("Cannot combine duplicate tokens");
                this.amount = 0, t.forEach((t => {
                    this.amount += t.amount, t.destroy()
                })), this.sender = null, this.Pc(this.amount)
            }
            static mint(t) {
                this.mintAmount = t;
                const e = new this;
                return delete this.mintAmount, this.supply += t, e
            }
            destroy() {
                super.destroy(), this.amount = 0, this.sender = null
            }
            send(t, e = this.amount) {
                if (this.Pc(e), e > this.amount) throw new Error("Not enough funds");
                this.sendAmount = e, this.sendOwner = t;
                const n = new this.constructor;
                return delete this.sendAmount, delete this.sendOwner, this.amount === e ? this.destroy() : (this.amount -= e, this.sender = null), n
            }
            Pc(t) {
                if ("number" != typeof t) throw new Error("amount is not a number");
                if (!Number.isInteger(t)) throw new Error("amount must be an integer");
                if (t <= 0) throw new Error("amount must be positive");
                if (t > Number.MAX_SAFE_INTEGER) throw new Error("amount too large")
            }
        }
        Token.sealed = !1, Token.decimals = 0, Token.icon = {
            emoji: null
        }, Token.symbol = null, Token.supply = 0, Token.toString(), Token.presets = {}, Token.presets.main = {}, Token.presets.test = {}, Token.presets.main.location = "b17a9af70ab0f46809f908b2e900e395ba40996000bf4f00e3b27a1e93280cf1_o1", Token.presets.main.origin = "b17a9af70ab0f46809f908b2e900e395ba40996000bf4f00e3b27a1e93280cf1_o1", Token.presets.main.nonce = 1, Token.presets.main.owner = "1PytriYokKN3GpKw84L4vvrGBwUvTYzCpx", Token.presets.main.satoshis = 0, Token.presets.test.location = "0bdf33a334a60909f4c8dab345500cbb313fbfd50b1d98120227eae092b81c39_o1", Token.presets.test.origin = "0bdf33a334a60909f4c8dab345500cbb313fbfd50b1d98120227eae092b81c39_o1", Token.presets.test.nonce = 1, Token.presets.test.owner = "n3CiECgxW1pB1rGbYiX67e4U7AnS3MpJeE", Token.presets.test.satoshis = 0, t.exports = r.Fe(Token)
    }, function(t, e, n) {
        (function(e) {
            n(41).Rt();
            const r = n(9),
                o = n(58),
                {
                    Es: i
                } = n(16),
                {
                    gt: s
                } = n(0);
            e.Jig = o.Jig, e.Berry = o.Berry, s(e, "Token", (() => o.extra.Token)), i(r), t.exports = o
        }).call(this, n(33))
    }, function(t, e, n) {
        const r = n(9),
            {
                PrivateKey: o,
                PublicKey: i,
                Address: s
            } = r,
            c = n(42),
            {
                Blockchain: a,
                Logger: u,
                Purse: h,
                Cache: f,
                Lock: l,
                Owner: p
            } = n(36),
            Jig = n(5),
            Berry = n(12),
            Code = n(1),
            d = n(3),
            w = n(30),
            y = n(14),
            Creation = n(6),
            CommonLock = n(35),
            b = n(25),
            {
                le: g
            } = n(27),
            _ = n(8),
            m = n(2),
            {
                Y: E,
                gt: v,
                $t: P
            } = n(0),
            O = n(23),
            {
                ArgumentError,
                StateError
            } = n(4),
            S = n(65),
            $ = n(50),
            A = n(66),
            x = n(49),
            I = n(67),
            R = n(68),
            T = n(51),
            j = n(69),
            C = n(70),
            k = n(31),
            N = n(52),
            U = n(71),
            M = n(53),
            F = "Run";
        class D {
            constructor(t = {}) {
                m.ue && m.ie(F, "Create"), t = Object.assign({}, D.defaults, t), this.logger = t.logger, this.networkRetries = t.networkRetries, this.networkTimeout = t.networkTimeout, this.B = new c, this.B.Xc = Y(t.cache), this.B.Yr = et(t.client), this.B.Qc = W(t.blockchain, t.api, t.apiKey, t.network, this.B.qr()), this.B.ta = J(t.purse, this.B.Se(), t.wallet), this.B.qi = z(t.app), this.B.ye = Z(t.owner, this.B.Se(), t.wallet), this.B.At = q(t.timeout), this.B.yu = function(t) {
                    const e = c._ && c._.yu;
                    if (void 0 === t) return e || [];
                    "string" == typeof t && (t = [t]);
                    if (!Array.isArray(t) || t.some((t => !rt(t)))) throw new Error(`Not trustable: ${E(t)}`);
                    const n = ["61e1265acb3d93f1bf24a593d70b2a6b1c650ec1df90ddece8d6954ae3cdd915", "6fe169894d313b44bd54154f88e1f78634c7f5a23863d1713342526b86a39b8b", "71fba386341b932380ec5bfedc3a40bce43d4974decdc94c419a94a8ce5dfc23", "780ab8919cb89323707338070323c24ce42cdec2f57d749bd7aceef6635e7a4d", "90a3ece416f696731430efac9657d28071cc437ebfff5fb1eaf710fe4b3c8d4e", "727e7b423b7ee40c0b5be87fba7fa5673ea2d20a74259040a7295d9c32a90011", "b17a9af70ab0f46809f908b2e900e395ba40996000bf4f00e3b27a1e93280cf1", "72a61eb990ffdb6b38e5f955e194fed5ff6b014f75ac6823539ce5613aea0be8", "312985bd960ae4c59856b3089b04017ede66506ea181333eec7c9bb88b11c490", "312985bd960ae4c59856b3089b04017ede66506ea181333eec7c9bb88b11c490", "d792d10294a0d9b05a30049f187a1704ced14840ecf41d00663d79c695f86633", "318d2a009e29cb3a202b2a167773341dcd39809b967889a7e306d504cc266faf", "1f0abf8d94477b1cb57629d861376616f6e1d7b78aba23a19da3e6169caf489e", "5435ae2760dc35f4329501c61c42e24f6a744861c22f8e0f04735637c20ce987", "f97d4ac2a3d6f5ed09fad4a4f341619dc5a3773d9844ff95c99c5d4f8388de2f", "63e0e1268d8ab021d1c578afb8eaa0828ccbba431ffffd9309d04b78ebeb6e56", "03320f1244e509bb421e6f1ff724bf1156182890c3768cfa4ea127a78f9913d2", "1f0abf8d94477b1cb57629d861376616f6e1d7b78aba23a19da3e6169caf489e", "72a61eb990ffdb6b38e5f955e194fed5ff6b014f75ac6823539ce5613aea0be8", "7d14c868fe39439edffe6982b669e7b4d3eb2729eee7c262ec2494ee3e310e99", "33e78fa7c43b6d7a60c271d783295fa180b7e9fce07d41ff1b52686936b3e6ae", "33e78fa7c43b6d7a60c271d783295fa180b7e9fce07d41ff1b52686936b3e6ae"];
                    return new Set(t.concat(n))
                }(t.trust), this.B.Zi = X(t.preverify), this.B.dr = Q(t.rollbacks), this.Oa = tt(t.autofund), this.va = nt(t.inventory), V(this), this.activate()
            }
            get app() {
                return this.B.qi
            }
            get api() {
                return this.blockchain.api
            }
            get apiKey() {
                return this.blockchain.apiKey
            }
            get autofund() {
                return this.Oa
            }
            get blockchain() {
                return this.B.Qc
            }
            get cache() {
                return this.B.Xc
            }
            get client() {
                return this.B.Yr
            }
            get inventory() {
                return this.va
            }
            get logger() {
                return this.re
            }
            get network() {
                return this.blockchain.network
            }
            get networkRetries() {
                return this.$a
            }
            get networkTimeout() {
                return this.Sa
            }
            get owner() {
                return this.B.ye
            }
            get preverify() {
                return this.B.Zi
            }
            get purse() {
                return this.B.ta
            }
            get rollbacks() {
                return this.B.dr
            }
            get timeout() {
                return this.B.At
            }
            get wallet() {
                return this.B.ta === this.B.ye ? this.B.ta : void 0
            }
            set app(t) {
                this.B.qi = z(t)
            }
            set api(t) {
                this.B.Qc = W(void 0, t, this.blockchain.apiKey, this.blockchain.network, this.B.qr())
            }
            set apiKey(t) {
                this.B.Qc = W(void 0, this.blockchain.api, t, this.blockchain.network, this.B.qr())
            }
            set autofund(t) {
                this.Oa = tt(t)
            }
            set blockchain(t) {
                this.B.Qc = W(t), this.B.ta instanceof R && (this.B.ta.blockchain = this.B.Qc), V(this)
            }
            set cache(t) {
                this.B.Xc = null, this.B.Xc = Y(t)
            }
            set client(t) {
                this.B.Yr = et(t)
            }
            set inventory(t) {
                this.va && this.va.deactivate(), this.va = nt(t), this.va && this.va.activate(this)
            }
            set logger(t) {
                this.re = function(t) {
                    if (t instanceof u) return t;
                    if (void 0 === t) return m.oe;
                    if (null === t) return {};
                    throw new Error(`Invalid logger: ${E(t)}`)
                }(t), L(this) && (m.re = this.re)
            }
            set network(t) {
                this.B.Qc = W(void 0, this.blockchain.api, this.blockchain.apiKey, t, this.B.qr())
            }
            set networkRetries(t) {
                this.$a = O.Ys = K(t), L(this) && (O.Ys = K(t))
            }
            set networkTimeout(t) {
                this.Sa = H(t), L(this) && (O.At = H(t))
            }
            set owner(t) {
                this.B.ye = Z(t, this.B.Se()), this.va && this.va.deactivate(), this.va = new A, this.va.activate(this)
            }
            set rollbacks(t) {
                this.B.dr = Q(t)
            }
            set preverify(t) {
                this.B.Zi = X(t)
            }
            set purse(t) {
                this.B.ta = J(t, this.blockchain)
            }
            set timeout(t) {
                this.B.At = q(t)
            }
            set wallet(t) {
                this.purse = t, this.owner = t
            }
            load(t, e = {}) {
                if (G(this), b.Ht) throw new StateError("load disabled during atomic update");
                e.trust && this.trust(t.slice(0, 64));
                return new y(this.B).$n(t)
            }
            sync() {
                if (b.Ht) throw new StateError("sync all disabled during atomic update");
                return w.Dc()
            }
            deploy(t) {
                G(this);
                const e = ot(t);
                return d.Gt(e).We(), e
            }
            transaction(t) {
                G(this);
                const e = new b,
                    n = e.update(t);
                return e.publish(), n
            }
            import(t, e = {}) {
                if (b.Ht) throw new StateError("import disabled during atomic update");
                const n = new r.Transaction(t),
                    o = n.hash;
                return e.trust && this.trust(o), b.mc(n, o)
            }
            trust(t) {
                if (m.ue && m.ie(F, "Trust", t), !rt(t)) throw new ArgumentError(`Not trustable: ${E(t)}`);
                this.B.yu.add(t)
            }
            on(t, e) {
                if (!c.oa.includes(t)) throw new ArgumentError(`Invalid event: ${t}`);
                if ("function" != typeof e) throw new ArgumentError(`Invalid listener: ${E(P)}`);
                this.B.ea.some((n => n.na === t && n.ra === e)) || this.B.ea.push({
                    na: t,
                    ra: e
                })
            }
            off(t, e) {
                if (!c.oa.includes(t)) throw new ArgumentError(`Invalid event: ${t}`);
                if ("function" != typeof e) throw new ArgumentError(`Invalid listener: ${E(e)}`);
                this.B.ea = this.B.ea.filter((n => !(n => n.na === t && n.ra === e)(n)))
            }
            activate() {
                if (m.ue && m.ie(F, "Activate"), b.Ht) throw new StateError("activate disabled during atomic update");
                return D.instance = this, this.va && this.va.activate(this), this.B.an(), this.logger = this.re, this.networkRetries = this.$a, this.networkTimeout = this.Sa, this
            }
            deactivate() {
                if (m.ue && m.ie(F, "Deactivate"), b.Ht) throw new StateError("deactivate disabled during atomic update");
                return D.instance = null, this.va && this.va.deactivate(), this.B.cn(), this
            }
        }

        function L(t) {
            return c._ === t.B
        }

        function G(t) {
            if (c._ !== t.B) {
                throw new Error(`This Run instance is not active\n\n${"Hint: Call run.activate() on this instance first"}`)
            }
        }

        function V(t) {
            t.blockchain instanceof j && t.purse instanceof R && t.autofund && t.blockchain.fund(t.purse.bsvAddress, 1e8)
        }

        function W(t, e, n, r, o) {
            if (t instanceof a) return t;
            const i = c._ && c._.Qc;
            if (void 0 === t) switch (r) {
                case "mock":
                    return i instanceof j ? i : new j;
                case "main":
                case "test":
                case "stn":
                    return i instanceof k && i.api === e && i.apiKey === n && i.network === r ? i : k.create({
                        api: e,
                        apiKey: n,
                        network: r,
                        cache: o,
                        lastBlockchain: i
                    });
                default:
                    if (D.defaults.blockchain instanceof a) return D.defaults.blockchain;
                    throw new Error(`Unsupported network: ${r}`)
            }
            throw new Error(`Invalid blockchain: ${E(t)}`)
        }

        function J(t, e, n) {
            if (n) {
                if (!(n instanceof h)) throw new Error("wallet does not implement the Purse API");
                return n
            }
            if (t instanceof h) return t;
            switch (typeof t) {
                case "string":
                    return new R({
                        privkey: t,
                        blockchain: e
                    });
                case "undefined":
                    return new R({
                        blockchain: e
                    });
                case "object":
                    if (t instanceof o) return new R({
                        privkey: t,
                        blockchain: e
                    })
            }
            throw new Error(`Invalid purse: ${E(t)}`)
        }

        function z(t) {
            switch (typeof t) {
                case "string":
                    return t;
                case "undefined":
                    return D.defaults.app;
                default:
                    throw new Error(`Invalid app: ${E(t)}`)
            }
        }

        function Y(t) {
            if (t instanceof f) return t;
            if (void 0 === t) return D.instance && D.instance.cache ? D.instance.cache : "undefined" == typeof window ? new x : new S;
            throw new Error(`Invalid cache: ${E(t)}`)
        }

        function K(t) {
            switch (typeof t) {
                case "number":
                    if (Number.isNaN(t) || t < 0) throw new Error(`Invalid network retries: ${t}`);
                    return t;
                case "undefined":
                    return 2;
                default:
                    throw new Error(`Invalid timeout: ${t}`)
            }
        }

        function H(t) {
            switch (typeof t) {
                case "number":
                    if (Number.isNaN(t) || t < 0) throw new Error(`Invalid network timeout: ${t}`);
                    return t;
                case "undefined":
                    return 1e4;
                default:
                    throw new Error(`Invalid network timeout: ${t}`)
            }
        }

        function q(t) {
            switch (typeof t) {
                case "number":
                    if (Number.isNaN(t) || t < 0) throw new Error(`Invalid timeout: ${t}`);
                    return t;
                case "undefined":
                    return 3e4;
                default:
                    throw new Error(`Invalid timeout: ${t}`)
            }
        }

        function Z(t, e, n) {
            if (n) {
                if (!(n instanceof p)) throw new Error("wallet does not implement the Owner API");
                return n
            }
            if (t instanceof p) return t;
            if (void 0 === t || "string" == typeof t || t instanceof o) try {
                return new I(t, e.network)
            } catch (t) {}
            if ("string" == typeof t || t instanceof i || t instanceof s) try {
                return new U(t.toString())
            } catch (t) {}
            if ("object" == typeof t) try {
                return new U(t)
            } catch (t) {}
            throw new Error(`Invalid owner: ${E(t)}`)
        }

        function X(t) {
            switch (typeof t) {
                case "boolean":
                    return t;
                case "undefined":
                    return D.defaults.preverify;
                default:
                    throw new Error(`Invalid preverify: ${t}`)
            }
        }

        function Q(t) {
            switch (typeof t) {
                case "boolean":
                    return t;
                case "undefined":
                    return D.defaults.rollbacks;
                default:
                    throw new Error(`Invalid rollbacks: ${t}`)
            }
        }

        function tt(t) {
            switch (typeof t) {
                case "boolean":
                    return t;
                case "undefined":
                    return D.defaults.autofund;
                default:
                    throw new Error(`Invalid autofund: ${t}`)
            }
        }

        function et(t) {
            switch (typeof t) {
                case "boolean":
                    return t;
                case "undefined":
                    return D.defaults.client;
                default:
                    throw new Error(`Invalid client: ${t}`)
            }
        }

        function nt(t) {
            switch (typeof t) {
                case "boolean":
                    return null;
                case "object":
                    return t;
                case "undefined":
                    return new A;
                default:
                    throw new Error(`Invalid inventory: ${t}`)
            }
        }

        function rt(t) {
            return "*" === t || "string" == typeof t && (64 === t.length && /[a-fA-F0-9]+/.test(t))
        }

        function ot(t) {
            const e = d.te(t) || d.ee(),
                n = d.Gt(e);
            return D.instance ? n.Oe || n.xe(t) : n.Fe(t), e
        }

        function it(t) {
            const e = d.te(t);
            if (!e) return;
            d.Gt(e).Ue()
        }
        D.instance = null, D.defaults = {}, D.defaults.api = void 0, D.defaults.apiKey = void 0, D.defaults.app = "", D.defaults.autofund = !0, D.defaults.blockchain = void 0, D.defaults.client = !1, D.defaults.inventory = void 0, D.defaults.logger = void 0, D.defaults.network = "main", D.defaults.networkRetries = 2, D.defaults.networkTimeout = 1e4, D.defaults.owner = void 0, D.defaults.preverify = !0, D.defaults.purse = void 0, D.defaults.rollbacks = !0, D.defaults.timeout = 3e4, D.defaults.trust = [], D.configure = (t, e) => {
            if (t.APP && (D.defaults.app = t.APP), e = e || t.NETWORK || D.defaults.network, D.defaults.network = e, "debug" === t.LOGGER) D.defaults.logger = console;
            else if (t.LOGGER && JSON.parse(t.LOGGER)) {
                const t = {
                    info: console.info,
                    warn: console.warn,
                    error: console.error
                };
                D.defaults.logger = t
            } else t.LOGGER && !JSON.parse(t.LOGGER) && (D.defaults.logger = {});
            m.re = D.defaults.logger;
            const n = t.PURSE || t[`PURSE_${e.toUpperCase()}`];
            void 0 !== n && (D.defaults.purse = n);
            const r = t.OWNER || t[`OWNER_${e.toUpperCase()}`];
            void 0 !== r && (D.defaults.owner = r), void 0 !== t.API && (D.defaults.api = t.API);
            const o = t.APIKEY || t[`APIKEY_${(D.defaults.api||"").toUpperCase()}`];
            void 0 !== o && (D.defaults.apiKey = o)
        }, D.cover = t => {
            _.Z.includes(t) || _.Z.push(t)
        };
        const st = (t, e = "Run.") => console.warn(`${e}${t} deprecated. Use Run.extra.${t}.`),
            ct = (t, e = "Run.") => console.warn(`${e}${t} deprecated. Use Run.plugins.${t}.`),
            at = (t, e = "Run.") => console.warn(`${e}${t} deprecated. Use Run.util.${t}.`);
        D.Berry = Berry, D.Code = Code, D.Jig = Jig, D.Creation = Creation, D.Transaction = b, D.plugins = {}, D.plugins.BrowserCache = S, D.plugins.IndexedDbCache = $, D.plugins.Inventory = A, D.plugins.LocalCache = x, D.plugins.LocalOwner = I, D.plugins.LocalPurse = R, D.plugins.MatterCloud = T, D.plugins.Mockchain = j, D.plugins.PayServer = C, D.plugins.RemoteBlockchain = k, D.plugins.RunConnect = N, D.plugins.Viewer = U, D.plugins.WhatsOnChain = M, v(D, "BrowserCache", (() => (ct("BrowserCache"), S))), v(D, "IndexedDbCache", (() => (ct("IndexedDbCache"), $))), v(D, "Inventory", (() => (ct("Inventory"), A))), v(D, "LocalCache", (() => (ct("LocalCache"), x))), v(D, "LocalOwner", (() => (ct("LocalOwner"), I))), v(D, "LocalPurse", (() => (ct("LocalPurse"), R))), v(D, "MatterCloud", (() => (ct("MatterCloud"), T))), v(D, "Mockchain", (() => (ct("Mockchain"), j))), v(D, "PayServer", (() => (ct("PayServer"), C))), v(D, "RemoteBlockchain", (() => (ct("RemoteBlockchain"), k))), v(D, "RunConnect", (() => (ct("RunConnect"), N))), v(D, "Viewer", (() => (ct("Viewer"), U))), v(D, "WhatsOnChain", (() => (ct("WhatsOnChain"), M))), D.module = {};
        const ut = "Run.module";
        v(D.module, "BrowserCache", (() => (ct("BrowserCache", ut), S))), v(D.module, "IndexedDbCache", (() => (ct("IndexedDbCache", ut), $))), v(D.module, "Inventory", (() => (ct("Inventory", ut), A))), v(D.module, "LocalCache", (() => (ct("LocalCache", ut), x))), v(D.module, "LocalOwner", (() => (ct("LocalOwner", ut), I))), v(D.module, "LocalPurse", (() => (ct("LocalPurse", ut), R))), v(D.module, "MatterCloud", (() => (ct("MatterCloud", ut), T))), v(D.module, "Mockchain", (() => (ct("Mockchain", ut), j))), v(D.module, "PayServer", (() => (ct("PayServer", ut), C))), v(D.module, "RemoteBlockchain", (() => (ct("RemoteBlockchain", ut), k))), v(D.module, "RunConnect", (() => (ct("RunConnect", ut), N))), v(D.module, "Viewer", (() => (ct("Viewer", ut), U))), v(D.module, "WhatsOnChain", (() => (ct("WhatsOnChain", ut), M))), D.extra = {}, v(D.extra, "asm", (() => n(38))), v(D.extra, "B", (() => n(54))), v(D.extra, "expect", (() => n(55))), v(D.extra, "Group", (() => n(37))), v(D.extra, "Hex", (() => n(26))), v(D.extra, "Token", (() => n(32))), v(D.extra, "Token10", (() => n(56))), v(D.extra, "Token20", (() => n(32))), v(D.extra, "Tx", (() => n(40))), v(D.extra, "txo", (() => n(39))), v(D, "asm", (() => (st("asm"), n(38)))), v(D, "B", (() => (st("B"), n(54)))), v(D, "expect", (() => (st("expect"), n(55)))), v(D, "Group", (() => (st("Group"), n(37)))), v(D, "Token", (() => (st("Token"), n(32)))), v(D, "Token10", (() => (st("Token10"), n(56)))), v(D, "Token20", (() => (st("Token10"), n(32)))), v(D, "Tx", (() => (st("Tx"), n(40)))), v(D, "txo", (() => (st("txo"), n(39)))), D.Sn = n(7).Sn, D.dn = n(11), D.Aa = n(16), D.xa = n(24), D.yn = n(13), D.Ia = n(44), D.Ra = n(45), D.pn = n(3).pn, D.uu = n(41), D.Ut = n(2), D.bn = n(18), D.Ft = n(0), D.Qr = n(14).Qr, D.Ca = n(21), D.Dt = n(10), D.j = n(0).j, D.gu = n(0).gu, D._u = n(0)._u, D.ja = n(23), D.mn = n(20), D.En = _, D.Ta = n(47), D.vs = n(16).vs, D.ka = n(29), D.g = n(7).g, D.mr = n(15), D.api = {}, D.api.Blockchain = a, D.api.Logger = u, D.api.Purse = h, D.api.Cache = f, D.api.Lock = l, D.api.Owner = p, D.errors = n(4), D.util = {}, D.util.CommonLock = CommonLock, D.util.metadata = t => n(14).Qr(new r.Transaction(t)), D.util.install = ot, D.util.unify = function(...t) {
            if (!t.length) throw new ArgumentError("No creations to unify");
            if (t.some((t => !(t instanceof Creation)))) throw new ArgumentError("Must only unify creations");
            g(t, t)
        }, D.util.uninstall = it, v(D, "CommonLock", (() => (at("CommonLock"), CommonLock))), v(D, "install", (() => (at("install"), ot))), v(D, "uninstall", (() => (at("uninstall"), it))), v(D.prototype, "payload", (() => (console.warn("Run.prototype.payload deprecated. Use Run.util.metadata."), D.util.metadata))), v(D.prototype, "unify", (() => (console.warn("Run.prototype.unify deprecated. Use Run.util.unify."), D.util.unify))), D.prototype.payload = D.util.metadata, D.version = "0.6.14", D.protocol = n(15).Tr, t.exports = D
    }, function(t) {
        t.exports = JSON.parse('"!function(t,o){\\"object\\"==typeof exports&&\\"undefined\\"!=typeof module?o(exports):\\"function\\"==typeof define&&define.amd?define([\\"exports\\"],o):o((t=t||self).SES={})}(this,(function(t){\\"use strict\\";function o(t,o){if(!t)throw new TypeError(o)}const{getPrototypeOf:r}=Object;const{getOwnPropertyDescriptor:e,getPrototypeOf:n}=Object;function a(t){return n(t).constructor}const i=[\\"Array\\",\\"ArrayBuffer\\",\\"ArrayBufferPrototype\\",\\"ArrayIteratorPrototype\\",\\"ArrayPrototype\\",\\"AsyncFunction\\",\\"AsyncFunctionPrototype\\",\\"AsyncGenerator\\",\\"AsyncGeneratorFunction\\",\\"AsyncGeneratorPrototype\\",\\"AsyncIteratorPrototype\\",\\"Atomics\\",\\"BigInt\\",\\"BigIntPrototype\\",\\"BigInt64Array\\",\\"BigInt64ArrayPrototype\\",\\"BigUint64Array\\",\\"BigUint64ArrayPrototype\\",\\"Boolean\\",\\"BooleanPrototype\\",\\"DataView\\",\\"DataViewPrototype\\",\\"Date\\",\\"DatePrototype\\",\\"decodeURI\\",\\"decodeURIComponent\\",\\"encodeURI\\",\\"encodeURIComponent\\",\\"Error\\",\\"ErrorPrototype\\",\\"eval\\",\\"EvalError\\",\\"EvalErrorPrototype\\",\\"Float32Array\\",\\"Float32ArrayPrototype\\",\\"Float64Array\\",\\"Float64ArrayPrototype\\",\\"Function\\",\\"FunctionPrototype\\",\\"Generator\\",\\"GeneratorFunction\\",\\"GeneratorPrototype\\",\\"Int8Array\\",\\"Int8ArrayPrototype\\",\\"Int16Array\\",\\"Int16ArrayPrototype\\",\\"Int32Array\\",\\"Int32ArrayPrototype\\",\\"isFinite\\",\\"isNaN\\",\\"IteratorPrototype\\",\\"JSON\\",\\"Map\\",\\"MapIteratorPrototype\\",\\"MapPrototype\\",\\"Math\\",\\"Number\\",\\"NumberPrototype\\",\\"Object\\",\\"ObjectPrototype\\",\\"parseFloat\\",\\"parseInt\\",\\"Promise\\",\\"PromisePrototype\\",\\"Proxy\\",\\"RangeError\\",\\"RangeErrorPrototype\\",\\"ReferenceError\\",\\"ReferenceErrorPrototype\\",\\"Reflect\\",\\"RegExp\\",\\"RegExpPrototype\\",\\"RegExpStringIteratorPrototype\\",\\"Set\\",\\"SetIteratorPrototype\\",\\"SetPrototype\\",\\"SharedArrayBuffer\\",\\"SharedArrayBufferPrototype\\",\\"String\\",\\"StringIteratorPrototype\\",\\"StringPrototype\\",\\"Symbol\\",\\"SymbolPrototype\\",\\"SyntaxError\\",\\"SyntaxErrorPrototype\\",\\"ThrowTypeError\\",\\"TypedArray\\",\\"TypedArrayPrototype\\",\\"TypeError\\",\\"TypeErrorPrototype\\",\\"Uint8Array\\",\\"Uint8ArrayPrototype\\",\\"Uint8ClampedArray\\",\\"Uint8ClampedArrayPrototype\\",\\"Uint16Array\\",\\"Uint16ArrayPrototype\\",\\"Uint32Array\\",\\"Uint32ArrayPrototype\\",\\"URIError\\",\\"URIErrorPrototype\\",\\"WeakMap\\",\\"WeakMapPrototype\\",\\"WeakSet\\",\\"WeakSetPrototype\\",\\"escape\\",\\"unescape\\",\\"FunctionPrototypeConstructor\\",\\"Compartment\\",\\"CompartmentPrototype\\",\\"harden\\"],{getOwnPropertyDescriptor:c}=Object;function p(t,r){const e=c(t,r);return o(!(\\"get\\"in e||\\"set\\"in e),`unexpected accessor on global property: ${r}`),e.value}const{apply:s}=Reflect,y=(t=>(o,...r)=>s(t,o,r))(Object.prototype.hasOwnProperty);function l(){const t={__proto__:null},c=function(){const t=Function.prototype.constructor,o=typeof Symbol&&Symbol.iterator||\\"@@iterator\\",r=typeof Symbol&&Symbol.matchAll||\\"@@matchAll\\",i=e(arguments,\\"callee\\").get,c=(new String)[o](),p=n(c);let s=null,y=null;r in new RegExp&&(s=(new RegExp)[r](),y=n(s));const l=(new Array)[o](),u=n(l),g=n(Float32Array),f=(new Map)[o](),P=n(f),b=(new Set)[o](),m=n(b),d=n(u);function*h(){}const A=a(h),E=A.prototype;async function*S(){}const _=a(S),w=_.prototype,I=w.prototype,F=n(I);async function T(){}const v=a(T),O={FunctionPrototypeConstructor:t,ArrayIteratorPrototype:u,AsyncFunction:v,AsyncGenerator:w,AsyncGeneratorFunction:_,AsyncGeneratorPrototype:I,AsyncIteratorPrototype:F,Generator:E,GeneratorFunction:A,IteratorPrototype:d,MapIteratorPrototype:P,RegExpStringIteratorPrototype:y,SetIteratorPrototype:m,StringIteratorPrototype:p,ThrowTypeError:i,TypedArray:g};return O}();!function(t){const{FunctionPrototypeConstructor:e,ArrayIteratorPrototype:n,AsyncFunction:a,AsyncGenerator:i,AsyncGeneratorFunction:c,AsyncGeneratorPrototype:p,AsyncIteratorPrototype:s,Generator:y,GeneratorFunction:l,IteratorPrototype:u,MapIteratorPrototype:g,RegExpStringIteratorPrototype:f,SetIteratorPrototype:P,StringIteratorPrototype:b,ThrowTypeError:m,TypedArray:d}=t;o(r(m)===Function.prototype,\\"ThrowTypeError.__proto__ should be Function.prototype\\"),o(r(b)===u,\\"StringIteratorPrototype.__proto__ should be IteratorPrototype\\"),f&&o(r(f)===u,\\"RegExpStringIteratorPrototype.__proto__ should be IteratorPrototype\\"),o(r(d)===Function.prototype,\\"TypedArray.__proto__ should be Function.prototype\\"),o(r(g)===u,\\"MapIteratorPrototype.__proto__ should be IteratorPrototype\\"),o(r(P)===u,\\"SetIteratorPrototype.__proto__ should be IteratorPrototype\\"),o(r(u)===Object.prototype,\\"IteratorPrototype.__proto__ should be Object.prototype\\"),o(r(s)===Object.prototype,\\"AsyncIteratorPrototype.__proto__ should be Object.prototype\\"),o(r(n)===u,\\"AsyncIteratorPrototype.__proto__ should be IteratorPrototype\\"),o(r(l)===e,\\"GeneratorFunction.__proto__ should be Function\\"),o(\\"GeneratorFunction\\"===l.name,\'GeneratorFunction.name should be \\"GeneratorFunction\\"\'),o(r(y)===Function.prototype,\\"Generator.__proto__ should be Function.prototype\\"),o(r(c)===e,\\"AsyncGeneratorFunction.__proto__ should be Function\\"),o(\\"AsyncGeneratorFunction\\"===c.name,\'AsyncGeneratorFunction.name should be \\"AsyncGeneratorFunction\\"\'),o(r(i)===Function.prototype,\\"AsyncGenerator.__proto__ should be Function.prototype\\"),o(r(p)===s,\\"AsyncGeneratorPrototype.__proto__ should be AsyncIteratorPrototype\\"),o(r(a)===e,\\"AsyncFunction.__proto__ should be Function\\"),o(\\"AsyncFunction\\"===a.name,\'AsyncFunction.name should be \\"AsyncFunction\\"\')}(c);for(const o of i){if(y(c,o)){t[o]=c[o];continue}if(y(globalThis,o)){t[o]=p(globalThis,o);continue}if(o.endsWith(\\"Prototype\\")){const r=o.slice(0,-\\"Prototype\\".length);if(y(c,r)){const e=c[r];t[o]=e.prototype;continue}if(y(globalThis,r)){const e=p(globalThis,r);t[o]=e.prototype;continue}}}return function(t){Object.keys(t).forEach(o=>{if(void 0===t[o])throw new TypeError(`Malformed intrinsic: ${o}`)})}(t),t}const u={\\"**proto**\\":\\"FunctionPrototype\\",length:\\"number\\",name:\\"string\\"},g=u,f={get:g,set:\\"undefined\\"};function P(t){return{\\"**proto**\\":\\"Error\\",prototype:t,length:\\"number\\",name:\\"string\\"}}function b(t){return{\\"**proto**\\":\\"ErrorPrototype\\",constructor:t,message:\\"string\\",name:\\"string\\",toString:g}}function m(t){return{\\"**proto**\\":\\"TypedArray\\",length:\\"number\\",name:\\"string\\",BYTES_PER_ELEMENT:\\"number\\",prototype:t}}function d(t){return{\\"**proto**\\":\\"TypedArrayPrototype\\",BYTES_PER_ELEMENT:\\"number\\",constructor:t}}var h=function(t){return(typeof Symbol&&Symbol.matchAll||\\"@@matchAll\\")in new RegExp||delete t.RegExpStringIteratorPrototype,t}({\\"**proto**\\":null,ThrowTypeError:g,Infinity:\\"number\\",NaN:\\"number\\",undefined:\\"undefined\\",eval:g,isFinite:g,isNaN:g,parseFloat:g,parseInt:g,decodeURI:g,decodeURIComponent:g,encodeURI:g,encodeURIComponent:g,Object:{\\"**proto**\\":\\"FunctionPrototype\\",assign:g,create:g,defineProperties:g,defineProperty:g,entries:g,freeze:g,fromEntries:g,getOwnPropertyDescriptor:g,getOwnPropertyDescriptors:g,getOwnPropertyNames:g,getOwnPropertySymbols:g,getPrototypeOf:g,is:g,isExtensible:g,isFrozen:g,isSealed:g,keys:g,preventExtensions:g,prototype:\\"ObjectPrototype\\",seal:g,setPrototypeOf:g,values:g},ObjectPrototype:{\\"**proto**\\":null,constructor:\\"Object\\",hasOwnProperty:g,isPrototypeOf:g,propertyIsEnumerable:g,toLocaleString:g,toString:g,valueOf:g,__defineGetter__:g,__defineSetter__:g,__lookupGetter__:g,__lookupSetter__:g},Function:{\\"**proto**\\":\\"FunctionPrototype\\",length:\\"number\\",prototype:\\"FunctionPrototype\\"},FunctionPrototype:{length:\\"number\\",name:\\"string\\",apply:g,bind:g,call:g,constructor:\\"FunctionPrototypeConstructor\\",toString:g,\\"@@hasInstance\\":g},Boolean:{\\"**proto**\\":\\"FunctionPrototype\\",prototype:\\"BooleanPrototype\\"},BooleanPrototype:{constructor:\\"Boolean\\",toString:g,valueOf:g},Symbol:{\\"**proto**\\":\\"FunctionPrototype\\",asyncIterator:\\"symbol\\",for:g,hasInstance:\\"symbol\\",isConcatSpreadable:\\"symbol\\",iterator:\\"symbol\\",keyFor:g,match:\\"symbol\\",matchAll:\\"symbol\\",prototype:\\"SymbolPrototype\\",replace:\\"symbol\\",search:\\"symbol\\",species:\\"symbol\\",split:\\"symbol\\",toPrimitive:\\"symbol\\",toStringTag:\\"symbol\\",unscopables:\\"symbol\\"},SymbolPrototype:{constructor:\\"Symbol\\",description:f,toString:g,valueOf:g,\\"@@toPrimitive\\":g,\\"@@toStringTag\\":\\"string\\"},Error:{\\"**proto**\\":\\"FunctionPrototype\\",prototype:\\"ErrorPrototype\\",captureStackTrace:g,stackTraceLimit:\\"number\\"},ErrorPrototype:{constructor:\\"Error\\",message:\\"string\\",name:\\"string\\",toString:g},EvalError:P(\\"EvalErrorPrototype\\"),RangeError:P(\\"RangeErrorPrototype\\"),ReferenceError:P(\\"ReferenceErrorPrototype\\"),SyntaxError:P(\\"SyntaxErrorPrototype\\"),TypeError:P(\\"TypeErrorPrototype\\"),URIError:P(\\"URIErrorPrototype\\"),EvalErrorPrototype:b(\\"EvalError\\"),RangeErrorPrototype:b(\\"RangeError\\"),ReferenceErrorPrototype:b(\\"ReferenceError\\"),SyntaxErrorPrototype:b(\\"SyntaxError\\"),TypeErrorPrototype:b(\\"TypeError\\"),URIErrorPrototype:b(\\"URIError\\"),Number:{\\"**proto**\\":\\"FunctionPrototype\\",EPSILON:\\"number\\",isFinite:g,isInteger:g,isNaN:g,isSafeInteger:g,MAX_SAFE_INTEGER:\\"number\\",MAX_VALUE:\\"number\\",MIN_SAFE_INTEGER:\\"number\\",MIN_VALUE:\\"number\\",NaN:\\"number\\",NEGATIVE_INFINITY:\\"number\\",parseFloat:g,parseInt:g,POSITIVE_INFINITY:\\"number\\",prototype:\\"NumberPrototype\\"},NumberPrototype:{constructor:\\"Number\\",toExponential:g,toFixed:g,toLocaleString:g,toPrecision:g,toString:g,valueOf:g},BigInt:{\\"**proto**\\":\\"FunctionPrototype\\",asIntN:g,asUintN:g,prototype:\\"BigIntPrototype\\"},BigIntPrototype:{constructor:\\"BigInt\\",toLocaleString:g,toString:g,valueOf:g,\\"@@toStringTag\\":\\"string\\"},Math:{E:\\"number\\",LN10:\\"number\\",LN2:\\"number\\",LOG10E:\\"number\\",LOG2E:\\"number\\",PI:\\"number\\",SQRT1_2:\\"number\\",SQRT2:\\"number\\",\\"@@toStringTag\\":\\"string\\",abs:g,acos:g,acosh:g,asin:g,asinh:g,atan:g,atanh:g,atan2:g,cbrt:g,ceil:g,clz32:g,cos:g,cosh:g,exp:g,expm1:g,floor:g,fround:g,hypot:g,imul:g,log:g,log1p:g,log10:g,log2:g,max:g,min:g,pow:g,random:g,round:g,sign:g,sin:g,sinh:g,sqrt:g,tan:g,tanh:g,trunc:g},Date:{\\"**proto**\\":\\"FunctionPrototype\\",now:g,parse:g,prototype:\\"DatePrototype\\",UTC:g},DatePrototype:{constructor:\\"Date\\",getDate:g,getDay:g,getFullYear:g,getHours:g,getMilliseconds:g,getMinutes:g,getMonth:g,getSeconds:g,getTime:g,getTimezoneOffset:g,getUTCDate:g,getUTCDay:g,getUTCFullYear:g,getUTCHours:g,getUTCMilliseconds:g,getUTCMinutes:g,getUTCMonth:g,getUTCSeconds:g,setDate:g,setFullYear:g,setHours:g,setMilliseconds:g,setMinutes:g,setMonth:g,setSeconds:g,setTime:g,setUTCDate:g,setUTCFullYear:g,setUTCHours:g,setUTCMilliseconds:g,setUTCMinutes:g,setUTCMonth:g,setUTCSeconds:g,toDateString:g,toISOString:g,toJSON:g,toLocaleDateString:g,toLocaleString:g,toLocaleTimeString:g,toString:g,toTimeString:g,toUTCString:g,valueOf:g,\\"@@toPrimitive\\":g,getYear:g,setYear:g,toGMTString:g},String:{\\"**proto**\\":\\"FunctionPrototype\\",fromCharCode:g,fromCodePoint:g,prototype:\\"StringPrototype\\",raw:g},StringPrototype:{length:\\"number\\",charAt:g,charCodeAt:g,codePointAt:g,concat:g,constructor:\\"String\\",endsWith:g,includes:g,indexOf:g,lastIndexOf:g,localeCompare:g,match:g,matchAll:g,normalize:g,padEnd:g,padStart:g,repeat:g,replace:g,search:g,slice:g,split:g,startsWith:g,substring:g,toLocaleLowerCase:g,toLocaleUpperCase:g,toLowerCase:g,toString:g,toUpperCase:g,trim:g,trimEnd:g,trimStart:g,valueOf:g,\\"@@iterator\\":g,substr:g,anchor:g,big:g,blink:g,bold:g,fixed:g,fontcolor:g,fontsize:g,italics:g,link:g,small:g,strike:g,sub:g,sup:g,trimLeft:g,trimRight:g},StringIteratorPrototype:{\\"**proto**\\":\\"IteratorPrototype\\",next:g,\\"@@toStringTag\\":\\"string\\"},RegExp:{\\"**proto**\\":\\"FunctionPrototype\\",prototype:\\"RegExpPrototype\\",\\"@@species\\":f},RegExpPrototype:{constructor:\\"RegExp\\",exec:g,dotAll:f,flags:f,global:f,ignoreCase:f,\\"@@match\\":g,\\"@@matchAll\\":g,multiline:f,\\"@@replace\\":g,\\"@@search\\":g,source:f,\\"@@split\\":g,sticky:f,test:g,toString:g,unicode:f,compile:!1},RegExpStringIteratorPrototype:{\\"**proto**\\":\\"IteratorPrototype\\",next:g,\\"@@toStringTag\\":\\"string\\"},Array:{\\"**proto**\\":\\"FunctionPrototype\\",from:g,isArray:g,of:g,prototype:\\"ArrayPrototype\\",\\"@@species\\":f},ArrayPrototype:{length:\\"number\\",concat:g,constructor:\\"Array\\",copyWithin:g,entries:g,every:g,fill:g,filter:g,find:g,findIndex:g,flat:g,flatMap:g,forEach:g,includes:g,indexOf:g,join:g,keys:g,lastIndexOf:g,map:g,pop:g,push:g,reduce:g,reduceRight:g,reverse:g,shift:g,slice:g,some:g,sort:g,splice:g,toLocaleString:g,toString:g,unshift:g,values:g,\\"@@iterator\\":g,\\"@@unscopables\\":{\\"**proto**\\":null,copyWithin:\\"boolean\\",entries:\\"boolean\\",fill:\\"boolean\\",find:\\"boolean\\",findIndex:\\"boolean\\",flat:\\"boolean\\",flatMap:\\"boolean\\",includes:\\"boolean\\",keys:\\"boolean\\",values:\\"boolean\\"}},ArrayIteratorPrototype:{\\"**proto**\\":\\"IteratorPrototype\\",next:g,\\"@@toStringTag\\":\\"string\\"},TypedArray:{\\"**proto**\\":\\"FunctionPrototype\\",from:g,of:g,prototype:\\"TypedArrayPrototype\\",\\"@@species\\":f},TypedArrayPrototype:{buffer:f,byteLength:f,byteOffset:f,constructor:\\"TypedArray\\",copyWithin:g,entries:g,every:g,fill:g,filter:g,find:g,findIndex:g,forEach:g,includes:g,indexOf:g,join:g,keys:g,lastIndexOf:g,length:f,map:g,reduce:g,reduceRight:g,reverse:g,set:g,slice:g,some:g,sort:g,subarray:g,toLocaleString:g,toString:g,values:g,\\"@@iterator\\":g,\\"@@toStringTag\\":f},BigInt64Array:m(\\"BigInt64ArrayPrototype\\"),BigUint64Array:m(\\"BigUint64ArrayPrototype\\"),Float32Array:m(\\"Float32ArrayPrototype\\"),Float64Array:m(\\"Float64ArrayPrototype\\"),Int16Array:m(\\"Int16ArrayPrototype\\"),Int32Array:m(\\"Int32ArrayPrototype\\"),Int8Array:m(\\"Int8ArrayPrototype\\"),Uint16Array:m(\\"Uint16ArrayPrototype\\"),Uint32Array:m(\\"Uint32ArrayPrototype\\"),Uint8Array:m(\\"Uint8ArrayPrototype\\"),Uint8ClampedArray:m(\\"Uint8ClampedArrayPrototype\\"),BigInt64ArrayPrototype:d(\\"BigInt64Array\\"),BigUint64ArrayPrototype:d(\\"BigUint64Array\\"),Float32ArrayPrototype:d(\\"Float32Array\\"),Float64ArrayPrototype:d(\\"Float64Array\\"),Int16ArrayPrototype:d(\\"Int16Array\\"),Int32ArrayPrototype:d(\\"Int32Array\\"),Int8ArrayPrototype:d(\\"Int8Array\\"),Uint16ArrayPrototype:d(\\"Uint16Array\\"),Uint32ArrayPrototype:d(\\"Uint32Array\\"),Uint8ArrayPrototype:d(\\"Uint8Array\\"),Uint8ClampedArrayPrototype:d(\\"Uint8ClampedArray\\"),Map:{\\"**proto**\\":\\"FunctionPrototype\\",\\"@@species\\":f,prototype:\\"MapPrototype\\"},MapPrototype:{clear:g,constructor:\\"Map\\",delete:g,entries:g,forEach:g,get:g,has:g,keys:g,set:g,size:f,values:g,\\"@@iterator\\":g,\\"@@toStringTag\\":\\"string\\"},MapIteratorPrototype:{\\"**proto**\\":\\"IteratorPrototype\\",next:g,\\"@@toStringTag\\":\\"string\\"},Set:{\\"**proto**\\":\\"FunctionPrototype\\",prototype:\\"SetPrototype\\",\\"@@species\\":f},SetPrototype:{add:g,clear:g,constructor:\\"Set\\",delete:g,entries:g,forEach:g,has:g,keys:g,size:f,values:g,\\"@@iterator\\":g,\\"@@toStringTag\\":\\"string\\"},SetIteratorPrototype:{\\"**proto**\\":\\"IteratorPrototype\\",next:g,\\"@@toStringTag\\":\\"string\\"},WeakMap:{\\"**proto**\\":\\"FunctionPrototype\\",prototype:\\"WeakMapPrototype\\"},WeakMapPrototype:{constructor:\\"WeakMap\\",delete:g,get:g,has:g,set:g,\\"@@toStringTag\\":\\"string\\"},WeakSet:{\\"**proto**\\":\\"FunctionPrototype\\",prototype:\\"WeakSetPrototype\\"},WeakSetPrototype:{add:g,constructor:\\"WeakSet\\",delete:g,has:g,\\"@@toStringTag\\":\\"string\\"},ArrayBuffer:{\\"**proto**\\":\\"FunctionPrototype\\",isView:g,prototype:\\"ArrayBufferPrototype\\",\\"@@species\\":f},ArrayBufferPrototype:{byteLength:f,constructor:\\"ArrayBuffer\\",slice:g,\\"@@toStringTag\\":\\"string\\"},SharedArrayBuffer:!1,DataView:{\\"**proto**\\":\\"FunctionPrototype\\",prototype:\\"DataViewPrototype\\"},DataViewPrototype:{buffer:f,byteLength:f,byteOffset:f,constructor:\\"DataView\\",getBigInt64:g,getBigUint64:g,getFloat32:g,getFloat64:g,getInt8:g,getInt16:g,getInt32:g,getUint8:g,getUint16:g,getUint32:g,setBigInt64:g,setBigUint64:g,setFloat32:g,setFloat64:g,setInt8:g,setInt16:g,setInt32:g,setUint8:g,setUint16:g,setUint32:g,\\"@@toStringTag\\":\\"string\\"},Atomics:!1,JSON:{parse:g,stringify:g,\\"@@toStringTag\\":\\"string\\"},IteratorPrototype:{\\"@@iterator\\":g},AsyncIteratorPrototype:{\\"@@asyncIterator\\":g},GeneratorFunction:{\\"**proto**\\":\\"FunctionPrototypeConstructor\\",name:\\"string\\",length:\\"number\\",prototype:\\"Generator\\"},Generator:{\\"**proto**\\":\\"FunctionPrototype\\",constructor:\\"GeneratorFunction\\",prototype:\\"GeneratorPrototype\\"},AsyncGeneratorFunction:{\\"**proto**\\":\\"FunctionPrototypeConstructor\\",name:\\"string\\",length:\\"number\\",prototype:\\"AsyncGenerator\\"},AsyncGenerator:{\\"**proto**\\":\\"FunctionPrototype\\",constructor:\\"AsyncGeneratorFunction\\",prototype:\\"AsyncGeneratorPrototype\\",\\"@@toStringTag\\":\\"string\\"},GeneratorPrototype:{\\"**proto**\\":\\"IteratorPrototype\\",constructor:\\"Generator\\",next:g,return:g,throw:g,\\"@@toStringTag\\":\\"string\\"},AsyncGeneratorPrototype:{\\"**proto**\\":\\"AsyncIteratorPrototype\\",constructor:\\"AsyncGenerator\\",next:g,return:g,throw:g,\\"@@toStringTag\\":\\"string\\"},Promise:{\\"**proto**\\":\\"FunctionPrototype\\",all:g,allSettled:g,prototype:\\"PromisePrototype\\",race:g,reject:g,resolve:g,\\"@@species\\":f},PromisePrototype:{catch:g,constructor:\\"Promise\\",finally:g,then:g,\\"@@toStringTag\\":\\"string\\"},AsyncFunction:{\\"**proto**\\":\\"FunctionPrototypeConstructor\\",name:\\"string\\",length:\\"number\\",prototype:\\"AsyncFunctionPrototype\\"},AsyncFunctionPrototype:{\\"**proto**\\":\\"FunctionPrototype\\",constructor:\\"AsyncFunction\\",\\"@@toStringTag\\":\\"string\\"},Reflect:{apply:g,construct:g,defineProperty:g,deleteProperty:g,get:g,getOwnPropertyDescriptor:g,getPrototypeOf:g,has:g,isExtensible:g,ownKeys:g,preventExtensions:g,set:g,setPrototypeOf:g},Proxy:{\\"**proto**\\":\\"FunctionPrototype\\",revocable:g},escape:g,unescape:g,FunctionPrototypeConstructor:{\\"**proto**\\":\\"FunctionPrototype\\",length:\\"number\\",prototype:\\"FunctionPrototype\\"},Compartment:{\\"**proto**\\":\\"FunctionPrototype\\",prototype:\\"CompartmentPrototype\\"},CompartmentPrototype:{constructor:\\"Compartment\\",evaluate:g,global:f},harden:g});const{getPrototypeOf:A,getOwnPropertyDescriptor:E}=Object,{apply:S,ownKeys:_}=Reflect,w=(t=>(o,...r)=>S(t,o,r))(Object.prototype.hasOwnProperty);function I(t,o){if(\\"string\\"==typeof o)return o;if(\\"symbol\\"==typeof o)return`@@${o.toString().slice(14,-1)}`;throw new TypeError(`Unexpected property name type ${t} ${o}`)}function F(t){const o=[\\"undefined\\",\\"boolean\\",\\"number\\",\\"string\\",\\"symbol\\"];function r(r,e,n,i){if(\\"object\\"==typeof i)return a(r,e,i),!0;if(!1===i)return!1;if(\\"string\\"==typeof i)if(\\"prototype\\"===n||\\"constructor\\"===n){if(w(t,i))return e===t[i]}else if(o.includes(i))return typeof e===i;throw new TypeError(`Unexpected whitelist permit ${r}`)}function e(t,o,e,n){const a=E(o,e);return w(a,\\"value\\")?r(t,a.value,e,n):r(`${t}<get>`,a.get,e,n.get)&&r(`${t}<set>`,a.set,e,n.set)}function n(t,o){return w(t,o)?t[o]:\\"FunctionPrototype\\"===t[\\"**proto**\\"]&&w(u,o)?u[o]:void 0}function a(o,r,a){!function(o,r,e){const n=A(r);if(null!==n||null!==e){if(void 0!==e&&\\"string\\"!=typeof e)throw new TypeError(`Malformed whitelist permit ${o}.__proto__`);if(n!==t[e||\\"ObjectPrototype\\"])throw new Error(`Unexpected intrinsic ${o}.__proto__`)}}(o,r,a[\\"**proto**\\"]);for(const t of _(r)){if(\\"__proto__\\"===t)continue;const i=I(o,t),c=`${o}.${i}`,p=n(a,i);if(!p||!e(c,r,t,p))try{delete r[t]}catch(t){}}}a(\\"intrinsics\\",t,h)}const{defineProperties:T,getOwnPropertyDescriptors:v}=Object;const{getOwnPropertyDescriptor:O}=Object;const{defineProperties:U,getOwnPropertyDescriptors:x,getOwnPropertyDescriptor:R}=Object;const C=!0;var M={ObjectPrototype:\\"*\\",ArrayPrototype:\\"*\\",FunctionPrototype:{constructor:C,bind:C,name:C,toString:C},ErrorPrototype:{constructor:C,message:C,name:C},PromisePrototype:{constructor:C},TypedArrayPrototype:\\"*\\",Generator:{constructor:C,name:C,toString:C},IteratorPrototype:\\"*\\"};const{defineProperties:j,getOwnPropertyNames:G,getOwnPropertyDescriptor:k,getOwnPropertyDescriptors:N}=Object,{ownKeys:$}=Reflect;function D(t){return null!==t&&\\"object\\"==typeof t}const{assign:B,freeze:L,defineProperties:W,getOwnPropertyDescriptor:V,getOwnPropertyNames:z,getPrototypeOf:Y,setPrototypeOf:J,prototype:H}=Object,{apply:K,get:Q,set:X}=Reflect,{isArray:q,prototype:Z}=Array,{revocable:tt}=Proxy,{prototype:ot}=RegExp,{prototype:rt}=String,{prototype:et}=WeakMap,nt=t=>(o,...r)=>K(t,o,r),at=nt(H.hasOwnProperty),it=(nt(Z.filter),nt(Z.join)),ct=(nt(Z.push),nt(Z.pop)),pt=nt(Z.includes),st=nt(ot.test),yt=(nt(rt.match),nt(rt.search)),lt=nt(rt.slice),ut=nt(rt.split),gt=(nt(et.get),nt(et.set),nt(et.has),t=>Q(Y(t),\\"constructor\\")),ft=L({__proto__:null});function Pt(t,o){const r=`please report internal shim error: ${t}`;throw console.error(r),o&&(console.error(`${o}`),console.error(`${o.stack}`)),TypeError(r)}function bt(t,o){t||Pt(o)}const mt=[\\"await\\",\\"break\\",\\"case\\",\\"catch\\",\\"class\\",\\"const\\",\\"continue\\",\\"debugger\\",\\"default\\",\\"delete\\",\\"do\\",\\"else\\",\\"export\\",\\"extends\\",\\"finally\\",\\"for\\",\\"function\\",\\"if\\",\\"import\\",\\"in\\",\\"instanceof\\",\\"new\\",\\"return\\",\\"super\\",\\"switch\\",\\"this\\",\\"throw\\",\\"try\\",\\"typeof\\",\\"var\\",\\"void\\",\\"while\\",\\"with\\",\\"yield\\",\\"let\\",\\"static\\",\\"enum\\",\\"implements\\",\\"package\\",\\"protected\\",\\"interface\\",\\"private\\",\\"public\\",\\"await\\",\\"null\\",\\"true\\",\\"false\\",\\"this\\",\\"arguments\\"],dt=new RegExp(\\"^[a-zA-Z_$][\\\\\\\\w$]*$\\");function ht(t){return\\"eval\\"!==t&&!pt(mt,t)&&st(dt,t)}function At(t,o){const r=V(t,o);return(!1===r.configurable&&!1===r.writable&&at(r,\\"value\\"))}const Et=new Proxy(ft,{get(t,o){Pt(`unexpected scope handler trap called: ${String(o)}`)}});function St(t,o){const r=yt(t,o);return r<0?-1:ut(lt(t,0,r),\\"\\\\n\\").length}const _t=new RegExp(\\"(?:\\\\x3c!--|--\\\\x3e)\\");const wt=new RegExp(\\"\\\\\\\\bimport\\\\\\\\s*(?:\\\\\\\\(|/[/*])\\");const It=new RegExp(\\"\\\\\\\\beval\\\\\\\\s*(?:\\\\\\\\(|/[/*])\\");const Ft={rewrite:t=>(function(t){const o=St(t,_t);if(o<0)return t;throw new SyntaxError(`possible html comment syntax rejected around line ${o}`)}(t.src),function(t){const o=St(t,wt);if(o<0)return t;throw new SyntaxError(`possible import expression rejected around line ${o}`)}(t.src),function(t){const o=St(t,It);if(o<0)return t;throw new SyntaxError(`possible direct eval expression rejected around line ${o}`)}(t.src),t)};function Tt(t,o=[]){const r=function(t){return 0===t.length?\\"\\":`const {${it(t,\\",\\")}} = this;`}(o);return t.intrinsics.Function(`\\\\n    with (this) {\\\\n      ${r}\\\\n      return function() {\\\\n        \'use strict\';\\\\n        return eval(arguments[0]);\\\\n      };\\\\n    }\\\\n  `)}function vt(t,o,r,e={},{localTransforms:n=[],globalTransforms:a=[],sloppyGlobalsMode:i=!1}={}){let c={src:o,endowments:e};c=function(t,o){for(const r of o)\\"function\\"==typeof r.rewrite&&(t=r.rewrite(t));return t}(c,[...n,...a,Ft]);const p=function(t,o,r={},{sloppyGlobalsMode:e=!1}={}){return{__proto__:Et,useUnsafeEvaluator:!1,get(e,n){if(\\"symbol\\"!=typeof n)return\\"eval\\"===n&&!0===this.useUnsafeEvaluator?(this.useUnsafeEvaluator=!1,t.intrinsics.eval):n in r?Q(r,n,o):Q(o,n)},set(t,e,n){if(e in r){return\\"value\\"in V(r,e)?X(r,e,n):X(r,e,n,o)}return X(o,e,n)},has:(t,n)=>!!(e||\\"eval\\"===n||n in r||n in o||n in globalThis),getPrototypeOf:()=>null}}(t,r,c.endowments,{sloppyGlobalsMode:i}),s=tt(ft,p),y=Tt(t,function(t,o={}){const r=z(t),e=z(o),n=e.filter(t=>ht(t)&&At(o,t));return[...r.filter(o=>!e.includes(o)&&ht(o)&&At(t,o)),...n]}(r,c.endowments)),l=K(y,s.proxy,[]);let u;p.useUnsafeEvaluator=!0;try{return K(l,r,[c.src])}catch(t){throw u=t,t}finally{!0===p.useUnsafeEvaluator&&(Pt(\\"handler did not revoke useUnsafeEvaluator\\",u),s.revoke())}}const Ot=(t,o,r={})=>{const e=e=>\\"string\\"!=typeof e?e:vt(t,e,o,{},r);return W(e,{toString:{value:()=>\\"function eval() { [native code] }\\",writable:!1,enumerable:!1,configurable:!0}}),bt(gt(e)!==Function,\\"eval constructor is Function\\"),bt(gt(e)!==t.intrinsics.Function,\\"eval contructions is %Function%\\"),e};function Ut(t,o,r={}){const e=function(e){const n=`${ct(arguments)||\\"\\"}`,a=`${it(arguments,\\",\\")}`;new t.intrinsics.Function(a,n);const i=`(function anonymous(${a}\\\\n) {\\\\n${n}\\\\n})`;return vt(t,i,o,{},r)};return W(e,{prototype:{value:t.intrinsics.Function.prototype,writable:!1,enumerable:!1,configurable:!1},toString:{value:()=>\\"function Function() { [native code] }\\",writable:!1,enumerable:!1,configurable:!0}}),bt(Y(Function)===Function.prototype),bt(Y(e)===Function.prototype),bt(gt(e)!==Function),bt(gt(e)!==t.intrinsics.Function),e}const xt=[\\"eval\\",\\"isFinite\\",\\"isNaN\\",\\"parseFloat\\",\\"parseInt\\",\\"decodeURI\\",\\"decodeURIComponent\\",\\"encodeURI\\",\\"encodeURIComponent\\",\\"Array\\",\\"ArrayBuffer\\",\\"Boolean\\",\\"DataView\\",\\"Date\\",\\"Error\\",\\"EvalError\\",\\"Float32Array\\",\\"Float64Array\\",\\"Function\\",\\"Int8Array\\",\\"Int16Array\\",\\"Int32Array\\",\\"Map\\",\\"Number\\",\\"Object\\",\\"Promise\\",\\"Proxy\\",\\"RangeError\\",\\"ReferenceError\\",\\"RegExp\\",\\"Set\\",\\"String\\",\\"Symbol\\",\\"SyntaxError\\",\\"TypeError\\",\\"Uint8Array\\",\\"Uint8ClampedArray\\",\\"Uint16Array\\",\\"Uint32Array\\",\\"URIError\\",\\"WeakMap\\",\\"WeakSet\\",\\"JSON\\",\\"Math\\",\\"Reflect\\",\\"escape\\",\\"unescape\\",\\"globalThis\\",\\"Compartment\\",\\"harden\\"];const{getOwnPropertyDescriptor:Rt}=Object,Ct=[\\"eval\\",\\"isFinite\\",\\"isNaN\\",\\"parseFloat\\",\\"parseInt\\",\\"decodeURI\\",\\"decodeURIComponent\\",\\"encodeURI\\",\\"encodeURIComponent\\",\\"Array\\",\\"ArrayBuffer\\",\\"Boolean\\",\\"DataView\\",\\"Date\\",\\"Error\\",\\"EvalError\\",\\"Float32Array\\",\\"Float64Array\\",\\"Function\\",\\"Int8Array\\",\\"Int16Array\\",\\"Int32Array\\",\\"Map\\",\\"Number\\",\\"Object\\",\\"Promise\\",\\"Proxy\\",\\"RangeError\\",\\"ReferenceError\\",\\"RegExp\\",\\"Set\\",\\"String\\",\\"Symbol\\",\\"SyntaxError\\",\\"TypeError\\",\\"Uint8Array\\",\\"Uint8ClampedArray\\",\\"Uint16Array\\",\\"Uint32Array\\",\\"URIError\\",\\"WeakMap\\",\\"WeakSet\\",\\"JSON\\",\\"Math\\",\\"Reflect\\",\\"escape\\",\\"unescape\\",\\"globalThis\\",\\"Compartment\\",\\"harden\\"];let Mt;function jt(){if(Mt)return Mt;const t=function(){const t={__proto__:null};for(const o of Ct){const r=Rt(globalThis,o);if(r){if(\\"get\\"in r||\\"set\\"in r)throw new TypeError(`Unexpected accessor on global property: ${o}`);t[o]=r.value}}return t}();return Mt={__proto__:null,intrinsics:t},L(Mt)}const Gt=new WeakMap;class kt{constructor(t,o,r={}){const{transforms:e=[]}=r,n=[...e],a=function(t,{globalTransforms:o}){const r={},e={Infinity:{value:1/0,enumerable:!1},NaN:{value:NaN,enumerable:!1},undefined:{value:void 0,enumerable:!1}};for(const n of xt){if(!at(t.intrinsics,n))continue;let a;switch(n){case\\"eval\\":a=Ot(t,r,{globalTransforms:o});break;case\\"Function\\":a=Ut(t,r,{globalTransforms:o});break;case\\"globalThis\\":a=r;break;default:a=t.intrinsics[n]}e[n]={value:a,configurable:!0,writable:!0,enumerable:!1}}return W(r,e),bt(r.eval!==t.intrinsics.eval,\\"eval on global object\\"),bt(r.Function!==t.intrinsics.Function,\\"Function on global object\\"),r}(jt(),{globalTransforms:n});B(a,t),Gt.set(this,{globalTransforms:n,globalObject:a})}get global(){return Gt.get(this).globalObject}evaluate(t,o={}){if(\\"string\\"!=typeof t)throw new TypeError(\\"first argument of evaluate() must be a string\\");const{endowments:r={},transforms:e=[],sloppyGlobalsMode:n=!1}=o,a=[...e],{globalTransforms:i,globalObject:c}=Gt.get(this);return vt(jt(),t,c,r,{globalTransforms:i,localTransforms:a,sloppyGlobalsMode:n})}toString(){return\\"[object Compartment]\\"}static toString(){return\\"function Compartment() { [shim code] }\\"}}let Nt;function $t(t,o){if(!t)throw new TypeError(o)}\\"object\\"!=typeof globalThis&&(Object.prototype.__defineGetter__(\\"__magic__\\",(function(){return this})),__magic__.globalThis=__magic__,delete Object.prototype.__magic__),t.lockdown=function(t={}){const{noTameDate:o=!1,noTameError:r=!1,noTameMath:e=!1,noTameRegExp:n=!1,registerOnly:a=!1,...i}=t,c=Object.keys(i);$t(0===c.length,`lockdown(): non supported option ${c.join(\\", \\")}`);const p={noTameDate:o,noTameError:r,noTameMath:e,noTameRegExp:n,registerOnly:a};if(Nt)return Object.keys(p).forEach(t=>{$t(p[t]===Nt[t],`lockdown(): cannot re-invoke with different option ${t}`)}),!1;Nt=p,function(){try{(0,Function.prototype.constructor)(\\"return 1\\")}catch(t){return}const{defineProperties:t,getPrototypeOf:o,setPrototypeOf:r}=Object;function e(e,n){let a;try{a=(0,eval)(n)}catch(t){if(t instanceof SyntaxError)return;throw t}const i=o(a),c=function(){throw new TypeError(\\"Not available\\")};t(c,{name:{value:e,writable:!1,enumerable:!1,configurable:!0},toString:{value:()=>`function ${e}() { [native code] }`,writable:!1,enumerable:!1,configurable:!0}}),t(i,{constructor:{value:c}}),t(c,{prototype:{value:i}}),c!==Function.prototype.constructor&&r(c,Function.prototype.constructor)}e(\\"Function\\",\\"(function(){})\\"),e(\\"GeneratorFunction\\",\\"(function*(){})\\"),e(\\"AsyncFunction\\",\\"(async function(){})\\"),e(\\"AsyncGeneratorFunction\\",\\"(async function*(){})\\")}(),o||function(){const t={now:()=>NaN};Date.now=t.now;const o={toLocaleString:()=>NaN};Date.prototype.toLocaleString=o.toLocaleString;const r=Date,e=function(){return void 0===new.target?\\"Invalid Date\\":arguments.length>0?Reflect.construct(r,arguments,new.target):Reflect.construct(r,[NaN],new.target)},n=v(r);T(e,n);const a=v(r.prototype);a.constructor.value=e,T(e.prototype,a),globalThis.Date=e;const i={toLocaleString(){throw new TypeError(\\"Object.prototype.toLocaleString is disabled\\")}};Object.prototype.toLocaleString=i.toLocaleString}(),r||function(){if(delete Error.captureStackTrace,O(Error,\\"captureStackTrace\\"))throw Error(\\"Cannot remove Error.captureStackTrace\\");if(delete Error.stackTraceLimit,O(Error,\\"stackTraceLimit\\"))throw Error(\\"Cannot remove Error.stackTraceLimit\\")}(),e||function(){const t={random(){throw TypeError(\\"Math.random() is disabled\\")}};Math.random=t.random}(),n||function(){delete RegExp.prototype.compile;const t=RegExp,o=function(){return Reflect.construct(t,arguments,new.target)},r=R(t,Symbol.species);U(o,Symbol.species,r);const e=x(t.prototype);e.constructor.value=o,U(o.prototype,e),globalThis.RegExp=o}();const s=function(t,o={}){const{freeze:r,getOwnPropertyDescriptors:e,getPrototypeOf:n}=Object,{ownKeys:a}=Reflect;let{fringeSet:i}=o;if(i){if(\\"function\\"!=typeof i.add||\\"function\\"!=typeof i.has)throw new TypeError(\\"options.fringeSet must have add() and has() methods\\");if(t)for(const o of t)i.add(o)}else i=new WeakSet(t);const c=o&&o.naivePrepareObject,{harden:p}={harden(t){const o=new Set,p=new Map,s=new WeakMap;function y(t,r){if(Object(t)!==t)return;const e=typeof t;if(\\"object\\"!==e&&\\"function\\"!==e)throw new TypeError(`Unexpected typeof: ${e}`);i.has(t)||o.has(t)||(o.add(t),s.set(t,r))}function l(t){c&&c(t),r(t);const o=n(t),i=e(t),l=s.get(t)||\\"unknown\\";null===o||p.has(o)||(p.set(o,l),s.set(o,`${l}.__proto__`)),a(i).forEach(t=>{const o=`${l}.${String(t)}`,r=i[t];\\"value\\"in r?y(r.value,`${o}`):(y(r.get,`${o}(get)`),y(r.set,`${o}(set)`))})}return y(t),o.forEach(l),p.forEach((t,r)=>{if(!o.has(r)&&!i.has(r)){let o;try{o=`prototype ${r} of ${t} is not already in the fringeSet`}catch(e){o=\\"a prototype of something is not already in the fringeset (and .toString failed)\\";try{console.log(o),console.log(\\"the prototype:\\",r),console.log(\\"of something:\\",t)}catch(t){}}throw new TypeError(o)}}),o.forEach(i.add,i),t}};return p}();Object.defineProperties(globalThis,{harden:{value:s,configurable:!0,writable:!0,enumerable:!1},Compartment:{value:kt,configurable:!0,writable:!0,enumerable:!1}});const y=l();F(y),function(){try{(0,Object.prototype.__lookupGetter__)(\\"x\\")}catch(t){return}const{defineProperty:t,defineProperties:o,getOwnPropertyDescriptor:r,getPrototypeOf:e,prototype:n}=Object;function a(t){if(null==t)throw new TypeError(\\"can\'t convert undefined or null to object\\");return Object(t)}function i(t){return\\"symbol\\"==typeof t?t:`${t}`}function c(t,o){if(\\"function\\"!=typeof t)throw TypeError(`invalid ${o} usage`);return t}o(n,{__defineGetter__:{value:function(o,r){const e=a(this);t(e,o,{get:c(r,\\"getter\\"),enumerable:!0,configurable:!0})}},__defineSetter__:{value:function(o,r){const e=a(this);t(e,o,{set:c(r,\\"setter\\"),enumerable:!0,configurable:!0})}},__lookupGetter__:{value:function(t){let o,n=a(this);for(t=i(t);n&&!(o=r(n,t));)n=e(n);return o&&o.get}},__lookupSetter__:{value:function(t){let o,n=a(this);for(t=i(t);n&&!(o=r(n,t));)n=e(n);return o&&o.set}}})}();const u=function(t){const o={};function r(t,r,e,n){if(\\"value\\"in n&&n.configurable){const{value:a}=n;o[t]=a,j(r,{[e]:{get:function(){return a},set:function(o){if(r===this)throw new TypeError(`Cannot assign to read only property \'${e}\' of \'${t}\'`);hasOwnProperty.call(this,e)?this[e]=o:j(this,{[e]:{value:o,writable:!0,enumerable:n.enumerable,configurable:n.configurable}})},enumerable:n.enumerable,configurable:n.configurable}})}}function e(t,o,e){const n=k(o,e);n&&r(t,o,e,n)}function n(t,o){const e=N(o);e&&$(e).forEach(n=>r(t,o,n,e[n]))}return function t(o,r,a){for(const i of G(a)){const c=k(r,i);if(!c||c.get||c.set)continue;const p=`${o}.${i}`,s=a[i];if(!0===s)e(p,r,i);else if(\\"*\\"===s)n(p,c.value);else{if(!D(s))throw new TypeError(`Unexpected override enablement plan ${p}`);t(p,c.value,s)}}}(\\"root\\",t,M),o}(y);return s(y,a),s(u,a),!0},Object.defineProperty(t,\\"__esModule\\",{value:!0})}));\\n"')
    }, function(t, e) {
        t.exports = {
            makeDeterministic: function(t) {
                const e = (t, e) => {
                        if (t === e) return 0;
                        if (void 0 === t) return 1;
                        if (void 0 === e) return -1;
                        const n = null === t ? "null" : t.toString(),
                            r = null === e ? "null" : e.toString();
                        return n < r ? -1 : n > r ? 1 : 0
                    },
                    n = Array.prototype.sort;
                Array.prototype.sort = function(t = e) {
                    const r = new Map;
                    return this.forEach(((t, e) => r.set(t, e))), n.call(this, ((e, n) => {
                        const o = t(e, n);
                        return 0 !== o ? o : r.get(e) - r.get(n)
                    }))
                }, delete String.prototype.localeCompare;
                const r = Object.keys;
                Object.keys = function(t) {
                    const e = r(t),
                        n = Object.getOwnPropertyNames(t);
                    return e.sort(((t, e) => n.indexOf(t) - n.indexOf(e)))
                }, Object.values = function(t) {
                    return Object.keys(t).map((e => t[e]))
                }, Object.entries = function(t) {
                    return Object.keys(t).map((e => [e, t[e]]))
                }, JSON.stringify = t();
                const o = Function.prototype.toString;
                Function.prototype.toString = function t() {
                    if (this === Array.prototype.sort) return "function sort() { [native code ] }";
                    if (this === Object.keys) return "function keys() { [native code ] }";
                    if (this === Object.values) return "function values() { [native code ] }";
                    if (this === Object.entries) return "function entries() { [native code ] }";
                    if (this === JSON.stringify) return "function stringify() { [native code ] }";
                    if (this === t) return "function toString() { [native code ] }";
                    const e = o.call(this),
                        n = e.match(/^([a-zA-Z0-9_$]+)\s*\(/);
                    return n && "function" !== n[1] ? `function ${e}` : e
                }
            },
            nonDeterministicIntrinsics: ["Date", "Math", "eval", "XMLHttpRequest", "FileReader", "WebSocket", "setTimeout", "setInterval"]
        }
    }, function(t, e, n) {
        "use strict";
        e.byteLength = function(t) {
            var e = u(t),
                n = e[0],
                r = e[1];
            return 3 * (n + r) / 4 - r
        }, e.toByteArray = function(t) {
            var e, n, r = u(t),
                s = r[0],
                c = r[1],
                a = new i(function(t, e, n) {
                    return 3 * (e + n) / 4 - n
                }(0, s, c)),
                h = 0,
                f = c > 0 ? s - 4 : s;
            for (n = 0; n < f; n += 4) e = o[t.charCodeAt(n)] << 18 | o[t.charCodeAt(n + 1)] << 12 | o[t.charCodeAt(n + 2)] << 6 | o[t.charCodeAt(n + 3)], a[h++] = e >> 16 & 255, a[h++] = e >> 8 & 255, a[h++] = 255 & e;
            2 === c && (e = o[t.charCodeAt(n)] << 2 | o[t.charCodeAt(n + 1)] >> 4, a[h++] = 255 & e);
            1 === c && (e = o[t.charCodeAt(n)] << 10 | o[t.charCodeAt(n + 1)] << 4 | o[t.charCodeAt(n + 2)] >> 2, a[h++] = e >> 8 & 255, a[h++] = 255 & e);
            return a
        }, e.fromByteArray = function(t) {
            for (var e, n = t.length, o = n % 3, i = [], s = 16383, c = 0, a = n - o; c < a; c += s) i.push(h(t, c, c + s > a ? a : c + s));
            1 === o ? (e = t[n - 1], i.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === o && (e = (t[n - 2] << 8) + t[n - 1], i.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="));
            return i.join("")
        };
        for (var r = [], o = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = 0, a = s.length; c < a; ++c) r[c] = s[c], o[s.charCodeAt(c)] = c;

        function u(t) {
            var e = t.length;
            if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var n = t.indexOf("=");
            return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4]
        }

        function h(t, e, n) {
            for (var o, i, s = [], c = e; c < n; c += 3) o = (t[c] << 16 & 16711680) + (t[c + 1] << 8 & 65280) + (255 & t[c + 2]), s.push(r[(i = o) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
            return s.join("")
        }
        o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63
    }, function(t, e) {
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
        e.read = function(t, e, n, r, o) {
            var i, s, c = 8 * o - r - 1,
                a = (1 << c) - 1,
                u = a >> 1,
                h = -7,
                f = n ? o - 1 : 0,
                l = n ? -1 : 1,
                p = t[e + f];
            for (f += l, i = p & (1 << -h) - 1, p >>= -h, h += c; h > 0; i = 256 * i + t[e + f], f += l, h -= 8);
            for (s = i & (1 << -h) - 1, i >>= -h, h += r; h > 0; s = 256 * s + t[e + f], f += l, h -= 8);
            if (0 === i) i = 1 - u;
            else {
                if (i === a) return s ? NaN : 1 / 0 * (p ? -1 : 1);
                s += Math.pow(2, r), i -= u
            }
            return (p ? -1 : 1) * s * Math.pow(2, i - r)
        }, e.write = function(t, e, n, r, o, i) {
            var s, c, a, u = 8 * i - o - 1,
                h = (1 << u) - 1,
                f = h >> 1,
                l = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                p = r ? 0 : i - 1,
                d = r ? 1 : -1,
                w = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (c = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), (e += s + f >= 1 ? l / a : l * Math.pow(2, 1 - f)) * a >= 2 && (s++, a /= 2), s + f >= h ? (c = 0, s = h) : s + f >= 1 ? (c = (e * a - 1) * Math.pow(2, o), s += f) : (c = e * Math.pow(2, f - 1) * Math.pow(2, o), s = 0)); o >= 8; t[n + p] = 255 & c, p += d, c /= 256, o -= 8);
            for (s = s << o | c, u += o; u > 0; t[n + p] = 255 & s, p += d, s /= 256, u -= 8);
            t[n + p - d] |= 128 * w
        }
    }, function(t, e) {
        var n = {}.toString;
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == n.call(t)
        }
    }, function(t, e, n) {
        const r = n(2),
            o = n(24),
            i = n(8),
            {
                L: s,
                yt: c
            } = n(0),
            {
                StateError
            } = n(4),
            a = n(17);
        t.exports = function(t, e, u) {
            switch (r.zt && r.Yt("Execute", "Executing", t, JSON.stringify(e)), t) {
                case "DEPLOY":
                    return function(t, e) {
                        const r = n(3);
                        if (!(t instanceof Array && t.length % 2 == 0)) throw new StateError("Invalid deploy data");
                        const s = t.length / 2,
                            u = [];
                        for (let t = 0; t < s; t++) u.push(r.ee());
                        const h = (new o).Ws().Js((t => {
                            const n = e[t] || u[t - e.length];
                            if (!n) throw new StateError(`Invalid local jig reference: ${t}`);
                            return n
                        })).zs(t);
                        for (let t = 0; t < s; t++) {
                            const e = h[2 * t + 0],
                                n = h[2 * t + 1],
                                [o] = i.In(e, n.deps);
                            Object.keys(n).forEach((t => {
                                c(o, t, n[t])
                            }));
                            const s = u[t],
                                a = !1,
                                [f] = r.un(s, o, a);
                            r.Gt(s).xe(f, a, [], e)
                        }
                        a.We(u)
                    }(e, u);
                case "UPGRADE":
                    return function(t, e) {
                        const Code = n(1),
                            r = n(3),
                            a = (new o).Ws().Js((t => e[t])).zs(t);
                        s(Array.isArray(a)), s(3 === a.length), s(a[0] instanceof Code), s("string" == typeof a[1]);
                        const [u, h, f] = a, [l] = i.In(h, f.deps);
                        Object.keys(f).forEach((t => {
                            c(l, t, f[t])
                        }));
                        const [p] = r.un(u, l), d = !1;
                        r.Kt(u, p, d, h)
                    }(e, u);
                case "CALL":
                    return function(t, e) {
                        const Code = n(1),
                            Jig = n(5),
                            r = (new o).Ws().Js((t => e[t])).zs(t);
                        s(3 === r.length), s(r[0] instanceof Code || r[0] instanceof Jig), s("string" == typeof r[1]), s(Array.isArray(r[2]));
                        const [i, c, a] = r;
                        i[c](...a)
                    }(e, u);
                case "NEW":
                    return function(t, e) {
                        const Code = n(1),
                            r = (new o).Ws().Js((t => e[t])).zs(t);
                        s(2 === r.length), s(r[0] instanceof Code), s(Array.isArray(r[1]));
                        const [i, c] = r;
                        new i(...c)
                    }(e, u);
                default:
                    throw new StateError(`Unknown op: ${t}`)
            }
        }
    }, function(t, e, n) {
        const r = n(49),
            o = n(50);
        t.exports = class {
            constructor(t = {}) {
                this.Na = new r({
                    maxSizeMB: t.maxMemorySizeMB
                }), this.Ua = new o({
                    dbName: t.dbName,
                    dbStore: t.dbStore,
                    dbVersion: t.dbVersion
                })
            }
            get maxMemorySizeMB() {
                return this.Na.maxSizeMB
            }
            set maxMemorySizeMB(t) {
                this.Na.maxSizeMB = t
            }
            async set(t, e) {
                return Promise.all([this.Na.set(t, e), this.Ua.set(t, e)])
            }
            async get(t) {
                return await this.Na.get(t) || await this.Ua.get(t)
            }
        }
    }, function(t, e, n) {
        const r = n(2),
            {
                ye: o
            } = n(11),
            {
                Y: i,
                St: s
            } = n(0),
            {
                g: c
            } = n(7),
            {
                TimeoutError,
                RequestError
            } = n(4),
            a = "Inventory";
        t.exports = class {
            constructor() {
                this.ra = (t, e) => this.Fa(e), this.Da = []
            }
            activate(t) {
                this.deactivate(), r.zt && r.Yt(a, "Activate"), this.Ma = t, t.on("update", this.ra), t.on("publish", this.ra), t.on("sync", this.ra), this.Ba = null, this.vi = [];
                const e = async () => {
                    try {
                        const n = await t.B.Vi().nextOwner();
                        if (this.La !== e) return;
                        this.Ba = o(n), r.zt && r.Yt(a, "Owner", n), this.vi.forEach((t => this.Fa(t))), this.vi = null
                    } catch (t) {
                        if (this.La !== e) return;
                        r.fe && r.ae(a, `Inventory disabled: ${t}`), this.vi = null
                    }
                };
                this.La = e, this.Ga = e()
            }
            deactivate() {
                this.Ma && (r.zt && r.Yt(a, "Deactivate"), this.Ma.off("update", this.ra), this.Ma.off("publish", this.ra), this.Ma.off("sync", this.ra), this.Ma = null, this.Ba = null, this.vi = null, this.Ga = null)
            }
            get jigs() {
                this.Va();
                const Jig = n(5);
                return this.Da.filter((t => t instanceof Jig))
            }
            get code() {
                this.Va();
                const Code = n(1);
                return this.Da.filter((t => t instanceof Code))
            }
            async sync() {
                if (r.ue && r.ie(a, "Sync"), this.Ga && await this.Ga, this.Ba) return this.Mt || (this.Mt = this.Ja().then((() => {
                    this.Mt = null
                })).catch((t => {
                    throw this.Mt = null, t
                }))), this.Mt
            }
            async Ja() {
                const t = this.Ba.script(),
                    e = (await this.Ma.blockchain.utxos(t)).map((t => `${t.txid}_o${t.vout}`)),
                    o = c((() => this.Da.map((t => t.location)))),
                    i = n(14),
                    u = new s("inventory sync", this.Ma.B.timeout),
                    h = new i(this.Ma.B, u);
                for (const t of e) {
                    if (o.includes(t)) continue;
                    try {
                        if (await this.Ma.cache.get(`ban://${t}`)) continue
                    } catch (t) {}
                    let e = null;
                    try {
                        e = await h.$n(t)
                    } catch (e) {
                        if (e instanceof TimeoutError) throw e;
                        if (e instanceof RequestError) throw e;
                        r.he && r.ce(a, `Failed to load ${t}\n\n${e.toString()}`);
                        try {
                            await this.Ma.cache.set(`ban://${t}`, 1)
                        } catch (t) {}
                        continue
                    }
                    this.Fa(e)
                }
                this.Va()
            }
            Fa(t) {
                !this.Ba && this.vi && this.vi.push(t);
                const e = this.Da.find((e => this.Wa(e, t)));
                e && c((() => e.nonce > t.nonce)) || (this.Da = this.Da.filter((t => t !== e)), this.za(t) ? (!e && r.ue && r.ie(a, "Add", i(t)), this.Da.push(t)) : e && r.ue && r.ie(a, "Remove", i(t)))
            }
            Wa(t, e) {
                if (t === e) return !0;
                const n = c((() => t.origin)),
                    r = c((() => e.origin));
                return !n.startsWith("error://") && (!r.startsWith("error://") && n === r)
            }
            za(t) {
                try {
                    if (c((() => t.location)).startsWith("error://")) return !1;
                    const e = c((() => t.owner));
                    if (void 0 === e) return !0;
                    if (!this.Ba) return !1;
                    const n = o(e).script();
                    return n === this.Ba.script()
                } catch (t) {
                    return !1
                }
            }
            Va() {
                this.Da = this.Da.filter((t => !!this.za(t) || (r.ue && r.ie(a, "Remove", i(t)), !1)))
            }
        }
    }, function(t, e, n) {
        const r = n(9),
            {
                PrivateKey: o,
                Script: i,
                Transaction: s
            } = r,
            {
                G: c,
                Y: a,
                B: u
            } = n(0),
            {
                $s: h,
                vs: f
            } = n(16);
        class l {
            constructor(t, e) {
                try {
                    e = e || u().Se().network
                } catch (t) {}
                const n = e && c(e);
                if (void 0 !== t && "string" != typeof t && !(t instanceof o)) throw new Error(`Invalid private key: ${a(t)}`);
                if (n && t && t instanceof o && t.network.name !== n) throw new Error("Private key network mismatch");
                try {
                    this.bsvPrivateKey = new o(t, n)
                } catch (e) {
                    throw new Error(`Invalid private key: ${a(t)}\n\n${e}`)
                }
                if (t && this.bsvPrivateKey.toString() !== t.toString()) throw new Error(`Invalid private key: ${a(t)}`);
                this.bsvPublicKey = this.bsvPrivateKey.publicKey, this.bsvAddress = this.bsvPublicKey.toAddress(), this.privkey = this.bsvPrivateKey.toString(), this.pubkey = this.bsvPublicKey.toString(), this.address = this.bsvAddress.toString()
            }
            async sign(t, e, o) {
                console.log('owner sign:', t)
                const CommonLock = n(35),
                    Group = n(37),
                    c = new s(t);
                e.forEach(((t, e) => {
                    t && (c.inputs[e].output = new s.Output({
                        satoshis: t.satoshis,
                        script: new i(t.script)
                    }))
                }));
                for (let t = 0; t < c.inputs.length; t++) {
                    const n = o[t] instanceof CommonLock,
                        s = c.inputs[t].output && c.inputs[t].output.script.isPublicKeyHashOut() && c.inputs[t].output.script.toAddress().toString() === this.address;
                    if (n || s) {
                        const n = new i(e[t].script);
                        if (n.toAddress().toString() !== this.address) continue;
                        const r = h(c, t, n, e[t].satoshis, this.bsvPrivateKey),
                            o = i.fromASM(`${r} ${this.pubkey}`);
                        c.inputs[t].setScript(o)
                    }
                    if (o[t] instanceof Group && o[t].pubkeys.includes(this.pubkey) && c.inputs[t].script.chunks.length <= o[t].required) {
                        const n = c.inputs[t].script.chunks.slice(1).map((t => t.buf.toString("hex"))),
                            s = {
                                script: new r.Script(e[t].script),
                                satoshis: e[t].satoshis
                            },
                            a = p(c, t, s, n, o[t].pubkeys);
                        if (a.includes(this.pubkey)) continue;
                        const u = new i(e[t].script),
                            f = h(c, t, u, e[t].satoshis, this.bsvPrivateKey),
                            l = o[t].pubkeys.map((t => {
                                const e = a.indexOf(t);
                                return -1 !== e ? n[e] : t === this.pubkey ? f : null
                            })).filter((t => null !== t)),
                            d = i.fromASM(`OP_0 ${l.join(" ")}`);
                        c.inputs[t].setScript(d)
                    }
                }
                return c.toString("hex")
            }
            async nextOwner() {
                return this.address
            }
        }

        function p(t, e, n, o, i) {
            const s = r.crypto.Signature.SIGHASH_ALL | r.crypto.Signature.SIGHASH_FORKID,
                c = new r.crypto.BN(n.satoshis),
                a = f(t, s, e, n.script, c),
                u = i.map((t => new r.PublicKey(t))),
                h = o.map((t => {
                    const e = t.slice(0, t.length - 2),
                        n = r.deps.Buffer.from(e, "hex"),
                        o = r.crypto.Signature.fromDER(n);
                    return u.findIndex((t => r.crypto.ECDSA.verify(a, o, t, "little")))
                })),
                l = h.findIndex((t => -1 === t));
            if (-1 !== l) throw new Error(`Bad signature at index ${l}`);
            return h.map((t => i[t]))
        }
        l.Ya = p, t.exports = l
    }, function(t, e, n) {
        const r = n(9),
            {
                PrivateKey: o,
                Script: i,
                Transaction: s
            } = r,
            {
                G: c,
                Y: a
            } = n(0),
            u = n(2),
            {
                $s: h
            } = n(16),
            f = "LocalPurse";

        function l(t) {
            switch (typeof t) {
                case "number":
                    if (!Number.isInteger(t)) throw new Error(`splits must be an integer: ${t}`);
                    if (t <= 0) throw new Error(`splits must be at least 1: ${t}`);
                    return t;
                case "undefined":
                    return 1;
                default:
                    throw new Error(`Invalid splits: ${t}`)
            }
        }

        function p(t) {
            switch (typeof t) {
                case "number":
                    if (!Number.isFinite(t)) throw new Error(`feePerKb must be finite: ${t}`);
                    if (t < 0) throw new Error(`feePerKb must be non-negative: ${t}`);
                    return t;
                case "undefined":
                    return s.FEE_PER_KB;
                default:
                    throw new Error(`Invalid feePerKb: ${t}`)
            }
        }

        function d(t, e) {
            const n = new s(t);
            if (!n.outputs.length) return !1;
            if (n.outputs[0].script.chunks.length < 6) return !1;
            const r = n.outputs[0].script.chunks;
            if (!r[2].buf) return !1;
            if ("run" !== r[2].buf.toString("utf8")) return !1;
            if (!r[5].buf) return !1;
            const o = r[5].buf.toString("utf8");
            try {
                const t = JSON.parse(o);
                return e >= 1 && e <= t.out.length
            } catch (t) {
                return !1
            }
        }
        t.exports = class {
            constructor(t = {}) {
                this.blockchain = function(t) {
                    switch (typeof t) {
                        case "undefined":
                            throw new Error("blockchain is required");
                        case "object":
                            if (t && t.network) return t
                    }
                    throw new Error(`Invalid blockchain: ${a(t)}`)
                }(t.blockchain), this.Ha = l(t.splits), this.Ka = p(t.feePerKb), this.bsvPrivateKey = new o(t.privkey, c(this.blockchain.network)), this.bsvAddress = this.bsvPrivateKey.toAddress(), this.bsvScript = i.fromAddress(this.bsvAddress), this.privkey = this.bsvPrivateKey.toString(), this.address = this.bsvAddress.toString(), this.script = this.bsvScript.toHex()
            }
            get splits() {
                return this.Ha
            }
            set splits(t) {
                this.Ha = l(t)
            }
            get feePerKb() {
                return this.Ka
            }
            set feePerKb(t) {
                this.Ka = p(t)
            }
            async pay(t, e) {
                const n = s.DUST_AMOUNT,
                    o = new s(t);
                o.feePerKb(this.feePerKb);
                const c = this.feePerKb / 1e3;
                e.forEach(((t, e) => {
                    t && (o.inputs[e].output = new s.Output({
                        satoshis: t.satoshis,
                        script: new i(t.script)
                    }))
                }));
                const a = [];
                o.inputs.forEach(((t, e) => {
                    t.script.toBuffer().length || (a.push(e), t.setScript(r.deps.Buffer.alloc(500)))
                }));
                const l = 0 === o.outputs.length ? n : 0,
                    p = o._getInputAmount(),
                    w = o._getOutputAmount();
                if (p - w - l >= o.toBuffer().length * c) {
                    u.zt && u.Yt(f, "Transaction already paid for. Skipping.");
                    const t = Math.ceil((34 + o.toBuffer().length) * c);
                    return p - w > n + t && (o._fee = t, o.change(this.bsvAddress)), a.forEach((t => o.inputs[t].setScript(""))), o.toString("hex")
                }
                let y = await this.blockchain.utxos(this.script);
                if (y = function(t) {
                        for (let e = t.length - 1; e > 0; e--) {
                            const n = Math.floor(Math.random() * (e + 1));
                            [t[e], t[n]] = [t[n], t[e]]
                        }
                        return t
                    }(y), !y.length) {
                    const t = `Hint: Have you funded the purse address ${this.address}?`;
                    throw new Error(`Not enough funds\n\n${t}`)
                }
                const b = o.inputs.length;
                let g = o.toBuffer().length * c,
                    _ = g + w - p,
                    m = 0,
                    E = 1;
                g += 34 * c, _ += 34 * c, _ += n;
                for (const t of y) {
                    if (d(await this.blockchain.fetch(t.txid), t.vout)) continue;
                    o.from(t), _ -= t.satoshis, m++, g += 149 * c, _ += 149 * c;
                    const e = this.splits - y.length + m - E;
                    for (let t = 0; t < e; t++) g += 34 * c, _ += 34 * c, _ += n, E++;
                    if (_ < 0) break
                }
                if (g = Math.ceil(g), _ = Math.ceil(_), _ > 0) {
                    throw new Error(`Not enough funds\n\n${`Required ${_} more satoshis`}`)
                }
                const v = E * n - _,
                    P = Math.max(n, Math.floor(v / E));
                for (let t = 0; t < E; t++) t === E - 1 ? (o._fee = g, o.change(this.bsvAddress)) : o.to(this.bsvAddress, P);
                for (let t = b; t < o.inputs.length; t++) {
                    const e = o.inputs[t].output,
                        n = h(o, t, e.script, e.satoshis, this.bsvPrivateKey),
                        r = this.bsvPrivateKey.publicKey.toString(),
                        s = i.fromASM(`${n} ${r}`);
                    o.inputs[t].setScript(s)
                }
                const O = o._getInputAmount() - p - (o._getOutputAmount() - w);
                return u.zt && u.Yt(f, "Paid about", O, "satoshis"), a.forEach((t => o.inputs[t].setScript(""))), o.toString("hex")
            }
            async balance() {
                return (await this.utxos()).reduce(((t, e) => t + e.satoshis), 0)
            }
            async utxos() {
                const t = await this.blockchain.utxos(this.script),
                    e = await Promise.all(t.map((t => this.blockchain.fetch(t.txid))));
                return t.filter(((t, n) => !d(e[n], t.vout)))
            }
        }
    }, function(t, e, n) {
        const r = n(9),
            {
                Address: o,
                Script: i,
                Transaction: s
            } = r,
            c = n(2),
            {
                Os: a
            } = n(16),
            {
                Y: u,
                $t: h
            } = n(0),
            {
                sha256: f
            } = r.crypto.Hash,
            l = "Mockchain";
        t.exports = class {
            constructor() {
                this.network = "mock", this.mempoolChainLimit = 1e3, this.qa = new Map, this.Za = new Map, this.Qa = new Map, this.Xa = new Map, this.tu = new Map, this.eu = new Map
            }
            async broadcast(t) {
                const e = new s(t),
                    n = e.hash;
                if (this.qa.has(n)) return c.he && c.ce(l, "Already have transaction", n), n;
                if (e.inputs.forEach(((t, e) => {
                        const n = `${t.prevTxId.toString("hex")}_o${t.outputIndex}`,
                            r = this.Xa.get(n);
                        if (!r) {
                            const t = this.Qa.get(n),
                                e = this.eu.has(t);
                            throw new Error(e ? "txn-mempool-conflict" : "Missing inputs")
                        }
                        t.output = new s.Output(r)
                    })), 0 === e.inputs.length) throw new Error("tx has no inputs");
                if (0 === e.outputs.length) throw new Error("tx has no outputs");
                if (e.getFee() < e.toBuffer().length * s.FEE_PER_KB / 1e3) throw new Error("insufficient priority");
                if (!0 !== e.verify()) throw new Error(e.verify());
                if (!0 !== e.isFullySigned()) throw new Error("mandatory-script-verify-flag-failed");
                for (let t = 0; t < e.inputs.length; t++)
                    if (!e.isValidSignature({
                            inputIndex: t
                        })) throw new Error("mandatory-script-verify-flag-failed");
                const o = e.inputs.map((t => t.prevTxId.toString("hex"))).map((t => this.eu.get(t) + 1)).reduce(((t, e) => Math.max(t, e)), 0);
                if (o > h(this.mempoolChainLimit, "mempoolChainLimit")) {
                    throw new Error(`too-long-mempool-chain\n\n${"Hint: Use run.blockchain.block() to produce blocks on the mockchain."}`)
                }
                return this.qa.set(n, t), this.Za.set(n, Date.now()), this.eu.set(n, o), e.inputs.forEach(((t, e) => {
                    const o = t.prevTxId.toString("hex"),
                        i = `${o}_o${t.outputIndex}`,
                        s = this.qa.get(o),
                        c = new r.Transaction(s).outputs[t.outputIndex],
                        a = f(c.script.toBuffer()).reverse().toString("hex");
                    this.Xa.delete(i), this.tu.get(a).delete(i), this.Qa.set(i, n)
                })), e.outputs.forEach(((t, e) => {
                    const r = `${n}_o${e}`;
                    this.Qa.set(r, null);
                    const o = {
                        txid: n,
                        vout: e,
                        script: t.script.toHex(),
                        satoshis: t.satoshis
                    };
                    this.Xa.set(r, o);
                    const i = f(t.script.toBuffer()).reverse().toString("hex"),
                        s = this.tu.get(i) || new Set;
                    s.add(r), this.tu.set(i, s)
                })), n
            }
            async fetch(t) {
                const e = this.qa.get(t);
                if (!e) throw new Error(`No such mempool or blockchain transaction: ${t}`);
                return e
            }
            async utxos(t) {
                if ("string" == typeof t) try {
                        t = i.fromAddress(t)
                    } catch (e) {
                        t = new i(t)
                    } else if (t instanceof o) t = i.fromAddress(t);
                    else if (!(t instanceof i)) throw new Error(`Invalid script: ${u(t)}`);
                const e = a(t),
                    n = this.tu.get(e);
                return n ? Array.from(n).map((t => this.Xa.get(t))) : []
            }
            async spends(t, e) {
                const n = `${t}_o${e}`;
                if (!this.Qa.has(n)) throw new Error(`location not found: ${n}`);
                return this.Qa.get(n)
            }
            async time(t) {
                const e = this.Za.get(t);
                if (!e) throw new Error(`No such mempool or blockchain transaction: ${t}`);
                return e
            }
            fund(t, e) {
                c.ue && c.ie(l, "Fund", t.toString(), "with", e);
                const n = Math.random().toString(),
                    r = (new s).addData(n).to(new o(t, "testnet"), e),
                    a = r.hash,
                    u = r.toString("hex");
                this.qa.set(a, u), this.Za.set(a, Date.now()), this.eu.set(a, 0);
                const h = {
                        txid: a,
                        vout: 1,
                        script: r.outputs[1].script.toHex(),
                        satoshis: r.outputs[1].satoshis
                    },
                    p = `${a}_o1`;
                this.Xa.set(p, h);
                const d = i.fromAddress(t),
                    w = f(d.toBuffer()).reverse().toString("hex"),
                    y = this.tu.get(w) || new Set;
                return y.add(p), this.tu.set(w, y), a
            }
            block() {
                c.zt && c.Yt(l, "Block"), this.eu.clear()
            }
        }
    }, function(t, e, n) {
        const r = n(9),
            o = n(23),
            {
                Y: i
            } = n(0);
        t.exports = class {
            constructor(t) {
                let e = null;
                try {
                    e = new r.HDPublicKey(t)
                } catch (e) {
                    throw new Error(`Invalid API key: ${i(t)}`)
                }
                this.network = "mainnet" === e.network.name || "livenet" === e.network.name ? "main" : "test", this.apiKey = t, this.timeout = 5e3
            }
            async pay(t, e) {
                const n = {
                        rawtx: t,
                        parents: e,
                        key: this.apiKey
                    },
                    r = `https://api.run.network/v1/${this.network}/pay`;
                return (await o.Ks(r, n, this.timeout)).rawtx
            }
        }
    }, function(t, e, n) {
        const {
            Y: r
        } = n(0), {
            ye: o
        } = n(11), i = n(9), {
            Script: s
        } = i, c = n(2);
        t.exports = class {
            constructor(t) {
                this.lock = o(t), this.script = s.fromHex(this.lock.script())
            }
            async sign(t, e, n) {
                return c.he && c.ce("Viewer", "Viewer cannot sign ", r(this.lock)), t
            }
            nextOwner() {
                return this.lock
            }
        }
    }])
}));