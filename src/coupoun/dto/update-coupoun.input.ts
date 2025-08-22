import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCouponInput } from './create-coupoun.input';

@InputType()
export class UpdateCoupounInput extends PartialType(CreateCouponInput) {
  @Field(() => Int)
  id: number;
}
