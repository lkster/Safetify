import { NullableResolver } from '@/base/NullableResolver';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';



export abstract class OptionalResolver<T> extends NullableResolver<T> {

    /**
     * @hidden
     */
    protected isOptional: boolean = false;

    public resolve(input: any): Result<T> {
        if (this.isOptional && (Util.isNull(input) || !Util.isDef(input))) {
            return new Result<T>(true, null, []);
        }

        return super.resolve(input);
    }
    
    public optional(): Resolver<T> {
        this.isOptional = true;
        this.isNullable = true;

        return this;
    }
}
