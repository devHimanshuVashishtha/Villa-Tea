import { PrismaService } from 'src/prisma.service';
export declare class WishlistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, productId: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
    }>;
    findAll(userId: string): Promise<{
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
    }[]>;
    deleteAll(userId: string): Promise<number>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
    }>;
}
