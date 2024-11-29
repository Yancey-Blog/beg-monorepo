import { useMutation } from '@apollo/client'
import { enqueueSnackbar } from 'notistack'
import {
  BATCH_DELETE_YANCEY_MUSIC,
  CREATE_ONE_YANCEY_MUSIC,
  DELETE_ONE_YANCEY_MUSIC,
  UPDATE_ONE_YANCEY_MUSIC,
  YANCEY_MUSIC
} from './typeDefs'

const useYanceyMusic = () => {
  const [createYanceyMusic, { loading: isCreating }] = useMutation(
    CREATE_ONE_YANCEY_MUSIC,
    {
      refetchQueries: [YANCEY_MUSIC],
      onCompleted() {
        enqueueSnackbar('Create live tour success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [updateYanceyMusicById, { loading: isUpdating }] = useMutation(
    UPDATE_ONE_YANCEY_MUSIC,
    {
      refetchQueries: [YANCEY_MUSIC],
      onCompleted() {
        enqueueSnackbar('Update live tour success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [deleteYanceyMusicById, { loading: isDeletingOne }] = useMutation(
    DELETE_ONE_YANCEY_MUSIC,
    {
      refetchQueries: [YANCEY_MUSIC],
      onCompleted() {
        enqueueSnackbar('Delete live tour successfully!', {
          variant: 'success'
        })
      },
      onError() {}
    }
  )

  const [deleteYanceyMusics, { loading: isDeletingMultiple }] = useMutation(
    BATCH_DELETE_YANCEY_MUSIC,
    {
      refetchQueries: [YANCEY_MUSIC],
      onCompleted() {
        enqueueSnackbar('Delete live tours successfully!', {
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
    createYanceyMusic,
    updateYanceyMusicById,
    deleteYanceyMusicById,
    deleteYanceyMusics
  }
}

export default useYanceyMusic
