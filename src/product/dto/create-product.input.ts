import { InputType, Float, Field } from '@nestjs/graphql';

@InputType()
export class CreateVariantInput {
  @Field()
  size: string;

  @Field(() => Float)
  price: number;
}

@InputType()
export class CreateProductInput {
  @Field()
  image:string;
  
  @Field()
  name: string;

  @Field()
  collection: string;

  @Field()
  flavour: string;

  @Field()
  origin: string;

  @Field(()=>[String])
  qualities: string[];

  @Field()
  caffeine: string;

  @Field(()=>[String])
  allegens: string[];

  @Field()
  isOrganic: boolean;

  @Field()
  isVegan: boolean;

  @Field(() => [CreateVariantInput])
  variants: CreateVariantInput[];
}
@InputType()
export class ProductFilterInput {
  @Field(() => String, { nullable: true })
  collection?: string;

  @Field(() => String, { nullable: true })
  flavour?: string;

  @Field(() => String, { nullable: true })
  origin?: string;

  @Field(() => [String], { nullable: true })
  qualities?: string[];

  @Field(() => String, { nullable: true })
  caffeine?: string;

  @Field(() => [String], { nullable: true })
  allegens?: string[];

  @Field(() => Boolean, { nullable: true })
  isOrganic?: boolean;

  @Field(() => Boolean, { nullable: true })
  isVegan?: boolean;
  
  @Field({ nullable: true })
   sortBy?: 'AZ' | 'ZA' | 'PRICE_LOW_HIGH' | 'PRICE_HIGH_LOW';
}

