import { PrismaService } from 'src/prisma.service';
import { Order } from './entities/payment.entity';
import { ConfigService } from '@nestjs/config';
export declare class PaymentService {
    private configService;
    private readonly prisma;
    private razorpay;
    constructor(configService: ConfigService, prisma: PrismaService);
    createOrder(userId: string | null, amount: number, currency?: string): Promise<any>;
    confirmOrder(userId: string, razorpayOrderId: string, razorpayPaymentId: string, signature: string): Promise<{
        id: string;
        total: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        paymentId: string;
        userId: string;
    }>;
    getOrdersByUserId(userId: string): Promise<Order[]>;
}
