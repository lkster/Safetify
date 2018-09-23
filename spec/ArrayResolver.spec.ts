import { ArrayResolver, StringResolver, NumberResolver, Result } from '..';



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

        it('should return error', () => {
            expect(result.error.length).toBeGreaterThan(0);
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

            it('should not return error', () => {
                expect(result.error.length).toBeGreaterThan(0);
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

            it('should not return error', () => {
                expect(result.error.length).toBeGreaterThan(0);
            });
        });
    });
});