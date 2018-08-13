import { Result } from '@/Result';
import { Resolver } from '@/base/Resolver';



export class AnyResolver extends Resolver<any> {

    public type: string = 'any';

    /**
     * @hidden
     */
    protected resolver(input: any): Result<any> {
        return new Result<any>(true, input, []);
    }
}