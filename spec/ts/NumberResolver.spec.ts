import { NumberResolver, Result } from '../..';



describe('Number Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<number>;
        let result2: Result<number>;

        beforeEach(() => {
            result = NumberResolver().resolve(17);
            result2 = NumberResolver().resolve(14.5);
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);    
            expect(result2.success).toBe(true);    
        });

        it('should return result equals to input', () => {
            expect(result.result).toBe(17);
            expect(result2.result).toBe(14.5);
        });

        it('should not return error', () => {
            expect(result.error).toBeNull();
            expect(result2.error).toBeNull();
        });
    });

    describe('incorrect input', () => {
        let result: Result<number>;

        beforeEach(() => {
            result = NumberResolver().resolve(undefined);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);    
        });

        it('should return safe value', () => {
            expect(result.result).toBeNaN();
        });

        it('should return error', () => {
            expect(result.error).not.toBeNull();
        });
    });

    describe('NaN input', () => {
        let result: Result<number>;

        beforeEach(() => {
            result = NumberResolver().defaultsTo(6).resolve(NaN);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return error', () => {
            expect(result.error).not.toBeNull();
        });

        it('should set value to default', () => {
            expect(result.result).toBe(6);
        });
    });

    describe('default value', () => {
        
        describe('correct value', () => {
            let result: Result<number>;

            beforeEach(() => {
                result = NumberResolver().defaultsTo(23).resolve(46);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(46);
            });

            it('should not return error', () => {
                expect(result.error).toBeNull();
            });
        });
        
        describe('incorrect value', () => {
            let result: Result<number>;

            beforeEach(() => {
                result = NumberResolver().defaultsTo(23).resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return result as default value', () => {
                expect(result.result).toBe(23);
            });

            it('should return error', () => {
                expect(result.error).not.toBeNull();
            });
        });

        describe('incorrect value and default value', () => {
            let result: Result<number>;

            beforeEach(() => {
                result = NumberResolver().defaultsTo(undefined).resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return safe value', () => {
                expect(result.result).toBeNaN();
            });

            it('should return 2 errors', () => {
                expect(result.error.length).toBe(2);
            });
        });
    });

    describe('constraints', () => {

        describe('correct value against constraint', () => {
            let result: Result<number>;
            let constraintFunction: (n: number) => boolean | string;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: number) => n >= 0 || 'value is not a positive number');

                result = NumberResolver()
                    .constraint(constraintFunction)
                    .resolve(23);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return output same as input', () => {
                expect(result.result).toBe(23);
            });

            it('should call constraint function', () => {
                expect(constraintFunction).toHaveBeenCalled();
            });

            it('should not return errors', () => {
                expect(result.error).toBeNull();
            });
        });

        describe('incorrect value against constraint', () => {
            let result: Result<number>;
            let constraintFunction: (n: number) => boolean | string;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: number) => n >= 0 || 'value is not a positive number');

                result = NumberResolver()
                    .constraint(constraintFunction)
                    .resolve(-5);
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return output same as input', () => {
                expect(result.result).toBe(-5);
            });

            it('should call constraint function', () => {
                expect(constraintFunction).toHaveBeenCalled();
            });

            it('should not return errors', () => {
                expect(result.error).toEqual([ 'value is not a positive number' ]);
            });
        });

        describe('incorrect value against constraint with raw default value', () => {
            let result: Result<number>;
            let constraintFunction: (n: number) => boolean | string;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: number) => n >= 0 || 'value is not a positive number');

                result = NumberResolver()
                    .constraint(constraintFunction, 0)
                    .resolve(-5);
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return output same as input', () => {
                expect(result.result).toBe(0);
            });

            it('should call constraint function', () => {
                expect(constraintFunction).toHaveBeenCalled();
            });

            it('should not return errors', () => {
                expect(result.error).toEqual([ 'value is not a positive number' ]);
            });
        });

        describe('incorrect value against constraint with default value transform function', () => {
            let result: Result<number>;
            let constraintFunction: (n: number) => boolean | string;
            let constraintDefaultTransform: (n: number) => number;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: number) => n >= 0 || 'value is not a positive number');
                constraintDefaultTransform = jasmine.createSpy('default').and.callFake((n: number) => Math.abs(n));

                result = NumberResolver()
                    .constraint(constraintFunction, constraintDefaultTransform)
                    .resolve(-7);
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return output same as input', () => {
                expect(result.result).toBe(7);
            });

            it('should call constraint function', () => {
                expect(constraintFunction).toHaveBeenCalled();
            });

            it('should call default transform function', () => {
                expect(constraintDefaultTransform).toHaveBeenCalled();
            });

            it('should not return errors', () => {
                expect(result.error).toEqual([ 'value is not a positive number' ]);
            });
        });

        describe('incorrect value against resolver', () => {
            let result: Result<number>;
            let constraintFunction: (n: number) => boolean | string;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: number) => n >= 0 || 'value is not a positive number');

                result = NumberResolver()
                    .constraint(constraintFunction)
                    .resolve('trust me im number');
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return output as safe value', () => {
                expect(result.result).toBeNaN();
            });

            it('should not call constraint function', () => {
                expect(constraintFunction).not.toHaveBeenCalled();
            });

            it('should return errors', () => {
                expect(result.error).not.toBeNull();
            });
        });

        describe('incorrect constraint default value', () => {
            let result: Result<number>;
            let constraintFunction: (n: number) => boolean | string;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: number) => n >= 0 || 'value is not a positive number');

                result = NumberResolver()
                    .constraint(constraintFunction, <any> 'trust me im number')
                    .resolve(-7);
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return output same as input', () => {
                expect(result.result).toBeNaN();
            });

            it('should call constraint function', () => {
                expect(constraintFunction).toHaveBeenCalled();
            });

            it('should not return errors', () => {
                expect(result.error.length).toBe(2);
            });
        });
    });
});