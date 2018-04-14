/**
 * @hidden
 */
export interface IDictionary<T> {
    [key: string]: T;
    [key: number]: T;
}