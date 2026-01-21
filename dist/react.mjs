import require$$0, { createContext, useState, useCallback, useContext } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	        case REACT_ACTIVITY_TYPE:
	          return "Activity";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_PORTAL_TYPE:
	            return "Portal";
	          case REACT_CONTEXT_TYPE:
	            return type.displayName || "Context";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = true;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function getTaskName(type) {
	      if (type === REACT_FRAGMENT_TYPE) return "<>";
	      if (
	        "object" === typeof type &&
	        null !== type &&
	        type.$$typeof === REACT_LAZY_TYPE
	      )
	        return "<...>";
	      try {
	        var name = getComponentNameFromType(type);
	        return name ? "<" + name + ">" : "<...>";
	      } catch (x) {
	        return "<...>";
	      }
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function UnknownOwner() {
	      return Error("react-stack-top-frame");
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return false;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = true),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = true;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: true
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = true),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(type, key, props, owner, debugStack, debugTask) {
	      var refProp = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== refProp ? refProp : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: false,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: null
	      });
	      Object.defineProperty(type, "_debugStack", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugStack
	      });
	      Object.defineProperty(type, "_debugTask", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugTask
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      debugStack,
	      debugTask
	    ) {
	      var children = config.children;
	      if (void 0 !== children)
	        if (isStaticChildren)
	          if (isArrayImpl(children)) {
	            for (
	              isStaticChildren = 0;
	              isStaticChildren < children.length;
	              isStaticChildren++
	            )
	              validateChildKeys(children[isStaticChildren]);
	            Object.freeze && Object.freeze(children);
	          } else
	            console.error(
	              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	            );
	        else validateChildKeys(children);
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = true));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(
	        type,
	        children,
	        maybeKey,
	        getOwner(),
	        debugStack,
	        debugTask
	      );
	    }
	    function validateChildKeys(node) {
	      isValidElement(node)
	        ? node._store && (node._store.validated = 1)
	        : "object" === typeof node &&
	          null !== node &&
	          node.$$typeof === REACT_LAZY_TYPE &&
	          ("fulfilled" === node._payload.status
	            ? isValidElement(node._payload.value) &&
	              node._payload.value._store &&
	              (node._payload.value._store.validated = 1)
	            : node._store && (node._store.validated = 1));
	    }
	    function isValidElement(object) {
	      return (
	        "object" === typeof object &&
	        null !== object &&
	        object.$$typeof === REACT_ELEMENT_TYPE
	      );
	    }
	    var React = require$$0,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
	      REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
	      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React = {
	      react_stack_bottom_frame: function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
	      React,
	      UnknownOwner
	    )();
	    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
	    var didWarnAboutKeySpread = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        false,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        true,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	  })();
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

// Error Types
var CacheShieldError = /** @class */ (function (_super) {
    __extends(CacheShieldError, _super);
    function CacheShieldError(message, code, cacheType, originalError) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.cacheType = cacheType;
        _this.originalError = originalError;
        _this.name = 'CacheShieldError';
        return _this;
    }
    return CacheShieldError;
}(Error));

