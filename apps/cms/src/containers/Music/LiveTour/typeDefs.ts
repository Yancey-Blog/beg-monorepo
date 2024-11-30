import { gql, TypedDocumentNode } from '@apollo/client'
import {
  CreateLiveTourInput,
  LiveTourModel,
  MutationDeleteLiveTourByIdArgs,
  MutationDeleteLiveToursArgs,
  UpdateLiveTourInput
} from '@repo/graphql-types/__generated__/graphql'
import { BATCH_DELETE_FRAGMENT } from 'src/graphql/graphqlFragment'
import { GraphQInputWrapper } from 'src/types/common'

const LIVE_TOUR_FRAGMENT = gql`
  fragment LiveTourFragment on LiveTourModel {
    _id
    title
    posterUrl
    showTime
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_LIVE_TOUR: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<CreateLiveTourInput>
> = gql`
  mutation CreateLiveTour($input: CreateLiveTourInput!) {
    createLiveTour(input: $input) {
      ...LiveTourFragment
    }
  }
  ${LIVE_TOUR_FRAGMENT}
`

export const UPDATE_ONE_LIVE_TOUR: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<UpdateLiveTourInput>
> = gql`
  mutation UpdateLiveTourById($input: UpdateLiveTourInput!) {
    updateLiveTourById(input: $input) {
      ...LiveTourFragment
    }
  }
  ${LIVE_TOUR_FRAGMENT}
`

export const LIVE_TOURS: TypedDocumentNode<{
  getLiveTours: LiveTourModel[]
}> = gql`
  query GetLiveTours {
    getLiveTours {
      ...LiveTourFragment
    }
  }
  ${LIVE_TOUR_FRAGMENT}
`

export const DELETE_ONE_LIVE_TOUR: TypedDocumentNode<
  unknown,
  MutationDeleteLiveTourByIdArgs
> = gql`
  mutation DeleteLiveTourById($id: ID!) {
    deleteLiveTourById(id: $id) {
      ...LiveTourFragment
    }
  }
  ${LIVE_TOUR_FRAGMENT}
`

export const BATCH_DELETE_LIVE_TOUR: TypedDocumentNode<
  unknown,
  MutationDeleteLiveToursArgs
> = gql`
  mutation DeleteLiveTours($ids: [ID!]!) {
    deleteLiveTours(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
