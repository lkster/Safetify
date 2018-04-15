declare interface IEnum {
    [key: number]: string;
}

declare interface IDictionary<T> {
    [key: string]: T;
    [key: number]: T;
}

declare type IObjectResolver<T> = { [U in keyof T]: Safetify.Resolver<T[U]> }

declare namespace Base {

    class SimpleTypeResolver<T> extends Safetify.Resolver<T> {

        public defaultsTo(val: T): SimpleTypeResolver<T>;
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

    function ArrayResolver<T>(resolver: Resolver<T>): Base.ArrayResolver<T>;
    type ArrayResolver<T> = Base.ArrayResolver<T>;
    
    function DictionaryResolver<T>(resolver: Resolver<T>): Base.DictionaryResolver<T>;
    type DictionaryResolver<T> = Base.DictionaryResolver<T>;

    function EnumResolver<T>(definition: Array<string | number> | IEnum): Base.EnumResolver<T>;
    type EnumResolver<T> = Base.EnumResolver<T>;

    function OneOfResolver<T>(resolvers: Resolver<T>[]): Base.OneOfResolver<T>;
    type OneOfResolver<T> = Base.OneOfResolver<T>;
    
}

export = Safetify;