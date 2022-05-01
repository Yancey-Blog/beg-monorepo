import { INestApplication } from '@nestjs/common'
import { configCORS } from '@shared/utils'

export const configSecurityMiddleWares = (app: INestApplication) => {
  app.enableCors(configCORS(process.env.NODE_ENV === 'production'))
}
