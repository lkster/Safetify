import { NumberResolver as NumberResolverBase } from '@/base/NumberResolver';



/**
 * Resolves given data to number type
 * @example
 * <caption>
 * NumberResolver().resolve(5);
 * // returns 5
 *
 * NumberResolver().resolve('');
 * // returns NaN
 * </caption>
 */
export function NumberResolver(): NumberResolverBase {
    return new NumberResolverBase();
}
