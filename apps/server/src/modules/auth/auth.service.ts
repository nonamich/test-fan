import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { IAuthorizedUser } from './auth.interface';
import { RequestLoginDTO, RequestSignupDTO } from './dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: RequestSignupDTO) {
    const hashedPassword = PasswordService.hashPassword(dto.password);
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    return await this.login({ ...user, password: dto.password });
  }

  async login(dto: RequestLoginDTO) {
    const { password: encryptedPassword, ...user } =
      await this.usersService.findByEmail(dto.email);
    const isPasswordValid = PasswordService.comparePassword(
      dto.password,
      encryptedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
      accessToken: this.getAccessToken(user),
    };
  }

  getAccessToken({ id }: IAuthorizedUser) {
    const jwtPayload = {
      id,
    };

    return this.jwtService.sign(jwtPayload);
  }
}
