import { UserService } from './user.service';
import { CreateUserAddressInput, CreateUserInput } from './dto/create-user.input';
import { UpdateUserAddressInput, UpdateUserInput } from './dto/update-user.input';
import { Address, User, UserProfile } from './entities/user.entity';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserInput: CreateUserInput): Promise<{
        addresses: {
            id: string;
            pincode: number | null;
            city: string | null;
            state: string | null;
            country: string | null;
            street: string | null;
            landmark: string | null;
            isDefault: boolean;
            latitude: number | null;
            longitude: number | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
        }[];
    } & {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        password: string;
        profileImage: string | null;
        dateOfBirth: string | null;
        gender: string | null;
        otp: string | null;
        otpExpiresAt: Date | null;
        role: import("generated/prisma").$Enums.Role;
    }>;
    sendOtpForForgotPassword(email: string): Promise<{
        output: string;
        email: string;
    }>;
    verifyForgotPasswordOtp(email: string, otp: string): Promise<{
        success: boolean;
        message: string;
        userId: string;
    }>;
    resetPassword(userId: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
    changeUserPassword(context: any, oldPassword: string, newPassword: string, confirmNewPassword: string): Promise<{
        message: string;
    }>;
    getUserProfile(context: any): Promise<UserProfile | null>;
    updateUserProfile(context: any, updateUserInput: UpdateUserInput): Promise<User | null>;
    updateUserAddress(context: any, updateUserAddressInput: UpdateUserAddressInput): Promise<Address | null>;
    addUserAddressByManualOrLiveLocation(context: any, createUserAddressInput: CreateUserAddressInput): Promise<Address | null>;
    makeDefaultAddress(context: any, addressFieldId: string): Promise<Address | null>;
    deleteAccount(context: any): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        password: string;
        profileImage: string | null;
        dateOfBirth: string | null;
        gender: string | null;
        otp: string | null;
        otpExpiresAt: Date | null;
        role: import("generated/prisma").$Enums.Role;
    }>;
    deleteUserAddress(addressId: string): Promise<{
        id: string;
        pincode: number | null;
        city: string | null;
        state: string | null;
        country: string | null;
        street: string | null;
        landmark: string | null;
        isDefault: boolean;
        latitude: number | null;
        longitude: number | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
