import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateParagraphInput {
  @Field()
  text: string;
}

@InputType()
export class CreateHomeInput {
  @Field()
  image: string;

  @Field()
  heading: string;

  @Field(() => [CreateParagraphInput])
  paragraphs: CreateParagraphInput[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
