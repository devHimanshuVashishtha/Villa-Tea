import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload';
import { JwtAuthResponse } from './dto/jwt-auth.response';
import { OAuth2Client } from 'google-auth-library';
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Validate the user and send OTP
  async validateUser(email: string, password: string): Promise<JwtAuthResponse> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Invalid credentials');
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = new Date(Date.now() + 5 * 60 * 1000);

      await this.prisma.user.update({
        where: { email },
        data: { otp, otpExpiresAt: expires },
      });

      await this.sendOtpEmail(email, otp);

      return { access_token: '', requires2FA: true };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async sendOtpEmail(email: string, otp: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Login',
        text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new InternalServerErrorException('Failed to send OTP email');
    }
  }

  // Verify OTP and issue JWT
  async verifyOtp(email: string, otp: string): Promise<JwtAuthResponse> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (
        !user ||
        user.otp !== otp ||
        !user.otpExpiresAt ||
        new Date() > user.otpExpiresAt
      ) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      await this.prisma.user.update({
        where: { email },
        data: { otp: null, otpExpiresAt: null },
      });

      const payload = { sub: user.id, email: user.email, role: user.role };
      const token = this.jwtService.sign(payload);

      await this.prisma.userToken.deleteMany({ where: { userId: user.id } });

      await this.prisma.userToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      return { access_token: token, requires2FA: false };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async loginWithGoogle(idToken: string): Promise<JwtAuthResponse> {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const email = payload?.email;
      const firstName = payload?.given_name || 'User';
      const lastName = payload?.family_name || '';
      const profileImage = payload?.picture || '';

      if (!email) {
        throw new BadRequestException('Email not found in Google token');
      }
      if (!payload?.email_verified) {
        throw new BadRequestException('Google account email is not verified.');
      }

      let user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        const randomPassword = uuidv4();
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        user = await this.prisma.user.create({
          data: {
            email,
            firstName,
            lastName,
            phone: '',
            password: hashedPassword,
            profileImage,
          },
        });
      }

      const jwtPayload = { sub: user.id, email: user.email, role: user.role };
      const token = this.jwtService.sign(jwtPayload);

      await this.prisma.userToken.deleteMany({ where: { userId: user.id } });

      await this.prisma.userToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 1),
        },
      });

      return { access_token: token, requires2FA: false };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Logout
  async logout(token: string): Promise<boolean> {
    try {
      if (!token) {
        throw new BadRequestException('Token not found');
      }

      const deleted = await this.prisma.userToken.deleteMany({
        where: { token },
      });

      return deleted.count > 0;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
