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
exports.UpdateContactInfoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateContactInfoDto {
    mobilePhone;
    homePhone;
    personalEmail;
    address;
}
exports.UpdateContactInfoDto = UpdateContactInfoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+201234567890', description: 'Mobile phone number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+?[1-9]\d{1,14}$/, {
        message: 'Mobile phone must be a valid phone number format',
    }),
    __metadata("design:type", String)
], UpdateContactInfoDto.prototype, "mobilePhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+20233456789', description: 'Home phone number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+?[1-9]\d{1,14}$/, {
        message: 'Home phone must be a valid phone number format',
    }),
    __metadata("design:type", String)
], UpdateContactInfoDto.prototype, "homePhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'employee@personal.com', description: 'Personal email address' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Personal email must be a valid email address' }),
    __metadata("design:type", String)
], UpdateContactInfoDto.prototype, "personalEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '123 Main Street, Apt 4B, Cairo, Egypt',
        description: 'Full address',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateContactInfoDto.prototype, "address", void 0);
//# sourceMappingURL=update-contact-info.dto.js.map