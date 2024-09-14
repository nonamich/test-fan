import { PickType } from '@nestjs/swagger';

import { BaseAuthDTO } from '.';
import { IAuthorizedUser } from '../auth.interface';

export class ResponseAuthorizedUserDTO
  extends PickType(BaseAuthDTO, ['id', 'name', 'email', 'phone'])
  implements IAuthorizedUser {}
