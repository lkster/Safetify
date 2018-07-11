import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';



export class StringResolver extends PrimitiveResolver<string> {

    public type: string = 'string';

    protected resolver (input: any): Result<string> {
        let error: string = null;
    
        if (!Util.isString(input)) {
            error = 'value is not a string';
        }
    
        return new Result<string>(!Util.isDefAndNotNull(error), SafeUtil.makeSafeString(input), error);
    }     
}