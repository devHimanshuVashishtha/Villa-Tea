export declare class Cart {
    id: string;
    userId?: number;
    items: CartItem[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class CartItem {
    id: string;
    variantId: string;
    quantity: number;
}
