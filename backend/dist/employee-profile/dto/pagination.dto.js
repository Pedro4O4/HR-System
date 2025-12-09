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
exports.PaginatedResponseDto = exports.EmployeeProfileResponseDto = exports.PaginationQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PaginationQueryDto {
    page;
    limit;
    sortBy;
    sortOrder;
    search;
}
exports.PaginationQueryDto = PaginationQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Page number (1-based)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PaginationQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 10,
        description: 'Items per page',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PaginationQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'firstName',
        description: 'Field to sort by',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'asc',
        description: 'Sort order (asc or desc)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['asc', 'desc']),
    __metadata("design:type", String)
], PaginationQueryDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'john',
        description: 'Search term',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationQueryDto.prototype, "search", void 0);
class EmployeeProfileResponseDto {
    _id;
    employeeNumber;
    workEmail;
    fullName;
    nationalId;
    status;
    dateOfHire;
    primaryPositionId;
    primaryDepartmentId;
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
        example: 'EMP001',
        description: 'Employee number',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john.doe@company.com',
        description: 'Work email',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "workEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'Full name',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '12345678901234',
        description: 'National ID',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "nationalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ACTIVE',
        description: 'Employee status',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2020-01-15',
        description: 'Date of hire',
    }),
    __metadata("design:type", Date)
], EmployeeProfileResponseDto.prototype, "dateOfHire", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Primary position ID',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "primaryPositionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Primary department ID',
    }),
    __metadata("design:type", String)
], EmployeeProfileResponseDto.prototype, "primaryDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-15',
        description: 'Created at',
    }),
    __metadata("design:type", Date)
], EmployeeProfileResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-16',
        description: 'Updated at',
    }),
    __metadata("design:type", Date)
], EmployeeProfileResponseDto.prototype, "updatedAt", void 0);
class PaginatedResponseDto {
    data;
    page;
    limit;
    total;
    pages;
}
exports.PaginatedResponseDto = PaginatedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data items',
        isArray: true,
    }),
    __metadata("design:type", Array)
], PaginatedResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Current page',
    }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Items per page',
    }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
        description: 'Total items',
    }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Total pages',
    }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "pages", void 0);
//# sourceMappingURL=pagination.dto.js.map