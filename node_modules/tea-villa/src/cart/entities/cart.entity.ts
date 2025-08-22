import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Cart {
  @Field( { description: 'Unique identifier for the cart' })
  id: string;

  @Field(() => Int, { nullable:true })
  userId?: number;

  @Field(() => [CartItem], { description: 'List of items in the cart' })
  items: CartItem[];

  @Field(() => Date, { description: 'When the cart was created' })
  createdAt: Date;

  @Field(() => Date, { description: 'When the cart was last updated' })
  updatedAt: Date;
}

@ObjectType()
export class CartItem {
  @Field( { description: 'Unique identifier for the cart item' })
  id: string;

  @Field(() => String, { description: 'ID of the variant being added to the cart' })
  variantId: string;

  @Field(() => Int, { description: 'Quantity of the product variant' })
  quantity: number;

 
}
