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
exports.ProductFilterInput = exports.CreateProductInput = exports.CreateVariantInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateVariantInput = class CreateVariantInput {
    size;
    price;
};
exports.CreateVariantInput = CreateVariantInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateVariantInput.prototype, "size", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreateVariantInput.prototype, "price", void 0);
exports.CreateVariantInput = CreateVariantInput = __decorate([
    (0, graphql_1.InputType)()
], CreateVariantInput);
let CreateProductInput = class CreateProductInput {
    image;
    name;
    collection;
    flavour;
    origin;
    qualities;
    caffeine;
    allegens;
    isOrganic;
    isVegan;
    variants;
};
exports.CreateProductInput = CreateProductInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "collection", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "flavour", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "origin", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "qualities", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "caffeine", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "allegens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], CreateProductInput.prototype, "isOrganic", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], CreateProductInput.prototype, "isVegan", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CreateVariantInput]),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "variants", void 0);
exports.CreateProductInput = CreateProductInput = __decorate([
    (0, graphql_1.InputType)()
], CreateProductInput);
let ProductFilterInput = class ProductFilterInput {
    collection;
    flavour;
    origin;
    qualities;
    caffeine;
    allegens;
    isOrganic;
    isVegan;
    sortBy;
};
exports.ProductFilterInput = ProductFilterInput;
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductFilterInput.prototype, "collection", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductFilterInput.prototype, "flavour", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductFilterInput.prototype, "origin", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ProductFilterInput.prototype, "qualities", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProductFilterInput.prototype, "caffeine", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ProductFilterInput.prototype, "allegens", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ProductFilterInput.prototype, "isOrganic", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ProductFilterInput.prototype, "isVegan", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductFilterInput.prototype, "sortBy", void 0);
exports.ProductFilterInput = ProductFilterInput = __decorate([
    (0, graphql_1.InputType)()
], ProductFilterInput);
//# sourceMappingURL=create-product.input.js.map