declare interface IEnum {
    [key: number]: string;
}

declare interface IDictionary<T> {
    [key: string]: T;
    [key: number]: T;
}

declare type Primitive = string | number | boolean | undefined | null | symbol;

declare interface ITuple extends Array<Primitive> {
    [key: number]: Primitive;
}

declare type IObjectResolver<T> = { [U in keyof T]: Safetify.Resolver<T[U]> }

declare type ITupleResolver<T extends any[]> = { [U in keyof T]:
    U extends "length" ? T[U] :
    U extends keyof any[] ? Array<Safetify.Resolver<T[number]>>[U] :
    Safetify.Resolver<T[U]>
}

declare namespace Base {

    class SimpleTypeResolver<T> extends Safetify.Resolver<T> {

        public defaultsTo(val: T): SimpleTypeResolver<T>;

        public constraint (cond: (val: T) => boolean | string, defaultValue?: T | ((val: T) => T)): SimpleTypeResolver<T>;
    }

    class AnyResolver {

        constructor(resolver: Safetify.ResolverFunction<any>);

        public resolve(input: any): Safetify.Result<any>;
    }

    class StringResolver extends SimpleTypeResolver<string> {}

    class NumberResolver extends SimpleTypeResolver<number> {}

    class BooleanResolver extends SimpleTypeResolver<boolean> {}

    class DateResolver extends Safetify.Resolver<Date> {}

    class ArrayResolver<T> extends Safetify.Resolver<Array<T>> {}

    class DictionaryResolver<T> extends Safetify.Resolver<IDictionary<T>> {}

    class EnumResolver<T> extends Safetify.Resolver<T> {}

    class ObjectResolver<T> extends Safetify.Resolver<T> {}

    class OneOfResolver<T> extends Safetify.Resolver<T> {}

    class TupleResolver<T> extends Safetify.Resolver<T> {}
}

declare namespace Safetify {

    class Resolver<T> {

        constructor(type: string, resolver: ResolverFunction<T>);
    
        public resolve(input: any): Result<T>;
    
        public nullable(): Resolver<T>;
    }

    class Result<T> {

        public success: boolean;
        public result: T;
        public error: string | string[];
    
        constructor(success: boolean, result: T, error?: string | string[]);
    }

    class util {
        public static isDef(val: any): boolean;
        public static isDefAndNotNull(val: any): boolean;
        public static isNull(val: any): boolean;
        public static isString(val: any): boolean;
        public static isBoolean(val: any): boolean;
        public static isNumber(val: any): boolean;
        public static isPrimitive(val: any): boolean;
        public static isArray(val: any): boolean;
        public static isArrayLike(val: any): boolean;
        public static isObject(val: any): boolean;
        public static isDateLike(val: any): boolean;
        public static isValidDate(val: any): boolean;
        public static isFunction(val: any): boolean;
        public static isDict(val: any): boolean;
    }

    type ResolverFunction<T> = (input: any) => Result<T>;

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
    
    function Object<T>(resolver: IObjectResolver<T>): Base.ObjectResolver<T>;
    type Object<T> = Base.ObjectResolver<T>;

    function Array<T>(resolver: Resolver<T>): Base.ArrayResolver<T>;
    type Array<T> = Base.ArrayResolver<T>;
    
    function Dictionary<T>(resolver: Resolver<T>): Base.DictionaryResolver<T>;
    type Dictionary<T> = Base.DictionaryResolver<T>;

    function Enum<T>(definition: Array<string | number> | IEnum): Base.EnumResolver<T>;
    type Enum<T> = Base.EnumResolver<T>;

    function OneOf<T>(resolvers: Array<Resolver<T>>): Base.OneOfResolver<T>;
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

    function ObjectResolver<T>(resolver: IObjectResolver<T>): Base.ObjectResolver<T>;
    type ObjectResolver<T> = Base.ObjectResolver<T>;

    function PartialResolver<T>(resolver: IObjectResolver<T>): Base.ObjectResolver<Partial<T>>;
    type PartialResolver<T> = Base.ObjectResolver<Partial<T>>;

    function ArrayResolver<T>(resolver: Resolver<T>): Base.ArrayResolver<T>;
    type ArrayResolver<T> = Base.ArrayResolver<T>;
    
    function DictionaryResolver<T>(resolver: Resolver<T>): Base.DictionaryResolver<T>;
    type DictionaryResolver<T> = Base.DictionaryResolver<T>;

    function EnumResolver<T>(definition: Array<string | number> | IEnum): Base.EnumResolver<T>;
    type EnumResolver<T> = Base.EnumResolver<T>;

    function OneOfResolver<T>(resolvers: Resolver<T>[]): Base.OneOfResolver<T>;
    type OneOfResolver<T> = Base.OneOfResolver<T>;

    function TupleResolver<T extends ITuple>(resolvers: ITupleResolver<T>): Base.TupleResolver<T>;
    type TupleResolver<T> = Base.TupleResolver<T>;
    
}

export = Safetify;