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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const Razorpay = require("razorpay");
const crypto = require("crypto");
let PaymentService = class PaymentService {
    prisma;
    razorpay;
    constructor(prisma) {
        this.prisma = prisma;
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    async createOrder(userId, amount, currency = 'INR') {
        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_order_${Date.now()}`,
        };
        try {
            const order = await this.razorpay.orders.create(options);
            if (!order || !order.id) {
                throw new common_1.InternalServerErrorException('Razorpay order creation failed');
            }
            const payment = await this.prisma.payment.create({
                data: {
                    razorpayOrderId: order.id,
                    razorpayPaymentId: null,
                    amount: order.amount / 100,
                    currency: order.currency,
                    receipt: order.receipt,
                    status: 'created',
                    userId: userId || null,
                },
            });
            return order.id;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not create Razorpay order: ' + error.message);
        }
    }
    async confirmOrder(userId, razorpayOrderId, razorpayPaymentId, signature) {
        try {
            const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
            if (!RAZORPAY_KEY_SECRET) {
                throw new common_1.BadRequestException('Invalid Razorpay secret key');
            }
            const expectedSignature = crypto
                .createHmac('sha256', RAZORPAY_KEY_SECRET)
                .update(razorpayOrderId + '|' + razorpayPaymentId)
                .digest('hex');
            if (expectedSignature !== signature) {
                throw new common_1.BadRequestException('Payment signature verification failed');
            }
            const payment = await this.prisma.payment.update({
                where: { razorpayOrderId },
                data: {
                    status: 'paid',
                    razorpayPaymentId,
                },
            });
            const cart = await this.prisma.cart.findUnique({
                where: { userId },
                include: {
                    items: { include: { variant: true } },
                },
            });
            if (!cart) {
                throw new common_1.NotFoundException('Cart not found for user');
            }
            if (cart.items.length === 0) {
                throw new common_1.BadRequestException('Cart is empty');
            }
            const total = cart.items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
            const order = await this.prisma.order.create({
                data: {
                    userId,
                    total,
                    status: 'paid',
                    paymentId: payment.id,
                    items: {
                        create: cart.items.map((item) => ({
                            variantId: item.variantId,
                            quantity: item.quantity,
                        })),
                    },
                },
            });
            await this.prisma.cartItem.deleteMany({
                where: { cartId: cart.id },
            });
            return order;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Could not confirm the payment: ' + error.message);
        }
    }
    async getOrdersByUserId(userId) {
        try {
            return await this.prisma.order.findMany({
                where: { userId },
                include: {
                    items: {
                        include: {
                            variant: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch orders: ' + error.message);
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map