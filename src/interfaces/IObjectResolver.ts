import { Resolver } from '@/base/Resolver';

/**
 * @hidden
 */
export type IObjectResolver<T> = {
    [U in keyof T]: Resolver<T[U]>
}