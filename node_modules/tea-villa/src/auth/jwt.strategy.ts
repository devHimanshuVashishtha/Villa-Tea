import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './dto/jwt-payload';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService, // Add Prisma service here
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Ensure your JWT_SECRET is set correctly
      passReqToCallback: true, // important

    });
  }

  async validate(req:Request,payload: JwtPayload) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  
    const tokenRecord = await this.prisma.userToken.findUnique({
      where: { token },
    });
  
    if (!tokenRecord) {
      throw new UnauthorizedException('Token expired or invalidated');
    }
  
    const user = await this.userService.findOne(payload.sub);
    if (!user) {
      throw new BadRequestException('User not found');
    }
  
    return user;
  }
  
  
}
