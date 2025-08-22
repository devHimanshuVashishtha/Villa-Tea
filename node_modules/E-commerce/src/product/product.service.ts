import { Injectable } from '@nestjs/common';
import {
  CreateProductInput,
  CreateVariantInput,
  ProductFilterInput,
} from './dto/create-product.input';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'generated/prisma';
import {
  UpdateProductInput,
  UpdateProductVariantInput,
} from './dto/update-product.input';
import { Variant } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductInput: CreateProductInput) {
    try {
      const {
        image,
        name,
        collection,
        flavour,
        origin,
        qualities,
        caffeine,
        allegens,
        isOrganic,
        isVegan,
        variants,
      } = createProductInput;

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
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async filterProducts(
    filters: ProductFilterInput,
    pageNumber = 1,
    pageSize: number,
  ) {
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
  
      const where: Prisma.ProductWhereInput = {
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
  
      let orderBy: Prisma.ProductOrderByWithRelationInput | undefined;
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
            const lowestVariant = product.variants.reduce((min, curr) =>
              curr.price < min.price ? curr : min
            );
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
      } else {
        // Normal DB pagination + sorting
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
    } catch (error: any) {
      throw new Error(`Error filtering products: ${error?.message || error}`);
    }
  }
  

  async findOne(id: string) {
    try {
      return await this.prisma.product.findUnique({
        where: { id },
        include: { variants: true },
      });
    } catch (error) {
      throw new Error(`Error fetching product with id ${id}: ${error.message}`);
    }
  }

  async deleteOne(id: string) {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error deleting product with id ${id}: ${error.message}`);
    }
  }

  async updateProduct(
    productId: string,
    updateProductInput: UpdateProductInput,
  ) {
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
          qualities: updateProductInput.qualities.map((q) =>
            q.toLowerCase().trim(),
          ),
        }),
        ...(updateProductInput.caffeine && {
          caffeine: updateProductInput.caffeine.toLowerCase(),
        }),
        ...(updateProductInput.allegens && {
          allegens: updateProductInput.allegens.map((a) =>
            a.toLowerCase().trim(),
          ),
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
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async updateVariant(variantId: string, input: UpdateProductVariantInput) {
    try {
      return await this.prisma.variant.update({
        where: { id: variantId },
        data: {
          ...(input.size && { size: input.size }),
          ...(input.price !== undefined && { price: input.price }),
        },
      });
    } catch (error) {
      throw new Error(
        `Error updating variant with id ${variantId}: ${error.message}`,
      );
    }
  }

  async deleteVariant(variantId: string) {
    try {
      return await this.prisma.variant.delete({
        where: { id: variantId },
      });
    } catch (error) {
      throw new Error(
        `Error deleting variant with id ${variantId}: ${error.message}`,
      );
    }
  }
  async addVariant(productId: string, input: CreateVariantInput):Promise<Variant | ""> {
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
    } catch (error) {
      throw new Error(`Error adding variant to product: ${error.message}`);
    }
  }
  
}