var BrowserCacheStrategy = /** @class */ (function () {
    function BrowserCacheStrategy(config, logger) {
        this.config = config;
        this.logger = logger;
    }
    BrowserCacheStrategy.prototype.clearCacheAPI = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cacheNames, cleared, cacheNames_1, cacheNames_1_1, cacheName, e_1_1, error_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!('caches' in window)) {
                            return [2 /*return*/, {
                                    type: 'cacheAPI',
                                    success: false,
                                    error: 'Cache API not supported'
                                }];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, caches.keys()];
                    case 2:
                        cacheNames = _b.sent();
                        cleared = 0;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 8, 9, 10]);
                        cacheNames_1 = __values(cacheNames), cacheNames_1_1 = cacheNames_1.next();
                        _b.label = 4;
                    case 4:
                        if (!!cacheNames_1_1.done) return [3 /*break*/, 7];
                        cacheName = cacheNames_1_1.value;
                        if (this.shouldExclude(cacheName)) {
                            this.logger.debug("Skipping cache: ".concat(cacheName));
                            return [3 /*break*/, 6];
                        }
                        if (!this.shouldInclude(cacheName)) return [3 /*break*/, 6];
                        return [4 /*yield*/, caches.delete(cacheName)];
                    case 5:
                        _b.sent();
                        cleared++;
                        this.logger.debug("Deleted cache: ".concat(cacheName));
                        _b.label = 6;
                    case 6:
                        cacheNames_1_1 = cacheNames_1.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (cacheNames_1_1 && !cacheNames_1_1.done && (_a = cacheNames_1.return)) _a.call(cacheNames_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, {
                            type: 'cacheAPI',
                            success: true,
                            itemsCleared: cleared
                        }];
                    case 11:
                        error_1 = _b.sent();
                        throw new CacheShieldError('Failed to clear Cache API', 'UNKNOWN', 'cacheAPI', error_1 instanceof Error ? error_1 : undefined);
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    BrowserCacheStrategy.prototype.clearCookies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cookieConfig, preserveEssential, essentialCookies, targetNames, targetDomains, targetPaths, allCookies, cleared, _loop_1, this_1, allCookies_1, allCookies_1_1, cookie;
            var e_2, _a;
            var _b;
            return __generator(this, function (_c) {
                try {
                    cookieConfig = this.config.cookies;
                    preserveEssential = (_b = cookieConfig === null || cookieConfig === void 0 ? void 0 : cookieConfig.preserveEssential) !== null && _b !== void 0 ? _b : true;
                    essentialCookies = (cookieConfig === null || cookieConfig === void 0 ? void 0 : cookieConfig.essentialCookies) || [];
                    targetNames = cookieConfig === null || cookieConfig === void 0 ? void 0 : cookieConfig.names;
                    targetDomains = cookieConfig === null || cookieConfig === void 0 ? void 0 : cookieConfig.domains;
                    targetPaths = (cookieConfig === null || cookieConfig === void 0 ? void 0 : cookieConfig.paths) || ['/'];
                    allCookies = this.parseCookies();
                    cleared = 0;
                    _loop_1 = function (cookie) {
                        // Check if targeting specific names
                        if (targetNames && targetNames.length > 0) {
                            if (!targetNames.includes(cookie.name)) {
                                return "continue";
                            }
                        }
                        // Check if essential and should preserve
                        if (preserveEssential) {
                            var isEssential = essentialCookies.some(function (essential) {
                                return cookie.name.toLowerCase().includes(essential.toLowerCase());
                            });
                            if (isEssential) {
                                this_1.logger.debug("Preserving essential cookie: ".concat(cookie.name));
                                return "continue";
                            }
                        }
                        // Delete cookie
                        this_1.deleteCookie(cookie.name, targetPaths, targetDomains);
                        cleared++;
                        this_1.logger.debug("Deleted cookie: ".concat(cookie.name));
                    };
                    this_1 = this;
                    try {
                        for (allCookies_1 = __values(allCookies), allCookies_1_1 = allCookies_1.next(); !allCookies_1_1.done; allCookies_1_1 = allCookies_1.next()) {
                            cookie = allCookies_1_1.value;
                            _loop_1(cookie);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (allCookies_1_1 && !allCookies_1_1.done && (_a = allCookies_1.return)) _a.call(allCookies_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return [2 /*return*/, {
                            type: 'cookies',
                            success: true,
                            itemsCleared: cleared
                        }];
                }
                catch (error) {
                    throw new CacheShieldError('Failed to clear cookies', 'UNKNOWN', 'cookies', error instanceof Error ? error : undefined);
                }
                return [2 /*return*/];
            });
        });
    };
    BrowserCacheStrategy.prototype.parseCookies = function () {
        return document.cookie.split(';').map(function (cookie) {
            var _a = __read(cookie.trim().split('='), 2), name = _a[0], value = _a[1];
            return { name: name, value: value || '' };
        }).filter(function (c) { return c.name; });
    };
    BrowserCacheStrategy.prototype.deleteCookie = function (name, paths, domains) {
        if (paths === void 0) { paths = ['/']; }
        var expiry = 'Thu, 01 Jan 1970 00:00:00 GMT';
        var cookieConfig = this.config.cookies;
        // Explicit override domain
        if (cookieConfig === null || cookieConfig === void 0 ? void 0 : cookieConfig.domain) {
            this.deleteCookieWithDomain(name, paths, [cookieConfig.domain], expiry);
            return;
        }
        // Auto-detect domains using improved heuristic
        var domainsToTry = domains || this.getDomainsToTry();
        this.deleteCookieWithDomain(name, paths, domainsToTry, expiry);
    };
    BrowserCacheStrategy.prototype.getDomainsToTry = function () {
        var hostname = window.location.hostname;
        var parts = hostname.split('.');
        var domains = [''];
        // Always try the exact hostname
        if (hostname) {
            domains.push(hostname);
            domains.push('.' + hostname);
        }
        // Try parent domains (from most specific to least)
        if (parts.length >= 2) {
            // Try 2-part domain (example.com)
            var twoPartDomain = parts.slice(-2).join('.');
            if (twoPartDomain !== hostname) {
                domains.push(twoPartDomain);
                domains.push('.' + twoPartDomain);
            }
        }
        if (parts.length >= 3) {
            // Try 3-part domain (for .co.uk, .gov.au patterns)
            var threePartDomain = parts.slice(-3).join('.');
            if (threePartDomain !== hostname &&
                !domains.includes(threePartDomain) &&
                threePartDomain.split('.').length >= 2) {
                domains.push(threePartDomain);
                domains.push('.' + threePartDomain);
            }
        }
        // Remove duplicates and invalid entries
        return __spreadArray([], __read(new Set(domains)), false).filter(function (d) {
            // Allow empty string (current domain) and valid domain strings
            return d === '' || d === 'localhost' || /^\.?[a-zA-Z0-9][-a-zA-Z0-9]*(\.[a-zA-Z0-9][-a-zA-Z0-9]*)+$/.test(d);
        });
    };
    BrowserCacheStrategy.prototype.deleteCookieWithDomain = function (name, paths, domains, expiry) {
        var e_3, _a, e_4, _b;
        try {
            for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                var path = paths_1_1.value;
                try {
                    for (var domains_1 = (e_4 = void 0, __values(domains)), domains_1_1 = domains_1.next(); !domains_1_1.done; domains_1_1 = domains_1.next()) {
                        var domain = domains_1_1.value;
                        // Skip invalid domain segments
                        if (domain && domain.indexOf('.') === -1 && domain !== 'localhost')
                            continue;
                        var domainPart = domain ? "; domain=".concat(domain) : '';
                        // Standard cookie deletion
                        document.cookie = "".concat(name, "=; expires=").concat(expiry, "; path=").concat(path).concat(domainPart);
                        // Also try secure flag for HTTPS
                        document.cookie = "".concat(name, "=; expires=").concat(expiry, "; path=").concat(path).concat(domainPart, "; secure");
                        // Log deletion attempts for debugging
                        this.logger.debug("Attempted to delete cookie \"".concat(name, "\""), {
                            domain: domain || '(current)',
                            path: path,
                            timestamp: new Date().toISOString()
                        });
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (domains_1_1 && !domains_1_1.done && (_b = domains_1.return)) _b.call(domains_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    BrowserCacheStrategy.prototype.shouldExclude = function (value) {
        var exclude = this.config.exclude;
        if (!exclude || exclude.length === 0)
            return false;
        return exclude.some(function (pattern) {
            if (typeof pattern === 'string')
                return value.includes(pattern);
            return pattern.test(value);
        });
    };
    BrowserCacheStrategy.prototype.shouldInclude = function (value) {
        var include = this.config.include;
        if (!include || include.length === 0)
            return true;
        return include.some(function (pattern) {
            if (typeof pattern === 'string')
                return value.includes(pattern);
            return pattern.test(value);
        });
    };
    return BrowserCacheStrategy;
}());

var ServiceWorkerStrategy = /** @class */ (function () {
    function ServiceWorkerStrategy(config, logger) {
        this.config = config;
        this.logger = logger;
    }
    ServiceWorkerStrategy.prototype.clear = function () {
        return __awaiter(this, arguments, void 0, function (options) {
            var registrations, unregistered, registrations_1, registrations_1_1, registration, success, e_1_1, error_1;
            var e_1, _a;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!('serviceWorker' in navigator)) {
                            return [2 /*return*/, {
                                    type: 'serviceWorker',
                                    success: false,
                                    error: 'Service Workers not supported'
                                }];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 13, , 14]);
                        return [4 /*yield*/, navigator.serviceWorker.getRegistrations()];
                    case 2:
                        registrations = _b.sent();
                        unregistered = 0;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 8, 9, 10]);
                        registrations_1 = __values(registrations), registrations_1_1 = registrations_1.next();
                        _b.label = 4;
                    case 4:
                        if (!!registrations_1_1.done) return [3 /*break*/, 7];
                        registration = registrations_1_1.value;
                        // Check if should be excluded
                        if (this.shouldExclude(registration.scope)) {
                            this.logger.debug("Skipping SW: ".concat(registration.scope));
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, registration.unregister()];
                    case 5:
                        success = _b.sent();
                        if (success) {
                            unregistered++;
                            this.logger.debug("Unregistered SW: ".concat(registration.scope));
                        }
                        _b.label = 6;
                    case 6:
                        registrations_1_1 = registrations_1.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (registrations_1_1 && !registrations_1_1.done && (_a = registrations_1.return)) _a.call(registrations_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        if (!!options.skipCacheClear) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.clearServiceWorkerCaches()];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [2 /*return*/, {
                            type: 'serviceWorker',
                            success: true,
                            itemsCleared: unregistered
                        }];
                    case 13:
                        error_1 = _b.sent();
                        throw new CacheShieldError('Failed to clear Service Workers', 'UNKNOWN', 'serviceWorker', error_1 instanceof Error ? error_1 : undefined);
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ServiceWorkerStrategy.prototype.clearServiceWorkerCaches = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cacheNames, cleared, cacheNames_1, cacheNames_1_1, cacheName, e_2_1;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!('caches' in window)) {
                            return [2 /*return*/, 0];
                        }
                        return [4 /*yield*/, caches.keys()];
                    case 1:
                        cacheNames = _b.sent();
                        cleared = 0;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        cacheNames_1 = __values(cacheNames), cacheNames_1_1 = cacheNames_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!cacheNames_1_1.done) return [3 /*break*/, 6];
                        cacheName = cacheNames_1_1.value;
                        if (this.shouldExclude(cacheName)) {
                            return [3 /*break*/, 5];
                        }
                        return [4 /*yield*/, caches.delete(cacheName)];
                    case 4:
                        _b.sent();
                        cleared++;
                        this.logger.debug("Deleted cache: ".concat(cacheName));
                        _b.label = 5;
                    case 5:
                        cacheNames_1_1 = cacheNames_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (cacheNames_1_1 && !cacheNames_1_1.done && (_a = cacheNames_1.return)) _a.call(cacheNames_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, cleared];
                }
            });
        });
    };
    ServiceWorkerStrategy.prototype.shouldExclude = function (value) {
        var exclude = this.config.exclude;
        if (!exclude || exclude.length === 0) {
            return false;
        }
        return exclude.some(function (pattern) {
            if (typeof pattern === 'string') {
                return value.includes(pattern);
            }
            return pattern.test(value);
        });
    };
    /**
     * Update Service Worker (skip waiting)
     */
    ServiceWorkerStrategy.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var registration, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!('serviceWorker' in navigator)) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, navigator.serviceWorker.getRegistration()];
                    case 2:
                        registration = _a.sent();
                        if (registration === null || registration === void 0 ? void 0 : registration.waiting) {
                            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                            return [2 /*return*/, true];
                        }
                        if (!registration) return [3 /*break*/, 4];
                        return [4 /*yield*/, registration.update()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4: return [2 /*return*/, false];
                    case 5:
                        error_2 = _a.sent();
                        this.logger.error('Failed to update Service Worker', error_2);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return ServiceWorkerStrategy;
}());

