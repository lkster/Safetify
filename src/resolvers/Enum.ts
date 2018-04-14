import { Util } from '@/utils/Util';
import { SafeUtil } from '@/utils/SafeUtil';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';



/**
 * @hidden
 */
export type EnumType = {
    [key: number]: string
}

/**
 * Resolves enum
 * @param definition enum representation in array, object or passed TypeScript's enum declaration
 * @example
 * <caption>
 * // Array representation
 * EnumResolver([ 'option1', 'option2', 'option3' ]).resolve('option1');
 * 
 * // Object representation
 * EnumResolver({ opt1: 'option1', opt2: 'option2', opt3: 'option3' }).resolve('option1');
 * 
 * // TypeScript's enum 
 * EnumResolver<someEnum>(someEnum).resolve('option1');
 * 
 * // output will be the same as input
 * 
 * EnumResolver<someEnum>(someEnum).resolve('option4');
 * // output will be the first enum item, in this case 'option1'
 * </caption>
 */
export function EnumResolver<T>(definition: Array<string | number> | EnumType) {
    return new Resolver<T>('enum', (input: any) => {
        
        let error;
        let result: string | number = 0;

        if (Util.isArray(definition)) {
            if ((<Array<string | number>> definition).indexOf(input) > -1) {
                result = input;
            } else {
                error = 'value is not this enum\'s property';
                result = definition[0];
            }
        } else if (Util.isObject(definition)) {
            if (Object.keys(definition).map(e => definition[e]).indexOf(input) > -1) {
                result = input;
            } else {
                error = 'value is not this enum\'s property';
                result = Util.isDef(definition[0]) ? 0 : definition[Object.keys(definition)[0]];
            }
        } else {
            error = 'Enum definition is not valid';
        }

        return new Result<T>(!Util.isDefAndNotNull(error), <any> result, error);
    });
}