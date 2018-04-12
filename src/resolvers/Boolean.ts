import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';


export function BooleanResolver(): Resolver<boolean> {
    return new Resolver<boolean>('boolean', (input: any) => {
        let error: string;
    
        if (!Util.isBoolean(input)) {
            error = 'value is not a boolean';
        }
    
        return new Result<boolean>(!Util.isDefAndNotNull(error), !!input, error);
    });
}