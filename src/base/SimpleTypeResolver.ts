import { Resolver } from "./Resolver";
import { Result } from "@/Result";
import { Util } from "@/utils/Util";
import { ResolverUtil } from "@/utils/ResolverUtil";
import { IConstraint } from "@/interfaces/IConstraint";



export class SimpleTypeResolver<T extends string | number | boolean> extends Resolver<T> {

    /**
     * @hidden
     */
    private _defaultValue: Result<T>;

    /**
     * @hidden
     */
    private _constraints: IConstraint<T>[] = [];

    /**
     * Sets default value which will be returned in case of fail validation
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
    public defaultsTo(val: T): SimpleTypeResolver<T> {
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
    public constraint (cond: (val: T) => boolean | string, defaultValue: T | ((val: T) => T) = null): SimpleTypeResolver<T> {
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
        const errors: string[] = [];
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
                        value = (<Function> this._constraints[i].defaultValue)(value);
                    } else {
                        value = this._constraints[i].defaultValue;
                    }
                }
            }
        }

        return new Result(errors.length == 0, value, errors.length > 0 ? errors : null);
    }

    /**
     * @hidden
     */
    public resolve(input: any): Result<T> {
        let resolved: Result<T> = super.resolve(input);

        if (!resolved.success && Util.isDef(this._defaultValue)) {
            
            if (!this._defaultValue.success) {
                resolved.error = ResolverUtil.mergeErrors(resolved.error, `DefaultValue: ${this._defaultValue.error}`);
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