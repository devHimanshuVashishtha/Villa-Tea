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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let BlogService = class BlogService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBlogInput) {
        if (!createBlogInput ||
            !createBlogInput.paragraphs ||
            createBlogInput.paragraphs.length === 0) {
            throw new common_1.BadRequestException('Invalid data: Paragraphs are required');
        }
        try {
            const newBlogPageContent = await this.prisma.blog.create({
                data: {
                    image: createBlogInput.image,
                    heading: createBlogInput.heading,
                    paragraphs: {
                        create: createBlogInput.paragraphs.map((paragraph) => ({
                            text: paragraph.text,
                        })),
                    },
                },
                include: {
                    paragraphs: true,
                },
            });
            return newBlogPageContent;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create blog');
        }
    }
    async findAll() {
        try {
            return await this.prisma.blog.findMany({
                include: {
                    paragraphs: true,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch blogs');
        }
    }
    async findOne(id) {
        try {
            const blog = await this.prisma.blog.findUnique({
                where: { id },
                include: {
                    paragraphs: true,
                },
            });
            if (!blog) {
                throw new common_1.BadRequestException(`Blog with ID ${id} not found`);
            }
            return blog;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch blog');
        }
    }
    async update(id, updateBlogInput) {
        try {
            const existingBlog = await this.prisma.blog.findUnique({ where: { id } });
            if (!existingBlog) {
                throw new common_1.BadRequestException(`Blog with ID ${id} not found`);
            }
            if (updateBlogInput.paragraphs) {
                await this.prisma.blogParagraph.deleteMany({
                    where: { blogId: id },
                });
                await this.prisma.blog.update({
                    where: { id },
                    data: {
                        paragraphs: {
                            create: updateBlogInput.paragraphs.map((p) => ({ text: p.text })),
                        },
                    },
                });
            }
            return await this.prisma.blog.update({
                where: { id },
                data: {
                    heading: updateBlogInput.heading,
                    image: updateBlogInput.image,
                },
                include: {
                    paragraphs: true,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update blog');
        }
    }
    async remove(id) {
        try {
            const blog = await this.prisma.blog.findUnique({
                where: { id },
            });
            if (!blog) {
                throw new common_1.BadRequestException(`Blog with ID ${id} not found`);
            }
            return await this.prisma.blog.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete blog');
        }
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogService);
//# sourceMappingURL=blog.service.js.map