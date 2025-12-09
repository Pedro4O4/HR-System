import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsValidObjectIdConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean;
    defaultMessage(args: ValidationArguments): string;
}
