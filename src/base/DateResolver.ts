import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';
import { ResolverFunction } from '@/ResolverFunction';



export class DateResolver extends Resolver<Date> {

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<Date>) {
        super('date', resolver);
    }
}