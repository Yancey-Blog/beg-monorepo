import { FC } from 'react'
import { makeStyles } from '@mui/styles'
import { AZURE_BLOB_PATH } from 'src/shared/constants'
import SettingItemWrapper from '../../../components/SettingItemWrapper/SettingItemWrapper'

const useStyles = makeStyles({
  tip: {
    position: 'absolute',
    top: '72px',
    width: '460px',
    fontSize: '14px',
    color: '#5f6368'
  }
})

const SecurityIntro: FC = () => {
  const classes = useStyles()

  return (
    <SettingItemWrapper
      title="We keep your account protected"
      imageUrl={`${AZURE_BLOB_PATH}/securitycheckup_scene.png`}
    >
      <p className={classes.tip}>
        The Security Checkup gives you personalized recommendations to secure
        your account.
      </p>
    </SettingItemWrapper>
  )
}

export default SecurityIntro
