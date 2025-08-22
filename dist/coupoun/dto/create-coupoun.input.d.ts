export declare class CreateCouponInput {
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
    minimumAmount?: number;
    size?: string;
    appliesToAll: boolean;
    expiresAt: Date;
    productIds?: string[];
    variantIds?: string[];
}
