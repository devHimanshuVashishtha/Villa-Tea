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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const loginInput_dto_1 = require("./dto/loginInput.dto");
const jwt_auth_response_1 = require("./dto/jwt-auth.response");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const prisma_service_1 = require("../prisma.service");
let AuthResolver = class AuthResolver {
    authService;
    prisma;
    constructor(authService, prisma) {
        this.authService = authService;
        this.prisma = prisma;
    }
    async login(loginInput) {
        return this.authService.validateUser(loginInput.email, loginInput.password);
    }
    async verifyOtp(email, otp) {
        return this.authService.verifyOtp(email, otp);
    }
    async loginWithGoogle(idToken) {
        return this.authService.loginWithGoogle(idToken);
    }
    async logoutUser(context) {
        const req = context.req;
        const token = req.headers.authorization?.replace('Bearer ', '');
        return this.authService.logout(token);
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Mutation)(() => jwt_auth_response_1.JwtAuthResponse),
    __param(0, (0, graphql_1.Args)('loginInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginInput_dto_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => jwt_auth_response_1.JwtAuthResponse),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "verifyOtp", null);
__decorate([
    (0, graphql_1.Mutation)(() => jwt_auth_response_1.JwtAuthResponse),
    __param(0, (0, graphql_1.Args)('idToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "loginWithGoogle", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logoutUser", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        prisma_service_1.PrismaService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map