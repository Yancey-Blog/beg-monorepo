import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsString, IsUrl } from 'class-validator'

@InputType()
export class CreatePlayerInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly artist: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly lrc: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly coverUrl: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly musicFileUrl: string

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly isPublic: boolean
}
