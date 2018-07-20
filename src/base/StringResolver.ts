import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';



export class StringResolver extends PrimitiveResolver<string> {

    public type: string = 'string';

    /**
     * @hidden
     */
    protected resolver (input: any): Result<string> {
        let errors: string[] = [];
    
        if (!Util.isString(input)) {
            errors.push('value is not a string');
        }
    
        return new Result<string>(errors.length === 0, SafeUtil.makeSafeString(input), errors);
    }     
}