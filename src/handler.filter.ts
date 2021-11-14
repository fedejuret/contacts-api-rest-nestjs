import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

import { ApiResponserService } from './api-responser/api-responser.service';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

@Catch(HttpException, InternalServerErrorException, ValidationError)
export class HandlerFilter implements ExceptionFilter {
  private _apiResponserService: ApiResponserService;
  constructor() {
    this._apiResponserService = new ApiResponserService();
  }

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }
    if (exception instanceof ValidationError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
    }

    return this._apiResponserService.errorResponse(
      response,
      status,
      exception.message,
    );
  }
}
