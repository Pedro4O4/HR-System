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
exports.NotificationSchema = exports.Notification = exports.NotificationType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var NotificationType;
(function (NotificationType) {
    NotificationType["STATUS_CHANGE"] = "STATUS_CHANGE";
    NotificationType["ROLE_ASSIGNED"] = "ROLE_ASSIGNED";
    NotificationType["REQUEST_APPROVED"] = "REQUEST_APPROVED";
    NotificationType["REQUEST_REJECTED"] = "REQUEST_REJECTED";
    NotificationType["EMPLOYEE_CREATED"] = "EMPLOYEE_CREATED";
    NotificationType["CANDIDATE_STATUS_CHANGED"] = "CANDIDATE_STATUS_CHANGED";
    NotificationType["SYSTEM_ALERT"] = "SYSTEM_ALERT";
    NotificationType["APPRAISAL_ASSIGNED"] = "APPRAISAL_ASSIGNED";
    NotificationType["APPRAISAL_PUBLISHED"] = "APPRAISAL_PUBLISHED";
    NotificationType["APPRAISAL_DISPUTE"] = "APPRAISAL_DISPUTE";
    NotificationType["STRUCTURE_CHANGE"] = "STRUCTURE_CHANGE";
    NotificationType["STRUCTURE_REQUEST"] = "STRUCTURE_REQUEST";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
let Notification = class Notification {
    recipientId;
    type;
    title;
    message;
    relatedEntityType;
    relatedEntityId;
    actionUrl;
    isRead;
    readAt;
};
exports.Notification = Notification;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'EmployeeProfile', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Notification.prototype, "recipientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(NotificationType),
        required: true,
    }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Notification.prototype, "relatedEntityType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Notification.prototype, "relatedEntityId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Notification.prototype, "actionUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isRead", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Notification.prototype, "readAt", void 0);
exports.Notification = Notification = __decorate([
    (0, mongoose_1.Schema)({ collection: 'notifications', timestamps: true })
], Notification);
exports.NotificationSchema = mongoose_1.SchemaFactory.createForClass(Notification);
//# sourceMappingURL=notification.schema.js.map