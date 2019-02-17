import { Resolver } from '@/base/Resolver';



export type IObjectDefinition<T> = {
    [U in keyof T]: Resolver<T[U]>
};
