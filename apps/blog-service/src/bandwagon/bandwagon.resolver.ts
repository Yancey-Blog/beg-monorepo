import { Resolver, Query } from '@nestjs/graphql'
import { BandwagonService } from './bandwagon.service'
import { ServiceInfoModel } from './models/service-info.model'
import { UsageStatesModel } from './models/usage-stats.model'

@Resolver('Bandwagon')
export class BandwagonResolver {
  constructor(private readonly bandwagonService: BandwagonService) {
    this.bandwagonService = bandwagonService
  }

  @Query(() => ServiceInfoModel)
  public getBanwagonServiceInfo() {
    return this.bandwagonService.getServiceInfo()
  }

  @Query(() => [UsageStatesModel])
  public getBanwagonUsageStats() {
    return this.bandwagonService.getUsageStats()
  }
}
