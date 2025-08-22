// src/user/user.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  UpdateUserInput,
  UpdateUserAddressInput,
} from './dto/update-user.input';
import { PrismaService } from 'src/prisma.service';
import {
  CreateUserAddressInput,
  CreateUserInput,
} from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { User as PrismaUser } from 'generated/prisma';
import * as nodemailer from 'nodemailer';
import { Address, User, UserProfile } from './entities/user.entity';
import { reverseGeocode } from 'src/common/utils/reverseGeocode';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?\d{1,4}[- ]?\d{10}$/;
  return phoneRegex.test(phone);
}

function isGeoLocationFilled(input: CreateUserAddressInput): boolean {
  return (
    typeof input.latitude === 'number' && typeof input.longitude === 'number'
  );
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const {
        firstName,
        lastName,
        phone,
        email,
        password,
        profileImage,
        dateOfBirth,
        gender,
        addresses,
      } = createUserInput;
  
      // Basic validations
      if (!password) {
        throw new BadRequestException('Password is compulsory');
      }
  
      if (!isValidEmail(email)) {
        throw new BadRequestException('Invalid email format');
      }
  
      if (!isValidPhone(phone)) {
        throw new BadRequestException(
          'Invalid phone number. Must be 10 digits with country code',
        );
      }
  
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });
  
      if (existingUser) {
        throw new BadRequestException('Please enter unique email and phone');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Process and clean addresses
      let cleanedAddresses = await Promise.all(
        (addresses || []).map(async (address) => {
          let finalAddress: any;
  
          if (isGeoLocationFilled(address)) {
            const geoData = await reverseGeocode(
              address.latitude!,
              address.longitude!,
            );
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
          } else {
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
        }),
      );
  
      let defaultAssigned = false;
      cleanedAddresses = cleanedAddresses.map((addr) => {
        if (addr.isDefault && !defaultAssigned) {
          defaultAssigned = true;
          return { ...addr, isDefault: true };
        }
        return { ...addr, isDefault: false };
      });
  
      // If none is marked default, make the first one default
      if (!defaultAssigned && cleanedAddresses.length > 0) {
        cleanedAddresses[0].isDefault = true;
      }
  
      // Create user
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
          addresses:
            cleanedAddresses.length > 0
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
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating user: ${error.message}`,
      );
    }
  }
  
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string,
  ) {
    try {
      if (newPassword !== confirmNewPassword) {
        throw new BadRequestException('The new password and confirm password do not match');
      }
  
      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
  
      const isValidatePassword = await bcrypt.compare(
        oldPassword,
        existingUser.password,
      );
      if (!isValidatePassword) {
        throw new UnauthorizedException('Incorrect old password');
      }
  
      const isNewAndOldPasswordSame = await bcrypt.compare(
        newPassword,
        existingUser.password,
      );
      if (isNewAndOldPasswordSame) {
        throw new BadRequestException("The old and new password can't be the same");
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
  
      return { message: 'Password updated successfully' };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error changing password: ${error.message}`,
      );
    }
  }
  
  async otpSentToEmail(
    email: string,
  ): Promise<{ output: string; email: string }> {
    try {
      let existingUser: User | null = null;
  
      if (email) {
        existingUser = await this.prisma.user.findUnique({
          where: { email },
          include: { addresses: true },
        });
      } else {
        throw new BadRequestException('Either email  must be provided');
      }
  
      if (!existingUser) {
        throw new NotFoundException('User not registered with this email or phone number');
      }
  
      const userEmail = existingUser.email;
  
      const generateSixDigitPassword = () =>
        Math.floor(100000 + Math.random() * 900000).toString();
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
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
          used: false,
        },
        create: {
          userId: existingUser.id,
          otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
  
      return { output: 'OTP sent to user email', email: userEmail };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error sending OTP: ${error.message}`,
      );
    }
  }
  
  async verifyForgotPasswordOtp(
    email: string,
    otp: string,
  ): Promise<{ success: boolean; message: string; userId: string }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        throw new BadRequestException('User not found with provided email');
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
        throw new BadRequestException('Invalid or expired OTP');
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
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(`OTP verification failed: ${error.message}`);
    }
  }
  
  async resetPassword(
    userId: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
  
      return { success: true, message: 'Password reset successful' };
    } catch (error) {
      throw new InternalServerErrorException(`Password reset failed: ${error.message}`);
    }
  }
  
  async findOne(userId: string): Promise<PrismaUser | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Find user failed: ${error.message}`);
    }
  }
  
  async getProfile(userId: string): Promise<UserProfile | null> {
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
    } catch (error) {
      throw new InternalServerErrorException(`Get profile failed: ${error.message}`);
    }
  }
  
  async updateProfile(
    userId: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User | null> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
  
      const { id, addresses, ...data } = updateUserInput;
  
      return await this.prisma.user.update({
        where: { id: userId },
        data,
        include: { addresses: true },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Update profile failed: ${error.message}`);
    }
  }
  
  async updateAddress(
    userId: string,
    updateUserAddressInput: UpdateUserAddressInput,
  ): Promise<Address | null> {
    try {
      const { id, isDefault, ...updateData } = updateUserAddressInput;
  
      const existingAddress = await this.prisma.address.findUnique({
        where: { id },
      });
  
      if (!existingAddress) {
        throw new NotFoundException('Address not found for this user');
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
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Update address failed: ${error.message}`);
    }
  }
  
  async addAddress(
    userId: string,
    address: CreateUserAddressInput,
  ): Promise<Address | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const hasCoordinates =
        address.latitude !== null && address.longitude !== null;
      const hasAddressFields =
        !!address.street ||
        !!address.city ||
        !!address.state ||
        !!address.country ||
        !!address.pincode ||
        !!address.landmark;
  
      if (hasCoordinates && hasAddressFields) {
        throw new BadRequestException(
          'Provide either coordinates OR address fields, not both',
        );
      }
  
      if (!hasCoordinates && !hasAddressFields) {
        throw new BadRequestException(
          'Please provide either coordinates OR address fields',
        );
      }
  
      let finalAddress: any;
  
      if (hasCoordinates) {
        const geoData = await reverseGeocode(
          address.latitude!,
          address.longitude!,
        );
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
      } else {
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
    } catch (error) {
      throw new Error(`Error while adding address: ${error.message}`);
    }
  }
  

  async makeDefaultAddress(
    userId: string,
    addressFieldId: string,
  ): Promise<Address | null> {
    try {
      const address = await this.prisma.address.findUnique({
        where: { id: addressFieldId },
      });
  
      if (!address) {
        throw new NotFoundException('Address not found for this user');
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
    } catch (error) {
      throw new Error(`Error while setting default address: ${error.message}`);
    }
  }
  
  async deleteUser(userId: string) {
    try {
      const user = await this.prisma.user.delete({
        where: { id: userId },
      });
      return user;
    } catch (error) {
      throw new Error(`Error while deleting user: ${error.message}`);
    }
  }
  
  async deleteAddress(addressId: string) {
    try {
      const address = await this.prisma.address.delete({
        where: { id: addressId },
      });
      return address;
    } catch (error) {
      throw new Error(`Error while deleting address: ${error.message}`);
    }
  }
  
}
