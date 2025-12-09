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
exports.QualificationResponseDto = exports.CreateQualificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const employee_profile_enums_1 = require("../enums/employee-profile.enums");
class CreateQualificationDto {
    establishmentName;
    graduationType;
}
exports.CreateQualificationDto = CreateQualificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'University of Example',
        description: 'Establishment name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQualificationDto.prototype, "establishmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BACHELOR',
        enum: employee_profile_enums_1.GraduationType,
        description: 'Graduation type',
    }),
    (0, class_validator_1.IsEnum)(employee_profile_enums_1.GraduationType),
    __metadata("design:type", String)
], CreateQualificationDto.prototype, "graduationType", void 0);
class QualificationResponseDto {
    _id;
    employeeProfileId;
    establishmentName;
    graduationType;
}
exports.QualificationResponseDto = QualificationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '60d5ec49c1234567890abcd1',
        description: 'Qualification ID',
    }),
    __metadata("design:type", String)
], QualificationResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '60d5ec49c1234567890abcd1',
        description: 'Employee profile ID',
    }),
    __metadata("design:type", String)
], QualificationResponseDto.prototype, "employeeProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'University of Example',
        description: 'Establishment name',
    }),
    __metadata("design:type", String)
], QualificationResponseDto.prototype, "establishmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BACHELOR',
        description: 'Graduation type',
    }),
    __metadata("design:type", String)
], QualificationResponseDto.prototype, "graduationType", void 0);
//# sourceMappingURL=qualification.dto.js.map