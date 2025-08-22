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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductService = class ProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductInput) {
        try {
            const { image, name, collection, flavour, origin, qualities, caffeine, allegens, isOrganic, isVegan, variants, } = createProductInput;
            const normalizedProduct = {
                image,
                name,
                collection: collection?.toLowerCase(),
                flavour: flavour?.toLowerCase(),
                origin: origin?.toLowerCase(),
                qualities: qualities?.map((q) => q.toLowerCase().trim()),
                caffeine: caffeine?.toLowerCase(),
                allegens: allegens?.map((a) => a.toLowerCase().trim()),
                isOrganic,
                isVegan,
            };
            return await this.prisma.product.create({
                data: {
                    ...normalizedProduct,
                    variants: {
                        create: variants.map((variant) => ({
                            size: variant.size,
                            price: variant.price,
                        })),
                    },
                },
                include: { variants: true },
            });
        }
        catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }
    async filterProducts(filters, pageNumber = 1, pageSize) {
        try {
            const skip = (pageNumber - 1) * pageSize;
            const normalizedFilters = {
                ...filters,
                collection: filters.collection?.toLowerCase(),
                flavour: filters.flavour?.toLowerCase(),
                origin: filters.origin?.toLowerCase(),
                caffeine: filters.caffeine?.toLowerCase(),
                qualities: filters.qualities?.map((q) => q.toLowerCase().trim()),
                allegens: filters.allegens?.map((a) => a.toLowerCase().trim()),
            };
            const where = {
                ...(normalizedFilters.collection && {
                    collection: {
                        contains: normalizedFilters.collection,
                        mode: 'insensitive',
                    },
                }),
                ...(normalizedFilters.flavour && {
                    flavour: { contains: normalizedFilters.flavour, mode: 'insensitive' },
                }),
                ...(normalizedFilters.origin && {
                    origin: { contains: normalizedFilters.origin, mode: 'insensitive' },
                }),
                ...(normalizedFilters.caffeine && {
                    caffeine: {
                        contains: normalizedFilters.caffeine,
                        mode: 'insensitive',
                    },
                }),
                ...(filters.isOrganic !== undefined && {
                    isOrganic: filters.isOrganic,
                }),
                ...(filters.isVegan !== undefined && { isVegan: filters.isVegan }),
                ...(normalizedFilters.qualities?.length && {
                    qualities: { hasSome: normalizedFilters.qualities },
                }),
                ...(normalizedFilters.allegens?.length && {
                    allegens: { hasSome: normalizedFilters.allegens },
                }),
            };
            let orderBy;
            let priceBasedSorting = false;
            if (filters.sortBy) {
                switch (filters.sortBy) {
                    case 'AZ':
                        orderBy = { name: 'asc' };
                        break;
                    case 'ZA':
                        orderBy = { name: 'desc' };
                        break;
                    case 'PRICE_LOW_HIGH':
                    case 'PRICE_HIGH_LOW':
                        priceBasedSorting = true;
                        break;
                }
            }
            if (priceBasedSorting) {
                const allItems = await this.prisma.product.findMany({
                    where,
                    include: { variants: true },
                });
                const validProducts = allItems.filter((p) => p.variants.length > 0);
                const sortedItems = validProducts
                    .map((product) => {
                    const lowestVariant = product.variants.reduce((min, curr) => curr.price < min.price ? curr : min);
                    return {
                        ...product,
                        _lowestVariantPrice: lowestVariant.price,
                    };
                })
                    .sort((a, b) => {
                    return filters.sortBy === 'PRICE_LOW_HIGH'
                        ? a._lowestVariantPrice - b._lowestVariantPrice
                        : b._lowestVariantPrice - a._lowestVariantPrice;
                });
                const paginatedItems = sortedItems.slice(skip, skip + pageSize);
                const totalItems = sortedItems.length;
                const totalPages = Math.ceil(totalItems / pageSize);
                return {
                    items: paginatedItems,
                    totalItems,
                    totalPages,
                    hasNextPage: pageNumber < totalPages,
                };
            }
            else {
                const [items, totalItems] = await Promise.all([
                    this.prisma.product.findMany({
                        where,
                        skip,
                        take: pageSize,
                        include: { variants: true },
                        ...(orderBy && { orderBy }),
                    }),
                    this.prisma.product.count({ where }),
                ]);
                const totalPages = Math.ceil(totalItems / pageSize);
                return {
                    items,
                    totalItems,
                    totalPages,
                    hasNextPage: pageNumber < totalPages,
                };
            }
        }
        catch (error) {
            throw new Error(`Error filtering products: ${error?.message || error}`);
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.product.findUnique({
                where: { id },
                include: { variants: true },
            });
        }
        catch (error) {
            throw new Error(`Error fetching product with id ${id}: ${error.message}`);
        }
    }
    async deleteOne(id) {
        try {
            return await this.prisma.product.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new Error(`Error deleting product with id ${id}: ${error.message}`);
        }
    }
    async updateProduct(productId, updateProductInput) {
        try {
            const normalizedProduct = {
                ...(updateProductInput.image && { image: updateProductInput.image }),
                ...(updateProductInput.name && { name: updateProductInput.name }),
                ...(updateProductInput.collection && {
                    collection: updateProductInput.collection.toLowerCase(),
                }),
                ...(updateProductInput.flavour && {
                    flavour: updateProductInput.flavour.toLowerCase(),
                }),
                ...(updateProductInput.origin && {
                    origin: updateProductInput.origin.toLowerCase(),
                }),
                ...(updateProductInput.qualities && {
                    qualities: updateProductInput.qualities.map((q) => q.toLowerCase().trim()),
                }),
                ...(updateProductInput.caffeine && {
                    caffeine: updateProductInput.caffeine.toLowerCase(),
                }),
                ...(updateProductInput.allegens && {
                    allegens: updateProductInput.allegens.map((a) => a.toLowerCase().trim()),
                }),
                ...(updateProductInput.isOrganic !== undefined && {
                    isOrganic: updateProductInput.isOrganic,
                }),
                ...(updateProductInput.isVegan !== undefined && {
                    isVegan: updateProductInput.isVegan,
                }),
            };
            let variantsUpdate;
            if (updateProductInput.variants) {
                variantsUpdate = {
                    update: updateProductInput.variants.map((variant) => ({
                        where: { id: variant.id },
                        data: {
                            ...(variant.size && { size: variant.size }),
                            ...(variant.price !== undefined && { price: variant.price }),
                        },
                    })),
                };
            }
            return await this.prisma.product.update({
                where: { id: productId },
                data: {
                    ...normalizedProduct,
                    ...(variantsUpdate && { variants: variantsUpdate }),
                },
                include: { variants: true },
            });
        }
        catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }
    async updateVariant(variantId, input) {
        try {
            return await this.prisma.variant.update({
                where: { id: variantId },
                data: {
                    ...(input.size && { size: input.size }),
                    ...(input.price !== undefined && { price: input.price }),
                },
            });
        }
        catch (error) {
            throw new Error(`Error updating variant with id ${variantId}: ${error.message}`);
        }
    }
    async deleteVariant(variantId) {
        try {
            return await this.prisma.variant.delete({
                where: { id: variantId },
            });
        }
        catch (error) {
            throw new Error(`Error deleting variant with id ${variantId}: ${error.message}`);
        }
    }
    async addVariant(productId, input) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id: productId },
            });
            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            return await this.prisma.variant.create({
                data: {
                    size: input.size,
                    price: input.price,
                    productId: productId,
                },
            });
        }
        catch (error) {
            throw new Error(`Error adding variant to product: ${error.message}`);
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map