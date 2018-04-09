declare var module: any;

export { ArrayResolver as Array } from './resolvers/Array';
export { BooleanResolver as Boolean } from './resolvers/Boolean';
export { NumberResolver as Number } from './resolvers/Number';
export { StringResolver as String } from './resolvers/String';
export { ObjectResolver as Object, ObjectResolverDefinition } from './resolvers/Object';
export { AnyResolver as Any } from './resolvers/Any';
export { DictionaryResolver as Dictionary } from './resolvers/Dictionary';
export { OneOfResolver as OneOf } from './resolvers/OneOf';
export { EnumResolver as Enum } from './resolvers/Enum';
export { Resolver } from './Resolver';
export { Result } from './Result';
export { ResolverType } from './ResolverType';