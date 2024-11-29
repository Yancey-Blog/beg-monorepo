import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateMottoInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly content: string
}
