import { HydratedDocument, Types } from 'mongoose';
export type NotificationDocument = HydratedDocument<Notification>;
export declare enum NotificationType {
    STATUS_CHANGE = "STATUS_CHANGE",
    ROLE_ASSIGNED = "ROLE_ASSIGNED",
    REQUEST_APPROVED = "REQUEST_APPROVED",
    REQUEST_REJECTED = "REQUEST_REJECTED",
    EMPLOYEE_CREATED = "EMPLOYEE_CREATED",
    CANDIDATE_STATUS_CHANGED = "CANDIDATE_STATUS_CHANGED",
    SYSTEM_ALERT = "SYSTEM_ALERT",
    APPRAISAL_ASSIGNED = "APPRAISAL_ASSIGNED",
    APPRAISAL_PUBLISHED = "APPRAISAL_PUBLISHED",
    APPRAISAL_DISPUTE = "APPRAISAL_DISPUTE",
    STRUCTURE_CHANGE = "STRUCTURE_CHANGE",
    STRUCTURE_REQUEST = "STRUCTURE_REQUEST"
}
export declare class Notification {
    recipientId: Types.ObjectId;
    type: NotificationType;
    title: string;
    message: string;
    relatedEntityType?: string;
    relatedEntityId?: Types.ObjectId;
    actionUrl?: string;
    isRead: boolean;
    readAt?: Date;
}
export declare const NotificationSchema: import("mongoose").Schema<Notification, import("mongoose").Model<Notification, any, any, any, import("mongoose").Document<unknown, any, Notification, any, {}> & Notification & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Notification, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Notification>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Notification> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
