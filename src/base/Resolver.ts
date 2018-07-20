import { Result } from '@/Result';
import { Util } from '@/utils/Util';



/**
 * Base resolver class
 */
export abstract class Resolver<T> {

    /**
     * @hidden
     */
    protected isNullable: boolean = false;

    /**
     * @hidden
     */
    protected isOptional: boolean = false;

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
        let resolved = this.resolver(input);

        if (!resolved.success) {
            if (this.isNullable === true && input === null) {
                return new Result<T>(true, null, null);
            } else if (this.isNullable === true) {
                resolved.result = null;
            }
        } else if (!Util.isDef(resolved.result) && this.isNullable === true) {
            resolved.result = null;
        }

        return resolved;
    }

    /**
     * Whether data can be nullable. If yes, resolver returns success when given data is null or returns null when given data is not validated properly
     * @example
     * <caption>
     * StringResolver().nullable().resolve('John Doe');
     * // returns 'John Doe'
     * 
     * StringResolver().nullable().resolve(null);
     * // returns null without any errors
     * 
     * StringResolver().nullable().resolve(undefined);
     * // returns null with false success and input type error
     * </caption>
     */
    public nullable(): Resolver<T> {
        this.isNullable = true;
        return this;
    }

    public optional(): Resolver<T> {
        this.isOptional = true;
        return this;
    }
}