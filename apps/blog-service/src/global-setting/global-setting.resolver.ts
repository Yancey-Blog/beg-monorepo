import { Public } from 'nest-keycloak-connect'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { GlobalSettingService } from './global-setting.service'
import { GlobalSettingModel } from './models/global-setting.model'
import { UpdateGlobalSettingInput } from './dtos/update-global-setting.input'

@Resolver(() => GlobalSettingModel)
export class GlobalSettingResolver {
  constructor(private readonly globalSettingService: GlobalSettingService) {
    this.globalSettingService = globalSettingService
  }

  @Query(() => GlobalSettingModel)
  @Public()
  public async getGlobalSetting() {
    return this.globalSettingService.findOne()
  }

  @Mutation(() => GlobalSettingModel)
  public async updateGlobalSettingById(
    @Args('input') input: UpdateGlobalSettingInput
  ) {
    return this.globalSettingService.update(input)
  }
}
