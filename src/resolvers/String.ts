import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';



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
export function StringResolver(): Resolver<string> {
    return new Resolver<string>('string', (input: any) => {
        let error: string;
    
        if (!Util.isString(input)) {
            error = 'value is not a string';
        }
    
        return new Result<string>(!Util.isDefAndNotNull(error), SafeUtil.makeSafeString(input), error);
    });
}