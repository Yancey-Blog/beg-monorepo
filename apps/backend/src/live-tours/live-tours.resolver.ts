import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Public } from 'nest-keycloak-connect'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { CreateLiveTourInput } from './dtos/create-live-tour.input'
import { UpdateLiveTourInput } from './dtos/update-live-tour.input'
import { LiveToursService } from './live-tours.service'
import { LiveTourModel } from './models/live-tours.model'

@Resolver(() => LiveTourModel)
export class LiveToursResolver {
  constructor(private readonly liveToursService: LiveToursService) {
    this.liveToursService = liveToursService
  }

  @Query(() => [LiveTourModel])
  @Public()
  public async getLiveTours() {
    return this.liveToursService.findAll()
  }

  @Query(() => LiveTourModel)
  @Public()
  public async getLiveTourById(
    @Args({ name: 'id', type: () => ID }) id: string
  ) {
    return this.liveToursService.findOneById(id)
  }

  @Mutation(() => LiveTourModel)
  public async createLiveTour(@Args('input') input: CreateLiveTourInput) {
    return this.liveToursService.create(input)
  }

  @Mutation(() => LiveTourModel)
  public async updateLiveTourById(@Args('input') input: UpdateLiveTourInput) {
    return this.liveToursService.update(input)
  }

  @Mutation(() => LiveTourModel)
  public async deleteLiveTourById(
    @Args({ name: 'id', type: () => ID }) id: string
  ) {
    return this.liveToursService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  public async deleteLiveTours(
    @Args({ name: 'ids', type: () => [ID] }) ids: string[]
  ) {
    return this.liveToursService.batchDelete(ids)
  }
}
