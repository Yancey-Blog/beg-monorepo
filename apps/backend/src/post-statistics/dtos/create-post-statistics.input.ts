import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreatePostStatisticsInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly postId: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly postName: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly scenes: string
}
