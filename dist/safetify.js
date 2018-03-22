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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Result; });
var Result = /** @class */ (function () {
    function Result(success, result, error) {
        this.success = success;
        this.result = result;
        this.error = error;
    }
    return Result;
}());



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Resolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_Util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Result__ = __webpack_require__(0);


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
                return new __WEBPACK_IMPORTED_MODULE_1__Result__["a" /* Result */](true, null);
            }
            else if (__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isDefAndNotNull(this.defaultValue)) {
                resolved.result = this.resolver(this.defaultValue).result;
            }
            else if (this.isNullable === true) {
                resolved.result = null;
            }
        }
        else if (!__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isDef(resolved.result) && this.isNullable === true) {
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



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Util; });
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



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafeUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(2);

var SafeUtil = /** @class */ (function () {
    function SafeUtil() {
    }
    SafeUtil.makeSafeString = function (val) {
        return __WEBPACK_IMPORTED_MODULE_0__Util__["a" /* Util */].isString(val) ? String(val) : '';
    };
    SafeUtil.makeSafeNumber = function (val, safeValue) {
        if (safeValue === void 0) { safeValue = NaN; }
        var parsed = parseInt(val);
        return isFinite(parsed) ? parsed : safeValue;
    };
    SafeUtil.makeSafeArray = function (val) {
        return __WEBPACK_IMPORTED_MODULE_0__Util__["a" /* Util */].isArray(val) ? val : [];
    };
    SafeUtil.makeSafeObject = function (val) {
        return __WEBPACK_IMPORTED_MODULE_0__Util__["a" /* Util */].isObject(val) ? val : {};
    };
    return SafeUtil;
}());



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resolvers_Array__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Array", function() { return __WEBPACK_IMPORTED_MODULE_0__resolvers_Array__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resolvers_Boolean__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Boolean", function() { return __WEBPACK_IMPORTED_MODULE_1__resolvers_Boolean__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resolvers_Number__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Number", function() { return __WEBPACK_IMPORTED_MODULE_2__resolvers_Number__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resolvers_String__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "String", function() { return __WEBPACK_IMPORTED_MODULE_3__resolvers_String__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resolvers_Object__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Object", function() { return __WEBPACK_IMPORTED_MODULE_4__resolvers_Object__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resolvers_Any__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Any", function() { return __WEBPACK_IMPORTED_MODULE_5__resolvers_Any__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__resolvers_DynamicObject__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicObject", function() { return __WEBPACK_IMPORTED_MODULE_6__resolvers_DynamicObject__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__resolvers_OneOf__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "OneOf", function() { return __WEBPACK_IMPORTED_MODULE_7__resolvers_OneOf__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__resolvers_Enum__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Enum", function() { return __WEBPACK_IMPORTED_MODULE_8__resolvers_Enum__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Resolver__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Resolver", function() { return __WEBPACK_IMPORTED_MODULE_9__Resolver__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Result__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Result", function() { return __WEBPACK_IMPORTED_MODULE_10__Result__["a"]; });













/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ArrayResolver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_Util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_SafeUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Resolver__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Result__ = __webpack_require__(0);




function ArrayResolver(resolver) {
    return new __WEBPACK_IMPORTED_MODULE_2__Resolver__["a" /* Resolver */]('array', function (input) {
        if (!__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isArray(input)) {
            return new __WEBPACK_IMPORTED_MODULE_3__Result__["a" /* Result */](false, __WEBPACK_IMPORTED_MODULE_1__Utils_SafeUtil__["a" /* SafeUtil */].makeSafeArray(input), ['value is not an array']);
        }
        var errors = [];
        var result = [];
        input.forEach(function (value, index) {
            var dec = resolver.resolve(value);
            if (!dec.success) {
                if (resolver.type === 'object' || resolver.type === 'array') {
                    dec.error.forEach(function (error) {
                        errors.push(index + "." + error);
                    });
                }
                else {
                    errors.push(index + " index: " + dec.error);
                }
            }
            result.unshift(dec.result);
        });
        return new __WEBPACK_IMPORTED_MODULE_3__Result__["a" /* Result */](errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooleanResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_Util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Resolver__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Result__ = __webpack_require__(0);



var BooleanResolver = new __WEBPACK_IMPORTED_MODULE_1__Resolver__["a" /* Resolver */]('boolean', function (input) {
    var error;
    if (!__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isBoolean(input)) {
        error = 'value is not a boolean';
    }
    return new __WEBPACK_IMPORTED_MODULE_2__Result__["a" /* Result */](!__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isDefAndNotNull(error), !!input, error);
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_Util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_SafeUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Resolver__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Result__ = __webpack_require__(0);




var NumberResolver = new __WEBPACK_IMPORTED_MODULE_2__Resolver__["a" /* Resolver */]('number', function (input) {
    var error;
    if (!__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isNumber(input)) {
        error = 'value is not a number';
    }
    return new __WEBPACK_IMPORTED_MODULE_3__Result__["a" /* Result */](!__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isDefAndNotNull(error), __WEBPACK_IMPORTED_MODULE_1__Utils_SafeUtil__["a" /* SafeUtil */].makeSafeNumber(input), error);
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_Util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_SafeUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Resolver__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Result__ = __webpack_require__(0);




var StringResolver = new __WEBPACK_IMPORTED_MODULE_2__Resolver__["a" /* Resolver */]('string', function (input) {
    var error;
    if (!__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isString(input)) {
        error = 'value is not a string';
    }
    return new __WEBPACK_IMPORTED_MODULE_3__Result__["a" /* Result */](!__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isDefAndNotNull(error), __WEBPACK_IMPORTED_MODULE_1__Utils_SafeUtil__["a" /* SafeUtil */].makeSafeString(input), error);
});


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectResolver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_Util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_SafeUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Resolver__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Result__ = __webpack_require__(0);




function ObjectResolver(resolver) {
    return new __WEBPACK_IMPORTED_MODULE_2__Resolver__["a" /* Resolver */]('object', function (input) {
        if (!__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isObject(input)) {
            var safe = __WEBPACK_IMPORTED_MODULE_1__Utils_SafeUtil__["a" /* SafeUtil */].makeSafeObject(input);
            for (var key in resolver) {
                safe[key] = resolver[key].resolve(undefined).result;
            }
            return new __WEBPACK_IMPORTED_MODULE_3__Result__["a" /* Result */](false, safe, ['value is not an object']);
        }
        var errors = [];
        var result = {};
        var _loop_1 = function (key) {
            var resolve = resolver[key].resolve(input[key]);
            if (!resolve.success) {
                if (resolver[key].type === 'object' || resolver[key].type === 'array') {
                    resolve.error.forEach(function (error) {
                        errors.push(key + "." + error);
                    });
                }
                else {
                    errors.push(key + ": " + resolve.error);
                }
            }
            result[key] = resolve.result;
        };
        for (var key in resolver) {
            _loop_1(key);
        }
        return new __WEBPACK_IMPORTED_MODULE_3__Result__["a" /* Result */](errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnyResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Resolver__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Result__ = __webpack_require__(0);


var AnyResolver = new __WEBPACK_IMPORTED_MODULE_0__Resolver__["a" /* Resolver */]('any', function (input) {
    return new __WEBPACK_IMPORTED_MODULE_1__Result__["a" /* Result */](true, input);
});


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DynamicObjectResolver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_Util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_SafeUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Resolver__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Result__ = __webpack_require__(0);




function DynamicObjectResolver(resolver) {
    return new __WEBPACK_IMPORTED_MODULE_2__Resolver__["a" /* Resolver */]('object', function (input) {
        if (!__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isObject(input)) {
            return new __WEBPACK_IMPORTED_MODULE_3__Result__["a" /* Result */](false, __WEBPACK_IMPORTED_MODULE_1__Utils_SafeUtil__["a" /* SafeUtil */].makeSafeObject(input), ['value is not an object']);
        }
        var errors = [];
        var result = {};
        var _loop_1 = function (key) {
            var Resolve = resolver.resolve(input[key]);
            if (!Resolve.success) {
                if (resolver.type === 'object' || resolver.type === 'array') {
                    Resolve.error.forEach(function (error) {
                        errors.push(key + "." + error);
                    });
                }
                else {
                    errors.push(key + ": " + Resolve.error);
                }
            }
            result[key] = Resolve.result;
        };
        for (var key in input) {
            _loop_1(key);
        }
        return new __WEBPACK_IMPORTED_MODULE_3__Result__["a" /* Result */](errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = OneOfResolver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Resolver__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Result__ = __webpack_require__(0);


function OneOfResolver(resolvers) {
    return new __WEBPACK_IMPORTED_MODULE_0__Resolver__["a" /* Resolver */]('oneof', function (input) {
        var errors = [];
        var result;
        for (var key in resolvers) {
            var dec = resolvers[key].resolve(input);
            if (dec.success) {
                result = dec.result;
                break;
            }
            else if (!dec.success) {
                errors.push(resolvers[key].type);
                if (key.toString() === '0') {
                    result = dec.result;
                }
            }
        }
        resolvers.forEach(function (resolver, index) {
            var dec = resolver.resolve(input);
            if (!dec.success) {
                errors.push(resolver.type);
            }
            else {
                result;
            }
        });
        return new __WEBPACK_IMPORTED_MODULE_1__Result__["a" /* Result */](errors.length == 0, result, errors.length > 0 ? 'value is not ' + errors.join(' nor ') : undefined);
    });
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = EnumResolver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_Util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Resolver__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Result__ = __webpack_require__(0);



function EnumResolver(definition) {
    return new __WEBPACK_IMPORTED_MODULE_1__Resolver__["a" /* Resolver */]('enum', function (input) {
        var error;
        var result = 0;
        if (__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isArray(definition)) {
            if (definition.indexOf(input) > -1) {
                result = input;
            }
            else {
                error = 'value is not this enum\'s property';
                result = definition[0];
            }
        }
        else if (__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isObject(definition)) {
            if (Object.keys(definition).map(function (e) { return definition[e]; }).indexOf(input) > -1) {
                result = input;
            }
            else {
                error = 'value is not this enum\'s property';
                result = definition[0];
            }
        }
        else {
            error = 'Enum definition is not valid';
        }
        return new __WEBPACK_IMPORTED_MODULE_2__Result__["a" /* Result */](!__WEBPACK_IMPORTED_MODULE_0__Utils_Util__["a" /* Util */].isDefAndNotNull(error), result, error);
    });
}


/***/ })
/******/ ])));