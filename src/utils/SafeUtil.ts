import { Util } from './Util';



/**
 * @hidden
 */
export class SafeUtil {

    public static makeSafeString(val: any): string {
        return Util.isString(val) ? String(val) : '';
    }

    public static makeSafeNumber(val: any, safeValue = NaN): number {
        let parsed = Number(val);
        return isFinite(parsed) ? parsed : safeValue;
    }

    public static makeSafeArray(val: any): Array<any> {
        return Util.isArray(val) ? val : [];
    }

    public static makeSafeObject(val: any): Object {
        return Util.isObject(val) ? val : {};
    }
}