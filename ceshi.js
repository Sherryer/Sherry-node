!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Fusion = t() : e.Fusion = t()
}(this, function () {
    return function (e) {
        function t(o) {
            if (n[o]) return n[o].exports;
            var r = n[o] = {exports: {}, id: o, loaded: !1};
            return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
        }

        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function (e, t, n) {
        "use strict";
        var o = n(1), r = n(2);
        if (window.Fusion) throw new Error("Fusion has existed! You can ignore this error.");
        var i = new o.FusionClass("2.0.1");
        i.fetchJSModules();
        var u = document.querySelector("html");
        u.addEventListener("injectReady", function () {
            r.rocket.$emit("FusionModuleRegisterd")
        }), window.Soda = i.loadModule("Soda"), window.Soda.customer = i.loadModule("Customer"), window.Soda.merchant = i.loadModule("Merchant"), window.Soda.rider = i.loadModule("Rider"), e.exports = i
    }, function (e, t, n) {
        "use strict";

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.FusionClass = void 0;
        var r = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }

            return function (t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(), i = n(2), u = n(7), s = n(8);
        t.FusionClass = function () {
            function e(t) {
                o(this, e), this.version = t, this._registeredModules = []
            }

            return r(e, [{
                key: "invokeNative", value: function (e, t) {
                    return function () {
                        for (var n = [], o = s.Global.getInstance(), r = o.callbackId.toString(), u = arguments.length, a = Array(u), l = 0; l < u; l++) a[l] = arguments[l];
                        for (var c in a) (0, i.isFunction)(a[c]) ? (o.callbacks[r] = a[c], n.push(r), o.callbackId++) : n.push(a[c]);
                        (0, i.bridgeCall)("invokeNative", e, t, n)
                    }
                }
            }, {
                key: "callbackJS", value: function (e, t) {
                    var n = s.Global.getInstance(), o = n.callbacks[e];
                    o && (0, i.isFunction)(o) && o.apply(null, t)
                }
            }, {
                key: "invokeJSMethod", value: function (e, t, n) {
                    var o = this, r = [], i = /^__\${(\d)+}__$/;
                    for (var s in n) i.exec(n[s]) ? !function () {
                        var e = i.exec(n[s])[1], t = o, u = function () {
                            for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
                            t.callbackNative(e, o)
                        };
                        r.push(u)
                    }() : r.push(n[s]);
                    if (u.CONFIG.SYS_MODULE.indexOf(e) !== -1) return void this[t].apply(this, r);
                    var a = this.loadModule(e);
                    a[t].apply(null, r)
                }
            }, {
                key: "callbackNative", value: function (e, t) {
                    (0, i.bridgeCall)("callbackNative", null, e, t)
                }
            }, {
                key: "registerModules", value: function (e) {
                    for (var t in e) {
                        if (u.CONFIG.SYS_MODULE.indexOf(e[t].module) >= 0) for (var n in e[t].methods) this[e[t].methods[n]] || (this[e[t].methods[n]] = this.invokeNative(e[t].module, e[t].methods[n])); else {
                            this.registerModule(e[t].module);
                            for (var o in e[t].methods) {
                                var r = this.loadModule(e[t].module);
                                r.registerFn(e[t].methods[o])
                            }
                            this[e[t].module] = this.loadModule(e[t].module)
                        }
                        this._registeredModules.push(e[t])
                    }
                }
            }, {
                key: "registerModule", value: function (e) {
                    var t = s.Global.getInstance(), n = t.modules[e];
                    if (!n) {
                        var o = this;
                        t.modules[e] = Object.create({
                            registerFn: function (t) {
                                this[t] = o.invokeNative(e, t)
                            }
                        })
                    }
                }
            }, {
                key: "loadModule", value: function (e) {
                    var t = s.Global.getInstance(), n = t.modules[e];
                    return n ? n : (this.registerModule(e), t.modules[e])
                }
            }, {
                key: "fetchJSModules", value: function () {
                    if (i.isAndroid) {
                        if (i.withFusion) {
                            var e = JSON.stringify({fusion: "loadJSModules"}), t = window.prompt(e);
                            try {
                                t = JSON.parse(t), this.registerModules(t)
                            } catch (e) {
                            }
                        }
                    } else {
                        var n = this;
                        window.loadJSModules && window.loadJSModules(function (e) {
                            n.registerModules(e)
                        })
                    }
                }
            }, {
                key: "getRegisteredModules", value: function () {
                    return this._registeredModules
                }
            }]), e
        }()
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var o = n(3);
        Object.keys(o).forEach(function (e) {
            "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                enumerable: !0, get: function () {
                    return o[e]
                }
            })
        });
        var r = n(4);
        Object.keys(r).forEach(function (e) {
            "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                enumerable: !0, get: function () {
                    return r[e]
                }
            })
        });
        var i = n(6);
        Object.keys(i).forEach(function (e) {
            "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                enumerable: !0, get: function () {
                    return i[e]
                }
            })
        });
        var u = n(5);
        Object.keys(u).forEach(function (e) {
            "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                enumerable: !0, get: function () {
                    return u[e]
                }
            })
        })
    }, function (e, t) {
        "use strict";

        function n(e, t) {
            return Object.prototype.toString.call(e) === "[object " + t + "]"
        }

        function o(e) {
            return n(e, "Function")
        }

        function r(e) {
            return n(e, "String")
        }

        function i(e) {
            return n(e, "Object")
        }

        function u(e) {
            if (r(e)) try {
                return JSON.parse(e), !0
            } catch (e) {
                return !1
            }
            return !1
        }

        function s(e, t) {
            t = t || 0;
            for (var n = e.length - t, o = new Array(n); n--;) o[n] = e[n + t];
            return o
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.isFunction = o, t.isString = r, t.isObject = i, t.isJSON = u, t.toArray = s
    }, function (e, t, n) {
        "use strict";

        function o(e) {
            var t = document.createElement("iframe");
            t.src = e, t.style.display = "none", document.documentElement.appendChild(t), setTimeout(function () {
                document.documentElement.removeChild(t)
            }, 0)
        }

        function r(e, t, n, r) {
            var u = "fusion://" + e + "?";
            t && (u += "module=" + t + "&"), u += "method=" + n + "&";
            var s = r.map(function (e) {
                return encodeURIComponent(JSON.stringify(e))
            });
            u += "arguments=%5B" + s + "%5D&", u += "origin=" + window.location.hostname, o(u), a ? i(u) : l.push(u)
        }

        function i(e) {
            var t = new CustomEvent("eventBus", {detail: {scheme: e}});
            s.dispatchEvent(t)
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.bridgeCall = r;
        var u = n(5), s = document.querySelector("html"), a = !1, l = [];
        u.rocket.$on("FusionModuleRegisterd", function () {
            a = !0, l.forEach(function (e) {
                i(e)
            })
        })
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.rocket = void 0;
        var o = n(3);
        t.rocket = {
            _events: {}, $on: function (e, t) {
                if (Array.isArray(e)) for (var n = 0, o = e.length; n < o; n++) this.$on(e[n], t); else (this._events[e] || (this._events[e] = [])).push(t);
                return this
            }, $once: function (e, t) {
                function n() {
                    this.$off(e, n), t.apply(o, arguments)
                }

                var o = this;
                return n.fn = t, this.$on(e, n), this
            }, $off: function (e, t) {
                if (!arguments.length) return this._events = Object.create(null), this;
                if (Array.isArray(e)) {
                    for (var n = 0, o = e.length; n < o; n++) this.$off(e[n], t);
                    return this
                }
                var r = this._events[e];
                if (!r) return this;
                if (1 === arguments.length) return this._events[e] = null, this;
                if (t) for (var i = void 0, u = r.length; u--;) if (i = r[u], i === t || i.fn === t) {
                    r.splice(u, 1);
                    break
                }
                return this
            }, $emit: function (e) {
                var t = this._events[e];
                if (t) {
                    t = t.length > 1 ? (0, o.toArray)(t) : t;
                    for (var n = (0, o.toArray)(arguments, 1), r = 0, i = t.length; r < i; r++) try {
                        t[r].apply(this, n)
                    } catch (e) {
                    }
                }
                return this
            }
        }
    }, function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = t.UA = window.navigator.userAgent.toLowerCase();
        t.withFusion = /fusionkit/i.test(n), t.isAndroid = /android/i.test(n), t.isIOS = /iphone os/i.test(n)
    }, function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        t.CONFIG = {SYS_MODULE: ["TraceModule", "DidiBridgeAdapter"]}
    }, function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        t.Global = function () {
            function e() {
                return {modules: {}, callbacks: {}, callbackId: "0"}
            }

            var t = void 0;
            return {
                getInstance: function () {
                    return t || (t = e()), t
                }
            }
        }()
    }])
});