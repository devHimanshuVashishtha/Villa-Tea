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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const google_auth_library_1 = require("google-auth-library");
const nodemailer = require("nodemailer");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        try {
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new common_1.BadRequestException('Invalid credentials');
            }
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expires = new Date(Date.now() + 5 * 60 * 1000);
            await this.prisma.user.update({
                where: { email },
                data: { otp, otpExpiresAt: expires },
            });
            await this.sendOtpEmail(email, otp);
            return { access_token: '', requires2FA: true };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async sendOtpEmail(email, otp) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to send OTP email');
        }
    }
    async verifyOtp(email, otp) {
        try {
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (!user ||
                user.otp !== otp ||
                !user.otpExpiresAt ||
                new Date() > user.otpExpiresAt) {
                throw new common_1.BadRequestException('Invalid or expired OTP');
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async loginWithGoogle(idToken) {
        try {
            const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
                throw new common_1.BadRequestException('Email not found in Google token');
            }
            if (!payload?.email_verified) {
                throw new common_1.BadRequestException('Google account email is not verified.');
            }
            let user = await this.prisma.user.findUnique({ where: { email } });
            if (!user) {
                const randomPassword = (0, uuid_1.v4)();
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async logout(token) {
        try {
            if (!token) {
                throw new common_1.BadRequestException('Token not found');
            }
            const deleted = await this.prisma.userToken.deleteMany({
                where: { token },
            });
            return deleted.count > 0;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map