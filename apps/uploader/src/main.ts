import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { configLogger } from './libs/loggers/logger.config'
import { configSecurityMiddleWares } from './libs/middlewares/security.middleware'
import { ValidationPipe } from './libs/pipes/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false
  })

  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('uploader')
  configSecurityMiddleWares(app)
  configLogger(app)

  await app.listen(3003)
}

bootstrap()
