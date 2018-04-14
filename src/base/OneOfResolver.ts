import { Resolver } from "./Resolver";
import { Result } from "@/Result";
import { Util } from "@/utils/Util";
import { ResolverFunction } from "@/ResolverFunction";



export class OneOfResolver<T> extends Resolver<T> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<T>) {
        super('oneof', resolver);
    }
}