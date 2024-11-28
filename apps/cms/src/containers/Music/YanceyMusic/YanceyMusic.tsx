import { useMutation, useQuery } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { FC } from 'react'
import YanceyMusicTable from './components/YanceyMusicTable'
import {
  BATCH_DELETE_YANCEY_MUSIC,
  CREATE_ONE_YANCEY_MUSIC,
  DELETE_ONE_YANCEY_MUSIC,
  UPDATE_ONE_YANCEY_MUSIC,
  YANCEY_MUSIC
} from './typeDefs'
import { IYanceyMusic, Query } from './types'

const YanceyMusic: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(YANCEY_MUSIC, {
    notifyOnNetworkStatusChange: true
  })

  const [createYanceyMusic] = useMutation(CREATE_ONE_YANCEY_MUSIC, {
    refetchQueries: [YANCEY_MUSIC],

    update(proxy, { data: { createYanceyMusic } }) {
      const data = proxy.readQuery<Query>({ query: YANCEY_MUSIC })

      if (data) {
        proxy.writeQuery({
          query: YANCEY_MUSIC,
          data: {
            ...data,
            getYanceyMusic: [createYanceyMusic, ...data.getYanceyMusic]
          }
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('Create success!', { variant: 'success' })
    },
    onError() {}
  })

  const [updateYanceyMusicById] = useMutation(UPDATE_ONE_YANCEY_MUSIC, {
    refetchQueries: [YANCEY_MUSIC],

    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
    }
  })

  const [deleteYanceyMusicById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_YANCEY_MUSIC,
    {
      refetchQueries: [YANCEY_MUSIC],

      update(proxy, { data: { deleteYanceyMusicById } }) {
        const data = proxy.readQuery<Query>({ query: YANCEY_MUSIC })

        if (data) {
          proxy.writeQuery({
            query: YANCEY_MUSIC,
            data: {
              getYanceyMusic: data.getYanceyMusic.filter(
                (yanceyMusic: IYanceyMusic) =>
                  yanceyMusic._id !== deleteYanceyMusicById._id
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

  const [deleteYanceyMusic, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_YANCEY_MUSIC,
    {
      refetchQueries: [YANCEY_MUSIC],

      update(proxy, { data: { deleteYanceyMusic } }) {
        const data = proxy.readQuery<Query>({ query: YANCEY_MUSIC })

        if (data) {
          proxy.writeQuery({
            query: YANCEY_MUSIC,
            data: {
              getYanceyMusic: data.getYanceyMusic.filter(
                (yanceyMusic: IYanceyMusic) =>
                  !deleteYanceyMusic.ids.includes(yanceyMusic._id)
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
    <YanceyMusicTable
      dataSource={data ? data.getYanceyMusic : []}
      isFetching={isFetching}
      isDeleting={isDeleting}
      isBatchDeleting={isBatchDeleting}
      createYanceyMusic={createYanceyMusic}
      updateYanceyMusicById={updateYanceyMusicById}
      deleteYanceyMusicById={deleteYanceyMusicById}
      deleteYanceyMusic={deleteYanceyMusic}
    />
  )
}

export default YanceyMusic
