import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsNotEmpty, IsString, IsUrl } from 'class-validator'

@InputType()
export class CreateYanceyMusicInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly soundCloudUrl: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly posterUrl: string

  @Field()
  @IsDate()
  @IsNotEmpty()
  public readonly releaseDate: Date
}
