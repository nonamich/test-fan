//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/users.service';
import { IAuthorizedUser, IJwtPayload } from '../auth.interface';

@Injectable()
export class JwtHeaderStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(payload: IJwtPayload): Promise<IAuthorizedUser> {
    try {
      const { id, email, name, phone } = await this.usersService.findById(
        payload.id,
      );

      return { id, email, name, phone };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
