// src/user/entities/user.entity.ts
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;

  @Field(() => String, { nullable: true })
  profileImage: string | null;

  @Field(() => String, { nullable: true })
  dateOfBirth: string | null;

  @Field(() => String, { nullable: true })
  gender: string | null;

  @Field(() => [Address], { nullable: true })
  addresses: Address[] | null;

  @Field(() => String, { nullable: true })
  role: string | null;
}

@ObjectType()
export class Address {
  @Field()
  id: string;

  @Field(() => Int, { nullable: true })
  pincode: number | null;

  @Field(() => String, { nullable: true })
  userId: string | null;

  @Field(() => String, { nullable: true })
  city: string | null;

  @Field(() => String, { nullable: true })
  state: string | null;

  @Field(() => String, { nullable: true })
  country: string | null;

  @Field(() => String, { nullable: true })
  street: string | null;

  @Field(() => String, { nullable: true })
  landmark: string | null;

  @Field()
  isDefault: boolean;
  @Field(() => Float, { nullable: true })
  latitude: number | null;

  @Field(() => Float, { nullable: true })
  longitude: number | null;
}

@ObjectType()
export class UserProfile {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field(() => String, { nullable: true })
  profileImage: string | null;

  @Field(() => String, { nullable: true })
  dateOfBirth: string | null;

  @Field(() => String, { nullable: true })
  gender: string | null;

  @Field(() => [Address], { nullable: true })
  addresses: Address[] | null;

  @Field(() => String, { nullable: true })
  role: string | null;
}
@ObjectType()
export class sendOtpForForgotPasswordResponse {
  @Field()
  output: string;

  @Field()
  email: string;
}
@ObjectType()
export class verifyForgotPasswordOtpResponse {
  @Field()
  success: string;

  @Field()
  message: string;

  @Field()
  userId:string;
  

 
}
@ObjectType()
export class resetPasswordResponse
{
  @Field()
  success: string;

  @Field()
  message: string;

  

 
}
@ObjectType()
export class ChangeUserPasswordResponse{
  @Field()
  message:string;
  
}