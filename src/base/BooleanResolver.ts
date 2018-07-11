import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';



export class BooleanResolver extends PrimitiveResolver<boolean> {

    public type: string = 'boolean';

    protected resolver (input: any): Result<boolean> {
        let error: string = null;
    
        if (!Util.isBoolean(input)) {
            error = 'value is not a boolean';
        }
    
        return new Result<boolean>(!Util.isDefAndNotNull(error), !!input, error);
    }
}