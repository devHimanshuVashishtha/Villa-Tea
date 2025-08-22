import { AuthService } from './auth.service';
import { LoginInput } from './dto/loginInput.dto';
import { JwtAuthResponse } from './dto/jwt-auth.response';
import { PrismaService } from 'src/prisma.service';
export declare class AuthResolver {
    private readonly authService;
    private prisma;
    constructor(authService: AuthService, prisma: PrismaService);
    login(loginInput: LoginInput): Promise<JwtAuthResponse>;
    verifyOtp(email: string, otp: string): Promise<JwtAuthResponse>;
    loginWithGoogle(idToken: string): Promise<JwtAuthResponse>;
    logoutUser(context: any): Promise<boolean>;
}
