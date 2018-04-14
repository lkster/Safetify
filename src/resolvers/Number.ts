import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';



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
export function NumberResolver(): Resolver<number> {
    return new Resolver<number>('number', (input: any) => {
        let error: string;
    
        if (!Util.isNumber(input) || !isFinite(input)) {
            error = 'value is not a number';
        }
    
        return new Result<number>(!Util.isDefAndNotNull(error), SafeUtil.makeSafeNumber(input), error);
    });
}