import { useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { FC } from 'react'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'
import SettingWrapper from '../components/SettingWrapper/SettingWrapper'
import DeleteAccount from './components/DeleteAccount'
import UpdateEmail from './components/UpdateEmail'
import UpdateUserName from './components/UpdateUserName'
import { DELETE_ACCOUNT, UPDATE_EMAIL, UPDATE_USERNAME } from './typeDefs'

const Account: FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [updateUserName] = useMutation(UPDATE_USERNAME, {
    onCompleted(data) {
      if (data.updateUserName) {
        enqueueSnackbar(`Your username has been updated! Please Re-Login.`, {
          variant: 'success'
        })
      }
    }
  })

  const [updateEmail] = useMutation(UPDATE_EMAIL, {
    onCompleted(data) {
      if (data.updateEmail) {
        enqueueSnackbar(`Your email has been updated! Please Re-Login.`, {
          variant: 'success'
        })
      }
    }
  })

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

  return (
    <SettingWrapper>
      <SettingsHeader
        title="Account"
        subTitle="Change your own username, email or delete your account"
      />

      <UpdateUserName updateUserName={updateUserName} username={''} />
      <UpdateEmail updateEmail={updateEmail} email={''} />
      <DeleteAccount
        deleteAccount={deleteAccount}
        isDeletingAccount={isDeletingAccount}
      />
    </SettingWrapper>
  )
}

export default Account
