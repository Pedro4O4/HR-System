"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose = __importStar(require("mongoose"));
const bcrypt = __importStar(require("bcryptjs"));
const employee_profile_schema_1 = require("./models/employee-profile.schema");
const employee_system_role_schema_1 = require("./models/employee-system-role.schema");
const qualification_schema_1 = require("./models/qualification.schema");
const candidate_schema_1 = require("./models/candidate.schema");
const ep_change_request_schema_1 = require("./models/ep-change-request.schema");
const notification_service_1 = require("../notification/notification.service");
const employee_profile_enums_1 = require("./enums/employee-profile.enums");
let EmployeeProfileService = class EmployeeProfileService {
    employeeProfileModel;
    employeeSystemRoleModel;
    employeeQualificationModel;
    candidateModel;
    changeRequestModel;
    notificationService;
    constructor(employeeProfileModel, employeeSystemRoleModel, employeeQualificationModel, candidateModel, changeRequestModel, notificationService) {
        this.employeeProfileModel = employeeProfileModel;
        this.employeeSystemRoleModel = employeeSystemRoleModel;
        this.employeeQualificationModel = employeeQualificationModel;
        this.candidateModel = candidateModel;
        this.changeRequestModel = changeRequestModel;
        this.notificationService = notificationService;
    }
    isValidObjectId(id) {
        if (!id || typeof id !== 'string')
            return false;
        const trimmed = id.trim();
        if (!trimmed || trimmed === 'string')
            return false;
        return mongoose_2.Types.ObjectId.isValid(trimmed);
    }
    async create(createEmployeeProfileDto) {
        const existingEmail = await this.employeeProfileModel.findOne({
            workEmail: createEmployeeProfileDto.workEmail,
        });
        if (existingEmail) {
            throw new common_1.ConflictException('Employee with this email already exists');
        }
        const existingEmployee = await this.employeeProfileModel.findOne({
            employeeNumber: createEmployeeProfileDto.employeeNumber,
        });
        if (existingEmployee) {
            throw new common_1.ConflictException('Employee with this number already exists');
        }
        const hashedPassword = await bcrypt.hash(createEmployeeProfileDto.password, 10);
        const newEmployee = new this.employeeProfileModel({
            ...createEmployeeProfileDto,
            password: hashedPassword,
            fullName: `${createEmployeeProfileDto.firstName} ${createEmployeeProfileDto.middleName || ''} ${createEmployeeProfileDto.lastName}`.trim(),
            status: employee_profile_enums_1.EmployeeStatus.ACTIVE,
            statusEffectiveFrom: new Date(),
            primaryPositionId: createEmployeeProfileDto.primaryPositionId
                ? new mongoose_2.Types.ObjectId(createEmployeeProfileDto.primaryPositionId)
                : undefined,
            primaryDepartmentId: createEmployeeProfileDto.primaryDepartmentId
                ? new mongoose_2.Types.ObjectId(createEmployeeProfileDto.primaryDepartmentId)
                : undefined,
            payGradeId: createEmployeeProfileDto.payGradeId
                ? new mongoose_2.Types.ObjectId(createEmployeeProfileDto.payGradeId)
                : undefined,
        });
        const savedEmployee = await newEmployee.save();
        const systemRole = new this.employeeSystemRoleModel({
            employeeProfileId: savedEmployee._id,
            roles: [employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE],
            permissions: ['view_own_profile', 'update_own_profile'],
            isActive: true,
        });
        await systemRole.save();
        return this.mapToResponseDto(savedEmployee);
    }
    async findAll(skip = 0, limit = 10, status) {
        const filter = {};
        if (status) {
            filter.status = status;
        }
        const total = await this.employeeProfileModel.countDocuments(filter);
        const employees = await this.employeeProfileModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .populate('primaryPositionId')
            .populate('primaryDepartmentId')
            .populate('payGradeId')
            .exec();
        return {
            data: employees.map(emp => this.mapToResponseDto(emp)),
            total,
            skip,
            limit,
        };
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid employee ID');
        }
        const employee = await this.employeeProfileModel
            .findById(id)
            .populate('primaryPositionId')
            .populate('primaryDepartmentId')
            .populate('payGradeId')
            .populate('accessProfileId')
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        return this.mapToResponseDto(employee);
    }
    async findByEmail(email) {
        const employee = await this.employeeProfileModel
            .findOne({ workEmail: email })
            .populate('primaryPositionId')
            .populate('primaryDepartmentId')
            .populate('payGradeId')
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with email ${email} not found`);
        }
        return this.mapToResponseDto(employee);
    }
    async findByEmployeeNumber(employeeNumber) {
        const employee = await this.employeeProfileModel
            .findOne({ employeeNumber })
            .populate('primaryPositionId')
            .populate('primaryDepartmentId')
            .populate('payGradeId')
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with number ${employeeNumber} not found`);
        }
        return this.mapToResponseDto(employee);
    }
    async update(id, updateEmployeeProfileDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid employee ID');
        }
        if (updateEmployeeProfileDto.workEmail) {
            const existing = await this.employeeProfileModel.findOne({
                workEmail: updateEmployeeProfileDto.workEmail,
                _id: { $ne: id },
            });
            if (existing) {
                throw new common_1.ConflictException('Email already in use');
            }
        }
        const updateData = { ...updateEmployeeProfileDto };
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        else {
            delete updateData.password;
        }
        if (updateData.firstName || updateData.middleName || updateData.lastName) {
            const employee = await this.employeeProfileModel.findById(id);
            if (employee) {
                updateData.fullName = `${updateData.firstName || employee.firstName} ${updateData.middleName || employee.middleName || ''} ${updateData.lastName || employee.lastName}`.trim();
            }
        }
        if (updateData.status) {
            updateData.statusEffectiveFrom = new Date();
        }
        if (this.isValidObjectId(updateData.primaryPositionId)) {
            updateData.primaryPositionId = new mongoose_2.Types.ObjectId(updateData.primaryPositionId);
        }
        else {
            delete updateData.primaryPositionId;
        }
        if (this.isValidObjectId(updateData.primaryDepartmentId)) {
            updateData.primaryDepartmentId = new mongoose_2.Types.ObjectId(updateData.primaryDepartmentId);
        }
        else {
            delete updateData.primaryDepartmentId;
        }
        if (this.isValidObjectId(updateData.payGradeId)) {
            updateData.payGradeId = new mongoose_2.Types.ObjectId(updateData.payGradeId);
        }
        else {
            delete updateData.payGradeId;
        }
        const updatedEmployee = await this.employeeProfileModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('primaryPositionId')
            .populate('primaryDepartmentId')
            .populate('payGradeId')
            .exec();
        if (!updatedEmployee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        return this.mapToResponseDto(updatedEmployee);
    }
    async delete(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid employee ID');
        }
        const result = await this.employeeProfileModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        await this.employeeSystemRoleModel.deleteOne({ employeeProfileId: id });
        return { message: 'Employee deleted successfully' };
    }
    async getTeam(managerId, skip = 0, limit = 10) {
        if (!mongoose_2.Types.ObjectId.isValid(managerId)) {
            throw new common_1.BadRequestException('Invalid manager ID');
        }
        const filter = {
            supervisorPositionId: { $exists: true },
        };
        const total = await this.employeeProfileModel.countDocuments(filter);
        const employees = await this.employeeProfileModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .populate('primaryPositionId')
            .populate('primaryDepartmentId')
            .populate('payGradeId')
            .exec();
        return {
            data: employees.map(emp => this.mapToResponseDto(emp)),
            total,
        };
    }
    async updateStatus(id, status) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid employee ID');
        }
        const updatedEmployee = await this.employeeProfileModel
            .findByIdAndUpdate(id, {
            status,
            statusEffectiveFrom: new Date(),
        }, { new: true })
            .populate('primaryPositionId')
            .populate('primaryDepartmentId')
            .populate('payGradeId')
            .exec();
        if (!updatedEmployee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        return this.mapToResponseDto(updatedEmployee);
    }
    async updateContactInfo(id, updateDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid employee ID');
        }
        const updateData = {};
        if (updateDto.mobilePhone !== undefined) {
            updateData.mobilePhone = updateDto.mobilePhone;
        }
        if (updateDto.homePhone !== undefined) {
            updateData.homePhone = updateDto.homePhone;
        }
        if (updateDto.personalEmail !== undefined) {
            updateData.personalEmail = updateDto.personalEmail;
        }
        if (updateDto.address !== undefined) {
            updateData.address = updateDto.address;
        }
        const updatedEmployee = await this.employeeProfileModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('primaryPositionId')
            .populate('primaryDepartmentId')
            .populate('payGradeId')
            .exec();
        if (!updatedEmployee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        console.log(`[CONTACT INFO UPDATE] Employee ${id} updated contact info at ${new Date().toISOString()}`);
        return this.mapToResponseDto(updatedEmployee);
    }
    async uploadProfilePicture(id, file) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid employee ID');
        }
        const employee = await this.employeeProfileModel.findById(id);
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        if (employee.profilePictureUrl) {
            const fs = require('fs');
            const path = require('path');
            const oldPicturePath = path.join(process.cwd(), employee.profilePictureUrl);
            if (fs.existsSync(oldPicturePath)) {
                try {
                    fs.unlinkSync(oldPicturePath);
                    console.log(`[UPLOAD PICTURE] Deleted old picture: ${oldPicturePath}`);
                }
                catch (error) {
                    console.error(`[UPLOAD PICTURE] Error deleting old picture: ${error.message}`);
                }
            }
        }
        const pictureUrl = `/uploads/profile-pictures/${file.filename}`;
        employee.profilePictureUrl = pictureUrl;
        await employee.save();
        console.log(`[UPLOAD PICTURE] Employee ${id} uploaded new profile picture: ${pictureUrl}`);
        return this.mapToResponseDto(employee);
    }
    async addQualification(employeeId, createDto) {
        const employee = await this.employeeProfileModel.findById(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        const qualification = new this.employeeQualificationModel({
            employeeProfileId: employeeId,
            ...createDto,
        });
        return await qualification.save();
    }
    async getQualifications(employeeId) {
        const employee = await this.employeeProfileModel.findById(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        return await this.employeeQualificationModel.find({ employeeProfileId: employeeId }).exec();
    }
    async assignRoles(employeeId, assignDto) {
        const employee = await this.employeeProfileModel.findById(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        let role = await this.employeeSystemRoleModel.findOne({ employeeProfileId: employeeId });
        if (role) {
            role.roles = assignDto.roles;
            role.permissions = assignDto.permissions || role.permissions;
        }
        else {
            role = new this.employeeSystemRoleModel({
                employeeProfileId: employeeId,
                roles: assignDto.roles,
                permissions: assignDto.permissions || [],
            });
        }
        const saved = await role.save();
        employee.accessProfileId = saved._id;
        await employee.save();
        return saved;
    }
    async getEmployeeRoles(employeeId) {
        const employee = await this.employeeProfileModel.findById(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        let role = await this.employeeSystemRoleModel.findOne({ employeeProfileId: employeeId });
        if (!role) {
            role = new this.employeeSystemRoleModel({
                employeeProfileId: employeeId,
                roles: [employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE],
                permissions: [],
            });
            await role.save();
        }
        return role;
    }
    async getAllRoles() {
        const roles = await this.employeeSystemRoleModel
            .find()
            .populate('employeeProfileId', 'fullName employeeNumber workEmail')
            .exec();
        const flattenedRoles = [];
        for (const roleDoc of roles) {
            const employeeProfile = roleDoc.employeeProfileId;
            if (roleDoc.roles && roleDoc.roles.length > 0) {
                for (const role of roleDoc.roles) {
                    flattenedRoles.push({
                        _id: `${roleDoc._id}-${role}`,
                        employeeProfile: {
                            fullName: employeeProfile?.fullName || 'Unknown',
                            employeeNumber: employeeProfile?.employeeNumber || 'N/A',
                            workEmail: employeeProfile?.workEmail || 'N/A',
                        },
                        systemRole: role,
                        assignedAt: roleDoc.createdAt || new Date(),
                    });
                }
            }
        }
        return flattenedRoles;
    }
    async updateRoles(employeeId, updateDto) {
        const employee = await this.employeeProfileModel.findById(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        let role = await this.employeeSystemRoleModel.findOne({ employeeProfileId: employeeId });
        if (!role) {
            role = new this.employeeSystemRoleModel({
                employeeProfileId: employeeId,
            });
        }
        if (updateDto.roles) {
            role.roles = updateDto.roles;
        }
        if (updateDto.permissions) {
            role.permissions = updateDto.permissions;
        }
        return await role.save();
    }
    async deactivateRoles(employeeId) {
        const employee = await this.employeeProfileModel.findById(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        let role = await this.employeeSystemRoleModel.findOne({ employeeProfileId: employeeId });
        if (!role) {
            throw new common_1.NotFoundException('Employee role not found');
        }
        role.isActive = false;
        return await role.save();
    }
    async createCandidate(createDto) {
        const existing = await this.candidateModel.findOne({
            $or: [{ personalEmail: createDto.personalEmail }, { nationalId: createDto.nationalId }],
        });
        if (existing) {
            throw new common_1.ConflictException('Candidate with this email or national ID already exists');
        }
        const candidateCount = await this.candidateModel.countDocuments();
        const candidateNumber = `CAND-${String(candidateCount + 1).padStart(5, '0')}`;
        const candidate = new this.candidateModel({
            ...createDto,
            candidateNumber,
            status: createDto.status || employee_profile_enums_1.CandidateStatus.APPLIED,
            fullName: `${createDto.firstName} ${createDto.lastName}`,
        });
        return await candidate.save();
    }
    async getAllCandidates(queryDto) {
        const { page = 1, limit = 10, search } = queryDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (search) {
            filter.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { appliedPosition: { $regex: search, $options: 'i' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.candidateModel.find(filter).skip(skip).limit(Number(limit)).exec(),
            this.candidateModel.countDocuments(filter).exec(),
        ]);
        return {
            data,
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)),
        };
    }
    async getCandidateById(id) {
        const candidate = await this.candidateModel.findById(id).exec();
        if (!candidate) {
            throw new common_1.NotFoundException(`Candidate with ID ${id} not found`);
        }
        return candidate;
    }
    async updateCandidateStatus(candidateId, updateDto) {
        const candidate = await this.candidateModel.findById(candidateId);
        if (!candidate) {
            throw new common_1.NotFoundException('Candidate not found');
        }
        candidate.status = updateDto.status;
        return await candidate.save();
    }
    async convertCandidateToEmployee(candidateId, convertDto) {
        const candidate = await this.candidateModel.findById(candidateId);
        if (!candidate) {
            throw new common_1.NotFoundException('Candidate not found');
        }
        if (candidate.status !== employee_profile_enums_1.CandidateStatus.OFFER_ACCEPTED) {
            throw new common_1.BadRequestException('Only candidates with OFFER_ACCEPTED status can be converted');
        }
        const existing = await this.employeeProfileModel.findOne({
            $or: [{ employeeNumber: convertDto.employeeNumber }, { nationalId: candidate.nationalId }],
        });
        if (existing) {
            throw new common_1.ConflictException('Employee with this number or national ID already exists');
        }
        const hashedPassword = await bcrypt.hash(convertDto.password, 10);
        const employee = new this.employeeProfileModel({
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            middleName: candidate.middleName,
            nationalId: candidate.nationalId,
            dateOfBirth: candidate.dateOfBirth,
            personalEmail: candidate.personalEmail,
            workEmail: convertDto.workEmail,
            password: hashedPassword,
            isTemporaryPassword: true,
            employeeNumber: convertDto.employeeNumber,
            dateOfHire: new Date(),
            status: employee_profile_enums_1.EmployeeStatus.ACTIVE,
            primaryPositionId: this.isValidObjectId(convertDto.primaryPositionId)
                ? new mongoose_2.Types.ObjectId(convertDto.primaryPositionId)
                : undefined,
            primaryDepartmentId: this.isValidObjectId(convertDto.primaryDepartmentId)
                ? new mongoose_2.Types.ObjectId(convertDto.primaryDepartmentId)
                : undefined,
            payGradeId: this.isValidObjectId(convertDto.payGradeId)
                ? new mongoose_2.Types.ObjectId(convertDto.payGradeId)
                : undefined,
            fullName: `${candidate.firstName} ${candidate.lastName}`,
        });
        const savedEmployee = await employee.save();
        await this.candidateModel.findByIdAndDelete(candidateId);
        return this.mapToResponseDto(savedEmployee);
    }
    async createChangeRequest(employeeId, createDto) {
        try {
            const employee = await this.employeeProfileModel.findById(employeeId);
            if (!employee) {
                throw new common_1.NotFoundException('Employee not found');
            }
            const requestId = `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const changeRequest = new this.changeRequestModel({
                requestId,
                employeeProfileId: employeeId,
                ...createDto,
                status: employee_profile_enums_1.ProfileChangeStatus.PENDING,
                submittedAt: new Date(),
            });
            const saved = await changeRequest.save();
            console.log(`[CREATE CHANGE REQUEST] Successfully created request ${requestId} for employee ${employeeId}`);
            return saved;
        }
        catch (error) {
            console.error('[CREATE CHANGE REQUEST] Error:', error.message);
            throw new common_1.BadRequestException(`Failed to create change request: ${error.message}`);
        }
    }
    async getAllChangeRequests(queryDto) {
        try {
            const page = queryDto.page || 1;
            const limit = queryDto.limit || 10;
            const skip = (page - 1) * limit;
            const filter = {};
            const [data, total] = await Promise.all([
                this.changeRequestModel
                    .find(filter)
                    .populate('employeeProfileId', 'fullName employeeNumber workEmail')
                    .sort({ submittedAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec(),
                this.changeRequestModel.countDocuments(filter),
            ]);
            console.log(`[GET CHANGE REQUESTS] Found ${total} total requests, returning page ${page}`);
            return {
                data,
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            console.error('[GET CHANGE REQUESTS] Error:', error.message);
            throw new common_1.BadRequestException(`Failed to fetch change requests: ${error.message}`);
        }
    }
    async approveChangeRequest(requestId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(requestId)) {
                throw new common_1.BadRequestException('Invalid change request ID format');
            }
            const request = await this.changeRequestModel.findByIdAndUpdate(requestId, {
                status: employee_profile_enums_1.ProfileChangeStatus.APPROVED,
                processedAt: new Date(),
            }, { new: true }).populate('employeeProfileId', 'fullName employeeNumber workEmail').exec();
            if (!request) {
                throw new common_1.NotFoundException(`Change request with ID ${requestId} not found`);
            }
            const employeeId = typeof request.employeeProfileId === 'string'
                ? request.employeeProfileId
                : request.employeeProfileId._id;
            await this.notificationService.notifyRequestApproved(employeeId.toString(), request._id.toString(), 'change request');
            console.log(`[APPROVE CHANGE REQUEST] Approved request ${requestId} and sent notification`);
            return request;
        }
        catch (error) {
            console.error('[APPROVE CHANGE REQUEST] Error:', error.message);
            throw new common_1.BadRequestException(`Failed to approve change request: ${error.message} `);
        }
    }
    async rejectChangeRequest(requestId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(requestId)) {
                throw new common_1.BadRequestException('Invalid change request ID format');
            }
            const request = await this.changeRequestModel.findByIdAndUpdate(requestId, {
                status: employee_profile_enums_1.ProfileChangeStatus.REJECTED,
                processedAt: new Date(),
            }, { new: true }).populate('employeeProfileId', 'fullName employeeNumber workEmail').exec();
            if (!request) {
                throw new common_1.NotFoundException(`Change request with ID ${requestId} not found`);
            }
            const employeeId = typeof request.employeeProfileId === 'string'
                ? request.employeeProfileId
                : request.employeeProfileId._id;
            await this.notificationService.notifyRequestRejected(employeeId.toString(), request._id.toString(), 'change request');
            console.log(`[REJECT CHANGE REQUEST] Rejected request ${requestId} and sent notification`);
            return request;
        }
        catch (error) {
            console.error('[REJECT CHANGE REQUEST] Error:', error.message);
            throw new common_1.BadRequestException(`Failed to reject change request: ${error.message} `);
        }
    }
    async getChangeRequestById(requestId) {
        const changeRequest = await this.changeRequestModel.findById(requestId);
        if (!changeRequest) {
            throw new common_1.NotFoundException('Change request not found');
        }
        return changeRequest;
    }
    async deactivateEmployee(id, status) {
        if (![employee_profile_enums_1.EmployeeStatus.SUSPENDED, employee_profile_enums_1.EmployeeStatus.TERMINATED, employee_profile_enums_1.EmployeeStatus.RETIRED].includes(status)) {
            throw new common_1.BadRequestException('Invalid deactivation status');
        }
        const employee = await this.employeeProfileModel.findById(id);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        employee.status = status;
        employee.statusEffectiveFrom = new Date();
        const updated = await employee.save();
        return this.mapToResponseDto(updated);
    }
    async createEmployeeProfile(createDto) {
        const existing = await this.employeeProfileModel.findOne({
            $or: [{ employeeNumber: createDto.employeeNumber }, { nationalId: createDto.nationalId }],
        });
        if (existing) {
            throw new common_1.ConflictException('Employee with this number or national ID already exists');
        }
        const hashedPassword = await bcrypt.hash(createDto.password, 10);
        const employee = new this.employeeProfileModel({
            ...createDto,
            password: hashedPassword,
            status: employee_profile_enums_1.EmployeeStatus.ACTIVE,
            fullName: `${createDto.firstName} ${createDto.lastName} `,
            primaryPositionId: this.isValidObjectId(createDto.primaryPositionId)
                ? new mongoose_2.Types.ObjectId(createDto.primaryPositionId)
                : undefined,
            primaryDepartmentId: this.isValidObjectId(createDto.primaryDepartmentId)
                ? new mongoose_2.Types.ObjectId(createDto.primaryDepartmentId)
                : undefined,
            payGradeId: this.isValidObjectId(createDto.payGradeId)
                ? new mongoose_2.Types.ObjectId(createDto.payGradeId)
                : undefined,
        });
        const saved = await employee.save();
        return this.mapToResponseDto(saved);
    }
    async getAllEmployees(queryDto) {
        const page = queryDto.page || 1;
        const limit = queryDto.limit || 10;
        const skip = (page - 1) * limit;
        const filter = {};
        if (queryDto.search) {
            filter.$or = [
                { firstName: { $regex: queryDto.search, $options: 'i' } },
                { lastName: { $regex: queryDto.search, $options: 'i' } },
                { employeeNumber: { $regex: queryDto.search, $options: 'i' } },
                { workEmail: { $regex: queryDto.search, $options: 'i' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.employeeProfileModel.find(filter).skip(skip).limit(limit).exec(),
            this.employeeProfileModel.countDocuments(filter),
        ]);
        return {
            data: data.map((emp) => this.mapToResponseDto(emp)),
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        };
    }
    async getEmployeeById(id) {
        const employee = await this.employeeProfileModel
            .findById(id)
            .populate(['primaryPositionId', 'primaryDepartmentId', 'payGradeId'])
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        return this.mapToResponseDto(employee);
    }
    async updateEmployeeProfile(id, updateDto) {
        const employee = await this.employeeProfileModel.findById(id);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        if (updateDto.firstName || updateDto.lastName) {
            const firstName = updateDto.firstName || employee.firstName;
            const lastName = updateDto.lastName || employee.lastName;
            employee.fullName = `${firstName} ${lastName} `;
        }
        Object.keys(updateDto).forEach((key) => {
            if (updateDto[key] !== undefined) {
                employee[key] = updateDto[key];
            }
        });
        const updated = await employee.save();
        return this.mapToResponseDto(updated);
    }
    async exportEmployeeProfileToPdf(id) {
        const employee = await this.employeeProfileModel
            .findById(id)
            .populate(['primaryPositionId', 'primaryDepartmentId', 'payGradeId'])
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        const PDFDocument = require('pdfkit');
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument({ margin: 50 });
                const chunks = [];
                doc.on('data', (chunk) => chunks.push(chunk));
                doc.on('end', () => resolve(Buffer.concat(chunks)));
                doc.on('error', reject);
                doc.fontSize(24).font('Helvetica-Bold').text('Employee Profile Report', { align: 'center' });
                doc.moveDown(0.5);
                doc.fontSize(10).font('Helvetica').text(`Generated on: ${new Date().toLocaleDateString()} `, { align: 'center' });
                doc.moveDown(2);
                doc.fontSize(16).font('Helvetica-Bold').text('Personal Information');
                doc.moveDown(0.5);
                doc.fontSize(11).font('Helvetica');
                const personalInfo = [
                    { label: 'Full Name', value: employee.fullName },
                    { label: 'Employee Number', value: employee.employeeNumber },
                    { label: 'National ID', value: employee.nationalId },
                    { label: 'Date of Birth', value: employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : 'N/A' },
                    { label: 'Gender', value: employee.gender || 'N/A' },
                    { label: 'Marital Status', value: employee.maritalStatus || 'N/A' },
                ];
                personalInfo.forEach(item => {
                    doc.font('Helvetica-Bold').text(`${item.label}: `, { continued: true })
                        .font('Helvetica').text(item.value);
                });
                doc.moveDown(1.5);
                doc.fontSize(16).font('Helvetica-Bold').text('Contact Information');
                doc.moveDown(0.5);
                doc.fontSize(11).font('Helvetica');
                const contactInfo = [
                    { label: 'Work Email', value: employee.workEmail || 'N/A' },
                    { label: 'Personal Email', value: employee.personalEmail || 'N/A' },
                    { label: 'Mobile Phone', value: employee.mobilePhone || 'N/A' },
                    { label: 'Home Phone', value: employee.homePhone || 'N/A' },
                ];
                contactInfo.forEach(item => {
                    doc.font('Helvetica-Bold').text(`${item.label}: `, { continued: true })
                        .font('Helvetica').text(item.value);
                });
                doc.moveDown(1.5);
                doc.fontSize(16).font('Helvetica-Bold').text('Employment Information');
                doc.moveDown(0.5);
                doc.fontSize(11).font('Helvetica');
                const employmentInfo = [
                    { label: 'Status', value: employee.status },
                    { label: 'Date of Hire', value: employee.dateOfHire ? new Date(employee.dateOfHire).toLocaleDateString() : 'N/A' },
                    { label: 'Contract Type', value: employee.contractType || 'N/A' },
                    { label: 'Work Type', value: employee.workType || 'N/A' },
                    { label: 'Contract Start Date', value: employee.contractStartDate ? new Date(employee.contractStartDate).toLocaleDateString() : 'N/A' },
                    { label: 'Contract End Date', value: employee.contractEndDate ? new Date(employee.contractEndDate).toLocaleDateString() : 'N/A' },
                ];
                employmentInfo.forEach(item => {
                    doc.font('Helvetica-Bold').text(`${item.label}: `, { continued: true })
                        .font('Helvetica').text(item.value);
                });
                doc.moveDown(1.5);
                doc.fontSize(16).font('Helvetica-Bold').text('Banking Information');
                doc.moveDown(0.5);
                doc.fontSize(11).font('Helvetica');
                const bankingInfo = [
                    { label: 'Bank Name', value: employee.bankName || 'N/A' },
                    { label: 'Account Number', value: employee.bankAccountNumber || 'N/A' },
                ];
                bankingInfo.forEach(item => {
                    doc.font('Helvetica-Bold').text(`${item.label}: `, { continued: true })
                        .font('Helvetica').text(item.value);
                });
                if (employee.biography) {
                    doc.moveDown(1.5);
                    doc.fontSize(16).font('Helvetica-Bold').text('Biography');
                    doc.moveDown(0.5);
                    doc.fontSize(11).font('Helvetica').text(employee.biography, { align: 'justify' });
                }
                doc.moveDown(2);
                doc.fontSize(8).font('Helvetica').text('This document is confidential and intended for internal use only.', { align: 'center', color: 'gray' });
                doc.end();
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async exportEmployeesToCsv() {
        const { Parser } = require('json2csv');
        const employees = await this.employeeProfileModel
            .find({ status: 'ACTIVE' })
            .populate(['primaryPositionId', 'primaryDepartmentId', 'payGradeId'])
            .lean()
            .exec();
        const fields = [
            { label: 'Employee Number', value: 'employeeNumber' },
            { label: 'Full Name', value: 'fullName' },
            { label: 'First Name', value: 'firstName' },
            { label: 'Last Name', value: 'lastName' },
            { label: 'National ID', value: 'nationalId' },
            { label: 'Work Email', value: 'workEmail' },
            { label: 'Personal Email', value: 'personalEmail' },
            { label: 'Mobile Phone', value: 'mobilePhone' },
            { label: 'Home Phone', value: 'homePhone' },
            { label: 'Date of Birth', value: 'dateOfBirth' },
            { label: 'Date of Hire', value: 'dateOfHire' },
            { label: 'Gender', value: 'gender' },
            { label: 'Marital Status', value: 'maritalStatus' },
            { label: 'Status', value: 'status' },
            { label: 'Contract Type', value: 'contractType' },
            { label: 'Work Type', value: 'workType' },
            { label: 'Contract Start Date', value: 'contractStartDate' },
            { label: 'Contract End Date', value: 'contractEndDate' },
            { label: 'Department', value: (row) => row.primaryDepartmentId?.name || 'N/A' },
            { label: 'Position', value: (row) => row.primaryPositionId?.title || 'N/A' },
            { label: 'Pay Grade', value: (row) => row.payGradeId?.title || 'N/A' },
            { label: 'Bank Name', value: 'bankName' },
            { label: 'Bank Account Number', value: 'bankAccountNumber' },
        ];
        const parser = new Parser({ fields });
        const csv = parser.parse(employees);
        return csv;
    }
    mapToResponseDto(employee) {
        return {
            _id: employee._id.toString(),
            workEmail: employee.workEmail || '',
            firstName: employee.firstName,
            lastName: employee.lastName,
            middleName: employee.middleName,
            fullName: employee.fullName || `${employee.firstName} ${employee.lastName} `,
            employeeNumber: employee.employeeNumber,
            nationalId: employee.nationalId,
            dateOfBirth: employee.dateOfBirth,
            dateOfHire: employee.dateOfHire,
            gender: employee.gender,
            maritalStatus: employee.maritalStatus,
            mobilePhone: employee.mobilePhone,
            homePhone: employee.homePhone,
            personalEmail: employee.personalEmail,
            status: employee.status,
            contractType: employee.contractType,
            workType: employee.workType,
            contractStartDate: employee.contractStartDate,
            contractEndDate: employee.contractEndDate,
            bankName: employee.bankName,
            bankAccountNumber: employee.bankAccountNumber,
            biography: employee.biography,
            profilePictureUrl: employee.profilePictureUrl,
        };
    }
};
exports.EmployeeProfileService = EmployeeProfileService;
exports.EmployeeProfileService = EmployeeProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(employee_profile_schema_1.EmployeeProfile.name)),
    __param(1, (0, mongoose_1.InjectModel)(employee_system_role_schema_1.EmployeeSystemRole.name)),
    __param(2, (0, mongoose_1.InjectModel)(qualification_schema_1.EmployeeQualification.name)),
    __param(3, (0, mongoose_1.InjectModel)(candidate_schema_1.Candidate.name)),
    __param(4, (0, mongoose_1.InjectModel)(ep_change_request_schema_1.EmployeeProfileChangeRequest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notification_service_1.NotificationService])
], EmployeeProfileService);
//# sourceMappingURL=employee-profile.service.js.map