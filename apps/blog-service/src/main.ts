import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import {
  RoleGuard,
  AuthGuard,
  KeycloakConnectModule
} from 'nest-keycloak-connect'
import { configLogger } from './shared/logger/logger.config'
import { configMiddlewares } from './shared/middlewares/middleware.config'
import { AppModule } from './app.module'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('beg')
  configMiddlewares(app)
  // configLogger(app)
  await app.listen(process.env.port || 3002)
}

bootstrap()
