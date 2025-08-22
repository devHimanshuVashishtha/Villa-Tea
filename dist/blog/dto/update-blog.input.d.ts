import { CreateBlogInput, CreateBlogParagraphInput } from './create-blog.input';
declare const UpdateBlogInput_base: import("@nestjs/common").Type<Partial<CreateBlogInput>>;
export declare class UpdateBlogInput extends UpdateBlogInput_base {
    id: string;
}
declare const UploadBlogParagraphInput_base: import("@nestjs/common").Type<Partial<CreateBlogParagraphInput>>;
export declare class UploadBlogParagraphInput extends UploadBlogParagraphInput_base {
    id: string;
}
export {};
