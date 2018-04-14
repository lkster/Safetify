import { Util } from '@/utils/Util';
import { AnyResolver as AnyResolverBase } from '@/base/AnyResolver';
import { Result } from '@/Result';



/**
 * Always return given data in unchanged form
 * @example
 * <caption>
 * AnyResolver().resolve('input of any type');
 * // returns 'input of any type'
 * 
 * AnyResolver().resolve(undefined);
 * // returns undefined
 * </caption>
 */
export function AnyResolver(): AnyResolverBase {
    return new AnyResolverBase((input: any) => {
        return new Result<any>(true, input, null);
    });
}