var StorageStrategy = /** @class */ (function () {
    function StorageStrategy(config, logger) {
        this.config = config;
        this.logger = logger;
    }
    StorageStrategy.prototype.clearLocalStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.clearStorage('localStorage', localStorage)];
            });
        });
    };
    StorageStrategy.prototype.clearSessionStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.clearStorage('sessionStorage', sessionStorage)];
            });
        });
    };
    StorageStrategy.prototype.clearStorage = function (type, storage) {
        return __awaiter(this, void 0, void 0, function () {
            var storageConfig, preserveKeys, preservePattern, keyPattern, keysToRemove, keysToPreserve, i, key, bytesFreed, keysToRemove_1, keysToRemove_1_1, key, value, keysToRemove_2, keysToRemove_2_1, key;
            var e_1, _a, e_2, _b;
            return __generator(this, function (_c) {
                try {
                    storageConfig = this.config.storage;
                    preserveKeys = (storageConfig === null || storageConfig === void 0 ? void 0 : storageConfig.preserveKeys) || [];
                    preservePattern = storageConfig === null || storageConfig === void 0 ? void 0 : storageConfig.preservePattern;
                    keyPattern = storageConfig === null || storageConfig === void 0 ? void 0 : storageConfig.keyPattern;
                    keysToRemove = [];
                    keysToPreserve = [];
                    // Collect keys to remove
                    for (i = 0; i < storage.length; i++) {
                        key = storage.key(i);
                        if (!key)
                            continue;
                        // Check if should preserve
                        if (preserveKeys.includes(key)) {
                            keysToPreserve.push(key);
                            continue;
                        }
                        if (preservePattern && preservePattern.test(key)) {
                            keysToPreserve.push(key);
                            continue;
                        }
                        // Check if matches key pattern (if specified)
                        if (keyPattern && !keyPattern.test(key)) {
                            continue;
                        }
                        keysToRemove.push(key);
                    }
                    bytesFreed = 0;
                    try {
                        for (keysToRemove_1 = __values(keysToRemove), keysToRemove_1_1 = keysToRemove_1.next(); !keysToRemove_1_1.done; keysToRemove_1_1 = keysToRemove_1.next()) {
                            key = keysToRemove_1_1.value;
                            value = storage.getItem(key);
                            if (value) {
                                bytesFreed += key.length + value.length;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (keysToRemove_1_1 && !keysToRemove_1_1.done && (_a = keysToRemove_1.return)) _a.call(keysToRemove_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    bytesFreed *= 2; // UTF-16
                    try {
                        // Remove keys
                        for (keysToRemove_2 = __values(keysToRemove), keysToRemove_2_1 = keysToRemove_2.next(); !keysToRemove_2_1.done; keysToRemove_2_1 = keysToRemove_2.next()) {
                            key = keysToRemove_2_1.value;
                            storage.removeItem(key);
                            this.logger.debug("Removed ".concat(type, " key: ").concat(key));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (keysToRemove_2_1 && !keysToRemove_2_1.done && (_b = keysToRemove_2.return)) _b.call(keysToRemove_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    this.logger.info("".concat(type, " cleared"), {
                        removed: keysToRemove.length,
                        preserved: keysToPreserve.length
                    });
                    return [2 /*return*/, {
                            type: type,
                            success: true,
                            itemsCleared: keysToRemove.length,
                            bytesFreed: bytesFreed
                        }];
                }
                catch (error) {
                    throw new CacheShieldError("Failed to clear ".concat(type), 'UNKNOWN', type, error instanceof Error ? error : undefined);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Get storage usage stats
     */
    StorageStrategy.prototype.getStorageStats = function () {
        return {
            localStorage: this.calculateStorageSize(localStorage),
            sessionStorage: this.calculateStorageSize(sessionStorage)
        };
    };
    StorageStrategy.prototype.calculateStorageSize = function (storage) {
        var total = 0;
        for (var i = 0; i < storage.length; i++) {
            var key = storage.key(i);
            if (key) {
                var value = storage.getItem(key) || '';
                total += (key.length + value.length) * 2;
            }
        }
        return total;
    };
    return StorageStrategy;
}());

var IndexedDBStrategy = /** @class */ (function () {
    function IndexedDBStrategy(config, logger) {
        this.config = config;
        this.logger = logger;
    }
    IndexedDBStrategy.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var databases, idbConfig, targetDatabases, deleteDatabase, cleared, databases_1, databases_1_1, dbInfo, dbName, e_1_1, error_1;
            var e_1, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!('indexedDB' in window)) {
                            return [2 /*return*/, {
                                    type: 'indexedDB',
                                    success: false,
                                    error: 'IndexedDB not supported'
                                }];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 14, , 15]);
                        return [4 /*yield*/, this.getDatabases()];
                    case 2:
                        databases = _c.sent();
                        idbConfig = this.config.indexedDB;
                        targetDatabases = idbConfig === null || idbConfig === void 0 ? void 0 : idbConfig.databases;
                        deleteDatabase = (_b = idbConfig === null || idbConfig === void 0 ? void 0 : idbConfig.deleteDatabase) !== null && _b !== void 0 ? _b : true;
                        cleared = 0;
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 11, 12, 13]);
                        databases_1 = __values(databases), databases_1_1 = databases_1.next();
                        _c.label = 4;
                    case 4:
                        if (!!databases_1_1.done) return [3 /*break*/, 10];
                        dbInfo = databases_1_1.value;
                        dbName = dbInfo.name;
                        if (!dbName)
                            return [3 /*break*/, 9];
                        // Check if specific databases are targeted
                        if (targetDatabases && targetDatabases.length > 0) {
                            if (!targetDatabases.includes(dbName)) {
                                return [3 /*break*/, 9];
                            }
                        }
                        // Check exclusions
                        if (this.shouldExclude(dbName)) {
                            this.logger.debug("Skipping IndexedDB: ".concat(dbName));
                            return [3 /*break*/, 9];
                        }
                        if (!deleteDatabase) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.deleteDatabase(dbName)];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.clearDatabaseData(dbName)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        cleared++;
                        this.logger.debug("Cleared IndexedDB: ".concat(dbName));
                        _c.label = 9;
                    case 9:
                        databases_1_1 = databases_1.next();
                        return [3 /*break*/, 4];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (databases_1_1 && !databases_1_1.done && (_a = databases_1.return)) _a.call(databases_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, {
                            type: 'indexedDB',
                            success: true,
                            itemsCleared: cleared
                        }];
                    case 14:
                        error_1 = _c.sent();
                        throw new CacheShieldError('Failed to clear IndexedDB', 'UNKNOWN', 'indexedDB', error_1 instanceof Error ? error_1 : undefined);
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    IndexedDBStrategy.prototype.getDatabases = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!('databases' in indexedDB)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, indexedDB.databases()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_2 = _a.sent();
                        this.logger.warn('indexedDB.databases() failed', error_2);
                        return [2 /*return*/, this.getFallbackDatabases()];
                    case 4: 
                    // Fallback: For Safari and older browsers
                    return [2 /*return*/, this.getFallbackDatabases()];
                }
            });
        });
    };
    IndexedDBStrategy.prototype.getFallbackDatabases = function () {
        return __awaiter(this, void 0, void 0, function () {
            var configured, commonNames, detected, commonNames_1, commonNames_1_1, dbName, exists, e_3_1;
            var e_3, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        configured = ((_b = this.config.indexedDB) === null || _b === void 0 ? void 0 : _b.databases) || [];
                        if (configured.length > 0) {
                            this.logger.debug('Using configured database names', configured);
                            return [2 /*return*/, configured.map(function (name) { return ({ name: name }); })];
                        }
                        commonNames = [
                            'firebaseLocalStorageDb',
                            '_ionicstorage',
                            'reactnative',
                            'redux-persist',
                            'localforage',
                            'ngsw:cache:v1',
                            'vuex-persist',
                            'pouchdb',
                            '__zone_symbol__Promise',
                            'default'
                        ];
                        detected = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, 9, 10]);
                        commonNames_1 = __values(commonNames), commonNames_1_1 = commonNames_1.next();
                        _c.label = 2;
                    case 2:
                        if (!!commonNames_1_1.done) return [3 /*break*/, 7];
                        dbName = commonNames_1_1.value;
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.testDatabaseExists(dbName)];
                    case 4:
                        exists = _c.sent();
                        if (exists) {
                            detected.push({ name: dbName });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        commonNames_1_1 = commonNames_1.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_3_1 = _c.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (commonNames_1_1 && !commonNames_1_1.done && (_a = commonNames_1.return)) _a.call(commonNames_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        if (detected.length === 0) {
                            this.logger.warn('No IndexedDB databases found. Specify databases in config for Safari/older browsers.', { example: 'indexedDB: { databases: ["my-db"] }' });
                        }
                        return [2 /*return*/, detected];
                }
            });
        });
    };
    IndexedDBStrategy.prototype.testDatabaseExists = function (name) {
        return new Promise(function (resolve) {
            try {
                var request_1 = indexedDB.open(name);
                var found_1 = false;
                request_1.onsuccess = function () {
                    var db = request_1.result;
                    found_1 = db.objectStoreNames.length > 0;
                    db.close();
                    resolve(found_1);
                };
                request_1.onerror = function () {
                    resolve(false);
                };
                request_1.onupgradeneeded = function () {
                    // Database exists but is new
                    request_1.result.close();
                    resolve(false);
                };
                // Timeout after 1 second
                setTimeout(function () {
                    if (!found_1 && request_1.result) {
                        request_1.result.close();
                        resolve(found_1);
                    }
                }, 1000);
            }
            catch (e) {
                resolve(false);
            }
        });
    };
    IndexedDBStrategy.prototype.deleteDatabase = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = indexedDB.deleteDatabase(name);
            request.onsuccess = function () {
                _this.logger.debug("Deleted database: ".concat(name));
                resolve();
            };
            request.onerror = function () {
                reject(new Error("Failed to delete database: ".concat(name)));
            };
            request.onblocked = function () {
                _this.logger.warn("Database deletion blocked: ".concat(name));
                // Rejecting here allows us to report partial failure instead of silent success
                reject(new Error("Database deletion blocked (open in another tab): ".concat(name)));
            };
        });
    };
    IndexedDBStrategy.prototype.clearDatabaseData = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var request = indexedDB.open(name);
                        request.onsuccess = function () { return __awaiter(_this, void 0, void 0, function () {
                            var db, storeNames, transaction, storeNames_1, storeNames_1_1, storeName, store;
                            var e_4, _a;
                            return __generator(this, function (_b) {
                                db = request.result;
                                storeNames = Array.from(db.objectStoreNames);
                                if (storeNames.length === 0) {
                                    db.close();
                                    resolve();
                                    return [2 /*return*/];
                                }
                                transaction = db.transaction(storeNames, 'readwrite');
                                try {
                                    for (storeNames_1 = __values(storeNames), storeNames_1_1 = storeNames_1.next(); !storeNames_1_1.done; storeNames_1_1 = storeNames_1.next()) {
                                        storeName = storeNames_1_1.value;
                                        store = transaction.objectStore(storeName);
                                        store.clear();
                                    }
                                }
                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                finally {
                                    try {
                                        if (storeNames_1_1 && !storeNames_1_1.done && (_a = storeNames_1.return)) _a.call(storeNames_1);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                                transaction.oncomplete = function () {
                                    db.close();
                                    resolve();
                                };
                                transaction.onerror = function () {
                                    db.close();
                                    reject(new Error("Failed to clear data in: ".concat(name)));
                                };
                                return [2 /*return*/];
                            });
                        }); };
                        request.onerror = function () {
                            reject(new Error("Failed to open database: ".concat(name)));
                        };
                    })];
            });
        });
    };
    IndexedDBStrategy.prototype.shouldExclude = function (value) {
        var exclude = this.config.exclude;
        if (!exclude || exclude.length === 0) {
            return false;
        }
        return exclude.some(function (pattern) {
            if (typeof pattern === 'string') {
                return value.includes(pattern);
            }
            return pattern.test(value);
        });
    };
    return IndexedDBStrategy;
}());

