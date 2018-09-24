import { DictionaryResolver, StringResolver, NumberResolver, Result, ObjectResolver } from '..';



interface IDictionary<T> {
    [key: number]: T;
}

describe('Dictionary Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<IDictionary<string>>;
        let result2: Result<IDictionary<number>>;
        
        beforeEach(() => {
            result = DictionaryResolver<string>(StringResolver()).resolve({
                a: 'a',
                b: 'b',
                c: 'c'
            });
            result2 = DictionaryResolver<number>(NumberResolver()).resolve({
                a: 3,
                b: 27,
                c: 41
            });
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);
            expect(result2.success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(result.result).toEqual(<any> {
                a: 'a',
                b: 'b',
                c: 'c'
            });
            expect(result2.result).toEqual(<any> {
                a: 3,
                b: 27,
                c: 41
            })
        });

        it('should not return error', () => {
            expect(result.error.length).toBe(0);
            expect(result2.error.length).toBe(0);
        });
    });

    describe('incorrect input', () => {
        let result: Result<IDictionary<string>>;

        beforeEach(() => {
            result = DictionaryResolver(StringResolver()).resolve(undefined);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toEqual({});
        });

        it('should return 1 error', () => {
            expect(result.error.length).toBe(1);
        });

        it('should return proper error description', () => {
            expect(result.error[0]).toBe('undefined is not an object');
        });
    });

    describe('incorrect input values', () => {
        let result: Result<IDictionary<string>>;

        beforeEach(() => {
            result = DictionaryResolver(StringResolver()).resolve({
                a: 'a',
                b: 10,
                c: {
                    d: 'd',
                    e: 'trust me im boolean'
                }
            });
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toEqual(<any> {
                a: 'a',
                b: '',
                c: ''
            });
        });

        it('should return 2 errors', () => {
            expect(result.error.length).toBe(2);
        });

        it('should return proper errors descriptions', () => {
            expect(result.error[0]).toBe('b: number is not a string');
            expect(result.error[1]).toBe('c: object is not a string');
        });
    });

    describe('nullable value', () => {
        
        describe('correct value', () => {
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).nullable().resolve({
                    a: 'a',
                    b: 'b',
                    c: 'c'
                });
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual(<IDictionary<string>> {
                    a: 'a',
                    b: 'b',
                    c: 'c'
                });
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).nullable().resolve(null);
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
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).nullable().resolve(undefined);
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
                expect(result.error[0]).toBe('undefined is not an object');
            });
        });
    });

    describe('optional value', () => {
        describe('correct value', () => {
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).optional().resolve({
                    a: 'a',
                    b: 'b',
                    c: 'c'
                });
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual(<IDictionary<string>> {
                    a: 'a',
                    b: 'b',
                    c: 'c'
                });
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).optional().resolve(null);
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
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).optional().resolve(undefined);
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
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).optional().resolve(23);
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
                expect(result.error[0]).toBe('number is not an object');
            });
        });
    });

    describe('combined errors description', () => {
        it('should create proper error description with DictionaryResolver at the start of chain', () => {
            const result: Result<any> = DictionaryResolver(ObjectResolver({ b: StringResolver() })).resolve({ a: { b: 2423 }});

            expect(result.error[0]).toBe('a.b: number is not a string');
        });

        it('should create proper error description with DictionaryResolver inside chain', () => {
            const result: Result<any> = ObjectResolver({ a: DictionaryResolver(ObjectResolver({ c: StringResolver() }))}).resolve({ a: { b: { c: 23423 }}});

            expect(result.error[0]).toBe('a.b.c: number is not a string');
        });

        it('should create proper error description with DictionaryResolver at the end of chain', () => {
            const result: Result<any> = ObjectResolver({ a: DictionaryResolver(StringResolver())}).resolve({ a: { b: 23423 }});

            expect(result.error[0]).toBe('a.b: number is not a string');
        });
    });
});