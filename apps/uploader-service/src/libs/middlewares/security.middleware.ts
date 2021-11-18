import { INestApplication } from '@nestjs/common'
// import * as helmet from 'helmet'
// import * as csurf from 'csurf'
import { configCORS } from '../../shared/utils'

export const configSecurityMiddleWares = (app: INestApplication) => {
  // app.use(helmet())
  // app.use(csurf())
  app.enableCors(configCORS())
}
