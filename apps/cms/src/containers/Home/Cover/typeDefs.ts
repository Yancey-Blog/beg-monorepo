import { gql, TypedDocumentNode } from '@apollo/client'
import {
  CoverModel,
  CreateCoverInput,
  ExchangePositionInput,
  MutationDeleteCoverByIdArgs,
  MutationDeleteCoversArgs,
  UpdateCoverInput
} from 'backend/src/__generated__/graphql'
import {
  BATCH_DELETE_FRAGMENT,
  BATCH_UPDATE_FRAGMENT
} from 'src/graphql/graphqlFragment'
import { GraphQInputWrapper } from 'src/types/common'

const COVER_FRAGMENT = gql`
  fragment CoverFragment on CoverModel {
    _id
    title
    coverUrl
    weight
    isPublic
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_COVER: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<CreateCoverInput>
> = gql`
  mutation CreateCover($input: CreateCoverInput!) {
    createCover(input: $input) {
      ...CoverFragment
    }
  }
  ${COVER_FRAGMENT}
`

export const UPDATE_ONE_COVER: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<UpdateCoverInput>
> = gql`
  mutation UpdateCoverById($input: UpdateCoverInput!) {
    updateCoverById(input: $input) {
      ...CoverFragment
    }
  }
  ${COVER_FRAGMENT}
`

export const EXCHANGE_POSITION: TypedDocumentNode<
  unknown,
  ExchangePositionInput
> = gql`
  mutation ExchangePositionCover($input: ExchangePositionInput!) {
    exchangePositionCover(input: $input) {
      ...CoverFragment
    }
  }
  ${COVER_FRAGMENT}
`

export const COVERS: TypedDocumentNode<{
  getCovers: CoverModel[]
}> = gql`
  query GetCovers {
    getCovers {
      ...CoverFragment
    }
  }
  ${COVER_FRAGMENT}
`

export const DELETE_ONE_COVER: TypedDocumentNode<
  unknown,
  MutationDeleteCoverByIdArgs
> = gql`
  mutation DeleteCoverById($id: ID!) {
    deleteCoverById(id: $id) {
      ...CoverFragment
    }
  }
  ${COVER_FRAGMENT}
`

export const BATCH_DELETE_COVERS: TypedDocumentNode<
  unknown,
  MutationDeleteCoversArgs
> = gql`
  mutation DeleteCovers($ids: [ID!]!) {
    deleteCovers(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`

export const BATCH_PUBLIC_COVERS = gql`
  mutation DeleteCovers($ids: [ID!]!) {
    publicCovers(ids: $ids) {
      ...BatchUpdateFragment
    }
  }
  ${BATCH_UPDATE_FRAGMENT}
`
