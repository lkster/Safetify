/**
 * @hidden
 */
export interface IConstraint<T> {
    defaultValue: T | ((val: T) => T);
    condition(val: T): boolean | string;
}
