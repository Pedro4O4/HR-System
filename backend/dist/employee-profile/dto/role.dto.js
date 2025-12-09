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
exports.RoleResponseDto = exports.UpdateRoleDto = exports.AssignRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const employee_profile_enums_1 = require("../enums/employee-profile.enums");
class AssignRoleDto {
    roles;
    permissions;
}
exports.AssignRoleDto = AssignRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['HR Manager', 'Department Head'],
        description: 'Array of system roles to assign',
        enum: employee_profile_enums_1.SystemRole,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(employee_profile_enums_1.SystemRole, { each: true }),
    __metadata("design:type", Array)
], AssignRoleDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: ['read:employee', 'write:employee'],
        description: 'Array of permissions',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AssignRoleDto.prototype, "permissions", void 0);
class UpdateRoleDto {
    roles;
    permissions;
}
exports.UpdateRoleDto = UpdateRoleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: ['HR Manager'],
        description: 'Array of system roles',
        enum: employee_profile_enums_1.SystemRole,
        isArray: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(employee_profile_enums_1.SystemRole, { each: true }),
    __metadata("design:type", Array)
], UpdateRoleDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: ['read:employee', 'write:employee'],
        description: 'Array of permissions',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateRoleDto.prototype, "permissions", void 0);
class RoleResponseDto {
    _id;
    employeeProfileId;
    roles;
    permissions;
    isActive;
}
exports.RoleResponseDto = RoleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '60d5ec49c1234567890abcd1',
        description: 'Role ID',
    }),
    __metadata("design:type", String)
], RoleResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '60d5ec49c1234567890abcd1',
        description: 'Employee profile ID',
    }),
    __metadata("design:type", String)
], RoleResponseDto.prototype, "employeeProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['HR Manager', 'Department Head'],
        description: 'System roles',
        isArray: true,
    }),
    __metadata("design:type", Array)
], RoleResponseDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['read:employee', 'write:employee'],
        description: 'Permissions',
        isArray: true,
    }),
    __metadata("design:type", Array)
], RoleResponseDto.prototype, "permissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Is active',
    }),
    __metadata("design:type", Boolean)
], RoleResponseDto.prototype, "isActive", void 0);
//# sourceMappingURL=role.dto.js.map