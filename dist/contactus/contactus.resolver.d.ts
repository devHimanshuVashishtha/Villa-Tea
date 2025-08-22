import { ContactusService } from './contactus.service';
import { CreateContactusInput } from './dto/create-contactus.input';
export declare class ContactusResolver {
    private readonly contactusService;
    constructor(contactusService: ContactusService);
    createContactUs(createContactusInput: CreateContactusInput): Promise<{
        email: string;
        message: string;
        phone: string;
        id: string;
    }>;
}
