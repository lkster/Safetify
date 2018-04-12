import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';


export function OneOfResolver<T>(resolvers: Array<Resolver<T>>) {
    return new Resolver<T>('oneof', (input: any) => {
        let success: boolean = false;
        let result: T;

        for (let i = 0; i < resolvers.length; i++) {
            let dec: Result<T> = resolvers[i].resolve(input);

            if (dec.success) {
                success = true;
                result = dec.result;
                break;
            }

            result = dec.result;
        };

        let error: string;

        if (!success) {
            error = resolvers.map(r => r.type).join(' nor ');
        }

        return new Result<T>(success, result, error);
    });
}