import { WishlistService } from './wishlist.service';
export declare class WishlistResolver {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    createWishlist(context: any, productId: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
    }>;
    findAllWishListItem(context: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        image: string;
        collection: string;
        flavour: string;
        origin: string;
        qualities: string[];
        caffeine: string;
        allegens: string[];
        isOrganic: boolean;
        isVegan: boolean;
    }[]>;
    deleteAllWishListItem(context: any): Promise<boolean>;
    removeWishlistItytemById(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
    }>;
}
