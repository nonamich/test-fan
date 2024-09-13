import { PickType } from '@nestjs/swagger';

import { BaseAuthDTO } from './base.auth.dto';

export class RequestLoginDTO extends PickType(BaseAuthDTO, [
  'email',
  'password',
]) {}
