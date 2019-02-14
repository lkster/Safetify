import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';
import { IConstraint } from '@/interfaces/IConstraint';



export class BooleanResolver extends PrimitiveResolver<boolean> {

    public type: string = 'boolean';

    /**
     * @hidden
     */
    public nullable(): BooleanResolver {
        return new BooleanResolver(true, this.isOptional);
    }

    /**
     * @hidden
     */
    public optional(): BooleanResolver {
        return new BooleanResolver(this.isNullable, true);
    }

    /**
     * @hidden
     */
    public defaultsTo(value: boolean): BooleanResolver {
        return new BooleanResolver(this.isNullable, this.isOptional, value, this.constraints);
    }

    /**
     * @hidden
     */
    public cloneResolverWithNewConstraint(constraints: IConstraint<boolean>[], defaultValue: Result<boolean>): BooleanResolver {
        return new BooleanResolver(this.isNullable, this.isOptional, defaultValue, constraints);
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<boolean> {
        const errors: string[] = [];
    
        if (!Util.isBoolean(input)) {
            errors.push(`${typeof input} is not a boolean`);
        }
    
        return new Result<boolean>(errors.length === 0, !!input, errors);
    }
}
