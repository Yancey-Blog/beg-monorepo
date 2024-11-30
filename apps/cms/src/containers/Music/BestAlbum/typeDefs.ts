import { gql, TypedDocumentNode } from '@apollo/client'
import {
  BestAlbumModel,
  CreateBestAlbumInput,
  MutationDeleteBestAlbumByIdArgs,
  MutationDeleteBestAlbumsArgs,
  UpdateBestAlbumInput
} from '@repo/graphql-types/__generated__/graphql'
import { BATCH_DELETE_FRAGMENT } from 'src/graphql/graphqlFragment'
import { GraphQInputWrapper } from 'src/types/common'

const BEST_ALBUM_FRAGMENT = gql`
  fragment BestAlbumFragment on BestAlbumModel {
    _id
    title
    artist
    coverUrl
    mvUrl
    releaseDate
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_BEST_ALBUM: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<CreateBestAlbumInput>
> = gql`
  mutation CreateBestAlbum($input: CreateBestAlbumInput!) {
    createBestAlbum(input: $input) {
      ...BestAlbumFragment
    }
  }
  ${BEST_ALBUM_FRAGMENT}
`

export const UPDATE_ONE_BEST_ALBUM: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<UpdateBestAlbumInput>
> = gql`
  mutation UpdateBestAlbumById($input: UpdateBestAlbumInput!) {
    updateBestAlbumById(input: $input) {
      ...BestAlbumFragment
    }
  }
  ${BEST_ALBUM_FRAGMENT}
`

export const BEST_ALBUMS: TypedDocumentNode<{
  getBestAlbums: BestAlbumModel[]
}> = gql`
  query GetBestAlbums {
    getBestAlbums {
      ...BestAlbumFragment
    }
  }
  ${BEST_ALBUM_FRAGMENT}
`

export const DELETE_ONE_BEST_ALBUM: TypedDocumentNode<
  unknown,
  MutationDeleteBestAlbumByIdArgs
> = gql`
  mutation DeleteBestAlbumById($id: ID!) {
    deleteBestAlbumById(id: $id) {
      ...BestAlbumFragment
    }
  }
  ${BEST_ALBUM_FRAGMENT}
`

export const BATCH_DELETE_BEST_ALBUMS: TypedDocumentNode<
  unknown,
  MutationDeleteBestAlbumsArgs
> = gql`
  mutation DeleteBestAlbums($ids: [ID!]!) {
    deleteBestAlbums(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
