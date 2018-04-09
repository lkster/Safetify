const dec = require('../dist/safetify').String;

describe('String resolver', () => {
    
    describe('correct input', () => {
        it('should return success as true', () => {
            expect(dec.resolve('something').success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(dec.resolve('sth').result).toBe('sth');
            expect(dec.resolve('something').result).toBe('something');
        });
    });
    
    describe('wrong input', () => {
        it('should return success as false', () => {
            expect(dec.resolve(undefined).success).toBe(false);
            expect(dec.resolve(null).success).toBe(false);
            expect(dec.resolve(false).success).toBe(false);
        });

        it('should return safe value', () => {
            expect(dec.resolve(undefined).result).toBe('');
        });

        it('should return error', () => {
            expect(dec.resolve(undefined).error).toBeDefined();
        });
    });
    
});