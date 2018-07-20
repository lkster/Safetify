import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';



export class BooleanResolver extends PrimitiveResolver<boolean> {

    public type: string = 'boolean';

    /**
     * @hidden
     */
    protected resolver (input: any): Result<boolean> {
        let errors: string[] = [];
    
        if (!Util.isBoolean(input)) {
            errors.push('value is not a boolean');
        }
    
        return new Result<boolean>(errors.length === 0, !!input, errors);
    }
}