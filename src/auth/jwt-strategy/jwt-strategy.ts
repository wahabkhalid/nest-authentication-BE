import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../users/entities/users.entity';
import { ENV } from '../../config/env';
import { UsersService } from '../../users/users.service';

export const BASIC_JWT = 'basic-jwt';
export interface UserWithPayload extends User {
  purpose?: string;

  id: string;
  email: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, BASIC_JWT) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,

      secretOrKey: ENV.JWT_SECRET,
    });
  }

  async validate(payload: UserWithPayload): Promise<object> {
    if (!payload.purpose || payload.purpose !== BASIC_JWT) {
      throw new UnauthorizedException('Unathuorizedd');
    }
    const fullUser = await this.userService.findOne(payload.id);
    if (!fullUser) {
      throw new UnauthorizedException('Unathuorizeds');
    }

    return payload;
  }
}
