import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PostItemModel {
  @Field(() => ID)
  public readonly _id: string

  @Field()
  public readonly posterUrl: string

  @Field()
  public readonly title: string

  @Field()
  public readonly summary: string

  @Field()
  public readonly content: string

  @Field(() => [String])
  public readonly tags: string[]

  @Field()
  public readonly lastModifiedDate: Date

  @Field(() => Int)
  public readonly like: number

  @Field(() => Int)
  public readonly pv: number

  @Field()
  public readonly isPublic: boolean

  @Field()
  public readonly createdAt: Date

  @Field()
  public readonly updatedAt: Date

  @Field(() => PostItemModel, { nullable: true })
  // eslint-disable-next-line no-use-before-define
  public readonly prev?: PostItemModel

  @Field(() => PostItemModel, { nullable: true })
  // eslint-disable-next-line no-use-before-define
  public readonly next?: PostItemModel
}
