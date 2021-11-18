import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class ValidateTOTPInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly code: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly key: string
}
