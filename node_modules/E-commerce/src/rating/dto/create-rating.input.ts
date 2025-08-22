import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateRatingInput {
  @Field()
  productId: string;

  @Field()
  rating: number;

  @Field({ nullable: true })
  review?: string;
}
