import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsString, IsUrl } from 'class-validator'

@InputType()
export class CreateCoverInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly coverUrl: string

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly isPublic: boolean
}
