import { gql, TypedDocumentNode } from '@apollo/client'
import {
  CreatePlayerInput,
  ExchangePositionInput,
  MutationDeletePlayerByIdArgs,
  MutationDeletePlayersArgs,
  PlayerModel,
  UpdatePlayerInput
} from '@repo/graphql-types/__generated__/graphql'
import { BATCH_DELETE_FRAGMENT } from 'src/graphql/graphqlFragment'
import { GraphQInputWrapper } from 'src/types/common'

const PLAYER_FRAGMENT = gql`
  fragment PlayerFragment on PlayerModel {
    _id
    title
    artist
    lrc
    coverUrl
    musicFileUrl
    isPublic
    weight
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_PLAYER: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<CreatePlayerInput>
> = gql`
  mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
      ...PlayerFragment
    }
  }
  ${PLAYER_FRAGMENT}
`

export const UPDATE_ONE_PLAYER: TypedDocumentNode<
  unknown,
  GraphQInputWrapper<UpdatePlayerInput>
> = gql`
  mutation UpdatePlayerById($input: UpdatePlayerInput!) {
    updatePlayerById(input: $input) {
      ...PlayerFragment
    }
  }
  ${PLAYER_FRAGMENT}
`

export const EXCHANGE_POSITION: TypedDocumentNode<
  unknown,
  ExchangePositionInput
> = gql`
  mutation ExchangePositionPlayer($input: ExchangePositionInput!) {
    exchangePositionPlayer(input: $input) {
      ...PlayerFragment
    }
  }
  ${PLAYER_FRAGMENT}
`

export const PLAYERS: TypedDocumentNode<{
  getPlayers: PlayerModel[]
}> = gql`
  query GetPlayers {
    getPlayers {
      ...PlayerFragment
    }
  }
  ${PLAYER_FRAGMENT}
`

export const DELETE_ONE_PLAYER: TypedDocumentNode<
  unknown,
  MutationDeletePlayerByIdArgs
> = gql`
  mutation DeletePlayerById($id: ID!) {
    deletePlayerById(id: $id) {
      ...PlayerFragment
    }
  }
  ${PLAYER_FRAGMENT}
`

export const BATCH_DELETE_PLAYER: TypedDocumentNode<
  unknown,
  MutationDeletePlayersArgs
> = gql`
  mutation DeletePlayers($ids: [ID!]!) {
    deletePlayers(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
