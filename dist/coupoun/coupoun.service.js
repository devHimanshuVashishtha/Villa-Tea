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
exports.CoupounService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CoupounService = class CoupounService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCoupon(input) {
        try {
            return await this.prisma.coupon.create({
                data: {
                    code: input.code,
                    discount: input.discount,
                    type: input.type,
                    minimumAmount: input?.minimumAmount,
                    size: input?.size,
                    expiresAt: input.expiresAt,
                    appliesToAll: input.appliesToAll,
                    products: input.productIds
                        ? {
                            connect: input.productIds.map((id) => ({ id })),
                        }
                        : undefined,
                    variants: input.variantIds
                        ? {
                            connect: input.variantIds.map((id) => ({ id })),
                        }
                        : undefined,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create coupon');
        }
    }
    async applyCoupon(userId, input) {
        try {
            const { couponCode, cartTotal, productIds = [], variantIds = [] } = input;
            const coupon = await this.prisma.coupon.findFirst({
                where: {
                    code: couponCode,
                    isActive: true,
                    expiresAt: { gt: new Date() },
                },
                include: {
                    products: true,
                    variants: true,
                },
            });
            if (!coupon) {
                return { valid: false, message: 'Invalid or expired coupon' };
            }
            if (coupon.minimumAmount && cartTotal < coupon.minimumAmount) {
                return {
                    valid: false,
                    message: `Minimum amount should be ₹${coupon.minimumAmount}`,
                };
            }
            if (!coupon.appliesToAll) {
                const productMatch = coupon.products.some((p) => productIds.includes(p.id)) ||
                    coupon.variants.some((v) => variantIds.includes(v.id)) ||
                    (coupon.size && variantIds.length > 0);
                if (!productMatch) {
                    return {
                        valid: false,
                        message: 'Coupon is not applicable to selected items',
                    };
                }
            }
            let discountAmount = 0;
            if (coupon.type === 'percentage') {
                discountAmount = (cartTotal * coupon.discount) / 100;
            }
            else {
                discountAmount = coupon.discount;
            }
            const finalAmount = cartTotal - discountAmount;
            await this.prisma.couponUsage.create({
                data: {
                    userId: userId,
                    couponId: coupon.id,
                    cartAmount: cartTotal,
                    discount: discountAmount,
                    finalAmount: finalAmount,
                },
            });
            return {
                valid: true,
                message: 'Coupon applied successfully',
                discountAmount,
                finalAmount,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to apply coupon');
        }
    }
};
exports.CoupounService = CoupounService;
exports.CoupounService = CoupounService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoupounService);
//# sourceMappingURL=coupoun.service.js.map