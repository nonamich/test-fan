import * as bcrypt from 'bcrypt';

export abstract class PasswordService {
  static comparePassword(password: string, encryptedPassword: string) {
    return bcrypt.compareSync(password, encryptedPassword);
  }

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
