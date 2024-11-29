import { Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AuthGuard, RoleGuard } from 'nest-keycloak-connect'
import { AnnouncementsModule } from 'src/announcements/announcements.module'
import { BandwagonModule } from 'src/bandwagon/bandwagon.module'
import { BestAlbumsModule } from 'src/best-albums/best-albums.module'
import { ConfigModule } from 'src/config/config.module'
import { CoversModule } from 'src/covers/covers.module'
import { DataBaseModule } from 'src/database/database.module'
import { GlobalSettingModule } from 'src/global-setting/global-setting.module'
import { GraphqlModule } from 'src/graphql/graphqls.module'
import { LiveToursModule } from 'src/live-tours/live-tours.module'
import { MottosModule } from 'src/mottos/mottos.module'
import { OpenSourcesModule } from 'src/open-sources/open-sources.module'
import { PlayerModule } from 'src/player/player.module'
import { PostStatisticsModule } from 'src/post-statistics/post-statistics.module'
import { PostsModule } from 'src/posts/posts.module'
import { AuthModule } from 'src/shared/guard/auth.guard'
import { DelayInterceptor } from 'src/shared/interceptors/delay.interceptor'
import { LoggerModule } from 'src/shared/logger/logger.module'
import { GraphQLValidationPipe } from 'src/shared/pipes/GraphQLValidation.pipe'
import { YanceyMusicModule } from 'src/yancey-music/yancey-music.module'

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
