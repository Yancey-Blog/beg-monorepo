import { FC } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import {
  COVERS,
  CREATE_ONE_COVER,
  UPDATE_ONE_COVER,
  DELETE_ONE_COVER,
  BATCH_DELETE_COVERS,
  BATCH_PUBLIC_COVERS,
  EXCHANGE_POSITION
} from './typeDefs'
import { ICover, Query } from './types'
import CoverTable from './components/CoverTable'

const Cover: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(COVERS, {
    notifyOnNetworkStatusChange: true
  })

  const [createCover] = useMutation(CREATE_ONE_COVER, {
    refetchQueries: [COVERS],

    update(proxy, { data: { createCover } }) {
      const data = proxy.readQuery<Query>({ query: COVERS })

      if (data) {
        proxy.writeQuery({
          query: COVERS,
          data: {
            ...data,
            getCovers: [createCover, ...data.getCovers]
          }
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('Create success!', { variant: 'success' })
    },
    onError() {}
  })

  const [updateCoverById] = useMutation(UPDATE_ONE_COVER, {
    refetchQueries: [COVERS],

    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
    },
    onError() {}
  })

  const [exchangePosition, { loading: isExchanging }] = useMutation(
    EXCHANGE_POSITION,
    {
      onCompleted() {
        enqueueSnackbar('Update success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [publicCovers, { loading: isPublicCovers }] = useMutation(
    BATCH_PUBLIC_COVERS,

    {
      refetchQueries: [COVERS],
      update(proxy, { data: { publicCovers } }) {
        const data = proxy.readQuery<Query>({ query: COVERS })

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const res = data.getCovers.map((cover) =>
          publicCovers.ids.includes(cover._id) ? (cover.isPublic = false) : null
        )

        if (data) {
          proxy.writeQuery({
            query: COVERS,
            data: {
              ...data,
              getCovers: [...res]
            }
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('Update success!', { variant: 'success' })
      },
      onError() {}
    }
  )

  const [deleteCoverById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_COVER,
    {
      refetchQueries: [COVERS],
      update(proxy, { data: { deleteCoverById } }) {
        const data = proxy.readQuery<Query>({ query: COVERS })

        if (data) {
          proxy.writeQuery({
            query: COVERS,
            data: {
              getCovers: data.getCovers.filter(
                (cover: ICover) => cover._id !== deleteCoverById._id
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

  const [deleteCovers, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_COVERS,
    {
      refetchQueries: [COVERS],

      update(proxy, { data: { deleteCovers } }) {
        const data = proxy.readQuery<Query>({ query: COVERS })

        if (data) {
          proxy.writeQuery({
            query: COVERS,
            data: {
              getCovers: data.getCovers.filter(
                (announcement: ICover) =>
                  !deleteCovers.ids.includes(announcement._id)
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
    <CoverTable
      dataSource={data ? data.getCovers : []}
      isFetching={isFetching}
      isDeleting={isDeleting}
      isExchanging={isExchanging}
      isBatchDeleting={isBatchDeleting}
      isPublicCovers={isPublicCovers}
      deleteCoverById={deleteCoverById}
      createCover={createCover}
      updateCoverById={updateCoverById}
      deleteCovers={deleteCovers}
      exchangePosition={exchangePosition}
      publicCovers={publicCovers}
    />
  )
}

export default Cover
