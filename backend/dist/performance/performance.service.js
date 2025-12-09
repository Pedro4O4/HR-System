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
exports.PerformanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const appraisal_template_schema_1 = require("./models/appraisal-template.schema");
const appraisal_cycle_schema_1 = require("./models/appraisal-cycle.schema");
const appraisal_assignment_schema_1 = require("./models/appraisal-assignment.schema");
const appraisal_record_schema_1 = require("./models/appraisal-record.schema");
const appraisal_dispute_schema_1 = require("./models/appraisal-dispute.schema");
const performance_enums_1 = require("./enums/performance.enums");
const notification_service_1 = require("../notification/notification.service");
const notification_schema_1 = require("../notification/models/notification.schema");
let PerformanceService = class PerformanceService {
    templateModel;
    cycleModel;
    assignmentModel;
    recordModel;
    disputeModel;
    employeeModel;
    notificationService;
    constructor(templateModel, cycleModel, assignmentModel, recordModel, disputeModel, employeeModel, notificationService) {
        this.templateModel = templateModel;
        this.cycleModel = cycleModel;
        this.assignmentModel = assignmentModel;
        this.recordModel = recordModel;
        this.disputeModel = disputeModel;
        this.employeeModel = employeeModel;
        this.notificationService = notificationService;
    }
    async createTemplate(dto) {
        const template = new this.templateModel(dto);
        return template.save();
    }
    async findAllTemplates() {
        return this.templateModel.find().exec();
    }
    async findOneTemplate(id) {
        const template = await this.templateModel.findById(id).exec();
        if (!template) {
            throw new common_1.NotFoundException(`Template with ID ${id} not found`);
        }
        return template;
    }
    async updateTemplate(id, dto) {
        const template = await this.templateModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        if (!template) {
            throw new common_1.NotFoundException(`Template with ID ${id} not found`);
        }
        return template;
    }
    async deleteTemplate(id) {
        const template = await this.templateModel.findByIdAndDelete(id).exec();
        if (!template) {
            throw new common_1.NotFoundException(`Template with ID ${id} not found`);
        }
        return template;
    }
    async createCycle(dto) {
        const cycle = new this.cycleModel(dto);
        return cycle.save();
    }
    async findAllCycles() {
        return this.cycleModel.find().exec();
    }
    async findOneCycle(id) {
        const cycle = await this.cycleModel.findById(id).exec();
        if (!cycle) {
            throw new common_1.NotFoundException(`Cycle with ID ${id} not found`);
        }
        return cycle;
    }
    async updateCycle(id, dto) {
        const cycle = await this.cycleModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        if (!cycle) {
            throw new common_1.NotFoundException(`Cycle with ID ${id} not found`);
        }
        return cycle;
    }
    async assignAppraisal(dto) {
        const assignment = new this.assignmentModel({
            ...dto,
            cycleId: new mongoose_2.Types.ObjectId(dto.cycleId),
            templateId: new mongoose_2.Types.ObjectId(dto.templateId),
            employeeProfileId: new mongoose_2.Types.ObjectId(dto.employeeProfileId),
            managerProfileId: new mongoose_2.Types.ObjectId(dto.managerProfileId),
            departmentId: new mongoose_2.Types.ObjectId(dto.departmentId),
            positionId: dto.positionId ? new mongoose_2.Types.ObjectId(dto.positionId) : undefined,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        });
        const savedAssignment = await assignment.save();
        await this.notificationService.createNotification({
            recipientId: dto.employeeProfileId,
            type: notification_schema_1.NotificationType.APPRAISAL_ASSIGNED,
            title: 'New Appraisal Assigned',
            message: 'You have been assigned a new performance appraisal.',
            relatedEntityId: savedAssignment._id.toString(),
            relatedEntityType: 'AppraisalAssignment',
            actionUrl: `/dashboard/performance/appraisals/${savedAssignment._id}/self-assessment`,
        });
        await this.notificationService.createNotification({
            recipientId: dto.managerProfileId,
            type: notification_schema_1.NotificationType.APPRAISAL_ASSIGNED,
            title: 'New Appraisal to Review',
            message: 'You have been assigned to review a new appraisal.',
            relatedEntityId: savedAssignment._id.toString(),
            relatedEntityType: 'AppraisalAssignment',
            actionUrl: `/dashboard/performance/appraisals/${savedAssignment._id}/feedback`,
        });
        return savedAssignment;
    }
    async bulkAssignAppraisals(dto) {
        const assignments = dto.employees.map(emp => ({
            cycleId: new mongoose_2.Types.ObjectId(dto.cycleId),
            templateId: new mongoose_2.Types.ObjectId(dto.templateId),
            employeeProfileId: new mongoose_2.Types.ObjectId(emp.employeeProfileId),
            managerProfileId: new mongoose_2.Types.ObjectId(emp.managerProfileId),
            departmentId: new mongoose_2.Types.ObjectId(dto.departmentId),
            positionId: emp.positionId ? new mongoose_2.Types.ObjectId(emp.positionId) : undefined,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        }));
        const savedAssignments = await this.assignmentModel.insertMany(assignments);
        savedAssignments.forEach(async (assignment) => {
            await this.notificationService.createNotification({
                recipientId: assignment.employeeProfileId.toString(),
                type: notification_schema_1.NotificationType.APPRAISAL_ASSIGNED,
                title: 'New Appraisal Assigned',
                message: 'You have been assigned a new performance appraisal.',
                relatedEntityId: assignment._id.toString(),
                relatedEntityType: 'AppraisalAssignment',
                actionUrl: `/dashboard/performance/appraisals/${assignment._id}/self-assessment`,
            });
            await this.notificationService.createNotification({
                recipientId: assignment.managerProfileId.toString(),
                type: notification_schema_1.NotificationType.APPRAISAL_ASSIGNED,
                title: 'New Appraisal to Review',
                message: 'You have been assigned to review a new appraisal.',
                relatedEntityId: assignment._id.toString(),
                relatedEntityType: 'AppraisalAssignment',
                actionUrl: `/dashboard/performance/appraisals/${assignment._id}/feedback`,
            });
        });
        return savedAssignments;
    }
    async getAppraisalByAssignmentId(assignmentId) {
        const assignment = await this.assignmentModel.findById(assignmentId)
            .populate('cycleId')
            .populate('templateId')
            .populate('employeeProfileId')
            .populate('managerProfileId')
            .exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment with ID ${assignmentId} not found`);
        }
        const record = await this.recordModel.findOne({ assignmentId: new mongoose_2.Types.ObjectId(assignmentId) }).exec();
        return { assignment, record };
    }
    async submitManagerFeedback(assignmentId, dto) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment with ID ${assignmentId} not found`);
        }
        let record = await this.recordModel.findOne({ assignmentId: new mongoose_2.Types.ObjectId(assignmentId) }).exec();
        const ratings = [];
        let totalScore = 0;
        let count = 0;
        dto.sections?.forEach(section => {
            section.criteria?.forEach(criterion => {
                ratings.push({
                    key: criterion.name,
                    title: criterion.name,
                    ratingValue: criterion.managerRating,
                    comments: criterion.managerComment,
                });
                totalScore += criterion.managerRating;
                count++;
            });
        });
        const finalScore = count > 0 ? parseFloat((totalScore / count).toFixed(2)) : 0;
        if (!record) {
            record = new this.recordModel({
                assignmentId: assignment._id,
                cycleId: assignment.cycleId,
                templateId: assignment.templateId,
                employeeProfileId: assignment.employeeProfileId,
                managerProfileId: assignment.managerProfileId,
                ratings: ratings,
                totalScore: finalScore,
                managerSummary: dto.managerFeedback,
                status: performance_enums_1.AppraisalRecordStatus.DRAFT,
            });
        }
        else {
            record.ratings = ratings;
            record.totalScore = finalScore;
            record.managerSummary = dto.managerFeedback;
        }
        record.managerSubmittedAt = new Date();
        record.status = performance_enums_1.AppraisalRecordStatus.MANAGER_SUBMITTED;
        assignment.status = performance_enums_1.AppraisalAssignmentStatus.SUBMITTED;
        assignment.submittedAt = new Date();
        await assignment.save();
        const savedRecord = await record.save();
        await this.notificationService.createNotification({
            recipientId: assignment.managerProfileId.toString(),
            type: notification_schema_1.NotificationType.SYSTEM_ALERT,
            title: 'Feedback Submitted',
            message: 'Your appraisal feedback has been submitted successfully.',
            relatedEntityId: savedRecord._id.toString(),
            relatedEntityType: 'AppraisalRecord',
            actionUrl: `/dashboard/performance/appraisals/${assignment._id}`,
        });
        return savedRecord;
    }
    async submitSelfAssessment(assignmentId, dto) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment with ID ${assignmentId} not found`);
        }
        let record = await this.recordModel.findOne({ assignmentId: new mongoose_2.Types.ObjectId(assignmentId) }).exec();
        if (!record) {
            record = new this.recordModel({
                assignmentId: assignment._id,
                cycleId: assignment.cycleId,
                templateId: assignment.templateId,
                employeeProfileId: assignment.employeeProfileId,
                managerProfileId: assignment.managerProfileId,
                status: performance_enums_1.AppraisalRecordStatus.DRAFT,
            });
        }
        record.strengths = dto.strengths;
        record.improvementAreas = dto.weaknesses;
        record.achievements = dto.achievements;
        record.goals = dto.goals;
        const savedRecord = await record.save();
        if (assignment.status === performance_enums_1.AppraisalAssignmentStatus.NOT_STARTED) {
            assignment.status = performance_enums_1.AppraisalAssignmentStatus.IN_PROGRESS;
            await assignment.save();
        }
        return savedRecord;
    }
    async finalizeAppraisal(assignmentId, employeeIdWhoPublished) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment with ID ${assignmentId} not found`);
        }
        const record = await this.recordModel.findOne({ assignmentId: new mongoose_2.Types.ObjectId(assignmentId) }).exec();
        if (!record) {
            throw new common_1.NotFoundException(`No record found for assignment ${assignmentId}`);
        }
        record.status = performance_enums_1.AppraisalRecordStatus.HR_PUBLISHED;
        record.hrPublishedAt = new Date();
        record.publishedByEmployeeId = new mongoose_2.Types.ObjectId(employeeIdWhoPublished);
        assignment.status = performance_enums_1.AppraisalAssignmentStatus.PUBLISHED;
        assignment.publishedAt = new Date();
        assignment.latestAppraisalId = record._id;
        await this.employeeModel.findByIdAndUpdate(assignment.employeeProfileId, {
            lastAppraisalRecordId: record._id,
            lastAppraisalCycleId: assignment.cycleId,
            lastAppraisalTemplateId: assignment.templateId,
            lastAppraisalDate: record.hrPublishedAt,
            lastAppraisalScore: record.totalScore,
            lastAppraisalRatingLabel: record.overallRatingLabel,
        }).exec();
        await assignment.save();
        const savedRecord = await record.save();
        await this.notificationService.createNotification({
            recipientId: assignment.employeeProfileId.toString(),
            type: notification_schema_1.NotificationType.APPRAISAL_PUBLISHED,
            title: 'Appraisal Published',
            message: `Your appraisal has been published. Final Score: ${savedRecord.totalScore}`,
            relatedEntityId: savedRecord._id.toString(),
            relatedEntityType: 'AppraisalRecord',
            actionUrl: `/dashboard/performance/history/${assignment.employeeProfileId}`,
        });
        return savedRecord;
    }
    async bulkPublishAppraisals(dto, employeeIdWhoPublished) {
        const results = [];
        for (const assignmentId of dto.assignmentIds) {
            try {
                const result = await this.finalizeAppraisal(assignmentId, employeeIdWhoPublished);
                results.push({ assignmentId, success: true, result });
            }
            catch (error) {
                results.push({ assignmentId, success: false, error: error.message });
            }
        }
        return results;
    }
    async markAppraisalAsViewed(assignmentId) {
        const record = await this.recordModel.findOne({ assignmentId: new mongoose_2.Types.ObjectId(assignmentId) }).exec();
        if (!record) {
            throw new common_1.NotFoundException(`No record found for assignment ${assignmentId}`);
        }
        record.employeeViewedAt = new Date();
        return record.save();
    }
    async acknowledgeAppraisal(assignmentId, comment) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment with ID ${assignmentId} not found`);
        }
        const record = await this.recordModel.findOne({ assignmentId: new mongoose_2.Types.ObjectId(assignmentId) }).exec();
        if (!record) {
            throw new common_1.NotFoundException(`No record found for assignment ${assignmentId}`);
        }
        record.employeeAcknowledgedAt = new Date();
        if (comment) {
            record.employeeAcknowledgementComment = comment;
        }
        assignment.status = performance_enums_1.AppraisalAssignmentStatus.ACKNOWLEDGED;
        await assignment.save();
        return record.save();
    }
    async getMyAppraisals(employeeId) {
        return this.assignmentModel.find({ employeeProfileId: new mongoose_2.Types.ObjectId(employeeId) })
            .populate('cycleId')
            .populate('templateId')
            .populate('managerProfileId')
            .exec();
    }
    async getMyPublishedAppraisals(employeeId) {
        return this.assignmentModel.find({
            employeeProfileId: new mongoose_2.Types.ObjectId(employeeId),
            status: performance_enums_1.AppraisalAssignmentStatus.PUBLISHED,
        })
            .populate('cycleId')
            .populate('templateId')
            .exec();
    }
    async getMyTeamAppraisals(managerId) {
        return this.assignmentModel.find({ managerProfileId: new mongoose_2.Types.ObjectId(managerId) })
            .populate('cycleId')
            .populate('templateId')
            .populate('employeeProfileId')
            .exec();
    }
    async raiseDispute(assignmentId, employeeId, dto) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment with ID ${assignmentId} not found`);
        }
        const record = await this.recordModel.findOne({ assignmentId: new mongoose_2.Types.ObjectId(assignmentId) }).exec();
        if (!record) {
            throw new common_1.NotFoundException(`No record found for assignment ${assignmentId}`);
        }
        const recordDoc = record;
        const publishedAt = recordDoc.publishedAt || recordDoc.hrPublishedAt;
        if (publishedAt) {
            const daysSincePublication = (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60 * 24);
            if (daysSincePublication > 7) {
                throw new common_1.BadRequestException(`Dispute window has closed. Appraisals can only be disputed within 7 days of completion. ` +
                    `This appraisal was published ${Math.floor(daysSincePublication)} days ago. (BR 31)`);
            }
        }
        const dispute = new this.disputeModel({
            appraisalId: record._id,
            assignmentId: assignment._id,
            cycleId: assignment.cycleId,
            raisedByEmployeeId: new mongoose_2.Types.ObjectId(employeeId),
            ...dto,
        });
        const savedDispute = await dispute.save();
        await this.notificationService.createNotification({
            recipientId: assignment.managerProfileId.toString(),
            type: notification_schema_1.NotificationType.APPRAISAL_DISPUTE,
            title: 'Appraisal Dispute Raised',
            message: 'An employee has raised a dispute on an appraisal you managed.',
            relatedEntityId: savedDispute._id.toString(),
            relatedEntityType: 'AppraisalDispute',
            actionUrl: `/dashboard/performance/disputes/${savedDispute._id}`,
        });
        return savedDispute;
    }
    async resolveDispute(disputeId, resolverId, dto) {
        const dispute = await this.disputeModel.findById(disputeId).exec();
        if (!dispute) {
            throw new common_1.NotFoundException(`Dispute with ID ${disputeId} not found`);
        }
        dispute.resolutionSummary = dto.resolutionSummary;
        dispute.resolvedAt = new Date();
        dispute.resolvedByEmployeeId = new mongoose_2.Types.ObjectId(resolverId);
        dispute.status = 'ADJUSTED';
        return dispute.save();
    }
    async findAllDisputes() {
        return this.disputeModel.find()
            .populate('raisedByEmployeeId')
            .populate('resolvedByEmployeeId')
            .exec();
    }
    async findOneDispute(id) {
        const dispute = await this.disputeModel.findById(id)
            .populate('raisedByEmployeeId')
            .populate('resolvedByEmployeeId')
            .exec();
        if (!dispute) {
            throw new common_1.NotFoundException(`Dispute with ID ${id} not found`);
        }
        return dispute;
    }
    async getPendingAppraisals() {
        return this.assignmentModel.find({
            status: { $in: [performance_enums_1.AppraisalAssignmentStatus.NOT_STARTED, performance_enums_1.AppraisalAssignmentStatus.IN_PROGRESS] },
        })
            .populate('employeeProfileId')
            .populate('managerProfileId')
            .exec();
    }
    async getAppraisalProgress() {
        const total = await this.assignmentModel.countDocuments().exec();
        const notStarted = await this.assignmentModel.countDocuments({ status: performance_enums_1.AppraisalAssignmentStatus.NOT_STARTED }).exec();
        const inProgress = await this.assignmentModel.countDocuments({ status: performance_enums_1.AppraisalAssignmentStatus.IN_PROGRESS }).exec();
        const submitted = await this.assignmentModel.countDocuments({ status: performance_enums_1.AppraisalAssignmentStatus.SUBMITTED }).exec();
        const published = await this.assignmentModel.countDocuments({ status: performance_enums_1.AppraisalAssignmentStatus.PUBLISHED }).exec();
        const acknowledged = await this.assignmentModel.countDocuments({ status: performance_enums_1.AppraisalAssignmentStatus.ACKNOWLEDGED }).exec();
        return {
            total,
            notStarted,
            inProgress,
            submitted,
            published,
            acknowledged,
            completionRate: total > 0 ? ((submitted + published + acknowledged) / total * 100).toFixed(2) : 0,
        };
    }
    async getEmployeeHistory(employeeId) {
        if (!mongoose_2.Types.ObjectId.isValid(employeeId)) {
            throw new common_1.BadRequestException('Invalid employee ID');
        }
        const records = await this.recordModel.find({ employeeProfileId: new mongoose_2.Types.ObjectId(employeeId) })
            .populate('cycleId')
            .populate('templateId')
            .sort({ hrPublishedAt: -1 })
            .exec();
        return {
            employeeId,
            totalAppraisals: records.length,
            appraisals: records,
        };
    }
    async getMyHistory(employeeId) {
        return this.getEmployeeHistory(employeeId);
    }
    async getCycleReport(cycleId) {
        const assignments = await this.assignmentModel.find({ cycleId: new mongoose_2.Types.ObjectId(cycleId) })
            .populate('employeeProfileId')
            .populate('departmentId')
            .exec();
        const records = await this.recordModel.find({ cycleId: new mongoose_2.Types.ObjectId(cycleId) }).exec();
        return {
            cycleId,
            totalAssignments: assignments.length,
            totalCompleted: records.length,
            assignments,
            records,
        };
    }
};
exports.PerformanceService = PerformanceService;
exports.PerformanceService = PerformanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appraisal_template_schema_1.AppraisalTemplate.name)),
    __param(1, (0, mongoose_1.InjectModel)(appraisal_cycle_schema_1.AppraisalCycle.name)),
    __param(2, (0, mongoose_1.InjectModel)(appraisal_assignment_schema_1.AppraisalAssignment.name)),
    __param(3, (0, mongoose_1.InjectModel)(appraisal_record_schema_1.AppraisalRecord.name)),
    __param(4, (0, mongoose_1.InjectModel)(appraisal_dispute_schema_1.AppraisalDispute.name)),
    __param(5, (0, mongoose_1.InjectModel)('EmployeeProfile')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notification_service_1.NotificationService])
], PerformanceService);
//# sourceMappingURL=performance.service.js.map