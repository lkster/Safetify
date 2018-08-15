import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';



export class ObjectResolver<T> extends Resolver<T> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<T>) {
        super('object', resolver);
    }
}