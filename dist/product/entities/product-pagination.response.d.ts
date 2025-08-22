import { Product } from './product.entity';
export declare class ProductPaginationResponse {
    items: Product[];
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
}
