import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class CreateCartInput {
 

  @Field(() => String, { nullable:true })
  cartId?: string;

  @Field(()=>String)
  variantId: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  quantity: number;
}
