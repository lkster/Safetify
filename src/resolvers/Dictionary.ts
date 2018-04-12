import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';



interface IDictionary<T> {
    [key: string]: T;
    [key: number]: T;
}


export function DictionaryResolver<T>(resolver: Resolver<T>) {
    return new Resolver<IDictionary<T>>('object', (input: any) => {
        if (!Util.isObject(input)) {
            return new Result<IDictionary<T>>(false, <IDictionary<T>> SafeUtil.makeSafeObject(input), ['value is not an object']);
        }
        
        let errors: string[] = [];
        let result: any = {};

        for (let key in input) {
            let Resolve = resolver.resolve(input[key]);

            if (!Resolve.success) {
                if (resolver.type === 'object' || resolver.type === 'array') {
                    (<string[]> Resolve.error).forEach((error: string) => {
                        errors.push(`${key}.${error}`);
                    });
                } else {
                    errors.push(`${key}: ` + <string> Resolve.error);
                }
            }

            result[key] = Resolve.result;
        }

        return new Result<IDictionary<T>>(errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}