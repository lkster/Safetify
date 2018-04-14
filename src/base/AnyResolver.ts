import { ResolverFunction } from "@/ResolverFunction";
import { Result } from "@/Result";



export class AnyResolver {

    /**
     * @hidden
     */
    constructor (
        /**
         * @hidden
         */
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