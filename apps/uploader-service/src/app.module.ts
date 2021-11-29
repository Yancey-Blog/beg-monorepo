import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { RoleGuard, AuthGuard } from 'nest-keycloak-connect'
import { UploaderModule } from './uploader/uploader.module'
import { LoggerModule } from './libs/loggers/logger.module'
import { ConfigsModule } from './libs/config/config.module'
import { AuthModule } from './libs/guard/auth.guard'

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
