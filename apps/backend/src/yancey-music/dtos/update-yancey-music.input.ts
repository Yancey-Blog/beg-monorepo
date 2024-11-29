import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'
import { CreateYanceyMusicInput } from './create-yancey-music.input'

@InputType()
export class UpdateYanceyMusicInput extends CreateYanceyMusicInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly id: string
}
