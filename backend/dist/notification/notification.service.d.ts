import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './models/notification.schema';
import { CreateNotificationDto } from './dto/notification.dto';
export declare class NotificationService {
    private notificationModel;
    constructor(notificationModel: Model<NotificationDocument>);
    createNotification(createDto: CreateNotificationDto): Promise<Notification>;
    getNotifications(userId: string, page?: number, limit?: number, onlyUnread?: boolean): Promise<{
        data: Notification[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        unreadCount: number;
    }>;
    markAsRead(notificationId: string): Promise<Notification>;
    markAllAsRead(userId: string): Promise<{
        modifiedCount: number;
    }>;
    deleteNotification(notificationId: string): Promise<void>;
    notifyStatusChange(employeeId: string, oldStatus: string, newStatus: string): Promise<void>;
    notifyRoleAssigned(employeeId: string, roles: string[]): Promise<void>;
    notifyRequestApproved(employeeId: string, requestId: string, requestType: string): Promise<void>;
    notifyRequestRejected(employeeId: string, requestId: string, requestType: string): Promise<void>;
}
