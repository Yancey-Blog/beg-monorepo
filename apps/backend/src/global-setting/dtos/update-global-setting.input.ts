import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'

@InputType()
export class UpdateGlobalSettingInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

  @Field({ nullable: true })
  public readonly releasePostId?: string

  @Field({ nullable: true })
  public readonly cvPostId?: string

  @Field({ nullable: true })
  public readonly isGrayTheme?: boolean
}
