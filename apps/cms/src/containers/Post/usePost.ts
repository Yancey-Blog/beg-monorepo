import { useLazyQuery, useMutation } from '@apollo/client'
import { enqueueSnackbar } from 'notistack'
import {
  deletePostOnAlgolia,
  deletePostsOnAlgolia
} from './algolia/algoliaSearch'
import {
  BATCH_DELETE_POSTS,
  CREATE_POST_STATISTICS,
  DELETE_ONE_POST,
  POSTS,
  UPDATE_ONE_POST
} from './typeDefs'

const usePost = () => {
  const [fetchPostsByPage, { loading: isFetching, data: posts }] = useLazyQuery(
    POSTS,
    {
      notifyOnNetworkStatusChange: true
    }
  )

  const [createPostStatistics] = useMutation(CREATE_POST_STATISTICS)

  const [updatePostById] = useMutation(UPDATE_ONE_POST, {
    onCompleted(data) {
      const { _id, title, isPublic } = data.updatePostById
      enqueueSnackbar(`「${title}」 is ${isPublic ? 'public' : 'hide'}.`, {
        variant: 'success'
      })

      createPostStatistics({
        variables: {
          input: {
            postId: _id,
            postName: title,
            scenes: `switched to ${isPublic ? 'public' : 'hide'}`
          }
        }
      })
    }
  })

  const [deletePostById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_POST,
    {
      onCompleted(data) {
        const { _id } = data.deletePostById
        enqueueSnackbar('Delete success!', { variant: 'success' })
        deletePostOnAlgolia(_id)
      }
    }
  )

  const [deletePosts, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_POSTS,
    {
      onCompleted(data) {
        const { ids } = data.deletePosts
        enqueueSnackbar('Delete success!', { variant: 'success' })
        deletePostsOnAlgolia(ids)
      }
    }
  )

  return {
    posts,
    loading: isFetching || isBatchDeleting || isDeleting,
    fetchPostsByPage,
    updatePostById,
    deletePostById,
    deletePosts
  }
}

export default usePost
