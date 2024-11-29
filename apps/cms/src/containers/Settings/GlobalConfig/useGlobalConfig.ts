import { useMutation } from '@apollo/client'
import { enqueueSnackbar } from 'notistack'
import { GLOBAL_SETTING, UPDATE_GLOBAL_SETTING_BY_ID } from './typeDefs'

const useGlobalConfig = () => {
  const [updateGlobalSettingById, { loading: isUpdating }] = useMutation(
    UPDATE_GLOBAL_SETTING_BY_ID,
    {
      refetchQueries: [GLOBAL_SETTING],

      onCompleted() {
        enqueueSnackbar('Update global config successfully!', {
          variant: 'success'
        })
      },

      onError() {}
    }
  )

  return {
    isUpdating,
    updateGlobalSettingById
  }
}

export default useGlobalConfig
