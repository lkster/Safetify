import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';



export class BooleanResolver extends PrimitiveResolver<boolean> {

    public type: string = 'boolean';

    protected resolver (input: any): Result<boolean> {
        return new Result(true, true, []);
    }    

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<boolean>) {
        super();
    }
}