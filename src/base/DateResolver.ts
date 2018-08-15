import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';



export class DateResolver extends Resolver<Date> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<Date>) {
        super('date', resolver);
    }
}