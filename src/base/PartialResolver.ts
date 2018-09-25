import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';



export class PartialResolver<T> extends Resolver<Partial<T>> {
    
    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<Partial<T>>) {
        super('object', resolver);
    }

    /**
     * @hidden
     */
    public resolve(input: any): Result<Partial<T>> {
        let resolved = this.resolver(input);

        if (!resolved.success) {
            if (this.isNullable === true && input === null) {
                return new Result<Partial<T>>(true, null, null);
            } else if (this.isNullable === true && !Util.isObject(input)) {
                resolved.result = null;
            }
        } else if (!Util.isDef(resolved.result) && this.isNullable === true) {
            resolved.result = null;
        }

        return resolved;
    }
} 