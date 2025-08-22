import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/loginInput.dto';
import { JwtAuthResponse } from './dto/jwt-auth.response';
import { BadRequestException, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService,
    private prisma: PrismaService) {}

  @Mutation(() => JwtAuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<JwtAuthResponse> {
    return this.authService.validateUser(
      loginInput.email,
      loginInput.password,
    );
  }

  @Mutation(() => JwtAuthResponse)
  async verifyOtp(
    @Args('email') email: string,
    @Args('otp') otp: string,
  ): Promise<JwtAuthResponse> {
    return this.authService.verifyOtp(email, otp);
  }

  @Mutation(() => JwtAuthResponse)
  async loginWithGoogle(
    @Args('idToken') idToken: string,
  ): Promise<JwtAuthResponse> {
    return this.authService.loginWithGoogle(idToken);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async logoutUser(@Context() context): Promise<boolean> {
    const req = context.req;
    const token = req.headers.authorization?.replace('Bearer ', '');
  
    return this.authService.logout(token);
  }
}
