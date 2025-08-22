import { CreateContactusInput } from './dto/create-contactus.input';
import { PrismaService } from 'src/prisma.service';
export declare class ContactusService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createContactusInput: CreateContactusInput): Promise<{
        email: string;
        message: string;
        phone: string;
        id: string;
    }>;
}
