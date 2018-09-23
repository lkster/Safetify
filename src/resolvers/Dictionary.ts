import { DictionaryResolver as DictionaryResolverBase } from '@/base/DictionaryResolver';
import { Resolver } from '@/base/Resolver';



/**
 * Resolves dictionary object of given type
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * DictionaryResolver<string\>(StringResolver()).resolve({ name: 'John', surname: 'Doe' });
 * // returns { name: 'John', surname: 'Doe' }
 * 
 * DictionaryResolver<string\>(StringResolver()).resolve({ name: 'John', surname: 5434 });
 * // returns { name: 'John', surname: '' }
 * </caption>
 */
export function DictionaryResolver<T>(resolver: Resolver<T>) {
    return new DictionaryResolverBase<T>(resolver);
}