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
exports.WishlistResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const wishlist_service_1 = require("./wishlist.service");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let WishlistResolver = class WishlistResolver {
    wishlistService;
    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    }
    createWishlist(context, productId) {
        const userId = context.req.user.id;
        return this.wishlistService.create(userId, productId);
    }
    findAllWishListItem(context) {
        const userId = context.req.user.id;
        return this.wishlistService.findAll(userId);
    }
    async deleteAllWishListItem(context) {
        const userId = context.req.user.id;
        const result = await this.wishlistService.deleteAll(userId);
        return result > 0;
    }
    removeWishlistItytemById(id) {
        return this.wishlistService.remove(id);
    }
};
exports.WishlistResolver = WishlistResolver;
__decorate([
    (0, graphql_1.Mutation)(() => wishlist_entity_1.Wishlist),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WishlistResolver.prototype, "createWishlist", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [wishlist_entity_1.Wishlist], { name: 'wishlist' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WishlistResolver.prototype, "findAllWishListItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WishlistResolver.prototype, "deleteAllWishListItem", null);
__decorate([
    (0, graphql_1.Mutation)(() => wishlist_entity_1.Wishlist),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WishlistResolver.prototype, "removeWishlistItytemById", null);
exports.WishlistResolver = WishlistResolver = __decorate([
    (0, graphql_1.Resolver)(() => wishlist_entity_1.Wishlist),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService])
], WishlistResolver);
//# sourceMappingURL=wishlist.resolver.js.map