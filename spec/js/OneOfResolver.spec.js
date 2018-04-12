const { OneOfResolver, NumberResolver, StringResolver } = require('../..');



describe('OneOf Resolver', () => {
    
    describe('correct input', () => {
        let result;
        let result2;

        beforeEach(() => {
            result = OneOfResolver([StringResolver, NumberResolver]).resolve('im a string');
            result2 = OneOfResolver([StringResolver, NumberResolver]).resolve(31);
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);    
            expect(result2.success).toBe(true);    
        });

        it('should return result equals to input', () => {
            expect(result.result).toBe('im a string');
            expect(result2.result).toBe(31);
        });

        it('should not return error', () => {
            expect(result.error).toBeUndefined();
            expect(result2.error).toBeUndefined();
        });
    });

    describe('wrong input', () => {
        let result;
        let result2;

        beforeEach(() => {
            result = OneOfResolver([StringResolver, NumberResolver]).resolve({});
            result2 = OneOfResolver([NumberResolver, StringResolver]).resolve({});
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);    
            expect(result2.success).toBe(false);    
        });

        it('should return safe value', () => {
            expect(result.result).toBeNaN();
            expect(result2.result).toBe('');
        });

        it('should return error', () => {
            expect(result.error).toBeDefined();
            expect(result2.error).toBeDefined();
        });
    });
});