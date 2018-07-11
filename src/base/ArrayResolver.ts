import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';
import { ResolverFunction } from '@/ResolverFunction';



export class ArrayResolver<T> extends Resolver<Array<T>> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<Array<T>>) {
        super('array', resolver);
    }
}