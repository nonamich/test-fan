import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { IAuthorizedUser } from './auth.interface';
import { AuthService } from './auth.service';
import { AuthorizedUser } from './decorators/authorized-user.decorator';
import {
  ResponseLoggedInDTO,
  RequestLoginDTO,
  RequestSignupDTO,
  ResponseAuthorizedUserDTO,
} from './dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: ResponseLoggedInDTO })
  @Post('signup')
  async signup(@Body() dto: RequestSignupDTO): Promise<ResponseLoggedInDTO> {
    return await this.authService.signup(dto);
  }

  @ApiOkResponse({ type: ResponseLoggedInDTO })
  @Get('login')
  async login(@Query() dto: RequestLoginDTO): Promise<ResponseLoggedInDTO> {
    return await this.authService.login(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @ApiOkResponse({ type: ResponseAuthorizedUserDTO })
  @Get('me')
  me(@AuthorizedUser() user: IAuthorizedUser): IAuthorizedUser {
    return user;
  }
}
