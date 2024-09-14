import { ApiProperty } from '@nestjs/swagger';

export class ResponseCountDTO {
  constructor(partial: Partial<ResponseCountDTO>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ type: Number })
  count: number;
}
