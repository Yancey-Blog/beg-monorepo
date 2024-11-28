import { useMutation, useQuery } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { FC } from 'react'
import MottoTable from './components/MottoTable'
import {
  BATCH_DELETE_MOTTO,
  CREATE_ONE_MOTTO,
  DELETE_ONE_MOTTO,
  EXCHANGE_POSITION,
  MOTTOS,
  UPDATE_ONE_MOTTO
} from './typeDefs'
import { IMotto, Query } from './types'

const Motto: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(MOTTOS, {
    notifyOnNetworkStatusChange: true
  })

  const [createMotto] = useMutation(CREATE_ONE_MOTTO, {
    refetchQueries: [MOTTOS],

    update(proxy, { data: { createMotto } }) {
      const data = proxy.readQuery<Query>({ query: MOTTOS })

      if (data) {
        proxy.writeQuery({
          query: MOTTOS,
          data: {
            ...data,
            getMottos: [createMotto, ...data.getMottos]
          }
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('Create success!', { variant: 'success' })
    },
    onError() {}
  })

  const [updateMottoById] = useMutation(UPDATE_ONE_MOTTO, {
    refetchQueries: [MOTTOS],

    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
    },
    onError() {}
  })

  const [exchangePosition, { loading: isExchanging }] = useMutation(
    EXCHANGE_POSITION,
    {
      refetchQueries: [MOTTOS],

      onCompleted() {
        enqueueSnackbar('Update success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [deleteMottoById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_MOTTO,
    {
      refetchQueries: [MOTTOS],

      update(proxy, { data: { deleteMottoById } }) {
        const data = proxy.readQuery<Query>({ query: MOTTOS })

        if (data) {
          proxy.writeQuery({
            query: MOTTOS,
            data: {
              getMottos: data.getMottos.filter(
                (announcement: IMotto) =>
                  announcement._id !== deleteMottoById._id
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

  const [deleteMottos, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_MOTTO,
    {
      refetchQueries: [MOTTOS],

      update(proxy, { data: { deleteMottos } }) {
        const data = proxy.readQuery<Query>({ query: MOTTOS })

        if (data) {
          proxy.writeQuery({
            query: MOTTOS,
            data: {
              getMottos: data.getMottos.filter(
                (announcement: IMotto) =>
                  !deleteMottos.ids.includes(announcement._id)
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
    <MottoTable
      dataSource={data ? data.getMottos : []}
      isFetching={isFetching}
      isDeleting={isDeleting}
      isExchanging={isExchanging}
      isBatchDeleting={isBatchDeleting}
      createMotto={createMotto}
      updateMottoById={updateMottoById}
      deleteMottoById={deleteMottoById}
      deleteMottos={deleteMottos}
      exchangePosition={exchangePosition}
    />
  )
}

export default Motto
