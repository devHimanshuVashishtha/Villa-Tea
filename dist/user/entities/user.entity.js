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
exports.ChangeUserPasswordResponse = exports.resetPasswordResponse = exports.verifyForgotPasswordOtpResponse = exports.sendOtpForForgotPasswordResponse = exports.UserProfile = exports.Address = exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
let User = class User {
    id;
    firstName;
    lastName;
    email;
    phone;
    password;
    profileImage;
    dateOfBirth;
    gender;
    addresses;
    role;
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "profileImage", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Address], { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "addresses", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
exports.User = User = __decorate([
    (0, graphql_1.ObjectType)()
], User);
let Address = class Address {
    id;
    pincode;
    userId;
    city;
    state;
    country;
    street;
    landmark;
    isDefault;
    latitude;
    longitude;
};
exports.Address = Address;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Address.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], Address.prototype, "pincode", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Address.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Address.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Address.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Address.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Address.prototype, "street", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Address.prototype, "landmark", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Address.prototype, "isDefault", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Object)
], Address.prototype, "latitude", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Object)
], Address.prototype, "longitude", void 0);
exports.Address = Address = __decorate([
    (0, graphql_1.ObjectType)()
], Address);
let UserProfile = class UserProfile {
    id;
    firstName;
    lastName;
    email;
    phone;
    profileImage;
    dateOfBirth;
    gender;
    addresses;
    role;
};
exports.UserProfile = UserProfile;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserProfile.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserProfile.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserProfile.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserProfile.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserProfile.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserProfile.prototype, "profileImage", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserProfile.prototype, "dateOfBirth", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserProfile.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Address], { nullable: true }),
    __metadata("design:type", Object)
], UserProfile.prototype, "addresses", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserProfile.prototype, "role", void 0);
exports.UserProfile = UserProfile = __decorate([
    (0, graphql_1.ObjectType)()
], UserProfile);
let sendOtpForForgotPasswordResponse = class sendOtpForForgotPasswordResponse {
    output;
    email;
};
exports.sendOtpForForgotPasswordResponse = sendOtpForForgotPasswordResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], sendOtpForForgotPasswordResponse.prototype, "output", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], sendOtpForForgotPasswordResponse.prototype, "email", void 0);
exports.sendOtpForForgotPasswordResponse = sendOtpForForgotPasswordResponse = __decorate([
    (0, graphql_1.ObjectType)()
], sendOtpForForgotPasswordResponse);
let verifyForgotPasswordOtpResponse = class verifyForgotPasswordOtpResponse {
    success;
    message;
    userId;
};
exports.verifyForgotPasswordOtpResponse = verifyForgotPasswordOtpResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], verifyForgotPasswordOtpResponse.prototype, "success", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], verifyForgotPasswordOtpResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], verifyForgotPasswordOtpResponse.prototype, "userId", void 0);
exports.verifyForgotPasswordOtpResponse = verifyForgotPasswordOtpResponse = __decorate([
    (0, graphql_1.ObjectType)()
], verifyForgotPasswordOtpResponse);
let resetPasswordResponse = class resetPasswordResponse {
    success;
    message;
};
exports.resetPasswordResponse = resetPasswordResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], resetPasswordResponse.prototype, "success", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], resetPasswordResponse.prototype, "message", void 0);
exports.resetPasswordResponse = resetPasswordResponse = __decorate([
    (0, graphql_1.ObjectType)()
], resetPasswordResponse);
let ChangeUserPasswordResponse = class ChangeUserPasswordResponse {
    message;
};
exports.ChangeUserPasswordResponse = ChangeUserPasswordResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ChangeUserPasswordResponse.prototype, "message", void 0);
exports.ChangeUserPasswordResponse = ChangeUserPasswordResponse = __decorate([
    (0, graphql_1.ObjectType)()
], ChangeUserPasswordResponse);
//# sourceMappingURL=user.entity.js.map