var SmartReloader = /** @class */ (function () {
    function SmartReloader(logger) {
        this.logger = logger;
    }
    /**
     * Reload the page with cache-busting logic
     */
    SmartReloader.prototype.reload = function (forceBypass) {
        if (forceBypass === void 0) { forceBypass = true; }
        if (forceBypass) {
            this.performCacheBustedReload();
        }
        else {
            this.logger.debug('Performing standard reload');
            window.location.reload();
        }
    };
    SmartReloader.prototype.performCacheBustedReload = function () {
        this.logger.debug('Performing smart cache-busting reload');
        try {
            var url = new URL(window.location.href);
            // Add unique timestamp to force browser to fetch fresh HTML
            url.searchParams.set('_cs_bust', Date.now().toString());
            // Use replace() to avoid breaking the back button history
            window.location.replace(url.toString());
        }
        catch (error) {
            // Fallback for older browsers or URL parsing errors
            this.logger.warn('Smart reload failed, falling back to standard reload', error);
            window.location.reload();
        }
    };
    return SmartReloader;
}());

var BfCacheStrategy = /** @class */ (function () {
    function BfCacheStrategy(logger) {
        this.logger = logger;
        this.initialized = false;
    }
    /**
     * Initialize listener for Back-Forward Cache restores
     */
    BfCacheStrategy.prototype.init = function () {
        var _this = this;
        if (this.initialized || typeof window === 'undefined')
            return;
        window.addEventListener('pageshow', function (event) {
            // event.persisted is true if page was restored from bfcache (memory)
            if (event.persisted) {
                _this.logger.info('Page restored from bfcache detected, forcing reload to ensure freshness');
                window.location.reload();
            }
        });
        this.initialized = true;
        this.logger.debug('BfCache protection initialized');
    };
    return BfCacheStrategy;
}());

