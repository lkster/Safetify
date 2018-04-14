/**
 * Resolver's result representation
 */
export class Result<T> {
    
    /**
     * 
     * @param success true if data is successfuly resolved, false otherwise
     * @param result resolved data
     * @param error has error(s) if resolving failed
     */
    constructor (
        public success: boolean,
        public result: T,
        public error: string | string[]
    ) {}
}