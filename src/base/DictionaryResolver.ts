import { Resolver } from "./Resolver";
import { Result } from "@/Result";
import { Util } from "@/utils/Util";
import { ResolverFunction } from "@/ResolverFunction";



export class DictionaryResolver<T> extends Resolver<IDictionary<T>> {

    constructor (resolver: ResolverFunction<IDictionary<T>>) {
        super('object', resolver);
    }
}