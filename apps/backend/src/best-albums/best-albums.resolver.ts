import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { Public } from 'nest-keycloak-connect'
import { BestAlbumsService } from './best-albums.service'
import { BestAlbumModel } from './models/best-albums.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { CreateBestAlbumInput } from './dtos/create-best-album.input'
import { UpdateBestAlbumInput } from './dtos/update-best-album.input'

@Resolver(() => BestAlbumModel)
export class BestAlbumsResolver {
  constructor(private readonly bestAlbumsService: BestAlbumsService) {
    this.bestAlbumsService = bestAlbumsService
  }

  @Query(() => [BestAlbumModel])
  @Public()
  public async getBestAlbums() {
    return this.bestAlbumsService.findAll()
  }

  @Query(() => BestAlbumModel)
  @Public()
  public async getBestAlbumById(
    @Args({ name: 'id', type: () => ID }) id: string
  ) {
    return this.bestAlbumsService.findOneById(id)
  }

  @Mutation(() => BestAlbumModel)
  public async createBestAlbum(@Args('input') input: CreateBestAlbumInput) {
    return this.bestAlbumsService.create(input)
  }

  @Mutation(() => BestAlbumModel)
  public async updateBestAlbumById(@Args('input') input: UpdateBestAlbumInput) {
    return this.bestAlbumsService.update(input)
  }

  @Mutation(() => BestAlbumModel)
  public async deleteBestAlbumById(
    @Args({ name: 'id', type: () => ID }) id: string
  ) {
    return this.bestAlbumsService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  public async deleteBestAlbums(
    @Args({ name: 'ids', type: () => [ID] }) ids: string[]
  ) {
    return this.bestAlbumsService.batchDelete(ids)
  }
}
