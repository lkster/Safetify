import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { Resolver } from '@/base/Resolver';
import { ObjectResolver as ObjectResolverBase } from '@/base/ObjectResolver';
import { Result } from '@/Result';
import { IObjectResolver } from '@/interfaces/IObjectResolver';



/**
 * Resolves object of given structure
 * @param resolver Structure of object filled with resolvers
 * @example
 * <caption>
 * ObjectResolver<IPerson>({
 *   name: StringResolver(),
 *   surname: StringResolver(),
 *   age: NumberResolver(),
 * }).resolve({ name: 'John', surname: 'Doe', age: 56 });
 * // returns { name: 'John', surname: 'Doe', age: 56 }
 * 
 * ObjectResolver<IPerson>({
 *   name: StringResolver(),
 *   surname: StringResolver(),
 *   age: NumberResolver(),
 * }).resolve({ name: 'John', surname: false, age: 56 });
 * // returns { name: 'John', surname: '', age: 56 }
 * </caption>
 */
export function ObjectResolver<T>(resolver: IObjectResolver<T>) {
    return new ObjectResolverBase<T>((input: any) => {
  
        if (!Util.isObject(input)) {
            let safe: any = SafeUtil.makeSafeObject(input);

            for (let key in resolver) {
                safe[key] = resolver[key].resolve(undefined).result;
            }

            return new Result<T>(false, safe, ['input is not an object']);
        }
        
        let errors: string[] = [];
        let result: any = {};

        for (let key in resolver) {
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

        return new Result<T>(errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}