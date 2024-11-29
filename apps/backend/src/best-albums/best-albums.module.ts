import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BestAlbumsResolver } from './best-albums.resolver'
import { BestAlbumsService } from './best-albums.service'
import { BestAlbumSchema } from './schemas/best-albums.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BestAlbum', schema: BestAlbumSchema }])
  ],
  providers: [BestAlbumsResolver, BestAlbumsService]
})
export class BestAlbumsModule {}
