declare type DynamicObjectResolverTypeString<T> = {
    [key: string]: Safetify.Resolver<T>
}

declare type DynamicObjectResolverTypeNumber<T> = {
    [key: number]: Safetify.Resolver<T>
}

declare type EnumType = {
    [key: number]: string;
}

declare type DynamicObjectResolverType<T> = DynamicObjectResolverTypeString<T> | DynamicObjectResolverTypeNumber<T>;

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

    type ObjectResolverDefinition<T> = { [U in keyof T]: Resolver<T[U]> }

    function Object<T>(resolver: ObjectResolverDefinition<T>): Resolver<T>;
    type Object<T> = Resolver<T>;

    function Array<T>(resolver: Resolver<T>): Resolver<T[]>;
    type Array<T> = Resolver<T[]>;
    
    function DynamicObject<T>(resolver: Resolver<T>): Resolver<DynamicObjectResolverType<T>>;
    type DynamicObjectResolver<T> = Resolver<DynamicObjectResolverType<T>>;

    function Enum<T>(definition: Array<string | number> | EnumType): Resolver<T>;
    type Enum<T> = Resolver<T>;

    function OneOf<T>(resolvers: Array<Resolver<T>>): Resolver<T>;
    type OneOf<T> = Resolver<T>;
    
}

export = Safetify;