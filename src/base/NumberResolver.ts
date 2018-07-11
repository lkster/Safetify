import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';



export class NumberResolver extends PrimitiveResolver<number> {

    public type: string = 'number';

    protected resolver (input: any): Result<number> {
        return new Result(true, 0, []);
    } 

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<number>) {
        super();
    }
}