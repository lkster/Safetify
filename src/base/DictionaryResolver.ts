import { IDictionary } from '@/interfaces/IDictionary';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';
import { OptionalResolver } from '@/base/OptionalResolver';



export class DictionaryResolver<T> extends OptionalResolver<IDictionary<T>> {

    public type: string = 'object';

    /**
     * @hidden
     */
    constructor (
        /**
         * @hidden
         */
        private definition: Resolver<T>
    ) {
        super();
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<IDictionary<T>> {
        if (!Util.isObject(input)) {
            return new Result<IDictionary<T>>(false, <IDictionary<T>> SafeUtil.makeSafeObject(input), ['value is not an object']);
        }
        
        let errors: string[] = [];
        let result: any = {};

        for (let key in input) {
            let dec = this.definition.resolve(input[key]);

            if (!dec.success) {
                if (this.definition.type === 'object' || this.definition.type === 'array') {
                    for (let i = 0; i < dec.error.length; i++) {
                        errors.push(`${key}.${dec.error[i]}`);
                    }
                } else {
                    errors.push(`${key}: ` + dec.error[0]);
                }
            }

            result[key] = dec.result;
        }

        return new Result<IDictionary<T>>(errors.length == 0, result, errors);
    } 
}