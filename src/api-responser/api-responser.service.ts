import { Injectable, Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ApiResponserService {
  successResponse(
    @Res() res,
    statusCode: HttpStatus = HttpStatus.OK,
    data: any,
  ) {
    data = {
      data: data,
      statusCode: statusCode,
    };

    return res.status(statusCode).json(data);
  }

  errorResponse(@Res() res, statusCode: HttpStatus, message: string) {
    const data = {
      error: message,
      status: statusCode,
    };

    return res.status(statusCode).json(data);
  }
}
