import { Result } from '@/Result';
import { Util } from '@/utils/Util';
import { OptionalResolver } from '@/base/OptionalResolver';



export class DateResolver extends OptionalResolver<Date> {

    public type: string = 'date';

    /**
     * @hidden
     */
    public nullable(): DateResolver {
        return new DateResolver(true, this.isOptional);
    }

    /**
     * @hidden
     */
    public optional(): DateResolver {
        return new DateResolver(this.isNullable, true);
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<Date> {
        let success: boolean = true;
        let date: Date = new Date(0);
        const errors: string[] = [];

        if (Util.isDateLike(input)) {
            date = input;
        } else if (Util.isNumber(input) || Util.isString(input)) {
            const testDate = new Date(input);

            if (!isNaN(testDate.getTime())) {
                date = testDate;
            } else {
                success = false;
            }
        } else {
            success = false;
        }

        if (!success) {
            if (Util.isString(input)) {
                errors.push(`this ${typeof input} is not a valid date`);
            } else {
                errors.push(`${typeof input} is not a valid date`);
            }
        }
    
        return new Result<Date>(success, date, errors);
    }
}
