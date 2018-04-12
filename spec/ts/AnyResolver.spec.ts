import { AnyResolver, Result } from '../..';



describe('Any Resolver', () => {
    
    describe('input', () => {
        let result: Result<any>;
        let result2: Result<any>;

        beforeEach(() => {
            result = AnyResolver().resolve(17);
            result2 = AnyResolver().resolve([ 'lol', true, 28, { 'sumvar': 'sumval' } ]);
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);    
            expect(result2.success).toBe(true);    
        });

        it('should return result equals to input', () => {
            expect(result.result).toBe(17);
            expect(result2.result).toEqual([ 'lol', true, 28, { 'sumvar': 'sumval' } ]);
        });

        it('should not return error', () => {
            expect(result.error).toBeUndefined();
            expect(result2.error).toBeUndefined();
        });
    });
});