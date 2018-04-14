import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { Resolver } from '@/Resolver';
import { Result } from '@/Result';



/**
 * Resolves array of given type
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * ArrayResolver<string\>(StringResolver()).resolve(['John', 'Doe']);
 * // output will be the same as input
 * 
 * ArrayResolver<string\>(StringResolver()).resolve(['John', 5434]);
 * // output will be ['John', '']
 * </caption>
 */
export function ArrayResolver<T>(resolver: Resolver<T>) {
    return new Resolver<Array<T>>('array', (input: any) => {
        if (!Util.isArray(input)) {
            return new Result(false, SafeUtil.makeSafeArray(input), ['value is not an array']);
        }

        let errors: string[] = [];

        let result: Array<T> = [];

        for (let i = 0; i < input.length; i++) {
            let dec = resolver.resolve(input[i]);
            
            if (!dec.success) {
                if (resolver.type === 'object' || resolver.type === 'array') {
                    for (let i = 0; i < dec.error.length; i++) {
                        errors.push(`${i}.${dec.error[i]}`);
                    }
                } else {
                    errors.push(`${i}: ` + <string> dec.error);
                }
            }

            result.push(dec.result);
        }

        return new Result<Array<T>>(errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}