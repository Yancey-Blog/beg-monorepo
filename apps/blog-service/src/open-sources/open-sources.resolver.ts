import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { Public } from 'nest-keycloak-connect'
import { OpenSourcesService } from './open-sources.service'
import { OpenSourceModel } from './models/open-sources.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { CreateOpenSourceInput } from './dtos/create-open-source.input'
import { UpdateOpenSourceInput } from './dtos/update-open-source.input'

@Resolver(() => OpenSourceModel)
export class OpenSourcesResolver {
  constructor(private readonly openSourcesService: OpenSourcesService) {
    this.openSourcesService = openSourcesService
  }

  @Query(() => [OpenSourceModel])
  @Public()
  public async getOpenSources() {
    return this.openSourcesService.findAll()
  }

  @Query(() => OpenSourceModel)
  @Public()
  public async getOpenSourceById(
    @Args({ name: 'id', type: () => ID }) id: string
  ) {
    return this.openSourcesService.findOneById(id)
  }

  @Mutation(() => OpenSourceModel)
  public async createOpenSource(@Args('input') input: CreateOpenSourceInput) {
    return this.openSourcesService.create(input)
  }

  @Mutation(() => OpenSourceModel)
  public async updateOpenSourceById(
    @Args('input') input: UpdateOpenSourceInput
  ) {
    return this.openSourcesService.update(input)
  }

  @Mutation(() => OpenSourceModel)
  public async deleteOpenSourceById(
    @Args({ name: 'id', type: () => ID }) id: string
  ) {
    return this.openSourcesService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  public async deleteOpenSources(
    @Args({ name: 'ids', type: () => [ID] }) ids: string[]
  ) {
    return this.openSourcesService.batchDelete(ids)
  }
}
