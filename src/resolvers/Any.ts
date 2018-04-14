import { Util } from '../Utils/Util';
import { Resolver } from '../Resolver';
import { Result } from '../Result';



/**
 * Always return given data in unchanged form
 */
export function AnyResolver(): Resolver<any> {
    return new Resolver<any>('any', (input: any) => {
        return new Result<any>(true, input);
    });
}