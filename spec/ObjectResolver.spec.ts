import { ObjectResolver, StringResolver, NumberResolver, BooleanResolver, ArrayResolver, Result, DictionaryResolver } from '..';



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

describe('Object Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<ITest>;
        
        beforeEach(() => {
            result = ObjectResolver<ITest>({
                a: StringResolver(),
                b: NumberResolver(),
                c: ObjectResolver<ITestC>({
                    d: StringResolver(),
                    e: BooleanResolver(),
                }),
            }).resolve({
                a: 'a',
                b: 10,
                c: {
                    d: 'd',
                    e: true,
                },
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
                    e: true,
                },
            });
        });

        it('should not return error', () => {
            expect(result.error.length).toBe(0);
        });
    });

    describe('incorrect input', () => {
        let result: Result<ITest>;
        
        beforeEach(() => {
            result = ObjectResolver<ITest>({
                a: StringResolver(),
                b: NumberResolver(),
                c: ObjectResolver<ITestC>({
                    d: StringResolver(),
                    e: BooleanResolver(),
                }),
            }).resolve('im an object');
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return result safe value', () => {
            expect(result.result).toEqual({
                a: '',
                b: NaN,
                c: {
                    d: '',
                    e: false,
                },
            });
        });

        it('should return proper error', () => {
            expect(result.error).toEqual(['string is not an object']);
        });
    });

    describe('incorrect input values', () => {
        let result: Result<ITestExtended>;

        beforeEach(() => {
            result = ObjectResolver<ITestExtended>({
                a: StringResolver(),
                b: NumberResolver(),
                c: ObjectResolver<ITestC>({
                    d: StringResolver(),
                    e: BooleanResolver(),
                }),
                f: ArrayResolver(StringResolver()),
                g: ObjectResolver<ITestG>({
                    h: StringResolver(),
                }),
            }).resolve({
                a: false,
                b: 10,
                c: {
                    d: 'd',
                    e: 'trust me im boolean',
                },
                f: 'a',
                g: 'a',
                superExtra: 'this shouldnt be here',
            });
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toEqual(<any> {
                a: '',
                b: 10,
                c: {
                    d: 'd',
                    e: true,
                },
                f: [],
                g: {
                    h: '',
                },
            });
        });

        it('should return 4 errors', () => {
            expect(result.error.length).toBe(4);
        });

        it('should return proper errors descriptions', () => {
            expect(result.error[0]).toBe('a: boolean is not a string');
            expect(result.error[1]).toBe('c.e: string is not a boolean');
            expect(result.error[2]).toBe('f: string is not an array');
            expect(result.error[3]).toBe('g: string is not an object');
        });
    });

    describe('nullable value', () => {
        describe('correct value', () => {
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                }).nullable().resolve({
                    a: 'a',
                    b: 10,
                    c: {
                        d: 'd',
                        e: true,
                    },
                });
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual({
                    a: 'a',
                    b: 10,
                    c: {
                        d: 'd',
                        e: true,
                    },
                });
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                }).nullable().resolve(null);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(null);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('incorrect value', () => {
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                }).nullable().resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return null as result', () => {
                expect(result.result).toBe(null);
            });

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('undefined is not an object');
            });
        });

        describe('incorrect input values', () => {
            let result: Result<ITestExtended>;
    
            beforeEach(() => {
                result = ObjectResolver<ITestExtended>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                    f: ArrayResolver(StringResolver()),
                    g: ObjectResolver<ITestG>({
                        h: StringResolver(),
                    }),
                }).nullable().resolve({
                    a: false,
                    b: 10,
                    c: {
                        d: 'd',
                        e: 'trust me im boolean',
                    },
                    f: 'a',
                    g: 'a',
                    superExtra: 'this shouldnt be here',
                });
            });
    
            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });
    
            it('should return safe value', () => {
                expect(result.result).toEqual(<any> {
                    a: '',
                    b: 10,
                    c: {
                        d: 'd',
                        e: true,
                    },
                    f: [],
                    g: {
                        h: '',
                    },
                });
            });
    
            it('should return 4 errors', () => {
                expect(result.error.length).toBe(4);
            });
    
            it('should return proper errors descriptions', () => {
                expect(result.error[0]).toBe('a: boolean is not a string');
                expect(result.error[1]).toBe('c.e: string is not a boolean');
                expect(result.error[2]).toBe('f: string is not an array');
                expect(result.error[3]).toBe('g: string is not an object');
            });
        });
    });

    describe('optional value', () => {
        describe('correct value', () => {
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                }).optional().resolve({
                    a: 'a',
                    b: 10,
                    c: {
                        d: 'd',
                        e: true,
                    },
                });
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual({
                    a: 'a',
                    b: 10,
                    c: {
                        d: 'd',
                        e: true,
                    },
                });
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                }).optional().resolve(null);
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(undefined);
            });

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });
        });

        describe('undefined value', () => {
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                }).optional().resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(undefined);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('incorrect value', () => {
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                }).optional().resolve(23);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return undefined as result', () => {
                expect(result.result).toBe(undefined);
            });

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('number is not an object');
            });
        });

        describe('incorrect input values', () => {
            let result: Result<ITestExtended>;
    
            beforeEach(() => {
                result = ObjectResolver<ITestExtended>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                    f: ArrayResolver(StringResolver()),
                    g: ObjectResolver<ITestG>({
                        h: StringResolver(),
                    }),
                }).optional().resolve({
                    a: false,
                    b: 10,
                    c: {
                        d: 'd',
                        e: 'trust me im boolean',
                    },
                    f: 'a',
                    g: 'a',
                    superExtra: 'this shouldnt be here',
                });
            });
    
            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });
    
            it('should return safe value', () => {
                expect(result.result).toEqual(<any> {
                    a: '',
                    b: 10,
                    c: {
                        d: 'd',
                        e: true,
                    },
                    f: [],
                    g: {
                        h: '',
                    },
                });
            });
    
            it('should return 4 errors', () => {
                expect(result.error.length).toBe(4);
            });
    
            it('should return proper errors descriptions', () => {
                expect(result.error[0]).toBe('a: boolean is not a string');
                expect(result.error[1]).toBe('c.e: string is not a boolean');
                expect(result.error[2]).toBe('f: string is not an array');
                expect(result.error[3]).toBe('g: string is not an object');
            });
        });
    });

    describe('combined errors description', () => {
        it('should create proper error description with ObjectResolver at the start of chain', () => {
            const result: Result<any> = ObjectResolver({ a: DictionaryResolver(StringResolver())}).resolve({ a: { b: 23423 }});

            expect(result.error[0]).toBe('a.b: number is not a string');
        });

        it('should create proper error description with ObjectResolver inside chain', () => {
            const result: Result<any> = DictionaryResolver(ObjectResolver({ b: DictionaryResolver(StringResolver())})).resolve({ a: { b: { c: 23423 }}});

            expect(result.error[0]).toBe('a.b.c: number is not a string');
        });

        it('should create proper error description with ObjectResolver at the end of chain', () => {
            const result: Result<any> = DictionaryResolver(ObjectResolver({ b: StringResolver() })).resolve({ a: { b: 2423 }});

            expect(result.error[0]).toBe('a.b: number is not a string');
        });
    });

    describe('immutable', () => {
        describe('nullable', () => {
            let resolver1: ObjectResolver<ITest>;
            let resolver2: ObjectResolver<ITest>;
            
            beforeEach(() => {
                resolver1 = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                });
                resolver2 = resolver1.nullable();
            });

            it('should return new instance of resolver', () => {
                expect(resolver1).not.toBe(resolver2);
            });

            it('should set nullable option in new returned instance instead of actual one', () => {
                expect(resolver1.resolve(null).result).toEqual({
                    a: '',
                    b: NaN,
                    c: {
                        d: '',
                        e: false,
                    },
                });
                expect(resolver2.resolve(null).result).toBeNull();
            });

            it('should pass actual optional option state to new instance when nullable option is being set', () => {
                resolver1 = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                }).optional();
                resolver2 = resolver1.nullable();

                expect(resolver1.resolve(undefined).success).toBe(true);
                expect(resolver2.resolve(undefined).success).toBe(true);
            });
        });

        describe('optional', () => {
            let resolver1: ObjectResolver<ITest>;
            let resolver2: ObjectResolver<ITest>;

            beforeEach(() => {
                resolver1 = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                });
                resolver2 = resolver1.optional();
            });

            it('should return new instance of resolver', () => {
                expect(resolver1).not.toBe(resolver2);
            });

            it('should set optional option in new returned instance instead of actual one', () => {
                expect(resolver1.resolve(undefined).result).toEqual({
                    a: '',
                    b: NaN,
                    c: {
                        d: '',
                        e: false,
                    },
                });
                expect(resolver2.resolve(undefined).result).toBeUndefined();
            });

            it('should pass actual nullable option state to new instance when optional option is being set', () => {
                resolver1 = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver(),
                    }),
                }).nullable();
                resolver2 = resolver1.optional();

                expect(resolver1.resolve(null).result).toBeNull();
                expect(resolver2.resolve(null).result).toBeNull();
            });
        });
    });
});
