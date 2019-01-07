import { ArrayResolver, StringResolver, NumberResolver, Result, ObjectResolver } from '..';



describe('Array Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<string[]>;
        let result2: Result<number[]>;

        beforeEach(() => {
            result = ArrayResolver<string>(StringResolver()).resolve(['im a string']);
            result2 = ArrayResolver<number>(NumberResolver()).resolve([13.5, 47]);
        });
        
        it('should return success as true', () => {
            expect(result.success).toBe(true);
            expect(result2.success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(result.result).toEqual(['im a string']);
            expect(result2.result).toEqual([13.5, 47]);
        });

        it('should not return error', () => {
            expect(result.error.length).toBe(0);
            expect(result2.error.length).toBe(0);
        });
    });

    describe('incorrect input', () => {
        let result: Result<string[]>;

        beforeEach(() => {
            result = ArrayResolver<string>(StringResolver()).resolve(undefined);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toEqual([]);
        });

        it('should return 1 error', () => {
            expect(result.error.length).toBe(1);
        });

        it('should return proper error description', () => {
            expect(result.error[0]).toBe('undefined is not an array');
        });
    });

    describe('incorrect values of input', () => {
        let result: Result<string[]>;

        beforeEach(() => {
            result = ArrayResolver<string>(StringResolver()).resolve(['string1', true, 'string2', undefined, 253, 'string3']);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe values', () => {
            expect(result.result).toEqual(['string1', '', 'string2', '', '', 'string3']);
        });

        it('should return 3 errors', () => {
            expect(result.error.length).toBe(3);
        });

        it('should return proper errors descriptions', () => {
            expect(result.error[0]).toBe('element at index 1: boolean is not a string');
            expect(result.error[1]).toBe('element at index 3: undefined is not a string');
            expect(result.error[2]).toBe('element at index 4: number is not a string');
        });
    });

    describe('nullable value', () => {
        
        describe('correct value', () => {
            let result: Result<string[]>;

            beforeEach(() => {
                result = ArrayResolver<string>(StringResolver()).nullable().resolve(['im a string']);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual(['im a string']);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<string[]>;

            beforeEach(() => {
                result = ArrayResolver<string>(StringResolver()).nullable().resolve(null);
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
            let result: Result<string[]>;

            beforeEach(() => {
                result = ArrayResolver<string>(StringResolver()).nullable().resolve(undefined);
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
                expect(result.error[0]).toBe('undefined is not an array');
            });
        });
    });

    describe('optional value', () => {
        describe('correct value', () => {
            let result: Result<string[]>;

            beforeEach(() => {
                result = ArrayResolver<string>(StringResolver()).optional().resolve(['im a string']);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual(['im a string']);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<string[]>;

            beforeEach(() => {
                result = ArrayResolver<string>(StringResolver()).optional().resolve(null);
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
            let result: Result<string[]>;

            beforeEach(() => {
                result = ArrayResolver<string>(StringResolver()).optional().resolve(undefined);
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
            let result: Result<string[]>;

            beforeEach(() => {
                result = ArrayResolver<string>(StringResolver()).optional().resolve(23);
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
                expect(result.error[0]).toBe('number is not an array');
            });
        });
    });

    describe('combined errors description', () => {
        it('should create proper error description with ArrayResolver at the start of chain', () => {
            const result: Result<any> = ArrayResolver(ObjectResolver({ a: StringResolver() })).resolve([{ a: 4234 }]);

            expect(result.error[0]).toBe('[0].a: number is not a string');
        });

        it('should create proper error description with ArrayResolver inside chain', () => {
            const result: Result<any> = ObjectResolver({ a: ArrayResolver(ObjectResolver({ b: StringResolver() }))}).resolve({ a: [{ b: 2342 }]});

            expect(result.error[0]).toBe('a[0].b: number is not a string');
        });

        it('should create proper error description with ArrayResolver at the end of chain', () => {
            const result: Result<any> = ObjectResolver({ a: ArrayResolver(StringResolver())}).resolve({ a: [12312]});

            expect(result.error[0]).toBe('a[0]: number is not a string');
        });
    });
});
