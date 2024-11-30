import { gql, TypedDocumentNode } from '@apollo/client'
import {
  CreateMottoInput,
  ExchangePositionInput,
  MottoModel,
  MutationDeleteMottoByIdArgs,
  MutationDeleteMottosArgs,
  UpdateMottoInput
} from '@repo/graphql-types/__generated__/graphql'
import { BATCH_DELETE_FRAGMENT } from 'src/graphql/graphqlFragment'
import { GraphQInputWrapper } from 'src/types/common'

const MOTTO_FRAGMENT = gql`
  fragment MottoFragment on MottoModel {
    _id
    content
    weight
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_MOTTO: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<CreateMottoInput>
> = gql`
  mutation CreateMotto($input: CreateMottoInput!) {
    createMotto(input: $input) {
      ...MottoFragment
    }
  }
  ${MOTTO_FRAGMENT}
`

export const UPDATE_ONE_MOTTO: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<UpdateMottoInput>
> = gql`
  mutation UpdateMottoById($input: UpdateMottoInput!) {
    updateMottoById(input: $input) {
      ...MottoFragment
    }
  }
  ${MOTTO_FRAGMENT}
`

export const EXCHANGE_POSITION: TypedDocumentNode<
  unknown,
  ExchangePositionInput
> = gql`
  mutation ExchangePositionMotto($input: ExchangePositionInput!) {
    exchangePositionMotto(input: $input) {
      ...MottoFragment
    }
  }
  ${MOTTO_FRAGMENT}
`

export const MOTTOS: TypedDocumentNode<{
  getMottos: MottoModel[]
}> = gql`
  query GetMottos {
    getMottos {
      ...MottoFragment
    }
  }
  ${MOTTO_FRAGMENT}
`

export const DELETE_ONE_MOTTO: TypedDocumentNode<
  unknown,
  MutationDeleteMottoByIdArgs
> = gql`
  mutation DeleteMottoById($id: ID!) {
    deleteMottoById(id: $id) {
      ...MottoFragment
    }
  }
  ${MOTTO_FRAGMENT}
`

export const BATCH_DELETE_MOTTO: TypedDocumentNode<
  unknown,
  MutationDeleteMottosArgs
> = gql`
  mutation DeleteMottos($ids: [ID!]!) {
    deleteMottos(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
