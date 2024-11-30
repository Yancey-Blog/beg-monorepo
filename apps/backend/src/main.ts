import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { configLogger } from './shared/logger/logger.config'
import { configMiddlewares } from './shared/middlewares/middleware.config'

const bootstrap = async () => {
  const isEnvProduction = process.env.NODE_ENV === 'production'
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    isEnvProduction
      ? {
          logger: false
        }
      : {}
  )

  app.setGlobalPrefix('beg')
  configMiddlewares(app)
  configLogger(app)
  await app.listen(process.env.APP_PORT || 3002)
}

bootstrap()
