import { IDictionary } from '@/interfaces/IDictionary';
import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';



export class DictionaryResolver<T> extends Resolver<IDictionary<T>> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<IDictionary<T>>) {
        super('object', resolver);
    }
}