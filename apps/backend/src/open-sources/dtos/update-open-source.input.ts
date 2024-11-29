import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'
import { CreateOpenSourceInput } from './create-open-source.input'

@InputType()
export class UpdateOpenSourceInput extends CreateOpenSourceInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly id: string
}
