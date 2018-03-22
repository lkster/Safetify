import { Util } from './Utils/Util';
import { ResolverType } from './ResolverType';
import { Result } from './Result';



export class Resolver<T> {

    public defaultValue: T;
    public isNullable: boolean = false;


    constructor (
        public type: string,
        private resolver: ResolverType<T>
    ) {}

    public resolve(input: any): Result<T> {
        let resolved = this.resolver(input);
        if (!resolved.success) {
            if (this.isNullable === true && input === null) {
                return new Result<T>(true, null);
            } else if (Util.isDefAndNotNull(this.defaultValue)) {
                resolved.result = this.resolver(this.defaultValue).result;
            } else if (this.isNullable === true) {
                resolved.result = null;
            }
        } else if (!Util.isDef(resolved.result) && this.isNullable === true) {
            resolved.result = null;
        }
        return resolved;
    }

    private _clone(): Resolver<T> {
        return new Resolver(this.type, this.resolver);
    }

    public defaultsTo(val: T): Resolver<T> {
        let newResolver: Resolver<T> = this._clone(); 
        newResolver.defaultValue = val;
        newResolver.isNullable = this.isNullable;
        return newResolver;
    }

    public nullable(): Resolver<T> {
        let newResolver: Resolver<T> = this._clone();
        newResolver.defaultValue = this.defaultValue;
        newResolver.isNullable = true;
        return newResolver;
    }
}