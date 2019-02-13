import { OneOfResolver, StringResolver, NumberResolver, Result } from '..';



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
            expect(result.error.length).toBe(0);
            expect(result2.error.length).toBe(0);
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

        it('should return 1 error', () => {
            expect(result.error.length).toBe(1);
            expect(result2.error.length).toBe(1);
        });

        it('should return proper error description', () => {
            expect(result.error[0]).toBe('object is not a string nor number');
            expect(result2.error[0]).toBe('object is not a number nor string');
        });
    });

    describe('nullable value', () => {
        describe('immutable', () => {
            it('should return cloned resolver to keep it immutable', () => {
                const resolver1: OneOfResolver<string | number> = OneOfResolver<string | number>([StringResolver(), NumberResolver()]);
                const resolver2: OneOfResolver<string | number> = resolver1.nullable();

                expect(resolver1).not.toBe(resolver2);
            });
        });

        describe('correct value', () => {
            let result: Result<string | number>;

            beforeEach(() => {
                result = OneOfResolver<string | number>([StringResolver(), NumberResolver()]).nullable().resolve('im a string');
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe('im a string');
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<string | number>;

            beforeEach(() => {
                result = OneOfResolver<string | number>([StringResolver(), NumberResolver()]).nullable().resolve(null);
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
            let result: Result<string | number>;

            beforeEach(() => {
                result = OneOfResolver<string | number>([StringResolver(), NumberResolver()]).nullable().resolve(undefined);
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
                expect(result.error[0]).toBe('undefined is not a string nor number');
            });
        });
    });

    describe('optional value', () => {
        describe('immutable', () => {
            it('should return cloned resolver to keep it immutable', () => {
                const resolver1: OneOfResolver<string | number> = OneOfResolver<string | number>([StringResolver(), NumberResolver()]);
                const resolver2: OneOfResolver<string | number> = resolver1.optional();

                expect(resolver1).not.toBe(resolver2);
            });
        });

        describe('correct value', () => {
            let result: Result<string | number>;

            beforeEach(() => {
                result = OneOfResolver<string | number>([StringResolver(), NumberResolver()]).optional().resolve('im a string');
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe('im a string');
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<string | number>;

            beforeEach(() => {
                result = OneOfResolver<string | number>([StringResolver(), NumberResolver()]).optional().resolve(null);
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
            let result: Result<string | number>;

            beforeEach(() => {
                result = OneOfResolver<string | number>([StringResolver(), NumberResolver()]).optional().resolve(undefined);
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
            let result: Result<string | number>;

            beforeEach(() => {
                result = OneOfResolver<string | number>([StringResolver(), NumberResolver()]).optional().resolve(true);
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
                expect(result.error[0]).toBe('boolean is not a string nor number');
            });
        });
    });
});
