import { Resolver, Result, ResolverFunction } from '../..';



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
});