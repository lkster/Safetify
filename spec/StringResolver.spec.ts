import { StringResolver, Result } from '..';



describe('String Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<string>;

        beforeEach(() => {
            result = StringResolver().resolve('something');
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);    
        });

        it('should return result equal to input', () => {
            expect(result.result).toBe('something');
        });

        it('should not return error', () => {
            expect(result.error.length).toBe(0);
        });
    });

    describe('incorrect input', () => {
        let result: Result<string>;
        let result2: Result<string>;
        let result3: Result<string>;

        beforeEach(() => {
            result = StringResolver().resolve(undefined);
            result2 = StringResolver().resolve(null);
            result3 = StringResolver().resolve(false);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
            expect(result2.success).toBe(false);
            expect(result3.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toBe('');
            expect(result2.result).toBe('');
            expect(result3.result).toBe('');
        });

        it('should return 1 error', () => {
            expect(result.error.length).toBe(1);
            expect(result2.error.length).toBe(1);
            expect(result3.error.length).toBe(1);
        });

        it('should return proper error description', () => {
            expect(result.error[0]).toBe('undefined is not a string');
            expect(result2.error[0]).toBe('object is not a string');
            expect(result3.error[0]).toBe('boolean is not a string');
        });
    });

    describe('default value', () => {
        
        describe('correct value', () => {
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().defaultsTo('default value').resolve('im a string');
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe('im a string');
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });
        
        describe('incorrect value', () => {
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().defaultsTo('default value').resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return result as default value', () => {
                expect(result.result).toBe('default value');
            });

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('undefined is not a string');
            });
        });

        describe('incorrect value and default value', () => {
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().defaultsTo(undefined).resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);
            });

            it('should return safe value', () => {
                expect(result.result).toBe('');
            });

            it('should return 2 errors', () => {
                expect(result.error.length).toBe(2);
            });

            it('should return proper errors descriptions', () => {
                expect(result.error[0]).toBe('undefined is not a string');
                expect(result.error[1]).toBe('DefaultValue: undefined is not a string');
            });
        });
    });

    describe('constraints', () => {

        describe('correct value against constraint', () => {
            let result: Result<string>;
            let constraintFunction: (n: string) => boolean | string;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: string) => n.length < 20 || 'value is longer than 20 characters');

                result = StringResolver()
                    .constraint(constraintFunction)
                    .resolve('test string');
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);
            });

            it('should return output same as input', () => {
                expect(result.result).toBe('test string');
            });

            it('should call constraint function', () => {
                expect(constraintFunction).toHaveBeenCalled();
            });

            it('should not return errors', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('incorrect value against constraint', () => {
            let result: Result<string>;
            let constraintFunction: (n: string) => boolean | string;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: string) => n.length < 20 || 'value is longer than 20 characters');

                result = StringResolver()
                    .constraint(constraintFunction)
                    .resolve('test string longer than 20 characters');
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return output same as input', () => {
                expect(result.result).toBe('test string longer than 20 characters');
            });

            it('should call constraint function', () => {
                expect(constraintFunction).toHaveBeenCalled();
            });

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('value is longer than 20 characters');
            });
        });

        describe('incorrect value against constraint with raw default value', () => {
            let result: Result<string>;
            let constraintFunction: (n: string) => boolean | string;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: string) => n.length < 20 || 'value is longer than 20 characters');

                result = StringResolver()
                    .constraint(constraintFunction, 'default value')
                    .resolve('test string longer than 20 characters');
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return output same as input', () => {
                expect(result.result).toBe('default value');
            });

            it('should call constraint function', () => {
                expect(constraintFunction).toHaveBeenCalled();
            });

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('value is longer than 20 characters');
            });
        });

        describe('incorrect value against constraint with default value transform function', () => {
            let result: Result<string>;
            let constraintFunction: (n: string) => boolean | string;
            let constraintDefaultTransform: (n: string) => string;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: string) => n.length < 20 || 'value is longer than 20 characters');
                constraintDefaultTransform = jasmine.createSpy('default').and.callFake((n: string) => n.substr(0, 20));

                result = StringResolver()
                    .constraint(constraintFunction, constraintDefaultTransform)
                    .resolve('test string longer than 20 characters');
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return output same as input', () => {
                expect(result.result).toBe('test string longer t');
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
                expect(result.error[0]).toBe('value is longer than 20 characters');
            });
        });

        describe('incorrect value against resolver', () => {
            let result: Result<string>;
            let constraintFunction: (n: string) => boolean | string;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: string) => n.length < 20 || 'value is longer than 20 characters');

                result = StringResolver()
                    .constraint(constraintFunction)
                    .resolve(2354346);
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return output as safe value', () => {
                expect(result.result).toBe('');
            });

            it('should not call constraint function', () => {
                expect(constraintFunction).not.toHaveBeenCalled();
            });

            it('should return 1 error', () => {
                expect(result.error.length).toBe(1);
            });

            it('should return proper error description', () => {
                expect(result.error[0]).toBe('number is not a string');
            });
        });

        describe('incorrect constraint raw default value', () => {
            let result: Result<string>;
            let constraintFunction: (n: string) => boolean | string;

            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: string) => n.length < 20 || 'value is longer than 20 characters');

                result = StringResolver()
                    .constraint(constraintFunction, <any> 1234234)
                    .resolve('test string longer than 20 characters');
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return output same as input', () => {
                expect(result.result).toBe('');
            });

            it('should call constraint function', () => {
                expect(constraintFunction).toHaveBeenCalled();
            });

            it('should return 2 errors', () => {
                expect(result.error.length).toBe(2);
            });

            it('should return proper errors descriptions', () => {
                expect(result.error[0]).toBe('value is longer than 20 characters');
                expect(result.error[1]).toBe('Constraint #0 default value: number is not a string');
            });
        });

        describe('incorrect constraint default value transform function result', () => {
            let result: Result<string>;
            let constraintFunction: (n: string) => boolean | string;
            let constraintDefaultTransform: (n: string) => string;
            
            beforeEach(() => {
                constraintFunction = jasmine.createSpy().and.callFake((n: string) => n.length < 20 || 'value is longer than 20 characters');
                constraintDefaultTransform = jasmine.createSpy('default').and.callFake((n: string) => <any> 234235);

                result = StringResolver()
                    .constraint(constraintFunction, constraintDefaultTransform)
                    .resolve('test string longer than 20 characters');
            });

            it('should return success as false', () => {
                expect(result.success).toBe(false);
            });

            it('should return output same as input', () => {
                expect(result.result).toBe('');
            });

            it('should call constraint function', () => {
                expect(constraintFunction).toHaveBeenCalled();
            });

            it('should return 2 errors', () => {
                expect(result.error.length).toBe(2);
            });

            it('should return proper errors descriptions', () => {
                expect(result.error[0]).toBe('value is longer than 20 characters');
                expect(result.error[1]).toBe('Constraint #0 default value transform function result: number is not a string');
            });
        });
    });

    describe('nullable value', () => {
        
        describe('correct value', () => {
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().nullable().resolve('im a string');
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe('im a string');
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().nullable().resolve(null);
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
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().nullable().resolve(undefined);
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
                expect(result.error[0]).toBe('undefined is not a string');
            });
        });
    });

    describe('optional value', () => {
        describe('correct value', () => {
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().optional().resolve('im a string');
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe('im a string');
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().optional().resolve(null);
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
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().optional().resolve(undefined);
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
            let result: Result<string>;

            beforeEach(() => {
                result = StringResolver().optional().resolve(23);
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
                expect(result.error[0]).toBe('number is not a string');
            });
        });
    });
});