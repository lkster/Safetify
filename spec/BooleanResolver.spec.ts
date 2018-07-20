import { BooleanResolver, Result } from '..';



describe('Boolean Resolver', () => {
    
    describe('correct input', () => {
        it('should return success as true', () => {
            expect(BooleanResolver().resolve(false).success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(BooleanResolver().resolve(false).result).toBe(false);
            expect(BooleanResolver().resolve(true).result).toBe(true);
        });

        it('should not return error', () => {
            expect(BooleanResolver().resolve(false).error.length).toBe(0);
        });
    });

    describe('incorrect input', () => {
        let result: Result<boolean>;
        let result2: Result<boolean>;

        beforeEach(() => {
            result = BooleanResolver().resolve(undefined);
            result2 = BooleanResolver().resolve('trust me im boolean');
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
            expect(result.error.length).toBeGreaterThan(0);
            expect(result2.error.length).toBeGreaterThan(0);
        });
    });

    describe('default value', () => {
        
        describe('correct value', () => {
            let result: Result<boolean>;

            beforeEach(() => {
                result = BooleanResolver().defaultsTo(true).resolve(false);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(false);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });
        
        describe('incorrect value', () => {
            let result: Result<boolean>;

            beforeEach(() => {
                result = BooleanResolver().defaultsTo(true).resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return result as default value', () => {
                expect(result.result).toBe(true);
            });

            it('should return error', () => {
                expect(result.error.length).toBeGreaterThan(0);
            });
        });

        describe('incorrect value and default value', () => {
            let result: Result<boolean>;

            beforeEach(() => {
                result = BooleanResolver().defaultsTo(undefined).resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return safe value', () => {
                expect(result.result).toBe(false);
            });

            it('should return 2 errors', () => {
                expect(result.error.length).toBe(2);
            });
        });
    });
});