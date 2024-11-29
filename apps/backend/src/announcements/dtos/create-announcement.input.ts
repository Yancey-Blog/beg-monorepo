import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType({ description: 'The input type for creating an announcement.' })
export class CreateAnnouncementInput {
  @Field({
    description: 'Announcement content.',
    nullable: false
  })
  @IsString()
  @IsNotEmpty()
  public readonly content: string
}
