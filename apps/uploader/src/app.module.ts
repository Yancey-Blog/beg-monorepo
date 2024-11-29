import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard, RoleGuard } from 'nest-keycloak-connect'
import { ConfigsModule } from './libs/config/config.module'
import { AuthModule } from './libs/guard/auth.guard'
import { LoggerModule } from './libs/loggers/logger.module'
import { UploaderModule } from './uploader/uploader.module'

@Module({
  imports: [ConfigsModule, AuthModule, LoggerModule, UploaderModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ]
})
export class AppModule {}
