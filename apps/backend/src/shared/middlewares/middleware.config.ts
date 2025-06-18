import { INestApplication } from '@nestjs/common'
import helmet from 'helmet'
import path from 'path'
import serveFavicon from 'serve-favicon'

export const configMiddlewares = (app: INestApplication) => {
  app.use(serveFavicon(path.join(process.cwd(), 'public/favicon.ico')))

  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false
    })
  )

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
}
