import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { BandwagonResolver } from './bandwagon.resolver'
import { BandwagonService } from './bandwagon.service'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5
      })
    })
  ],
  providers: [BandwagonService, BandwagonResolver]
})
export class BandwagonModule {}
