import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { configLogger } from './shared/logger/logger.config'
import { configMiddlewares } from './shared/middlewares/middleware.config'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.setGlobalPrefix('beg')
  configMiddlewares(app)
  configLogger(app)

  await app.listen(3002)
}

bootstrap()
