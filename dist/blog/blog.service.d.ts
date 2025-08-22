import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { PrismaService } from 'src/prisma.service';
export declare class BlogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createBlogInput: CreateBlogInput): Promise<{
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
    findAll(): Promise<({
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
    findOne(id: string): Promise<{
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
    update(id: string, updateBlogInput: UpdateBlogInput): Promise<{
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
    remove(id: string): Promise<{
        id: string;
        image: string;
        heading: string;
    }>;
}
