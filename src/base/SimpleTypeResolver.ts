import { Resolver } from "./Resolver";
import { Result } from "@/Result";
import { Util } from "@/utils/Util";
import { ResolverUtil } from "@/utils/ResolverUtil";



export class SimpleTypeResolver<T extends string | number | boolean> extends Resolver<T> {

    /**
     * @hidden
     */
    private _defaultValue: Result<T>;

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

        return resolved;
    }
}