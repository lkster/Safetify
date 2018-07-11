import { ITuple } from '@/interfaces/ITuple';
import { Resolver } from '@/base/Resolver';
import { ResolverFunction } from '@/ResolverFunction';
import { Result } from '@/Result';



export class TupleResolver<T extends ITuple> extends Resolver<T> {

    public type: string = 'tuple';

    protected resolver (input: any): Result<T> {
        return new Result(true, <T> [], []);
    } 

    /**
     * @hidden
     */
    constructor (resolver: ResolverFunction<T>) {
        super();
    }
}