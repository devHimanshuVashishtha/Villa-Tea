import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Rating {
  @Field()
  id: string;

  @Field()
  rating: number;

  @Field({ nullable: true })
  review?: string;

  @Field()
  userId: string;

  @Field()
  productId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
