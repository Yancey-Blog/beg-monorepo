import { gql, TypedDocumentNode } from '@apollo/client'
import {
  BestAlbumModel,
  LiveTourModel,
  PlayerModel,
  YanceyMusicModel
} from '@repo/graphql-types/__generated__/graphql'

export const PLAYERS: TypedDocumentNode<{
  players: PlayerModel[]
}> = gql`
  query Players {
    players {
      title
      artist
      lrc
      coverUrl
      musicFileUrl
    }
  }
`

export const BEST_ALBUMS: TypedDocumentNode<{
  getBestAlbums: BestAlbumModel[]
}> = gql`
  query GetBestAlbums {
    getBestAlbums {
      _id
      title
      artist
      coverUrl
      mvUrl
      releaseDate
      createdAt
      updatedAt
    }
  }
`

export const LIVE_TOURS: TypedDocumentNode<{
  getLiveTours: LiveTourModel[]
}> = gql`
  query GetLiveTours {
    getLiveTours {
      _id
      title
      posterUrl
      showTime
      createdAt
      updatedAt
    }
  }
`

export const YANCEY_MUSIC: TypedDocumentNode<{
  getYanceyMusic: YanceyMusicModel[]
}> = gql`
  query GetYanceyMusic {
    getYanceyMusic {
      _id
      title
      soundCloudUrl
      posterUrl
      releaseDate
      createdAt
      updatedAt
    }
  }
`
