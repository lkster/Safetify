import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';



/**
 * @hidden
 */
interface IDictionary<T> {
    [key: string]: T;
    [key: number]: T;
}

/**
 * Resolves dictionary object of given type
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * DictionaryResolver<string\>(StringResolver()).resolve({ name: 'John', surname: 'Doe' });
 * // output will be the same as input
 * 
 * DictionaryResolver<string\>(StringResolver()).resolve({ name: 'John', surname: 5434 });
 * // output will be { name: 'John', surname: '' }
 * </caption>
 */
export function DictionaryResolver<T>(resolver: Resolver<T>) {
    return new Resolver<IDictionary<T>>('object', (input: any) => {
        if (!Util.isObject(input)) {
            return new Result<IDictionary<T>>(false, <IDictionary<T>> SafeUtil.makeSafeObject(input), ['value is not an object']);
        }
        
        let errors: string[] = [];
        let result: any = {};

        for (let key in input) {
            let dec = resolver.resolve(input[key]);

            if (!dec.success) {
                if (resolver.type === 'object' || resolver.type === 'array') {
                    for (let i = 0; i < dec.error.length; i++) {
                        errors.push(`${key}.${dec.error[i]}`);
                    }
                } else {
                    errors.push(`${key}: ` + <string> dec.error);
                }
            }

            result[key] = dec.result;
        }

        return new Result<IDictionary<T>>(errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}