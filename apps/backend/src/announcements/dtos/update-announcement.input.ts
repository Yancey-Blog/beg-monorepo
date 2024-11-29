import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpdateAnnouncementInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly id: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly content: string
}
