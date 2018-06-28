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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Based on Closure Library's Goog Functions by Google
 * https://github.com/google/closure-library
 */
var Util = /** @class */ (function () {
    function Util() {
    }
    /**
     * Returns true if the specified value is defined.
     * @param val Variable to test.
     */
    Util.isDef = function (val) {
        return val !== void 0;
    };
    /**
     * Returns true if the specified value is defined and not null.
     * @param val Variable to test.
     */
    Util.isDefAndNotNull = function (val) {
        return val != null;
    };
    /**
     * Returns true if the specified value is null.
     * @param val Vaiable to test.
     */
    Util.isNull = function (val) {
        return val === null;
    };
    /**
     * Returns true if the specified value is a string.
     * @param {?} val Variable to test.
     */
    Util.isString = function (val) {
        return typeof val == 'string';
    };
    /**
     * Returns true if the specified value is a boolean.
     * @param {?} val Variable to test.
     */
    Util.isBoolean = function (val) {
        return typeof val == 'boolean';
    };
    /**
     * Returns true if the specified value is a number.
     * @param val Variable to test.
     */
    Util.isNumber = function (val) {
        return typeof val == 'number';
    };
    /**
     * Returns true if the specified value is string, number, boolean, undefined, null or symbol
     * @param val Variable to test.
     */
    Util.isPrimitive = function (val) {
        return this.isString(val) || this.isNumber(val) || this.isBoolean(val) || !this.isDef(val) || this.isNull(val) || typeof val === 'symbol';
    };
    /**
     * Returns true if the specified value is an array.
     * @param val Variable to test.
     */
    Util.isArray = function (val) {
        return this._typeOf(val) == 'array';
    };
    /**
     * Returns true if the object looks like an array. To qualify as array like
     * the value needs to be either a NodeList or an object with a Number length
     * property. Note that for this function neither strings nor functions are
     * considered "array-like".
     *
     * @param val Variable to test.
     */
    Util.isArrayLike = function (val) {
        var type = this._typeOf(val);
        return type == 'array' || type == 'object' && typeof val.length == 'number';
    };
    /**
     * Returns true if the specified value is an object.  This includes arrays and
     * functions.
     * @param val Variable to test.
     */
    Util.isObject = function (val) {
        var type = typeof val;
        return type == 'object' && val != null || type == 'function';
    };
    /**
     * Returns true if the object looks like a Date. To qualify as Date-like the
     * value needs to be an object and have a getFullYear() function.
     * @param val Variable to test.
     */
    Util.isDateLike = function (val) {
        return this.isObject(val) && typeof val.getFullYear == 'function';
    };
    /**
     * Returns true if the specified value is a valid date (can be string,
     * unix timestamp but also custom library like Moment)
     * @param val Variable to test
     */
    Util.isValidDate = function (val) {
        return this.isDefAndNotNull(val) && !this.isBoolean(val) && !isNaN(+new Date(val));
    };
    /**
     * Returns true if the specified value is a function.
     * @param val Variable to test.
     */
    Util.isFunction = function (val) {
        return this._typeOf(val) == 'function';
    };
    /**
     * Returns true if the specified value is a dictionary typed object. This means that object is created
     * only to be a storage without any logic
     * @param val Variable to test
     */
    Util.isDict = function (val) {
        return this.isObject(val) && val.constructor === Object;
    };
    /**
     * @hidden
     * This is a "fixed" version of the typeof operator.  It differs from the typeof
     * operator in such a way that null returns 'null' and arrays return 'array'.
     * @param val The value to get the type of.
     */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Resolver's result representation
 */
var Result = /** @class */ (function () {
    /**
     *
     * @param success true if data is successfuly resolved, false otherwise
     * @param result resolved data
     * @param error has error(s) if resolving failed
     */
    function Result(success, result, error) {
        this.success = success;
        this.result = result;
        this.error = error;
    }
    return Result;
}());
exports.Result = Result;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(0);
var Result_1 = __webpack_require__(1);
/**
 * Base resolver class
 */
var Resolver = /** @class */ (function () {
    /**
     *
     * @param type Type of data resolver handles
     * @param resolver Function that resolves given data
     */
    function Resolver(type, 
    /**
     * @hidden
     */
    resolver) {
        this.type = type;
        this.resolver = resolver;
        /**
         * @hidden
         */
        this.isNullable = false;
    }
    /**
     * Resolves given data
     * @param input Data to be resolved
     */
    Resolver.prototype.resolve = function (input) {
        var resolved = this.resolver(input);
        if (!resolved.success) {
            if (this.isNullable === true && input === null) {
                return new Result_1.Result(true, null, null);
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
    /**
     * Whether data can be nullable. If yes, resolver returns success when given data is null or returns null when given data is not validated properly
     * @example
     * <caption>
     * StringResolver().nullable().resolve('John Doe');
     * // returns 'John Doe'
     *
     * StringResolver().nullable().resolve(null);
     * // returns null without any errors
     *
     * StringResolver().nullable().resolve(undefined);
     * // returns null with false success and input type error
     * </caption>
     */
    Resolver.prototype.nullable = function () {
        this.isNullable = true;
        return this;
    };
    return Resolver;
}());
exports.Resolver = Resolver;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(0);
/**
 * @hidden
 */
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

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = __webpack_require__(2);
var Result_1 = __webpack_require__(1);
var Util_1 = __webpack_require__(0);
var ResolverUtil_1 = __webpack_require__(18);
var SimpleTypeResolver = /** @class */ (function (_super) {
    __extends(SimpleTypeResolver, _super);
    function SimpleTypeResolver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @hidden
         */
        _this._constraints = [];
        return _this;
    }
    /**
     * Sets default value which will be returned in case of fail validation
     * @param val default value
     * @example
     * <caption>
     * enum TestEnum {
     *    opt1 = 'option 1',
     *    opt2 = 'option 2'
     * }
     *
     * EnumResolver<TestEnum\>(TestEnum).defaultsTo('option 1').resolve('option 2');
     * // returns 'option 2'
     *
     * EnumResolver<TestEnum\>(TestEnum).defaultsTo('option 1').resolve('option 3');
     * // returns default value which is 'option 1'
     * </caption>
     */
    SimpleTypeResolver.prototype.defaultsTo = function (val) {
        this._defaultValue = _super.prototype.resolve.call(this, val);
        return this;
    };
    /**
     * Adds constraint to resolver to check for specified data range (eg. only positive numbers, strings under specific length etc.)
     * @param cond condition to check
     * @param defaultValue optional default value or transform function to use in case input is not valid under set condition
     * @example
     * <caption>
     * NumberResolver().constraint((n: number) => n >= 0).resolve(5);
     * // returns 5
     *
     * NumberResolver().constraint((n: number) => n >= 0).resolve(-5);
     * // returns -5 with error that constraint failed
     *
     * NumberResolver().constraint((n: number) => n >= 0 || 'Value is not positive').resolve(-5);
     * // returns -5 with custom constraint error
     *
     * NumberResolver().constraint((n: number) => n >= 0, 0).resolve(-5);
     * // returns default constraint's value, in this case 0
     *
     * NumberResolver().constraint((n: number) => n >= 0, (n: number) => Math.abs(n)).resolve(-5);
     * // returns transformed value into that proposed by transform function, in this case 5
     * </caption>
     */
    SimpleTypeResolver.prototype.constraint = function (cond, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var con = {
            condition: cond,
            defaultValue: null
        };
        if (Util_1.Util.isDefAndNotNull(defaultValue)) {
            con.defaultValue = defaultValue;
        }
        this._constraints.push(con);
        return this;
    };
    /**
     * @hidden
     */
    SimpleTypeResolver.prototype.resolveConstraints = function (input) {
        var len = this._constraints.length;
        var errors = [];
        var value = input;
        for (var i = 0; i < len; i++) {
            var result = this._constraints[i].condition(value);
            if (result !== true) {
                if (Util_1.Util.isString(result)) {
                    errors.push(result);
                }
                else {
                    errors.push("constraint #" + i + " failed");
                }
                if (Util_1.Util.isDefAndNotNull(this._constraints[i].defaultValue)) {
                    if (Util_1.Util.isFunction(this._constraints[i].defaultValue)) {
                        var defResult = _super.prototype.resolve.call(this, this._constraints[i].defaultValue(value));
                        value = defResult.result;
                        if (!defResult.success) {
                            errors.push("Constraint default value: " + defResult.error);
                        }
                    }
                    else {
                        var defResult = _super.prototype.resolve.call(this, this._constraints[i].defaultValue);
                        value = defResult.result;
                        if (!defResult.success) {
                            errors.push("Constraint default value: " + defResult.error);
                        }
                    }
                }
            }
        }
        return new Result_1.Result(errors.length == 0, value, errors.length > 0 ? errors : null);
    };
    /**
     * @hidden
     */
    SimpleTypeResolver.prototype.resolve = function (input) {
        var resolved = _super.prototype.resolve.call(this, input);
        if (!resolved.success && Util_1.Util.isDef(this._defaultValue)) {
            if (!this._defaultValue.success) {
                resolved.error = ResolverUtil_1.ResolverUtil.mergeErrors(resolved.error, "DefaultValue: " + this._defaultValue.error);
            }
            else if (this._defaultValue.success) {
                resolved.result = this._defaultValue.result;
            }
        }
        if (resolved.success && this._constraints.length > 0) {
            resolved = this.resolveConstraints(resolved.result);
        }
        return resolved;
    };
    return SimpleTypeResolver;
}(Resolver_1.Resolver));
exports.SimpleTypeResolver = SimpleTypeResolver;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(0);
var SafeUtil_1 = __webpack_require__(3);
var ArrayResolver_1 = __webpack_require__(16);
var Result_1 = __webpack_require__(1);
/**
 * Resolves array of given type
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * ArrayResolver<string\>(StringResolver()).resolve(['John', 'Doe']);
 * // returns ['John', 'Doe']
 *
 * ArrayResolver<string\>(StringResolver()).resolve(['John', 5434]);
 * // returns ['John', '']
 * </caption>
 */
function ArrayResolver(resolver) {
    return new ArrayResolver_1.ArrayResolver(function (input) {
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
        return new Result_1.Result(errors.length == 0, result, errors.length > 0 ? errors : null);
    });
}
exports.ArrayResolver = ArrayResolver;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(0);
var BooleanResolver_1 = __webpack_require__(17);
var Result_1 = __webpack_require__(1);
/**
 * Resolves given data to boolean type
 * @example
 * <caption>
 * BooleanResolver().resolve(true);
 * // returns true
 *
 * BooleanResolver().resolve('im boolean');
 * // output will be converted input to boolean, in this case true
 * </caption>
 */
function BooleanResolver() {
    return new BooleanResolver_1.BooleanResolver(function (input) {
        var error = null;
        if (!Util_1.Util.isBoolean(input)) {
            error = 'value is not a boolean';
        }
        return new Result_1.Result(!Util_1.Util.isDefAndNotNull(error), !!input, error);
    });
}
exports.BooleanResolver = BooleanResolver;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(0);
var SafeUtil_1 = __webpack_require__(3);
var NumberResolver_1 = __webpack_require__(19);
var Result_1 = __webpack_require__(1);
/**
 * Resolves given data to number type
 * @example
 * <caption>
 * NumberResolver().resolve(5);
 * // returns 5
 *
 * NumberResolver().resolve('');
 * // returns NaN
 * </caption>
 */
function NumberResolver() {
    return new NumberResolver_1.NumberResolver(function (input) {
        var error = null;
        if (!Util_1.Util.isNumber(input) || !isFinite(input)) {
            error = 'value is not a number';
        }
        return new Result_1.Result(!Util_1.Util.isDefAndNotNull(error), SafeUtil_1.SafeUtil.makeSafeNumber(input), error);
    });
}
exports.NumberResolver = NumberResolver;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(0);
var SafeUtil_1 = __webpack_require__(3);
var Result_1 = __webpack_require__(1);
var StringResolver_1 = __webpack_require__(20);
/**
 * Resolves given data to string type
 * @example
 * <caption>
 * StringResolver().resolve('john doe');
 * // returns 'john doe'
 *
 * StringResolver().resolve(3842);
 * // returns ''
 * </caption>
 */
function StringResolver() {
    return new StringResolver_1.StringResolver(function (input) {
        var error = null;
        if (!Util_1.Util.isString(input)) {
            error = 'value is not a string';
        }
        return new Result_1.Result(!Util_1.Util.isDefAndNotNull(error), SafeUtil_1.SafeUtil.makeSafeString(input), error);
    });
}
exports.StringResolver = StringResolver;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(0);
var SafeUtil_1 = __webpack_require__(3);
var ObjectResolver_1 = __webpack_require__(21);
var Result_1 = __webpack_require__(1);
/**
 * Resolves object of given structure
 * @param resolver Structure of object filled with resolvers
 * @example
 * <caption>
 * ObjectResolver<IPerson>({
 *   name: StringResolver(),
 *   surname: StringResolver(),
 *   age: NumberResolver(),
 * }).resolve({ name: 'John', surname: 'Doe', age: 56 });
 * // returns { name: 'John', surname: 'Doe', age: 56 }
 *
 * ObjectResolver<IPerson>({
 *   name: StringResolver(),
 *   surname: StringResolver(),
 *   age: NumberResolver(),
 * }).resolve({ name: 'John', surname: false, age: 56 });
 * // returns { name: 'John', surname: '', age: 56 }
 * </caption>
 */
function ObjectResolver(resolver) {
    return new ObjectResolver_1.ObjectResolver(function (input) {
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
        return new Result_1.Result(errors.length == 0, result, errors.length > 0 ? errors : null);
    });
}
exports.ObjectResolver = ObjectResolver;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AnyResolver_1 = __webpack_require__(22);
var Result_1 = __webpack_require__(1);
/**
 * Always return given data in unchanged form
 * @example
 * <caption>
 * AnyResolver().resolve('input of any type');
 * // returns 'input of any type'
 *
 * AnyResolver().resolve(undefined);
 * // returns undefined
 * </caption>
 */
function AnyResolver() {
    return new AnyResolver_1.AnyResolver(function (input) {
        return new Result_1.Result(true, input, null);
    });
}
exports.AnyResolver = AnyResolver;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(0);
var SafeUtil_1 = __webpack_require__(3);
var DictionaryResolver_1 = __webpack_require__(23);
var Result_1 = __webpack_require__(1);
/**
 * Resolves dictionary object of given type
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * DictionaryResolver<string\>(StringResolver()).resolve({ name: 'John', surname: 'Doe' });
 * // returns { name: 'John', surname: 'Doe' }
 *
 * DictionaryResolver<string\>(StringResolver()).resolve({ name: 'John', surname: 5434 });
 * // returns { name: 'John', surname: '' }
 * </caption>
 */
function DictionaryResolver(resolver) {
    return new DictionaryResolver_1.DictionaryResolver(function (input) {
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
        return new Result_1.Result(errors.length == 0, result, errors.length > 0 ? errors : null);
    });
}
exports.DictionaryResolver = DictionaryResolver;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OneOfResolver_1 = __webpack_require__(24);
var Result_1 = __webpack_require__(1);
/**
 * Resolves input data to first matched type
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * OneOfResolver<string | number\>([ StringResolver(), NumberResolver() ]).resolve('john doe');
 * OneOfResolver<string | number\>([ StringResolver(), NumberResolver() ]).resolve(3473);
 * // output will be the same as input
 *
 * OneOfResolver<string | number\>([ StringResolver(), NumberResolver() ]).resolve(false);
 * // output will be converted to last mentioned type in array of resolvers, in this case 'NaN'
 * </caption>
 */
function OneOfResolver(resolvers) {
    return new OneOfResolver_1.OneOfResolver(function (input) {
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
        var error = null;
        if (!success) {
            error = resolvers.map(function (r) { return r.type; }).join(' nor ');
        }
        return new Result_1.Result(success, result, error);
    });
}
exports.OneOfResolver = OneOfResolver;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(0);
var EnumResolver_1 = __webpack_require__(25);
var Result_1 = __webpack_require__(1);
/**
 * Resolves enum
 * @param definition enum representation in array, object or passed TypeScript's enum declaration
 * @example
 * <caption>
 * // Array representation
 * EnumResolver([ 'option1', 'option2', 'option3' ]).resolve('option1');
 *
 * // Object representation
 * EnumResolver({ opt1: 'option1', opt2: 'option2', opt3: 'option3' }).resolve('option1');
 *
 * // TypeScript's enum
 * EnumResolver<someEnum>(someEnum).resolve('option1');
 *
 * // output will be the same as input
 *
 * EnumResolver<someEnum>(someEnum).resolve('option4');
 * // output will be the first enum item, in this case 'option1'
 * </caption>
 */
function EnumResolver(definition) {
    return new EnumResolver_1.EnumResolver(function (input) {
        var error = null;
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(0);
var DateResolver_1 = __webpack_require__(26);
var Result_1 = __webpack_require__(1);
/**
 * Resolves given data to date type
 * @example
 * <caption>
 * DateResolver().resolve(1523742351657);
 * // returns Date 2018-04-14T21:45:51.657Z
 *
 * DateResolver().resolve('2018-04-14 21:45');
 * // returns Date 2018-04-14T19:45:00.000Z
 *
 * DateResolver().resolve('im boolean');
 * DateResolver().resolve(true);
 * // returns Date 1970-01-01T00:00:00.000Z
 * </caption>
 */
function DateResolver() {
    return new DateResolver_1.DateResolver(function (input) {
        var success = true;
        var date = new Date(0);
        var error = null;
        if (Util_1.Util.isDateLike(input)) {
            date = input;
        }
        else if (Util_1.Util.isNumber(input) || Util_1.Util.isString(input)) {
            var testDate = new Date(input);
            if (!isNaN(testDate.getTime())) {
                date = testDate;
            }
            else {
                success = false;
            }
        }
        else {
            success = false;
        }
        if (!success) {
            error = 'value is not a valid date';
        }
        return new Result_1.Result(!Util_1.Util.isDefAndNotNull(error), date, error);
    });
}
exports.DateResolver = DateResolver;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Array_1 = __webpack_require__(5);
exports.Array = Array_1.ArrayResolver;
var Array_2 = __webpack_require__(5);
exports.ArrayResolver = Array_2.ArrayResolver;
var Boolean_1 = __webpack_require__(6);
exports.Boolean = Boolean_1.BooleanResolver;
var Boolean_2 = __webpack_require__(6);
exports.BooleanResolver = Boolean_2.BooleanResolver;
var Number_1 = __webpack_require__(7);
exports.Number = Number_1.NumberResolver;
var Number_2 = __webpack_require__(7);
exports.NumberResolver = Number_2.NumberResolver;
var String_1 = __webpack_require__(8);
exports.String = String_1.StringResolver;
var String_2 = __webpack_require__(8);
exports.StringResolver = String_2.StringResolver;
var Object_1 = __webpack_require__(9);
exports.Object = Object_1.ObjectResolver;
var Object_2 = __webpack_require__(9);
exports.ObjectResolver = Object_2.ObjectResolver;
var Any_1 = __webpack_require__(10);
exports.Any = Any_1.AnyResolver;
var Any_2 = __webpack_require__(10);
exports.AnyResolver = Any_2.AnyResolver;
var Dictionary_1 = __webpack_require__(11);
exports.Dictionary = Dictionary_1.DictionaryResolver;
var Dictionary_2 = __webpack_require__(11);
exports.DictionaryResolver = Dictionary_2.DictionaryResolver;
var OneOf_1 = __webpack_require__(12);
exports.OneOf = OneOf_1.OneOfResolver;
var OneOf_2 = __webpack_require__(12);
exports.OneOfResolver = OneOf_2.OneOfResolver;
var Enum_1 = __webpack_require__(13);
exports.Enum = Enum_1.EnumResolver;
var Enum_2 = __webpack_require__(13);
exports.EnumResolver = Enum_2.EnumResolver;
var Date_1 = __webpack_require__(14);
exports.Date = Date_1.DateResolver;
var Date_2 = __webpack_require__(14);
exports.DateResolver = Date_2.DateResolver;
var Resolver_1 = __webpack_require__(2);
exports.Resolver = Resolver_1.Resolver;
var Result_1 = __webpack_require__(1);
exports.Result = Result_1.Result;
var Util_1 = __webpack_require__(0);
exports.util = Util_1.Util;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = __webpack_require__(2);
var ArrayResolver = /** @class */ (function (_super) {
    __extends(ArrayResolver, _super);
    /**
     * @hidden
     */
    function ArrayResolver(resolver) {
        return _super.call(this, 'array', resolver) || this;
    }
    return ArrayResolver;
}(Resolver_1.Resolver));
exports.ArrayResolver = ArrayResolver;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleTypeResolver_1 = __webpack_require__(4);
var BooleanResolver = /** @class */ (function (_super) {
    __extends(BooleanResolver, _super);
    /**
     * @hidden
     */
    function BooleanResolver(resolver) {
        return _super.call(this, 'boolean', resolver) || this;
    }
    return BooleanResolver;
}(SimpleTypeResolver_1.SimpleTypeResolver));
exports.BooleanResolver = BooleanResolver;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(0);
var ResolverUtil = /** @class */ (function () {
    function ResolverUtil() {
    }
    ResolverUtil.mergeErrors = function (source1, source2) {
        if (Util_1.Util.isString(source1) && Util_1.Util.isString(source2)) {
            return [source1, source2];
        }
        else if (Util_1.Util.isString(source1) && Util_1.Util.isArray(source2)) {
            return [source1].concat(source2);
        }
        else if (Util_1.Util.isArray(source1) && Util_1.Util.isString(source2)) {
            return source1.concat([source2]);
        }
        else if (Util_1.Util.isArray(source1) && Util_1.Util.isArray(source2)) {
            return source1.concat(source2);
        }
    };
    return ResolverUtil;
}());
exports.ResolverUtil = ResolverUtil;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleTypeResolver_1 = __webpack_require__(4);
var NumberResolver = /** @class */ (function (_super) {
    __extends(NumberResolver, _super);
    /**
     * @hidden
     */
    function NumberResolver(resolver) {
        return _super.call(this, 'number', resolver) || this;
    }
    return NumberResolver;
}(SimpleTypeResolver_1.SimpleTypeResolver));
exports.NumberResolver = NumberResolver;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleTypeResolver_1 = __webpack_require__(4);
var StringResolver = /** @class */ (function (_super) {
    __extends(StringResolver, _super);
    /**
     * @hidden
     */
    function StringResolver(resolver) {
        return _super.call(this, 'string', resolver) || this;
    }
    return StringResolver;
}(SimpleTypeResolver_1.SimpleTypeResolver));
exports.StringResolver = StringResolver;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = __webpack_require__(2);
var ObjectResolver = /** @class */ (function (_super) {
    __extends(ObjectResolver, _super);
    /**
     * @hidden
     */
    function ObjectResolver(resolver) {
        return _super.call(this, 'object', resolver) || this;
    }
    return ObjectResolver;
}(Resolver_1.Resolver));
exports.ObjectResolver = ObjectResolver;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AnyResolver = /** @class */ (function () {
    /**
     * @hidden
     */
    function AnyResolver(
    /**
     * @hidden
     */
    resolver) {
        this.resolver = resolver;
    }
    /**
     * Resolves given data
     * @param input Data to be resolved
     */
    AnyResolver.prototype.resolve = function (input) {
        return this.resolver(input);
    };
    return AnyResolver;
}());
exports.AnyResolver = AnyResolver;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = __webpack_require__(2);
var DictionaryResolver = /** @class */ (function (_super) {
    __extends(DictionaryResolver, _super);
    /**
     * @hidden
     */
    function DictionaryResolver(resolver) {
        return _super.call(this, 'object', resolver) || this;
    }
    return DictionaryResolver;
}(Resolver_1.Resolver));
exports.DictionaryResolver = DictionaryResolver;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = __webpack_require__(2);
var OneOfResolver = /** @class */ (function (_super) {
    __extends(OneOfResolver, _super);
    /**
     * @hidden
     */
    function OneOfResolver(resolver) {
        return _super.call(this, 'oneof', resolver) || this;
    }
    return OneOfResolver;
}(Resolver_1.Resolver));
exports.OneOfResolver = OneOfResolver;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = __webpack_require__(2);
var EnumResolver = /** @class */ (function (_super) {
    __extends(EnumResolver, _super);
    /**
     * @hidden
     */
    function EnumResolver(resolver) {
        return _super.call(this, 'enum', resolver) || this;
    }
    return EnumResolver;
}(Resolver_1.Resolver));
exports.EnumResolver = EnumResolver;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = __webpack_require__(2);
var DateResolver = /** @class */ (function (_super) {
    __extends(DateResolver, _super);
    /**
     * @hidden
     */
    function DateResolver(resolver) {
        return _super.call(this, 'date', resolver) || this;
    }
    return DateResolver;
}(Resolver_1.Resolver));
exports.DateResolver = DateResolver;


/***/ })
/******/ ])));