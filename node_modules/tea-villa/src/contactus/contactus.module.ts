import { Module } from '@nestjs/common';
import { ContactusService } from './contactus.service';
import { ContactusResolver } from './contactus.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ContactusResolver, ContactusService,PrismaService],
})
export class ContactusModule {}
