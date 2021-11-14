import { HttpStatus } from '@nestjs/common';
import { response } from 'express';

export class ApiResponser {
  successResponse(statusCode: HttpStatus = HttpStatus.OK, data: any) {
    data = {
      data: data,
      statusCode: statusCode,
    };

    return response.status(statusCode).json(data);
  }

  errorResponse(statusCode: HttpStatus, message: string) {
    const data = {
      error: message,
      statusCode: statusCode,
    };

    return response.status(statusCode).json(data);
  }
}
