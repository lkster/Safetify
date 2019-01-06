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

        it('should return 1 error', () => {
            expect(result.error.length).toBe(1);
            expect(result2.error.length).toBe(1);
        });

        it('should return proper error description', () => {
            expect(result.error[0]).toBe('undefined is not a boolean');
            expect(result2.error[0]).toBe('string is not a boolean');
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

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('undefined is not a boolean');
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

            it('should return proper errors descriptions', () => {
                expect(result.error[0]).toBe('undefined is not a boolean');
                expect(result.error[1]).toBe('DefaultValue: undefined is not a boolean');
            });
        });
    });

    describe('nullable value', () => {
        
        describe('correct value', () => {
            let result: Result<boolean>;

            beforeEach(() => {
                result = BooleanResolver().nullable().resolve(true);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(true);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<boolean>;

            beforeEach(() => {
                result = BooleanResolver().nullable().resolve(null);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(null);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('incorrect value', () => {
            let result: Result<boolean>;

            beforeEach(() => {
                result = BooleanResolver().nullable().resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return null as result', () => {
                expect(result.result).toBe(null);
            });

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('undefined is not a boolean');
            });
        });
    });

    describe('optional value', () => {
        describe('correct value', () => {
            let result: Result<boolean>;

            beforeEach(() => {
                result = BooleanResolver().optional().resolve(true);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(true);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<boolean>;

            beforeEach(() => {
                result = BooleanResolver().optional().resolve(null);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(null);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('undefined value', () => {
            let result: Result<boolean>;

            beforeEach(() => {
                result = BooleanResolver().optional().resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(null);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('incorrect value', () => {
            let result: Result<boolean>;

            beforeEach(() => {
                result = BooleanResolver().optional().resolve(23);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return null as result', () => {
                expect(result.result).toBe(null);
            });

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('number is not a boolean');
            });
        });
    });
});
