import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';


export function ArrayResolver<T>(resolver: Resolver<T>) {
    return new Resolver<Array<T>>('array', (input: any) => {
        if (!Util.isArray(input)) {
            return new Result(false, SafeUtil.makeSafeArray(input), ['value is not an array']);
        }

        let errors: string[] = [];

        let result: Array<T> = [];

        input.forEach((value: T, index: number) => {
            let dec = resolver.resolve(value);
            
            if (!dec.success) {
                if (resolver.type === 'object' || resolver.type === 'array') {
                    (<string[]> dec.error).forEach((error: string) => {
                        errors.push(`${index}.${error}`);
                    });
                } else {
                    errors.push(`${index} index: ` + <string> dec.error);
                }
            }

            result.unshift(dec.result);
        });

        return new Result<Array<T>>(errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}