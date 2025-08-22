import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CoupounService } from './coupoun.service';
import { Coupoun } from './entities/coupoun.entity';
import { CreateCouponInput } from './dto/create-coupoun.input';
import { ApplyCouponResponse } from './entities/apply-coupon-response.entity';
import { ApplyCouponInput } from './dto/apply-coupon.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Resolver(() => Coupoun)
export class CoupounResolver {
  constructor(private readonly couponService: CoupounService) {}
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("ADMIN")
  @Mutation(() => Coupoun)
  createCoupon(@Args('input') input: CreateCouponInput) {
    return this.couponService.createCoupon(input);
  }
  
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ApplyCouponResponse)
  applyCoupon(@Context() context,
    @Args('input') input: ApplyCouponInput
  ) {
    const userId=context.req.user.id
    return this.couponService.applyCoupon(userId,input);
  }
}
