import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ChatService } from './chat.service';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => String)
  getAnswerFromChat(
    @Args('query') query: string,
    @Args('imageUrl', { nullable: true }) imageUrl?: string,
  ): Promise<string> {
    return this.chatService.chat(query, imageUrl);
  }
}
