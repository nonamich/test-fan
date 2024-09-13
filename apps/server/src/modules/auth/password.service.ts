import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  comparePassword(password: string, encryptedPassword: string) {
    return bcrypt.compare(password, encryptedPassword);
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
