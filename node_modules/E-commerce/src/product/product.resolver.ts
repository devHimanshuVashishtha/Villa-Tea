import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { ProductService } from './product.service';
import {
  CreateProductInput,
  CreateVariantInput,
  ProductFilterInput,
} from './dto/create-product.input';
import { Product, Variant } from './entities/product.entity';
import { ProductPaginationResponse } from './entities/product-pagination.response';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateProductInput, UpdateProductVariantInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => ProductPaginationResponse)
  filterProducts(
    @Args('filters') filters: ProductFilterInput,
    @Args('pageNumber', { type: () => Float }) pageNumber: number,
    @Args('pageSize', { type: () => Float, defaultValue: 5 }) pageSize: number,
  ) {
    return this.productService.filterProducts(filters, pageNumber, pageSize);
  }

  @Query(() => Product)
  findProductById(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Product)
  deleteProductById(@Args('id') id: string) {
    return this.productService.deleteOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    productInput: UpdateProductInput,
  ) {
    return this.productService.updateProduct(productId, productInput);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Variant)
  async updateVariant(
    @Args('productId') variantId: string,
    updatedVariantInput: UpdateProductVariantInput,
  ) {
    return this.productService.updateVariant(variantId, updatedVariantInput);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Product)
  deleteVariantById(@Args('id') id: string) {
    return this.productService.deleteVariant(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Variant)
  async addVariantToEistingPRoduct(@Args('productId') productId:string, variantInput:CreateVariantInput
  ){
    return await this.productService.addVariant(productId,variantInput);
  }
}
