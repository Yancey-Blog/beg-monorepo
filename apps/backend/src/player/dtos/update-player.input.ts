import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator'

@InputType()
export class UpdatePlayerInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

  @Field({ nullable: true })
  public readonly title?: string

  @Field({ nullable: true })
  public readonly artist?: string

  @Field({ nullable: true })
  public readonly lrc?: string

  @Field({ nullable: true })
  public readonly coverUrl?: string

  @Field({ nullable: true })
  public readonly musicFileUrl?: string

  @Field({ nullable: true })
  @IsBoolean()
  public readonly isPublic?: boolean
}
