import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { UsersModule } from 'src/modules/users/users.module';

import { JwtHeaderStrategy } from './ strategies/jwt-header.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SeedUser } from './seeds/user.seed';

@Module({
  providers: [AuthService, JwtHeaderStrategy],
  controllers: [AuthController],
  imports: [
    SeederModule.forFeature([SeedUser]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
    UsersModule,
  ],
})
export class AuthModule {}