var Logger = /** @class */ (function () {
    function Logger(enabled) {
        if (enabled === void 0) { enabled = false; }
        this.enabled = enabled;
        this.prefix = '[CacheShield]';
    }
    Logger.prototype.debug = function (message, data) {
        this.log('debug', message, data);
    };
    Logger.prototype.info = function (message, data) {
        this.log('info', message, data);
    };
    Logger.prototype.warn = function (message, data) {
        this.log('warn', message, data);
    };
    Logger.prototype.error = function (message, data) {
        this.log('error', message, data);
    };
    Logger.prototype.success = function (message, data) {
        this.log('success', message, data);
    };
    Logger.prototype.log = function (level, message, data) {
        if (!this.enabled && level === 'debug') {
            return;
        }
        var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
        if (!isBrowser) {
            // Simple text logging for Node/CI
            var consoleMethod_1 = level === 'error' ? 'error' :
                level === 'warn' ? 'warn' :
                    'log';
            console[consoleMethod_1]("[".concat(level.toUpperCase(), "] ").concat(this.prefix, " ").concat(message), data !== undefined ? data : '');
            return;
        }
        var styles = {
            debug: 'color: #888',
            info: 'color: #2196F3',
            warn: 'color: #FF9800',
            error: 'color: #F44336',
            success: 'color: #4CAF50'
        };
        var emoji = {
            debug: '🔍',
            info: 'ℹ️',
            warn: '⚠️',
            error: '❌',
            success: '✅'
        };
        var consoleMethod = level === 'error' ? 'error' :
            level === 'warn' ? 'warn' :
                'log';
        console[consoleMethod]("%c".concat(emoji[level], " ").concat(this.prefix, " ").concat(message), styles[level], data !== undefined ? data : '');
    };
    return Logger;
}());

