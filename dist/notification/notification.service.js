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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const mail_service_1 = require("../mail/mail.service");
let NotificationService = class NotificationService {
    prisma;
    mailService;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async notifyAllUsers(title, message, sendEmail = false, expiresAt, type) {
        try {
            const notification = await this.prisma.notification.create({
                data: { title, message, expiresAt, type },
            });
            const users = await this.prisma.user.findMany({
                select: { id: true, email: true },
            });
            await this.prisma.userNotification.createMany({
                data: users.map((user) => ({
                    userId: user.id,
                    notificationId: notification.id,
                })),
            });
            if (sendEmail) {
                for (const user of users) {
                    if (user.email) {
                        await this.mailService.sendSaleEmail(user.email, title, `<p>${message}</p>`);
                    }
                }
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to notify all users');
        }
    }
    async getUserNotifications(userId) {
        try {
            const userNotifications = await this.prisma.userNotification.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                include: {
                    notification: true,
                },
            });
            return userNotifications.map((u) => ({
                id: u.notification.id,
                title: u.notification.title,
                message: u.notification.message,
                type: u.notification.type,
                expiresAt: u.notification.expiresAt,
                createdAt: u.createdAt,
                read: u.read,
            }));
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to fetch notifications');
        }
    }
    async markAsRead(notificationId, userId) {
        try {
            return await this.prisma.userNotification.updateMany({
                where: {
                    notificationId,
                    userId,
                },
                data: {
                    read: true,
                },
            });
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to mark as read');
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map