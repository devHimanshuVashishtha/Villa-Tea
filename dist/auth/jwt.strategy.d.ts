import { AuthService } from './auth.service';
import { JwtPayload } from './dto/jwt-payload';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    private readonly userService;
    private readonly prisma;
    constructor(authService: AuthService, userService: UserService, prisma: PrismaService);
    validate(req: Request, payload: JwtPayload): Promise<{
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
}
export {};
