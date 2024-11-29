import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Public } from 'nest-keycloak-connect'
import { UpdateGlobalSettingInput } from './dtos/update-global-setting.input'
import { GlobalSettingService } from './global-setting.service'
import { GlobalSettingModel } from './models/global-setting.model'

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
