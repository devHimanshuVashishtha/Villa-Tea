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
exports.CartItem = exports.Cart = void 0;
const graphql_1 = require("@nestjs/graphql");
let Cart = class Cart {
    id;
    userId;
    items;
    createdAt;
    updatedAt;
};
exports.Cart = Cart;
__decorate([
    (0, graphql_1.Field)({ description: 'Unique identifier for the cart' }),
    __metadata("design:type", String)
], Cart.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Cart.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CartItem], { description: 'List of items in the cart' }),
    __metadata("design:type", Array)
], Cart.prototype, "items", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { description: 'When the cart was created' }),
    __metadata("design:type", Date)
], Cart.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { description: 'When the cart was last updated' }),
    __metadata("design:type", Date)
], Cart.prototype, "updatedAt", void 0);
exports.Cart = Cart = __decorate([
    (0, graphql_1.ObjectType)()
], Cart);
let CartItem = class CartItem {
    id;
    variantId;
    quantity;
};
exports.CartItem = CartItem;
__decorate([
    (0, graphql_1.Field)({ description: 'Unique identifier for the cart item' }),
    __metadata("design:type", String)
], CartItem.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'ID of the variant being added to the cart' }),
    __metadata("design:type", String)
], CartItem.prototype, "variantId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Quantity of the product variant' }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
exports.CartItem = CartItem = __decorate([
    (0, graphql_1.ObjectType)()
], CartItem);
//# sourceMappingURL=cart.entity.js.map