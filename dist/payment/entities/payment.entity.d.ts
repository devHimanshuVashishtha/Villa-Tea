import { Variant } from 'src/product/entities/product.entity';
export declare class Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: string;
    paymentId: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Payment {
    id: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
    userId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OrderItem {
    id: string;
    orderId: string;
    variant: Variant;
    variantId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}
