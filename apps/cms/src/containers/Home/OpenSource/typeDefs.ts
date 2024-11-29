import { gql, TypedDocumentNode } from '@apollo/client'
import {
  CreateOpenSourceInput,
  MutationDeleteOpenSourceByIdArgs,
  MutationDeleteOpenSourcesArgs,
  OpenSourceModel,
  UpdateOpenSourceInput
} from 'backend/src/__generated__/graphql'
import { BATCH_DELETE_FRAGMENT } from 'src/graphql/graphqlFragment'
import { GraphQInputWrapper } from 'src/types/common'

const OPEN_SOURCE_FRAGMENT = gql`
  fragment OpenSourceFragment on OpenSourceModel {
    _id
    title
    description
    url
    posterUrl
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_OPEN_SOURCE: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<CreateOpenSourceInput>
> = gql`
  mutation CreateOpenSource($input: CreateOpenSourceInput!) {
    createOpenSource(input: $input) {
      ...OpenSourceFragment
    }
  }
  ${OPEN_SOURCE_FRAGMENT}
`

export const UPDATE_ONE_OPEN_SOURCE: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<UpdateOpenSourceInput>
> = gql`
  mutation UpdateOpenSourceById($input: UpdateOpenSourceInput!) {
    updateOpenSourceById(input: $input) {
      ...OpenSourceFragment
    }
  }
  ${OPEN_SOURCE_FRAGMENT}
`

export const OPEN_SOURCES: TypedDocumentNode<{
  getOpenSources: OpenSourceModel[]
}> = gql`
  query GetOpenSources {
    getOpenSources {
      ...OpenSourceFragment
    }
  }
  ${OPEN_SOURCE_FRAGMENT}
`

export const DELETE_ONE_OPEN_SOURCE: TypedDocumentNode<
  unknown,
  MutationDeleteOpenSourceByIdArgs
> = gql`
  mutation DeleteOpenSourceById($id: ID!) {
    deleteOpenSourceById(id: $id) {
      ...OpenSourceFragment
    }
  }
  ${OPEN_SOURCE_FRAGMENT}
`

export const BATCH_DELETE_OPEN_SOURCE: TypedDocumentNode<
  unknown,
  MutationDeleteOpenSourcesArgs
> = gql`
  mutation DeleteOpenSources($ids: [ID!]!) {
    deleteOpenSources(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
