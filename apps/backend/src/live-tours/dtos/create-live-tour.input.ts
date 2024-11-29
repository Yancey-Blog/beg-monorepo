import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateLiveTourInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly posterUrl: string

  @Field()
  @IsDate()
  @IsNotEmpty()
  public readonly showTime: Date
}
