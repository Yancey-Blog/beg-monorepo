import { gql, TypedDocumentNode } from '@apollo/client'
import {
  AnnouncementModel,
  CoverModel,
  MottoModel,
  OpenSourceModel
} from '@repo/graphql-types/__generated__/graphql'

export const ANNOUNCEMENTS: TypedDocumentNode<{
  getAnnouncements: AnnouncementModel[]
}> = gql`
  query GetAnnouncements {
    getAnnouncements {
      content
    }
  }
`

export const MOTTOS: TypedDocumentNode<{
  getMottos: MottoModel[]
}> = gql`
  query GetMottos {
    getMottos {
      content
    }
  }
`

export const COVERS: TypedDocumentNode<{
  getAllPublicCovers: CoverModel[]
}> = gql`
  query GetAllPublicCovers {
    getAllPublicCovers {
      title
      coverUrl
    }
  }
`

export const OPEN_SOURCES: TypedDocumentNode<{
  getOpenSources: OpenSourceModel[]
}> = gql`
  query GetOpenSources {
    getOpenSources {
      _id
      title
      description
      url
      posterUrl
    }
  }
`
