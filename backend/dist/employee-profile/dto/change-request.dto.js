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
exports.ChangeRequestResponseDto = exports.ChangeRequestQueryDto = exports.UpdateChangeRequestStatusDto = exports.CreateChangeRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const employee_profile_enums_1 = require("../enums/employee-profile.enums");
class CreateChangeRequestDto {
    requestDescription;
    reason;
}
exports.CreateChangeRequestDto = CreateChangeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Request to update job title from Manager to Senior Manager',
        description: 'Description of the change request',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChangeRequestDto.prototype, "requestDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Career growth and increased responsibilities',
        description: 'Reason for the change',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChangeRequestDto.prototype, "reason", void 0);
class UpdateChangeRequestStatusDto {
    status;
    adminNotes;
}
exports.UpdateChangeRequestStatusDto = UpdateChangeRequestStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'APPROVED',
        enum: employee_profile_enums_1.ProfileChangeStatus,
        description: 'New status (APPROVED or REJECTED)',
    }),
    (0, class_validator_1.IsEnum)(employee_profile_enums_1.ProfileChangeStatus),
    __metadata("design:type", String)
], UpdateChangeRequestStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Approved by HR Manager John Doe',
        description: 'Admin notes',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateChangeRequestStatusDto.prototype, "adminNotes", void 0);
class ChangeRequestQueryDto {
    status;
    page;
    limit;
}
exports.ChangeRequestQueryDto = ChangeRequestQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'PENDING',
        enum: employee_profile_enums_1.ProfileChangeStatus,
        description: 'Filter by status',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(employee_profile_enums_1.ProfileChangeStatus),
    __metadata("design:type", String)
], ChangeRequestQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Page number (1-based)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangeRequestQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 10,
        description: 'Items per page',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangeRequestQueryDto.prototype, "limit", void 0);
class ChangeRequestResponseDto {
    _id;
    employeeProfileId;
    requestId;
    requestDescription;
    reason;
    status;
    submittedAt;
    processedAt;
}
exports.ChangeRequestResponseDto = ChangeRequestResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '60d5ec49c1234567890abcd1',
        description: 'Change request ID',
    }),
    __metadata("design:type", String)
], ChangeRequestResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '60d5ec49c1234567890abcd2',
        description: 'Employee profile ID',
    }),
    __metadata("design:type", String)
], ChangeRequestResponseDto.prototype, "employeeProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'REQ-001',
        description: 'Request ID',
    }),
    __metadata("design:type", String)
], ChangeRequestResponseDto.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Request to update job title',
        description: 'Request description',
    }),
    __metadata("design:type", String)
], ChangeRequestResponseDto.prototype, "requestDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Career growth',
        description: 'Reason',
    }),
    __metadata("design:type", String)
], ChangeRequestResponseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'PENDING',
        description: 'Status',
    }),
    __metadata("design:type", String)
], ChangeRequestResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-15',
        description: 'Submitted at',
    }),
    __metadata("design:type", Date)
], ChangeRequestResponseDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2024-01-16',
        description: 'Processed at',
    }),
    __metadata("design:type", Date)
], ChangeRequestResponseDto.prototype, "processedAt", void 0);
//# sourceMappingURL=change-request.dto.js.map