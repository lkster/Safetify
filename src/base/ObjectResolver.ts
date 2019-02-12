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
    public constructor (
        /**
         * @hidden
         */
        private definition: IObjectDefinition<T>,
        isNullable: boolean = false,
        isOptional: boolean = false,
    ) {
        super(isNullable, isOptional);
    }

    /**
     * @hidden
     */
    public nullable(): ObjectResolver<T> {
        return new ObjectResolver(this.definition, true, this.isOptional);
    }

    /**
     * @hidden
     */
    public optional(): ObjectResolver<T> {
        return new ObjectResolver(this.definition, this.isNullable, true);
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<T> {
        if (!Util.isObject(input)) {
            const safe: any = SafeUtil.makeSafeObject(input);

            for (const key in this.definition) {
                safe[key] = this.definition[key].resolve(undefined).result;
            }

            return new Result<T>(false, safe, [`${this.nested ? ': ' : ''}${typeof input} is not an object`]);
        }
        
        const errors: string[] = [];
        const result: any = {};

        for (const key in this.definition) {
            this.definition[key].nested = true;

            const dec = this.definition[key].resolve(input[key]);

            if (!dec.success) {
                if (this.definition[key].type === 'object' || this.definition[key].type === 'array' || this.definition[key].type === 'tuple') {
                    for (let i = 0; i < dec.error.length; i++) {
                        errors.push(`${this.nested ? '.' : ''}${key}${dec.error[i]}`);
                    }
                } else {
                    errors.push(`${this.nested ? '.' : ''}${key}: ${dec.error[0]}`);
                }
            }

            result[key] = dec.result;
        }

        return new Result<T>(errors.length === 0, result, errors);
    }
}
