const { ObjectResolver, StringResolver, NumberResolver, BooleanResolver, ArrayResolver} = require('../..');



describe('Object Resolver', () => {
    
    describe('correct input', () => {
        let result;
        
        beforeEach(() => {
            result = ObjectResolver({
                a: StringResolver(),
                b: NumberResolver(),
                c: ObjectResolver({
                    d: StringResolver(),
                    e: BooleanResolver()
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
            expect(result.success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(result.result).toEqual({
                a: 'a',
                b: 10,
                c: {
                    d: 'd',
                    e: true
                }
            });
        });

        it('should not return error', () => {
            expect(result.error).toBeNull();
        });
    });

    describe('incorrect input', () => {
        let result;

        beforeEach(() => {
            result = ObjectResolver({
                a: StringResolver(),
                b: NumberResolver(),
                c: ObjectResolver({
                    d: StringResolver(),
                    e: BooleanResolver()
                }),
                f: ArrayResolver(StringResolver()),
                g: ObjectResolver({
                    h: StringResolver()
                })
            }).resolve({
                a: false,
                b: 10,
                c: {
                    d: 'd',
                    e: 'trust me im boolean'
                },
                f: 'a',
                g: 'a',
                superExtra: 'this shouldnt be here'
            });
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toEqual({
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
            expect(result.error.length).toBe(4);
        });
    });
});