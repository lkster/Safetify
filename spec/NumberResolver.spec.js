const dec = require('../dist/safetify').Number;

describe('Number resolver', () => {
    
    describe('correct input', () => {
        it('should return success as true', () => {
            expect(dec.resolve(10).success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(dec.resolve(23).result).toBe(23);
            expect(dec.resolve(10).result).toBe(10);
        });
    });
    
    describe('wrong input', () => {
        it('should return success as false', () => {
            expect(dec.resolve(undefined).success).toBe(false);
            expect(dec.resolve(null).success).toBe(false);
            expect(dec.resolve(false).success).toBe(false);
        });

        it('should return safe value', () => {
            expect(dec.resolve(undefined).result).toBeNaN();
        });

        it('should return error', () => {
            expect(dec.resolve(undefined).error).toBeDefined();
        });
    });
    
});