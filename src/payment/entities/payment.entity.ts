// src/order/models/order.model.ts
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { Variant } from 'src/product/entities/product.entity';

@ObjectType()
export class Order {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => [OrderItem])
  items: OrderItem[];

  @Field(() => Float)
  total: number;

  @Field(() => String)
  status: string; // pending, paid, shipped, delivered, etc.

  @Field({ nullable: true })
  paymentId: string; // Payment info associated with the order

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
@ObjectType()
export class Payment {
  @Field(() => String)
  id: string;

  @Field(() => String)
  razorpayOrderId: string;

  @Field(() => String, { nullable: true })
  razorpayPaymentId?: string;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  currency: string;

  @Field(() => String)
  receipt: string;

  @Field(() => String)
  status: string; // Status could be 'paid', 'pending', etc.

  @Field(() => String, { nullable: true })
  userId?: string; // Optional, if payment is linked to a user

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
@ObjectType()
export class OrderItem {
  @Field(() => String)
  id: string;

  @Field(() => String)
  orderId: string; // Reference to the Order

  @Field(() => Variant) // The variant of the product (e.g., color, size)
  variant: Variant;

  @Field(() => String)
  variantId: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
