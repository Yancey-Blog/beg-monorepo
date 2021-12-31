import { Module } from '@nestjs/common'
import { APP_PIPE, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { RoleGuard, AuthGuard } from 'nest-keycloak-connect'
import { AuthModule } from 'src/shared/guard/auth.guard'
import { LoggerModule } from 'src/shared/logger/logger.module'
import { GraphQLValidationPipe } from 'src/shared/pipes/GraphQLValidation.pipe'
import { DelayInterceptor } from 'src/shared/interceptors/delay.interceptor'
import { ConfigModule } from 'src/config/config.module'
import { DataBaseModule } from 'src/database/database.module'
import { GraphqlModule } from 'src/graphql/graphqls.module'
import { AnnouncementsModule } from 'src/announcements/announcements.module'
import { OpenSourcesModule } from 'src/open-sources/open-sources.module'
import { BandwagonModule } from 'src/bandwagon/bandwagon.module'
import { LiveToursModule } from 'src/live-tours/live-tours.module'
import { YanceyMusicModule } from 'src/yancey-music/yancey-music.module'
import { BestAlbumsModule } from 'src/best-albums/best-albums.module'
import { PlayerModule } from 'src/player/player.module'
import { PostsModule } from 'src/posts/posts.module'
import { MottosModule } from 'src/mottos/mottos.module'
import { CoversModule } from 'src/covers/covers.module'
import { GlobalSettingModule } from 'src/global-setting/global-setting.module'
import { PostStatisticsModule } from 'src/post-statistics/post-statistics.module'

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    GraphqlModule,
    DataBaseModule,
    LoggerModule,
    AnnouncementsModule,
    OpenSourcesModule,
    BandwagonModule,
    LiveToursModule,
    YanceyMusicModule,
    BestAlbumsModule,
    PlayerModule,
    PostsModule,
    MottosModule,
    CoversModule,
    GlobalSettingModule,
    PostStatisticsModule
  ],

  providers: [
    {
      provide: APP_PIPE,
      useClass: GraphQLValidationPipe
    },

    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },

    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: DelayInterceptor
    }
  ]
})
export class AppModule {}
