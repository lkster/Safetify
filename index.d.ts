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

    abstract class PrimitiveResolver<T> extends Safetify.Resolver<T> {

        public defaultsTo (val: T): PrimitiveResolver<T>;

        public constraint (cond: (val: T) => boolean | string, defaultValue?: T | ((val: T) => T)): PrimitiveResolver<T>;
    }

    class AnyResolver {
        public resolve(input: any): Safetify.Result<any>;
    }

    class StringResolver extends PrimitiveResolver<string> {
        public type: string;
        protected resolver (input: any): Safetify.Result<string>;
    }

    class NumberResolver extends PrimitiveResolver<number> {
        public type: string;
        protected resolver (input: any): Safetify.Result<number>;
    }

    class BooleanResolver extends PrimitiveResolver<boolean> {
        public type: string;
        protected resolver (input: any): Safetify.Result<boolean>;
    }

    class DateResolver extends Safetify.Resolver<Date> {
        public type: string;
        protected resolver (input: any): Safetify.Result<Date>;
    }

    class ArrayResolver<T> extends Safetify.Resolver<Array<T>> {
        public type: string;
        protected resolver (input: any): Safetify.Result<Array<T>>;
    }

    class DictionaryResolver<T> extends Safetify.Resolver<IDictionary<T>> {
        public type: string;
        protected resolver (input: any): Safetify.Result<IDictionary<T>>;
    }

    class EnumResolver<T> extends Safetify.Resolver<T> {
        public type: string;
        protected resolver (input: any): Safetify.Result<T>;
    }

    class ObjectResolver<T> extends Safetify.Resolver<T> {
        public type: string;
        protected resolver (input: any): Safetify.Result<T>;
    }

    class OneOfResolver<T> extends Safetify.Resolver<T> {
        public type: string;
        protected resolver (input: any): Safetify.Result<T>;
    }

    class TupleResolver<T> extends Safetify.Resolver<T> {
        public type: string;
        protected resolver (input: any): Safetify.Result<T>;
    }
}

declare namespace Safetify {

    abstract class Resolver<T> {

        public abstract type: string;
        
        protected abstract resolver (input: any): Result<T>;
    
        public resolve (input: any): Result<T>;
    
        public nullable (): Resolver<T>;

        public optional (): Resolver<T>;
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

    function TupleResolver<T extends ITuple>(definition: ITupleResolver<T>): Base.TupleResolver<T>;
    type TupleResolver<T> = Base.TupleResolver<T>;
    
}

export = Safetify;