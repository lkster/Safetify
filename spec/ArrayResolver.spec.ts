import { ArrayResolver, StringResolver, Result } from '../src/Safetify';
//TODO: check undefined error in correct input


describe('Array Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<string[]>;

        beforeEach(() => {
            result = ArrayResolver<string>(StringResolver).resolve(['im a string']);
        });
        
        it('should return success as true', () => {
            expect(result.success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(result.result).toEqual(['im a string']);
        });
    });

    describe('wrong input', () => {
        let result: Result<string[]>;

        beforeEach(() => {
            result = ArrayResolver<string>(StringResolver).resolve(undefined);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toEqual([]);
        });

        it('should return error', () => {
            expect(result.error).toBeDefined();
        });
    });

    describe('wrong values of input', () => {
        let result: Result<string[]>;

        beforeEach(() => {
            result = ArrayResolver<string>(StringResolver).resolve(['string1', true, 'string2', undefined, 253, 'string3']);
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
});