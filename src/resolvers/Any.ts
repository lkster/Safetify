import { Util } from '../Utils/Util';
import { Resolver } from '../Resolver';
import { Result } from '../Result';



export const AnyResolver: Resolver<any> = new Resolver<any>('any', (input: any) => {
    return new Result<any>(true, input);
});