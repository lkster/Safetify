import { ArrayResolver as ArrayResolverBase } from '@/base/ArrayResolver';
import { Resolver } from '@/base/Resolver';



/**
 * Resolves array of given type
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * ArrayResolver<string\>(StringResolver()).resolve(['John', 'Doe']);
 * // returns ['John', 'Doe']
 *
 * ArrayResolver<string\>(StringResolver()).resolve(['John', 5434]);
 * // returns ['John', '']
 * </caption>
 */
export function ArrayResolver<T>(resolver: Resolver<T>): ArrayResolverBase<T> {
    return new ArrayResolverBase<T>(resolver);
}