function detectCapabilities() {
    return {
        serviceWorker: 'serviceWorker' in navigator,
        cacheAPI: 'caches' in window,
        indexedDB: 'indexedDB' in window,
        localStorage: checkStorage('localStorage'),
        sessionStorage: checkStorage('sessionStorage'),
        cookies: navigator.cookieEnabled,
        storageEstimate: 'storage' in navigator && 'estimate' in navigator.storage,
        persistentStorage: 'storage' in navigator && 'persist' in navigator.storage
    };
}
function checkStorage(type) {
    try {
        var storage = window[type];
        var testKey = '__cache_shield_test__';
        storage.setItem(testKey, 'test');
        storage.removeItem(testKey);
        return true;
    }
    catch (_a) {
        return false;
    }
}

var CacheShield = /** @class */ (function () {
    function CacheShield(config) {
        if (config === void 0) { config = {}; }
        this.config = this.mergeConfig(config);
        this.logger = new Logger(this.config.debug);
        this.capabilities = detectCapabilities();
        // Initialize strategies
        this.browserCache = new BrowserCacheStrategy(this.config, this.logger);
        this.serviceWorker = new ServiceWorkerStrategy(this.config, this.logger);
        this.storage = new StorageStrategy(this.config, this.logger);
        this.indexedDB = new IndexedDBStrategy(this.config, this.logger);
        this.reloader = new SmartReloader(this.logger);
        this.bfCache = new BfCacheStrategy(this.logger);
        // Initialize BfCache protection if enabled
        if (this.config.preventBfCache) {
            this.bfCache.init();
        }
        this.logger.info('CacheShield initialized', {
            config: this.config,
            capabilities: this.capabilities
        });
    }
    /**
     * Clear all specified caches
     */
    CacheShield.prototype.clear = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, config, targets, error_1, results, total, completed, hasCacheAPI, targets_1, targets_1_1, target, result, error_2, cacheError, e_1_1, duration, clearResult, error_3;
            var e_1, _a;
            var _this = this;
            var _b, _c, _d, _e, _f, _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        startTime = performance.now();
                        config = options ? this.mergeConfig(__assign(__assign({}, this.config), options)) : this.config;
                        targets = this.resolveTargets(config.targets);
                        this.logger.info('Starting cache clear', { targets: targets });
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ((_c = (_b = config.hooks).onBeforeClear) === null || _c === void 0 ? void 0 : _c.call(_b, targets))];
                    case 2:
                        _k.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _k.sent();
                        this.logger.error('onBeforeClear hook failed', error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        results = [];
                        total = targets.length;
                        completed = 0;
                        hasCacheAPI = targets.includes('cacheAPI');
                        _k.label = 5;
                    case 5:
                        _k.trys.push([5, 13, 14, 15]);
                        targets_1 = __values(targets), targets_1_1 = targets_1.next();
                        _k.label = 6;
                    case 6:
                        if (!!targets_1_1.done) return [3 /*break*/, 12];
                        target = targets_1_1.value;
                        _k.label = 7;
                    case 7:
                        _k.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, this.clearCacheType(target, {
                                skipCacheClear: target === 'serviceWorker' && hasCacheAPI
                            })];
                    case 8:
                        result = _k.sent();
                        results.push(result);
                        if (result.success) {
                            this.logger.success("Cleared ".concat(target), result);
                        }
                        else {
                            this.logger.warn("Failed to clear ".concat(target), result);
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _k.sent();
                        cacheError = this.wrapError(error_2, target);
                        try {
                            (_e = (_d = config.hooks).onError) === null || _e === void 0 ? void 0 : _e.call(_d, cacheError);
                        }
                        catch (hookError) {
                            this.logger.error('onError hook failed', hookError);
                        }
                        results.push({
                            type: target,
                            success: false,
                            error: cacheError.message
                        });
                        return [3 /*break*/, 10];
                    case 10:
                        completed++;
                        try {
                            (_g = (_f = config.hooks).onProgress) === null || _g === void 0 ? void 0 : _g.call(_f, {
                                current: target,
                                completed: completed,
                                total: total,
                                percentage: Math.round((completed / total) * 100)
                            });
                        }
                        catch (error) {
                            this.logger.error('onProgress hook failed', error);
                        }
                        _k.label = 11;
                    case 11:
                        targets_1_1 = targets_1.next();
                        return [3 /*break*/, 6];
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        e_1_1 = _k.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 15];
                    case 14:
                        try {
                            if (targets_1_1 && !targets_1_1.done && (_a = targets_1.return)) _a.call(targets_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 15:
                        duration = performance.now() - startTime;
                        clearResult = {
                            success: results.every(function (r) { return r.success; }),
                            cleared: results.filter(function (r) { return r.success; }),
                            failed: results.filter(function (r) { return !r.success; }),
                            timestamp: Date.now(),
                            duration: duration
                        };
                        this.logger.info('Cache clear completed', clearResult);
                        _k.label = 16;
                    case 16:
                        _k.trys.push([16, 18, , 19]);
                        return [4 /*yield*/, ((_j = (_h = config.hooks).onAfterClear) === null || _j === void 0 ? void 0 : _j.call(_h, clearResult))];
                    case 17:
                        _k.sent();
                        return [3 /*break*/, 19];
                    case 18:
                        error_3 = _k.sent();
                        this.logger.error('onAfterClear hook failed', error_3);
                        return [3 /*break*/, 19];
                    case 19:
                        // Auto reload if configured
                        if (config.autoReload && clearResult.success) {
                            setTimeout(function () {
                                _this.reloader.reload(true);
                            }, config.reloadDelay);
                        }
                        return [2 /*return*/, clearResult];
                }
            });
        });
    };
    /**
     * Clear specific cache type
     */
    CacheShield.prototype.clearCacheType = function (type_1) {
        return __awaiter(this, arguments, void 0, function (type, options) {
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (type) {
                    case 'serviceWorker':
                        return [2 /*return*/, this.serviceWorker.clear(options)];
                    case 'cacheAPI':
                        return [2 /*return*/, this.browserCache.clearCacheAPI()];
                    case 'localStorage':
                        return [2 /*return*/, this.storage.clearLocalStorage()];
                    case 'sessionStorage':
                        return [2 /*return*/, this.storage.clearSessionStorage()];
                    case 'indexedDB':
                        return [2 /*return*/, this.indexedDB.clear()];
                    case 'cookies':
                        return [2 /*return*/, this.browserCache.clearCookies()];
                    default:
                        return [2 /*return*/, {
                                type: type,
                                success: false,
                                error: "Unknown cache type: ".concat(type)
                            }];
                }
            });
        });
    };
    /**
     * Clear only Service Workers
     */
    CacheShield.prototype.clearServiceWorkers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceWorker.clear()];
            });
        });
    };
    /**
     * Clear only Cache API storage
     */
    CacheShield.prototype.clearCacheAPI = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.browserCache.clearCacheAPI()];
            });
        });
    };
    /**
     * Clear only localStorage
     */
    CacheShield.prototype.clearLocalStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.storage.clearLocalStorage()];
            });
        });
    };
    /**
     * Clear only sessionStorage
     */
    CacheShield.prototype.clearSessionStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.storage.clearSessionStorage()];
            });
        });
    };
    /**
     * Clear only IndexedDB
     */
    CacheShield.prototype.clearIndexedDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.indexedDB.clear()];
            });
        });
    };
    /**
     * Clear only cookies
     */
    CacheShield.prototype.clearCookies = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.browserCache.clearCookies()];
            });
        });
    };
    /**
     * Force hard reload (bypass cache)
     */
    CacheShield.prototype.hardReload = function () {
        this.reloader.reload(true);
    };
    /**
     * Clear and reload
     */
    CacheShield.prototype.clearAndReload = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clear(options)];
                    case 1:
                        _a.sent();
                        this.hardReload();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get estimated storage usage
     */
    CacheShield.prototype.getStorageEstimate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if ('storage' in navigator && 'estimate' in navigator.storage) {
                    return [2 /*return*/, navigator.storage.estimate()];
                }
                return [2 /*return*/, null];
            });
        });
    };
    /**
     * Check browser capabilities
     */
    CacheShield.prototype.getCapabilities = function () {
        return this.capabilities;
    };
    /**
     * Resolve 'all' target to specific types
     */
    CacheShield.prototype.resolveTargets = function (targets) {
        var _this = this;
        if (targets.includes('all')) {
            var allTypes = [
                'serviceWorker',
                'cacheAPI',
                'localStorage',
                'sessionStorage',
                'indexedDB',
                'cookies'
            ];
            // Filter based on capabilities
            return allTypes.filter(function (type) {
                switch (type) {
                    case 'serviceWorker':
                        return _this.capabilities.serviceWorker;
                    case 'cacheAPI':
                        return _this.capabilities.cacheAPI;
                    case 'indexedDB':
                        return _this.capabilities.indexedDB;
                    default:
                        return true;
                }
            });
        }
        return targets;
    };
    /**
     * Merge user config with defaults
     */
    CacheShield.prototype.mergeConfig = function (config) {
        return __assign(__assign(__assign({}, CacheShield.DEFAULTS), config), { cookies: __assign(__assign({}, CacheShield.DEFAULTS.cookies), config.cookies), indexedDB: __assign(__assign({}, CacheShield.DEFAULTS.indexedDB), config.indexedDB), storage: __assign(__assign({}, CacheShield.DEFAULTS.storage), config.storage), hooks: __assign(__assign({}, CacheShield.DEFAULTS.hooks), config.hooks) });
    };
    /**
     * Wrap error in CacheShieldError
     */
    CacheShield.prototype.wrapError = function (error, cacheType) {
        if (error instanceof CacheShieldError) {
            return error;
        }
        var originalError = error instanceof Error ? error : new Error(String(error));
        return new CacheShieldError("Failed to clear ".concat(cacheType, ": ").concat(originalError.message), 'UNKNOWN', cacheType, originalError);
    };
    // Default configuration
    CacheShield.DEFAULTS = {
        targets: ['all'],
        include: [],
        exclude: [],
        cookies: {
            preserveEssential: true,
            essentialCookies: ['csrf', 'session', 'auth']
        },
        indexedDB: {
            deleteDatabase: true
        },
        storage: {
            preserveKeys: []
        },
        debug: false,
        hooks: {},
        autoReload: false,
        reloadDelay: 100,
        preventBfCache: false
    };
    return CacheShield;
}());

