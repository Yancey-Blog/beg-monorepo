import type { GetServerSideProps, NextPage } from 'next'
import Layout from 'src/containers/Layout/Layout'
import PostDetailContainer, {
  Props as PostDetailProps
} from 'src/containers/Post/PostDetail/PostDetail'
import { createApolloClient } from 'src/graphql/apolloClient'
import { GET_POST_BY_ID } from 'src/containers/Post/typeDefs'
import { GetPostByIdQuery, GetPostByIdVar } from 'src/containers/Post/types'

const PostDetail: NextPage<PostDetailProps> = ({ post }) => {
  return (
    <Layout title={post.title}>
      <PostDetailContainer post={post} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = createApolloClient()

  const { data: post, error } = await client.query<
    GetPostByIdQuery,
    GetPostByIdVar
  >({
    query: GET_POST_BY_ID,
    variables: {
      id: context.params?.id as string
    }
  })

  if (!post || error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }

  return {
    props: {
      post: post.getPostById
    }
  }
}

export default PostDetail
