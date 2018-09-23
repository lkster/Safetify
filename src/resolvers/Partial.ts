import { IObjectResolver } from '@/interfaces/IObjectResolver';
import { PartialResolver as PartialResolverBase } from '@/base/PartialResolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';



/**
 * Resolves partial object of given structure
 * @param resolver Structure of a complete object filled with resolvers
 * @example
 * <caption>
 * PartialResolver<IPerson>({
 *   name: StringResolver(),
 *   surname: StringResolver(),
 *   age: NumberResolver(),
 * }).resolve({ name: 'John', surname: 'Doe' });
 * // returns { name: 'John', surname: 'Doe' }
 * 
 * PartialResolver<IPerson>({
 *   name: StringResolver(),
 *   surname: StringResolver(),
 *   age: NumberResolver(),
 * }).resolve({ name: 'John', surname: false, age: 56 });
 * // returns { name: 'John', surname: '', age: 56 }
 * </caption>
 */
export function PartialResolver<T>(resolver: IObjectResolver<T>) {
    return new PartialResolverBase<T>((input: any) => {
        if (!Util.isObject(input)) {
            let safe: any = SafeUtil.makeSafeObject(input);
            return new Result<Partial<T>>(false, safe, ['input is not an object']);
        }
        
        let errors: string[] = [];
        let result: any = {};
        for (let key in resolver) {
            if (!(key in input)) {
                continue;
            }

            let dec = resolver[key].resolve(input[key]);
            if (!dec.success) {
                if (resolver[key].type === 'object' || resolver[key].type === 'array') {
                    for (let i = 0; i < dec.error.length; i++) {
                        errors.push(`${key}.${dec.error[i]}`);
                    }
                } else {
                    errors.push(`${key}: ` + <string> dec.error);
                }
            }

            result[key] = dec.result;
        }
        
        return new Result<Partial<T>>(errors.length == 0, result, errors.length > 0 ? errors : null);
    });
} 