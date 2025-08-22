import { PrismaService } from 'src/prisma.service';
import { Order } from './entities/payment.entity';
export declare class PaymentService {
    private readonly prisma;
    private razorpay;
    constructor(prisma: PrismaService);
    createOrder(userId: string | null, amount: number, currency?: string): Promise<any>;
    confirmOrder(userId: string, razorpayOrderId: string, razorpayPaymentId: string, signature: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        status: string;
        paymentId: string;
    }>;
    getOrdersByUserId(userId: string): Promise<Order[]>;
}
