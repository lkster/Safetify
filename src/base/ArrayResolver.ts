import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';



export class ArrayResolver<T> extends Resolver<Array<T>> {

    public type: string = 'array';

    /**
     * @hidden
     */
    constructor (private resolvingStructure: Resolver<T>) {
        super();
    }
    
    protected resolver (input: any): Result<Array<T>> {
        if (!Util.isArray(input)) {
            return new Result(false, SafeUtil.makeSafeArray(input), ['value is not an array']);
        }

        let errors: string[] = [];

        let result: Array<T> = [];

        for (let i = 0; i < input.length; i++) {
            let dec = this.resolvingStructure.resolve(input[i]);
            
            if (!dec.success) {
                if (this.resolvingStructure.type === 'object' || this.resolvingStructure.type === 'array') {
                    for (let i = 0; i < dec.error.length; i++) {
                        errors.push(`${i}.${dec.error[i]}`);
                    }
                } else {
                    errors.push(`${i}: ` + <string> dec.error);
                }
            }

            result.push(dec.result);
        }

        return new Result<Array<T>>(errors.length == 0, result, errors.length > 0 ? errors : null);
    }
}