import { Util } from '../../src/utils/Util';

describe('Utilities', () => {
    
    describe('isDef()', () => {
        it('should return true if value is defined', () => {
            expect(Util.isDef('something')).toBe(true);
        });

        it('should return false if value is not defined', () => {
            expect(Util.isDef(undefined)).toBe(false);
        });

        it('should return true if value is null', () => {
            expect(Util.isDef(null)).toBe(true);
        });
    });

    describe('isDefAndNotNull()', () => {
        it('should return true if value is defined', () => {
            expect(Util.isDefAndNotNull('something')).toBe(true);
        });

        it('should return false if value is not defined', () => {
            expect(Util.isDefAndNotNull(undefined)).toBe(false);
        });

        it('should return false if value is null', () => {
            expect(Util.isDefAndNotNull(null)).toBe(false);
        });
    });

    describe('isNull()', () => {
        it('should return true if value is null', () => {
            expect(Util.isNull(null)).toBe(true);
        });

        it('should return false if value is not a null', () => {
            expect(Util.isNull('something')).toBe(false);
            expect(Util.isNull(undefined)).toBe(false);
            expect(Util.isNull(0)).toBe(false);
            expect(Util.isNull(true)).toBe(false);
            expect(Util.isNull([])).toBe(false);
            expect(Util.isNull({})).toBe(false);
            expect(Util.isNull(function () {})).toBe(false);
            expect(Util.isNull(NaN)).toBe(false);
        });
    });

    describe('isString()', () => {
        it('should return true if value is string', () => {
            expect(Util.isString('something')).toBe(true);
        });

        it('should return false if value is not a string', () => {
            expect(Util.isString(null)).toBe(false);
            expect(Util.isString(undefined)).toBe(false);
            expect(Util.isString(0)).toBe(false);
            expect(Util.isString(true)).toBe(false);
            expect(Util.isString([])).toBe(false);
            expect(Util.isString({})).toBe(false);
            expect(Util.isString(function () {})).toBe(false);
            expect(Util.isString(NaN)).toBe(false);
        });
    });
    
    describe('isBoolean()', () => {
        it('should return true if value is boolean', () => {
            expect(Util.isBoolean(false)).toBe(true);
        });

        it('should return false if value is not a boolean', () => {
            expect(Util.isBoolean(null)).toBe(false);
            expect(Util.isBoolean(undefined)).toBe(false);
            expect(Util.isBoolean(0)).toBe(false);
            expect(Util.isBoolean('something')).toBe(false);
            expect(Util.isBoolean([])).toBe(false);
            expect(Util.isBoolean({})).toBe(false);
            expect(Util.isBoolean(function () {})).toBe(false);
            expect(Util.isBoolean(NaN)).toBe(false);
        });
    });

    describe('isNumber()', () => {
        it('should return true if value is number', () => {
            expect(Util.isNumber(17)).toBe(true);
            expect(Util.isNumber(NaN)).toBe(true);
        });

        it('should return false if value is not a number', () => {
            expect(Util.isNumber(null)).toBe(false);
            expect(Util.isNumber(undefined)).toBe(false);
            expect(Util.isNumber('something')).toBe(false);
            expect(Util.isNumber(true)).toBe(false);
            expect(Util.isNumber([])).toBe(false);
            expect(Util.isNumber({})).toBe(false);
            expect(Util.isNumber(function () {})).toBe(false);
        });
    });

    describe('isPrimitive()', () => {
        it('should return true if value is primitive', () => {
            expect(Util.isPrimitive('something')).toBe(true);
            expect(Util.isPrimitive(23)).toBe(true);
            expect(Util.isPrimitive(true)).toBe(true);
            expect(Util.isPrimitive(null)).toBe(true);
            expect(Util.isPrimitive(undefined)).toBe(true);
            expect(Util.isPrimitive(Symbol())).toBe(true);
        });

        it('should return false if value is not primitive', () => {
            expect(Util.isPrimitive([])).toBe(false);
            expect(Util.isPrimitive({})).toBe(false);
            expect(Util.isPrimitive(function () {})).toBe(false);
        });
    });

    describe('isArray()', () => {
        it('should return true if value is array', () => {
            expect(Util.isArray([])).toBe(true);
        });

        it('should return false if value is not a array', () => {
            expect(Util.isArray(null)).toBe(false);
            expect(Util.isArray(undefined)).toBe(false);
            expect(Util.isArray(0)).toBe(false);
            expect(Util.isArray(true)).toBe(false);
            expect(Util.isArray('something')).toBe(false);
            expect(Util.isArray({})).toBe(false);
            expect(Util.isArray(function () {})).toBe(false);
            expect(Util.isArray(NaN)).toBe(false);
        });
    });

    describe('isArrayLike()', () => {
        it('should return true if value is array like', () => {
            expect(Util.isArrayLike([])).toBe(true);
        });

        it('should return false if value is not a array like', () => {
            expect(Util.isArrayLike(null)).toBe(false);
            expect(Util.isArrayLike(undefined)).toBe(false);
            expect(Util.isArrayLike(0)).toBe(false);
            expect(Util.isArrayLike(true)).toBe(false);
            expect(Util.isArrayLike('something')).toBe(false);
            expect(Util.isArrayLike({})).toBe(false);
            expect(Util.isArrayLike(function () {})).toBe(false);
            expect(Util.isArrayLike(NaN)).toBe(false);
        });
    });

    describe('isObject()', () => {
        it('should return true if value is object', () => {
            expect(Util.isObject({})).toBe(true);
            expect(Util.isObject([])).toBe(true);
            expect(Util.isObject(function () {})).toBe(true);
        });

        it('should return false if value is not a object', () => {
            expect(Util.isObject(null)).toBe(false);
            expect(Util.isObject(undefined)).toBe(false);
            expect(Util.isObject(0)).toBe(false);
            expect(Util.isObject(true)).toBe(false);
            expect(Util.isObject('something')).toBe(false);
            expect(Util.isObject(NaN)).toBe(false);
        });
    });
    
    describe('isDateLike()', () => {
        it('should return true if value is date like', () => {
            expect(Util.isDateLike(new Date())).toBe(true);
        });

        it('should return false if value is not a date like', () => {
            expect(Util.isDateLike(null)).toBe(false);
            expect(Util.isDateLike(undefined)).toBe(false);
            expect(Util.isDateLike(0)).toBe(false);
            expect(Util.isDateLike(true)).toBe(false);
            expect(Util.isDateLike('something')).toBe(false);
            expect(Util.isDateLike({})).toBe(false);
            expect(Util.isDateLike(function () {})).toBe(false);
            expect(Util.isDateLike(NaN)).toBe(false);
        });
    });

    describe('isValidDate()', () => {
        it('should return true if value is valid date', () => {
            expect(Util.isValidDate(new Date())).toBe(true);
            expect(Util.isValidDate(123542)).toBe(true);
            expect(Util.isValidDate('2014-01-01')).toBe(true);
        });

        it('should return false if value is not a valid date', () => {
            expect(Util.isValidDate(null)).toBe(false);
            expect(Util.isValidDate(undefined)).toBe(false);
            expect(Util.isValidDate(true)).toBe(false);
            expect(Util.isValidDate('something')).toBe(false);
            expect(Util.isValidDate({})).toBe(false);
            expect(Util.isValidDate(function () {})).toBe(false);
            expect(Util.isValidDate(NaN)).toBe(false);
        });
    });

    describe('isFunction()', () => {
        it('should return true if value is function', () => {
            expect(Util.isFunction(function () {})).toBe(true);
        });

        it('should return false if value is not a function', () => {
            expect(Util.isFunction(null)).toBe(false);
            expect(Util.isFunction(undefined)).toBe(false);
            expect(Util.isFunction(0)).toBe(false);
            expect(Util.isFunction(true)).toBe(false);
            expect(Util.isFunction('something')).toBe(false);
            expect(Util.isFunction(NaN)).toBe(false);
            expect(Util.isFunction({})).toBe(false);
            expect(Util.isFunction([])).toBe(false);
        });
    });

    describe('isDict()', () => {
        it('should return true if value is dictionary', () => {
            expect(Util.isDict({})).toBe(true);
            expect(Util.isDict({
                lol: 'lolz'
            })).toBe(true);
        });

        it('should return false if value is not a dictionary', () => {
            expect(Util.isDict(null)).toBe(false);
            expect(Util.isDict(undefined)).toBe(false);
            expect(Util.isDict(0)).toBe(false);
            expect(Util.isDict(true)).toBe(false);
            expect(Util.isDict('something')).toBe(false);
            expect(Util.isDict(NaN)).toBe(false);
            expect(Util.isDict(function() {})).toBe(false,);
            expect(Util.isDict(new (function() {}))).toBe(false);
            expect(Util.isDict([])).toBe(false);
        });
    });
});