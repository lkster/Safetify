import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';
import { OptionalResolver } from '@/base/OptionalResolver';



export class ArrayResolver<T> extends OptionalResolver<T[]> {

    public type: string = 'array';

    /**
     * @hidden
     */
    public constructor (
        /**
         * @hidden
         */
        private definition: Resolver<T>,
    ) {
        super();
    }
    
    /**
     * @hidden
     */
    protected resolver (input: any): Result<T[]> {
        if (!Util.isArray(input)) {
            return new Result(false, SafeUtil.makeSafeArray(input), [`${this.nested ? ': ' : ''}${typeof input} is not an array`]);
        }

        const errors: string[] = [];

        const result: T[] = [];

        for (let i = 0; i < input.length; i++) {
            this.definition.nested = true;

            const dec = this.definition.resolve(input[i]);
            
            if (!dec.success) {
                switch (this.definition.type) {
                    case 'object':
                    case 'array':
                    case 'tuple':
                        for (let j = 0; j < dec.error.length; j++) {
                            errors.push(`[${i}]${dec.error[j]}`);
                        }
                        break;

                    default:
                        if (this.nested) {
                            errors.push(`[${i}]: ${dec.error[0]}`);
                        } else {
                            errors.push(`element at index ${i}: ${dec.error[0]}`);
                        }
                        break;
                }
            }

            result.push(dec.result);
        }

        return new Result<T[]>(errors.length === 0, result, errors);
    }
}
