import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';


export function OneOfResolver<T>(resolvers: Array<Resolver<T>>) {
    return new Resolver<T>('oneof', (input: any) => {
        let success: boolean = false;
        let result: T;

        resolvers.some((resolver: Resolver<T>) => {
            let dec: Result<T> = resolver.resolve(input);

            if (dec.success) {
                success = true;
                result = dec.result;
                return true;
            }
            result = dec.result;

            return false;
        });

        let error: string;

        if (!success) {
            error = resolvers.map(r => r.type).join(' nor ');
        }

        return new Result<T>(success, result, error);
    });
}