import { BooleanResolver as BooleanResolverBase } from '@/base/BooleanResolver';



/**
 * Resolves given data to boolean type
 * @example
 * <caption>
 * BooleanResolver().resolve(true);
 * // returns true
 *
 * BooleanResolver().resolve('im boolean');
 * // output will be converted input to boolean, in this case true
 * </caption>
 */
export function BooleanResolver(): BooleanResolverBase {
    return new BooleanResolverBase();
}
