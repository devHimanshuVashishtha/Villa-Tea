import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, productId: string) {
    try {
      const productExists = await this.prisma.product.findUnique({
        where: { id: productId },
      });

      if (!productExists) {
        throw new NotFoundException('Product not found');
      }

      const existingWishlistItem = await this.prisma.wishList.findFirst({
        where: {
          userId,
          productId,
        },
      });

      if (existingWishlistItem) {
        throw new BadRequestException('This product is already in your wishlist');
      }

      return await this.prisma.wishList.create({
        data: {
          userId,
          productId,
        },
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to add product to wishlist: ${error.message}`);
    }
  }

  async findAll(userId: string) {
    try {
      const wishlists = await this.prisma.wishList.findMany({
        where: {
          userId,
        },
        include: {
          product: true,
        },
      });

      return wishlists.map((wishlist) => wishlist.product);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch wishlist: ${error.message}`);
    }
  }

  async deleteAll(userId: string) {
    try {
      const deletedItems = await this.prisma.wishList.deleteMany({
        where: {
          userId,
        },
      });

      if (deletedItems.count === 0) {
        throw new NotFoundException('No items to delete');
      }

      return deletedItems.count;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to delete wishlist items: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const removedWishlist = await this.prisma.wishList.delete({
        where: {
          id,
        },
      });

      return removedWishlist;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Wishlist item not found');
      }
      throw new InternalServerErrorException(`Failed to remove wishlist item: ${error.message}`);
    }
  }
}
