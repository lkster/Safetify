import { NullableResolver } from '@/base/NullableResolver';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';



export abstract class OptionalResolver<T> extends NullableResolver<T> {

    /**
     * @hidden
     */
    protected isOptional: boolean = false;

    public constructor (
        isNullable: boolean = false,
        isOptional: boolean = false,
    ) {
        super(isNullable);
        this.isOptional = isOptional;
    }

    public resolve(input: any): Result<T> {
        if (this.isOptional && !Util.isDef(input)) {
            return new Result<T>(true, undefined, []);
        }

        const resolved = super.resolve(input);

        if (!resolved.success && this.isOptional) {
            resolved.result = undefined;
        }

        return resolved;
    }

    /**
     * Returns new instance of the same resolver with optional flag enabled which tells that input data can be nullable.
     * If yes, resolver returns success when given data is undefined or returns undefined when given data is not validated properly.
     * Not properly validated data inside some object does not count.
     * @example
     * <caption>
     * StringResolver().optional().resolve('John Doe');
     * // returns 'John Doe'
     *
     * StringResolver().optional().resolve(undefined);
     * // returns undefined without any errors
     *
     * StringResolver().optional().resolve(null);
     * // returns undefined with false success and input type error
     * </caption>
     */
    public abstract optional(): OptionalResolver<T>;
}
