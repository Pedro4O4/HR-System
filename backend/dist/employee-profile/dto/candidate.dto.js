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
exports.CandidateResponseDto = exports.ConvertCandidateToEmployeeDto = exports.UpdateCandidateStatusDto = exports.CreateCandidateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const employee_profile_enums_1 = require("../enums/employee-profile.enums");
class CreateCandidateDto {
    personalEmail;
    firstName;
    lastName;
    middleName;
    nationalId;
    dateOfBirth;
    positionId;
    status;
}
exports.CreateCandidateDto = CreateCandidateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'candidate@email.com',
        description: 'Personal email',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "personalEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Jane',
        description: 'First name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Smith',
        description: 'Last name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Michael',
        description: 'Middle name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '12345678901234',
        description: 'National ID',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "nationalId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '1995-05-20',
        description: 'Date of birth',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateCandidateDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Job position ID they applied for',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "positionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'APPLIED',
        enum: employee_profile_enums_1.CandidateStatus,
        description: 'Initial candidate status',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(employee_profile_enums_1.CandidateStatus),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "status", void 0);
class UpdateCandidateStatusDto {
    status;
    notes;
}
exports.UpdateCandidateStatusDto = UpdateCandidateStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'INTERVIEW',
        enum: employee_profile_enums_1.CandidateStatus,
        description: 'New candidate status',
    }),
    (0, class_validator_1.IsEnum)(employee_profile_enums_1.CandidateStatus),
    __metadata("design:type", String)
], UpdateCandidateStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Passed initial screening',
        description: 'Status change reason/notes',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCandidateStatusDto.prototype, "notes", void 0);
class ConvertCandidateToEmployeeDto {
    employeeNumber;
    workEmail;
    password;
    primaryPositionId;
    primaryDepartmentId;
    payGradeId;
}
exports.ConvertCandidateToEmployeeDto = ConvertCandidateToEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'EMP001',
        description: 'New employee number',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConvertCandidateToEmployeeDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john.candidate@company.com',
        description: 'Work email',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ConvertCandidateToEmployeeDto.prototype, "workEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Password123!',
        description: 'Initial password',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConvertCandidateToEmployeeDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Position ID to assign',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConvertCandidateToEmployeeDto.prototype, "primaryPositionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Department ID to assign',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConvertCandidateToEmployeeDto.prototype, "primaryDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Pay grade ID',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConvertCandidateToEmployeeDto.prototype, "payGradeId", void 0);
class CandidateResponseDto {
    _id;
    fullName;
    personalEmail;
    status;
    createdAt;
}
exports.CandidateResponseDto = CandidateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '60d5ec49c1234567890abcd1',
        description: 'Candidate ID',
    }),
    __metadata("design:type", String)
], CandidateResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Jane Smith',
        description: 'Full name',
    }),
    __metadata("design:type", String)
], CandidateResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'candidate@email.com',
        description: 'Email',
    }),
    __metadata("design:type", String)
], CandidateResponseDto.prototype, "personalEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'APPLIED',
        description: 'Candidate status',
    }),
    __metadata("design:type", String)
], CandidateResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-15',
        description: 'Creation date',
    }),
    __metadata("design:type", Date)
], CandidateResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=candidate.dto.js.map