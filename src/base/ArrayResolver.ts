import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';
import { OptionalResolver } from '@/base/OptionalResolver';



export class ArrayResolver<T> extends OptionalResolver<Array<T>> {

    public type: string = 'array';

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
    protected resolver (input: any): Result<Array<T>> {
        if (!Util.isArray(input)) {
            return new Result(false, SafeUtil.makeSafeArray(input), [`${this.nested ? ': ' : ''}${typeof input} is not an array`]);
        }

        let errors: string[] = [];

        let result: Array<T> = [];

        for (let i = 0; i < input.length; i++) {
            this.definition.nested = true;

            let dec = this.definition.resolve(input[i]);
            
            if (!dec.success) {
                if (this.definition.type === 'object' || this.definition.type === 'array') {
                    for (let j = 0; j < dec.error.length; j++) {
                        if (this.nested) {
                            errors.push(`[${j}]${dec.error[j]}`);
                        } else {
                            errors.push(`${j}${dec.error[j]}`);
                        }
                    }
                } else {
                    if (this.nested) {
                        errors.push(`[${i}]: ${dec.error[0]}`);
                    } else {
                        errors.push(`element at index ${i}: ${dec.error[0]}`)
                    }
                }
            }

            result.push(dec.result);
        }

        return new Result<Array<T>>(errors.length == 0, result, errors);
    }
}