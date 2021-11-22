import { Module } from '@nestjs/common'
import { UploaderModule } from './uploader/uploader.module'
import { LoggerModule } from './libs/loggers/logger.module'
import { ConfigsModule } from './libs/config/config.module'

@Module({
  imports: [ConfigsModule, LoggerModule, UploaderModule]
})
export class AppModule {}
