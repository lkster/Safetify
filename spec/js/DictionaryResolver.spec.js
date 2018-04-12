const { DictionaryResolver, StringResolver, NumberResolver } = require('../..');



describe('Dictionary Resolver', () => {
    
    describe('correct input', () => {
        let result;
        let result2;
        
        beforeEach(() => {
            result = DictionaryResolver(StringResolver).resolve({
                a: 'a',
                b: 'b',
                c: 'c'
            });
            result2 = DictionaryResolver(NumberResolver).resolve({
                a: 3,
                b: 27,
                c: 41
            });
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(result.result).toEqual({
                a: 'a',
                b: 'b',
                c: 'c'
            })
        });

        it('should not return error', () => {
            expect(result.error).toBeUndefined();
        });
    });

    describe('wrong input', () => {
        let result;

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
        let result;

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
            expect(result.result).toEqual({
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