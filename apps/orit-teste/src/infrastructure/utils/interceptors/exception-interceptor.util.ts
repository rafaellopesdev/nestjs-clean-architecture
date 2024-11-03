import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ExceptionInUseCase } from '../exception/exeption-in-use-case.exception';

@Catch(ExceptionInUseCase)
export class ExceptionInterceptor implements ExceptionFilter {
  catch(exception: ExceptionInUseCase, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
