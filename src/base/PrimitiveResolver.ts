import { IConstraint } from '@/interfaces/IConstraint';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';
import { OptionalResolver } from '@/base/OptionalResolver';
import { IPrimitive } from '@/interfaces/IPrimitive';


/**
 * @hidden
 */
export abstract class PrimitiveResolver<T extends IPrimitive> extends OptionalResolver<T> {

    private static readonly UNDEF_DEFAULT_VALUE: Symbol = Symbol();

    private readonly defaultValue: Result<T>;
    private readonly constraints: IConstraint<T>[] = [];

    protected readonly wasDefaultValuePassed: boolean = false;
    protected readonly wereConstraintsPassed: boolean = false;

    public constructor(
        isNullable: boolean = false,
        isOptional: boolean = false,
        defaultValue?: T | Result<T>,
        constraints?: IConstraint<T>[],
    ) {
        super(isNullable, isOptional);

        // undefined also can be passed so this way we can check if user really passed this value or argument just doesn't exist
        if (arguments.length > 2 && defaultValue !== PrimitiveResolver.UNDEF_DEFAULT_VALUE) {
            this.defaultValue = defaultValue instanceof Result ? defaultValue : this.resolve(defaultValue);
            this.wasDefaultValuePassed = true;
        }

        if (arguments.length > 3) {
            this.constraints = constraints;
            this.wereConstraintsPassed = true;
        }
    }
    
    /**
     * Sets default value which will be returned in case of failed resolving
     * @param value default value
     * @example
     * <caption>
     * enum TestEnum {
     *    opt1 = 'option 1',
     *    opt2 = 'option 2'
     * }
     *
     * EnumResolver<TestEnum\>(TestEnum).defaultsTo('option 1').resolve('option 2');
     * // returns 'option 2'
     *
     * EnumResolver<TestEnum\>(TestEnum).defaultsTo('option 1').resolve('option 3');
     * // returns default value which is 'option 1'
     * </caption>
     */
    public abstract defaultsTo(value: T): PrimitiveResolver<T>;

    /**
     * Adds constraint to resolver to check for specified data range (eg. only positive numbers, strings under specific length etc.)
     * @param cond condition to check
     * @param defaultValue optional default value or transform function to use in case input is not valid under set condition
     * @example
     * <caption>
     * NumberResolver().constraint((n: number) => n >= 0).resolve(5);
     * // returns 5
     *
     * NumberResolver().constraint((n: number) => n >= 0).resolve(-5);
     * // returns -5 with error that constraint failed
     *
     * NumberResolver().constraint((n: number) => n >= 0 || 'Value is not positive').resolve(-5);
     * // returns -5 with custom constraint error
     *
     * NumberResolver().constraint((n: number) => n >= 0, 0).resolve(-5);
     * // returns default constraint's value, in this case 0
     *
     * NumberResolver().constraint((n: number) => n >= 0, (n: number) => Math.abs(n)).resolve(-5);
     * // returns transformed value into that proposed by transform function, in this case 5
     * </caption>
     */
    public constraint (cond: (val: T) => boolean | string, defaultValue: T | ((val: T) => T) = null): PrimitiveResolver<T> {
        const con: IConstraint<T> = {
            condition: cond,
            defaultValue: null,
        };

        // TODO: allow passing undefined values as default
        if (Util.isDefAndNotNull(defaultValue)) {
            con.defaultValue = defaultValue;
        }

        const resolverDefValue: Result<T> | Symbol = this.wasDefaultValuePassed ? this.defaultValue : PrimitiveResolver.UNDEF_DEFAULT_VALUE;
        
        return this.cloneResolverWithNewConstraint([...this.constraints, con], <any> resolverDefValue);
    }

    /**
     * @hidden
     */
    public resolve(input: any): Result<T> {
        let resolved: Result<T> = super.resolve(input);

        if (!resolved.success && Util.isDef(this.defaultValue)) {
            
            if (!this.defaultValue.success) {
                resolved.error.push(`DefaultValue: ${this.defaultValue.error}`);
            } else if (this.defaultValue.success) {
                resolved.result = this.defaultValue.result;
            }
        }

        if (resolved.success && this.constraints.length > 0) {
            resolved = this.resolveConstraints(resolved.result);
        }

        return resolved;
    }

    protected abstract cloneResolverWithNewConstraint(constraints: IConstraint<T>[], defaultValue: Result<T>): PrimitiveResolver<T>;

    /**
     * @hidden
     */
    private resolveConstraints (input: any): Result<T> {
        const len: number = this.constraints.length;
        const errors: string[] = [];
        let value: any = input;

        for (let i = 0; i < len; i++) {
            const result: boolean | string = this.constraints[i].condition(value);

            if (result !== true) {
                if (Util.isString(result)) {
                    errors.push(<string> result);
                } else {
                    errors.push(`constraint #${i} failed`);
                }

                if (Util.isDefAndNotNull(this.constraints[i].defaultValue)) {
                    if (Util.isFunction(this.constraints[i].defaultValue)) {
                        const defResult: Result<T> = super.resolve((<Function> this.constraints[i].defaultValue)(value));
                        value = defResult.result;

                        if (!defResult.success) {
                            errors.push(`Constraint #${i} default value transform function result: ${defResult.error}`);
                        }
                    } else {
                        const defResult: Result<T> = super.resolve(this.constraints[i].defaultValue);
                        value = defResult.result;

                        if (!defResult.success) {
                            errors.push(`Constraint #${i} default value: ${defResult.error}`);
                        }
                    }
                }
            }
        }

        return new Result(errors.length === 0, value, errors);
    }
}
