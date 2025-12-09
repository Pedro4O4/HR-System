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
exports.BulkAssignAppraisalsDto = exports.BulkAssignmentItem = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BulkAssignmentItem {
    employeeProfileId;
    managerProfileId;
    positionId;
}
exports.BulkAssignmentItem = BulkAssignmentItem;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkAssignmentItem.prototype, "employeeProfileId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkAssignmentItem.prototype, "managerProfileId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkAssignmentItem.prototype, "positionId", void 0);
class BulkAssignAppraisalsDto {
    cycleId;
    templateId;
    departmentId;
    dueDate;
    employees;
}
exports.BulkAssignAppraisalsDto = BulkAssignAppraisalsDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkAssignAppraisalsDto.prototype, "cycleId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkAssignAppraisalsDto.prototype, "templateId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkAssignAppraisalsDto.prototype, "departmentId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkAssignAppraisalsDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BulkAssignmentItem),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkAssignAppraisalsDto.prototype, "employees", void 0);
//# sourceMappingURL=bulk-assign-appraisals.dto.js.map