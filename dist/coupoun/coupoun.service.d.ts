import { CreateCouponInput } from './dto/create-coupoun.input';
import { PrismaService } from 'src/prisma.service';
import { ApplyCouponInput } from './dto/apply-coupon.input';
import { ApplyCouponResponse } from './entities/apply-coupon-response.entity';
export declare class CoupounService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCoupon(input: CreateCouponInput): Promise<{
        id: string;
        createdAt: Date;
        expiresAt: Date;
        size: string | null;
        code: string;
        discount: number;
        type: import("generated/prisma").$Enums.DiscountType;
        minimumAmount: number | null;
        appliesToAll: boolean;
        isActive: boolean;
    }>;
    applyCoupon(userId: string, input: ApplyCouponInput): Promise<ApplyCouponResponse>;
}
