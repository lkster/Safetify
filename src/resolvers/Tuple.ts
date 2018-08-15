import { ITuple } from '@/interfaces/ITuple';
import { ITupleResolver } from '@/interfaces/ITupleResolver';
import { Result } from '@/Result';
import { TupleResolver as TupleResolverBase } from '@/base/TupleResolver';
import { Util } from '@/utils/Util';



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
export function TupleResolver<T extends ITuple>(resolver: ITupleResolver<T>) {
    return new TupleResolverBase<T>((input: any) => {
        let result: any = [];
        let errors: string[] = [];
        let len: number = resolver.length;

        if (!Util.isArray(input)) {
            for (let i = 0; i < len; i++) {              
                result.push(resolver[i].resolve(undefined));
            }

            return new Result<T>(false, result, [ 'value is not a tuple' ]);
        }

        

        for (let i = 0; i < len; i++) {
            const resolved: Result<any> = resolver[i].resolve(input[i]);
            
            result.push(resolved.result);
            if (!resolved.success) {
                errors.push(`${i}: ${resolved.error}`);
            }
        }

        return new Result<T>(errors.length == 0, result, errors.length > 0 ? errors : null);
    });
}