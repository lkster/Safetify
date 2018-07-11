import { IDictionary } from '@/interfaces/IDictionary';
import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';



export class DictionaryResolver<T> extends Resolver<IDictionary<T>> {

    public type: string = 'object';

    protected resolver (input: any): Result<IDictionary<T>> {
        return new Result(true, {}, []);
    } 

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<IDictionary<T>>) {
        super();
    }
}