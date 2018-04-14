import { StringResolver, Result } from '../..';



describe('String Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<string>;

        beforeEach(() => {
            result = StringResolver().resolve('something');
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);    
        });

        it('should return result equal to input', () => {
            expect(result.result).toBe('something');
        });

        it('should not return error', () => {
            expect(result.error).toBeUndefined();
        });
    });

    describe('incorrect input', () => {
        let result: Result<string>;
        let result2: Result<string>;
        let result3: Result<string>;

        beforeEach(() => {
            result = StringResolver().resolve(undefined);
            result2 = StringResolver().resolve(null);
            result3 = StringResolver().resolve(false);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
            expect(result2.success).toBe(false);
            expect(result3.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toBe('');
            expect(result2.result).toBe('');
            expect(result3.result).toBe('');
        });

        it('should return error', () => {
            expect(result.error).toBeDefined();
            expect(result2.error).toBeDefined();
            expect(result3.error).toBeDefined();
        });
    });

    describe('default value', () => {
        
        describe('correct value', () => {
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().defaultsTo('default value').resolve('im a string');
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe('im a string');
            });

            it('should not return error', () => {
                expect(result.error).toBeUndefined();
            });
        });
        
        describe('incorrect value', () => {
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().defaultsTo('default value').resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return result as default value', () => {
                expect(result.result).toBe('default value');
            });

            it('should return error', () => {
                expect(result.error).toBeDefined();
            });
        });

        describe('incorrect value and default value', () => {
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().defaultsTo(undefined).resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return safe value', () => {
                expect(result.result).toBe('');
            });

            it('should return 2 errors', () => {
                expect(result.error.length).toBe(2);
            });
        });
    });
});