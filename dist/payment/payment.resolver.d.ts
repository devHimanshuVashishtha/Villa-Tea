import { PaymentService } from './payment.service';
import { CreateOrderInput } from './dto/create-payment.input';
import { Order } from './entities/payment.entity';
export declare class PaymentResolver {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createOrder(context: any, input: CreateOrderInput): Promise<string>;
    confirmOrder(context: any, razorpayOrderId: string, razorpayPaymentId: string, signature: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        status: string;
        paymentId: string;
    }>;
    myOrders(context: any): Promise<Order[]>;
}
