import { Result } from '@/Result';



/**
 * Function that validates and resolves given data
 */
export type ResolverFunction<T> = (input: any) => Result<T>;