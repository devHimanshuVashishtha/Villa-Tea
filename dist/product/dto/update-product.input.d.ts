import { CreateProductInput, CreateVariantInput } from './create-product.input';
declare const UpdateProductVariantInput_base: import("@nestjs/common").Type<Partial<CreateVariantInput>>;
export declare class UpdateProductVariantInput extends UpdateProductVariantInput_base {
    id: string;
}
declare const UpdateProductInput_base: import("@nestjs/common").Type<Partial<Omit<CreateProductInput, "variants">>>;
export declare class UpdateProductInput extends UpdateProductInput_base {
    id: string;
    variants?: UpdateProductVariantInput[];
}
export {};
