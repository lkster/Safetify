import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';



export class ObjectResolver<T> extends Resolver<T> {

    public type: string = 'object';

    protected resolver (input: any): Result<T> {
        return new Result(true, <T> {}, []);
    } 

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<T>) {
        super();
    }
}