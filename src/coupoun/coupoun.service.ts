import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateCoupounInput } from './dto/update-coupoun.input';
import { CreateCouponInput } from './dto/create-coupoun.input';
import { PrismaService } from 'src/prisma.service';
import { ApplyCouponInput } from './dto/apply-coupon.input';
import { ApplyCouponResponse } from './entities/apply-coupon-response.entity';

@Injectable()
export class CoupounService {
  constructor(private readonly prisma: PrismaService) {}

  async createCoupon(input: CreateCouponInput) {
    try {
      return await this.prisma.coupon.create({
        data: {
          code: input.code,
          discount: input.discount,
          type: input.type,
          minimumAmount: input?.minimumAmount,
          size: input?.size,
          expiresAt: input.expiresAt,
          appliesToAll: input.appliesToAll,
          products: input.productIds
            ? {
                connect: input.productIds.map((id) => ({ id })),
              }
            : undefined,
          variants: input.variantIds
            ? {
                connect: input.variantIds.map((id) => ({ id })),
              }
            : undefined,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create coupon');
    }
  }

  async applyCoupon(userId: string, input: ApplyCouponInput): Promise<ApplyCouponResponse> {
    try {
      const { couponCode, cartTotal, productIds = [], variantIds = [] } = input;

      const coupon = await this.prisma.coupon.findFirst({
        where: {
          code: couponCode,
          isActive: true,
          expiresAt: { gt: new Date() },
        },
        include: {
          products: true,
          variants: true,
        },
      });

      if (!coupon) {
        return { valid: false, message: 'Invalid or expired coupon' };
      }

      if (coupon.minimumAmount && cartTotal < coupon.minimumAmount) {
        return {
          valid: false,
          message: `Minimum amount should be ₹${coupon.minimumAmount}`,
        };
      }

      if (!coupon.appliesToAll) {
        const productMatch =
          coupon.products.some((p) => productIds.includes(p.id)) ||
          coupon.variants.some((v) => variantIds.includes(v.id)) ||
          (coupon.size && variantIds.length > 0);

        if (!productMatch) {
          return {
            valid: false,
            message: 'Coupon is not applicable to selected items',
          };
        }
      }

      let discountAmount = 0;
      if (coupon.type === 'percentage') {
        discountAmount = (cartTotal * coupon.discount) / 100;
      } else {
        discountAmount = coupon.discount;
      }

      const finalAmount = cartTotal - discountAmount;

      await this.prisma.couponUsage.create({
        data: {
          userId: userId,
          couponId: coupon.id,
          cartAmount: cartTotal,
          discount: discountAmount,
          finalAmount: finalAmount,
        },
      });

      return {
        valid: true,
        message: 'Coupon applied successfully',
        discountAmount,
        finalAmount,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to apply coupon');
    }
  }
}
