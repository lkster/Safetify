import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';



type DynamicObjectResolverTypeString<T> = {
    [key: string]: Resolver<T>
}

type DynamicObjectResolverTypeNumber<T> = {
    [key: number]: Resolver<T>
}

type DynamicObjectResolverType<T> = DynamicObjectResolverTypeString<T> | DynamicObjectResolverTypeNumber<T>;

export function DynamicObjectResolver<T>(resolver: Resolver<T>) {
    return new Resolver<DynamicObjectResolverType<T>>('object', (input: any) => {
        if (!Util.isObject(input)) {
            return new Result<DynamicObjectResolverType<T>>(false, <DynamicObjectResolverType<T>> SafeUtil.makeSafeObject(input), ['value is not an object']);
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

        return new Result<DynamicObjectResolverType<T>>(errors.length == 0, result, errors.length > 0 ? errors : undefined);
    });
}