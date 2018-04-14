import { Util } from '@/utils/Util';
import { AnyResolver as AnyResolverBase } from '@/base/AnyResolver';
import { Result } from '@/Result';



/**
 * Always return given data in unchanged form
 */
export function AnyResolver(): AnyResolverBase {
    return new AnyResolverBase((input: any) => {
        return new Result<any>(true, input);
    });
}
