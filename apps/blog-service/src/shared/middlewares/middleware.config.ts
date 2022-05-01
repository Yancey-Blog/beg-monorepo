import { INestApplication } from '@nestjs/common'
import path from 'path'
import serveFavicon from 'serve-favicon'
import helmet from 'helmet'
import { corsConfig } from '@shared/utils'

export const configMiddlewares = (app: INestApplication) => {
  app.use(serveFavicon(path.join(process.cwd(), 'public/favicon.ico')))
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false
    })
  )
  app.enableCors(corsConfig)
}
