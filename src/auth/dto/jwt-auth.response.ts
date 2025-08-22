import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class JwtAuthResponse {
  @Field()
  access_token: string;
  @Field(()=>Boolean)
  requires2FA:boolean

  
}


