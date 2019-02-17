declare interface IEnum {
    [key: number]: string;
}

declare interface IDictionary<T> {
    [key: string]: T;
    [key: number]: T;
}

declare interface IConstraint<T> {
    defaultValue: T | ((val: T) => T);
    condition(val: T): boolean | string;
}


declare type Primitive = string | number | boolean | undefined | null | symbol;

declare interface ITuple extends Array<Primitive> {
    [key: number]: Primitive;
}

declare type IObjectResolver<T> = { [U in keyof T]: Safetify.Resolver<T[U]> }

declare type ITupleDefinition<T extends Primitive[]> = { [U in keyof T]:
    U extends 'length' ? T[U] :
    T[U] extends Primitive ? Base.PrimitiveResolver<T[U]> : undefined;
}

declare namespace Base {

    abstract class NullableResolver<T> extends Safetify.Resolver<T> {
        protected readonly isNullable: boolean;

        public constructor(isNullable?: boolean);

        public abstract nullable(): NullableResolver<T>;
    }

    abstract class OptionalResolver<T> extends NullableResolver<T> {
        protected readonly isOptional: boolean;

        public constructor(isNullable?: boolean, isOptional?: boolean);

        public abstract optional(): OptionalResolver<T>;
    }

    abstract class PrimitiveResolver<T> extends OptionalResolver<T> {
        public constructor(isNullable?: boolean, isOptional?: boolean, defaultValue?: T | Safetify.Result<T> | symbol, constraints?: IConstraint<T>[]);

        public abstract defaultsTo (val: T): PrimitiveResolver<T>;
        protected abstract cloneResolverWithNewConstraint(constraints: IConstraint<T>[], defaultValue: Safetify.Result<T>): PrimitiveResolver<T>;

        public constraint(cond: (val: T) => boolean | string, defaultValue?: T | ((val: T) => T)): PrimitiveResolver<T>;
    }

    class AnyResolver extends Safetify.Resolver<any> {
        public type: string;

        protected resolver(input: any): Safetify.Result<any>;
    }

    class StringResolver extends PrimitiveResolver<string> {
        public type: string;

        public nullable(): StringResolver;
        public optional(): StringResolver;
        public defaultsTo(val: string): StringResolver;
        public constraint(cond: (val: string) => boolean | string, defaultValue?: string | ((val: string) => string)): StringResolver;

        protected cloneResolverWithNewConstraint(constraints: IConstraint<string>[], defaultValue: Safetify.Result<string>): StringResolver;
        protected resolver(input: any): Safetify.Result<string>;
    }

    class NumberResolver extends PrimitiveResolver<number> {
        public type: string;

        public nullable(): NumberResolver;
        public optional(): NumberResolver;
        public defaultsTo(val: number): NumberResolver;
        public constraint(cond: (val: number) => boolean | string, defaultValue?: number | ((val: number) => number)): NumberResolver;

        protected cloneResolverWithNewConstraint(constraints: IConstraint<number>[], defaultValue: Safetify.Result<number>): NumberResolver;
        protected resolver(input: any): Safetify.Result<number>;
    }

    class BooleanResolver extends PrimitiveResolver<boolean> {
        public type: string;

        public nullable(): BooleanResolver;
        public optional(): BooleanResolver;
        public defaultsTo(val: boolean): BooleanResolver;
        public constraint(cond: (val: boolean) => boolean | string, defaultValue?: boolean | ((val: boolean) => boolean)): BooleanResolver;

        protected cloneResolverWithNewConstraint(constraints: IConstraint<boolean>[], defaultValue: Safetify.Result<boolean>): BooleanResolver;
        protected resolver(input: any): Safetify.Result<boolean>;
    }

    class DateResolver extends OptionalResolver<Date> {
        public type: string;

        public nullable(): DateResolver;
        public optional(): DateResolver;

        protected resolver (input: any): Safetify.Result<Date>;
    }

    class ArrayResolver<T> extends OptionalResolver<Array<T>> {
        public type: string;

        public nullable(): ArrayResolver<T>;
        public optional(): ArrayResolver<T>;

        protected resolver(input: any): Safetify.Result<Array<T>>;
    }

    class DictionaryResolver<T> extends OptionalResolver<IDictionary<T>> {
        public type: string;

        public nullable(): DictionaryResolver<T>;
        public optional(): DictionaryResolver<T>;

        protected resolver(input: any): Safetify.Result<IDictionary<T>>;
    }

    class EnumResolver<T> extends OptionalResolver<T> {
        public type: string;

        public nullable(): EnumResolver<T>;
        public optional(): EnumResolver<T>;

        protected resolver(input: any): Safetify.Result<T>;
    }

