const safetify = require('../..')

describe('Utilities', () => {
    
    describe('isDef()', () => {
        it('should return true if value is defined', () => {
            expect(safetify.util.isDef('something')).toBe(true);
        });

        it('should return false if value is not defined', () => {
            expect(safetify.util.isDef(undefined)).toBe(false);
        });

        it('should return true if value is null', () => {
            expect(safetify.util.isDef(null)).toBe(true);
        });
    });

    describe('isDefAndNotNull()', () => {
        it('should return true if value is defined', () => {
            expect(safetify.util.isDefAndNotNull('something')).toBe(true);
        });

        it('should return false if value is not defined', () => {
            expect(safetify.util.isDefAndNotNull(undefined)).toBe(false);
        });

        it('should return false if value is null', () => {
            expect(safetify.util.isDefAndNotNull(null)).toBe(false);
        });
    });

    describe('isNull()', () => {
        it('should return true if value is null', () => {
            expect(safetify.util.isNull(null)).toBe(true);
        });

        it('should return false if value is not a null', () => {
            expect(safetify.util.isNull('something')).toBe(false);
            expect(safetify.util.isNull(undefined)).toBe(false);
            expect(safetify.util.isNull(0)).toBe(false);
            expect(safetify.util.isNull(true)).toBe(false);
            expect(safetify.util.isNull([])).toBe(false);
            expect(safetify.util.isNull({})).toBe(false);
            expect(safetify.util.isNull(function () {})).toBe(false);
            expect(safetify.util.isNull(NaN)).toBe(false);
        });
    });

    describe('isString()', () => {
        it('should return true if value is string', () => {
            expect(safetify.util.isString('something')).toBe(true);
        });

        it('should return false if value is not a string', () => {
            expect(safetify.util.isString(null)).toBe(false);
            expect(safetify.util.isString(undefined)).toBe(false);
            expect(safetify.util.isString(0)).toBe(false);
            expect(safetify.util.isString(true)).toBe(false);
            expect(safetify.util.isString([])).toBe(false);
            expect(safetify.util.isString({})).toBe(false);
            expect(safetify.util.isString(function () {})).toBe(false);
            expect(safetify.util.isString(NaN)).toBe(false);
        });
    });
    
    describe('isBoolean()', () => {
        it('should return true if value is boolean', () => {
            expect(safetify.util.isBoolean(false)).toBe(true);
        });

        it('should return false if value is not a boolean', () => {
            expect(safetify.util.isBoolean(null)).toBe(false);
            expect(safetify.util.isBoolean(undefined)).toBe(false);
            expect(safetify.util.isBoolean(0)).toBe(false);
            expect(safetify.util.isBoolean('something')).toBe(false);
            expect(safetify.util.isBoolean([])).toBe(false);
            expect(safetify.util.isBoolean({})).toBe(false);
            expect(safetify.util.isBoolean(function () {})).toBe(false);
            expect(safetify.util.isBoolean(NaN)).toBe(false);
        });
    });

    describe('isNumber()', () => {
        it('should return true if value is number', () => {
            expect(safetify.util.isNumber(17)).toBe(true);
            expect(safetify.util.isNumber(NaN)).toBe(true);
        });

        it('should return false if value is not a number', () => {
            expect(safetify.util.isNumber(null)).toBe(false);
            expect(safetify.util.isNumber(undefined)).toBe(false);
            expect(safetify.util.isNumber('something')).toBe(false);
            expect(safetify.util.isNumber(true)).toBe(false);
            expect(safetify.util.isNumber([])).toBe(false);
            expect(safetify.util.isNumber({})).toBe(false);
            expect(safetify.util.isNumber(function () {})).toBe(false);
        });
    });

    describe('isPrimitive()', () => {
        it('should return true if value is primitive', () => {
            expect(safetify.util.isPrimitive('something')).toBe(true);
            expect(safetify.util.isPrimitive(23)).toBe(true);
            expect(safetify.util.isPrimitive(true)).toBe(true);
            expect(safetify.util.isPrimitive(null)).toBe(true);
            expect(safetify.util.isPrimitive(undefined)).toBe(true);
            expect(safetify.util.isPrimitive(Symbol())).toBe(true);
        });

        it('should return false if value is not primitive', () => {
            expect(safetify.util.isPrimitive([])).toBe(false);
            expect(safetify.util.isPrimitive({})).toBe(false);
            expect(safetify.util.isPrimitive(function () {})).toBe(false);
        });
    });

    describe('isArray()', () => {
        it('should return true if value is array', () => {
            expect(safetify.util.isArray([])).toBe(true);
        });

        it('should return false if value is not a array', () => {
            expect(safetify.util.isArray(null)).toBe(false);
            expect(safetify.util.isArray(undefined)).toBe(false);
            expect(safetify.util.isArray(0)).toBe(false);
            expect(safetify.util.isArray(true)).toBe(false);
            expect(safetify.util.isArray('something')).toBe(false);
            expect(safetify.util.isArray({})).toBe(false);
            expect(safetify.util.isArray(function () {})).toBe(false);
            expect(safetify.util.isArray(NaN)).toBe(false);
        });
    });

    describe('isArrayLike()', () => {
        it('should return true if value is array like', () => {
            expect(safetify.util.isArrayLike([])).toBe(true);
        });

        it('should return false if value is not a array like', () => {
            expect(safetify.util.isArrayLike(null)).toBe(false);
            expect(safetify.util.isArrayLike(undefined)).toBe(false);
            expect(safetify.util.isArrayLike(0)).toBe(false);
            expect(safetify.util.isArrayLike(true)).toBe(false);
            expect(safetify.util.isArrayLike('something')).toBe(false);
            expect(safetify.util.isArrayLike({})).toBe(false);
            expect(safetify.util.isArrayLike(function () {})).toBe(false);
            expect(safetify.util.isArrayLike(NaN)).toBe(false);
        });
    });

    describe('isObject()', () => {
        it('should return true if value is object', () => {
            expect(safetify.util.isObject({})).toBe(true);
            expect(safetify.util.isObject([])).toBe(true);
            expect(safetify.util.isObject(function () {})).toBe(true);
        });

        it('should return false if value is not a object', () => {
            expect(safetify.util.isObject(null)).toBe(false);
            expect(safetify.util.isObject(undefined)).toBe(false);
            expect(safetify.util.isObject(0)).toBe(false);
            expect(safetify.util.isObject(true)).toBe(false);
            expect(safetify.util.isObject('something')).toBe(false);
            expect(safetify.util.isObject(NaN)).toBe(false);
        });
    });
    
    describe('isDateLike()', () => {
        it('should return true if value is date like', () => {
            expect(safetify.util.isDateLike(new Date())).toBe(true);
        });

        it('should return false if value is not a date like', () => {
            expect(safetify.util.isDateLike(null)).toBe(false);
            expect(safetify.util.isDateLike(undefined)).toBe(false);
            expect(safetify.util.isDateLike(0)).toBe(false);
            expect(safetify.util.isDateLike(true)).toBe(false);
            expect(safetify.util.isDateLike('something')).toBe(false);
            expect(safetify.util.isDateLike({})).toBe(false);
            expect(safetify.util.isDateLike(function () {})).toBe(false);
            expect(safetify.util.isDateLike(NaN)).toBe(false);
        });
    });

    describe('isValidDate()', () => {
        it('should return true if value is valid date', () => {
            expect(safetify.util.isValidDate(new Date())).toBe(true);
            expect(safetify.util.isValidDate(123542)).toBe(true);
            expect(safetify.util.isValidDate('2014-01-01')).toBe(true);
        });

        it('should return false if value is not a valid date', () => {
            expect(safetify.util.isValidDate(null)).toBe(false);
            expect(safetify.util.isValidDate(undefined)).toBe(false);
            expect(safetify.util.isValidDate(true)).toBe(false);
            expect(safetify.util.isValidDate('something')).toBe(false);
            expect(safetify.util.isValidDate({})).toBe(false);
            expect(safetify.util.isValidDate(function () {})).toBe(false);
            expect(safetify.util.isValidDate(NaN)).toBe(false);
        });
    });

    describe('isFunction()', () => {
        it('should return true if value is function', () => {
            expect(safetify.util.isFunction(function () {})).toBe(true);
        });

        it('should return false if value is not a function', () => {
            expect(safetify.util.isFunction(null)).toBe(false);
            expect(safetify.util.isFunction(undefined)).toBe(false);
            expect(safetify.util.isFunction(0)).toBe(false);
            expect(safetify.util.isFunction(true)).toBe(false);
            expect(safetify.util.isFunction('something')).toBe(false);
            expect(safetify.util.isFunction(NaN)).toBe(false);
            expect(safetify.util.isFunction({})).toBe(false);
            expect(safetify.util.isFunction([])).toBe(false);
        });
    });

    describe('isDict()', () => {
        it('should return true if value is dictionary', () => {
            expect(safetify.util.isDict({})).toBe(true);
            expect(safetify.util.isDict({
                lol: 'lolz'
            })).toBe(true);
        });

        it('should return false if value is not a dictionary', () => {
            expect(safetify.util.isDict(null)).toBe(false);
            expect(safetify.util.isDict(undefined)).toBe(false);
            expect(safetify.util.isDict(0)).toBe(false);
            expect(safetify.util.isDict(true)).toBe(false);
            expect(safetify.util.isDict('something')).toBe(false);
            expect(safetify.util.isDict(NaN)).toBe(false);
            expect(safetify.util.isDict(function() {})).toBe(false,);
            expect(safetify.util.isDict(new (function() {}))).toBe(false);
            expect(safetify.util.isDict([])).toBe(false);
        });
    });
});