import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LiveToursResolver } from './live-tours.resolver'
import { LiveToursService } from './live-tours.service'
import { LiveToursSchema } from './schemas/live-tours.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LiveTour', schema: LiveToursSchema }])
  ],
  providers: [LiveToursResolver, LiveToursService]
})
export class LiveToursModule {}
