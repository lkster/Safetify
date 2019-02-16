import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';


export abstract class NullableResolver<T> extends Resolver<T> {

    /**
     * @hidden
     */
    protected readonly isNullable: boolean = false;

    public constructor(isNullable: boolean = false) {
        super();
        this.isNullable = isNullable;
    }

    /**
     * Resolves given data
     * @param input Data to be resolved
     */
    public resolve(input: any): Result<T> {
        if (this.isNullable && Util.isNull(input)) {
            return new Result<T>(true, null, []);
        }

        const resolved = super.resolve(input);

        // rootFail as root resolver fail
        if (!resolved.success && this.isNullable && (Util.isNull(resolved.optionalData) || resolved.optionalData.rootFail)) {
            resolved.result = null;
        }

        return new Result(resolved.success, resolved.result, resolved.error);
    }

    /**
     * Returns new instance of the same resolver with nullable flag enabled which tells that input data can be nullable.
     * If yes, resolver returns success when given data is null or returns null when given data is not validated properly.
     * Not properly validated data inside some object does not count.
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
    public abstract nullable(): NullableResolver<T>;
}
