import { useMutation, useQuery } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { FC } from 'react'
import PlayerTable from './components/PlayerTable'
import {
  BATCH_DELETE_PLAYER,
  CREATE_ONE_PLAYER,
  DELETE_ONE_PLAYER,
  EXCHANGE_POSITION,
  PLAYERS,
  UPDATE_ONE_PLAYER
} from './typeDefs'
import { IPlayer, Query } from './types'

const Player: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(PLAYERS, {
    notifyOnNetworkStatusChange: true
  })

  const [createPlayer] = useMutation(CREATE_ONE_PLAYER, {
    refetchQueries: [PLAYERS],

    update(proxy, { data: { createPlayer } }) {
      const data = proxy.readQuery<Query>({ query: PLAYERS })

      if (data) {
        proxy.writeQuery({
          query: PLAYERS,
          data: {
            ...data,
            getPlayers: [createPlayer, ...data.getPlayers]
          }
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('Create success!', { variant: 'success' })
    },
    onError() {}
  })

  const [updatePlayerById] = useMutation(UPDATE_ONE_PLAYER, {
    refetchQueries: [PLAYERS],

    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
    }
  })

  const [exchangePosition, { loading: isExchanging }] = useMutation(
    EXCHANGE_POSITION,
    {
      refetchQueries: [PLAYERS],

      onCompleted() {
        enqueueSnackbar('Update success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [deletePlayerById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_PLAYER,
    {
      refetchQueries: [PLAYERS],

      update(proxy, { data: { deletePlayerById } }) {
        const data = proxy.readQuery<Query>({ query: PLAYERS })

        if (data) {
          proxy.writeQuery({
            query: PLAYERS,
            data: {
              getPlayers: data.getPlayers.filter(
                (player: IPlayer) => player._id !== deletePlayerById._id
              )
            }
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('Delete success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [deletePlayers, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_PLAYER,
    {
      refetchQueries: [PLAYERS],

      update(proxy, { data: { deletePlayers } }) {
        const data = proxy.readQuery<Query>({ query: PLAYERS })

        if (data) {
          proxy.writeQuery({
            query: PLAYERS,
            data: {
              getPlayers: data.getPlayers.filter(
                (player: IPlayer) => !deletePlayers.ids.includes(player._id)
              )
            }
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('Delete success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  return (
    <PlayerTable
      dataSource={data ? data.getPlayers : []}
      isFetching={isFetching}
      isExchanging={isExchanging}
      isDeleting={isDeleting}
      isBatchDeleting={isBatchDeleting}
      createPlayer={createPlayer}
      updatePlayerById={updatePlayerById}
      deletePlayerById={deletePlayerById}
      deletePlayers={deletePlayers}
      exchangePosition={exchangePosition}
    />
  )
}

export default Player
