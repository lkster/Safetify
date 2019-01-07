import { IObjectDefinition } from '@/interfaces/IObjectDefinition';
import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { Result } from '@/Result';
import { OptionalResolver } from './OptionalResolver';



export class PartialResolver<T> extends OptionalResolver<Partial<T>> {
    
    public type: string = 'object';
    
    /**
     * @hidden
     */
    public constructor (
        /**
         * @hidden
         */
        private definition: IObjectDefinition<T>,
    ) {
        super();
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<Partial<T>> {
        if (!Util.isObject(input)) {
            const safe: any = SafeUtil.makeSafeObject(input);

            return new Result<Partial<T>>(false, safe, [`${this.nested ? ': ' : ''}${typeof input} is not an object`]);
        }
        
        const errors: string[] = [];
        const result: any = {};

        for (const key in this.definition) {
            if (!(key in input)) {
                continue;
            }

            this.definition[key].nested = true;
            
            const dec = this.definition[key].resolve(input[key]);

            if (!dec.success) {
                switch (this.definition[key].type) {
                    case 'object':
                    case 'array':
                    case 'tuple':
                        for (let i = 0; i < dec.error.length; i++) {
                            errors.push(`${this.nested ? '.' : ''}${key}${dec.error[i]}`);
                        }
                        break;

                    default:
                        errors.push(`${this.nested ? '.' : ''}${key}: ${dec.error[0]}`);
                        break;
                }
            }

            result[key] = dec.result;
        }
        
        return new Result<Partial<T>>(errors.length === 0, result, errors);
    }
}
