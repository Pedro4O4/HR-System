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
exports.OrganizationStructureService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const department_schema_1 = require("./models/department.schema");
const position_schema_1 = require("./models/position.schema");
const position_assignment_schema_1 = require("./models/position-assignment.schema");
const notification_service_1 = require("../notification/notification.service");
const notification_schema_1 = require("../notification/models/notification.schema");
const organization_structure_enums_1 = require("./enums/organization-structure.enums");
let OrganizationStructureService = class OrganizationStructureService {
    departmentModel;
    positionModel;
    positionAssignmentModel;
    employeeProfileModel;
    structureChangeRequestModel;
    notificationService;
    constructor(departmentModel, positionModel, positionAssignmentModel, employeeProfileModel, structureChangeRequestModel, notificationService) {
        this.departmentModel = departmentModel;
        this.positionModel = positionModel;
        this.positionAssignmentModel = positionAssignmentModel;
        this.employeeProfileModel = employeeProfileModel;
        this.structureChangeRequestModel = structureChangeRequestModel;
        this.notificationService = notificationService;
    }
    async createChangeRequest(createChangeRequestDto) {
        try {
            const count = await this.structureChangeRequestModel.countDocuments().exec();
            const requestNumber = `SCR-${String(count + 1).padStart(6, '0')}`;
            const employee = await this.employeeProfileModel.findById(createChangeRequestDto.requestedByEmployeeId).exec();
            if (!employee) {
                throw new common_1.NotFoundException(`Employee with ID ${createChangeRequestDto.requestedByEmployeeId} not found`);
            }
            const requestData = {
                requestNumber,
                requestedByEmployeeId: new mongoose_2.Types.ObjectId(createChangeRequestDto.requestedByEmployeeId),
                requestType: createChangeRequestDto.requestType,
                targetDepartmentId: createChangeRequestDto.targetDepartmentId
                    ? new mongoose_2.Types.ObjectId(createChangeRequestDto.targetDepartmentId)
                    : undefined,
                targetPositionId: createChangeRequestDto.targetPositionId
                    ? new mongoose_2.Types.ObjectId(createChangeRequestDto.targetPositionId)
                    : undefined,
                details: createChangeRequestDto.details,
                reason: createChangeRequestDto.reason,
                status: organization_structure_enums_1.StructureRequestStatus.SUBMITTED,
                submittedByEmployeeId: new mongoose_2.Types.ObjectId(createChangeRequestDto.requestedByEmployeeId),
                submittedAt: new Date(),
            };
            const createdRequest = new this.structureChangeRequestModel(requestData);
            const saved = await createdRequest.save();
            console.log(`[CREATE CHANGE REQUEST] Successfully created request ${requestNumber}`);
            await this.notificationService.createNotification({
                recipientId: createChangeRequestDto.requestedByEmployeeId,
                type: notification_schema_1.NotificationType.STRUCTURE_REQUEST,
                title: 'Change Request Submitted',
                message: `Your change request ${requestNumber} has been submitted successfully.`,
                relatedEntityId: saved._id.toString(),
                relatedEntityType: 'StructureChangeRequest',
            });
            return saved;
        }
        catch (error) {
            console.error('[CREATE CHANGE REQUEST] Error:', error.message);
            throw new common_1.BadRequestException(`Failed to create change request: ${error.message}`);
        }
    }
    async findAllChangeRequests(page = 1, limit = 10, status) {
        const filter = {};
        if (status) {
            filter.status = status;
        }
        const total = await this.structureChangeRequestModel.countDocuments(filter).exec();
        const skip = (page - 1) * limit;
        const totalPages = Math.ceil(total / limit);
        const data = await this.structureChangeRequestModel
            .find(filter)
            .populate('requestedByEmployeeId', 'fullName employeeNumber')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .exec();
        return {
            data,
            total,
            page,
            limit,
            totalPages
        };
    }
    async findOneChangeRequest(id) {
        const changeRequest = await this.structureChangeRequestModel
            .findById(id)
            .populate('requestedByEmployeeId', 'fullName employeeNumber')
            .exec();
        if (!changeRequest) {
            throw new common_1.NotFoundException(`Change Request with ID ${id} not found`);
        }
        return changeRequest;
    }
    async approveChangeRequest(id) {
        try {
            const updated = await this.structureChangeRequestModel.findByIdAndUpdate(id, { status: 'APPROVED', approvedAt: new Date() }, { new: true, runValidators: true }).exec();
            if (!updated) {
                throw new common_1.NotFoundException(`Change Request with ID ${id} not found`);
            }
            console.log(`[APPROVE] Successfully updated request ${id} to APPROVED`);
            if (updated.requestedByEmployeeId) {
                await this.notificationService.createNotification({
                    recipientId: updated.requestedByEmployeeId.toString(),
                    type: notification_schema_1.NotificationType.REQUEST_APPROVED,
                    title: 'Structure Change Request Approved',
                    message: `Your change request ${updated.requestNumber} has been APPROVED.`,
                    relatedEntityId: updated._id.toString(),
                    relatedEntityType: 'StructureChangeRequest',
                });
            }
            return updated;
        }
        catch (error) {
            console.error(`[APPROVE] Error approving request ${id}:`, error.message);
            throw new common_1.BadRequestException(`Failed to approve request: ${error.message}`);
        }
    }
    async rejectChangeRequest(id) {
        try {
            const updated = await this.structureChangeRequestModel.findByIdAndUpdate(id, { status: 'REJECTED', rejectedAt: new Date() }, { new: true, runValidators: true }).exec();
            if (!updated) {
                throw new common_1.NotFoundException(`Change Request with ID ${id} not found`);
            }
            console.log(`[REJECT] Successfully updated request ${id} to REJECTED`);
            if (updated.requestedByEmployeeId) {
                await this.notificationService.createNotification({
                    recipientId: updated.requestedByEmployeeId.toString(),
                    type: notification_schema_1.NotificationType.REQUEST_REJECTED,
                    title: 'Structure Change Request Rejected',
                    message: `Your change request ${updated.requestNumber} has been REJECTED.`,
                    relatedEntityId: updated._id.toString(),
                    relatedEntityType: 'StructureChangeRequest',
                });
            }
            return updated;
        }
        catch (error) {
            console.error(`[REJECT] Error rejecting request ${id}:`, error.message);
            throw new common_1.BadRequestException(`Failed to reject request: ${error.message}`);
        }
    }
    async getMyTeam(managerId) {
        const myAssignment = await this.positionAssignmentModel.findOne({
            employeeProfileId: new mongoose_2.Types.ObjectId(managerId),
            $or: [{ endDate: null }, { endDate: { $gt: new Date() } }]
        }).exec();
        if (!myAssignment) {
            console.log(`[MyTeam] No assignment found for manager ${managerId}`);
            return [];
        }
        console.log(`[MyTeam] Found assignment for manager ${managerId}: ${myAssignment.positionId}`);
        const directReportPositions = await this.positionModel.find({
            reportsToPositionId: myAssignment.positionId
        }).exec();
        if (directReportPositions.length === 0) {
            console.log(`[MyTeam] No direct reports found for position ${myAssignment.positionId}`);
            return [];
        }
        console.log(`[MyTeam] Found ${directReportPositions.length} direct report positions.`);
        const positionIds = directReportPositions.map(p => p._id);
        const teamAssignments = await this.positionAssignmentModel.find({
            positionId: { $in: positionIds },
            $or: [{ endDate: null }, { endDate: { $gt: new Date() } }]
        })
            .populate('employeeProfileId', 'firstName lastName workEmail jobTitle departmentId')
            .populate('positionId', 'title code')
            .populate('departmentId', 'name')
            .exec();
        return teamAssignments.map(assignment => {
            const emp = assignment.employeeProfileId;
            const pos = assignment.positionId;
            const dept = assignment.departmentId;
            return {
                id: emp._id,
                name: `${emp.firstName} ${emp.lastName}`,
                email: emp.workEmail,
                position: pos.title,
                department: dept.name,
                assignmentDate: assignment.startDate,
            };
        });
    }
    async createDepartment(createDepartmentDto) {
        const createdDepartment = new this.departmentModel(createDepartmentDto);
        return createdDepartment.save();
    }
    async findAllDepartments() {
        return this.departmentModel.find().exec();
    }
    async findOneDepartment(id) {
        const department = await this.departmentModel.findById(id).exec();
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    async updateDepartment(id, updateDepartmentDto) {
        const updatedDepartment = await this.departmentModel
            .findByIdAndUpdate(id, updateDepartmentDto, { new: true })
            .exec();
        if (!updatedDepartment) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return updatedDepartment;
    }
    async removeDepartment(id) {
        const positionsInDept = await this.positionModel.countDocuments({ departmentId: id }).exec();
        if (positionsInDept > 0) {
            throw new common_1.BadRequestException(`Cannot delete department with existing positions (${positionsInDept} found). Use deactivate instead to preserve audit trail. (BR 12, BR 37)`);
        }
        const deletedDepartment = await this.departmentModel.findByIdAndDelete(id).exec();
        if (!deletedDepartment) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return deletedDepartment;
    }
    async activateDepartment(id) {
        const department = await this.departmentModel.findByIdAndUpdate(id, { isActive: true }, { new: true }).exec();
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    async deactivateDepartment(id) {
        const department = await this.departmentModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    async findPositionsByDepartment(departmentId) {
        return this.positionModel.find({ departmentId }).exec();
    }
    async getDepartmentHierarchy(departmentId) {
        const department = await this.departmentModel.findById(departmentId).lean().exec();
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${departmentId} not found`);
        }
        const positions = await this.positionModel.find({ departmentId }).lean().exec();
        return { ...department, positions };
    }
    async getFullHierarchy() {
        const departments = await this.departmentModel.find().lean().exec();
        const hierarchy = [];
        for (const dept of departments) {
            const positions = await this.positionModel.find({ departmentId: dept._id }).lean().exec();
            hierarchy.push({ ...dept, positions });
        }
        return hierarchy;
    }
    async createPosition(createPositionDto) {
        const department = await this.departmentModel.findById(createPositionDto.departmentId).exec();
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${createPositionDto.departmentId} not found`);
        }
        const createdPosition = new this.positionModel(createPositionDto);
        return createdPosition.save();
    }
    async findAllPositions() {
        return this.positionModel.find().populate('departmentId').exec();
    }
    async findOnePosition(id) {
        const position = await this.positionModel.findById(id).populate('departmentId').exec();
        if (!position) {
            throw new common_1.NotFoundException(`Position with ID ${id} not found`);
        }
        return position;
    }
    async updatePosition(id, updatePositionDto) {
        const updatedPosition = await this.positionModel
            .findByIdAndUpdate(id, updatePositionDto, { new: true })
            .exec();
        if (!updatedPosition) {
            throw new common_1.NotFoundException(`Position with ID ${id} not found`);
        }
        return updatedPosition;
    }
    async removePosition(id) {
        const assignments = await this.positionAssignmentModel.countDocuments({ positionId: id }).exec();
        if (assignments > 0) {
            throw new common_1.BadRequestException(`Cannot delete position with employee assignments (${assignments} found). Use deactivate instead to preserve audit trail. (BR 12, BR 37)`);
        }
        const deletedPosition = await this.positionModel.findByIdAndDelete(id).exec();
        if (!deletedPosition) {
            throw new common_1.NotFoundException(`Position with ID ${id} not found`);
        }
        return deletedPosition;
    }
    async activatePosition(id) {
        const position = await this.positionModel.findByIdAndUpdate(id, { isActive: true }, { new: true }).exec();
        if (!position) {
            throw new common_1.NotFoundException(`Position with ID ${id} not found`);
        }
        return position;
    }
    async deactivatePosition(id) {
        const position = await this.positionModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
        if (!position) {
            throw new common_1.NotFoundException(`Position with ID ${id} not found`);
        }
        return position;
    }
    async assignPosition(assignPositionDto) {
        const { employeeProfileId, positionId, startDate, reason, notes } = assignPositionDto;
        const employee = await this.employeeProfileModel.findById(employeeProfileId).exec();
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${employeeProfileId} not found`);
        }
        const position = await this.positionModel.findById(positionId).exec();
        if (!position) {
            throw new common_1.NotFoundException(`Position with ID ${positionId} not found`);
        }
        const assignment = new this.positionAssignmentModel({
            employeeProfileId: new mongoose_2.Types.ObjectId(employeeProfileId),
            positionId: new mongoose_2.Types.ObjectId(positionId),
            departmentId: position.departmentId,
            startDate: new Date(startDate),
            reason,
            notes,
        });
        const savedAssignment = await assignment.save();
        employee.primaryPositionId = new mongoose_2.Types.ObjectId(positionId);
        employee.primaryDepartmentId = position.departmentId;
        if (position.reportsToPositionId) {
            employee.supervisorPositionId = position.reportsToPositionId;
        }
        await employee.save();
        return savedAssignment;
    }
    async getAssignee(positionId) {
        return this.employeeProfileModel.findOne({ primaryPositionId: new mongoose_2.Types.ObjectId(positionId) }).exec();
    }
};
exports.OrganizationStructureService = OrganizationStructureService;
exports.OrganizationStructureService = OrganizationStructureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(department_schema_1.Department.name)),
    __param(1, (0, mongoose_1.InjectModel)(position_schema_1.Position.name)),
    __param(2, (0, mongoose_1.InjectModel)(position_assignment_schema_1.PositionAssignment.name)),
    __param(3, (0, mongoose_1.InjectModel)('EmployeeProfile')),
    __param(4, (0, mongoose_1.InjectModel)('StructureChangeRequest')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notification_service_1.NotificationService])
], OrganizationStructureService);
//# sourceMappingURL=organization-structure.service.js.map