import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { ArrayResolver as ArrayResolverBase } from '@/base/ArrayResolver';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';



/**
 * Resolves array of given type
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * ArrayResolver<string\>(StringResolver()).resolve(['John', 'Doe']);
 * // returns ['John', 'Doe']
 * 
 * ArrayResolver<string\>(StringResolver()).resolve(['John', 5434]);
 * // returns ['John', '']
 * </caption>
 */
export function ArrayResolver<T>(resolver: Resolver<T>): ArrayResolverBase<T> {
    return new ArrayResolverBase<T>((input: any) => {
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

        return new Result<Array<T>>(errors.length == 0, result, errors.length > 0 ? errors : null);
    });
}