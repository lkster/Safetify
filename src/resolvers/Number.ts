import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';



export const NumberResolver: Resolver<number> = new Resolver<number>('number', (input: any) => {
    let error: string;

    if (!Util.isNumber(input) || !isFinite(input)) {
        error = 'value is not a number';
    }

    return new Result<number>(!Util.isDefAndNotNull(error), SafeUtil.makeSafeNumber(input), error);
});