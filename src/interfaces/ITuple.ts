import { IPrimitive } from '@/interfaces/IPrimitive';



export interface ITuple extends Array<IPrimitive> {
    [key: number]: IPrimitive;
}
