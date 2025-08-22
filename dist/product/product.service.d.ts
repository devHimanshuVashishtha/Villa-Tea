import { CreateProductInput, CreateVariantInput, ProductFilterInput } from './dto/create-product.input';
import { PrismaService } from 'src/prisma.service';
import { UpdateProductInput, UpdateProductVariantInput } from './dto/update-product.input';
import { Variant } from './entities/product.entity';
export declare class ProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductInput: CreateProductInput): Promise<{
        variants: {
            id: string;
            size: string;
            price: number;
            productId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
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
    filterProducts(filters: ProductFilterInput, pageNumber: number | undefined, pageSize: number): Promise<{
        items: ({
            variants: {
                id: string;
                size: string;
                price: number;
                productId: string;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
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
    findOne(id: string): Promise<({
        variants: {
            id: string;
            size: string;
            price: number;
            productId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
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
    deleteOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
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
    updateProduct(productId: string, updateProductInput: UpdateProductInput): Promise<{
        variants: {
            id: string;
            size: string;
            price: number;
            productId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
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
    updateVariant(variantId: string, input: UpdateProductVariantInput): Promise<{
        id: string;
        size: string;
        price: number;
        productId: string;
    }>;
    deleteVariant(variantId: string): Promise<{
        id: string;
        size: string;
        price: number;
        productId: string;
    }>;
    addVariant(productId: string, input: CreateVariantInput): Promise<Variant | "">;
}
