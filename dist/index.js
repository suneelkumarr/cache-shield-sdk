/*!
 * cache-shield-sdk v1.0.4
 * (c) 2026 Suneel Kumar
 * Released under the MIT License
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

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
            var cacheNames, cleared, _i, cacheNames_1, cacheName, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!('caches' in window)) {
                            return [2 /*return*/, {
                                    type: 'cacheAPI',
                                    success: false,
                                    error: 'Cache API not supported'
                                }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, caches.keys()];
                    case 2:
                        cacheNames = _a.sent();
                        cleared = 0;
                        _i = 0, cacheNames_1 = cacheNames;
                        _a.label = 3;
                    case 3:
                        if (!(_i < cacheNames_1.length)) return [3 /*break*/, 6];
                        cacheName = cacheNames_1[_i];
                        if (this.shouldExclude(cacheName)) {
                            this.logger.debug("Skipping cache: ".concat(cacheName));
                            return [3 /*break*/, 5];
                        }
                        if (!this.shouldInclude(cacheName)) return [3 /*break*/, 5];
                        return [4 /*yield*/, caches.delete(cacheName)];
                    case 4:
                        _a.sent();
                        cleared++;
                        this.logger.debug("Deleted cache: ".concat(cacheName));
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, {
                            type: 'cacheAPI',
                            success: true,
                            itemsCleared: cleared
                        }];
                    case 7:
                        error_1 = _a.sent();
                        throw new CacheShieldError('Failed to clear Cache API', 'UNKNOWN', 'cacheAPI', error_1 instanceof Error ? error_1 : undefined);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    BrowserCacheStrategy.prototype.clearCookies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cookieConfig, preserveEssential, essentialCookies, targetNames, targetDomains, targetPaths, allCookies, cleared, _loop_1, this_1, _i, allCookies_1, cookie;
            var _a;
            return __generator(this, function (_b) {
                try {
                    cookieConfig = this.config.cookies;
                    preserveEssential = (_a = cookieConfig === null || cookieConfig === void 0 ? void 0 : cookieConfig.preserveEssential) !== null && _a !== void 0 ? _a : true;
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
                    for (_i = 0, allCookies_1 = allCookies; _i < allCookies_1.length; _i++) {
                        cookie = allCookies_1[_i];
                        _loop_1(cookie);
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
            var _a = cookie.trim().split('='), name = _a[0], value = _a[1];
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
        // Try different domain combinations
        var domainsToTry = domains || [
            '', // Current domain
            window.location.hostname,
            '.' + window.location.hostname,
            window.location.hostname.split('.').slice(-2).join('.'), // Root domain (best effort)
            window.location.hostname.split('.').slice(-3).join('.') // Deeper subdomains
        ];
        this.deleteCookieWithDomain(name, paths, domainsToTry, expiry);
    };
    BrowserCacheStrategy.prototype.deleteCookieWithDomain = function (name, paths, domains, expiry) {
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var path = paths_1[_i];
            for (var _a = 0, domains_1 = domains; _a < domains_1.length; _a++) {
                var domain = domains_1[_a];
                // Skip invalid domain segments
                if (domain && domain.indexOf('.') === -1 && domain !== 'localhost')
                    continue;
                var domainPart = domain ? "; domain=".concat(domain) : '';
                document.cookie = "".concat(name, "=; expires=").concat(expiry, "; path=").concat(path).concat(domainPart);
                document.cookie = "".concat(name, "=; expires=").concat(expiry, "; path=").concat(path).concat(domainPart, "; secure");
            }
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
            var registrations, unregistered, _i, registrations_1, registration, success, error_1;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!('serviceWorker' in navigator)) {
                            return [2 /*return*/, {
                                    type: 'serviceWorker',
                                    success: false,
                                    error: 'Service Workers not supported'
                                }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, navigator.serviceWorker.getRegistrations()];
                    case 2:
                        registrations = _a.sent();
                        unregistered = 0;
                        _i = 0, registrations_1 = registrations;
                        _a.label = 3;
                    case 3:
                        if (!(_i < registrations_1.length)) return [3 /*break*/, 6];
                        registration = registrations_1[_i];
                        // Check if should be excluded
                        if (this.shouldExclude(registration.scope)) {
                            this.logger.debug("Skipping SW: ".concat(registration.scope));
                            return [3 /*break*/, 5];
                        }
                        return [4 /*yield*/, registration.unregister()];
                    case 4:
                        success = _a.sent();
                        if (success) {
                            unregistered++;
                            this.logger.debug("Unregistered SW: ".concat(registration.scope));
                        }
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        if (!!options.skipCacheClear) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.clearServiceWorkerCaches()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/, {
                            type: 'serviceWorker',
                            success: true,
                            itemsCleared: unregistered
                        }];
                    case 9:
                        error_1 = _a.sent();
                        throw new CacheShieldError('Failed to clear Service Workers', 'UNKNOWN', 'serviceWorker', error_1 instanceof Error ? error_1 : undefined);
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ServiceWorkerStrategy.prototype.clearServiceWorkerCaches = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cacheNames, cleared, _i, cacheNames_1, cacheName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!('caches' in window)) {
                            return [2 /*return*/, 0];
                        }
                        return [4 /*yield*/, caches.keys()];
                    case 1:
                        cacheNames = _a.sent();
                        cleared = 0;
                        _i = 0, cacheNames_1 = cacheNames;
                        _a.label = 2;
                    case 2:
                        if (!(_i < cacheNames_1.length)) return [3 /*break*/, 5];
                        cacheName = cacheNames_1[_i];
                        if (this.shouldExclude(cacheName)) {
                            return [3 /*break*/, 4];
                        }
                        return [4 /*yield*/, caches.delete(cacheName)];
                    case 3:
                        _a.sent();
                        cleared++;
                        this.logger.debug("Deleted cache: ".concat(cacheName));
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, cleared];
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
            var storageConfig, preserveKeys, preservePattern, keyPattern, keysToRemove, keysToPreserve, i, key, bytesFreed, _i, keysToRemove_1, key, value, _a, keysToRemove_2, key;
            return __generator(this, function (_b) {
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
                    for (_i = 0, keysToRemove_1 = keysToRemove; _i < keysToRemove_1.length; _i++) {
                        key = keysToRemove_1[_i];
                        value = storage.getItem(key);
                        if (value) {
                            bytesFreed += key.length + value.length;
                        }
                    }
                    bytesFreed *= 2; // UTF-16
                    // Remove keys
                    for (_a = 0, keysToRemove_2 = keysToRemove; _a < keysToRemove_2.length; _a++) {
                        key = keysToRemove_2[_a];
                        storage.removeItem(key);
                        this.logger.debug("Removed ".concat(type, " key: ").concat(key));
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
            var databases, idbConfig, targetDatabases, deleteDatabase, cleared, _i, databases_1, dbInfo, dbName, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!('indexedDB' in window)) {
                            return [2 /*return*/, {
                                    type: 'indexedDB',
                                    success: false,
                                    error: 'IndexedDB not supported'
                                }];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, this.getDatabases()];
                    case 2:
                        databases = _b.sent();
                        idbConfig = this.config.indexedDB;
                        targetDatabases = idbConfig === null || idbConfig === void 0 ? void 0 : idbConfig.databases;
                        deleteDatabase = (_a = idbConfig === null || idbConfig === void 0 ? void 0 : idbConfig.deleteDatabase) !== null && _a !== void 0 ? _a : true;
                        cleared = 0;
                        _i = 0, databases_1 = databases;
                        _b.label = 3;
                    case 3:
                        if (!(_i < databases_1.length)) return [3 /*break*/, 9];
                        dbInfo = databases_1[_i];
                        dbName = dbInfo.name;
                        if (!dbName)
                            return [3 /*break*/, 8];
                        // Check if specific databases are targeted
                        if (targetDatabases && targetDatabases.length > 0) {
                            if (!targetDatabases.includes(dbName)) {
                                return [3 /*break*/, 8];
                            }
                        }
                        // Check exclusions
                        if (this.shouldExclude(dbName)) {
                            this.logger.debug("Skipping IndexedDB: ".concat(dbName));
                            return [3 /*break*/, 8];
                        }
                        if (!deleteDatabase) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.deleteDatabase(dbName)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.clearDatabaseData(dbName)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        cleared++;
                        this.logger.debug("Cleared IndexedDB: ".concat(dbName));
                        _b.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 3];
                    case 9: return [2 /*return*/, {
                            type: 'indexedDB',
                            success: true,
                            itemsCleared: cleared
                        }];
                    case 10:
                        error_1 = _b.sent();
                        throw new CacheShieldError('Failed to clear IndexedDB', 'UNKNOWN', 'indexedDB', error_1 instanceof Error ? error_1 : undefined);
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    IndexedDBStrategy.prototype.getDatabases = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Modern browsers support indexedDB.databases()
                if ('databases' in indexedDB) {
                    return [2 /*return*/, indexedDB.databases()];
                }
                // Fallback: return empty array (can't enumerate DBs in older browsers)
                this.logger.warn('indexedDB.databases() not supported');
                return [2 /*return*/, []];
            });
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
                            var db, storeNames, transaction, _i, storeNames_1, storeName, store;
                            return __generator(this, function (_a) {
                                db = request.result;
                                storeNames = Array.from(db.objectStoreNames);
                                if (storeNames.length === 0) {
                                    db.close();
                                    resolve();
                                    return [2 /*return*/];
                                }
                                transaction = db.transaction(storeNames, 'readwrite');
                                for (_i = 0, storeNames_1 = storeNames; _i < storeNames_1.length; _i++) {
                                    storeName = storeNames_1[_i];
                                    store = transaction.objectStore(storeName);
                                    store.clear();
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
function isBrowser() {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}
function isSecureContext() {
    return isBrowser() && window.isSecureContext;
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
            var startTime, config, targets, error_1, results, total, completed, hasCacheAPI, _i, targets_1, target, result, error_2, cacheError, duration, clearResult, error_3;
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        startTime = performance.now();
                        config = options ? this.mergeConfig(__assign(__assign({}, this.config), options)) : this.config;
                        targets = this.resolveTargets(config.targets);
                        this.logger.info('Starting cache clear', { targets: targets });
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ((_b = (_a = config.hooks).onBeforeClear) === null || _b === void 0 ? void 0 : _b.call(_a, targets))];
                    case 2:
                        _j.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _j.sent();
                        this.logger.error('onBeforeClear hook failed', error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        results = [];
                        total = targets.length;
                        completed = 0;
                        hasCacheAPI = targets.includes('cacheAPI');
                        _i = 0, targets_1 = targets;
                        _j.label = 5;
                    case 5:
                        if (!(_i < targets_1.length)) return [3 /*break*/, 11];
                        target = targets_1[_i];
                        _j.label = 6;
                    case 6:
                        _j.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.clearCacheType(target, {
                                skipCacheClear: target === 'serviceWorker' && hasCacheAPI
                            })];
                    case 7:
                        result = _j.sent();
                        results.push(result);
                        if (result.success) {
                            this.logger.success("Cleared ".concat(target), result);
                        }
                        else {
                            this.logger.warn("Failed to clear ".concat(target), result);
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _j.sent();
                        cacheError = this.wrapError(error_2, target);
                        try {
                            (_d = (_c = config.hooks).onError) === null || _d === void 0 ? void 0 : _d.call(_c, cacheError);
                        }
                        catch (hookError) {
                            this.logger.error('onError hook failed', hookError);
                        }
                        results.push({
                            type: target,
                            success: false,
                            error: cacheError.message
                        });
                        return [3 /*break*/, 9];
                    case 9:
                        completed++;
                        try {
                            (_f = (_e = config.hooks).onProgress) === null || _f === void 0 ? void 0 : _f.call(_e, {
                                current: target,
                                completed: completed,
                                total: total,
                                percentage: Math.round((completed / total) * 100)
                            });
                        }
                        catch (error) {
                            this.logger.error('onProgress hook failed', error);
                        }
                        _j.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 5];
                    case 11:
                        duration = performance.now() - startTime;
                        clearResult = {
                            success: results.every(function (r) { return r.success; }),
                            cleared: results.filter(function (r) { return r.success; }),
                            failed: results.filter(function (r) { return !r.success; }),
                            timestamp: Date.now(),
                            duration: duration
                        };
                        this.logger.info('Cache clear completed', clearResult);
                        _j.label = 12;
                    case 12:
                        _j.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, ((_h = (_g = config.hooks).onAfterClear) === null || _h === void 0 ? void 0 : _h.call(_g, clearResult))];
                    case 13:
                        _j.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        error_3 = _j.sent();
                        this.logger.error('onAfterClear hook failed', error_3);
                        return [3 /*break*/, 15];
                    case 15:
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

/**
 * Quick clear function - creates instance and clears
 */
function clearCache(options) {
    return __awaiter(this, void 0, void 0, function () {
        var shield;
        return __generator(this, function (_a) {
            shield = new CacheShield(options);
            return [2 /*return*/, shield.clear()];
        });
    });
}
/**
 * Create singleton instance
 */
var instance = null;
function getCacheShield(config) {
    if (!instance) {
        instance = new CacheShield(config);
    }
    return instance;
}

exports.CacheShield = CacheShield;
exports.CacheShieldError = CacheShieldError;
exports.clearCache = clearCache;
exports.default = CacheShield;
exports.detectCapabilities = detectCapabilities;
exports.getCacheShield = getCacheShield;
exports.isBrowser = isBrowser;
exports.isSecureContext = isSecureContext;
