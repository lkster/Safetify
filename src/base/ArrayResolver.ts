import { Resolver } from "./Resolver";
import { Result } from "@/Result";
import { Util } from "@/utils/Util";
import { ResolverFunction } from "@/ResolverFunction";



export class ArrayResolver<T> extends Resolver<Array<T>> {

    constructor (resolver: ResolverFunction<Array<T>>) {
        super('array', resolver);
    }
}