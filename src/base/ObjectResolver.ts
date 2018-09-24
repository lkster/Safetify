import { IObjectDefinition } from '@/interfaces/IObjectDefinition';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';
import { OptionalResolver } from '@/base/OptionalResolver';



export class ObjectResolver<T> extends OptionalResolver<T> {

    public type: string = 'object';

    /**
     * @hidden
     */
    constructor (
        /**
         * @hidden
         */
        private definition: IObjectDefinition<T>
    ) {
        super();
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<T> {
        if (!Util.isObject(input)) {
            let safe: any = SafeUtil.makeSafeObject(input);

            for (let key in this.definition) {
                safe[key] = this.definition[key].resolve(undefined).result;
            }

            return new Result<T>(false, safe, [`${this.nested ? ': ' : ''}${typeof input} is not an object`]);
        }
        
        let errors: string[] = [];
        let result: any = {};

        for (let key in this.definition) {
            this.definition[key].nested = true;

            let dec = this.definition[key].resolve(input[key]);

            if (!dec.success) {
                if (this.definition[key].type === 'object' || this.definition[key].type === 'array') {
                    for (let i = 0; i < dec.error.length; i++) {
                        errors.push(`${this.nested ? '.' : ''}${key}${dec.error[i]}`);
                    }
                } else {
                    errors.push(`${this.nested ? '.' : ''}${key}: ${dec.error[0]}`);
                }
            }

            result[key] = dec.result;
        }

        return new Result<T>(errors.length == 0, result, errors);
    } 
}