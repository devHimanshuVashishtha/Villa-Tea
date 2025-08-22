import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Variant {
  @Field()
  id: string;

  @Field()
  size: string;

  @Field(() => Float)
  price: number;
}

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  collection: string;

  @Field()
  flavour: string;

  @Field()
  origin: string;

  @Field(() => [String]) // Corrected this line
  qualities: string[];

  @Field()
  caffeine: string;

  @Field(() => [String]) // You might want to use this for allergens too
  allegens: string[];

  @Field()
  isOrganic: boolean;

  @Field()
  isVegan: boolean;

  @Field(() => [Variant])
  variants: Variant[];
}
