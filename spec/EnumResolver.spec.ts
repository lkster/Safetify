import { EnumResolver, Result } from '..';
import { IDictionary } from '@/interfaces/IDictionary';



enum TestEnumNumberValues {
    option1,
    option2,
    option3
}

enum TestEnumStringValues {
    option1 = 'opt1',
    option2 = 'opt2',
    option3 = 'opt3'
}

describe('Enum Resolver', () => {
    
    describe('correct input', () => {
        
        describe('number valued enum', () => {
            let result: Result<TestEnumNumberValues>;
            let result2: Result<TestEnumNumberValues>;

            beforeEach(() => {
                result = EnumResolver<TestEnumNumberValues>(TestEnumNumberValues).resolve(0);
                result2 = EnumResolver<TestEnumNumberValues>(TestEnumNumberValues).resolve(2);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
                expect(result2.success).toBe(true);
            });

            it('should return result equals to input', () => {
                expect(result.result).toBe(TestEnumNumberValues.option1);
                expect(result2.result).toBe(TestEnumNumberValues.option3);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
                expect(result2.error.length).toBe(0);
            });
        });

        describe('string valued enum', () => {
            let result: Result<TestEnumStringValues>;
            let result2: Result<TestEnumStringValues>;

            beforeEach(() => {
                result = EnumResolver<TestEnumStringValues>(TestEnumStringValues).resolve('opt1');
                result2 = EnumResolver<TestEnumStringValues>(TestEnumStringValues).resolve('opt3');
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
                expect(result2.success).toBe(true);
            });

            it('should return result equals to input', () => {
                expect(result.result).toBe(TestEnumStringValues.option1);
                expect(result2.result).toBe(TestEnumStringValues.option3);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
                expect(result2.error.length).toBe(0);
            });
        });

        //
        // Vanilla Javascript enum representations
        //

        describe('array enum representation', () => {
            let resolver: EnumResolver<TestEnumStringValues>;

            beforeEach(() => {
                resolver = EnumResolver([
                    'option1',
                    'option2',
                    'option3'
                ]);
            });
    
            it('should return success as true', () => {
                expect(resolver.resolve('option1').success).toBe(true);
                expect(resolver.resolve('option3').success).toBe(true);
            });
    
            it('should return result equals to input', () => {
                expect(resolver.resolve('option1').result).toBe('option1');
                expect(resolver.resolve('option2').result).toBe('option2');
            });

            it('should not return error', () => {
                expect(resolver.resolve('option1').error.length).toBe(0);
            });
        });

        describe('object enum representation', () => {
            let resolver: EnumResolver<TestEnumStringValues>;
            let resolver2: EnumResolver<TestEnumNumberValues>;
            
            beforeEach(() => {
                resolver = EnumResolver(<any> {
                    opt1: 'option1',
                    opt2: 'option2',
                    opt3: 'option3'
                });

                resolver2 = EnumResolver(<any> {
                    opt1: 0,
                    opt2: 1,
                    opt3: 2
                });
            });
    
            it('should return success as true', () => {
                expect(resolver.resolve('option1').success).toBe(true);
                expect(resolver2.resolve(1).success).toBe(true);
            });
    
            it('should return result equals to input', () => {
                expect(resolver.resolve('option1').result).toBe('option1');
                expect(resolver2.resolve(1).result).toBe(1);
            });

            it('should not return error', () => {
                expect(resolver.resolve('option1').error.length).toBe(0);
                expect(resolver2.resolve(1).error.length).toBe(0);
            });
        });
    });

    describe('incorrect input', () => {
        let result: Result<TestEnumNumberValues>;
        let result2: Result<TestEnumNumberValues>;
        let result3: Result<TestEnumStringValues>;
        
        beforeEach(() => {
            result = EnumResolver<TestEnumNumberValues>(TestEnumNumberValues).resolve(undefined);
            result2 = EnumResolver<TestEnumNumberValues>(TestEnumNumberValues).resolve(5);
            result3 = EnumResolver<TestEnumStringValues>(TestEnumStringValues).resolve('nonexistingoption');
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
            expect(result2.success).toBe(false);
            expect(result3.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toBe(0);
            expect(result2.result).toBe(0);
            expect(result3.result).toBe('opt1');
        });

        it('should return 1 error', () => {
            expect(result.error.length).toBe(1);
            expect(result2.error.length).toBe(1);
            expect(result3.error.length).toBe(1);
        });

        it('should return proper error description', () => {
            expect(result.error[0]).toBe('undefined is not this enum\'s property');
            expect(result2.error[0]).toBe('number of 5 is not this enum\'s property');
            expect(result3.error[0]).toBe('"nonexistingoption" string is not this enum\'s property');
        });
    });

    describe('nullable value', () => {
        
        describe('correct value', () => {
            let result: Result<TestEnumNumberValues>;

            beforeEach(() => {
                result = EnumResolver<TestEnumNumberValues>(TestEnumNumberValues).nullable().resolve(0);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(TestEnumNumberValues.option1);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<TestEnumNumberValues>;

            beforeEach(() => {
                result = EnumResolver<TestEnumNumberValues>(TestEnumNumberValues).nullable().resolve(null);
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
            let result: Result<TestEnumNumberValues>;

            beforeEach(() => {
                result = EnumResolver<TestEnumNumberValues>(TestEnumNumberValues).nullable().resolve(undefined);
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
                expect(result.error[0]).toBe('undefined is not this enum\'s property');
            });
        });
    });

    describe('optional value', () => {
        describe('correct value', () => {
            let result: Result<TestEnumNumberValues>;

            beforeEach(() => {
                result = EnumResolver<TestEnumNumberValues>(TestEnumNumberValues).optional().resolve(0);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(TestEnumNumberValues.option1);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<TestEnumNumberValues>;

            beforeEach(() => {
                result = EnumResolver<TestEnumNumberValues>(TestEnumNumberValues).optional().resolve(null);
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

        describe('undefined value', () => {
            let result: Result<TestEnumNumberValues>;

            beforeEach(() => {
                result = EnumResolver<TestEnumNumberValues>(TestEnumNumberValues).optional().resolve(undefined);
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
            let result: Result<TestEnumNumberValues>;

            beforeEach(() => {
                result = EnumResolver<TestEnumNumberValues>(TestEnumNumberValues).optional().resolve('im a string');
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
                expect(result.error[0]).toBe('"im a string" string is not this enum\'s property');
            });
        });
    });
});