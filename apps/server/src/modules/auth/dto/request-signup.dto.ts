import { PickType } from '@nestjs/swagger';

import { BaseAuthDTO } from './base.auth.dto';

export class RequestSignupDTO extends PickType(BaseAuthDTO, [
  'name',
  'email',
  'phone',
  'password',
]) {}
