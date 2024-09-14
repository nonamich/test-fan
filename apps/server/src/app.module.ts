import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';

import { AppLoggerMiddleware } from './app.http-logger';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          dialect: 'mysql',
          host: config.getOrThrow('DB_HOST'),
          port: config.getOrThrow('DB_PORT'),
          username: config.getOrThrow('DB_USERNAME'),
          password: config.getOrThrow('DB_PASSWORD'),
          database: config.getOrThrow('DB_NAME'),
          benchmark: true,
          synchronize: true,
          autoLoadModels: true,
          logging(sql) {
            Logger.log(sql, 'DB');
          },
        };
      },
    }),
    SeederModule.forRoot({
      runOnlyIfTableIsEmpty: true,
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [AppLoggerMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
