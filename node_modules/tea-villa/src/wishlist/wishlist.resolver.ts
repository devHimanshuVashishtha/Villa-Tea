import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './entities/wishlist.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Wishlist)
export class WishlistResolver {
  constructor(private readonly wishlistService: WishlistService) {}

  @Mutation(() => Wishlist)
  @UseGuards(JwtAuthGuard)
  createWishlist(@Context() context, @Args('productId') productId: string) {
    const userId = context.req.user.id;
    return this.wishlistService.create(userId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Wishlist], { name: 'wishlist' })
  findAllWishListItem(@Context() context) {
    const userId = context.req.user.id;
    return this.wishlistService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean) 
  async deleteAllWishListItem(@Context() context) {
    const userId = context.req.user.id;
    const result = await this.wishlistService.deleteAll(userId);
    return result > 0; // Return true if some items were deleted
  }

  @Mutation(() => Wishlist)
  @UseGuards(JwtAuthGuard)
  removeWishlistItytemById(@Args('id', { type: () => String }) id: string) {
    return this.wishlistService.remove(id);
  }
}
