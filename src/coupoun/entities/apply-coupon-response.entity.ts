// src/coupon/dto/apply-coupon-response.dto.ts
import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ApplyCouponResponse {
  @Field()
  valid: boolean;

  @Field()
  message: string;

  @Field(() => Float, { nullable: true })
  discountAmount?: number;

  @Field(() => Float, { nullable: true })
  finalAmount?: number;
}
