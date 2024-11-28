import { useMutation } from '@apollo/client'
import { enqueueSnackbar } from 'notistack'
import {
  ANNOUNCEMENTS,
  BATCH_DELETE_ANNOUNCEMENT,
  CREATE_ONE_ANNOUNCEMENT,
  DELETE_ONE_ANNOUNCEMENT,
  EXCHANGE_POSITION,
  UPDATE_ONE_ANNOUNCEMENT
} from 'src/containers/Home/Announcement/typeDefs'

const useAnnouncement = () => {
  const [createAnnouncement, { loading: isCreating }] = useMutation(
    CREATE_ONE_ANNOUNCEMENT,
    {
      refetchQueries: [ANNOUNCEMENTS],

      onCompleted() {
        enqueueSnackbar('Create announcement successfully!', {
          variant: 'success'
        })
      },

      onError() {}
    }
  )

  const [updateAnnouncementById, { loading: isUpdating }] = useMutation(
    UPDATE_ONE_ANNOUNCEMENT,
    {
      refetchQueries: [ANNOUNCEMENTS],

      onCompleted() {
        enqueueSnackbar('Update announcement successfully!', {
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

  const [deleteAnnouncementById, { loading: isDeletingOne }] = useMutation(
    DELETE_ONE_ANNOUNCEMENT,
    {
      refetchQueries: [ANNOUNCEMENTS],

      onCompleted() {
        enqueueSnackbar('Delete announcement successfully!', {
          variant: 'success'
        })
      },

      onError() {}
    }
  )

  const [deleteAnnouncements, { loading: isDeletingMultiple }] = useMutation(
    BATCH_DELETE_ANNOUNCEMENT,
    {
      refetchQueries: [ANNOUNCEMENTS],

      onCompleted() {
        enqueueSnackbar('Delete announcements successfully!', {
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
    createAnnouncement,
    exchangePosition,
    updateAnnouncementById,
    deleteAnnouncementById,
    deleteAnnouncements
  }
}

export default useAnnouncement
