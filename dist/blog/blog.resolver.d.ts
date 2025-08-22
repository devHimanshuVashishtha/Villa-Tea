import { BlogService } from './blog.service';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
export declare class BlogResolver {
    private readonly blogService;
    constructor(blogService: BlogService);
    createBlog(createBlogInput: CreateBlogInput): Promise<{
        paragraphs: {
            id: string;
            text: string;
            blogId: string;
        }[];
    } & {
        id: string;
        image: string;
        heading: string;
    }>;
    findAllBlog(): Promise<({
        paragraphs: {
            id: string;
            text: string;
            blogId: string;
        }[];
    } & {
        id: string;
        image: string;
        heading: string;
    })[]>;
    findOneBlog(id: string): Promise<{
        paragraphs: {
            id: string;
            text: string;
            blogId: string;
        }[];
    } & {
        id: string;
        image: string;
        heading: string;
    }>;
    updateBlog(updateBlogInput: UpdateBlogInput): Promise<{
        paragraphs: {
            id: string;
            text: string;
            blogId: string;
        }[];
    } & {
        id: string;
        image: string;
        heading: string;
    }>;
    removeBlog(id: string): Promise<{
        id: string;
        image: string;
        heading: string;
    }>;
}
