import { OneOfResolver as OneOfResolverBase } from '@/base/OneOfResolver';
import { Resolver } from '@/base/Resolver';



/**
 * Resolves input data to first matched type
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * OneOfResolver<string | number\>([ StringResolver(), NumberResolver() ]).resolve('john doe');
 * OneOfResolver<string | number\>([ StringResolver(), NumberResolver() ]).resolve(3473);
 * // output will be the same as input
 * 
 * OneOfResolver<string | number\>([ StringResolver(), NumberResolver() ]).resolve(false);
 * // output will be converted to last mentioned type in array of resolvers, in this case 'NaN'
 * </caption>
 */
export function OneOfResolver<T>(definition: Array<Resolver<T>>) {
    return new OneOfResolverBase<T>(definition);
}