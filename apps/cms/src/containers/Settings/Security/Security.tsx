import { FC } from 'react'
import ChangePassword from './components/ChangePassword/ChangePassword'
import TwoFactors from './components/TwoFactors/TwoFactors'
import SecurityIntro from './components/SecurityIntro/SecurityIntro'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'
import SettingWrapper from '../components/SettingWrapper/SettingWrapper'

const Security: FC = () => {
  return (
    <SettingWrapper>
      <SettingsHeader
        title="Security"
        subTitle="Settings and recommendations to help you keep your account secure"
      />
      <SecurityIntro />
      <ChangePassword />
      <TwoFactors />
    </SettingWrapper>
  )
}

export default Security
