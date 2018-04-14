import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { NumberResolver as NumberResolverBase } from '@/base/NumberResolver';
import { Result } from '@/Result';



/**
 * Resolves given data to number type
 * @example
 * <caption>
 * NumberResolver().resolve(5);
 * // output will be the same as input
 * 
 * NumberResolver().resolve('');
 * // output will be NaN
 * </caption>
 */
export function NumberResolver(): NumberResolverBase {
    return new NumberResolverBase((input: any) => {
        let error: string;
    
        if (!Util.isNumber(input) || !isFinite(input)) {
            error = 'value is not a number';
        }
    
        return new Result<number>(!Util.isDefAndNotNull(error), SafeUtil.makeSafeNumber(input), error);
    });
}