import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';


export function OneOfResolver<T>(resolvers: Array<Resolver<T>>) {
    return new Resolver<T>('oneof', (input: any) => {
        let errors: string[] = [];

        let result: T;

        for (let key in resolvers) {
            let dec = resolvers[key].resolve(input);

            if (dec.success) {
                result = dec.result;
                break;
            } else if (!dec.success) {
                errors.push(resolvers[key].type);
                
                if (key.toString() === '0') {
                    result = dec.result;
                }
            }
        }
        resolvers.forEach((resolver: Resolver<T>, index: number) => {
            let dec = resolver.resolve(input);
            
            if (!dec.success) {
                errors.push(resolver.type);
            } else {
                result
            }
        });

        return new Result<T>(errors.length == 0, result, errors.length > 0 ? 'value is not ' + errors.join(' nor ') : undefined);
    });
}