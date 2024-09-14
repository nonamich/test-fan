import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmptyResultError, WhereOptions } from 'sequelize';

import { User } from './models/user.model';
import { USERS_PER_PAGE } from './users.constants';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private model: typeof User) {}

  async create(data: Omit<IUser, 'id'>) {
    const user = await this.model.create(data, {
      ignoreDuplicates: false,
    });

    await user.save();

    return user.toJSON();
  }

  async findByEmail(email: string) {
    return await this.findOne({ email });
  }

  async findById(id: number) {
    return await this.findOne({ id });
  }

  async findAll(page: number = 1, limit = USERS_PER_PAGE) {
    page = Math.max(1, page);

    const offset = limit * page - limit;

    return await this.model.findAll({ limit: limit, offset });
  }

  async findOne(where: WhereOptions<IUser> = {}) {
    try {
      const model = await this.model.findOne({
        rejectOnEmpty: true,
        where,
      });

      return model.toJSON();
    } catch (error) {
      if (error instanceof EmptyResultError) {
        throw new BadRequestException();
      }

      throw error;
    }
  }

  async count() {
    return this.model.count();
  }
}
