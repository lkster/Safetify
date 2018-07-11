import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { ResolverFunction } from '@/ResolverFunction';



export class BooleanResolver extends PrimitiveResolver<boolean> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<boolean>) {
        super('boolean', resolver);
    }
    
}