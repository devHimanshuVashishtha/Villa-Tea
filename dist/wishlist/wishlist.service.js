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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let WishlistService = class WishlistService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, productId) {
        try {
            const productExists = await this.prisma.product.findUnique({
                where: { id: productId },
            });
            if (!productExists) {
                throw new common_1.NotFoundException('Product not found');
            }
            const existingWishlistItem = await this.prisma.wishList.findFirst({
                where: {
                    userId,
                    productId,
                },
            });
            if (existingWishlistItem) {
                throw new common_1.BadRequestException('This product is already in your wishlist');
            }
            return await this.prisma.wishList.create({
                data: {
                    userId,
                    productId,
                },
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`Failed to add product to wishlist: ${error.message}`);
        }
    }
    async findAll(userId) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to fetch wishlist: ${error.message}`);
        }
    }
    async deleteAll(userId) {
        try {
            const deletedItems = await this.prisma.wishList.deleteMany({
                where: {
                    userId,
                },
            });
            if (deletedItems.count === 0) {
                throw new common_1.NotFoundException('No items to delete');
            }
            return deletedItems.count;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`Failed to delete wishlist items: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            const removedWishlist = await this.prisma.wishList.delete({
                where: {
                    id,
                },
            });
            return removedWishlist;
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('Wishlist item not found');
            }
            throw new common_1.InternalServerErrorException(`Failed to remove wishlist item: ${error.message}`);
        }
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map