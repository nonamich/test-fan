import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class ResponseUserDTO {
  constructor(partial: Partial<ResponseUserDTO>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @Exclude()
  password: string;
}
