import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator'

@InputType()
export class UpdateCoverInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

  @Field({ nullable: true })
  public readonly title?: string

  @Field({ nullable: true })
  public readonly coverUrl?: string

  @Field({ nullable: true })
  @IsBoolean()
  public readonly isPublic?: boolean
}
