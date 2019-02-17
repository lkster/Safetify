import { IDictionary } from '@/interfaces/IDictionary';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';
import { OptionalResolver } from '@/base/OptionalResolver';
import { ObjectResolver } from 'index';



export class DictionaryResolver<T> extends OptionalResolver<IDictionary<T>> {

    public type: string = 'object';

    /**
     * @hidden
     */
    public constructor (
        /**
         * @hidden
         */
        private definition: Resolver<T>,
        isNullable: boolean = false,
        isOptional: boolean = false,
    ) {
        super(isNullable, isOptional);
    }

    /**
     * @hidden
     */
    public nullable(): DictionaryResolver<T> {
        return new DictionaryResolver(this.definition, true, this.isOptional);
    }

    /**
     * @hidden
     */
    public optional(): DictionaryResolver<T> {
        return new DictionaryResolver(this.definition, this.isNullable, true);
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<IDictionary<T>> {
        if (!Util.isObject(input)) {
            return new Result<IDictionary<T>>(false, <IDictionary<T>> SafeUtil.makeSafeObject(input), [`${this.nested ? ': ' : ''}${typeof input} is not an object`], { rootFail: true });
        }
        
        const errors: string[] = [];
        const result: any = {};

        for (const key in input) {
            this.definition.nested = true;

            const dec = this.definition.resolve(input[key]);

            if (!dec.success) {
                switch (this.definition.type) {
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

        return new Result<IDictionary<T>>(errors.length === 0, result, errors, { rootFail: false });
    }
}
