declare var module: any;

import { ArrayResolver as arrayResolver } from './resolvers/Array';
import { BooleanResolver as booleanResolver } from './resolvers/Boolean';
import { NumberResolver as numberResolver } from './resolvers/Number';
import { StringResolver as stringResolver } from './resolvers/String';
import { ObjectResolver as objectResolver } from './resolvers/Object';
import { AnyResolver as anyResolver } from './resolvers/Any';
import { DictionaryResolver as dictionaryResolver } from './resolvers/Dictionary';
import { OneOfResolver as oneOfResolver } from './resolvers/OneOf';
import { EnumResolver as enumResolver } from './resolvers/Enum';

export { Resolver } from './Resolver';
export { Result } from './Result';
export { ResolverType } from './ResolverType';

export const Array = arrayResolver;
export const ArrayResolver = arrayResolver;

export const Boolean = booleanResolver;
export const BooleanResolver = booleanResolver;

export const Number = numberResolver;
export const NumberResolver = numberResolver;

export const String = stringResolver;
export const StringResolver = stringResolver;

export const Object = objectResolver;
export const ObjectResolver = objectResolver;

export const Any = anyResolver;
export const AnyResolver = anyResolver;

export const Dictionary = dictionaryResolver;
export const DictionaryResolver = dictionaryResolver;

export const OneOf = oneOfResolver;
export const OneOfResolver = oneOfResolver;

export const Enum = enumResolver;
export const EnumResolver = enumResolver;