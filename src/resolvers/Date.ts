import { DateResolver as DateResolverBase } from '@/base/DateResolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';



/**
 * Resolves given data to date type
 * @example
 * <caption>
 * DateResolver().resolve(1523742351657);
 * // returns Date 2018-04-14T21:45:51.657Z
 * 
 * DateResolver().resolve('2018-04-14 21:45');
 * // returns Date 2018-04-14T19:45:00.000Z
 * 
 * DateResolver().resolve('im boolean');
 * DateResolver().resolve(true);
 * // returns Date 1970-01-01T00:00:00.000Z
 * </caption>
 */
export function DateResolver(): DateResolverBase {
    return new DateResolverBase((input: any) => {
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
    });
}