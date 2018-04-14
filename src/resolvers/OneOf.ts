import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { Resolver } from '@/base/Resolver';
import { OneOfResolver as OneOfResolverBase } from '@/base/OneOfResolver';
import { Result } from '@/Result';



/**
 * Resolves input data to first matched type
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * OneOfResolver<string | number\>([ StringResolver(), NumberResolver() ]).resolve('john doe');
 * OneOfResolver<string | number\>([ StringResolver(), NumberResolver() ]).resolve(3473);
 * // output will be the same as input
 * 
 * OneOfResolver<string | number\>([ StringResolver(), NumberResolver() ]).resolve(false);
 * // output will be converted to last mentioned type in array of resolvers, in this case 'NaN'
 * </caption>
 */
export function OneOfResolver<T>(resolvers: Array<Resolver<T>>) {
    return new OneOfResolverBase<T>((input: any) => {
        let success: boolean = false;
        let result: T;

        for (let i = 0; i < resolvers.length; i++) {
            let dec: Result<T> = resolvers[i].resolve(input);

            if (dec.success) {
                success = true;
                result = dec.result;
                break;
            }

            result = dec.result;
        };

        let error: string = null;

        if (!success) {
            error = resolvers.map(r => r.type).join(' nor ');
        }

        return new Result<T>(success, result, error);
    });
}