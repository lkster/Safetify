import { TupleResolver, StringResolver, NumberResolver, BooleanResolver, Result } from '../..';



describe('TupleResolver', () => {
    
    describe('correct input', () => {
        let result: Result<[string, string]>;
        let result2: Result<[string, number, boolean]>;

        beforeEach(() => {
            result = TupleResolver<[string, string]>([StringResolver(), StringResolver()]).resolve(['some', 'thing']);
            result2 = TupleResolver<[string, number, boolean]>([StringResolver(), NumberResolver(), BooleanResolver()]).resolve(['something', 1234, true]);
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);    
            expect(result2.success).toBe(true);    
        });

        it('should return result equal to input', () => {
            expect(result.result).toEqual(['some', 'thing']);
            expect(result2.result).toEqual(['something', 1234, true]);
        });

        it('should not return error', () => {
            expect(result.error).toBeNull();
            expect(result2.error).toBeNull();
        });
    });

    describe('incorrect input', () => {
        let result: Result<[string, string, number]>;

        beforeEach(() => {
            result = TupleResolver<[string, string, number]>([StringResolver(), StringResolver(), NumberResolver()]).resolve([undefined, 1234124, true]);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toEqual(['', '', 1]);
        });

        it('should return error', () => {
            expect(result.error).not.toBeNull();
        });
    });
});
