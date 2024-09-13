import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { RequestLoginDTO, RequestSignupDTO } from './dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private password: PasswordService,
  ) {}

  async signup(dto: RequestSignupDTO) {
    const hashedPassword = await this.password.hashPassword(dto.password);
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      accessToken: this.getAccessToken(user.id),
    };
  }

  async login(dto: RequestLoginDTO) {
    const {
      id: _id,
      password: encryptedPassword,
      ...user
    } = await this.usersService.findByEmail(dto.email);
    const isPasswordValid = await this.password.comparePassword(
      dto.password,
      encryptedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
      accessToken: this.getAccessToken(_id),
    };
  }

  getAccessToken(id: number) {
    const jwtPayload = {
      id,
    };

    return this.jwtService.sign(jwtPayload);
  }
}
