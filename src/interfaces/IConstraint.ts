export interface IConstraint<T> {
    condition: (val: T) => boolean | string;
    defaultValue: T | ((val: T) => T);
}