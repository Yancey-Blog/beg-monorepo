import { gql } from '@apollo/client'

export const ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    getAnnouncements {
      content
    }
  }
`

export const MOTTOS = gql`
  query GetMottos {
    getMottos {
      content
    }
  }
`

export const COVERS = gql`
  query GetAllPublicCovers {
    getAllPublicCovers {
      title
      coverUrl
    }
  }
`

export const OPEN_SOURCES = gql`
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
