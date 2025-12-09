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
exports.OrganizationStructureController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const organization_structure_service_1 = require("./organization-structure.service");
const create_department_dto_1 = require("./dto/create-department.dto");
const update_department_dto_1 = require("./dto/update-department.dto");
const create_position_dto_1 = require("./dto/create-position.dto");
const update_position_dto_1 = require("./dto/update-position.dto");
const assign_position_dto_1 = require("./dto/assign-position.dto");
const create_change_request_dto_1 = require("./dto/create-change-request.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
let OrganizationStructureController = class OrganizationStructureController {
    organizationStructureService;
    constructor(organizationStructureService) {
        this.organizationStructureService = organizationStructureService;
    }
    createChangeRequest(createChangeRequestDto, req) {
        createChangeRequestDto.requestedByEmployeeId = req.user.userId;
        return this.organizationStructureService.createChangeRequest(createChangeRequestDto);
    }
    findAllChangeRequests(page = '1', limit = '10', status) {
        return this.organizationStructureService.findAllChangeRequests(parseInt(page, 10), parseInt(limit, 10), status);
    }
    findOneChangeRequest(id) {
        return this.organizationStructureService.findOneChangeRequest(id);
    }
    approveChangeRequest(id) {
        return this.organizationStructureService.approveChangeRequest(id);
    }
    rejectChangeRequest(id) {
        return this.organizationStructureService.rejectChangeRequest(id);
    }
    createDepartment(createDepartmentDto) {
        return this.organizationStructureService.createDepartment(createDepartmentDto);
    }
    findAllDepartments() {
        return this.organizationStructureService.findAllDepartments();
    }
    findOneDepartment(id) {
        return this.organizationStructureService.findOneDepartment(id);
    }
    updateDepartment(id, updateDepartmentDto) {
        return this.organizationStructureService.updateDepartment(id, updateDepartmentDto);
    }
    removeDepartment(id) {
        return this.organizationStructureService.removeDepartment(id);
    }
    activateDepartment(id) {
        return this.organizationStructureService.activateDepartment(id);
    }
    deactivateDepartment(id) {
        return this.organizationStructureService.deactivateDepartment(id);
    }
    findPositionsByDepartment(id) {
        return this.organizationStructureService.findPositionsByDepartment(id);
    }
    getFullHierarchy() {
        return this.organizationStructureService.getFullHierarchy();
    }
    getDepartmentHierarchy(id) {
        return this.organizationStructureService.getDepartmentHierarchy(id);
    }
    createPosition(createPositionDto) {
        return this.organizationStructureService.createPosition(createPositionDto);
    }
    findAllPositions() {
        return this.organizationStructureService.findAllPositions();
    }
    findOnePosition(id) {
        return this.organizationStructureService.findOnePosition(id);
    }
    updatePosition(id, updatePositionDto) {
        return this.organizationStructureService.updatePosition(id, updatePositionDto);
    }
    removePosition(id) {
        return this.organizationStructureService.removePosition(id);
    }
    activatePosition(id) {
        return this.organizationStructureService.activatePosition(id);
    }
    deactivatePosition(id) {
        return this.organizationStructureService.deactivatePosition(id);
    }
    assignPosition(assignPositionDto) {
        return this.organizationStructureService.assignPosition(assignPositionDto);
    }
    getAssignee(id) {
        return this.organizationStructureService.getAssignee(id);
    }
    getMyTeam(req) {
        return this.organizationStructureService.getMyTeam(req.user.userId);
    }
};
exports.OrganizationStructureController = OrganizationStructureController;
__decorate([
    (0, common_1.Post)('change-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager', 'Department Head'),
    (0, swagger_1.ApiOperation)({ summary: 'Create organization structure change request', description: 'Allowed roles: HR Admin, HR Manager, Department Head' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_change_request_dto_1.CreateChangeRequestDto, Object]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "createChangeRequest", null);
__decorate([
    (0, common_1.Get)('change-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all change requests', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "findAllChangeRequests", null);
__decorate([
    (0, common_1.Get)('change-requests/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Get change request by ID', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "findOneChangeRequest", null);
__decorate([
    (0, common_1.Patch)('change-requests/:id/approve'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve organization change request', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "approveChangeRequest", null);
__decorate([
    (0, common_1.Patch)('change-requests/:id/reject'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject organization change request', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "rejectChangeRequest", null);
__decorate([
    (0, common_1.Post)('departments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Create department', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Get)('departments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    (0, swagger_1.ApiOperation)({ summary: 'Get all departments', description: 'Allowed roles: All authenticated users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "findAllDepartments", null);
__decorate([
    (0, common_1.Get)('departments/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    (0, swagger_1.ApiOperation)({ summary: 'Get department by ID', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "findOneDepartment", null);
__decorate([
    (0, common_1.Patch)('departments/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Update department', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.Delete)('departments/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete department', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "removeDepartment", null);
__decorate([
    (0, common_1.Patch)('departments/:id/activate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate department', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "activateDepartment", null);
__decorate([
    (0, common_1.Patch)('departments/:id/deactivate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate department', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "deactivateDepartment", null);
__decorate([
    (0, common_1.Get)('departments/:id/positions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    (0, swagger_1.ApiOperation)({ summary: 'Get positions in department', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "findPositionsByDepartment", null);
__decorate([
    (0, common_1.Get)('hierarchy'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    (0, swagger_1.ApiOperation)({ summary: 'Get full organizational hierarchy', description: 'Allowed roles: All authenticated users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getFullHierarchy", null);
__decorate([
    (0, common_1.Get)('hierarchy/department/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    (0, swagger_1.ApiOperation)({ summary: 'Get department hierarchy', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getDepartmentHierarchy", null);
__decorate([
    (0, common_1.Post)('positions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Create position', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_position_dto_1.CreatePositionDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "createPosition", null);
__decorate([
    (0, common_1.Get)('positions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    (0, swagger_1.ApiOperation)({ summary: 'Get all positions', description: 'Allowed roles: All authenticated users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "findAllPositions", null);
__decorate([
    (0, common_1.Get)('positions/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    (0, swagger_1.ApiOperation)({ summary: 'Get position by ID', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "findOnePosition", null);
__decorate([
    (0, common_1.Patch)('positions/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Update position', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_position_dto_1.UpdatePositionDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "updatePosition", null);
__decorate([
    (0, common_1.Delete)('positions/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete position', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "removePosition", null);
__decorate([
    (0, common_1.Patch)('positions/:id/activate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate position', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "activatePosition", null);
__decorate([
    (0, common_1.Patch)('positions/:id/deactivate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate position', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "deactivatePosition", null);
__decorate([
    (0, common_1.Post)('assignments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Admin', 'HR Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign employee to position', description: 'Allowed roles: HR Admin, HR Manager' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_position_dto_1.AssignPositionDto]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "assignPosition", null);
__decorate([
    (0, common_1.Get)('positions/:id/assignee'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    (0, swagger_1.ApiOperation)({ summary: 'Get position assignee', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getAssignee", null);
__decorate([
    (0, common_1.Get)('my-team'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...employee_profile_enums_1.ALL_EMPLOYEE_ROLES),
    (0, swagger_1.ApiOperation)({ summary: 'Get my direct reports', description: 'Allowed roles: All authenticated users' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrganizationStructureController.prototype, "getMyTeam", null);
exports.OrganizationStructureController = OrganizationStructureController = __decorate([
    (0, swagger_1.ApiTags)('Organization Structure'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api/organization-structure'),
    __metadata("design:paramtypes", [organization_structure_service_1.OrganizationStructureService])
], OrganizationStructureController);
//# sourceMappingURL=organization-structure.controller.js.map