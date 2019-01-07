import { PartialResolver as PartialResolverBase } from '@/base/PartialResolver';
import { IObjectDefinition } from '@/interfaces/IObjectDefinition';



/**
 * Resolves partial object of given structure
 * @param resolver Structure of a complete object filled with resolvers
 * @example
 * <caption>
 * PartialResolver<IPerson>({
 *   name: StringResolver(),
 *   surname: StringResolver(),
 *   age: NumberResolver(),
 * }).resolve({ name: 'John', surname: 'Doe' });
 * // returns { name: 'John', surname: 'Doe' }
 *
 * PartialResolver<IPerson>({
 *   name: StringResolver(),
 *   surname: StringResolver(),
 *   age: NumberResolver(),
 * }).resolve({ name: 'John', surname: false, age: 56 });
 * // returns { name: 'John', surname: '', age: 56 }
 * </caption>
 */
export function PartialResolver<T>(definition: IObjectDefinition<T>) {
    return new PartialResolverBase<T>(definition);
}
