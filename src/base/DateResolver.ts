import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';



export class DateResolver extends Resolver<Date> {

    public type: string = 'date';

    protected resolver (input: any): Result<Date> {
        return new Result(true, new Date(), []);
    } 

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<Date>) {
        super();
    }
}