import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async notifyAllUsers(
    title: string,
    message: string,
    sendEmail = false,
    expiresAt?: Date,
    type?: string,
  ) {
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
    } catch (error) {
      throw new InternalServerErrorException('Failed to notify all users');
    }
  }

  async getUserNotifications(userId: string) {
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
    } catch {
      throw new InternalServerErrorException('Failed to fetch notifications');
    }
  }

  async markAsRead(notificationId: string, userId: string) {
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
    } catch {
      throw new InternalServerErrorException('Failed to mark as read');
    }
  }
}
