import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { ResolverFunction } from "@/ResolverFunction";



export class NumberResolver extends PrimitiveResolver<number> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<number>) {
        super('number', resolver);
    }
}