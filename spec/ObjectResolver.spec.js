const dec = require('../dist/safetify');

describe('Object resolver', () => {
    let resolve;

    describe('correct input', () => {

        beforeEach(() => {
            resolve = dec.Object({
                a: dec.String,
                b: dec.Number,
                c: dec.Object({
                    d: dec.String,
                    e: dec.Boolean
                })
            }).resolve({
                a: 'a',
                b: 10,
                c: {
                    d: 'd',
                    e: true
                }
            });
        });

        it('should return success as true', () => {
            expect(resolve.success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(resolve.result).toEqual({
                a: 'a',
                b: 10,
                c: {
                    d: 'd',
                    e: true
                }
            });
        });
    });
    
    describe('wrong input', () => {
        beforeEach(() => {
            resolve = dec.Object({
                a: dec.String,
                b: dec.Number,
                c: dec.Object({
                    d: dec.String,
                    e: dec.Boolean
                }),
                f: dec.Array(dec.String),
                g: dec.Object({
                    h: dec.String
                })
            }).resolve({
                a: false,
                b: 10,
                c: {
                    d: 'd',
                    e: 'trust me im boolean'
                },
                f: 'a',
                g: 'a'
            });
        });

        it('should return success as false', () => {
            expect(resolve.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(resolve.result).toEqual({
                a: '',
                b: 10,
                c: {
                    d: 'd',
                    e: true
                },
                f: [],
                g: {
                    h: ''
                }
            });
        });

        it('should return 4 errors', () => {
            expect(resolve.error.length).toBe(4);
        });
    });
    
});