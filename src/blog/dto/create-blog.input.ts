import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBlogInput {
  @Field()
  heading:string
 
  @Field()
  image: string;

  @Field(() => [CreateBlogParagraphInput])
  paragraphs: CreateBlogParagraphInput[];
}

@InputType()
export class CreateBlogParagraphInput {

  @Field()
  text: string;
}
