import { FC } from 'react'
import SettingsHeader from '../components/SettingsHeader'
import SettingWrapper from '../components/SettingWrapper'
import DeleteAccount from './components/DeleteAccount'
import UpdateEmail from './components/UpdateEmail'
import UpdateUserName from './components/UpdateUserName'

const Account: FC = () => {
  return (
    <SettingWrapper>
      <SettingsHeader
        title="Account"
        subTitle="Change your own username, email or delete your account"
      />

      <UpdateUserName />
      <UpdateEmail />
      <DeleteAccount />
    </SettingWrapper>
  )
}

export default Account
