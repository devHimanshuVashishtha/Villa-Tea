// src/coupon/dto/coupon.type.ts
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Product, Variant } from 'src/product/entities/product.entity';

@ObjectType()
export class Coupoun {
  @Field()
  id: string;

  @Field()
  code: string;

  @Field(() => Int)
  discount: number;

  @Field()
  type: string; // 'percentage' | 'fixed'

  @Field(() => Float, { nullable: true })
  minimumAmount?: number;

  @Field({ nullable: true })
  size?: string;

  @Field()
  appliesToAll: boolean;

  @Field()
  expiresAt: Date;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  // optional: return linked product/variant info too
  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @Field(() => [Variant], { nullable: true })
  variants?: Variant[];
}
