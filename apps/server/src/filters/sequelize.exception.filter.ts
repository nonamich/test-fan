import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { BaseError, EmptyResultError, UniqueConstraintError } from 'sequelize';

@Catch(BaseError)
export class SequelizeExceptionFilter extends BaseExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof UniqueConstraintError) {
      const status = HttpStatus.CONFLICT;
      const uniqueFields = Object.values(exception.fields).join(',');

      response.status(status).json({
        statusCode: status,
        message: `Already exists on the values: ${uniqueFields}`,
      });

      return;
    } else if (exception instanceof EmptyResultError) {
      const status = HttpStatus.NOT_FOUND;

      response.status(status).json({
        statusCode: status,
        message: `Not Found`,
      });

      return;
    }

    super.catch(exception, host);
  }
}
