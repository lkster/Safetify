import { Resolver, Result, StringResolver } from '../..';



class TestResolver<T> extends Resolver<T> {

    public type: string = 'testType';

    protected resolver (input: any): Result<T> {
        return new Result(true, input, []);
    }
}

describe('Resolver', () => {

    describe('initialize', () => {
        it('should correctly use implemented resolver', () => {
            let resolver: Resolver<any> = new TestResolver<string>();

            expect(resolver.resolve('test')).toEqual(new Result(true, 'test', []));
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