export class Result<T> {
    
    constructor (
        public success: boolean,
        public result: T,
        public error?: string | string[]
    ) {}
}