export declare class CreateUserAddressInput {
    pincode?: number | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    street?: string | null;
    landmark?: string | null;
    isDefault?: boolean;
    latitude?: number | null;
    longitude?: number | null;
}
export declare class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    profileImage?: string;
    dateOfBirth?: string;
    gender?: string;
    addresses?: CreateUserAddressInput[];
}
