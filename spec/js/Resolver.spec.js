const resolver = require('../../dist/safetify').Resolver;
const result = require('../../dist/safetify').Result;
const dec = require('../../dist/safetify').String;

describe('Resolver', () => {
    
    describe('initialize', () => {
        let decoder, res;

        beforeEach(() => {
            decoder = (el) => {
                return new result(true, el, null);
            };
    
            res = new resolver('testType', decoder);    
        });
        
        it('should correctly use passed decoder', () => {
            expect(res.resolve('test')).toEqual(new result(true, 'test', null));
        });
    });

    describe('nullable option', () => {
        let res;

        beforeEach(() => {
            res = dec.nullable();
        });

        it('should return proper value if input is correct', () => {
            expect(res.resolve('test').result).toBe('test');
        });

        it('should return null and set error if input is incorrect', () => {
            let result = res.resolve(false);
            expect(result.result).toBeNull();
            expect(result.error).toBeDefined();
        });

        it('should return null if input is null', () => {
            let result = res.resolve(null);
            expect(result.result).toBeNull();
            expect(result.error).toBeUndefined();
        });
    });

    describe('defaultsTo option', () => {      
        let res;

        beforeEach(() => {
            res = dec.defaultsTo('default');
        });
        
        it('should return proper value if input is correct', () => {
            expect(res.resolve('test').result).toBe('test');    
        });

        it('should return default value and set error if input is incorrect', () => {
            let result = res.resolve(false);
            expect(result.result).toBe('default');
            expect(result.error).toBeDefined();
        });

        it('should return safe value if default value is incorrect', () => {
            let result = dec.defaultsTo(false).resolve(true);
            expect(result.result).toBe('');
            expect(result.error).toBeDefined();
        });
    });
});