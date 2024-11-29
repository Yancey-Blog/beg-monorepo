import type { GetServerSideProps, NextPage } from 'next'
import HomeContainer from 'src/containers/Home/Home'
import {
  ANNOUNCEMENTS,
  COVERS,
  MOTTOS,
  OPEN_SOURCES
} from 'src/containers/Home/typeDefs'
import {
  AnnouncementQuery,
  CoverQuery,
  IAnnouncement,
  ICover,
  IMotto,
  IOpenSource,
  MottoQuery,
  OpenSourceQuery
} from 'src/containers/Home/types'
import Layout from 'src/containers/Layout/Layout'
import { POSTS } from 'src/containers/Post/typeDefs'
import { IPost, PostQuery, PostVars } from 'src/containers/Post/types'
import { createApolloClient } from 'src/graphql/apolloClient'

export interface Props {
  announcements: IAnnouncement[]
  mottos: IMotto[]
  covers: ICover[]
  openSources: IOpenSource[]
  posts: IPost
}

const Home: NextPage<Props> = (props) => {
  return (
    <Layout>
      <HomeContainer data={props} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createApolloClient()

  const { data: announcements } = await client.query<AnnouncementQuery>({
    query: ANNOUNCEMENTS
  })
  const { data: mottos } = await client.query<MottoQuery>({
    query: MOTTOS
  })
  const { data: covers } = await client.query<CoverQuery>({
    query: COVERS
  })
  const { data: openSources } = await client.query<OpenSourceQuery>({
    query: OPEN_SOURCES
  })
  const { data } = await client.query<PostQuery, PostVars>({
    query: POSTS,
    variables: {
      input: {
        page: 1,
        pageSize: 10
      }
    }
  })

  return {
    props: {
      announcements: announcements.getAnnouncements,
      mottos: mottos.getMottos,
      covers: covers.getAllPublicCovers,
      openSources: openSources.getOpenSources,
      posts: data.posts
    }
  }
}

export default Home
