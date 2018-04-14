import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { BooleanResolver as BooleanResolverBase } from '@/base/BooleanResolver';
import { Result } from '@/Result';



/**
 * Resolves given data to boolean type
 * @example
 * <caption>
 * BooleanResolver().resolve(true);
 * // returns true
 * 
 * BooleanResolver().resolve('im boolean');
 * // output will be converted input to boolean, in this case true
 * </caption>
 */
export function BooleanResolver(): BooleanResolverBase {
    return new BooleanResolverBase((input: any) => {
        let error: string;
    
        if (!Util.isBoolean(input)) {
            error = 'value is not a boolean';
        }
    
        return new Result<boolean>(!Util.isDefAndNotNull(error), !!input, error);
    });
}