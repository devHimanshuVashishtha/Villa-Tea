import { Module } from '@nestjs/common';
import { CoupounService } from './coupoun.service';
import { PrismaService } from 'src/prisma.service';
import { CoupounResolver } from './coupoun.resolver';

@Module({
  providers: [CoupounResolver, CoupounService,PrismaService],
})
export class CoupounModule {}
