import { ITuple } from '@/interfaces/ITuple';
import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';



export class TupleResolver<T extends ITuple> extends Resolver<T> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<T>) {
        super('tuple', resolver);
    }
}