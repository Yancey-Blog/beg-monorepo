import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsDateString, IsBoolean } from 'class-validator'

@InputType()
export class CreateAgendaInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsDateString()
  @IsNotEmpty()
  public readonly startDate: string

  @Field()
  @IsBoolean()
  public readonly allDay: boolean

  @Field({ nullable: true })
  public readonly notes?: string

  @Field({ nullable: true })
  public readonly endDate?: string

  @Field({ nullable: true })
  public readonly rRule?: string

  @Field({ nullable: true })
  public readonly exDate?: string
}
