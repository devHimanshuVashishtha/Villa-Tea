import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRatingInput } from './dto/create-rating.input';
import { UpdateRatingInput } from './dto/update-rating.input';
import { PrismaService } from 'src/prisma.service';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    createRatingInput: CreateRatingInput,
  ): Promise<Rating | {}> {
    const { productId, rating, review } = createRatingInput;

    try {
      return await this.prisma.rating.upsert({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
        create: {
          userId,
          productId,
          rating,
          review: typeof review !== 'undefined' ? review : null,
        },
        update: {
          rating,
          review: typeof review !== 'undefined' ? review : null,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to create or update rating',
      );
    }
  }

  async deleteRating(userId: string, productId: string): Promise<Rating | {}> {
    try {
      return await this.prisma.rating.delete({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Rating not found for this user and product');
      }
      throw new InternalServerErrorException(
        error.message || 'Failed to delete rating',
      );
    }
  }
}
