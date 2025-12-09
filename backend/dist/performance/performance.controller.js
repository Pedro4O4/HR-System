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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const performance_service_1 = require("./performance.service");
const create_template_dto_1 = require("./dto/create-template.dto");
const update_template_dto_1 = require("./dto/update-template.dto");
const create_cycle_dto_1 = require("./dto/create-cycle.dto");
const update_cycle_dto_1 = require("./dto/update-cycle.dto");
const assign_appraisal_dto_1 = require("./dto/assign-appraisal.dto");
const bulk_assign_appraisals_dto_1 = require("./dto/bulk-assign-appraisals.dto");
const submit_feedback_dto_1 = require("./dto/submit-feedback.dto");
const self_assessment_dto_1 = require("./dto/self-assessment.dto");
const raise_dispute_dto_1 = require("./dto/raise-dispute.dto");
const resolve_dispute_dto_1 = require("./dto/resolve-dispute.dto");
const bulk_publish_dto_1 = require("./dto/bulk-publish.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let PerformanceController = class PerformanceController {
    performanceService;
    constructor(performanceService) {
        this.performanceService = performanceService;
    }
    createTemplate(dto) {
        return this.performanceService.createTemplate(dto);
    }
    findAllTemplates() {
        return this.performanceService.findAllTemplates();
    }
    findOneTemplate(id) {
        return this.performanceService.findOneTemplate(id);
    }
    updateTemplate(id, dto) {
        return this.performanceService.updateTemplate(id, dto);
    }
    deleteTemplate(id) {
        return this.performanceService.deleteTemplate(id);
    }
    createCycle(dto) {
        return this.performanceService.createCycle(dto);
    }
    findAllCycles() {
        return this.performanceService.findAllCycles();
    }
    findOneCycle(id) {
        return this.performanceService.findOneCycle(id);
    }
    updateCycle(id, dto) {
        return this.performanceService.updateCycle(id, dto);
    }
    assignAppraisal(dto) {
        return this.performanceService.assignAppraisal(dto);
    }
    bulkAssignAppraisals(dto) {
        return this.performanceService.bulkAssignAppraisals(dto);
    }
    bulkPublishAppraisals(dto, publishedBy) {
        return this.performanceService.bulkPublishAppraisals(dto, publishedBy);
    }
    getMyAppraisals(employeeId) {
        return this.performanceService.getMyAppraisals(employeeId);
    }
    getMyPublishedAppraisals(employeeId) {
        return this.performanceService.getMyPublishedAppraisals(employeeId);
    }
    getMyTeamAppraisals(managerId) {
        return this.performanceService.getMyTeamAppraisals(managerId);
    }
    getAppraisalByAssignmentId(id) {
        return this.performanceService.getAppraisalByAssignmentId(id);
    }
    submitManagerFeedback(id, dto) {
        return this.performanceService.submitManagerFeedback(id, dto);
    }
    submitSelfAssessment(id, dto) {
        return this.performanceService.submitSelfAssessment(id, dto);
    }
    finalizeAppraisal(id, publishedBy) {
        return this.performanceService.finalizeAppraisal(id, publishedBy);
    }
    markAppraisalAsViewed(id) {
        return this.performanceService.markAppraisalAsViewed(id);
    }
    acknowledgeAppraisal(id, comment) {
        return this.performanceService.acknowledgeAppraisal(id, comment);
    }
    raiseDispute(id, dto, employeeId) {
        return this.performanceService.raiseDispute(id, employeeId, dto);
    }
    resolveDispute(id, dto, resolverId) {
        return this.performanceService.resolveDispute(id, resolverId, dto);
    }
    findAllDisputes() {
        return this.performanceService.findAllDisputes();
    }
    findOneDispute(id) {
        return this.performanceService.findOneDispute(id);
    }
    getPendingAppraisals() {
        return this.performanceService.getPendingAppraisals();
    }
    getAppraisalProgress() {
        return this.performanceService.getAppraisalProgress();
    }
    getMyHistory(employeeId) {
        return this.performanceService.getMyHistory(employeeId);
    }
    getEmployeeHistory(employeeId) {
        return this.performanceService.getEmployeeHistory(employeeId);
    }
    getCycleReport(cycleId) {
        return this.performanceService.getCycleReport(cycleId);
    }
};
exports.PerformanceController = PerformanceController;
__decorate([
    (0, common_1.Post)('templates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Create appraisal template', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_template_dto_1.CreateTemplateDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)('templates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'HR Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all templates', description: 'Allowed roles: HR Admin, HR Manager, HR Employee' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "findAllTemplates", null);
__decorate([
    (0, common_1.Get)('templates/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'HR Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Get template by ID', description: 'Allowed roles: HR Admin, HR Manager, HR Employee' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "findOneTemplate", null);
__decorate([
    (0, common_1.Patch)('templates/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Update template', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_template_dto_1.UpdateTemplateDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)('templates/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete template', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "deleteTemplate", null);
__decorate([
    (0, common_1.Post)('cycles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Create appraisal cycle', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cycle_dto_1.CreateCycleDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "createCycle", null);
__decorate([
    (0, common_1.Get)('cycles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'HR Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all cycles', description: 'Allowed roles: HR Admin, HR Manager, HR Employee' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "findAllCycles", null);
__decorate([
    (0, common_1.Get)('cycles/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'HR Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cycle by ID', description: 'Allowed roles: HR Admin, HR Manager, HR Employee' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "findOneCycle", null);
__decorate([
    (0, common_1.Patch)('cycles/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Update cycle', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cycle_dto_1.UpdateCycleDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "updateCycle", null);
__decorate([
    (0, common_1.Post)('appraisals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign appraisal to employee', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_appraisal_dto_1.AssignAppraisalDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "assignAppraisal", null);
__decorate([
    (0, common_1.Post)('appraisals/bulk-assign'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk assign appraisals', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_assign_appraisals_dto_1.BulkAssignAppraisalsDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "bulkAssignAppraisals", null);
__decorate([
    (0, common_1.Post)('appraisals/bulk-publish'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk publish appraisals', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('publishedBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_publish_dto_1.BulkPublishDto, String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "bulkPublishAppraisals", null);
__decorate([
    (0, common_1.Get)('appraisals/my-appraisals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get my appraisals (employee view)', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getMyAppraisals", null);
__decorate([
    (0, common_1.Get)('appraisals/my-appraisals/published'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get my published appraisals', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getMyPublishedAppraisals", null);
__decorate([
    (0, common_1.Get)('appraisals/my-team'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'Department Head', 'HR Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my team appraisals', description: 'Allowed roles: HR Admin, HR Manager, Department Head' }),
    __param(0, (0, common_1.Query)('managerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getMyTeamAppraisals", null);
__decorate([
    (0, common_1.Get)('appraisals/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'HR Employee', 'Department Head'),
    (0, swagger_1.ApiOperation)({ summary: 'Get appraisal by ID', description: 'Allowed roles: HR Admin, HR Manager, HR Employee, Department Head' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getAppraisalByAssignmentId", null);
__decorate([
    (0, common_1.Post)('appraisals/:id/feedback'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'Department Head', 'HR Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit manager feedback on appraisal', description: 'Allowed roles: HR Admin, HR Manager, Department Head' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_feedback_dto_1.SubmitFeedbackDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "submitManagerFeedback", null);
__decorate([
    (0, common_1.Post)('appraisals/:id/self-assessment'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Submit self assessment', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, self_assessment_dto_1.SelfAssessmentDto]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "submitSelfAssessment", null);
__decorate([
    (0, common_1.Patch)('appraisals/:id/finalize'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Finalize and publish appraisal', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('publishedBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "finalizeAppraisal", null);
__decorate([
    (0, common_1.Post)('appraisals/:id/view'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Mark appraisal as viewed', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "markAppraisalAsViewed", null);
__decorate([
    (0, common_1.Post)('appraisals/:id/acknowledge'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Acknowledge appraisal', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "acknowledgeAppraisal", null);
__decorate([
    (0, common_1.Post)('appraisals/:id/dispute'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Raise dispute on appraisal', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, raise_dispute_dto_1.RaiseDisputeDto, String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "raiseDispute", null);
__decorate([
    (0, common_1.Patch)('disputes/:id/resolve'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Resolve appraisal dispute', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('resolverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, resolve_dispute_dto_1.ResolveDisputeDto, String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "resolveDispute", null);
__decorate([
    (0, common_1.Get)('disputes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all appraisal disputes', description: 'Allowed roles: HR Admin, HR Manager' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "findAllDisputes", null);
__decorate([
    (0, common_1.Get)('disputes/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'HR Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Get dispute by ID', description: 'Allowed roles: HR Admin, HR Manager, HR Employee' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "findOneDispute", null);
__decorate([
    (0, common_1.Get)('dashboard/pending'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending appraisals', description: 'Allowed roles: HR Admin, HR Manager' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getPendingAppraisals", null);
__decorate([
    (0, common_1.Get)('dashboard/progress'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Get appraisal progress dashboard', description: 'Allowed roles: HR Admin, HR Manager' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getAppraisalProgress", null);
__decorate([
    (0, common_1.Get)('history/my-history'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get my appraisal history', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getMyHistory", null);
__decorate([
    (0, common_1.Get)('history/:employeeId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'Department Head'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee appraisal history', description: 'Allowed roles: HR Admin, HR Manager, Department Head' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getEmployeeHistory", null);
__decorate([
    (0, common_1.Get)('reports/cycle/:cycleId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Get appraisal cycle report', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('cycleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getCycleReport", null);
exports.PerformanceController = PerformanceController = __decorate([
    (0, swagger_1.ApiTags)('Performance Management'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('performance'),
    __metadata("design:paramtypes", [performance_service_1.PerformanceService])
], PerformanceController);
//# sourceMappingURL=performance.controller.js.map