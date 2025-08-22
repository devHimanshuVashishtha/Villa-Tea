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
exports.BlogParagraph = exports.Blog = void 0;
const graphql_1 = require("@nestjs/graphql");
let Blog = class Blog {
    id;
    heading;
    image;
    paragraphs;
};
exports.Blog = Blog;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Blog.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Blog.prototype, "heading", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Blog.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(() => [BlogParagraph]),
    __metadata("design:type", Array)
], Blog.prototype, "paragraphs", void 0);
exports.Blog = Blog = __decorate([
    (0, graphql_1.ObjectType)()
], Blog);
let BlogParagraph = class BlogParagraph {
    id;
    text;
};
exports.BlogParagraph = BlogParagraph;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BlogParagraph.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BlogParagraph.prototype, "text", void 0);
exports.BlogParagraph = BlogParagraph = __decorate([
    (0, graphql_1.ObjectType)()
], BlogParagraph);
//# sourceMappingURL=blog.entity.js.map