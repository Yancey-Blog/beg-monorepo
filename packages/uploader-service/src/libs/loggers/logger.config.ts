import { INestApplication } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AllExceptionsFilter } from '../filters/all-exception.filter'

export const configLogger = (app: INestApplication) => {
  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER)
  app.useLogger(nestWinston)
  app.useGlobalFilters(new AllExceptionsFilter(nestWinston.logger))
}
