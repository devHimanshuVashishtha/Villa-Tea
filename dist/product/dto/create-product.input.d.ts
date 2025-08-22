export declare class CreateVariantInput {
    size: string;
    price: number;
}
export declare class CreateProductInput {
    image: string;
    name: string;
    collection: string;
    flavour: string;
    origin: string;
    qualities: string[];
    caffeine: string;
    allegens: string[];
    isOrganic: boolean;
    isVegan: boolean;
    variants: CreateVariantInput[];
}
export declare class ProductFilterInput {
    collection?: string;
    flavour?: string;
    origin?: string;
    qualities?: string[];
    caffeine?: string;
    allegens?: string[];
    isOrganic?: boolean;
    isVegan?: boolean;
    sortBy?: 'AZ' | 'ZA' | 'PRICE_LOW_HIGH' | 'PRICE_HIGH_LOW';
}
