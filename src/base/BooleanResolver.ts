import { SimpleTypeResolver } from "./SimpleTypeResolver";
import { ResolverFunction } from "@/ResolverFunction";



export class BooleanResolver extends SimpleTypeResolver<boolean> {

    constructor (resolver: ResolverFunction<boolean>) {
        super('boolean', resolver);
    }
    
}