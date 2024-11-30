import {
  AnnouncementModel,
  CoverModel,
  MottoModel,
  OpenSourceModel,
  PostModel
} from '@repo/graphql-types/__generated__/graphql'
import type { GetServerSideProps, NextPage } from 'next'
import HomeContainer from 'src/containers/Home/Home'
import {
  ANNOUNCEMENTS,
  COVERS,
  MOTTOS,
  OPEN_SOURCES
} from 'src/containers/Home/typeDefs'
import Layout from 'src/containers/Layout/Layout'
import { POSTS } from 'src/containers/Post/typeDefs'
import { createApolloClient } from 'src/graphql/apolloClient'

export interface Props {
  announcements: AnnouncementModel[]
  mottos: MottoModel[]
  covers: CoverModel[]
  openSources: OpenSourceModel[]
  posts: PostModel
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

  const { data: announcements } = await client.query({
    query: ANNOUNCEMENTS
  })
  const { data: mottos } = await client.query({
    query: MOTTOS
  })
  const { data: covers } = await client.query({
    query: COVERS
  })
  const { data: openSources } = await client.query({
    query: OPEN_SOURCES
  })
  const { data } = await client.query({
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
