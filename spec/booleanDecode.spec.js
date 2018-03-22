const dec = require('../dist/safetify').Boolean;

describe('Boolean decoder', () => {
    
    describe('correct input', () => {
        it('should return success as true', () => {
            expect(dec.resolve(false).success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(dec.resolve(false).result).toBe(false);
            expect(dec.resolve(true).result).toBe(true);
        });
    });
    
    describe('wrong input', () => {
        it('should return success as false', () => {
            expect(dec.resolve(undefined).success).toBe(false);
        });

        it('should return safe value', () => {
            expect(dec.resolve(undefined).result).toBe(false);
        });

        it('should return error', () => {
            expect(dec.resolve(undefined).error).toBeDefined();
        });

        it('should return default value if set', () => {
            expect(dec.defaultsTo(true).resolve(undefined).result).toBe(true);
        });
    });
    
});