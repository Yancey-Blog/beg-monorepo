import { ArchiveModel } from '@repo/graphql-types/__generated__/graphql'
import { GetServerSideProps, NextPage } from 'next'
import ArchiveContainer from 'src/containers/Archive'
import Layout from 'src/containers/Layout'
import { ARCHIVE } from 'src/containers/Post/typeDefs'
import { createApolloClient } from 'src/graphql/apolloClient'

export interface Props {
  archive: ArchiveModel[]
}

const Archive: NextPage<Props> = (props) => {
  return (
    <Layout title="Archive | Yancey Inc.">
      <ArchiveContainer data={props} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createApolloClient()

  const { data: archive } = await client.query({
    query: ARCHIVE
  })

  return {
    props: {
      archive: archive.archive
    }
  }
}

export default Archive
