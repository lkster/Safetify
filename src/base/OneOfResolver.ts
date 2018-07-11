import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';



export class OneOfResolver<T> extends Resolver<T> {

    public type: string = 'oneof';

    protected resolver (input: any): Result<T> {
        return new Result(true, <T> null, []);
    } 

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<T>) {
        super();
    }
}