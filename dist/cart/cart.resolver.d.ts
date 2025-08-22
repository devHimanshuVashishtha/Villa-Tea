import { CartService } from './cart.service';
import { CreateCartInput } from './dto/create-cart.input';
export declare class CartResolver {
    private readonly cartService;
    constructor(cartService: CartService);
    createCart(context: any, createCartInput: CreateCartInput): Promise<({
        items: ({
            variant: {
                product: {
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
                };
            } & {
                id: string;
                size: string;
                price: number;
                productId: string;
            };
        } & {
            id: string;
            quantity: number;
            cartId: string;
            variantId: string;
        })[];
    } & {
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    getCartByUser(userId: string): Promise<({
        items: ({
            variant: {
                product: {
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
                };
            } & {
                id: string;
                size: string;
                price: number;
                productId: string;
            };
        } & {
            id: string;
            quantity: number;
            cartId: string;
            variantId: string;
        })[];
    } & {
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    getCartById(cartId: string): Promise<({
        items: ({
            variant: {
                product: {
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
                };
            } & {
                id: string;
                size: string;
                price: number;
                productId: string;
            };
        } & {
            id: string;
            quantity: number;
            cartId: string;
            variantId: string;
        })[];
    } & {
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    mergeCart(context: any, guestCartId: string): Promise<boolean>;
    removeItemFromCart(cartId: string, variantId: string): Promise<({
        items: ({
            variant: {
                product: {
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
                };
            } & {
                id: string;
                size: string;
                price: number;
                productId: string;
            };
        } & {
            id: string;
            quantity: number;
            cartId: string;
            variantId: string;
        })[];
    } & {
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}
