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
exports.EmployeeProfileResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const employee_profile_enums_1 = require("../enums/employee-profile.enums");
class EmployeeProfileResponseDto {
    _id;
    workEmail;
    firstName;
    lastName;
    middleName;
    fullName;
    employeeNumber;
    nationalId;
    dateOfBirth;
    dateOfHire;
    gender;
    maritalStatus;
    mobilePhone;
    homePhone;
    personalEmail;
    status;
    contractType;
    workType;
    contractStartDate;
    contractEndDate;
    bankName;
    bankAccountNumber;
    biography;
    profilePictureUrl;
    createdAt;
    updatedAt;
}
exports.EmployeeProfileResponseDto = EmployeeProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '60d5ec49c1234567890abcd1',
        description: 'Employee ID',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john.doe@company.com',
        description: 'Work email',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "workEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John',
        description: 'First name',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Doe',
        description: 'Last name',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Michael',
        description: 'Middle name',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Michael Doe',
        description: 'Full name',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'EMP001',
        description: 'Employee number',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '12345678901234',
        description: 'National ID',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "nationalId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '1990-01-15',
        description: 'Date of birth',
    }),
    __metadata("design:type", Date)
], EmployeeProfileResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2020-01-15',
        description: 'Date of hire',
    }),
    __metadata("design:type", Date)
], EmployeeProfileResponseDto.prototype, "dateOfHire", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'MALE',
        enum: employee_profile_enums_1.Gender,
        description: 'Gender',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'SINGLE',
        enum: employee_profile_enums_1.MaritalStatus,
        description: 'Marital status',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '+1234567890',
        description: 'Mobile phone',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "mobilePhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '+1234567891',
        description: 'Home phone',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "homePhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'john.doe@personal.com',
        description: 'Personal email',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "personalEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ACTIVE',
        enum: employee_profile_enums_1.EmployeeStatus,
        description: 'Employee status',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'FULL_TIME_CONTRACT',
        enum: employee_profile_enums_1.ContractType,
        description: 'Contract type',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "contractType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'FULL_TIME',
        enum: employee_profile_enums_1.WorkType,
        description: 'Work type',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "workType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2020-01-15',
        description: 'Contract start date',
    }),
    __metadata("design:type", Date)
], EmployeeProfileResponseDto.prototype, "contractStartDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-01-15',
        description: 'Contract end date',
    }),
    __metadata("design:type", Date)
], EmployeeProfileResponseDto.prototype, "contractEndDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Bank Name',
        description: 'Bank name',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "bankName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '1234567890',
        description: 'Bank account number',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "bankAccountNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'A passionate professional...',
        description: 'Biography',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "biography", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Profile picture URL',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "profilePictureUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Timestamp when created',
    }),
    __metadata("design:type", Date)
], EmployeeProfileResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Timestamp when updated',
    }),
    __metadata("design:type", Date)
], EmployeeProfileResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=employee-profile-response.dto.js.map