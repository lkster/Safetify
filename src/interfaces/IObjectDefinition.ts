import { Resolver } from '@/base/Resolver';



/**
 * @hidden
 */
export type IObjectDefinition<T> = {
    [U in keyof T]: Resolver<T[U]>
}