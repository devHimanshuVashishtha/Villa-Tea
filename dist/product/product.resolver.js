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
exports.ProductResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_service_1 = require("./product.service");
const create_product_input_1 = require("./dto/create-product.input");
const product_entity_1 = require("./entities/product.entity");
const product_pagination_response_1 = require("./entities/product-pagination.response");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/roles.decorator");
const update_product_input_1 = require("./dto/update-product.input");
let ProductResolver = class ProductResolver {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    createProduct(createProductInput) {
        return this.productService.create(createProductInput);
    }
    filterProducts(filters, pageNumber, pageSize) {
        return this.productService.filterProducts(filters, pageNumber, pageSize);
    }
    findProductById(id) {
        return this.productService.findOne(id);
    }
    deleteProductById(id) {
        return this.productService.deleteOne(id);
    }
    async updateProduct(productId, productInput) {
        return this.productService.updateProduct(productId, productInput);
    }
    async updateVariant(variantId, updatedVariantInput) {
        return this.productService.updateVariant(variantId, updatedVariantInput);
    }
    deleteVariantById(id) {
        return this.productService.deleteVariant(id);
    }
    async addVariantToEistingPRoduct(productId, variantInput) {
        return await this.productService.addVariant(productId, variantInput);
    }
};
exports.ProductResolver = ProductResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, graphql_1.Mutation)(() => product_entity_1.Product),
    __param(0, (0, graphql_1.Args)('createProductInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_input_1.CreateProductInput]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.Query)(() => product_pagination_response_1.ProductPaginationResponse),
    __param(0, (0, graphql_1.Args)('filters')),
    __param(1, (0, graphql_1.Args)('pageNumber', { type: () => graphql_1.Float })),
    __param(2, (0, graphql_1.Args)('pageSize', { type: () => graphql_1.Float, defaultValue: 5 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_input_1.ProductFilterInput, Number, Number]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "filterProducts", null);
__decorate([
    (0, graphql_1.Query)(() => product_entity_1.Product),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "findProductById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, graphql_1.Mutation)(() => product_entity_1.Product),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "deleteProductById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, graphql_1.Mutation)(() => product_entity_1.Product),
    __param(0, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_input_1.UpdateProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "updateProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, graphql_1.Mutation)(() => product_entity_1.Variant),
    __param(0, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_input_1.UpdateProductVariantInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "updateVariant", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, graphql_1.Mutation)(() => product_entity_1.Product),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "deleteVariantById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, graphql_1.Mutation)(() => product_entity_1.Variant),
    __param(0, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_product_input_1.CreateVariantInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "addVariantToEistingPRoduct", null);
exports.ProductResolver = ProductResolver = __decorate([
    (0, graphql_1.Resolver)(() => product_entity_1.Product),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductResolver);
//# sourceMappingURL=product.resolver.js.map