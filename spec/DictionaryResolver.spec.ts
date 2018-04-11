import { DictionaryResolver, StringResolver, NumberResolver, Result } from '..';

interface IDictionary {
    [key: number]: string;
}

describe('Dictionary Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<IDictionary>;
        
        beforeEach(() => {
            result = DictionaryResolver<string>(StringResolver).resolve({
                a: 'a',
                b: 'b',
                c: 'c'
            });
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(result.result).toEqual(<any> {
                a: 'a',
                b: 'b',
                c: 'c'
            })
        });
    });

    describe('wrong input', () => {
        let result: Result<IDictionary>;

        beforeEach(() => {
            result = DictionaryResolver(StringResolver).resolve(undefined);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toEqual({});
        });

        it('should return error', () => {
            expect(result.error).toBeDefined();
        });
    });

    describe('wrong input values', () => {
        let result: Result<IDictionary>;

        beforeEach(() => {
            result = DictionaryResolver(StringResolver).resolve({
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
    });
});