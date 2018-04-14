import { SimpleTypeResolver } from "./SimpleTypeResolver";
import { ResolverFunction } from "@/ResolverFunction";



export class StringResolver extends SimpleTypeResolver<string> {

    constructor (resolver: ResolverFunction<string>) {
        super('string', resolver);
    }
    
}