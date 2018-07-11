import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';



export class OneOfResolver<T> extends Resolver<T> {

    public type: string = 'oneof';

    /**
     * @hidden
     */
    constructor (private definition: Array<Resolver<T>>) {
        super();
    }

    protected resolver (input: any): Result<T> {
        let success: boolean = false;
        let result: T;

        for (let i = 0; i < this.definition.length; i++) {
            let dec: Result<T> = this.definition[i].resolve(input);

            if (dec.success) {
                success = true;
                result = dec.result;
                break;
            }

            result = dec.result;
        };

        let error: string = null;

        if (!success) {
            error = this.definition.map(r => r.type).join(' nor ');
        }

        return new Result<T>(success, result, error);
    }
}