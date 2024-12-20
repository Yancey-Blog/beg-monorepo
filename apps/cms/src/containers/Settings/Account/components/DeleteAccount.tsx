import { Button, Checkbox, FormControlLabel } from '@mui/material'
import { FC, useState } from 'react'
import { AZURE_BLOB_PATH } from 'src/shared/constants'
import SettingItemWrapper from '../../components/SettingItemWrapper'
import useStyles from '../styles'
import useAccount from '../useAccount'

const DeleteAccount: FC = () => {
  const classes = useStyles()
  const { loading, deleteAccount } = useAccount()

  const [checked, setChecked] = useState(false)

  return (
    <SettingItemWrapper
      title="Delete Account"
      imageUrl={`${AZURE_BLOB_PATH}/activitycontrols_scene.png`}
    >
      <p className={classes.tip}>
        You're trying to delete your Account, which provides access to various
        Yancey Blog services. You'll no longer be able to use any of those
        services, and your account and data will be lost.
      </p>

      <FormControlLabel
        className={classes.sureToDeleteAccount}
        value={checked}
        control={
          <Checkbox
            color="primary"
            onChange={(e) => setChecked(e.target.checked)}
          />
        }
        label={
          <b className={classes.checkboxLabel}>
            Yes, I want to permanently delete this Yancey Blog CMS Account and
            all its data.
          </b>
        }
        labelPlacement="end"
      />

      <Button
        color="primary"
        variant="contained"
        disabled={!checked || loading}
        onClick={() => deleteAccount()}
      >
        Delete account
      </Button>
    </SettingItemWrapper>
  )
}

export default DeleteAccount
