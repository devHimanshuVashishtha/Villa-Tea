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
exports.CoupounResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const coupoun_service_1 = require("./coupoun.service");
const coupoun_entity_1 = require("./entities/coupoun.entity");
const create_coupoun_input_1 = require("./dto/create-coupoun.input");
const apply_coupon_response_entity_1 = require("./entities/apply-coupon-response.entity");
const apply_coupon_input_1 = require("./dto/apply-coupon.input");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
let CoupounResolver = class CoupounResolver {
    couponService;
    constructor(couponService) {
        this.couponService = couponService;
    }
    createCoupon(input) {
        return this.couponService.createCoupon(input);
    }
    applyCoupon(context, input) {
        const userId = context.req.user.id;
        return this.couponService.applyCoupon(userId, input);
    }
};
exports.CoupounResolver = CoupounResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, graphql_1.Mutation)(() => coupoun_entity_1.Coupoun),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coupoun_input_1.CreateCouponInput]),
    __metadata("design:returntype", void 0)
], CoupounResolver.prototype, "createCoupon", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => apply_coupon_response_entity_1.ApplyCouponResponse),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, apply_coupon_input_1.ApplyCouponInput]),
    __metadata("design:returntype", void 0)
], CoupounResolver.prototype, "applyCoupon", null);
exports.CoupounResolver = CoupounResolver = __decorate([
    (0, graphql_1.Resolver)(() => coupoun_entity_1.Coupoun),
    __metadata("design:paramtypes", [coupoun_service_1.CoupounService])
], CoupounResolver);
//# sourceMappingURL=coupoun.resolver.js.map