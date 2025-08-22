import { CreateHomeInput, CreateParagraphInput } from './create-home.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHomeInput extends PartialType(CreateHomeInput) {
  @Field()
  id: string;
}

@InputType()
export class UpdateParagraphInput extends PartialType(CreateParagraphInput) {
  @Field()
  id: string;
}
