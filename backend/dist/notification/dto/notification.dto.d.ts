import { NotificationType } from '../models/notification.schema';
export declare class CreateNotificationDto {
    recipientId: string;
    type: NotificationType;
    title: string;
    message: string;
    relatedEntityType?: string;
    relatedEntityId?: string;
    actionUrl?: string;
}
export declare class MarkAsReadDto {
    notificationId: string;
}
