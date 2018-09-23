import { Resolver } from '@/base/Resolver';



/*
 * https://stackoverflow.com/questions/51161559/typescript-array-type-transform-with-keyof-like-method
 */
export type ITupleDefinition<T extends any[]> = { [U in keyof T]:
    U extends "length" ? T[U] :
    U extends keyof any[] ? Array<Resolver<T[number]>>[U] :
    Resolver<T[U]>
}