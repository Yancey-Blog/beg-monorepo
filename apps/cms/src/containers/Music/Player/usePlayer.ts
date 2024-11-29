import { useMutation } from '@apollo/client'
import { enqueueSnackbar } from 'notistack'
import {
  BATCH_DELETE_PLAYER,
  CREATE_ONE_PLAYER,
  DELETE_ONE_PLAYER,
  EXCHANGE_POSITION,
  PLAYERS,
  UPDATE_ONE_PLAYER
} from './typeDefs'

const usePlayer = () => {
  const [createPlayer, { loading: isCreating }] = useMutation(
    CREATE_ONE_PLAYER,
    {
      refetchQueries: [PLAYERS],
      onCompleted() {
        enqueueSnackbar('Create player success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [updatePlayerById, { loading: isUpdating }] = useMutation(
    UPDATE_ONE_PLAYER,
    {
      refetchQueries: [PLAYERS],
      onCompleted() {
        enqueueSnackbar('Update player success!', { variant: 'success' })
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

  const [deletePlayerById, { loading: isDeletingOne }] = useMutation(
    DELETE_ONE_PLAYER,
    {
      refetchQueries: [PLAYERS],
      onCompleted() {
        enqueueSnackbar('Delete player successfully!', {
          variant: 'success'
        })
      },
      onError() {}
    }
  )

  const [deletePlayers, { loading: isDeletingMultiple }] = useMutation(
    BATCH_DELETE_PLAYER,
    {
      refetchQueries: [PLAYERS],
      onCompleted() {
        enqueueSnackbar('Delete players successfully!', {
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
    isDeletingMultiple ||
    isExchanging

  return {
    loading,
    createPlayer,
    updatePlayerById,
    deletePlayerById,
    deletePlayers,
    exchangePosition
  }
}

export default usePlayer
