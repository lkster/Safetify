import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';

export type ObjectResolverDefinition<T> = {
    [U in keyof T]: Resolver<T[U]>
}

export function ObjectResolver<T>(resolver: ObjectResolverDefinition<T>) {
    return new Resolver<T>('object', (input: any) => {
  
        if (!Util.isObject(input)) {
            let safe: any = SafeUtil.makeSafeObject(input);

            for (let key in resolver) {
                safe[key] = resolver[key].resolve(undefined).result;
            }

            return new Result<T>(false, safe, ['input is not an object']);
        }
        
        let errors: string[] = [];
        let result: any = {};

        for (let key in resolver) {
            let dec = resolver[key].resolve(input[key]);

            if (!dec.success) {
                if (resolver[key].type === 'object' || resolver[key].type === 'array') {
                    for (let i = 0; i < dec.error.length; i++) {
                        errors.push(`${key}.${dec.error[i]}`);
                    }
                } else {
                    errors.push(`${key}: ` + <string> dec.error);
                }
            }

            result[key] = dec.result;
        }

        return new Result<T>(errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}