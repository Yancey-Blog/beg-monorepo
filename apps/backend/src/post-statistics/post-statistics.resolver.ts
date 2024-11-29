import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePostStatisticsInput } from './dtos/create-post-statistics.input'
import { PostStatisticsGroupModel } from './models/post-statistics-group.model'
import { PostStatisticsModel } from './models/post-statistics.model'
import { PostStatisticsService } from './post-statistics.service'

@Resolver()
export class PostStatisticsResolver {
  constructor(private readonly postStatisticsService: PostStatisticsService) {
    this.postStatisticsService = postStatisticsService
  }

  @Query(() => [PostStatisticsGroupModel])
  public async getPostStatistics(): Promise<PostStatisticsGroupModel[]> {
    return this.postStatisticsService.findAll()
  }

  @Mutation(() => PostStatisticsModel)
  public async createPostStatistics(
    @Args('input') input: CreatePostStatisticsInput
  ): Promise<PostStatisticsModel> {
    return this.postStatisticsService.create(input)
  }
}
