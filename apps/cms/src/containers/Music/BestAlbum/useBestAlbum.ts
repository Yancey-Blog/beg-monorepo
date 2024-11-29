import { useMutation } from '@apollo/client'
import { enqueueSnackbar } from 'notistack'
import {
  BATCH_DELETE_BEST_ALBUMS,
  BEST_ALBUMS,
  CREATE_ONE_BEST_ALBUM,
  DELETE_ONE_BEST_ALBUM,
  UPDATE_ONE_BEST_ALBUM
} from './typeDefs'

const useBestAlbum = () => {
  const [createBestAlbum, { loading: isCreating }] = useMutation(
    CREATE_ONE_BEST_ALBUM,
    {
      refetchQueries: [BEST_ALBUMS],
      onCompleted() {
        enqueueSnackbar('Create best album success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [updateBestAlbumById, { loading: isUpdating }] = useMutation(
    UPDATE_ONE_BEST_ALBUM,
    {
      refetchQueries: [BEST_ALBUMS],
      onCompleted() {
        enqueueSnackbar('Update best album success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [deleteBestAlbumById, { loading: isDeletingOne }] = useMutation(
    DELETE_ONE_BEST_ALBUM,
    {
      refetchQueries: [BEST_ALBUMS],
      onCompleted() {
        enqueueSnackbar('Delete best album successfully!', {
          variant: 'success'
        })
      },
      onError() {}
    }
  )

  const [deleteBestAlbums, { loading: isDeletingMultiple }] = useMutation(
    BATCH_DELETE_BEST_ALBUMS,
    {
      refetchQueries: [BEST_ALBUMS],
      onCompleted() {
        enqueueSnackbar('Delete best albums successfully!', {
          variant: 'success'
        })
      },
      onError() {}
    }
  )

  const loading =
    isCreating ||
    isUpdating ||
    isCreating ||
    isDeletingOne ||
    isDeletingMultiple

  return {
    loading,
    createBestAlbum,
    updateBestAlbumById,
    deleteBestAlbumById,
    deleteBestAlbums
  }
}

export default useBestAlbum
