import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { OptionalResolver } from '@/base/OptionalResolver';



export class OneOfResolver<T> extends OptionalResolver<T> {

    public type: string = 'oneof';

    /**
     * @hidden
     */
    public constructor (
        /**
         * @hidden
         */
        private definition: Resolver<T>[],
    ) {
        super();
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<T> {
        let success: boolean = false;
        let result: T;

        for (let i = 0; i < this.definition.length; i++) {
            const dec: Result<T> = this.definition[i].resolve(input);

            if (dec.success) {
                success = true;
                result = dec.result;
                break;
            }

            result = dec.result;
        }

        const errors: string[] = [];

        if (!success) {
            errors.push(`${typeof input} is not a ` + this.definition.map(r => r.type).join(' nor '));
        }

        return new Result<T>(success, result, errors);
    }
}
