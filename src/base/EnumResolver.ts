import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';



export class EnumResolver<T> extends Resolver<T> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<T>) {
        super('enum', resolver);
    }
}