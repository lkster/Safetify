import { IConstraint } from '@/interfaces/IConstraint';
import { Resolver } from '@/base/Resolver';
import { ResolverUtil } from '@/utils/ResolverUtil';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';
import { OptionalResolver } from '@/base/OptionalResolver';


/**
 * @hidden
 */
export abstract class PrimitiveResolver<T extends string | number | boolean> extends OptionalResolver<T> {

    private _defaultValue: Result<T>;

    private _constraints: IConstraint<T>[] = [];

    /**
     * Sets default value which will be returned in case of failed resolving
     * @param val default value
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
    public defaultsTo(val: T): PrimitiveResolver<T> {
        this._defaultValue = super.resolve(val);
        return this;
    }

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
            defaultValue: null
        }

        if (Util.isDefAndNotNull(defaultValue)) {
            con.defaultValue = defaultValue;
        }

        this._constraints.push(con);

        return this;
    }

    /**
     * @hidden
     */
    private resolveConstraints (input: any): Result<T> {
        const len: number = this._constraints.length;
        let errors: string[] = [];
        let value: any = input;

        for (let i = 0; i < len; i++) {
            const result: boolean | string = this._constraints[i].condition(value);

            if (result !== true) {
                if (Util.isString(result)) {
                    errors.push(<string> result);
                } else {
                    errors.push(`constraint #${i} failed`);
                }

                if (Util.isDefAndNotNull(this._constraints[i].defaultValue)) {
                    if (Util.isFunction(this._constraints[i].defaultValue)) {
                        const defResult: Result<T> = super.resolve((<Function> this._constraints[i].defaultValue)(value));
                        value = defResult.result;

                        if (!defResult.success) {
                            errors.push(`Constraint #${i} default value transform function result: ${defResult.error}`);
                        }
                    } else {
                        const defResult: Result<T> = super.resolve(this._constraints[i].defaultValue);
                        value = defResult.result;

                        if (!defResult.success) {
                            errors.push(`Constraint #${i} default value: ${defResult.error}`);
                        }
                    }
                }
            }
        }

        return new Result(errors.length == 0, value, errors);
    }

    /**
     * @hidden
     */
    public resolve(input: any): Result<T> {
        let resolved: Result<T> = super.resolve(input);

        if (!resolved.success && Util.isDef(this._defaultValue)) {
            
            if (!this._defaultValue.success) {
                resolved.error.push(`DefaultValue: ${this._defaultValue.error}`);
            } else if (this._defaultValue.success) {
                resolved.result = this._defaultValue.result;
            }
        }

        if (resolved.success && this._constraints.length > 0) {
            resolved = this.resolveConstraints(resolved.result);
        }

        return resolved;
    }
}