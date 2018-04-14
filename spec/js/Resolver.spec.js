const { Resolver, Result, StringResolver } = require('../..');



describe('Resolver', () => {
    
    describe('initialize', () => {
        it('should correctly use passed decoder', () => {
            let decoder = (input) => {
                return new Result(true, input);
            }

            let resolver = new Resolver('testType', decoder);

            expect(resolver.resolve('test')).toEqual(new Result(true, 'test', undefined));
        });
    });

    describe('nullable option', () => {
        let resolver;

        beforeEach(() => {
            resolver = StringResolver().nullable();
        });

        it('should return proper value if input is correct', () => {
            expect(resolver.resolve('test').result).toBe('test');
        });

        it('should return null and set error if input is incorrect', () => {
            let result = resolver.resolve(false);
            expect(result.result).toBeNull();
            expect(result.error).toBeDefined();
        });

        it('should return null if input is null', () => {
            let result = resolver.resolve(null);
            expect(result.result).toBeNull();
            expect(result.error).toBeUndefined();
        });
    });

    describe('defaultsTo option', () => {      
        let resolver;

        beforeEach(() => {
            resolver = StringResolver().defaultsTo('default');
        });
        
        it('should return proper value if input is correct', () => {
            expect(resolver.resolve('test').result).toBe('test');    
        });

        it('should return default value and set error if input is incorrect', () => {
            let result = resolver.resolve(false);
            expect(result.result).toBe('default');
            expect(result.error).toBeDefined();
        });

        it('should return safe value if default value is incorrect', () => {
            let result = StringResolver().defaultsTo(false).resolve(true);
            expect(result.result).toBe('');
            expect(result.error).toBeDefined();
        });
    });

    describe('nullable value', () => {
        
        describe('correct value', () => {
            let result;

            beforeEach(() => {
                result = StringResolver().nullable().resolve('im a string');
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

        describe('null value', () => {
            let result;

            beforeEach(() => {
                result = StringResolver().nullable().resolve(null);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(null);
            });

            it('should not return error', () => {
                expect(result.error).toBeUndefined();
            });
        });

        describe('incorrect value', () => {
            let result;

            beforeEach(() => {
                result = StringResolver().nullable().resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);    
            });

            it('should return null as result', () => {
                expect(result.result).toBe(null);
            });

            it('should not return error', () => {
                expect(result.error).toBeDefined();
            });
        });
    });
});