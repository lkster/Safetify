import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { Resolver } from '@/base/Resolver';
import { DictionaryResolver as DictionaryResolverBase } from '@/base/DictionaryResolver';
import { Result } from '@/Result';
import { IDictionary } from '@/interfaces/IDictionary';



/**
 * Resolves dictionary object of given type
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * DictionaryResolver<string\>(StringResolver()).resolve({ name: 'John', surname: 'Doe' });
 * // returns { name: 'John', surname: 'Doe' }
 * 
 * DictionaryResolver<string\>(StringResolver()).resolve({ name: 'John', surname: 5434 });
 * // returns { name: 'John', surname: '' }
 * </caption>
 */
export function DictionaryResolver<T>(resolver: Resolver<T>) {
    return new DictionaryResolverBase<T>((input: any) => {
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