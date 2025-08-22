import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  async createCart(
    @Context() context,
    @Args('createCartInput') createCartInput: CreateCartInput,
  ) {
    const req = context.req;
    let userId: string | null = null;
  
    const authHeader = req.headers['authorization'];
  
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
  
      try {
        const JwtSecret = process.env.JWT_SECRET;
        if (!JwtSecret) {
          throw new UnauthorizedException('JWT secret is invalid');
        }
        const decoded: any = jwt.verify(token, JwtSecret);
        userId = decoded?.sub ?? null;
      } catch (error) {
        throw Error(error)
      }
    }
  
    const result = await this.cartService.addToCart(userId, createCartInput);
    return result.cart;
  }
  
  

  
  @Query(() => Cart, { name: 'cartByUser' })
  async getCartByUser(@Args('userId') userId: string) {
    return this.cartService.getCartByUserId(userId);
  }

  @Query(() => Cart, { name: 'cartById' })
  async getCartById(@Args('cartId') cartId: string) {
    return this.cartService.getCartById(cartId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async mergeCart(
    @Context() context,
    @Args('guestCartId') guestCartId: string,
  ) {
    const userId = context.req.user.id;
    await this.cartService.mergeCarts(userId, guestCartId);
    return true;
  }

  @Mutation(() => Cart)
  async removeItemFromCart(
    @Args('cartId') cartId: string,
    @Args('variantId') variantId: string,
  ) {
    return this.cartService.removeItemFromCart(cartId, variantId);
  }
}
