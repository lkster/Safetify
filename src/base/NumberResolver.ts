import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';



export class NumberResolver extends PrimitiveResolver<number> {

    public type: string = 'number';

    protected resolver (input: any): Result<number> {
        let error: string = null;
    
        if (!Util.isNumber(input) || !isFinite(input)) {
            error = 'value is not a number';
        }
    
        return new Result<number>(!Util.isDefAndNotNull(error), SafeUtil.makeSafeNumber(input), error);
    } 
}