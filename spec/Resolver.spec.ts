import { Resolver, Result } from '..';

type Decoder = (input: any) => Result<any>;

describe('Resolver', () => {
   
    describe('initialize', () => {
        it('should correctly use passed decoder', () => {
            let decoder = (input: any) => {
                return new Result(true, input);
            }

            let resolver: Resolver<any> = new Resolver<any>('testType', decoder);

            expect(resolver.resolve('test')).toEqual(new Result(true, 'test', undefined));
        });
    });
});