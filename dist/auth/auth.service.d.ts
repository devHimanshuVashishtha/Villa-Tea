import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthResponse } from './dto/jwt-auth.response';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<JwtAuthResponse>;
    private sendOtpEmail;
    verifyOtp(email: string, otp: string): Promise<JwtAuthResponse>;
    loginWithGoogle(idToken: string): Promise<JwtAuthResponse>;
    logout(token: string): Promise<boolean>;
}
