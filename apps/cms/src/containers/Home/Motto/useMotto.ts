import { useMutation } from '@apollo/client'
import { enqueueSnackbar } from 'notistack'
import {
  BATCH_DELETE_MOTTO,
  CREATE_ONE_MOTTO,
  DELETE_ONE_MOTTO,
  EXCHANGE_POSITION,
  MOTTOS,
  UPDATE_ONE_MOTTO
} from './typeDefs'

const useMotto = () => {
  const [createMotto, { loading: isCreating }] = useMutation(CREATE_ONE_MOTTO, {
    refetchQueries: [MOTTOS],

    onCompleted() {
      enqueueSnackbar('Create motto successfully!', {
        variant: 'success'
      })
    },

    onError() {}
  })

  const [updateMottoById, { loading: isUpdating }] = useMutation(
    UPDATE_ONE_MOTTO,
    {
      refetchQueries: [MOTTOS],

      onCompleted() {
        enqueueSnackbar('Update motto successfully!', {
          variant: 'success'
        })
      },

      onError() {}
    }
  )

  const [exchangePosition, { loading: isExchanging }] = useMutation(
    EXCHANGE_POSITION,
    {
      onCompleted() {
        enqueueSnackbar('Exchange position successfully!', {
          variant: 'success'
        })
      },

      onError() {}
    }
  )

  const [deleteMottoById, { loading: isDeletingOne }] = useMutation(
    DELETE_ONE_MOTTO,
    {
      refetchQueries: [MOTTOS],

      onCompleted() {
        enqueueSnackbar('Delete motto successfully!', {
          variant: 'success'
        })
      },

      onError() {}
    }
  )

  const [deleteMottos, { loading: isDeletingMultiple }] = useMutation(
    BATCH_DELETE_MOTTO,
    {
      refetchQueries: [MOTTOS],

      onCompleted() {
        enqueueSnackbar('Delete mottos successfully!', {
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
    isExchanging ||
    isDeletingMultiple

  return {
    loading,
    createMotto,
    exchangePosition,
    updateMottoById,
    deleteMottoById,
    deleteMottos
  }
}

export default useMotto
