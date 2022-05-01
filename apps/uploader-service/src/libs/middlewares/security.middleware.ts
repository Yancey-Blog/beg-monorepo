import { INestApplication } from '@nestjs/common'
import { corsConfig } from '@shared/utils'

export const configSecurityMiddleWares = (app: INestApplication) => {
  app.enableCors(corsConfig)
}
