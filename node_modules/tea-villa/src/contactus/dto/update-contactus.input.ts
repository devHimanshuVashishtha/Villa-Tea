import { CreateContactusInput } from './create-contactus.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContactusInput extends PartialType(CreateContactusInput) {
  @Field()
  id: string;
}
