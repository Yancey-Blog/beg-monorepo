import { useMutation } from '@apollo/client'
import { enqueueSnackbar } from 'notistack'
import {
  BATCH_DELETE_OPEN_SOURCE,
  CREATE_ONE_OPEN_SOURCE,
  DELETE_ONE_OPEN_SOURCE,
  OPEN_SOURCES,
  UPDATE_ONE_OPEN_SOURCE
} from './typeDefs'

const useOpenSource = () => {
  const [createOpenSource, { loading: isCreating }] = useMutation(
    CREATE_ONE_OPEN_SOURCE,
    {
      refetchQueries: [OPEN_SOURCES],
      onCompleted() {
        enqueueSnackbar('Create open source success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [updateOpenSourceById, { loading: isUpdating }] = useMutation(
    UPDATE_ONE_OPEN_SOURCE,
    {
      refetchQueries: [OPEN_SOURCES],
      onCompleted() {
        enqueueSnackbar('Update open source success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [deleteOpenSourceById, { loading: isDeletingOne }] = useMutation(
    DELETE_ONE_OPEN_SOURCE,
    {
      refetchQueries: [OPEN_SOURCES],
      onCompleted() {
        enqueueSnackbar('Delete open source successfully!', {
          variant: 'success'
        })
      },
      onError() {}
    }
  )

  const [deleteOpenSources, { loading: isDeletingMultiple }] = useMutation(
    BATCH_DELETE_OPEN_SOURCE,
    {
      refetchQueries: [OPEN_SOURCES],
      onCompleted() {
        enqueueSnackbar('Delete open sources successfully!', {
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
    createOpenSource,
    updateOpenSourceById,
    deleteOpenSourceById,
    deleteOpenSources
  }
}

export default useOpenSource
