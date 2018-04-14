import { EnumResolver, Result } from '../..';



enum testEnumNumberValues {
    option1,
    option2,
    option3
}

enum testEnumStringValues {
    option1 = 'opt1',
    option2 = 'opt2',
    option3 = 'opt3'
}

describe('Enum Resolver', () => {
    
    describe('correct input', () => {
        
        describe('number valued enum', () => {
            let result: Result<testEnumNumberValues>;
            let result2: Result<testEnumNumberValues>;

            beforeEach(() => {
                result = EnumResolver<testEnumNumberValues>(testEnumNumberValues).resolve(0);
                result2 = EnumResolver<testEnumNumberValues>(testEnumNumberValues).resolve(2);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
                expect(result2.success).toBe(true);
            });

            it('should return result equals to input', () => {
                expect(result.result).toBe(testEnumNumberValues.option1);
                expect(result2.result).toBe(testEnumNumberValues.option3);
            });

            it('should not return error', () => {
                expect(result.error).toBeNull();
                expect(result2.error).toBeNull();
            });
        });

        describe('string valued enum', () => {
            let result: Result<testEnumStringValues>;
            let result2: Result<testEnumStringValues>;

            beforeEach(() => {
                result = EnumResolver<testEnumStringValues>(testEnumStringValues).resolve('opt1');
                result2 = EnumResolver<testEnumStringValues>(testEnumStringValues).resolve('opt3');
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
                expect(result2.success).toBe(true);
            });

            it('should return result equals to input', () => {
                expect(result.result).toBe(testEnumStringValues.option1);
                expect(result2.result).toBe(testEnumStringValues.option3);
            });

            it('should not return error', () => {
                expect(result.error).toBeNull();
                expect(result2.error).toBeNull();
            });
        });
    });

    describe('incorrect input', () => {
        let result: Result<testEnumNumberValues>;
        let result2: Result<testEnumNumberValues>;
        let result3: Result<testEnumStringValues>;
        
        beforeEach(() => {
            result = EnumResolver<testEnumNumberValues>(testEnumNumberValues).resolve(undefined);
            result2 = EnumResolver<testEnumNumberValues>(testEnumNumberValues).resolve(5);
            result3 = EnumResolver<testEnumStringValues>(testEnumStringValues).resolve('nonexistingoption');
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

        it('should return error', () => {
            expect(result.error).not.toBeNull();
            expect(result2.error).not.toBeNull();
            expect(result3.error).not.toBeNull();
        });
    });
});