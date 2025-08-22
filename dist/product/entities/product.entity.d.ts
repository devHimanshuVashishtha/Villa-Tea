export declare class Variant {
    id: string;
    size: string;
    price: number;
}
export declare class Product {
    id: string;
    name: string;
    collection: string;
    flavour: string;
    origin: string;
    qualities: string[];
    caffeine: string;
    allegens: string[];
    isOrganic: boolean;
    isVegan: boolean;
    variants: Variant[];
}
