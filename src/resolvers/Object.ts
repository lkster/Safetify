import { IObjectResolver } from '@/interfaces/IObjectResolver';
import { ObjectResolver as ObjectResolverBase } from '@/base/ObjectResolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';



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
export function ObjectResolver<T>(definition: IObjectResolver<T>) {
    return new ObjectResolverBase<T>(definition);
}