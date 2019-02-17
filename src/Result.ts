import { IDictionary } from './interfaces/IDictionary';

/**
 * Resolver's result representation
 */
export class Result<T> {
    
    /**
     *
     * @param success true if data is successfuly resolved, false otherwise
     * @param result resolved data
     * @param error has error(s) if resolving failed
     * @param optionalData any data you want to stick to this object. Mostly used to pass data between resolver handlers.
     */
    public constructor (
        public success: boolean,
        public result: T,
        public error: string[],
        public optionalData: IDictionary<any> = null,
    ) {}
}
