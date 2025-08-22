import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class ApplyCouponInput {
  @Field()
  couponCode: string;

  @Field(() => Float)
  cartTotal: number;

  @Field(() => [String],{nullable:true})
  productIds?: string[];

  @Field(() => [String],{nullable:true})
  variantIds?: string[];
}
