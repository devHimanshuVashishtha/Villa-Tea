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
exports.BlogResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const blog_service_1 = require("./blog.service");
const blog_entity_1 = require("./entities/blog.entity");
const create_blog_input_1 = require("./dto/create-blog.input");
const update_blog_input_1 = require("./dto/update-blog.input");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const common_1 = require("@nestjs/common");
let BlogResolver = class BlogResolver {
    blogService;
    constructor(blogService) {
        this.blogService = blogService;
    }
    createBlog(createBlogInput) {
        return this.blogService.create(createBlogInput);
    }
    findAllBlog() {
        return this.blogService.findAll();
    }
    findOneBlog(id) {
        return this.blogService.findOne(id);
    }
    updateBlog(updateBlogInput) {
        return this.blogService.update(updateBlogInput.id, updateBlogInput);
    }
    removeBlog(id) {
        return this.blogService.remove(id);
    }
};
exports.BlogResolver = BlogResolver;
__decorate([
    (0, graphql_1.Mutation)(() => blog_entity_1.Blog),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)('createBlogInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_input_1.CreateBlogInput]),
    __metadata("design:returntype", void 0)
], BlogResolver.prototype, "createBlog", null);
__decorate([
    (0, graphql_1.Query)(() => [blog_entity_1.Blog], { name: 'blog' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogResolver.prototype, "findAllBlog", null);
__decorate([
    (0, graphql_1.Query)(() => blog_entity_1.Blog, { name: 'blog' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogResolver.prototype, "findOneBlog", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, graphql_1.Mutation)(() => blog_entity_1.Blog),
    __param(0, (0, graphql_1.Args)('updateBlogInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_blog_input_1.UpdateBlogInput]),
    __metadata("design:returntype", void 0)
], BlogResolver.prototype, "updateBlog", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, graphql_1.Mutation)(() => blog_entity_1.Blog),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogResolver.prototype, "removeBlog", null);
exports.BlogResolver = BlogResolver = __decorate([
    (0, graphql_1.Resolver)(() => blog_entity_1.Blog),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogResolver);
//# sourceMappingURL=blog.resolver.js.map