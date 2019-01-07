import { Resolver } from '@/base/Resolver';
import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { IPrimitive } from './IPrimitive';



/*
 * https://stackoverflow.com/questions/51161559/typescript-array-type-transform-with-keyof-like-method
 */
export type ITupleDefinition<T extends IPrimitive[]> = { [U in keyof T]:
    U extends 'length' ? T[U] :
    U extends keyof IPrimitive[] ? (PrimitiveResolver<T[number]>[])[U] :
    PrimitiveResolver<U>
};
