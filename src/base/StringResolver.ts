import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { ResolverFunction } from "@/ResolverFunction";



export class StringResolver extends PrimitiveResolver<string> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<string>) {
        super('string', resolver);
    }
    
}