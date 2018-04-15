const { DateResolver } = require('../..');



describe('Date Resolver', () => {
    
    describe('correct input', () => {
        let result;
        let result2;
        let result3;

        beforeEach(() => {
            result = DateResolver().resolve('2018-04-14 21:45');
            result2 = DateResolver().resolve(1523742351657);
            result3 = DateResolver().resolve(new Date('2018-04-12 15:24'));
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);    
            expect(result2.success).toBe(true);    
            expect(result3.success).toBe(true);    
        });

        it('should return result equal to input', () => {
            expect(result.result.getTime()).toBe(1523735100000);
            expect(result2.result.getTime()).toBe(1523742351657);
            expect(result3.result.getTime()).toBe(1523539440000);
        });

        it('should not return error', () => {
            expect(result.error).toBeNull();
            expect(result2.error).toBeNull();
            expect(result3.error).toBeNull();
        });
    });

    describe('incorrect input', () => {
        let result;
        let result2;
        let result3;

        beforeEach(() => {
            result = DateResolver().resolve(undefined);
            result2 = DateResolver().resolve(null);
            result3 = DateResolver().resolve('im a date');
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
            expect(result2.success).toBe(false);
            expect(result3.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result.getTime()).toBe(0);
            expect(result2.result.getTime()).toBe(0);
            expect(result3.result.getTime()).toBe(0);
        });

        it('should return error', () => {
            expect(result.error).not.toBeNull();
            expect(result2.error).not.toBeNull();
            expect(result3.error).not.toBeNull();
        });
    });
});