const { NumberResolver } = require('../..');

describe('Number Resolver', () => {
    
    describe('correct input', () => {
        let result;
        let resultt;

        beforeEach(() => {
            result = NumberResolver().resolve(17);
            result2 = NumberResolver().resolve(14.5);
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);    
            expect(result2.success).toBe(true);    
        });

        it('should return result equals to input', () => {
            expect(result.result).toBe(17);
            expect(result2.result).toBe(14.5);
        });

        it('should not return error', () => {
            expect(result.error).toBeUndefined();
            expect(result2.error).toBeUndefined();
        });
    });

    describe('wrong input', () => {
        let result;

        beforeEach(() => {
            result = NumberResolver().resolve(undefined);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);    
        });

        it('should return safe value', () => {
            expect(result.result).toBeNaN();
        });

        it('should return error', () => {
            expect(result.error).toBeDefined();
        });
    });

    describe('NaN input', () => {
        let result;

        beforeEach(() => {
            result = NumberResolver().defaultsTo(6).resolve(NaN);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return error', () => {
            expect(result.error).toBeDefined();
        });

        it('should set value to default', () => {
            expect(result.result).toBe(6);
        });
    });
});