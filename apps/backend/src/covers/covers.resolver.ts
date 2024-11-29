import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Public } from 'nest-keycloak-connect'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { BatchUpdateModel } from '../database/models/batch-update.model'
import { ExchangePositionInput } from '../shared/interfaces/exchange-position.input'
import { CoversService } from './covers.service'
import { CreateCoverInput } from './dtos/create-cover.input'
import { UpdateCoverInput } from './dtos/update-cover.input'
import { CoverModel } from './models/covers.model'

@Resolver(() => CoverModel)
export class CoversResolver {
  constructor(private readonly coversService: CoversService) {
    this.coversService = coversService
  }

  @Query(() => [CoverModel])
  @Public()
  public async getAllPublicCovers(): Promise<CoverModel[]> {
    return this.coversService.findAllPubilc()
  }

  @Query(() => [CoverModel])
  @Public()
  public async getCovers() {
    return this.coversService.findAll()
  }

  @Query(() => CoverModel)
  public async getCoverById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.coversService.findOneById(id)
  }

  @Mutation(() => CoverModel)
  public async createCover(@Args('input') input: CreateCoverInput) {
    return this.coversService.create(input)
  }

  @Mutation(() => CoverModel)
  public async updateCoverById(@Args('input') input: UpdateCoverInput) {
    return this.coversService.update(input)
  }

  @Mutation(() => [CoverModel])
  public async exchangePositionCover(
    @Args('input') input: ExchangePositionInput
  ): Promise<CoverModel[]> {
    return this.coversService.exchangePosition(input)
  }

  @Mutation(() => CoverModel)
  public async deleteCoverById(
    @Args({ name: 'id', type: () => ID }) id: string
  ) {
    return this.coversService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  public async deleteCovers(
    @Args({ name: 'ids', type: () => [ID] }) ids: string[]
  ) {
    return this.coversService.batchDelete(ids)
  }

  @Mutation(() => BatchUpdateModel)
  public async publicCovers(
    @Args({ name: 'ids', type: () => [ID] }) ids: string[]
  ) {
    return this.coversService.batchUpdate(ids)
  }
}
