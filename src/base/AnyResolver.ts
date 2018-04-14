import { ResolverFunction } from "@/ResolverFunction";
import { Result } from "@/Result";



export class AnyResolver {

    /**
     * @param resolver Function that resolves given data
     */
    constructor (
        private resolver: ResolverFunction<any>
    ) {}

    /**
     * Resolves given data
     * @param input Data to be resolved
     */
    public resolve(input: any): Result<any> {
        return this.resolver(input);
    }
}