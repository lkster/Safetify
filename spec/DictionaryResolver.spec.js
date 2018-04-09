const dec = require('../dist/safetify');

describe('Dictionary resolver', () => {
    let resolve;

    describe('correct input', () => {

        beforeEach(() => {
            resolve = dec.Dictionary(dec.String)
                .resolve({
                    a: 'a',
                    b: 'b',
                    c: 'c'
                });
        });

        it('should return success as true', () => {
            expect(resolve.success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(resolve.result).toEqual({
                a: 'a',
                b: 'b',
                c: 'c'
            });
        });
    });
    
    describe('wrong input', () => {
        beforeEach(() => {
            resolve = dec.Dictionary(dec.String)
                .resolve({
                    a: 'a',
                    b: 10,
                    c: {
                        d: 'd',
                        e: 'trust me im boolean'
                    }
                });
        });

        it('should return success as false', () => {
            expect(resolve.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(resolve.result).toEqual({
                a: 'a',
                b: '',
                c: ''
            });
        });

        it('should return 2 errors', () => {
            expect(resolve.error.length).toBe(2);
        });
    });
    
});