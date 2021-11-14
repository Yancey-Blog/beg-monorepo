import { Module } from '@nestjs/common'
import { ConfigsModule } from './config/config.module'
import { UploaderModule } from './uploader/uploader.module'
import { LoggerModule } from './libs/loggers/logger.module'

@Module({
  imports: [LoggerModule, ConfigsModule, UploaderModule],
})
export class AppModule {}
