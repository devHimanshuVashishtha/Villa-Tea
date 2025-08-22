import { PrismaService } from 'src/prisma.service';
export declare class ChatService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    chat(query: string, imageUrl?: string): Promise<string>;
    analyzeImageWithDeepInfra(imageUrl: string, prompt: string): Promise<string>;
    private callDeepSeekAPI;
}
