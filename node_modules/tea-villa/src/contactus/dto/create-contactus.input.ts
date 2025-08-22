import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactusInput {
  @Field()
  name:string;
  @Field()
  phone:string;
  @Field()
  email:string;
  @Field()
  message:string;
}
