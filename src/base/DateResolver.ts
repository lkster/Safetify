import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';



export class DateResolver extends Resolver<Date> {

    public type: string = 'date';

    /**
     * @hidden
     */
    protected resolver (input: any): Result<Date> {
        let success: boolean = true;
        let date: Date = new Date(0);
        let error: string = null;

        if (Util.isDateLike(input)) {
            date = input;
        } else if (Util.isNumber(input) || Util.isString(input)) {
            let testDate = new Date(input);

            if (!isNaN(testDate.getTime())) {
                date = testDate;
            } else {
                success = false;
            }
        } else {
            success = false;
        }

        if (!success) {
            error = 'value is not a valid date';
        }
    
        return new Result<Date>(!Util.isDefAndNotNull(error), date, error);
    } 
}