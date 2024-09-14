import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ResponseCountDTO, ResponseUserDTO, ResponseUsersDTO } from './dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: ResponseCountDTO })
  @Get('/count')
  async count() {
    const count = await this.usersService.count();

    return new ResponseCountDTO({
      count,
    });
  }

  @ApiOkResponse({ type: ResponseUserDTO })
  @Get('/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseUserDTO> {
    return new ResponseUserDTO(await this.usersService.findById(id));
  }

  @ApiOkResponse({ type: ResponseUsersDTO })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    return new ResponseUsersDTO({
      users: (await this.usersService.findAll(page, limit)).map((user) =>
        user.toJSON(),
      ),
    });
  }
}
