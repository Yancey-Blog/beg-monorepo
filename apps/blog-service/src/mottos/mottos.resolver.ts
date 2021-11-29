import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { Public } from 'nest-keycloak-connect'
import { MottosService } from './mottos.service'
import { MottoModel } from './models/mottos.model'
import { CreateMottoInput } from './dtos/create-motto.input'
import { UpdateMottoInput } from './dtos/update-motto.input'
import { ExchangePositionInput } from '../shared/interfaces/exchange-position.input'
import { BatchDeleteModel } from '../database/models/batch-delete.model'

@Resolver(() => MottoModel)
export class MottosResolver {
  constructor(private readonly mottosService: MottosService) {
    this.mottosService = mottosService
  }

  @Query(() => [MottoModel])
  @Public()
  public async getMottos(): Promise<MottoModel[]> {
    return this.mottosService.findAll()
  }

  @Query(() => MottoModel)
  @Public()
  public async getMottoById(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<MottoModel> {
    return this.mottosService.findOneById(id)
  }

  @Mutation(() => MottoModel)
  public async createMotto(
    @Args('input') input: CreateMottoInput
  ): Promise<MottoModel> {
    return this.mottosService.create(input)
  }

  @Mutation(() => MottoModel)
  public async updateMottoById(
    @Args('input') input: UpdateMottoInput
  ): Promise<MottoModel> {
    return this.mottosService.update(input)
  }

  @Mutation(() => [MottoModel])
  public async exchangePositionMotto(
    @Args('input') input: ExchangePositionInput
  ): Promise<MottoModel[]> {
    return this.mottosService.exchangePosition(input)
  }

  @Mutation(() => MottoModel)
  public async deleteMottoById(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<MottoModel> {
    return this.mottosService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  public async deleteMottos(
    @Args({ name: 'ids', type: () => [ID] }) ids: string[]
  ) {
    return this.mottosService.batchDelete(ids)
  }
}
