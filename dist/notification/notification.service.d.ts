import { PrismaService } from 'src/prisma.service';
import { MailService } from 'src/mail/mail.service';
export declare class NotificationService {
    private prisma;
    private mailService;
    constructor(prisma: PrismaService, mailService: MailService);
    notifyAllUsers(title: string, message: string, sendEmail?: boolean, expiresAt?: Date, type?: string): Promise<void>;
    getUserNotifications(userId: string): Promise<{
        id: string;
        title: string;
        message: string;
        type: string | null;
        expiresAt: Date | null;
        createdAt: Date;
        read: boolean;
    }[]>;
    markAsRead(notificationId: string, userId: string): Promise<import("generated/prisma").Prisma.BatchPayload>;
}
