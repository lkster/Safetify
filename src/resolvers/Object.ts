import { IObjectDefinition } from '@/interfaces/IObjectDefinition';
import { ObjectResolver as ObjectResolverConstructor } from '@/base/ObjectResolver';



/**
 * Resolves object of given structure
 * @param resolver Structure of object filled with resolvers
 * @example
 * <caption>
 * ObjectResolver<IPerson>({
 *   name: StringResolver(),
 *   surname: StringResolver(),
 *   age: NumberResolver(),
 * }).resolve({ name: 'John', surname: 'Doe', age: 56 });
 * // returns { name: 'John', surname: 'Doe', age: 56 }
 *
 * ObjectResolver<IPerson>({
 *   name: StringResolver(),
 *   surname: StringResolver(),
 *   age: NumberResolver(),
 * }).resolve({ name: 'John', surname: false, age: 56 });
 * // returns { name: 'John', surname: '', age: 56 }
 * </caption>
 */
export function ObjectResolver<T>(definition: IObjectDefinition<T>) {
    return new ObjectResolverConstructor<T>(definition);
}
