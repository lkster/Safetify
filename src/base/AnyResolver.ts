import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';



export class AnyResolver {

    public type: string = 'any';

    private resolver (input: any): Result<any> {
        return new Result(true, null, []);
    }
    
    /**
     * @hidden
     */
    constructor (
        /**
         * @hidden
         */
        resolver: ResolverFunction<any>
    ) {}

    /**
     * Resolves given data
     * @param input Data to be resolved
     */
    public resolve(input: any): Result<any> {
        return this.resolver(input);
    }
}