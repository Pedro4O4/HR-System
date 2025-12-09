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
exports.EmployeeProfileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@nestjs/common");
const employee_profile_service_1 = require("./employee-profile.service");
const pagination_dto_1 = require("./dto/pagination.dto");
const create_employee_profile_dto_1 = require("./dto/create-employee-profile.dto");
const update_employee_profile_dto_1 = require("./dto/update-employee-profile.dto");
const qualification_dto_1 = require("./dto/qualification.dto");
const role_dto_1 = require("./dto/role.dto");
const candidate_dto_1 = require("./dto/candidate.dto");
const change_request_dto_1 = require("./dto/change-request.dto");
const update_contact_info_dto_1 = require("./dto/update-contact-info.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const employee_profile_enums_1 = require("./enums/employee-profile.enums");
let EmployeeProfileController = class EmployeeProfileController {
    employeeProfileService;
    constructor(employeeProfileService) {
        this.employeeProfileService = employeeProfileService;
    }
    async getAllEmployees(query) {
        return this.employeeProfileService.getAllEmployees(query);
    }
    async getProfile(req) {
        try {
            const userId = req.user?.userId;
            console.log('[GET PROFILE] Request for user:', userId, 'Role:', req.user?.role);
            if (!userId) {
                throw new Error('User ID not found in request');
            }
            const profile = await this.employeeProfileService.getEmployeeById(userId);
            console.log('[GET PROFILE] Successfully retrieved profile for:', userId);
            return profile;
        }
        catch (error) {
            console.error('[GET PROFILE] Error:', error.message);
            throw error;
        }
    }
    async createEmployee(createDto) {
        return this.employeeProfileService.createEmployeeProfile(createDto);
    }
    async exportEmployeesToCsv(res) {
        const csv = await this.employeeProfileService.exportEmployeesToCsv();
        res.set({
            'Content-Disposition': `attachment; filename=employees-${new Date().toISOString().split('T')[0]}.csv`,
        });
        res.send(csv);
    }
    async getAllCandidates(query) {
        return this.employeeProfileService.getAllCandidates(query);
    }
    async createCandidate(createDto) {
        return this.employeeProfileService.createCandidate(createDto);
    }
    async getCandidateById(id) {
        return this.employeeProfileService.getCandidateById(id);
    }
    async convertCandidateToEmployee(id, convertDto) {
        return this.employeeProfileService.convertCandidateToEmployee(id, convertDto);
    }
    async updateCandidateStatus(id, updateDto) {
        return this.employeeProfileService.updateCandidateStatus(id, updateDto);
    }
    async getAllChangeRequests(query) {
        return this.employeeProfileService.getAllChangeRequests(query);
    }
    async createChangeRequest(req, createDto) {
        const employeeId = req.user?.userId;
        return this.employeeProfileService.createChangeRequest(employeeId, createDto);
    }
    async approveChangeRequest(id) {
        return this.employeeProfileService.approveChangeRequest(id);
    }
    async rejectChangeRequest(id) {
        return this.employeeProfileService.rejectChangeRequest(id);
    }
    async updateContactInfo(id, updateDto, req) {
        const userId = req.user?.userId;
        const userRoles = req.user?.roles || [];
        const isHR = userRoles.some((role) => ['HR Admin', 'HR Manager', 'System Admin'].includes(role));
        if (!isHR && userId !== id) {
            throw new Error('You can only update your own contact information');
        }
        return this.employeeProfileService.updateContactInfo(id, updateDto);
    }
    async uploadProfilePicture(id, file, req) {
        const userId = req.user?.userId;
        const userRoles = req.user?.roles || [];
        const isHR = userRoles.some((role) => ['HR Admin', 'HR Manager', 'System Admin'].includes(role));
        if (!isHR && userId !== id) {
            throw new Error('You can only upload your own profile picture');
        }
        if (!file) {
            throw new Error('No file uploaded');
        }
        return this.employeeProfileService.uploadProfilePicture(id, file);
    }
    async getQualifications(id) {
        return this.employeeProfileService.getQualifications(id);
    }
    async addQualification(id, createDto) {
        return this.employeeProfileService.addQualification(id, createDto);
    }
    async getAllRoles() {
        return this.employeeProfileService.getAllRoles();
    }
    async getEmployeeRoles(id) {
        return this.employeeProfileService.getEmployeeRoles(id);
    }
    async assignRoles(id, assignDto) {
        return this.employeeProfileService.assignRoles(id, assignDto);
    }
    async updateRoles(id, updateDto) {
        return this.employeeProfileService.updateRoles(id, updateDto);
    }
    async deactivateRoles(id) {
        return this.employeeProfileService.deactivateRoles(id);
    }
    async exportEmployeePdf(id, res) {
        const pdfBuffer = await this.employeeProfileService.exportEmployeeProfileToPdf(id);
        res.set({
            'Content-Disposition': `attachment; filename=employee-profile-${id}.pdf`,
        });
        res.send(pdfBuffer);
    }
    async updateEmployee(id, updateDto) {
        return this.employeeProfileService.updateEmployeeProfile(id, updateDto);
    }
    async deactivateEmployee(id, body) {
        return this.employeeProfileService.deactivateEmployee(id, body.status);
    }
    async getEmployeeById(id) {
        return this.employeeProfileService.getEmployeeById(id);
    }
};
exports.EmployeeProfileController = EmployeeProfileController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "getAllEmployees", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('System Admin', 'HR Admin', 'HR Manager'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_profile_dto_1.CreateEmployeeProfileDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Get)('export/csv'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('System Admin', 'HR Admin', 'HR Manager'),
    (0, common_1.Header)('Content-Type', 'text/csv'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "exportEmployeesToCsv", null);
__decorate([
    (0, common_1.Get)('candidates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('System Admin', 'Recruiter', 'HR Manager', 'HR Employee'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "getAllCandidates", null);
__decorate([
    (0, common_1.Post)('candidates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Recruiter', 'HR Manager'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [candidate_dto_1.CreateCandidateDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "createCandidate", null);
__decorate([
    (0, common_1.Get)('candidates/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Recruiter', 'HR Manager', 'HR Employee'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "getCandidateById", null);
__decorate([
    (0, common_1.Post)('candidates/:id/convert'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Manager', 'HR Admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, candidate_dto_1.ConvertCandidateToEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "convertCandidateToEmployee", null);
__decorate([
    (0, common_1.Patch)('candidates/:id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Recruiter', 'HR Manager'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, candidate_dto_1.UpdateCandidateStatusDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "updateCandidateStatus", null);
__decorate([
    (0, common_1.Get)('change-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "getAllChangeRequests", null);
__decorate([
    (0, common_1.Post)('change-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_request_dto_1.CreateChangeRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "createChangeRequest", null);
__decorate([
    (0, common_1.Patch)('change-requests/:id/approve'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('System Admin', 'HR Admin', 'HR Manager'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "approveChangeRequest", null);
__decorate([
    (0, common_1.Patch)('change-requests/:id/reject'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('System Admin', 'HR Admin', 'HR Manager'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "rejectChangeRequest", null);
__decorate([
    (0, common_1.Patch)(':id/contact'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_info_dto_1.UpdateContactInfoDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "updateContactInfo", null);
__decorate([
    (0, common_1.Post)(':id/picture'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    (0, common_2.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_2.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "uploadProfilePicture", null);
__decorate([
    (0, common_1.Get)(':id/qualifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "getQualifications", null);
__decorate([
    (0, common_1.Post)(':id/qualifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, qualification_dto_1.CreateQualificationDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "addQualification", null);
__decorate([
    (0, common_1.Get)('roles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "getAllRoles", null);
__decorate([
    (0, common_1.Get)(':id/roles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "getEmployeeRoles", null);
__decorate([
    (0, common_1.Post)(':id/roles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'System Admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, role_dto_1.AssignRoleDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "assignRoles", null);
__decorate([
    (0, common_1.Patch)(':id/roles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'System Admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "updateRoles", null);
__decorate([
    (0, common_1.Patch)(':id/roles/deactivate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'System Admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "deactivateRoles", null);
__decorate([
    (0, common_1.Get)(':id/pdf'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    (0, common_1.Header)('Content-Type', 'application/pdf'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "exportEmployeePdf", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employee_profile_dto_1.UpdateEmployeeProfileDto]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "deactivateEmployee", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "getEmployeeById", null);
exports.EmployeeProfileController = EmployeeProfileController = __decorate([
    (0, common_1.Controller)('api/employee-profile'),
    __metadata("design:paramtypes", [employee_profile_service_1.EmployeeProfileService])
], EmployeeProfileController);
//# sourceMappingURL=employee-profile.controller.js.map