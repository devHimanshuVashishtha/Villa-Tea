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
exports.PaymentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const payment_service_1 = require("./payment.service");
const create_payment_input_1 = require("./dto/create-payment.input");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const payment_entity_1 = require("./entities/payment.entity");
let PaymentResolver = class PaymentResolver {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createOrder(context, input) {
        const userId = context.req.user.id;
        return this.paymentService.createOrder(userId, input.amount, input.currency);
    }
    async confirmOrder(context, razorpayOrderId, razorpayPaymentId, signature) {
        const userId = context.req.user.id;
        return this.paymentService.confirmOrder(userId, razorpayOrderId, razorpayPaymentId, signature);
    }
    async myOrders(context) {
        const userId = context.req.user.id;
        return this.paymentService.getOrdersByUserId(userId);
    }
};
exports.PaymentResolver = PaymentResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_payment_input_1.CreateOrderInput]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "createOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => payment_entity_1.Order),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('razorpayOrderId')),
    __param(2, (0, graphql_1.Args)('razorpayPaymentId')),
    __param(3, (0, graphql_1.Args)('signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "confirmOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [payment_entity_1.Order]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "myOrders", null);
exports.PaymentResolver = PaymentResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentResolver);
//# sourceMappingURL=payment.resolver.js.map