import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateOrderInput } from './create-payment.input';

@InputType()
export class UpdatePaymentInput extends PartialType(CreateOrderInput) {
  @Field(() => Int)
  id: number;
}
