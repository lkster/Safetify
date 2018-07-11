import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';



export class StringResolver extends PrimitiveResolver<string> {

    public type: string = 'string';

    protected resolver (input: any): Result<string> {
        return new Result(true, '', []);
    } 
    
    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<string>) {
        super();
    }
    
}