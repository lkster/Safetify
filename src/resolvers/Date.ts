import { DateResolver as DateResolverConstructor } from '@/base/DateResolver';



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
export function DateResolver(): DateResolverConstructor {
    return new DateResolverConstructor();
}
