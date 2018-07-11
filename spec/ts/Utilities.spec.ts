import { util } from '../..';

describe('Utilities', () => {
    
    describe('isDef()', () => {
        it('should return true if value is defined', () => {
            expect(util.isDef('something')).toBe(true);
        });

        it('should return false if value is not defined', () => {
            expect(util.isDef(undefined)).toBe(false);
        });

        it('should return true if value is null', () => {
            expect(util.isDef(null)).toBe(true);
        });
    });

    describe('isDefAndNotNull()', () => {
        it('should return true if value is defined', () => {
            expect(util.isDefAndNotNull('something')).toBe(true);
        });

        it('should return false if value is not defined', () => {
            expect(util.isDefAndNotNull(undefined)).toBe(false);
        });

        it('should return false if value is null', () => {
            expect(util.isDefAndNotNull(null)).toBe(false);
        });
    });

    describe('isNull()', () => {
        it('should return true if value is null', () => {
            expect(util.isNull(null)).toBe(true);
        });

        it('should return false if value is not a null', () => {
            expect(util.isNull('something')).toBe(false);
            expect(util.isNull(undefined)).toBe(false);
            expect(util.isNull(0)).toBe(false);
            expect(util.isNull(true)).toBe(false);
            expect(util.isNull([])).toBe(false);
            expect(util.isNull({})).toBe(false);
            expect(util.isNull(function () {})).toBe(false);
            expect(util.isNull(NaN)).toBe(false);
        });
    });

    describe('isString()', () => {
        it('should return true if value is string', () => {
            expect(util.isString('something')).toBe(true);
        });

        it('should return false if value is not a string', () => {
            expect(util.isString(null)).toBe(false);
            expect(util.isString(undefined)).toBe(false);
            expect(util.isString(0)).toBe(false);
            expect(util.isString(true)).toBe(false);
            expect(util.isString([])).toBe(false);
            expect(util.isString({})).toBe(false);
            expect(util.isString(function () {})).toBe(false);
            expect(util.isString(NaN)).toBe(false);
        });
    });
    
    describe('isBoolean()', () => {
        it('should return true if value is boolean', () => {
            expect(util.isBoolean(false)).toBe(true);
        });

        it('should return false if value is not a boolean', () => {
            expect(util.isBoolean(null)).toBe(false);
            expect(util.isBoolean(undefined)).toBe(false);
            expect(util.isBoolean(0)).toBe(false);
            expect(util.isBoolean('something')).toBe(false);
            expect(util.isBoolean([])).toBe(false);
            expect(util.isBoolean({})).toBe(false);
            expect(util.isBoolean(function () {})).toBe(false);
            expect(util.isBoolean(NaN)).toBe(false);
        });
    });

    describe('isNumber()', () => {
        it('should return true if value is number', () => {
            expect(util.isNumber(17)).toBe(true);
            expect(util.isNumber(NaN)).toBe(true);
        });

        it('should return false if value is not a number', () => {
            expect(util.isNumber(null)).toBe(false);
            expect(util.isNumber(undefined)).toBe(false);
            expect(util.isNumber('something')).toBe(false);
            expect(util.isNumber(true)).toBe(false);
            expect(util.isNumber([])).toBe(false);
            expect(util.isNumber({})).toBe(false);
            expect(util.isNumber(function () {})).toBe(false);
        });
    });

    describe('isPrimitive()', () => {
        it('should return true if value is primitive', () => {
            expect(util.isPrimitive('something')).toBe(true);
            expect(util.isPrimitive(23)).toBe(true);
            expect(util.isPrimitive(true)).toBe(true);
            expect(util.isPrimitive(null)).toBe(true);
            expect(util.isPrimitive(undefined)).toBe(true);
            expect(util.isPrimitive(Symbol())).toBe(true);
        });

        it('should return false if value is not primitive', () => {
            expect(util.isPrimitive([])).toBe(false);
            expect(util.isPrimitive({})).toBe(false);
            expect(util.isPrimitive(function () {})).toBe(false);
        });
    });

    describe('isArray()', () => {
        it('should return true if value is array', () => {
            expect(util.isArray([])).toBe(true);
        });

        it('should return false if value is not a array', () => {
            expect(util.isArray(null)).toBe(false);
            expect(util.isArray(undefined)).toBe(false);
            expect(util.isArray(0)).toBe(false);
            expect(util.isArray(true)).toBe(false);
            expect(util.isArray('something')).toBe(false);
            expect(util.isArray({})).toBe(false);
            expect(util.isArray(function () {})).toBe(false);
            expect(util.isArray(NaN)).toBe(false);
        });
    });

    describe('isArrayLike()', () => {
        it('should return true if value is array like', () => {
            expect(util.isArrayLike([])).toBe(true);
        });

        it('should return false if value is not a array like', () => {
            expect(util.isArrayLike(null)).toBe(false);
            expect(util.isArrayLike(undefined)).toBe(false);
            expect(util.isArrayLike(0)).toBe(false);
            expect(util.isArrayLike(true)).toBe(false);
            expect(util.isArrayLike('something')).toBe(false);
            expect(util.isArrayLike({})).toBe(false);
            expect(util.isArrayLike(function () {})).toBe(false);
            expect(util.isArrayLike(NaN)).toBe(false);
        });
    });

    describe('isObject()', () => {
        it('should return true if value is object', () => {
            expect(util.isObject({})).toBe(true);
            expect(util.isObject([])).toBe(true);
            expect(util.isObject(function () {})).toBe(true);
        });

        it('should return false if value is not a object', () => {
            expect(util.isObject(null)).toBe(false);
            expect(util.isObject(undefined)).toBe(false);
            expect(util.isObject(0)).toBe(false);
            expect(util.isObject(true)).toBe(false);
            expect(util.isObject('something')).toBe(false);
            expect(util.isObject(NaN)).toBe(false);
        });
    });
    
    describe('isDateLike()', () => {
        it('should return true if value is date like', () => {
            expect(util.isDateLike(new Date())).toBe(true);
        });

        it('should return false if value is not a date like', () => {
            expect(util.isDateLike(null)).toBe(false);
            expect(util.isDateLike(undefined)).toBe(false);
            expect(util.isDateLike(0)).toBe(false);
            expect(util.isDateLike(true)).toBe(false);
            expect(util.isDateLike('something')).toBe(false);
            expect(util.isDateLike({})).toBe(false);
            expect(util.isDateLike(function () {})).toBe(false);
            expect(util.isDateLike(NaN)).toBe(false);
        });
    });

    describe('isValidDate()', () => {
        it('should return true if value is valid date', () => {
            expect(util.isValidDate(new Date())).toBe(true);
            expect(util.isValidDate(123542)).toBe(true);
            expect(util.isValidDate('2014-01-01')).toBe(true);
        });

        it('should return false if value is not a valid date', () => {
            expect(util.isValidDate(null)).toBe(false);
            expect(util.isValidDate(undefined)).toBe(false);
            expect(util.isValidDate(true)).toBe(false);
            expect(util.isValidDate('something')).toBe(false);
            expect(util.isValidDate({})).toBe(false);
            expect(util.isValidDate(function () {})).toBe(false);
            expect(util.isValidDate(NaN)).toBe(false);
        });
    });

    describe('isFunction()', () => {
        it('should return true if value is function', () => {
            expect(util.isFunction(function () {})).toBe(true);
        });

        it('should return false if value is not a function', () => {
            expect(util.isFunction(null)).toBe(false);
            expect(util.isFunction(undefined)).toBe(false);
            expect(util.isFunction(0)).toBe(false);
            expect(util.isFunction(true)).toBe(false);
            expect(util.isFunction('something')).toBe(false);
            expect(util.isFunction(NaN)).toBe(false);
            expect(util.isFunction({})).toBe(false);
            expect(util.isFunction([])).toBe(false);
        });
    });

    describe('isDict()', () => {
        it('should return true if value is dictionary', () => {
            expect(util.isDict({})).toBe(true);
            expect(util.isDict({
                lol: 'lolz'
            })).toBe(true);
        });

        it('should return false if value is not a dictionary', () => {
            expect(util.isDict(null)).toBe(false);
            expect(util.isDict(undefined)).toBe(false);
            expect(util.isDict(0)).toBe(false);
            expect(util.isDict(true)).toBe(false);
            expect(util.isDict('something')).toBe(false);
            expect(util.isDict(NaN)).toBe(false);
            expect(util.isDict(function() {})).toBe(false,);
            expect(util.isDict(new (function() {}))).toBe(false);
            expect(util.isDict([])).toBe(false);
        });
    });
});