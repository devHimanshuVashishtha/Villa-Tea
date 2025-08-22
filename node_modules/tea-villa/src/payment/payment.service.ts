import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import Razorpay = require('razorpay');
import * as crypto from 'crypto';
import { Order } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  private razorpay: any;

  constructor(private readonly prisma: PrismaService) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  // Create a Razorpay Order
  async createOrder(userId: string | null, amount: number, currency = 'INR') {
    const options = {
      amount: amount * 100, // Convert rupees to paise
      currency,
      receipt: `receipt_order_${Date.now()}`,
    };

    try {
      const order = await this.razorpay.orders.create(options);

      if (!order || !order.id) {
        throw new InternalServerErrorException('Razorpay order creation failed');
      }

      const payment = await this.prisma.payment.create({
        data: {
          razorpayOrderId: order.id,
          razorpayPaymentId: null,
          amount: order.amount / 100,
          currency: order.currency,
          receipt: order.receipt,
          status: 'created',
          userId: userId || null,
        },
      });

      return order.id;
    } catch (error) {
      throw new InternalServerErrorException('Could not create Razorpay order: ' + error.message);
    }
  }

  // Confirm the Razorpay order after payment
  async confirmOrder(
    userId: string,
    razorpayOrderId: string,
    razorpayPaymentId: string,
    signature: string,
  ) {
    try {
      const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
      if (!RAZORPAY_KEY_SECRET) {
        throw new BadRequestException('Invalid Razorpay secret key');
      }

      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(razorpayOrderId + '|' + razorpayPaymentId)
        .digest('hex');

      if (expectedSignature !== signature) {
        throw new BadRequestException('Payment signature verification failed');
      }

      // Update payment status
      const payment = await this.prisma.payment.update({
        where: { razorpayOrderId },
        data: {
          status: 'paid',
          razorpayPaymentId,
        },
      });

      // Get user's cart
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
        include: {
          items: { include: { variant: true } },
        },
      });

      if (!cart) {
        throw new NotFoundException('Cart not found for user');
      }

      if (cart.items.length === 0) {
        throw new BadRequestException('Cart is empty');
      }

      // Calculate total from cart items
      const total = cart.items.reduce(
        (sum, item) => sum + item.variant.price * item.quantity,
        0,
      );

      // Create order with payment link
      const order = await this.prisma.order.create({
        data: {
          userId,
          total,
          status: 'paid',
          paymentId: payment.id,
          items: {
            create: cart.items.map((item) => ({
              variantId: item.variantId,
              quantity: item.quantity,
            })),
          },
        },
      });

      // Clear cart items
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return order;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Could not confirm the payment: ' + error.message);
    }
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      return await this.prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              variant: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch orders: ' + error.message);
    }
  }
}
