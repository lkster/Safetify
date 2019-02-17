import { Util } from '@/utils/Util';



/**
 * @hidden
 */
export class SafeUtil {

    public static makeSafeString(val: any): string {
        return Util.isString(val) ? String(val) : '';
    }

    public static makeSafeNumber(val: any, safeValue = NaN): number {
        const parsed = Number(val);

        return !Util.isNull(val) && isFinite(parsed) ? parsed : safeValue;
    }

    public static makeSafeArray(val: any): any[] {
        return Util.isArray(val) ? val : [];
    }

    public static makeSafeObject(val: any): Object {
        return Util.isObject(val) ? val : {};
    }
}
