import { StringResolver as StringResolverBase } from '@/base/StringResolver';



/**
 * Resolves given data to string type
 * @example
 * <caption>
 * StringResolver().resolve('john doe');
 * // returns 'john doe'
 *
 * StringResolver().resolve(3842);
 * // returns ''
 * </caption>
 */
export function StringResolver(): StringResolverBase {
    return new StringResolverBase();
}
