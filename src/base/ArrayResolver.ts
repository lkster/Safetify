import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';



export class ArrayResolver<T> extends Resolver<Array<T>> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<Array<T>>) {
        super('array', resolver);
    }

    /**
     * @hidden
     */
    public resolve(input: any): Result<Array<T>> {
        let resolved = this.resolver(input);

        if (!resolved.success) {
            if (this.isNullable === true && input === null) {
                return new Result<Array<T>>(true, null, null);
            } else if (this.isNullable === true && !Util.isArrayLike(input)) {
                resolved.result = null;
            }
        } else if (!Util.isDef(resolved.result) && this.isNullable === true) {
            resolved.result = null;
        }

        return resolved;
    }
}