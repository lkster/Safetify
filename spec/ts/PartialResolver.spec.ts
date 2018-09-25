import { PartialResolver, ObjectResolver, StringResolver, NumberResolver, BooleanResolver, ArrayResolver, Result } from '../..';



interface ITestC {
    d: string;
    e: boolean;
}

interface ITestG {
    h: string;
}

interface ITest {
    a: string;
    b: number;
    c: ITestC;
}

interface ITestExtended extends ITest {
    f: string[];
    g: ITestG;
}

describe('Partial Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<Partial<ITest>>;
        
        beforeEach(() => {
            result = PartialResolver<ITest>({
                a: StringResolver(),
                b: NumberResolver(),
                c: ObjectResolver<ITestC>({
                    d: StringResolver(),
                    e: BooleanResolver()
                })
            }).resolve({
                a: 'a',
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
        let result: Result<Partial<ITestExtended>>;

        beforeEach(() => {
            result = PartialResolver<ITestExtended>({
                a: StringResolver(),
                b: NumberResolver(),
                c: ObjectResolver<ITestC>({
                    d: StringResolver(),
                    e: BooleanResolver()
                }),
                f: ArrayResolver(StringResolver()),
                g: ObjectResolver<ITestG>({
                    h: StringResolver()
                })
            }).resolve({
                a: false,
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
            expect(result.result).toEqual(<any> {
                a: '',
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

    describe('nullable value', () => {
        
        describe('correct input', () => {
            let result: Result<Partial<ITest>>;

            beforeEach(() => {
                result = PartialResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver()
                    })
                }).nullable().resolve({
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

        describe('null input', () => {
            let result: Result<Partial<ITest>>;

            beforeEach(() => {
                result = PartialResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver()
                    })
                }).nullable().resolve(null);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });
    
            it('should return result as null', () => {
                expect(result.result).toBeNull();
            });
    
            it('should not return error', () => {
                expect(result.error).toBeNull();
            });
        });

        describe('incorrect property', () => {
            let result: Result<Partial<ITest>>;

            beforeEach(() => {
                result = PartialResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver()
                    })
                }).nullable().resolve({
                    a: 423,
                    b: 'im a number',
                    c: {
                        d: 'd',
                        e: true
                    }
                });
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });
    
            it('should return safe value', () => {
                expect(result.result).toEqual({
                    a: '',
                    b: NaN,
                    c: {
                        d: 'd',
                        e: true
                    }
                });
            });
    
            it('should return 2 errors', () => {
                expect(result.error.length).toBe(2);
            });
        });

        describe('incorrect input', () => {
            let result: Result<Partial<ITest>>;

            beforeEach(() => {
                result = PartialResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver()
                    })
                }).nullable().resolve(234234);
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });
    
            it('should return result as null', () => {
                expect(result.result).toBeNull();
            });
    
            it('should return error', () => {
                expect(result.error.length).toBe(1);
            });
        });
    });
}); 