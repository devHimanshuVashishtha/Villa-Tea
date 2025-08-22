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
exports.UpdateParagraphInput = exports.UpdateHomeInput = void 0;
const create_home_input_1 = require("./create-home.input");
const graphql_1 = require("@nestjs/graphql");
let UpdateHomeInput = class UpdateHomeInput extends (0, graphql_1.PartialType)(create_home_input_1.CreateHomeInput) {
    id;
};
exports.UpdateHomeInput = UpdateHomeInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateHomeInput.prototype, "id", void 0);
exports.UpdateHomeInput = UpdateHomeInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateHomeInput);
let UpdateParagraphInput = class UpdateParagraphInput extends (0, graphql_1.PartialType)(create_home_input_1.CreateParagraphInput) {
    id;
};
exports.UpdateParagraphInput = UpdateParagraphInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateParagraphInput.prototype, "id", void 0);
exports.UpdateParagraphInput = UpdateParagraphInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateParagraphInput);
//# sourceMappingURL=update-home.input.js.map