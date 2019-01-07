import { Resolver, Result, StringResolver } from '..';



class TestResolver<T> extends Resolver<T> {

    public type: string = 'testType';

    protected resolver (input: any): Result<T> {
        return new Result(true, input, []);
    }
}

describe('Resolver', () => {

    describe('initialize', () => {
        it('should correctly use implemented resolver', () => {
            const resolver: Resolver<any> = new TestResolver<string>();

            expect(resolver.resolve('test')).toEqual(new Result(true, 'test', []));
        });
    });
});
