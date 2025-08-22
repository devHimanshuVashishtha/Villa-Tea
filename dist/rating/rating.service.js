"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let RatingService = class RatingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createRatingInput) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Failed to create or update rating');
        }
    }
    async deleteRating(userId, productId) {
        try {
            return await this.prisma.rating.delete({
                where: {
                    userId_productId: {
                        userId,
                        productId,
                    },
                },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('Rating not found for this user and product');
            }
            throw new common_1.InternalServerErrorException(error.message || 'Failed to delete rating');
        }
    }
};
exports.RatingService = RatingService;
exports.RatingService = RatingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RatingService);
//# sourceMappingURL=rating.service.js.map