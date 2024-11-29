import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GlobalSettingResolver } from './global-setting.resolver'
import { GlobalSettingService } from './global-setting.service'
import { GlobalSettingSchema } from './schemas/global-setting.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'GlobalSetting', schema: GlobalSettingSchema }
    ])
  ],
  providers: [GlobalSettingResolver, GlobalSettingService]
})
export class GlobalSettingModule {}
