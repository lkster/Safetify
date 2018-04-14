import { Resolver } from "./Resolver";
import { Result } from "@/Result";
import { Util } from "@/utils/Util";
import { ResolverFunction } from "@/ResolverFunction";



export class ObjectResolver<T> extends Resolver<T> {

    constructor (resolver: ResolverFunction<T>) {
        super('object', resolver);
    }
}