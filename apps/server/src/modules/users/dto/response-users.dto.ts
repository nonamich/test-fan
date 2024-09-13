import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ResponseUserDTO } from '.';

export class ResponseUsersDTO {
  constructor(partial: Partial<ResponseUsersDTO>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ type: ResponseUserDTO, isArray: true })
  @Type(() => ResponseUserDTO)
  users: ResponseUserDTO[];
}
