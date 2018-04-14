import { Resolver, Result, StringResolver, ResolverFunction } from '../..';



describe('Resolver', () => {
   
    describe('initialize', () => {
        it('should correctly use passed decoder', () => {
            let decoder: ResolverFunction<any> = (input: any) => {
                return new Result<any>(true, input);
            }

            let resolver: Resolver<any> = new Resolver<any>('testType', decoder);

            expect(resolver.resolve('test')).toEqual(new Result(true, 'test', undefined));
        });
    });

    describe('nullable value', () => {
        
        describe('correct value', () => {
            let result: Result<string>;

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
                expect(result.error).toBeNull();
            });
        });

        describe('null value', () => {
            let result: Result<string>;

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
                expect(result.error).toBeNull();
            });
        });

        describe('incorrect value', () => {
            let result: Result<string>;

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
                expect(result.error).not.toBeNull();
            });
        });
    });
});