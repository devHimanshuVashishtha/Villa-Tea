import { Product, Variant } from 'src/product/entities/product.entity';
export declare class Coupoun {
    id: string;
    code: string;
    discount: number;
    type: string;
    minimumAmount?: number;
    size?: string;
    appliesToAll: boolean;
    expiresAt: Date;
    isActive: boolean;
    createdAt: Date;
    products?: Product[];
    variants?: Variant[];
}
