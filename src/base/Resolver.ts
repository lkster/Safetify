import { Result } from '@/Result';
import { Util } from '@/utils/Util';



/**
 * Base resolver class
 */
export abstract class Resolver<T> {

    /**
     * Function that resolves data and returns [[Result]] object with defined success, resolved data and optional errors
     * @param input data to resolve
     */
    protected abstract resolver(input: any): Result<T>;

    /**
     * Resolver's type
     */
    public abstract readonly type: string;

    /**
     * Resolves given data
     * @param input Data to be resolved
     */
    public resolve(input: any): Result<T> {
        return this.resolver(input);
    }
}