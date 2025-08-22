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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const create_user_input_1 = require("./dto/create-user.input");
const update_user_input_1 = require("./dto/update-user.input");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
let UserResolver = class UserResolver {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    createUser(createUserInput) {
        return this.userService.create(createUserInput);
    }
    async sendOtpForForgotPassword(email) {
        if (!email) {
            throw new common_1.BadRequestException('email  is required');
        }
        return await this.userService.otpSentToEmail(email);
    }
    async verifyForgotPasswordOtp(email, otp) {
        return await this.userService.verifyForgotPasswordOtp(email, otp);
    }
    async resetPassword(userId, newPassword) {
        return await this.userService.resetPassword(userId, newPassword);
    }
    changeUserPassword(context, oldPassword, newPassword, confirmNewPassword) {
        const userId = context.req.user.id;
        return this.userService.changePassword(userId, oldPassword, newPassword, confirmNewPassword);
    }
    getUserProfile(context) {
        const userId = context.req.user.id;
        return this.userService.getProfile(userId);
    }
    updateUserProfile(context, updateUserInput) {
        const userId = context.req.user.id;
        return this.userService.updateProfile(userId, updateUserInput);
    }
    updateUserAddress(context, updateUserAddressInput) {
        const userId = context.req.user.id;
        return this.userService.updateAddress(userId, updateUserAddressInput);
    }
    addUserAddressByManualOrLiveLocation(context, createUserAddressInput) {
        const userId = context.req.user.id;
        return this.userService.addAddress(userId, createUserAddressInput);
    }
    makeDefaultAddress(context, addressFieldId) {
        const userId = context.req.user.id;
        return this.userService.makeDefaultAddress(userId, addressFieldId);
    }
    deleteAccount(context) {
        const userId = context.req.user.id;
        return this.userService.deleteUser(userId);
    }
    deleteUserAddress(addressId) {
        return this.userService.deleteAddress(addressId);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.sendOtpForForgotPasswordResponse),
    __param(0, (0, graphql_1.Args)('email', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "sendOtpForForgotPassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.verifyForgotPasswordOtpResponse),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "verifyForgotPasswordOtp", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.resetPasswordResponse),
    __param(0, (0, graphql_1.Args)('userId')),
    __param(1, (0, graphql_1.Args)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => user_entity_1.ChangeUserPasswordResponse),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('oldPassword')),
    __param(2, (0, graphql_1.Args)('newPassword')),
    __param(3, (0, graphql_1.Args)('confirmNewPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "changeUserPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => user_entity_1.UserProfile),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getUserProfile", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateUserProfile", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.Address),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('updateUserAddressInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_input_1.UpdateUserAddressInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUserAddress", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.Address),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('createUserAddressInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_input_1.CreateUserAddressInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addUserAddressByManualOrLiveLocation", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.Address),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('addressFieldId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "makeDefaultAddress", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "deleteAccount", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.Address),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('addressId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "deleteUserAddress", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map