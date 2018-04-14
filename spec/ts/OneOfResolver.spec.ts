import { OneOfResolver, StringResolver, NumberResolver, Result } from '../..';



describe('OneOf Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<string | number>;
        let result2: Result<string | number>;

        beforeEach(() => {
            result = OneOfResolver<string | number>([StringResolver(), NumberResolver()]).resolve('im a string');
            result2 = OneOfResolver<string | number>([StringResolver(), NumberResolver()]).resolve(31);
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
            expect(result.error).toBeNull();
            expect(result2.error).toBeNull();
        });
    });

    describe('incorrect input', () => {
        let result: Result<string | number>;
        let result2: Result<string | number>;

        beforeEach(() => {
            result = OneOfResolver<string | number>([StringResolver(), NumberResolver()]).resolve({});
            result2 = OneOfResolver<string | number>([NumberResolver(), StringResolver()]).resolve({});
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
            expect(result.error).not.toBeNull();
            expect(result2.error).not.toBeNull();
        });
    });
});