    class ObjectResolver<T> extends OptionalResolver<T> {
        public type: string;

        public nullable(): ObjectResolver<T>;
        public optional(): ObjectResolver<T>;

        protected resolver(input: any): Safetify.Result<T>;
    }

    class OneOfResolver<T> extends OptionalResolver<T> {
        public type: string;

        public nullable(): OneOfResolver<T>;
        public optional(): OneOfResolver<T>;

        protected resolver(input: any): Safetify.Result<T>;
    }

    class TupleResolver<T> extends OptionalResolver<T> {
        public type: string;

        public nullable(): TupleResolver<T>;
        public optional(): TupleResolver<T>;

        protected resolver(input: any): Safetify.Result<T>;
    }
}

declare namespace Safetify {

    abstract class Resolver<T> {
        public abstract type: string;
        public nested: boolean;
        
        protected abstract resolver (input: any): Result<T>;
    
        public resolve(input: any): Result<T>;
    }

    class Result<T> {
        public success: boolean;
        public result: T;
        public error: string | string[];
    
        constructor(success: boolean, result: T, error?: string | string[]);
    }

    class util {
        public static isDef (val: any): boolean;
        public static isDefAndNotNull (val: any): boolean;
        public static isNull (val: any): boolean;
        public static isString( val: any): boolean;
        public static isBoolean (val: any): boolean;
        public static isNumber (val: any): boolean;
        public static isPrimitive (val: any): boolean;
        public static isArray (val: any): boolean;
        public static isArrayLike (val: any): boolean;
        public static isObject (val: any): boolean;
        public static isDateLike (val: any): boolean;
        public static isValidDate (val: any): boolean;
        public static isFunction (val: any): boolean;
        public static isDict (val: any): boolean;
    }

    function Boolean(): Base.BooleanResolver;
    type Boolean = Base.BooleanResolver;

    function Number(): Base.NumberResolver;
    type Number = Base.NumberResolver;

    function String(): Base.StringResolver;
    type String = Base.StringResolver;

    type Any = Base.AnyResolver;
    function Any(): Base.AnyResolver;

    function Date(): Base.DateResolver;
    type Date = Base.DateResolver;
    
    function Object<T>(definition: IObjectResolver<T>): Base.ObjectResolver<T>;
    type Object<T> = Base.ObjectResolver<T>;

    function Array<T>(definition: Resolver<T>): Base.ArrayResolver<T>;
    type Array<T> = Base.ArrayResolver<T>;
    
    function Dictionary<T>(definition: Resolver<T>): Base.DictionaryResolver<T>;
    type Dictionary<T> = Base.DictionaryResolver<T>;

    function Enum<T>(definition: Array<string | number> | IEnum): Base.EnumResolver<T>;
    type Enum<T> = Base.EnumResolver<T>;

    function OneOf<T>(definition: Array<Resolver<T>>): Base.OneOfResolver<T>;
    type OneOf<T> = Base.OneOfResolver<T>;

    function BooleanResolver(): Base.BooleanResolver;
    type BooleanResolver = Base.BooleanResolver;

    function NumberResolver(): Base.NumberResolver;
    type NumberResolver = Base.NumberResolver;

    function StringResolver(): StringResolver;
    type StringResolver = Base.StringResolver;   

    function AnyResolver(): Base.AnyResolver;
    type AnyResolver = Base.AnyResolver;

    function DateResolver(): Base.DateResolver;
    type DateResolver = Base.DateResolver;

    function ObjectResolver<T>(definition: IObjectResolver<T>): Base.ObjectResolver<T>;
    type ObjectResolver<T> = Base.ObjectResolver<T>;

    function PartialResolver<T>(definition: IObjectResolver<T>): Base.ObjectResolver<Partial<T>>;
    type PartialResolver<T> = Base.ObjectResolver<Partial<T>>;

    function ArrayResolver<T>(definition: Resolver<T>): Base.ArrayResolver<T>;
    type ArrayResolver<T> = Base.ArrayResolver<T>;
    
    function DictionaryResolver<T>(definition: Resolver<T>): Base.DictionaryResolver<T>;
    type DictionaryResolver<T> = Base.DictionaryResolver<T>;

    function EnumResolver<T>(definition: Array<string | number> | IEnum): Base.EnumResolver<T>;
    type EnumResolver<T> = Base.EnumResolver<T>;

    function OneOfResolver<T>(definition: Resolver<T>[]): Base.OneOfResolver<T>;
    type OneOfResolver<T> = Base.OneOfResolver<T>;

    function TupleResolver<T extends Primitive[]>(definition: ITupleDefinition<T>): Base.TupleResolver<T>;
    type TupleResolver<T extends Primitive[]> = Base.TupleResolver<T>;
    
}

export = Safetify;