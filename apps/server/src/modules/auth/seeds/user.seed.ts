import { faker } from '@faker-js/faker';
import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';

import { RequestSignupDTO } from '../dto';
import { PasswordService } from '../password.service';

@Seeder({
  model: 'User',
  unique: ['email', 'id'],
})
export class SeedUser implements OnSeederInit {
  run() {
    const data: RequestSignupDTO[] = [
      {
        name: 'admin',
        phone: faker.phone.number(),
        password: 'password',
        email: 'admin@admin.com',
      },
      ...[...Array(30).keys()].map(() => {
        return {
          name: faker.person.firstName(),
          phone: faker.phone.number(),
          password: 'password',
          email: faker.internet.email(),
        };
      }),
    ];
    return data;
  }

  everyone(data: RequestSignupDTO) {
    if (data.password) {
      data.password = PasswordService.hashPassword(data.password);
    }

    return data;
  }
}
