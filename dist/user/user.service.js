"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const reverseGeocode_1 = require("../common/utils/reverseGeocode");
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidPhone(phone) {
    const phoneRegex = /^\+?\d{1,4}[- ]?\d{10}$/;
    return phoneRegex.test(phone);
}
function isGeoLocationFilled(input) {
    return (typeof input.latitude === 'number' && typeof input.longitude === 'number');
}
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserInput) {
        try {
            const { firstName, lastName, phone, email, password, profileImage, dateOfBirth, gender, addresses, } = createUserInput;
            if (!password) {
                throw new common_1.BadRequestException('Password is compulsory');
            }
            if (!isValidEmail(email)) {
                throw new common_1.BadRequestException('Invalid email format');
            }
            if (!isValidPhone(phone)) {
                throw new common_1.BadRequestException('Invalid phone number. Must be 10 digits with country code');
            }
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    OR: [{ email }, { phone }],
                },
            });
            if (existingUser) {
                throw new common_1.BadRequestException('Please enter unique email and phone');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            let cleanedAddresses = await Promise.all((addresses || []).map(async (address) => {
                let finalAddress;
                if (isGeoLocationFilled(address)) {
                    const geoData = await (0, reverseGeocode_1.reverseGeocode)(address.latitude, address.longitude);
                    finalAddress = {
                        ...geoData,
                        ...address,
                        latitude: address.latitude,
                        longitude: address.longitude,
                        landmark: geoData.landmark ?? null,
                        pincode: geoData.pincode ?? null,
                        city: geoData.city ?? null,
                        state: geoData.state ?? null,
                        street: geoData.street ?? null,
                        country: geoData.country ?? null,
                    };
                }
                else {
                    finalAddress = {
                        ...address,
                        latitude: null,
                        longitude: null,
                        landmark: address.landmark ?? null,
                        pincode: address.pincode ?? null,
                        city: address.city ?? null,
                        state: address.state ?? null,
                        street: address.street ?? null,
                        country: address.country ?? null,
                    };
                }
                return finalAddress;
            }));
            let defaultAssigned = false;
            cleanedAddresses = cleanedAddresses.map((addr) => {
                if (addr.isDefault && !defaultAssigned) {
                    defaultAssigned = true;
                    return { ...addr, isDefault: true };
                }
                return { ...addr, isDefault: false };
            });
            if (!defaultAssigned && cleanedAddresses.length > 0) {
                cleanedAddresses[0].isDefault = true;
            }
            const newUser = await this.prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    phone,
                    email,
                    password: hashedPassword,
                    profileImage,
                    dateOfBirth,
                    gender,
                    addresses: cleanedAddresses.length > 0
                        ? {
                            create: cleanedAddresses,
                        }
                        : undefined,
                },
                include: {
                    addresses: true,
                },
            });
            return newUser;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Error creating user: ${error.message}`);
        }
    }
    async changePassword(userId, oldPassword, newPassword, confirmNewPassword) {
        try {
            if (newPassword !== confirmNewPassword) {
                throw new common_1.BadRequestException('The new password and confirm password do not match');
            }
            const existingUser = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!existingUser) {
                throw new common_1.NotFoundException('User not found');
            }
            const isValidatePassword = await bcrypt.compare(oldPassword, existingUser.password);
            if (!isValidatePassword) {
                throw new common_1.UnauthorizedException('Incorrect old password');
            }
            const isNewAndOldPasswordSame = await bcrypt.compare(newPassword, existingUser.password);
            if (isNewAndOldPasswordSame) {
                throw new common_1.BadRequestException("The old and new password can't be the same");
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.prisma.user.update({
                where: { id: userId },
                data: { password: hashedPassword },
            });
            return { message: 'Password updated successfully' };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`Error changing password: ${error.message}`);
        }
    }
    async otpSentToEmail(email) {
        try {
            let existingUser = null;
            if (email) {
                existingUser = await this.prisma.user.findUnique({
                    where: { email },
                    include: { addresses: true },
                });
            }
            else {
                throw new common_1.BadRequestException('Either email  must be provided');
            }
            if (!existingUser) {
                throw new common_1.NotFoundException('User not registered with this email or phone number');
            }
            const userEmail = existingUser.email;
            const generateSixDigitPassword = () => Math.floor(100000 + Math.random() * 900000).toString();
            const otp = generateSixDigitPassword();
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: 'Your Verification Code',
                text: `Your verification code is: ${otp}`,
            };
            await transporter.sendMail(mailOptions);
            await this.prisma.passwordResetToken.upsert({
                where: { userId: existingUser.id },
                update: {
                    otp,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                    used: false,
                },
                create: {
                    userId: existingUser.id,
                    otp,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                },
            });
            return { output: 'OTP sent to user email', email: userEmail };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Error sending OTP: ${error.message}`);
        }
    }
    async verifyForgotPasswordOtp(email, otp) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found with provided email');
            }
            const record = await this.prisma.passwordResetToken.findFirst({
                where: {
                    userId: user.id,
                    otp,
                    used: false,
                    expiresAt: {
                        gte: new Date(),
                    },
                },
            });
            if (!record) {
                throw new common_1.BadRequestException('Invalid or expired OTP');
            }
            await this.prisma.passwordResetToken.update({
                where: { id: record.id },
                data: { used: true },
            });
            return {
                success: true,
                message: 'OTP verified successfully',
                userId: user.id,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException)
                throw error;
            throw new common_1.InternalServerErrorException(`OTP verification failed: ${error.message}`);
        }
    }
    async resetPassword(userId, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.prisma.user.update({
                where: { id: userId },
                data: { password: hashedPassword },
            });
            return { success: true, message: 'Password reset successful' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Password reset failed: ${error.message}`);
        }
    }
    async findOne(userId) {
        try {
            return await this.prisma.user.findUnique({
                where: { id: userId },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Find user failed: ${error.message}`);
        }
    }
    async getProfile(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { addresses: true },
            });
            if (!user) {
                return null;
            }
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Get profile failed: ${error.message}`);
        }
    }
    async updateProfile(userId, updateUserInput) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!existingUser) {
                throw new common_1.NotFoundException('User not found');
            }
            const { id, addresses, ...data } = updateUserInput;
            return await this.prisma.user.update({
                where: { id: userId },
                data,
                include: { addresses: true },
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException(`Update profile failed: ${error.message}`);
        }
    }
    async updateAddress(userId, updateUserAddressInput) {
        try {
            const { id, isDefault, ...updateData } = updateUserAddressInput;
            const existingAddress = await this.prisma.address.findUnique({
                where: { id },
            });
            if (!existingAddress) {
                throw new common_1.NotFoundException('Address not found for this user');
            }
            if (isDefault === true) {
                await this.prisma.address.updateMany({
                    where: {
                        userId,
                        NOT: { id },
                    },
                    data: { isDefault: false },
                });
            }
            const updatedAddress = await this.prisma.address.update({
                where: { id },
                data: {
                    ...updateData,
                    isDefault: isDefault ?? existingAddress.isDefault,
                },
            });
            return updatedAddress;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException(`Update address failed: ${error.message}`);
        }
    }
    async addAddress(userId, address) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const hasCoordinates = address.latitude !== null && address.longitude !== null;
            const hasAddressFields = !!address.street ||
                !!address.city ||
                !!address.state ||
                !!address.country ||
                !!address.pincode ||
                !!address.landmark;
            if (hasCoordinates && hasAddressFields) {
                throw new common_1.BadRequestException('Provide either coordinates OR address fields, not both');
            }
            if (!hasCoordinates && !hasAddressFields) {
                throw new common_1.BadRequestException('Please provide either coordinates OR address fields');
            }
            let finalAddress;
            if (hasCoordinates) {
                const geoData = await (0, reverseGeocode_1.reverseGeocode)(address.latitude, address.longitude);
                finalAddress = {
                    ...geoData,
                    ...address,
                    latitude: address.latitude,
                    longitude: address.longitude,
                    landmark: geoData.landmark ?? null,
                    pincode: geoData.pincode ?? null,
                    city: geoData.city ?? null,
                    state: geoData.state ?? null,
                    street: geoData.street ?? null,
                    country: geoData.country ?? null,
                };
            }
            else {
                finalAddress = {
                    ...address,
                    latitude: null,
                    longitude: null,
                    landmark: address.landmark ?? null,
                    pincode: address.pincode ?? null,
                    city: address.city ?? null,
                    state: address.state ?? null,
                    street: address.street ?? null,
                    country: address.country ?? null,
                };
            }
            if (address.isDefault) {
                await this.prisma.address.updateMany({
                    where: { userId },
                    data: { isDefault: false },
                });
            }
            const newAddress = await this.prisma.address.create({
                data: {
                    ...finalAddress,
                    user: { connect: { id: userId } },
                    isDefault: address.isDefault ?? false,
                },
            });
            return newAddress;
        }
        catch (error) {
            throw new Error(`Error while adding address: ${error.message}`);
        }
    }
    async makeDefaultAddress(userId, addressFieldId) {
        try {
            const address = await this.prisma.address.findUnique({
                where: { id: addressFieldId },
            });
            if (!address) {
                throw new common_1.NotFoundException('Address not found for this user');
            }
            await this.prisma.address.updateMany({
                where: {
                    userId,
                    NOT: { id: addressFieldId },
                },
                data: { isDefault: false },
            });
            const updatedAddress = await this.prisma.address.update({
                where: { id: addressFieldId },
                data: { isDefault: true },
            });
            return updatedAddress;
        }
        catch (error) {
            throw new Error(`Error while setting default address: ${error.message}`);
        }
    }
    async deleteUser(userId) {
        try {
            const user = await this.prisma.user.delete({
                where: { id: userId },
            });
            return user;
        }
        catch (error) {
            throw new Error(`Error while deleting user: ${error.message}`);
        }
    }
    async deleteAddress(addressId) {
        try {
            const address = await this.prisma.address.delete({
                where: { id: addressId },
            });
            return address;
        }
        catch (error) {
            throw new Error(`Error while deleting address: ${error.message}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map