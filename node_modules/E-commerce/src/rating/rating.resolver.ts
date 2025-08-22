import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { RatingService } from './rating.service';
import { Rating } from './entities/rating.entity';
import { CreateRatingInput } from './dto/create-rating.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver()
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Rating)
  createUpdateRating(@Context() context,@Args('createRatingInput') createRatingInput: CreateRatingInput) {
    const userId:string=context.req.user.id
    return this.ratingService.create(userId,createRatingInput);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(()=>Rating)
    deleteRating(@Context() context,@Args('productId') productId: string){
      const userId:string=context.req.user.id
      return this.ratingService.deleteRating(userId,productId)
    }

}
