import { UpdateUserInput, UpdateUserAddressInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma.service';
import { CreateUserAddressInput, CreateUserInput } from './dto/create-user.input';
import { User as PrismaUser } from 'generated/prisma';
import { Address, User, UserProfile } from './entities/user.entity';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserInput: CreateUserInput): Promise<{
        addresses: {
            pincode: number | null;
            city: string | null;
            state: string | null;
            country: string | null;
            street: string | null;
            landmark: string | null;
            isDefault: boolean;
            latitude: number | null;
            longitude: number | null;
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        profileImage: string | null;
        dateOfBirth: string | null;
        gender: string | null;
        id: string;
        role: import("generated/prisma").$Enums.Role;
        otp: string | null;
        otpExpiresAt: Date | null;
    }>;
    changePassword(userId: string, oldPassword: string, newPassword: string, confirmNewPassword: string): Promise<{
        message: string;
    }>;
    otpSentToEmail(email: string): Promise<{
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
    findOne(userId: string): Promise<PrismaUser | null>;
    getProfile(userId: string): Promise<UserProfile | null>;
    updateProfile(userId: string, updateUserInput: UpdateUserInput): Promise<User | null>;
    updateAddress(userId: string, updateUserAddressInput: UpdateUserAddressInput): Promise<Address | null>;
    addAddress(userId: string, address: CreateUserAddressInput): Promise<Address | null>;
    makeDefaultAddress(userId: string, addressFieldId: string): Promise<Address | null>;
    deleteUser(userId: string): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        profileImage: string | null;
        dateOfBirth: string | null;
        gender: string | null;
        id: string;
        role: import("generated/prisma").$Enums.Role;
        otp: string | null;
        otpExpiresAt: Date | null;
    }>;
    deleteAddress(addressId: string): Promise<{
        pincode: number | null;
        city: string | null;
        state: string | null;
        country: string | null;
        street: string | null;
        landmark: string | null;
        isDefault: boolean;
        latitude: number | null;
        longitude: number | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
