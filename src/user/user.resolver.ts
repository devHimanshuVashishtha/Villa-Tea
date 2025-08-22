// src/user/user.resolver.ts
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  CreateUserAddressInput,
  CreateUserInput,
} from './dto/create-user.input';
import {
  UpdateUserAddressInput,
  UpdateUserInput,
} from './dto/update-user.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Address, ChangeUserPasswordResponse, resetPasswordResponse, sendOtpForForgotPasswordResponse, User, UserProfile, verifyForgotPasswordOtpResponse } from './entities/user.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(()=>sendOtpForForgotPasswordResponse)
  async sendOtpForForgotPassword(
    @Args('email', { nullable: true }) email: string,
  ):Promise<{output:string,email:string}> {
    if (!email ) {
      throw new BadRequestException('email  is required');
    }

    return await this.userService.otpSentToEmail(email);
  }
  @Mutation(()=>verifyForgotPasswordOtpResponse)
  async verifyForgotPasswordOtp(
    @Args('email') email: string,
    @Args('otp') otp: string,
  ) :Promise<{success:boolean,message:string,userId:string}>{
    return await this.userService.verifyForgotPasswordOtp(email, otp);
  }
  @Mutation(()=>resetPasswordResponse)
  async resetPassword(
    @Args('userId') userId: string,
    @Args('newPassword') newPassword: string,
  ):Promise<{success:boolean,message:string}> {
    return await this.userService.resetPassword(userId, newPassword);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ChangeUserPasswordResponse)
  changeUserPassword(
    @Context() context,
    @Args('oldPassword') oldPassword: string,
    @Args('newPassword') newPassword: string,
    @Args('confirmNewPassword') confirmNewPassword: string,
  ) {
    const userId = context.req.user.id;

    return this.userService.changePassword(
      userId,
      oldPassword,
      newPassword,
      confirmNewPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserProfile)
  getUserProfile(@Context() context) {
    const userId: string = context.req.user.id;
    return this.userService.getProfile(userId);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUserProfile(@Context() context, updateUserInput: UpdateUserInput) {
    const userId: string = context.req.user.id;
    return this.userService.updateProfile(userId, updateUserInput);
  }
  @Mutation(() => Address)
  @UseGuards(JwtAuthGuard)
  updateUserAddress(
    @Context() context,
    @Args('updateUserAddressInput')
    updateUserAddressInput: UpdateUserAddressInput,
  ): Promise<Address | null> {
    const userId: string = context.req.user.id;
    return this.userService.updateAddress(userId, updateUserAddressInput);
  }
  @Mutation(() => Address)
  @UseGuards(JwtAuthGuard)
  addUserAddressByManualOrLiveLocation(
    @Context() context,
    @Args('createUserAddressInput')
    createUserAddressInput: CreateUserAddressInput,
  ): Promise<Address | null> {
    const userId: string = context.req.user.id;
    return this.userService.addAddress(userId, createUserAddressInput);
  }
  @Mutation(() => Address)
  @UseGuards(JwtAuthGuard)
  makeDefaultAddress(
    @Context() context,
    @Args('addressFieldId') addressFieldId: string,
  ) {
    const userId: string = context.req.user.id;
    return this.userService.makeDefaultAddress(userId, addressFieldId);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  deleteAccount(@Context() context) {
    const userId: string = context.req.user.id;
    return this.userService.deleteUser(userId);
  }
  @Mutation(() => Address)
  @UseGuards(JwtAuthGuard)
  deleteUserAddress(@Args('addressId') addressId: string) {
    return this.userService.deleteAddress(addressId);
  }
}
