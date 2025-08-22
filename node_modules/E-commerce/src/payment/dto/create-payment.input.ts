// src/payment/dto/create-order.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  amount: number;

  @Field(() => String, { defaultValue: 'INR' })
  currency?: string;
}
