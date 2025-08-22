import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Wishlist {
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: string;
  productId:string;
  userId:string;
}
