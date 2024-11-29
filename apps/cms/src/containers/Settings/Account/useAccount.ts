import { useMutation } from '@apollo/client'
import { enqueueSnackbar } from 'notistack'
import { DELETE_ACCOUNT, UPDATE_EMAIL, UPDATE_USERNAME } from './typeDefs'

const useAccount = () => {
  const [updateUserName, { loading: isUpdatingUserName }] = useMutation(
    UPDATE_USERNAME,
    {
      onCompleted(data) {
        if (data.updateUserName) {
          enqueueSnackbar(`Your username has been updated! Please Re-Login.`, {
            variant: 'success'
          })
        }
      }
    }
  )

  const [updateEmail, { loading: isUpdatingEmail }] = useMutation(
    UPDATE_EMAIL,
    {
      onCompleted(data) {
        if (data.updateEmail) {
          enqueueSnackbar(`Your email has been updated! Please Re-Login.`, {
            variant: 'success'
          })
        }
      }
    }
  )

  const [deleteAccount, { loading: isDeletingAccount }] = useMutation(
    DELETE_ACCOUNT,
    {
      onCompleted() {
        enqueueSnackbar(
          `Your account has been deleted successfully! Just fuck off.`,
          {
            variant: 'success'
          }
        )
      }
    }
  )

  return {
    loading: isUpdatingUserName || isUpdatingEmail || isDeletingAccount,
    updateUserName,
    updateEmail,
    deleteAccount
  }
}

export default useAccount
