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

    public abstract optional(): OptionalResolver<T>;
}
