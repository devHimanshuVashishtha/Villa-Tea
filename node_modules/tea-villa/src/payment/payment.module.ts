import { Global, Module } from '@nestjs/common';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PaymentResolver, PaymentService,PrismaService],
  exports:[PaymentService]
})
export class PaymentModule {}
