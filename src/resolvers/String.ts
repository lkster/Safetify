import { StringResolver as StringResolverConstructor } from '@/base/StringResolver';



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
export function StringResolver(): StringResolverConstructor {
    return new StringResolverConstructor();
}
