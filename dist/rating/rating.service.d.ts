import { CreateRatingInput } from './dto/create-rating.input';
import { PrismaService } from 'src/prisma.service';
import { Rating } from './entities/rating.entity';
export declare class RatingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createRatingInput: CreateRatingInput): Promise<Rating | {}>;
    deleteRating(userId: string, productId: string): Promise<Rating | {}>;
}
