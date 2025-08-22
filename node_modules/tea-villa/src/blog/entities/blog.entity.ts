import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Blog {
  @Field()
  id: string;
  @Field()
  heading:string;
  @Field()
  image:string;
  @Field(()=>[BlogParagraph])
  paragraphs:BlogParagraph[]
  
}
@ObjectType()
export class BlogParagraph{
  @Field()
  id: string;
  @Field()
  text:string;
}


