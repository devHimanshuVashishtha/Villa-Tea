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
exports.UpdateProductInput = exports.UpdateProductVariantInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_product_input_1 = require("./create-product.input");
let UpdateProductVariantInput = class UpdateProductVariantInput extends (0, graphql_1.PartialType)(create_product_input_1.CreateVariantInput) {
    id;
};
exports.UpdateProductVariantInput = UpdateProductVariantInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateProductVariantInput.prototype, "id", void 0);
exports.UpdateProductVariantInput = UpdateProductVariantInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateProductVariantInput);
let UpdateProductInput = class UpdateProductInput extends (0, graphql_1.PartialType)((0, graphql_1.OmitType)(create_product_input_1.CreateProductInput, ['variants'])) {
    id;
    variants;
};
exports.UpdateProductInput = UpdateProductInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [UpdateProductVariantInput], { nullable: true }),
    __metadata("design:type", Array)
], UpdateProductInput.prototype, "variants", void 0);
exports.UpdateProductInput = UpdateProductInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateProductInput);
//# sourceMappingURL=update-product.input.js.map