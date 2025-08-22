import { CreateBlogInput, CreateBlogParagraphInput } from './create-blog.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
  @Field()
  id: string;
}
@InputType()
export class UploadBlogParagraphInput extends PartialType(CreateBlogParagraphInput){
  @Field()
  id:string
  
}
