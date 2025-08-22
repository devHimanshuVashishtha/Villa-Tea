import { HomeService } from './home.service';
import { CreateHomeInput } from './dto/create-home.input';
export declare class HomeResolver {
    private readonly homeService;
    constructor(homeService: HomeService);
    createHomePage(createHomeInput: CreateHomeInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string;
        heading: string;
    }>;
    findAllHomePage(): Promise<({
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
    findOneHomePage(id: string): Promise<{
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
