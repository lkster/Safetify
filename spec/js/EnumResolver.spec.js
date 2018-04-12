const { EnumResolver } = require('../..');



describe('Enum decoder', () => {

    describe('correct input', () => {
        describe('array enum representation', () => {
            let resolver;

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
                expect(resolver.resolve('option1').error).toBeUndefined();
            });
        });

        describe('object enum representation', () => {
            let resolver;
            let resolver2;
            
            beforeEach(() => {
                resolver = EnumResolver({
                    opt1: 'option1',
                    opt2: 'option2',
                    opt3: 'option3'
                });

                resolver2 = EnumResolver({
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
                expect(resolver.resolve('option1').error).toBeUndefined();
                expect(resolver2.resolve(1).error).toBeUndefined();
            });
        });
    });

    describe('wrong input', () => {
        let testEnum = [ 'option1', 'option2', 'option3' ];
        let result;
        let result2;
        
        beforeEach(() => {
            result = EnumResolver(testEnum).resolve(undefined);
            result2 = EnumResolver(testEnum).resolve('option4');
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
            expect(result2.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toBe('option1');
            expect(result2.result).toBe('option1');
        });

        it('should return error', () => {
            expect(result.error).toBeDefined();
            expect(result2.error).toBeDefined();
        });
    });
});