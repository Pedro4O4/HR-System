"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployeeProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const employee_profile_enums_1 = require("../enums/employee-profile.enums");
const is_valid_object_id_validator_1 = require("../../common/validators/is-valid-object-id.validator");
class CreateEmployeeProfileDto {
    workEmail;
    password;
    firstName;
    lastName;
    middleName;
    employeeNumber;
    nationalId;
    dateOfBirth;
    dateOfHire;
    gender;
    maritalStatus;
    mobilePhone;
    homePhone;
    personalEmail;
    contractType;
    workType;
    contractStartDate;
    contractEndDate;
    bankName;
    bankAccountNumber;
    biography;
    primaryPositionId;
    primaryDepartmentId;
    payGradeId;
}
exports.CreateEmployeeProfileDto = CreateEmployeeProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john.doe@company.com',
        description: 'Work email address',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "workEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john@company.com',
        description: 'Password for the employee account',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John',
        description: 'First name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Doe',
        description: 'Last name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Michael',
        description: 'Middle name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'EMP001',
        description: 'Unique employee number',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '12345678901234',
        description: 'National ID',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "nationalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1990-01-15',
        description: 'Date of birth',
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateEmployeeProfileDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2020-01-15',
        description: 'Date of hire',
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateEmployeeProfileDto.prototype, "dateOfHire", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'MALE',
        enum: employee_profile_enums_1.Gender,
        description: 'Gender',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(employee_profile_enums_1.Gender),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'SINGLE',
        enum: employee_profile_enums_1.MaritalStatus,
        description: 'Marital status',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(employee_profile_enums_1.MaritalStatus),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '+201234567890',
        description: 'Mobile phone number',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)('EG'),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "mobilePhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '+201234567891',
        description: 'Home phone number',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)('EG'),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "homePhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'john.doe@personal.com',
        description: 'Personal email address',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "personalEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'FULL_TIME_CONTRACT',
        enum: employee_profile_enums_1.ContractType,
        description: 'Contract type',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(employee_profile_enums_1.ContractType),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "contractType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'FULL_TIME',
        enum: employee_profile_enums_1.WorkType,
        description: 'Work type',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(employee_profile_enums_1.WorkType),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "workType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2020-01-15',
        description: 'Contract start date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateEmployeeProfileDto.prototype, "contractStartDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-01-15',
        description: 'Contract end date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateEmployeeProfileDto.prototype, "contractEndDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Bank Name',
        description: 'Bank name for salary',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "bankName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '1234567890',
        description: 'Bank account number',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "bankAccountNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'A passionate professional...',
        description: 'Employee biography',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "biography", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Primary position ID',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(is_valid_object_id_validator_1.IsValidObjectIdConstraint),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "primaryPositionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Primary department ID',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(is_valid_object_id_validator_1.IsValidObjectIdConstraint),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "primaryDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Pay grade ID',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(is_valid_object_id_validator_1.IsValidObjectIdConstraint),
    __metadata("design:type", String)
], CreateEmployeeProfileDto.prototype, "payGradeId", void 0);
//# sourceMappingURL=create-employee-profile.dto.js.map