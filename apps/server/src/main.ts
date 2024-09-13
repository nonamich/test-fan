import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SequelizeExceptionFilter } from './filters/sequelize.exception.filter';

bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('/api/v1');

  initSwagger(app);
  useFilters(app);
  useValidators(app);
  useInterceptors(app);

  await app.listen(config.getOrThrow('PORT'));
}

function useFilters(app: INestApplication) {
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new SequelizeExceptionFilter(httpAdapter));
}

function useValidators(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
}

function useInterceptors(app: INestApplication) {
  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
}

function initSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Rest API')
    .setDescription('The API description')
    .setVersion('1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/v1/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: 'api/v1/swagger.json',
  });
}
