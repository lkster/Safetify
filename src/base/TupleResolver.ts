import { ITuple } from '@/interfaces/ITuple';
import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';



export class TupleResolver<T extends ITuple> extends Resolver<T> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<T>) {
        super('tuple', resolver);
    }

    /**
     * @hidden
     */
    public resolve(input: any): Result<T> {
        let resolved = this.resolver(input);

        if (!resolved.success) {
            if (this.isNullable === true && input === null) {
                return new Result<T>(true, null, null);
            } else if (this.isNullable === true && !Util.isArrayLike(input)) {
                resolved.result = null;
            }
        } else if (!Util.isDef(resolved.result) && this.isNullable === true) {
            resolved.result = null;
        }

        return resolved;
    }
}