var CacheShieldContext = createContext(null);
function CacheShieldProvider(_a) {
    var _this = this;
    var children = _a.children, config = _a.config;
    var _b = __read(useState(function () { return new CacheShield(config); }), 1), shield = _b[0];
    var _c = __read(useState(false), 2), isClearing = _c[0], setIsClearing = _c[1];
    var _d = __read(useState(null), 2), lastResult = _d[0], setLastResult = _d[1];
    var clear = useCallback(function (options) { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsClearing(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, shield.clear(options)];
                case 2:
                    result = _a.sent();
                    setLastResult(result);
                    return [2 /*return*/, result];
                case 3:
                    setIsClearing(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [shield]);
    var clearType = useCallback(function (type) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsClearing(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 15, 16]);
                    _a = type;
                    switch (_a) {
                        case 'serviceWorker': return [3 /*break*/, 2];
                        case 'localStorage': return [3 /*break*/, 4];
                        case 'sessionStorage': return [3 /*break*/, 6];
                        case 'indexedDB': return [3 /*break*/, 8];
                        case 'cookies': return [3 /*break*/, 10];
                        case 'cacheAPI': return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 14];
                case 2: return [4 /*yield*/, shield.clearServiceWorkers()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 4: return [4 /*yield*/, shield.clearLocalStorage()];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 6: return [4 /*yield*/, shield.clearSessionStorage()];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 8: return [4 /*yield*/, shield.clearIndexedDB()];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 10: return [4 /*yield*/, shield.clearCookies()];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 12: return [4 /*yield*/, shield.clearCacheAPI()];
                case 13:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 14: return [3 /*break*/, 16];
                case 15:
                    setIsClearing(false);
                    return [7 /*endfinally*/];
                case 16: return [2 /*return*/];
            }
        });
    }); }, [shield]);
    var hardReload = useCallback(function () {
        shield.hardReload();
    }, [shield]);
    var value = {
        shield: shield,
        isClearing: isClearing,
        lastResult: lastResult,
        clear: clear,
        clearType: clearType,
        hardReload: hardReload,
        capabilities: shield.getCapabilities()
    };
    return (jsxRuntimeExports.jsx(CacheShieldContext.Provider, { value: value, children: children }));
}
// Hook
function useCacheShield() {
    var context = useContext(CacheShieldContext);
    if (!context) {
        throw new Error('useCacheShield must be used within CacheShieldProvider');
    }
    return context;
}
// Simple hook without provider
function useCacheShieldSimple(config) {
    var _this = this;
    var _a = __read(useState(function () { return new CacheShield(config); }), 1), shield = _a[0];
    var _b = __read(useState(false), 2), isClearing = _b[0], setIsClearing = _b[1];
    var _c = __read(useState(null), 2), lastResult = _c[0], setLastResult = _c[1];
    var clear = useCallback(function (options) { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsClearing(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, shield.clear(options)];
                case 2:
                    result = _a.sent();
                    setLastResult(result);
                    return [2 /*return*/, result];
                case 3:
                    setIsClearing(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [shield]);
    return {
        clear: clear,
        isClearing: isClearing,
        lastResult: lastResult,
        shield: shield
    };
}
function ClearCacheButton(_a) {
    var _this = this;
    var _b = _a.children, children = _b === void 0 ? 'Clear Cache' : _b, onSuccess = _a.onSuccess, onError = _a.onError, options = _a.options, className = _a.className, disabled = _a.disabled;
    var _c = useCacheShield(), clear = _c.clear, isClearing = _c.isClearing;
    var handleClick = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, clear(options)];
                case 1:
                    result = _a.sent();
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    onError === null || onError === void 0 ? void 0 : onError(error_1 instanceof Error ? error_1 : new Error(String(error_1)));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (jsxRuntimeExports.jsx("button", { onClick: handleClick, disabled: disabled || isClearing, className: className, children: isClearing ? 'Clearing...' : children }));
}

export { CacheShieldProvider, ClearCacheButton, useCacheShield, useCacheShieldSimple };
