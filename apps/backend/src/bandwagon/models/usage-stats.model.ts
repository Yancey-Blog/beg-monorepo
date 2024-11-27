import { Field, ObjectType } from '@nestjs/graphql'
import { IsNumber, IsNotEmpty } from 'class-validator'

@ObjectType()
export class UsageStatesModel {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly timestamp: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly network_in_bytes: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly network_out_bytes: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly disk_read_bytes: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly disk_write_bytes: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly cpu_usage: number
}
