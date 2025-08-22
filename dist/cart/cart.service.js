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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addToCart(userId, createCartInput) {
        try {
            let { cartId, variantId, quantity } = createCartInput;
            let cart;
            if (cartId) {
                cart = await this.prisma.cart.findUnique({
                    where: { id: cartId },
                    include: { items: true },
                });
                if (!cart) {
                    throw new common_1.BadRequestException('Cart not found');
                }
                if (userId && !cart.userId) {
                    cart = await this.prisma.cart.update({
                        where: { id: cart.id },
                        data: { user: { connect: { id: userId } } },
                        include: { items: true },
                    });
                }
            }
            else {
                cart = await this.prisma.cart.create({
                    data: userId ? { user: { connect: { id: userId } } } : {},
                    include: { items: true },
                });
            }
            const existingItem = cart.items.find(item => item.variantId === variantId);
            if (existingItem) {
                await this.prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity },
                });
            }
            else {
                await this.prisma.cartItem.create({
                    data: {
                        cart: { connect: { id: cart.id } },
                        variant: { connect: { id: variantId } },
                        quantity,
                    },
                });
            }
            const totalPrice = await this.calculateTotalPrice(cart.id);
            const cartDetail = await this.getCartById(cart.id);
            return { cartId: cart.id, cart: cartDetail, totalPrice };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Failed to add item to cart');
        }
    }
    async mergeCarts(userId, guestCartId) {
        try {
            const guestCart = await this.prisma.cart.findUnique({
                where: { id: guestCartId },
                include: { items: true },
            });
            if (!guestCart || guestCart.userId)
                return;
            let userCart = await this.prisma.cart.findUnique({
                where: { userId },
                include: { items: true },
            });
            if (!userCart) {
                await this.prisma.cart.update({
                    where: { id: guestCart.id },
                    data: { user: { connect: { id: userId } } },
                });
                return true;
            }
            for (const guestItem of guestCart.items) {
                const userItem = userCart.items.find(i => i.variantId === guestItem.variantId);
                if (userItem) {
                    await this.prisma.cartItem.update({
                        where: { id: userItem.id },
                        data: { quantity: userItem.quantity + guestItem.quantity },
                    });
                }
                else {
                    await this.prisma.cartItem.create({
                        data: {
                            cart: { connect: { id: userCart.id } },
                            variant: { connect: { id: guestItem.variantId } },
                            quantity: guestItem.quantity,
                        },
                    });
                }
            }
            await this.prisma.cart.delete({ where: { id: guestCart.id } });
            return true;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Failed to merge carts');
        }
    }
    async calculateTotalPrice(cartId) {
        try {
            const cartItems = await this.prisma.cartItem.findMany({
                where: { cartId },
                include: { variant: true },
            });
            let totalPrice = 0;
            for (const item of cartItems) {
                totalPrice += item.variant.price * item.quantity;
            }
            return totalPrice;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Failed to calculate total price');
        }
    }
    async getCartById(cartId) {
        try {
            return await this.prisma.cart.findUnique({
                where: { id: cartId },
                include: {
                    items: {
                        include: {
                            variant: { include: { product: true } },
                        },
                    },
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Failed to get cart by ID');
        }
    }
    async getCartByUserId(userId) {
        try {
            return await this.prisma.cart.findUnique({
                where: { userId },
                include: {
                    items: {
                        include: {
                            variant: { include: { product: true } },
                        },
                    },
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Failed to get cart by user ID');
        }
    }
    async removeItemFromCart(cartId, variantId) {
        try {
            const cart = await this.prisma.cart.findUnique({
                where: { id: cartId },
                include: { items: true },
            });
            if (cart) {
                const itemToRemove = cart.items.find(item => item.variantId === variantId);
                if (itemToRemove) {
                    await this.prisma.cartItem.delete({ where: { id: itemToRemove.id } });
                }
            }
            return this.getCartById(cartId);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Failed to remove item from cart');
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map