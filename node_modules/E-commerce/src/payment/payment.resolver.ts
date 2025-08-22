// src/payment/payment.resolver.ts
import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { CreateOrderInput } from './dto/create-payment.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Order } from './entities/payment.entity';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async createOrder(
    @Context() context,
    @Args('input') input: CreateOrderInput,
  ): Promise<string> {
    const userId: string | null = context.req.user.id;
    return this.paymentService.createOrder(userId, input.amount, input.currency);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Order)
  async confirmOrder(
    @Context() context,
    @Args('razorpayOrderId') razorpayOrderId: string,
    @Args('razorpayPaymentId') razorpayPaymentId: string,
    @Args('signature') signature: string,
  ) {
    const userId: string = context.req.user.id;
    return this.paymentService.confirmOrder(userId, razorpayOrderId, razorpayPaymentId, signature);
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [Order]) // ✅ specify return type
  async myOrders(@Context() context): Promise<Order[]> {
    const userId: string = context.req.user.id;
    return this.paymentService.getOrdersByUserId(userId);
  }
  

}
