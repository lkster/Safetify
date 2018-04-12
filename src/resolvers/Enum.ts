import { Util } from '../Utils/Util';
import { SafeUtil } from '../Utils/SafeUtil';
import { Resolver } from '../Resolver';
import { Result } from '../Result';


export type EnumType = {
    [key: number]: string
}

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