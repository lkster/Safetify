import { IEnum } from '@/interfaces/IEnum';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';



export class EnumResolver<T> extends Resolver<T> {

    public type: string = 'enum';

    /**
     * @hidden
     */
    constructor (
        /**
         * @hidden
         */
        private definition: Array<string | number> | IEnum
    ) {
        super();
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<T> {
        let error = null;
        let result: string | number = 0;

        if (Util.isArray(this.definition)) {
            if ((<Array<string | number>> this.definition).indexOf(input) > -1) {
                result = input;
            } else {
                error = 'value is not this enum\'s property';
                result = this.definition[0];
            }
        } else if (Util.isObject(this.definition)) {
            if (Object.keys(this.definition).map(e => this.definition[e]).indexOf(input) > -1) {
                result = input;
            } else {
                error = 'value is not this enum\'s property';
                result = Util.isDef(this.definition[0]) ? 0 : this.definition[Object.keys(this.definition)[0]];
            }
        } else {
            error = 'Enum definition is not valid';
        }

        return new Result<T>(!Util.isDefAndNotNull(error), <any> result, error);
    } 


}