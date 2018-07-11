import { Result } from '@/Result';



export class AnyResolver {

    public type: string = 'any';

    /**
     * Resolves given data
     * @param input Data to be resolved
     */
    public resolve(input: any): Result<any> {
        return new Result<any>(true, input, null);
    }
}