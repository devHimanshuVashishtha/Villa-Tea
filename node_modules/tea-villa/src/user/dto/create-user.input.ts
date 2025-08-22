  import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsEmail, Matches } from 'class-validator';

  @InputType()
  export class CreateUserAddressInput {

    @Field(()=>Int,{ nullable: true })
    pincode?: number|null;

    @Field(()=>String,{ nullable: true })
    city?: string|null;

    @Field(()=>String,{ nullable: true })
    state?: string|null;

    @Field(()=>String,{ nullable: true })
    country?: string|null;

    @Field(()=>String,{ nullable: true })
    street?: string|null;

    @Field(()=>String,{ nullable: true })
    landmark?: string|null;

    @Field({ defaultValue: false })
    isDefault?: boolean;

    @Field(() => Float, { nullable: true })
    latitude?: number|null;

    @Field(() => Float, { nullable: true })
    longitude?: number|null;
  }

  @InputType()
  export class CreateUserInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @Field()
    @Matches(/^\+\d{1,3}[6-9]\d{9}$/, {
      message: 'Phone must include country code and be a valid 10-digit Indian mobile number (e.g. +91XXXXXXXXXX)',
    })
    phone: string;

    @Field()
    password: string;

    @Field({ nullable: true })
    profileImage?: string;

    @Field({ nullable: true })
    dateOfBirth?: string;

    @Field({ nullable: true })
    gender?: string;

    @Field(() => [CreateUserAddressInput], { nullable: true })
    addresses?: CreateUserAddressInput[];
  }
