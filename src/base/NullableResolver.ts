import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';


export abstract class NullableResolver<T> extends Resolver<T> {

    /**
     * @hidden
     */
    protected isNullable: boolean = false;
    
    /**
     * Resolves given data
     * @param input Data to be resolved
     */
    public resolve(input: any): Result<T> {
        if (this.isNullable && Util.isNull(input)) {
            return new Result<T>(true, null, []);
        }

        let resolved = super.resolve(input);

        if (!resolved.success && this.isNullable) {
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
}