// src/notification/dto/notify-users.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field()
  title: string;

  @Field()
  message: string;

  @Field({ defaultValue: false })
  sendEmail?: boolean;

  @Field({ nullable: true })
  expiresAt?: Date;

  @Field({ nullable: true })
  type?: string; 
}
