import { ChatService } from './chat.service';
export declare class ChatResolver {
    private readonly chatService;
    constructor(chatService: ChatService);
    getAnswerFromChat(query: string, imageUrl?: string): Promise<string>;
}
