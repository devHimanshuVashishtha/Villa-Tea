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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const cart_service_1 = require("./cart.service");
const cart_entity_1 = require("./entities/cart.entity");
const create_cart_input_1 = require("./dto/create-cart.input");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let CartResolver = class CartResolver {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    async createCart(context, createCartInput) {
        const req = context.req;
        let userId = null;
        const authHeader = req.headers['authorization'];
        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const JwtSecret = process.env.JWT_SECRET;
                if (!JwtSecret) {
                    throw new common_1.UnauthorizedException('JWT secret is invalid');
                }
                const decoded = jwt.verify(token, JwtSecret);
                userId = decoded?.sub ?? null;
            }
            catch (error) {
                throw Error(error);
            }
        }
        const result = await this.cartService.addToCart(userId, createCartInput);
        return result.cart;
    }
    async getCartByUser(userId) {
        return this.cartService.getCartByUserId(userId);
    }
    async getCartById(cartId) {
        return this.cartService.getCartById(cartId);
    }
    async mergeCart(context, guestCartId) {
        const userId = context.req.user.id;
        await this.cartService.mergeCarts(userId, guestCartId);
        return true;
    }
    async removeItemFromCart(cartId, variantId) {
        return this.cartService.removeItemFromCart(cartId, variantId);
    }
};
exports.CartResolver = CartResolver;
__decorate([
    (0, graphql_1.Mutation)(() => cart_entity_1.Cart),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('createCartInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_cart_input_1.CreateCartInput]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "createCart", null);
__decorate([
    (0, graphql_1.Query)(() => cart_entity_1.Cart, { name: 'cartByUser' }),
    __param(0, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "getCartByUser", null);
__decorate([
    (0, graphql_1.Query)(() => cart_entity_1.Cart, { name: 'cartById' }),
    __param(0, (0, graphql_1.Args)('cartId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "getCartById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('guestCartId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "mergeCart", null);
__decorate([
    (0, graphql_1.Mutation)(() => cart_entity_1.Cart),
    __param(0, (0, graphql_1.Args)('cartId')),
    __param(1, (0, graphql_1.Args)('variantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "removeItemFromCart", null);
exports.CartResolver = CartResolver = __decorate([
    (0, graphql_1.Resolver)(() => cart_entity_1.Cart),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartResolver);
//# sourceMappingURL=cart.resolver.js.map