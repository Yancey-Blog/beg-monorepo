import { Args, Query, Resolver, Mutation, ID, Int } from '@nestjs/graphql'
import { Public } from 'nest-keycloak-connect'
import { PostsService } from './posts.service'
import { PostModel } from './models/posts.model'
import { PostItemModel } from './models/post.model'
import { ArchiveModel } from './models/archive.model'
import { TagsModel } from './models/tags.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { CreatePostInput } from './dtos/create-post.input'
import { UpdatePostInput } from './dtos/update-post.input'
import { PaginationInput } from './dtos/pagination.input'

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {
    this.postsService = postsService
  }

  @Query(() => PostModel)
  @Public()
  public async posts(@Args('input') input: PaginationInput) {
    return this.postsService.findPublicByPagination(input)
  }

  @Query(() => PostItemModel)
  @Public()
  public async getPostById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.findPublicOneById(id)
  }

  @Query(() => PostItemModel)
  public async getPostByIdForCMS(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.findOneById(id)
  }

  @Query(() => PostModel)
  public async getPostsForCMS(@Args('input') input: PaginationInput) {
    return this.postsService.findByPagination(input)
  }

  @Mutation(() => PostItemModel)
  public async createPost(@Args('input') input: CreatePostInput) {
    return this.postsService.create(input)
  }

  @Mutation(() => PostItemModel)
  public async updatePostById(@Args('input') input: UpdatePostInput) {
    return this.postsService.update(input)
  }

  @Mutation(() => PostItemModel)
  public async deletePostById(
    @Args({ name: 'id', type: () => ID }) id: string
  ) {
    return this.postsService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  public async deletePosts(
    @Args({ name: 'ids', type: () => [ID] }) ids: string[]
  ) {
    return this.postsService.batchDelete(ids)
  }

  @Mutation(() => PostItemModel)
  @Public()
  public async updatePV(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.updatePV(id)
  }

  @Mutation(() => PostItemModel)
  @Public()
  public async updateLike(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.updateLike(id)
  }

  @Query(() => [PostItemModel])
  @Public()
  public async getTopPVPosts(
    @Args({ name: 'limit', type: () => Int }) limit: number
  ) {
    return this.postsService.getTopPVPosts(limit)
  }

  @Query(() => [PostItemModel])
  @Public()
  public async getTopLikePosts(
    @Args({ name: 'limit', type: () => Int }) limit: number
  ) {
    return this.postsService.getTopLikePosts(limit)
  }

  @Query(() => TagsModel)
  @Public()
  public async getAllTags() {
    return this.postsService.getAllTags()
  }

  @Query(() => [ArchiveModel])
  @Public()
  public async archive() {
    return this.postsService.archive()
  }
}
