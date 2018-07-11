import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';



export class ArrayResolver<T> extends Resolver<Array<T>> {

    public type: string = 'array';

    protected resolver (input: any): Result<Array<T>> {
        return new Result(true, [], []);
    }

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<Array<T>>) {
        super();
    }
}