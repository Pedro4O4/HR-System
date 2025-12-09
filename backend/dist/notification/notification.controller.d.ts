import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getNotifications(req: any, page?: string, limit?: string, onlyUnread?: string): Promise<{
        data: import("./models/notification.schema").Notification[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        unreadCount: number;
    }>;
    markAsRead(id: string): Promise<import("./models/notification.schema").Notification>;
    markAllAsRead(req: any): Promise<{
        modifiedCount: number;
    }>;
    deleteNotification(id: string): Promise<{
        message: string;
    }>;
}
