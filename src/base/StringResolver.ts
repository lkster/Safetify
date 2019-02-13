import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';
import { IConstraint } from '@/interfaces/IConstraint';



export class StringResolver extends PrimitiveResolver<string> {

    public type: string = 'string';

    /**
     * @hidden
     */
    public nullable(): StringResolver {
        return new StringResolver(true, this.isOptional);
    }

    /**
     * @hidden
     */
    public optional(): StringResolver {
        return new StringResolver(this.isNullable, true);
    }

    /**
     * @hidden
     */
    public defaultsTo(value: string): StringResolver {
        return new StringResolver(this.isNullable, this.isOptional, value);
    }
    
    /**
     * @hidden
     */
    public cloneResolverWithNewConstraint(constraints: IConstraint<string>[], defaultValue: Result<string>): StringResolver {
        return new StringResolver(this.isNullable, this.isOptional, defaultValue, constraints);
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<string> {
        const errors: string[] = [];
    
        if (!Util.isString(input)) {
            errors.push(`${typeof input} is not a string`);
        }
    
        return new Result<string>(errors.length === 0, SafeUtil.makeSafeString(input), errors);
    }
}
