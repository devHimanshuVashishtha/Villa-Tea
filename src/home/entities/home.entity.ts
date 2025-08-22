import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Home {
  @Field()
  id: string;

  @Field()
  image: string;

  @Field()
  heading: string;

  @Field(() => [Paragraph])
  paragraphs: Paragraph[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class Paragraph {
  @Field()
  id: string;

  @Field()
  text: string;
}