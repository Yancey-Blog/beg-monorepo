import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { OpenSourcesResolver } from './open-sources.resolver'
import { OpenSourcesService } from './open-sources.service'
import { OpenSourceSchema } from './schemas/open-sources.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OpenSource', schema: OpenSourceSchema }
    ])
  ],
  providers: [OpenSourcesResolver, OpenSourcesService]
})
export class OpenSourcesModule {}
