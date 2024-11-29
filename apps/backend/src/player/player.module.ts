import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayerResolver } from './player.resolver'
import { PlayerService } from './player.service'
import { PlayerSchema } from './schemas/player.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }])
  ],
  providers: [PlayerResolver, PlayerService]
})
export class PlayerModule {}
