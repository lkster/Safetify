import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';


export function StringResolver(): Resolver<string> {
    return new Resolver<string>('string', (input: any) => {
        let error: string;
    
        if (!Util.isString(input)) {
            error = 'value is not a string';
        }
    
        return new Result<string>(!Util.isDefAndNotNull(error), SafeUtil.makeSafeString(input), error);
    });
}