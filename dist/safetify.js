(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Result = /** @class */ (function () {
    function Result(success, result, error) {
        this.success = success;
        this.result = result;
        this.error = error;
    }
    return Result;
}());
exports.Result = Result;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(2);
var Result_1 = __webpack_require__(0);
var Resolver = /** @class */ (function () {
    function Resolver(type, resolver) {
        this.type = type;
        this.resolver = resolver;
        this.isNullable = false;
    }
    Resolver.prototype.resolve = function (input) {
        var resolved = this.resolver(input);
        if (!resolved.success) {
            if (this.isNullable === true && input === null) {
                return new Result_1.Result(true, null);
            }
            else if (Util_1.Util.isDefAndNotNull(this.defaultValue)) {
                resolved.result = this.resolver(this.defaultValue).result;
            }
            else if (this.isNullable === true) {
                resolved.result = null;
            }
        }
        else if (!Util_1.Util.isDef(resolved.result) && this.isNullable === true) {
            resolved.result = null;
        }
        return resolved;
    };
    Resolver.prototype._clone = function () {
        return new Resolver(this.type, this.resolver);
    };
    Resolver.prototype.defaultsTo = function (val) {
        var newResolver = this._clone();
        newResolver.defaultValue = val;
        newResolver.isNullable = this.isNullable;
        return newResolver;
    };
    Resolver.prototype.nullable = function () {
        var newResolver = this._clone();
        newResolver.defaultValue = this.defaultValue;
        newResolver.isNullable = true;
        return newResolver;
    };
    return Resolver;
}());
exports.Resolver = Resolver;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.isDef = function (val) {
        return val !== void 0;
    };
    Util.isDefAndNotNull = function (val) {
        return val != null;
    };
    Util.isString = function (val) {
        return typeof val == 'string';
    };
    Util.isBoolean = function (val) {
        return typeof val == 'boolean';
    };
    Util.isNumber = function (val) {
        return typeof val == 'number';
    };
    Util.isArray = function (val) {
        return this._typeOf(val) == 'array';
    };
    Util.isObject = function (val) {
        var type = typeof val;
        return type == 'object' && val != null || type == 'function';
    };
    Util._typeOf = function (val) {
        var s = typeof val;
        if (s == 'object') {
            if (val) {
                if (val instanceof Array) {
                    return 'array';
                }
                else if (val instanceof Object) {
                    return s;
                }
                var className = Object.prototype.toString.call(val);
                if (className == '[object Window]') {
                    return 'object';
                }
                if (className == '[object Array]' ||
                    typeof val.length == 'number' &&
                        typeof val.splice != 'undefined' &&
                        typeof val.propertyIsEnumerable != 'undefined' &&
                        !val.propertyIsEnumerable('splice')) {
                    return 'array';
                }
                if (className == '[object Function]' ||
                    typeof val.call != 'undefined' &&
                        typeof val.propertyIsEnumerable != 'undefined' &&
                        !val.propertyIsEnumerable('call')) {
                    return 'function';
                }
            }
            else {
                return 'null';
            }
        }
        else if (s == 'function' && typeof val.call == 'undefined') {
            return 'object';
        }
        return s;
    };
    return Util;
}());
exports.Util = Util;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(2);
var SafeUtil = /** @class */ (function () {
    function SafeUtil() {
    }
    SafeUtil.makeSafeString = function (val) {
        return Util_1.Util.isString(val) ? String(val) : '';
    };
    SafeUtil.makeSafeNumber = function (val, safeValue) {
        if (safeValue === void 0) { safeValue = NaN; }
        var parsed = Number(val);
        return isFinite(parsed) ? parsed : safeValue;
    };
    SafeUtil.makeSafeArray = function (val) {
        return Util_1.Util.isArray(val) ? val : [];
    };
    SafeUtil.makeSafeObject = function (val) {
        return Util_1.Util.isObject(val) ? val : {};
    };
    return SafeUtil;
}());
exports.SafeUtil = SafeUtil;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(2);
var SafeUtil_1 = __webpack_require__(3);
var Resolver_1 = __webpack_require__(1);
var Result_1 = __webpack_require__(0);
function ArrayResolver(resolver) {
    return new Resolver_1.Resolver('array', function (input) {
        if (!Util_1.Util.isArray(input)) {
            return new Result_1.Result(false, SafeUtil_1.SafeUtil.makeSafeArray(input), ['value is not an array']);
        }
        var errors = [];
        var result = [];
        for (var i = 0; i < input.length; i++) {
            var dec = resolver.resolve(input[i]);
            if (!dec.success) {
                if (resolver.type === 'object' || resolver.type === 'array') {
                    for (var i_1 = 0; i_1 < dec.error.length; i_1++) {
                        errors.push(i_1 + "." + dec.error[i_1]);
                    }
                }
                else {
                    errors.push(i + ": " + dec.error);
                }
            }
            result.push(dec.result);
        }
        return new Result_1.Result(errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}
exports.ArrayResolver = ArrayResolver;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(2);
var Resolver_1 = __webpack_require__(1);
var Result_1 = __webpack_require__(0);
function BooleanResolver() {
    return new Resolver_1.Resolver('boolean', function (input) {
        var error;
        if (!Util_1.Util.isBoolean(input)) {
            error = 'value is not a boolean';
        }
        return new Result_1.Result(!Util_1.Util.isDefAndNotNull(error), !!input, error);
    });
}
exports.BooleanResolver = BooleanResolver;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(2);
var SafeUtil_1 = __webpack_require__(3);
var Resolver_1 = __webpack_require__(1);
var Result_1 = __webpack_require__(0);
function NumberResolver() {
    return new Resolver_1.Resolver('number', function (input) {
        var error;
        if (!Util_1.Util.isNumber(input) || !isFinite(input)) {
            error = 'value is not a number';
        }
        return new Result_1.Result(!Util_1.Util.isDefAndNotNull(error), SafeUtil_1.SafeUtil.makeSafeNumber(input), error);
    });
}
exports.NumberResolver = NumberResolver;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(2);
var SafeUtil_1 = __webpack_require__(3);
var Resolver_1 = __webpack_require__(1);
var Result_1 = __webpack_require__(0);
function StringResolver() {
    return new Resolver_1.Resolver('string', function (input) {
        var error;
        if (!Util_1.Util.isString(input)) {
            error = 'value is not a string';
        }
        return new Result_1.Result(!Util_1.Util.isDefAndNotNull(error), SafeUtil_1.SafeUtil.makeSafeString(input), error);
    });
}
exports.StringResolver = StringResolver;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(2);
var SafeUtil_1 = __webpack_require__(3);
var Resolver_1 = __webpack_require__(1);
var Result_1 = __webpack_require__(0);
function ObjectResolver(resolver) {
    return new Resolver_1.Resolver('object', function (input) {
        if (!Util_1.Util.isObject(input)) {
            var safe = SafeUtil_1.SafeUtil.makeSafeObject(input);
            for (var key in resolver) {
                safe[key] = resolver[key].resolve(undefined).result;
            }
            return new Result_1.Result(false, safe, ['input is not an object']);
        }
        var errors = [];
        var result = {};
        for (var key in resolver) {
            var dec = resolver[key].resolve(input[key]);
            if (!dec.success) {
                if (resolver[key].type === 'object' || resolver[key].type === 'array') {
                    for (var i = 0; i < dec.error.length; i++) {
                        errors.push(key + "." + dec.error[i]);
                    }
                }
                else {
                    errors.push(key + ": " + dec.error);
                }
            }
            result[key] = dec.result;
        }
        return new Result_1.Result(errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}
exports.ObjectResolver = ObjectResolver;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = __webpack_require__(1);
var Result_1 = __webpack_require__(0);
function AnyResolver() {
    return new Resolver_1.Resolver('any', function (input) {
        return new Result_1.Result(true, input);
    });
}
exports.AnyResolver = AnyResolver;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(2);
var SafeUtil_1 = __webpack_require__(3);
var Resolver_1 = __webpack_require__(1);
var Result_1 = __webpack_require__(0);
function DictionaryResolver(resolver) {
    return new Resolver_1.Resolver('object', function (input) {
        if (!Util_1.Util.isObject(input)) {
            return new Result_1.Result(false, SafeUtil_1.SafeUtil.makeSafeObject(input), ['value is not an object']);
        }
        var errors = [];
        var result = {};
        for (var key in input) {
            var dec = resolver.resolve(input[key]);
            if (!dec.success) {
                if (resolver.type === 'object' || resolver.type === 'array') {
                    for (var i = 0; i < dec.error.length; i++) {
                        errors.push(key + "." + dec.error[i]);
                    }
                }
                else {
                    errors.push(key + ": " + dec.error);
                }
            }
            result[key] = dec.result;
        }
        return new Result_1.Result(errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}
exports.DictionaryResolver = DictionaryResolver;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = __webpack_require__(1);
var Result_1 = __webpack_require__(0);
function OneOfResolver(resolvers) {
    return new Resolver_1.Resolver('oneof', function (input) {
        var success = false;
        var result;
        for (var i = 0; i < resolvers.length; i++) {
            var dec = resolvers[i].resolve(input);
            if (dec.success) {
                success = true;
                result = dec.result;
                break;
            }
            result = dec.result;
        }
        ;
        var error;
        if (!success) {
            error = resolvers.map(function (r) { return r.type; }).join(' nor ');
        }
        return new Result_1.Result(success, result, error);
    });
}
exports.OneOfResolver = OneOfResolver;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(2);
var Resolver_1 = __webpack_require__(1);
var Result_1 = __webpack_require__(0);
function EnumResolver(definition) {
    return new Resolver_1.Resolver('enum', function (input) {
        var error;
        var result = 0;
        if (Util_1.Util.isArray(definition)) {
            if (definition.indexOf(input) > -1) {
                result = input;
            }
            else {
                error = 'value is not this enum\'s property';
                result = definition[0];
            }
        }
        else if (Util_1.Util.isObject(definition)) {
            if (Object.keys(definition).map(function (e) { return definition[e]; }).indexOf(input) > -1) {
                result = input;
            }
            else {
                error = 'value is not this enum\'s property';
                result = Util_1.Util.isDef(definition[0]) ? 0 : definition[Object.keys(definition)[0]];
            }
        }
        else {
            error = 'Enum definition is not valid';
        }
        return new Result_1.Result(!Util_1.Util.isDefAndNotNull(error), result, error);
    });
}
exports.EnumResolver = EnumResolver;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Array_1 = __webpack_require__(4);
exports.Array = Array_1.ArrayResolver;
var Array_2 = __webpack_require__(4);
exports.ArrayResolver = Array_2.ArrayResolver;
var Boolean_1 = __webpack_require__(5);
exports.Boolean = Boolean_1.BooleanResolver;
var Boolean_2 = __webpack_require__(5);
exports.BooleanResolver = Boolean_2.BooleanResolver;
var Number_1 = __webpack_require__(6);
exports.Number = Number_1.NumberResolver;
var Number_2 = __webpack_require__(6);
exports.NumberResolver = Number_2.NumberResolver;
var String_1 = __webpack_require__(7);
exports.String = String_1.StringResolver;
var String_2 = __webpack_require__(7);
exports.StringResolver = String_2.StringResolver;
var Object_1 = __webpack_require__(8);
exports.Object = Object_1.ObjectResolver;
var Object_2 = __webpack_require__(8);
exports.ObjectResolver = Object_2.ObjectResolver;
var Any_1 = __webpack_require__(9);
exports.Any = Any_1.AnyResolver;
var Any_2 = __webpack_require__(9);
exports.AnyResolver = Any_2.AnyResolver;
var Dictionary_1 = __webpack_require__(10);
exports.Dictionary = Dictionary_1.DictionaryResolver;
var Dictionary_2 = __webpack_require__(10);
exports.DictionaryResolver = Dictionary_2.DictionaryResolver;
var OneOf_1 = __webpack_require__(11);
exports.OneOf = OneOf_1.OneOfResolver;
var OneOf_2 = __webpack_require__(11);
exports.OneOfResolver = OneOf_2.OneOfResolver;
var Enum_1 = __webpack_require__(12);
exports.Enum = Enum_1.EnumResolver;
var Enum_2 = __webpack_require__(12);
exports.EnumResolver = Enum_2.EnumResolver;
var Resolver_1 = __webpack_require__(1);
exports.Resolver = Resolver_1.Resolver;
var Result_1 = __webpack_require__(0);
exports.Result = Result_1.Result;


/***/ })
/******/ ])));