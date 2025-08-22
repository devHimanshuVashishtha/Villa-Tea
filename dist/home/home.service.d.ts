import { CreateHomeInput } from './dto/create-home.input';
import { PrismaService } from 'src/prisma.service';
export declare class HomeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createHomeInput: CreateHomeInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string;
        heading: string;
    }>;
    findAll(): Promise<({
        paragraphs: {
            id: string;
            text: string;
            contentId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string;
        heading: string;
    })[]>;
    findOne(id: string): Promise<{
        paragraphs: {
            id: string;
            text: string;
            contentId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string;
        heading: string;
    }>;
}
