import { Optional } from 'sequelize';
import { Column, Model, Table, IsEmail, Unique } from 'sequelize-typescript';

import { IUser } from '../users.interface';

@Table({
  createdAt: false,
  updatedAt: false,
})
export class User extends Model<IUser, Optional<IUser, 'id'>> {
  @Column
  name: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column
  phone: string;

  @Column
  password: string;
}
