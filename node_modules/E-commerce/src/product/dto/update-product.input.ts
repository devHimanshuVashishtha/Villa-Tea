import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { CreateProductInput, CreateVariantInput } from './create-product.input';

@InputType()
export class UpdateProductVariantInput extends PartialType(CreateVariantInput) {
  @Field()
  id: string;
}

@InputType()
export class UpdateProductInput extends PartialType(OmitType(CreateProductInput, ['variants'] as const)) {
  @Field()
  id: string;

  @Field(() => [UpdateProductVariantInput], { nullable: true })
  variants?: UpdateProductVariantInput[];
}
