import { Resolver } from "./Resolver";
import { Result } from "@/Result";
import { Util } from "@/utils/Util";



export class SimpleTypeResolver<T extends string | number | boolean> extends Resolver<T> {

    /**
     * @hidden
     */
    private _defaultValue: Result<T>;

    /**
     * Sets default value which will be returned in case of fail validation
     * @param val default value
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
                resolved.error = Util.mergeErrors(resolved.error, `DefaultValue: ${this._defaultValue.error}`);
            } else if (this._defaultValue.success) {
                resolved.result = this._defaultValue.result;
            }
        }

        return resolved;
    }
}