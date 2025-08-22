import { RatingService } from './rating.service';
import { Rating } from './entities/rating.entity';
import { CreateRatingInput } from './dto/create-rating.input';
export declare class RatingResolver {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    createUpdateRating(context: any, createRatingInput: CreateRatingInput): Promise<{} | Rating>;
    deleteRating(context: any, productId: string): Promise<{} | Rating>;
}
