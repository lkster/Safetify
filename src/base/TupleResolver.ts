import { ITuple } from '@/interfaces/ITuple';
import { ITupleDefinition } from '@/interfaces/ITupleDefinition';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';
import { OptionalResolver } from '@/base/OptionalResolver';



export class TupleResolver<T extends ITuple> extends OptionalResolver<T> {

    public type: string = 'tuple';

    /**
     * @hidden
     */
    public constructor (
        /**
         * @hidden
         */
        private definition: ITupleDefinition<T>,
    ) {
        super();
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<T> {
        const result: any = [];
        const errors: string[] = [];
        const len: number = this.definition.length;

        if (!Util.isArray(input)) {
            for (let i = 0; i < len; i++) {
                result.push(this.definition[i].resolve(undefined));
            }

            return new Result<T>(false, result, [`${typeof input} is not a tuple`]);
        }

        

        for (let i = 0; i < len; i++) {
            this.definition[i].nested = true;

            const resolved: Result<any> = this.definition[i].resolve(input[i]);
            
            result.push(resolved.result);
            
            if (!resolved.success) {
                if (this.nested) {
                    errors.push(`[${i}]: ${resolved.error[0]}`);
                } else {
                    errors.push(`element at index ${i}: ${resolved.error[0]}`);
                }
            }
        }

        return new Result<T>(errors.length === 0, result, errors);
    }
}
