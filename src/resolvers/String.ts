import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { StringResolver as StringResolverBase } from '@/base/StringResolver';



/**
 * Resolves given data to string type
 * @example
 * <caption>
 * StringResolver().resolve('john doe');
 * // output will be the same as input
 * 
 * StringResolver().resolve(3842);
 * // output will be ''
 * </caption>
 */
export function StringResolver(): StringResolverBase {
    return new StringResolverBase((input: any) => {
        let error: string;
    
        if (!Util.isString(input)) {
            error = 'value is not a string';
        }
    
        return new Result<string>(!Util.isDefAndNotNull(error), SafeUtil.makeSafeString(input), error);
    });
}