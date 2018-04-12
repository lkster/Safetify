import { Result } from './Result';

export type ResolverFunction<T> = (input: any) => Result<T>;