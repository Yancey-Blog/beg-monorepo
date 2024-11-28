import { useMutation } from '@apollo/client'
import { enqueueSnackbar } from 'notistack'
import {
  BATCH_DELETE_COVERS,
  COVERS,
  CREATE_ONE_COVER,
  DELETE_ONE_COVER,
  EXCHANGE_POSITION,
  UPDATE_ONE_COVER
} from './typeDefs'

const useCover = () => {
  const [createCover, { loading: isCreating }] = useMutation(CREATE_ONE_COVER, {
    refetchQueries: [COVERS],
    onCompleted() {
      enqueueSnackbar('Create cover success!', { variant: 'success' })
    },
    onError() {}
  })

  const [updateCoverById, { loading: isUpdating }] = useMutation(
    UPDATE_ONE_COVER,
    {
      refetchQueries: [COVERS],
      onCompleted() {
        enqueueSnackbar('Update cover success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [exchangePosition, { loading: isExchanging }] = useMutation(
    EXCHANGE_POSITION,
    {
      onCompleted() {
        enqueueSnackbar('Update cover successfully!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [deleteCoverById, { loading: isDeletingOne }] = useMutation(
    DELETE_ONE_COVER,
    {
      refetchQueries: [COVERS],
      onCompleted() {
        enqueueSnackbar('Delete cover successfully!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [deleteCovers, { loading: isDeletingMultiple }] = useMutation(
    BATCH_DELETE_COVERS,
    {
      refetchQueries: [COVERS],
      onCompleted() {
        enqueueSnackbar('Delete covers successfully!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const loading =
    isCreating ||
    isUpdating ||
    isCreating ||
    isDeletingOne ||
    isExchanging ||
    isDeletingMultiple

  return {
    loading,
    createCover,
    exchangePosition,
    updateCoverById,
    deleteCoverById,
    deleteCovers
  }
}

export default useCover
