import { Module } from '@nestjs/common'
import { UploaderModule } from './uploader/uploader.module'
import { LoggerModule } from './libs/loggers/logger.module'

@Module({
  imports: [LoggerModule, UploaderModule]
})
export class AppModule {}
