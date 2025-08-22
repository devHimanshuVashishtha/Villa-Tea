export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    profileImage: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    addresses: Address[] | null;
    role: string | null;
}
export declare class Address {
    id: string;
    pincode: number | null;
    userId: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    street: string | null;
    landmark: string | null;
    isDefault: boolean;
    latitude: number | null;
    longitude: number | null;
}
export declare class UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    addresses: Address[] | null;
    role: string | null;
}
export declare class sendOtpForForgotPasswordResponse {
    output: string;
    email: string;
}
export declare class verifyForgotPasswordOtpResponse {
    success: string;
    message: string;
    userId: string;
}
export declare class resetPasswordResponse {
    success: string;
    message: string;
}
export declare class ChangeUserPasswordResponse {
    message: string;
}
