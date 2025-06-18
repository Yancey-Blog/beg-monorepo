import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { configLogger } from './libs/loggers/logger.config'
import { ValidationPipe } from './libs/pipes/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('uploader')
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [/\.?yanceyleo\.com$/, /\.?yancey\.app$/]
        : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: '*'
  })
  configLogger(app)
  await app.listen(3003)
}

bootstrap()
