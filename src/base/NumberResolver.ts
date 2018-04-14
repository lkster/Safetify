import { SimpleTypeResolver } from "./SimpleTypeResolver";
import { ResolverFunction } from "@/ResolverFunction";



export class NumberResolver extends SimpleTypeResolver<number> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<number>) {
        super('number', resolver);
    }
}