import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingResolver } from './rating.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [RatingResolver, RatingService,PrismaService],
})
export class RatingModule {}
