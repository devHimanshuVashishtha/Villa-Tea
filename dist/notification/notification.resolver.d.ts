import { NotificationService } from './notification.service';
import { CreateNotificationInput } from './dto/create-notification.input';
export declare class NotificationResolver {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    myNotifications(context: any): Promise<{
        id: string;
        title: string;
        message: string;
        type: string | null;
        expiresAt: Date | null;
        createdAt: Date;
        read: boolean;
    }[]>;
    markNotificationAsRead(notificationId: string, context: any): Promise<boolean>;
    notifyAllUsers(input: CreateNotificationInput): Promise<boolean>;
}
