import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import * as winston from 'winston'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: winston.Logger) {
    this.logger = logger
  }

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception.toString())

    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception instanceof HttpException ? exception.message : ''
    })
  }
}
