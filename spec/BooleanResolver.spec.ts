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
        describe('immutable', () => {
            it('should return cloned resolver to keep it immutable', () => {
                const resolver1: BooleanResolver = BooleanResolver();
                const resolver2: BooleanResolver = resolver1.nullable();

                expect(resolver1).not.toBe(resolver2);
            });
        });
        
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
        describe('immutable', () => {
            it('should return cloned resolver to keep it immutable', () => {
                const resolver1: BooleanResolver = BooleanResolver();
                const resolver2: BooleanResolver = resolver1.optional();

                expect(resolver1).not.toBe(resolver2);
            });
        });

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

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(undefined);
            });

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
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
                expect(result.result).toBe(undefined);
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

            it('should return undefined as result', () => {
                expect(result.result).toBe(undefined);
            });

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('number is not a boolean');
            });
        });
    });

    describe('immutable', () => {
        describe('default value', () => {
            let resolver1: BooleanResolver;
            let resolver2: BooleanResolver;

            beforeEach(() => {
                resolver1 = BooleanResolver();
                resolver2 = resolver1.defaultsTo(true);
            });

            it('should return new instance of resolver', () => {
                expect(resolver1).not.toBe(resolver2);
            });

            it('should set default value in new returned instance instead of actual one', () => {
                expect(resolver1.resolve(null).result).toBe(false);
                expect(resolver2.resolve(null).result).toBe(true);
            });

            it('should pass actual constraints to new instance when default value is being set', () => {
                const constraintFunction = jasmine.createSpy().and.callFake((n: boolean) => n || 'value is not true');
                resolver1 = BooleanResolver().constraint(constraintFunction);
                resolver2 = resolver1.defaultsTo(true);

                resolver1.resolve(true);
                resolver2.resolve(true);

                expect(constraintFunction).toHaveBeenCalledTimes(2);
            });
        });
        
        describe('constraints', () => {
            const constraintFunction = jasmine.createSpy().and.callFake((n: boolean) => n || 'value is not true');
            let resolver1: BooleanResolver;
            let resolver2: BooleanResolver;

            beforeEach(() => {
                resolver1 = BooleanResolver();
                resolver2 = resolver1.constraint(constraintFunction);
            });

            it('should return new instance of resolver', () => {
                expect(resolver1).not.toBe(resolver2);
            });

            it('should set constraint in new returned instance instead of actual one', () => {
                resolver2.resolve(true);
                expect(constraintFunction).toHaveBeenCalled();
                
                resolver1.resolve(true);
                expect(constraintFunction).toHaveBeenCalledTimes(1);
            });

            it('should pass actual default value to new instance when constraint is being set', () => {
                resolver1 = BooleanResolver().defaultsTo(true);
                resolver2 = resolver1.constraint(constraintFunction);

                expect(resolver1.resolve(null).result).toBe(true);
                expect(resolver2.resolve(null).result).toBe(true);
            });
        });
    });
});
