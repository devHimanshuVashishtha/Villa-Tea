import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCartInput } from './dto/create-cart.input';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addToCart(userId: string | null, createCartInput: CreateCartInput) {
    try {
      let { cartId, variantId, quantity } = createCartInput;
      let cart;

      if (cartId) {
        cart = await this.prisma.cart.findUnique({
          where: { id: cartId },
          include: { items: true },
        });

        if (!cart) {
          throw new BadRequestException('Cart not found');
        }

        if (userId && !cart.userId) {
          cart = await this.prisma.cart.update({
            where: { id: cart.id },
            data: { user: { connect: { id: userId } } },
            include: { items: true },
          });
        }
      } else {
        cart = await this.prisma.cart.create({
          data: userId ? { user: { connect: { id: userId } } } : {},
          include: { items: true },
        });
      }

      const existingItem = cart.items.find(item => item.variantId === variantId);

      if (existingItem) {
        await this.prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity },
        });
      } else {
        await this.prisma.cartItem.create({
          data: {
            cart: { connect: { id: cart.id } },
            variant: { connect: { id: variantId } },
            quantity,
          },
        });
      }

      const totalPrice = await this.calculateTotalPrice(cart.id);
      const cartDetail = await this.getCartById(cart.id);
      return { cartId: cart.id, cart: cartDetail, totalPrice };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Failed to add item to cart');
    }
  }

  async mergeCarts(userId: string, guestCartId: string) {
    try {
      const guestCart = await this.prisma.cart.findUnique({
        where: { id: guestCartId },
        include: { items: true },
      });

      if (!guestCart || guestCart.userId) return;

      let userCart = await this.prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!userCart) {
        await this.prisma.cart.update({
          where: { id: guestCart.id },
          data: { user: { connect: { id: userId } } },
        });
        return true;
      }

      for (const guestItem of guestCart.items) {
        const userItem = userCart.items.find(i => i.variantId === guestItem.variantId);
        if (userItem) {
          await this.prisma.cartItem.update({
            where: { id: userItem.id },
            data: { quantity: userItem.quantity + guestItem.quantity },
          });
        } else {
          await this.prisma.cartItem.create({
            data: {
              cart: { connect: { id: userCart.id } },
              variant: { connect: { id: guestItem.variantId } },
              quantity: guestItem.quantity,
            },
          });
        }
      }

      await this.prisma.cart.delete({ where: { id: guestCart.id } });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Failed to merge carts');
    }
  }

  async calculateTotalPrice(cartId: string): Promise<number> {
    try {
      const cartItems = await this.prisma.cartItem.findMany({
        where: { cartId },
        include: { variant: true },
      });

      let totalPrice = 0;
      for (const item of cartItems) {
        totalPrice += item.variant.price * item.quantity;
      }
      return totalPrice;
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Failed to calculate total price');
    }
  }

  async getCartById(cartId: string) {
    try {
      return await this.prisma.cart.findUnique({
        where: { id: cartId },
        include: {
          items: {
            include: {
              variant: { include: { product: true } },
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Failed to get cart by ID');
    }
  }

  async getCartByUserId(userId: string) {
    try {
      return await this.prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              variant: { include: { product: true } },
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Failed to get cart by user ID');
    }
  }

  async removeItemFromCart(cartId: string, variantId: string) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { id: cartId },
        include: { items: true },
      });

      if (cart) {
        const itemToRemove = cart.items.find(item => item.variantId === variantId);
        if (itemToRemove) {
          await this.prisma.cartItem.delete({ where: { id: itemToRemove.id } });
        }
      }

      return this.getCartById(cartId);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Failed to remove item from cart');
    }
  }
}
