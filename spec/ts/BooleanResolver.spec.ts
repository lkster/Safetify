import { BooleanResolver, Result } from '../..';



describe('Boolean Resolver', () => {
    
    describe('correct input', () => {
        it('should return success as true', () => {
            expect(BooleanResolver.resolve(false).success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(BooleanResolver.resolve(false).result).toBe(false);
            expect(BooleanResolver.resolve(true).result).toBe(true);
        });

        it('should not return error', () => {
            expect(BooleanResolver.resolve(false).error).toBeUndefined();
        });
    });

    describe('wrong input', () => {
        let result: Result<boolean>;
        let result2: Result<boolean>;

        beforeEach(() => {
            result = BooleanResolver.resolve(undefined);
            result2 = BooleanResolver.resolve('trust me im boolean');
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
            expect(result2.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toBe(false);
            expect(result2.result).toBe(true);
        });

        it('should return error', () => {
            expect(result.error).toBeDefined();
            expect(result2.error).toBeDefined();
        });
    });
});