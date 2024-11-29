import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PostsResolver } from './posts.resolver'
import { PostsService } from './posts.service'
import { PostSchema } from './schemas/posts.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  providers: [PostsResolver, PostsService]
})
export class PostsModule {}
