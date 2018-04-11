const dec = require('../../dist/safetify');

describe('Enum decoder', () => {
    let resolve;

    describe('correct input', () => {
        describe('array enum representation', () => {
            beforeEach(() => {
                resolve = dec.Enum([
                    'option1',
                    'option2',
                    'option3'
                ]);
            });
    
            it('should return success as true', () => {
                expect(resolve.resolve('option1').success).toBeTruthy();
                expect(resolve.resolve('option3').success).toBeTruthy();
            });
    
            it('should return result equals to input', () => {
                expect(resolve.resolve('option1').result).toBe('option1');
                expect(resolve.resolve('option2').result).toBe('option2');
            });
        });

        describe('object enum representation', () => {
            beforeEach(() => {
                resolve = dec.Enum({
                    opt1: 'option1',
                    opt2: 'option2',
                    opt3: 'option3'
                });
            });
    
            it('should return success as true', () => {
                expect(resolve.resolve('option1').success).toBeTruthy();
                expect(resolve.resolve('option3').success).toBeTruthy();
            });
    
            it('should return result equals to input', () => {
                expect(resolve.resolve('option1').result).toBe('option1');
                expect(resolve.resolve('option2').result).toBe('option2');
            });
        });
    });

    describe('wrong input', () => {
        beforeEach(() => {
            resolve = dec.Enum([
                'option1',
                'option2',
                'option3'
            ]).resolve('option4');
        });

        it('should should return success as false', () => {
            expect(resolve.success).toBeFalsy();
        });

        it('should should return safe value', () => {
            expect(resolve.result).toBe('option1');
        });

        it('should return error', () => {
            expect(resolve.error).toBeDefined();
        });
    });
});