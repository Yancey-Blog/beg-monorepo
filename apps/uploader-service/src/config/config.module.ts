import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
// import Joi from 'joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
      // validationSchema: Joi.object({
      //   NODE_ENV: Joi.string()
      //     .valid('development', 'production', 'test')
      //     .default('development'),
      //   PORT: Joi.number().default(3000),
      //   AZURE_STORAGE_CONNECTION_STRING: Joi.string(),
      // }),
    })
  ]
})
export class ConfigsModule {
  // constructor(private configService: ConfigService) {}
  // private get<T>(key: string): T {
  //   return this.configService.get[key]
  // }
  // public getAzureStorageConnectionString(): string {
  //   return this.get('AZURE_STORAGE_CONNECTION_STRING')
  // }
}
