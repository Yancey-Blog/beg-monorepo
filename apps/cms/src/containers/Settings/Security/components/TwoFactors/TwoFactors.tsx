import {
  ArrowForwardIos,
  SentimentDissatisfied,
  SentimentVerySatisfied
} from '@mui/icons-material'
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { FC, useState } from 'react'
import SettingItemWrapper from 'src/containers/Settings/components/SettingItemWrapper/SettingItemWrapper'
import { AZURE_BLOB_PATH } from 'src/shared/constants'
import RecoveryCodes from '../RecoveryCodes/RecoveryCodes'
import TOTP from '../TOTP/TOTP'
import styles from './twoFactors.module.scss'

const TwoFactors: FC = () => {
  const [openTOTP, setOpenTOTP] = useState(false)
  const [openRecoveryCodes, setOpenRecoveryCodes] = useState(false)

  const isTOTP = false

  const openRecoveryCodesDialog = () => {
    if (!isTOTP) {
      enqueueSnackbar('Please turn on Authenticator app options first!', {
        variant: 'error'
      })
      return
    }
    setOpenRecoveryCodes(true)
  }

  return (
    <>
      <SettingItemWrapper
        title="Two-factor Authentication"
        imageUrl={`${AZURE_BLOB_PATH}/recovery_scene.png`}
      >
        <List
          component="nav"
          aria-label="two-factor-nav"
          className={styles.listGroup}
        >
          <ListItem button onClick={() => setOpenTOTP(true)}>
            <ListItemText
              primary="Authenticator app"
              className={styles.title}
            />
            <ListItemText
              className={styles.title}
              primary={
                <div className={styles.isUseTOTP}>
                  {isTOTP ? (
                    <SentimentVerySatisfied />
                  ) : (
                    <SentimentDissatisfied />
                  )}

                  <span className={styles.phone}>
                    {isTOTP ? 'Enable' : 'Disable'}
                  </span>
                </div>
              }
            />
            <ListItemAvatar>
              <ArrowForwardIos className={styles.arrowIcon} />
            </ListItemAvatar>
          </ListItem>

          <Divider />

          <ListItem button onClick={openRecoveryCodesDialog}>
            <ListItemText primary="Recovery codes" className={styles.title} />
            <ListItemText
              primary={<p className={styles.phone}>Click to generate</p>}
              className={styles.title}
            />
            <ListItemAvatar>
              <ArrowForwardIos className={styles.arrowIcon} />
            </ListItemAvatar>
          </ListItem>
        </List>
      </SettingItemWrapper>

      <TOTP setOpen={setOpenTOTP} open={openTOTP} />
      <RecoveryCodes setOpen={setOpenRecoveryCodes} open={openRecoveryCodes} />
    </>
  )
}

export default TwoFactors
