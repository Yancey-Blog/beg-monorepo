import { gql, TypedDocumentNode } from '@apollo/client'
import {
  CreateYanceyMusicInput,
  MutationDeleteYanceyMusicArgs,
  MutationDeleteYanceyMusicByIdArgs,
  UpdateYanceyMusicInput,
  YanceyMusicModel
} from '@repo/graphql-types/__generated__/graphql'
import { BATCH_DELETE_FRAGMENT } from 'src/graphql/graphqlFragment'
import { GraphQInputWrapper } from 'src/types/common'

const YANCEY_MUSIC_FRAGMENT = gql`
  fragment YanceyMusicFragment on YanceyMusicModel {
    _id
    title
    soundCloudUrl
    posterUrl
    releaseDate
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_YANCEY_MUSIC: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<CreateYanceyMusicInput>
> = gql`
  mutation CreateYanceyMusic($input: CreateYanceyMusicInput!) {
    createYanceyMusic(input: $input) {
      ...YanceyMusicFragment
    }
  }
  ${YANCEY_MUSIC_FRAGMENT}
`

export const UPDATE_ONE_YANCEY_MUSIC: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<UpdateYanceyMusicInput>
> = gql`
  mutation UpdateYanceyMusicById($input: UpdateYanceyMusicInput!) {
    updateYanceyMusicById(input: $input) {
      ...YanceyMusicFragment
    }
  }
  ${YANCEY_MUSIC_FRAGMENT}
`

export const YANCEY_MUSIC: TypedDocumentNode<{
  getYanceyMusic: YanceyMusicModel[]
}> = gql`
  query GetYanceyMusic {
    getYanceyMusic {
      ...YanceyMusicFragment
    }
  }
  ${YANCEY_MUSIC_FRAGMENT}
`

export const DELETE_ONE_YANCEY_MUSIC: TypedDocumentNode<
  unknown,
  MutationDeleteYanceyMusicByIdArgs
> = gql`
  mutation DeleteYanceyMusicById($id: ID!) {
    deleteYanceyMusicById(id: $id) {
      ...YanceyMusicFragment
    }
  }
  ${YANCEY_MUSIC_FRAGMENT}
`

export const BATCH_DELETE_YANCEY_MUSIC: TypedDocumentNode<
  unknown,
  MutationDeleteYanceyMusicArgs
> = gql`
  mutation DeleteYanceyMusic($ids: [ID!]!) {
    deleteYanceyMusic(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
