import { ITuple } from '@/interfaces/ITuple';
import { ITupleDefinition } from '@/interfaces/ITupleDefinition';
import { TupleResolver as TupleResolverBase } from '@/base/TupleResolver';



/**
 * Resolves tuple object
 * @param resolver Resolver of given type
 * @example
 * <caption>
 * TupleResolver<[string, string, number]\>([StringResolver(), StringResolver(), NumberResolver()]).resolve(['John', 'Doe', 43]);
 * // returns ['John', 'Doe', 43]
 *
 * TupleResolver<[string, string, number]\>([StringResolver(), StringResolver(), NumberResolver().defaultsTo(0)]).resolve(['John', 423, 'totally a number']);
 * // returns ['John', '', 0]
 * </caption>
 */
export function TupleResolver<T extends ITuple>(definition: ITupleDefinition<T>) {
    return new TupleResolverBase<T>(definition);
}
