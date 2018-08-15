import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';



export class ArrayResolver<T> extends Resolver<Array<T>> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<Array<T>>) {
        super('array', resolver);
    }
}