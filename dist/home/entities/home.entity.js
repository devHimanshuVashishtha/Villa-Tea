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
exports.Paragraph = exports.Home = void 0;
const graphql_1 = require("@nestjs/graphql");
let Home = class Home {
    id;
    image;
    heading;
    paragraphs;
    createdAt;
    updatedAt;
};
exports.Home = Home;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Home.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Home.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Home.prototype, "heading", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Paragraph]),
    __metadata("design:type", Array)
], Home.prototype, "paragraphs", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Home.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Home.prototype, "updatedAt", void 0);
exports.Home = Home = __decorate([
    (0, graphql_1.ObjectType)()
], Home);
let Paragraph = class Paragraph {
    id;
    text;
};
exports.Paragraph = Paragraph;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Paragraph.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Paragraph.prototype, "text", void 0);
exports.Paragraph = Paragraph = __decorate([
    (0, graphql_1.ObjectType)()
], Paragraph);
//# sourceMappingURL=home.entity.js.map