import { Field, InputType } from '@nestjs/graphql'
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength
} from 'class-validator'

@InputType()
export class CreatePostInput {
  @Field({ nullable: false })
  @IsString()
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsNotEmpty()
  public readonly posterUrl: string

  @Field({ nullable: false })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  public readonly title: string

  @Field({ nullable: false })
  @IsString()
  @IsNotEmpty()
  public readonly summary: string

  @Field({ nullable: false })
  @IsString()
  @IsNotEmpty()
  public readonly content: string

  @Field(() => [String], { nullable: false })
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsNotEmpty()
  public readonly tags: string[]

  @Field({ nullable: false })
  @IsDate()
  @IsNotEmpty()
  public readonly lastModifiedDate: Date

  @Field({ nullable: true })
  public readonly isPublic?: boolean
}
