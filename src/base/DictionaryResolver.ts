import { IDictionary } from '@/interfaces/IDictionary';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';



export class DictionaryResolver<T> extends Resolver<IDictionary<T>> {

    public type: string = 'object';

    /**
     * @hidden
     */
    constructor (private resolvingStructure: Resolver<T>) {
        super();
    }

    protected resolver (input: any): Result<IDictionary<T>> {
        if (!Util.isObject(input)) {
            return new Result<IDictionary<T>>(false, <IDictionary<T>> SafeUtil.makeSafeObject(input), ['value is not an object']);
        }
        
        let errors: string[] = [];
        let result: any = {};

        for (let key in input) {
            let dec = this.resolvingStructure.resolve(input[key]);

            if (!dec.success) {
                if (this.resolvingStructure.type === 'object' || this.resolvingStructure.type === 'array') {
                    for (let i = 0; i < dec.error.length; i++) {
                        errors.push(`${key}.${dec.error[i]}`);
                    }
                } else {
                    errors.push(`${key}: ` + <string> dec.error);
                }
            }

            result[key] = dec.result;
        }

        return new Result<IDictionary<T>>(errors.length == 0, result, errors.length > 0 ? errors : null);
    } 
}