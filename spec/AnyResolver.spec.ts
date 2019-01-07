import { AnyResolver, Result } from '..';



describe('Any Resolver', () => {
    
    describe('input', () => {
        let result: Result<any>;
        let result2: Result<any>;
        let result3: Result<any>;
        let result4: Result<any>;

        beforeEach(() => {
            result = AnyResolver().resolve(17);
            result2 = AnyResolver().resolve([ 'lol', true, 28, { sumvar: 'sumval' } ]);
            result3 = AnyResolver().resolve(undefined);
            result4 = AnyResolver().resolve(NaN);
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);
            expect(result2.success).toBe(true);
            expect(result3.success).toBe(true);
            expect(result4.success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(result.result).toBe(17);
            expect(result2.result).toEqual([ 'lol', true, 28, { sumvar: 'sumval' } ]);
            expect(result3.result).toBe(undefined);
            expect(result4.result).toBeNaN();
        });

        it('should not return error', () => {
            expect(result.error.length).toBe(0);
            expect(result2.error.length).toBe(0);
            expect(result3.error.length).toBe(0);
            expect(result4.error.length).toBe(0);
        });
    });
});
