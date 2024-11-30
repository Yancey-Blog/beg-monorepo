import { gql, TypedDocumentNode } from '@apollo/client'
import {
  AnnouncementModel,
  CreateAnnouncementInput,
  ExchangePositionInput,
  MutationDeleteAnnouncementByIdArgs,
  MutationDeleteAnnouncementsArgs,
  UpdateAnnouncementInput
} from '@repo/graphql-types/__generated__/graphql'
import { BATCH_DELETE_FRAGMENT } from 'src/graphql/graphqlFragment'
import { GraphQInputWrapper } from 'src/types/common'

const ANNOUNCEMENT_FRAGMENT = gql`
  fragment AnnouncementFragment on AnnouncementModel {
    _id
    content
    weight
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_ANNOUNCEMENT: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<CreateAnnouncementInput>
> = gql`
  mutation CreateAnnouncement($input: CreateAnnouncementInput!) {
    createAnnouncement(input: $input) {
      ...AnnouncementFragment
    }
  }
  ${ANNOUNCEMENT_FRAGMENT}
`

export const UPDATE_ONE_ANNOUNCEMENT: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<UpdateAnnouncementInput>
> = gql`
  mutation UpdateAnnouncementById($input: UpdateAnnouncementInput!) {
    updateAnnouncementById(input: $input) {
      ...AnnouncementFragment
    }
  }
  ${ANNOUNCEMENT_FRAGMENT}
`

export const EXCHANGE_POSITION: TypedDocumentNode<
  unknown,
  ExchangePositionInput
> = gql`
  mutation ExchangePositionAnnouncement($input: ExchangePositionInput!) {
    exchangePositionAnnouncement(input: $input) {
      ...AnnouncementFragment
    }
  }
  ${ANNOUNCEMENT_FRAGMENT}
`

export const ANNOUNCEMENTS: TypedDocumentNode<{
  getAnnouncements: AnnouncementModel[]
}> = gql`
  query GetAnnouncements {
    getAnnouncements {
      ...AnnouncementFragment
    }
  }
  ${ANNOUNCEMENT_FRAGMENT}
`

export const DELETE_ONE_ANNOUNCEMENT: TypedDocumentNode<
  unknown,
  MutationDeleteAnnouncementByIdArgs
> = gql`
  mutation DeleteAnnouncementById($id: ID!) {
    deleteAnnouncementById(id: $id) {
      ...AnnouncementFragment
    }
  }
  ${ANNOUNCEMENT_FRAGMENT}
`

export const BATCH_DELETE_ANNOUNCEMENT: TypedDocumentNode<
  unknown,
  MutationDeleteAnnouncementsArgs
> = gql`
  mutation DeleteAnnouncements($ids: [ID!]!) {
    deleteAnnouncements(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
