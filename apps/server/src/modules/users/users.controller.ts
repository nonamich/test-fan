import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ResponseUserDTO, ResponseUsersDTO } from './dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: ResponseUserDTO })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return new ResponseUserDTO(await this.usersService.findById(id));
  }

  @ApiOkResponse({ type: ResponseUsersDTO })
  @Get()
  async findAll(@Query('page', ParseIntPipe) page: number = 1) {
    return new ResponseUsersDTO({
      users: (await this.usersService.findAll(page)).map((user) =>
        user.toJSON(),
      ),
    });
  }
}
