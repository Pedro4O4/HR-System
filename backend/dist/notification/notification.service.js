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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("./models/notification.schema");
let NotificationService = class NotificationService {
    notificationModel;
    constructor(notificationModel) {
        this.notificationModel = notificationModel;
    }
    async createNotification(createDto) {
        const notification = new this.notificationModel({
            recipientId: new mongoose_2.Types.ObjectId(createDto.recipientId),
            type: createDto.type,
            title: createDto.title,
            message: createDto.message,
            relatedEntityType: createDto.relatedEntityType,
            relatedEntityId: createDto.relatedEntityId
                ? new mongoose_2.Types.ObjectId(createDto.relatedEntityId)
                : undefined,
            isRead: false,
        });
        return notification.save();
    }
    async getNotifications(userId, page = 1, limit = 10, onlyUnread = false) {
        const filter = { recipientId: new mongoose_2.Types.ObjectId(userId) };
        if (onlyUnread) {
            filter.isRead = false;
        }
        const skip = (page - 1) * limit;
        const [data, total, unreadCount] = await Promise.all([
            this.notificationModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.notificationModel.countDocuments(filter).exec(),
            this.notificationModel.countDocuments({
                recipientId: new mongoose_2.Types.ObjectId(userId),
                isRead: false
            }).exec(),
        ]);
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            unreadCount,
        };
    }
    async markAsRead(notificationId) {
        const notification = await this.notificationModel.findByIdAndUpdate(notificationId, { isRead: true, readAt: new Date() }, { new: true }).exec();
        if (!notification) {
            throw new common_1.NotFoundException(`Notification with ID ${notificationId} not found`);
        }
        return notification;
    }
    async markAllAsRead(userId) {
        const result = await this.notificationModel.updateMany({ recipientId: new mongoose_2.Types.ObjectId(userId), isRead: false }, { isRead: true, readAt: new Date() }).exec();
        return { modifiedCount: result.modifiedCount };
    }
    async deleteNotification(notificationId) {
        const result = await this.notificationModel.findByIdAndDelete(notificationId).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Notification with ID ${notificationId} not found`);
        }
    }
    async notifyStatusChange(employeeId, oldStatus, newStatus) {
        await this.createNotification({
            recipientId: employeeId,
            type: notification_schema_1.NotificationType.STATUS_CHANGE,
            title: 'Status Changed',
            message: `Your employment status has been changed from ${oldStatus} to ${newStatus}`,
            relatedEntityType: 'EmployeeProfile',
            relatedEntityId: employeeId,
        });
    }
    async notifyRoleAssigned(employeeId, roles) {
        await this.createNotification({
            recipientId: employeeId,
            type: notification_schema_1.NotificationType.ROLE_ASSIGNED,
            title: 'Roles Updated',
            message: `Your system roles have been updated: ${roles.join(', ')}`,
            relatedEntityType: 'EmployeeSystemRole',
            relatedEntityId: employeeId,
        });
    }
    async notifyRequestApproved(employeeId, requestId, requestType) {
        await this.createNotification({
            recipientId: employeeId,
            type: notification_schema_1.NotificationType.REQUEST_APPROVED,
            title: 'Request Approved',
            message: `Your ${requestType} request has been approved`,
            relatedEntityType: 'ChangeRequest',
            relatedEntityId: requestId,
        });
    }
    async notifyRequestRejected(employeeId, requestId, requestType) {
        await this.createNotification({
            recipientId: employeeId,
            type: notification_schema_1.NotificationType.REQUEST_REJECTED,
            title: 'Request Rejected',
            message: `Your ${requestType} request has been rejected`,
            relatedEntityType: 'ChangeRequest',
            relatedEntityId: requestId,
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotificationService);
//# sourceMappingURL=notification.service.js.map