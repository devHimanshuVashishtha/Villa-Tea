import { ProductService } from './product.service';
import { CreateProductInput, CreateVariantInput, ProductFilterInput } from './dto/create-product.input';
import { Variant } from './entities/product.entity';
import { UpdateProductInput, UpdateProductVariantInput } from './dto/update-product.input';
export declare class ProductResolver {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(createProductInput: CreateProductInput): Promise<{
        variants: {
            id: string;
            size: string;
            price: number;
            productId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string;
        collection: string;
        flavour: string;
        origin: string;
        qualities: string[];
        caffeine: string;
        allegens: string[];
        isOrganic: boolean;
        isVegan: boolean;
    }>;
    filterProducts(filters: ProductFilterInput, pageNumber: number, pageSize: number): Promise<{
        items: ({
            variants: {
                id: string;
                size: string;
                price: number;
                productId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            image: string;
            collection: string;
            flavour: string;
            origin: string;
            qualities: string[];
            caffeine: string;
            allegens: string[];
            isOrganic: boolean;
            isVegan: boolean;
        })[];
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
    }>;
    findProductById(id: string): Promise<({
        variants: {
            id: string;
            size: string;
            price: number;
            productId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string;
        collection: string;
        flavour: string;
        origin: string;
        qualities: string[];
        caffeine: string;
        allegens: string[];
        isOrganic: boolean;
        isVegan: boolean;
    }) | null>;
    deleteProductById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string;
        collection: string;
        flavour: string;
        origin: string;
        qualities: string[];
        caffeine: string;
        allegens: string[];
        isOrganic: boolean;
        isVegan: boolean;
    }>;
    updateProduct(productId: string, productInput: UpdateProductInput): Promise<{
        variants: {
            id: string;
            size: string;
            price: number;
            productId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string;
        collection: string;
        flavour: string;
        origin: string;
        qualities: string[];
        caffeine: string;
        allegens: string[];
        isOrganic: boolean;
        isVegan: boolean;
    }>;
    updateVariant(variantId: string, updatedVariantInput: UpdateProductVariantInput): Promise<{
        id: string;
        size: string;
        price: number;
        productId: string;
    }>;
    deleteVariantById(id: string): Promise<{
        id: string;
        size: string;
        price: number;
        productId: string;
    }>;
    addVariantToEistingPRoduct(productId: string, variantInput: CreateVariantInput): Promise<"" | Variant>;
}
