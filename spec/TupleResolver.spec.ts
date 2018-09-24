import { TupleResolver, StringResolver, NumberResolver, BooleanResolver, Result } from '..';



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
            expect(result.error.length).toBe(0);
            expect(result2.error.length).toBe(0);
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

        it('should return 1 error', () => {
            expect(result.error.length).toBe(3);
        });

        it('should return proper error description', () => {
            expect(result.error[0]).toBe('element at index 0: undefined is not a string');
            expect(result.error[1]).toBe('element at index 1: number is not a string');
            expect(result.error[2]).toBe('element at index 2: boolean is not a number');
        });
    });

    describe('nullable value', () => {
        
        describe('correct value', () => {
            let result: Result<[string, number, boolean]>;

            beforeEach(() => {
                result = TupleResolver<[string, number, boolean]>([StringResolver(), NumberResolver(), BooleanResolver()]).nullable().resolve(['something', 1234, true]);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual(['something', 1234, true]);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<[string, number, boolean]>;

            beforeEach(() => {
                result = TupleResolver<[string, number, boolean]>([StringResolver(), NumberResolver(), BooleanResolver()]).nullable().resolve(null);
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
            let result: Result<[string, number, boolean]>;

            beforeEach(() => {
                result = TupleResolver<[string, number, boolean]>([StringResolver(), NumberResolver(), BooleanResolver()]).nullable().resolve(undefined);
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
                expect(result.error[0]).toBe('undefined is not a tuple');
            });
        });
    });

    describe('optional value', () => {
        describe('correct value', () => {
            let result: Result<[string, number, boolean]>;

            beforeEach(() => {
                result = TupleResolver<[string, number, boolean]>([StringResolver(), NumberResolver(), BooleanResolver()]).optional().resolve(['something', 1234, true]);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual(['something', 1234, true]);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<[string, number, boolean]>;

            beforeEach(() => {
                result = TupleResolver<[string, number, boolean]>([StringResolver(), NumberResolver(), BooleanResolver()]).optional().resolve(null);
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
            let result: Result<[string, number, boolean]>;

            beforeEach(() => {
                result = TupleResolver<[string, number, boolean]>([StringResolver(), NumberResolver(), BooleanResolver()]).optional().resolve(undefined);
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
            let result: Result<[string, number, boolean]>;

            beforeEach(() => {
                result = TupleResolver<[string, number, boolean]>([StringResolver(), NumberResolver(), BooleanResolver()]).optional().resolve(23);
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
                expect(result.error[0]).toBe('number is not a tuple');
            });
        });
    });
});
