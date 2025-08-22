// src/coupon/dto/create-coupon.input.ts
import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateCouponInput {
  @Field()
  code: string;

  @Field(() => Int)
  discount: number;

  @Field()
  type: 'percentage' | 'fixed';

  @Field(() => Float, { nullable: true })
  minimumAmount?: number;

  @Field({ nullable: true })
  size?: string;

  @Field(() => Boolean, { defaultValue: false })
  appliesToAll: boolean;

  @Field()
  expiresAt: Date;

  @Field(() => [String], { nullable: true })
  productIds?: string[];

  @Field(() => [String], { nullable: true })
  variantIds?: string[];
}
