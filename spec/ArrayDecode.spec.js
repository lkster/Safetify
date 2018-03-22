const dec = require('../dist/safetify');

describe('Array decoder', () => {
    
    describe('correct input', () => {
        it('should return success as true', () => {
            expect(dec.Array(dec.String).resolve(['im a string']).success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(dec.Array(dec.String).resolve(['im a string']).result).toEqual(['im a string']);
        });
    });
    
    describe('wrong input', () => {
        it('should return success as false', () => {
            expect(dec.Array(dec.Number).resolve(undefined).success).toBe(false);
        });

        it('should return safe value', () => {
            expect(dec.Array(dec.String).resolve(undefined).result).toEqual([]);
        });

        it('should return error', () => {
            expect(dec.Array(dec.String).resolve(undefined).error).toBeDefined();
        });
    });
    
});