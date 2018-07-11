/*
 * Based on Closure Library's Goog Functions by Google
 * https://github.com/google/closure-library
 */
export class Util {

    /**
     * Returns true if the specified value is defined.
     * @param val Variable to test.
     */
    public static isDef(val: any): boolean {
        return val !== void 0;
    }

    /**
     * Returns true if the specified value is defined and not null.
     * @param val Variable to test.
     */
    public static isDefAndNotNull(val: any): boolean {
        return val != null;
    }

    /**
     * Returns true if the specified value is null.
     * @param val Vaiable to test.
     */
    public static isNull(val: any): boolean {
        return val === null;
    }

    /**
     * Returns true if the specified value is a string.
     * @param val Variable to test.
     */
    public static isString(val: any): boolean {
        return typeof val == 'string';
    }
    
    /**
     * Returns true if the specified value is a boolean.
     * @param val Variable to test.
     */
    public static isBoolean(val: any): boolean {
        return typeof val == 'boolean';
    }

    /**
     * Returns true if the specified value is a number.
     * @param val Variable to test.
     */
    public static isNumber(val: any): boolean {
        return typeof val == 'number';
    }

    /**
     * Returns true if the specified value is string, number, boolean, undefined, null or symbol
     * @param val Variable to test.
     */
    public static isPrimitive(val: any): boolean {
      return this.isString(val) || this.isNumber(val) || this.isBoolean(val) || !this.isDef(val) || this.isNull(val) || typeof val === 'symbol';
    }

    /**
     * Returns true if the specified value is an array.
     * @param val Variable to test.
     */
    public static isArray(val: any): boolean {
        return this._typeOf(val) == 'array';
    }

    /**
     * Returns true if the object looks like an array. To qualify as array like
     * the value needs to be either a NodeList or an object with a Number length
     * property. Note that for this function neither strings nor functions are
     * considered "array-like".
     *
     * @param val Variable to test.
     */
    public static isArrayLike(val: any): boolean {
      const type: string = this._typeOf(val);

      return type == 'array' || type == 'object' && typeof val.length == 'number';
    }

    /**
     * Returns true if the specified value is an object.  This includes arrays and
     * functions.
     * @param val Variable to test.
     */
    public static isObject(val: any): boolean {
        let type = typeof val;
        return type == 'object' && val != null || type == 'function';
    }

    /**
     * Returns true if the object looks like a Date. To qualify as Date-like the
     * value needs to be an object and have a getFullYear() function.
     * @param val Variable to test.
     */
    public static isDateLike(val: any): boolean {
      return this.isObject(val) && typeof val.getFullYear == 'function';
    }

    /**
     * Returns true if the specified value is a valid date (can be string, 
     * unix timestamp but also custom library like Moment)
     * @param val Variable to test
     */
    public static isValidDate(val: any): boolean {
      return this.isDefAndNotNull(val) && !this.isBoolean(val) && !isNaN(+new Date(val));
    }

    /**
     * Returns true if the specified value is a function.
     * @param val Variable to test.
     */
    public static isFunction(val: any): boolean {
      return this._typeOf(val) == 'function';
    }

    /**
     * Returns true if the specified value is a dictionary typed object. This means that object is created
     * only to be a storage without any logic
     * @param val Variable to test
     */
    public static isDict(val: any): boolean {
      return this.isObject(val) && val.constructor === Object;
    }

    /**
     * @hidden
     * This is a "fixed" version of the typeof operator.  It differs from the typeof
     * operator in such a way that null returns 'null' and arrays return 'array'.
     * @param val The value to get the type of.
     */
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