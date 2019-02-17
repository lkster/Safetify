import { AnyResolver as AnyResolverConstructor } from '@/base/AnyResolver';



/**
 * Always return given data in unchanged form
 * @example
 * <caption>
 * AnyResolver().resolve('input of any type');
 * // returns 'input of any type'
 *
 * AnyResolver().resolve(undefined);
 * // returns undefined
 * </caption>
 */
export function AnyResolver(): AnyResolverConstructor {
    return new AnyResolverConstructor();
}
