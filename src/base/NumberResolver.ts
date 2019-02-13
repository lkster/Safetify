import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';
import { IConstraint } from '@/interfaces/IConstraint';



export class NumberResolver extends PrimitiveResolver<number> {

    public type: string = 'number';

    /**
     * @hidden
     */
    public nullable(): NumberResolver {
        return new NumberResolver(true, this.isOptional);
    }

    /**
     * @hidden
     */
    public optional(): NumberResolver {
        return new NumberResolver(this.isNullable, true);
    }

    /**
     * @hidden
     */
    public defaultsTo(value: number): NumberResolver {
        return new NumberResolver(this.isNullable, this.isOptional, value);
    }

    /**
     * @hidden
     */
    public cloneResolverWithNewConstraint(constraints: IConstraint<number>[], defaultValue: Result<number>): NumberResolver {
        return new NumberResolver(this.isNullable, this.isOptional, defaultValue, constraints);
    }
    
    /**
     * @hidden
     */
    protected resolver (input: any): Result<number> {
        const errors: string[] = [];
    
        if (!Util.isNumber(input) || isNaN(input)) {
            if (Util.isNumber(input) && isNaN(input)) {
                errors.push('NaN value is not true number');
            } else {
                errors.push(`${typeof input} is not a number`);
            }
        }
    
        return new Result<number>(errors.length === 0, SafeUtil.makeSafeNumber(input), errors);
    }
}
