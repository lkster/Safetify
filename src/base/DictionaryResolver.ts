import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';
import { ResolverFunction } from '@/ResolverFunction';
import { IDictionary } from '@/interfaces/IDictionary';



export class DictionaryResolver<T> extends Resolver<IDictionary<T>> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<IDictionary<T>>) {
        super('object', resolver);
    }
}