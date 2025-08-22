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
exports.ProductPaginationResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_entity_1 = require("./product.entity");
let ProductPaginationResponse = class ProductPaginationResponse {
    items;
    totalItems;
    totalPages;
    hasNextPage;
};
exports.ProductPaginationResponse = ProductPaginationResponse;
__decorate([
    (0, graphql_1.Field)(() => [product_entity_1.Product]),
    __metadata("design:type", Array)
], ProductPaginationResponse.prototype, "items", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProductPaginationResponse.prototype, "totalItems", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProductPaginationResponse.prototype, "totalPages", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ProductPaginationResponse.prototype, "hasNextPage", void 0);
exports.ProductPaginationResponse = ProductPaginationResponse = __decorate([
    (0, graphql_1.ObjectType)()
], ProductPaginationResponse);
//# sourceMappingURL=product-pagination.response.js.map