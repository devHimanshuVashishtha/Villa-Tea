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
exports.CreateHomeInput = exports.CreateParagraphInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateParagraphInput = class CreateParagraphInput {
    text;
};
exports.CreateParagraphInput = CreateParagraphInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateParagraphInput.prototype, "text", void 0);
exports.CreateParagraphInput = CreateParagraphInput = __decorate([
    (0, graphql_1.InputType)()
], CreateParagraphInput);
let CreateHomeInput = class CreateHomeInput {
    image;
    heading;
    paragraphs;
};
exports.CreateHomeInput = CreateHomeInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateHomeInput.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateHomeInput.prototype, "heading", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CreateParagraphInput]),
    __metadata("design:type", Array)
], CreateHomeInput.prototype, "paragraphs", void 0);
exports.CreateHomeInput = CreateHomeInput = __decorate([
    (0, graphql_1.InputType)()
], CreateHomeInput);
//# sourceMappingURL=create-home.input.js.map