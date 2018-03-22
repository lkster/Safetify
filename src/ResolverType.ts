import { Result } from './Result';

export type ResolverType<T> = (input: any) => Result<T>;