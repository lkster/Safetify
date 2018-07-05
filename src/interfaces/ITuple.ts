import { IPrimitive } from './IPrimitive';


export interface ITuple extends Array<IPrimitive> {
    [key: number]: IPrimitive;
}