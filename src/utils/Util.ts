/**
 * @hidden
 */
export class Util {

    public static isDef(val: any): boolean {
        return val !== void 0;
    }

    public static isDefAndNotNull(val: any): boolean {
        return val != null;
    }

    public static isString(val: any): boolean {
        return typeof val == 'string';
    }
    
    public static isBoolean(val: any): boolean {
        return typeof val == 'boolean';
    }

    public static isNumber(val: any): boolean {
        return typeof val == 'number';
    }

    public static isArray(val: any): boolean {
        return this._typeOf(val) == 'array';
    }

    public static isArrayLike(val: any): boolean {
      const type: string = this._typeOf(val);

      return type == 'array' || type == 'object' && typeof val.length == 'number';
    }

    public static isObject(val: any): boolean {
        let type = typeof val;
        return type == 'object' && val != null || type == 'function';
    }

    public static isDateLike(val: any): boolean {
      return this.isObject(val) && typeof val.getFullYear == 'function';
    }

    public static isStringValidDate(val: any): boolean {
      return !isNaN(+new Date(val));
    }

    public static isFunction(val: any): boolean {
      return this._typeOf(val) == 'function';
    }

    private static _typeOf(val: any): string {
        let s: string = typeof val;

        if (s == 'object') {
          if (val) {

            if (val instanceof Array) {
              return 'array';
            } else if (val instanceof Object) {
              return s;
            }
      
            let className: string = Object.prototype.toString.call(val);

            if (className == '[object Window]') {
              return 'object';
            }

            if (className == '[object Array]' ||
                    typeof val.length == 'number' &&
                    typeof val.splice != 'undefined' &&
                    typeof val.propertyIsEnumerable != 'undefined' &&
                    !val.propertyIsEnumerable('splice')
                ) {
              return 'array';
            }

            if (className == '[object Function]' ||
                    typeof val.call != 'undefined' &&
                    typeof val.propertyIsEnumerable != 'undefined' &&
                    !val.propertyIsEnumerable('call')
                ) {
              return 'function';
            }
          } else {
            return 'null';
          }
      
        } else if (s == 'function' && typeof val.call == 'undefined') {
          return 'object';
        }
      return s;
    }
}