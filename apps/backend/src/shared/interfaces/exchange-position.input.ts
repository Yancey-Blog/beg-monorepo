import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

@InputType()
export class ExchangePositionInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly exchangedId: string

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly weight: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly exchangedWeight: number
}
