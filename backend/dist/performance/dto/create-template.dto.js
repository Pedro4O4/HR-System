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
exports.CreateTemplateDto = exports.TemplateSectionDto = exports.EvaluationCriterionDto = exports.RatingScaleDefinitionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const performance_enums_1 = require("../enums/performance.enums");
class RatingScaleDefinitionDto {
    type;
    min;
    max;
    step;
    labels;
}
exports.RatingScaleDefinitionDto = RatingScaleDefinitionDto;
__decorate([
    (0, class_validator_1.IsEnum)(performance_enums_1.AppraisalRatingScaleType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RatingScaleDefinitionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], RatingScaleDefinitionDto.prototype, "min", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], RatingScaleDefinitionDto.prototype, "max", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RatingScaleDefinitionDto.prototype, "step", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], RatingScaleDefinitionDto.prototype, "labels", void 0);
class EvaluationCriterionDto {
    key;
    title;
    details;
    weight;
    maxScore;
    required;
}
exports.EvaluationCriterionDto = EvaluationCriterionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EvaluationCriterionDto.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EvaluationCriterionDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EvaluationCriterionDto.prototype, "details", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EvaluationCriterionDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EvaluationCriterionDto.prototype, "maxScore", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], EvaluationCriterionDto.prototype, "required", void 0);
class TemplateSectionDto {
    title;
    description;
    weight;
    criteria;
}
exports.TemplateSectionDto = TemplateSectionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TemplateSectionDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TemplateSectionDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], TemplateSectionDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => EvaluationCriterionDto),
    __metadata("design:type", Array)
], TemplateSectionDto.prototype, "criteria", void 0);
class CreateTemplateDto {
    name;
    description;
    templateType;
    ratingScale;
    sections;
    instructions;
    applicableDepartmentIds;
    applicablePositionIds;
    isActive;
}
exports.CreateTemplateDto = CreateTemplateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(performance_enums_1.AppraisalTemplateType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "templateType", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RatingScaleDefinitionDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", RatingScaleDefinitionDto)
], CreateTemplateDto.prototype, "ratingScale", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TemplateSectionDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateTemplateDto.prototype, "sections", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "instructions", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTemplateDto.prototype, "applicableDepartmentIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTemplateDto.prototype, "applicablePositionIds", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTemplateDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-template.dto.js.map