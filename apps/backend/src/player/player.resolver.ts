import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Public } from 'nest-keycloak-connect'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { BatchUpdateModel } from '../database/models/batch-update.model'
import { CreatePlayerInput } from './dtos/create-player.input'
import { UpdatePlayerInput } from './dtos/update-player.input'
import { PlayerModel } from './models/player.model'
import { PlayerService } from './player.service'

import { ExchangePositionInput } from '../shared/interfaces/exchange-position.input'

@Resolver(() => PlayerModel)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {
    this.playerService = playerService
  }

  @Query(() => [PlayerModel])
  @Public()
  public async players(): Promise<PlayerModel[]> {
    return this.playerService.findAllPubilc()
  }

  @Query(() => [PlayerModel])
  @Public()
  public async getPlayers() {
    return this.playerService.findAll()
  }

  @Query(() => PlayerModel)
  public async getPlayerById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.playerService.findOneById(id)
  }

  @Mutation(() => PlayerModel)
  public async createPlayer(@Args('input') input: CreatePlayerInput) {
    return this.playerService.create(input)
  }

  @Mutation(() => PlayerModel)
  public async updatePlayerById(@Args('input') input: UpdatePlayerInput) {
    return this.playerService.update(input)
  }

  @Mutation(() => [PlayerModel])
  public async exchangePositionPlayer(
    @Args('input') input: ExchangePositionInput
  ): Promise<PlayerModel[]> {
    return this.playerService.exchangePosition(input)
  }

  @Mutation(() => PlayerModel)
  public async deletePlayerById(
    @Args({ name: 'id', type: () => ID }) id: string
  ) {
    return this.playerService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  public async deletePlayers(
    @Args({ name: 'ids', type: () => [ID] }) ids: string[]
  ) {
    return this.playerService.batchDelete(ids)
  }

  @Mutation(() => BatchUpdateModel)
  public async offlinePlayers(
    @Args({ name: 'ids', type: () => [ID] }) ids: string[]
  ) {
    return this.playerService.batchUpdate(ids)
  }
}
