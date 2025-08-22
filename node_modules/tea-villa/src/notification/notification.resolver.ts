import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { NotificationModel } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';

@Resolver(() => NotificationModel)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [NotificationModel])
  async myNotifications(@Context() context:any) {
    const userId=context.req.user.id;
    return this.notificationService.getUserNotifications(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async markNotificationAsRead(
    @Args('notificationId') notificationId: string,
    @Context() context: any,
  ) {
    const userId=context.req.user.id;
    await this.notificationService.markAsRead(notificationId, userId);
    return true;
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Boolean)
  async notifyAllUsers(
    @Args('input') input: CreateNotificationInput,
  ): Promise<boolean> {
    const { title, message, sendEmail, expiresAt, type } = input;
    await this.notificationService.notifyAllUsers(title, message, sendEmail, expiresAt, type);
    return true;
  }
}
