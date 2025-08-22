export declare class NotificationModel {
    id: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
    expiresAt?: Date;
    type?: string;
}
