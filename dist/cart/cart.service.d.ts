import { PrismaService } from 'src/prisma.service';
import { CreateCartInput } from './dto/create-cart.input';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    addToCart(userId: string | null, createCartInput: CreateCartInput): Promise<{
        cartId: any;
        cart: ({
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
        }) | null;
        totalPrice: number;
    }>;
    mergeCarts(userId: string, guestCartId: string): Promise<true | undefined>;
    calculateTotalPrice(cartId: string): Promise<number>;
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
    getCartByUserId(userId: string): Promise<({
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
