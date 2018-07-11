import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';
import { ResolverFunction } from '@/ResolverFunction';
import { ITuple } from '@/interfaces/ITuple';



export class TupleResolver<T extends ITuple> extends Resolver<T> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<T>) {
        super('tuple', resolver);
    }
}