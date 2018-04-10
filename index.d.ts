declare type DictionaryResolverTypeString<T> = {
    [key: string]: Safetify.Resolver<T>
}

declare type DictionaryResolverTypeNumber<T> = {
    [key: number]: Safetify.Resolver<T>
}

declare type EnumType = {
    [key: number]: string;
}

declare type DictionaryResolverType<T> = DictionaryResolverTypeString<T> | DictionaryResolverTypeNumber<T>;

declare namespace Safetify {

    class Resolver<T> {

        constructor(type: string, resolver: ResolverType<T>);
    
        public resolve(input: any): Result<T>;
    
        public defaultsTo(val: T): Resolver<T>;
    
        public nullable(): Resolver<T>;
    }

    class Result<T> {

        public success: boolean;
        public result: T;
        public error: string | string[];
    
        constructor(success: boolean, result: T, error?: string | string[]);
    }

    type ResolverType<T> = (input: any) => Result<T>;

    const Boolean: Resolver<boolean>;
    type Boolean = Resolver<boolean>;

    const Number: Resolver<number>;
    type Number = Resolver<number>;

    const String: Resolver<string>;
    type String = Resolver<string>;

    type Any = Resolver<any>;
    const Any: Resolver<any>;

    const BooleanResolver: Resolver<boolean>;
    type BooleanResolver = Resolver<boolean>;

    const NumberResolver: Resolver<number>;
    type NumberResolver = Resolver<number>;

    const StringResolver: Resolver<string>;
    type StringResolver = Resolver<string>;

    type AnyResolver = Resolver<any>;
    const AnyResolver: Resolver<any>;
    

    type ObjectResolverDefinition<T> = { [U in keyof T]: Resolver<T[U]> }

    function Object<T>(resolver: ObjectResolverDefinition<T>): Resolver<T>;
    type Object<T> = Resolver<T>;

    function Array<T>(resolver: Resolver<T>): Resolver<T[]>;
    type Array<T> = Resolver<T[]>;
    
    function Dictionary<T>(resolver: Resolver<T>): Resolver<DictionaryResolverType<T>>;
    type Dictionary<T> = Resolver<DictionaryResolverType<T>>;

    function Enum<T>(definition: Array<string | number> | EnumType): Resolver<T>;
    type Enum<T> = Resolver<T>;

    function OneOf<T>(resolvers: Array<Resolver<T>>): Resolver<T>;
    type OneOf<T> = Resolver<T>;

    function ObjectResolver<T>(resolver: ObjectResolverDefinition<T>): Resolver<T>;
    type ObjectResolver<T> = Resolver<T>;

    function ArrayResolver<T>(resolver: Resolver<T>): Resolver<T[]>;
    type ArrayResolver<T> = Resolver<T[]>;
    
    function DictionaryResolver<T>(resolver: Resolver<T>): Resolver<DictionaryResolverType<T>>;
    type DictionaryResolver<T> = Resolver<DictionaryResolverType<T>>;

    function EnumResolver<T>(definition: Array<string | number> | EnumType): Resolver<T>;
    type EnumResolver<T> = Resolver<T>;

    function OneOfResolver<T>(resolvers: Array<Resolver<T>>): Resolver<T>;
    type OneOfResolver<T> = Resolver<T>;
    
}

export = Safetify;