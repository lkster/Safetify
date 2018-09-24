import { NullableResolver } from '@/base/NullableResolver';
import { IObjectDefinition } from '@/interfaces/IObjectDefinition';
import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { Result } from '@/Result';



export class PartialResolver<T> extends NullableResolver<Partial<T>> {
    
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
    protected resolver (input: any): Result<Partial<T>> {
        if (!Util.isObject(input)) {
            let safe: any = SafeUtil.makeSafeObject(input);
            return new Result<Partial<T>>(false, safe, [`${this.nested ? ': ' : ''}${typeof input} is not an object`]);
        }
        
        let errors: string[] = [];
        let result: any = {};

        for (let key in this.definition) {
            if (!(key in input)) {
                continue;
            }

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
        
        return new Result<Partial<T>>(errors.length == 0, result, errors);
    }
} 