import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeResolver } from './home.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [HomeResolver, HomeService,PrismaService],
})
export class HomeModule {}
