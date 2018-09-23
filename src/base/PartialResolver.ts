import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';



export class PartialResolver<T> extends Resolver<Partial<T>> {
    
    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<Partial<T>>) {
        super('object', resolver);
    }
} 