import { useMutation } from '@apollo/client'
import { enqueueSnackbar } from 'notistack'
import {
  BATCH_DELETE_LIVE_TOUR,
  CREATE_ONE_LIVE_TOUR,
  DELETE_ONE_LIVE_TOUR,
  LIVE_TOURS,
  UPDATE_ONE_LIVE_TOUR
} from './typeDefs'

const useLiveTour = () => {
  const [createLiveTour, { loading: isCreating }] = useMutation(
    CREATE_ONE_LIVE_TOUR,
    {
      refetchQueries: [LIVE_TOURS],
      onCompleted() {
        enqueueSnackbar('Create live tour success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [updateLiveTourById, { loading: isUpdating }] = useMutation(
    UPDATE_ONE_LIVE_TOUR,
    {
      refetchQueries: [LIVE_TOURS],
      onCompleted() {
        enqueueSnackbar('Update live tour success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [deleteLiveTourById, { loading: isDeletingOne }] = useMutation(
    DELETE_ONE_LIVE_TOUR,
    {
      refetchQueries: [LIVE_TOURS],
      onCompleted() {
        enqueueSnackbar('Delete live tour successfully!', {
          variant: 'success'
        })
      },
      onError() {}
    }
  )

  const [deleteLiveTours, { loading: isDeletingMultiple }] = useMutation(
    BATCH_DELETE_LIVE_TOUR,
    {
      refetchQueries: [LIVE_TOURS],
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
    createLiveTour,
    updateLiveTourById,
    deleteLiveTourById,
    deleteLiveTours
  }
}

export default useLiveTour
