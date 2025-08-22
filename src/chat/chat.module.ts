import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ChatResolver, ChatService,PrismaService],
})
export class ChatModule {}
