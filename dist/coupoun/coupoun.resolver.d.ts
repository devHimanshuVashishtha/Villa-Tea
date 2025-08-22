import { CoupounService } from './coupoun.service';
import { CreateCouponInput } from './dto/create-coupoun.input';
import { ApplyCouponResponse } from './entities/apply-coupon-response.entity';
import { ApplyCouponInput } from './dto/apply-coupon.input';
export declare class CoupounResolver {
    private readonly couponService;
    constructor(couponService: CoupounService);
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
    applyCoupon(context: any, input: ApplyCouponInput): Promise<ApplyCouponResponse>;
}
