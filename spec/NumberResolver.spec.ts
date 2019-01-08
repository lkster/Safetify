import { NumberResolver, Result } from '..';



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
            expect(result.error.length).toBe(0);
            expect(result2.error.length).toBe(0);
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

        it('should return 1 error', () => {
            expect(result.error.length).toBe(1);
        });

        it('should return proper error description', () => {
            expect(result.error[0]).toBe('undefined is not a number');
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

        it('should return 1 error', () => {
            expect(result.error.length).toBe(1);
        });

        it('should return proper error description', () => {
            expect(result.error[0]).toBe('NaN value is not true number');
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
                expect(result.error.length).toBe(0);
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

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('undefined is not a number');
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

            it('should return proper errors descriptions', () => {
                expect(result.error[0]).toBe('undefined is not a number');
                expect(result.error[1]).toBe('DefaultValue: undefined is not a number');
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
                expect(result.error.length).toBe(0);
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

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('value is not a positive number');
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

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('value is not a positive number');
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

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('value is not a positive number');
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

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('string is not a number');
            });
        });

        describe('incorrect constraint raw default value', () => {
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

            it('should return 2 errors', () => {
                expect(result.error.length).toBe(2);
            });

            it('should return proper errors descriptions', () => {
                expect(result.error[0]).toBe('value is not a positive number');
                expect(result.error[1]).toBe('Constraint #0 default value: string is not a number');
            });
        });

        describe('incorrect constraint default value transform function result', () => {
            let result: Result<number>;
            let constraintFunction: (n: number) => boolean | string;
            let constraintDefaultTransform: (n: number) => number;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: number) => n >= 0 || 'value is not a positive number');
                constraintDefaultTransform = jasmine.createSpy('default').and.callFake((n: number) => <any> 'im a number');

                result = NumberResolver()
                    .constraint(constraintFunction, constraintDefaultTransform)
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

            it('should return 2 errors', () => {
                expect(result.error.length).toBe(2);
            });

            it('should return proper errors descriptions', () => {
                expect(result.error[0]).toBe('value is not a positive number');
                expect(result.error[1]).toBe('Constraint #0 default value transform function result: string is not a number');
            });
        });
    });

    describe('nullable value', () => {
        
        describe('correct value', () => {
            let result: Result<number>;

            beforeEach(() => {
                result = NumberResolver().nullable().resolve(54);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(54);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<number>;

            beforeEach(() => {
                result = NumberResolver().nullable().resolve(null);
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
            let result: Result<number>;

            beforeEach(() => {
                result = NumberResolver().nullable().resolve(undefined);
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
                expect(result.error[0]).toBe('undefined is not a number');
            });
        });
    });

    describe('optional value', () => {
        describe('correct value', () => {
            let result: Result<number>;

            beforeEach(() => {
                result = NumberResolver().optional().resolve(54);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(54);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<number>;

            beforeEach(() => {
                result = NumberResolver().optional().resolve(null);
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
            let result: Result<number>;

            beforeEach(() => {
                result = NumberResolver().optional().resolve(undefined);
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
            let result: Result<number>;

            beforeEach(() => {
                result = NumberResolver().optional().resolve('im a string');
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
                expect(result.error[0]).toBe('string is not a number');
            });
        });
    });
});
