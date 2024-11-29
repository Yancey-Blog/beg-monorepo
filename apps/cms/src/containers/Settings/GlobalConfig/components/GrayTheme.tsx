import { FormControlLabel, Switch } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GlobalSettingModel } from 'backend/src/__generated__/graphql'
import { ChangeEvent, FC } from 'react'
import SettingItemWrapper from '../../components/SettingItemWrapper'
import useGlobalConfig from '../useGlobalConfig'

interface Props {
  globalSettings?: GlobalSettingModel
}

const useStyles = makeStyles(() =>
  createStyles({
    label: {
      marginLeft: 0
    }
  })
)

const GrayTheme: FC<Props> = ({ globalSettings }) => {
  const classes = useStyles()

  const { isUpdating, updateGlobalSettingById } = useGlobalConfig()

  const handleSwitchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!globalSettings) return

    await updateGlobalSettingById({
      variables: {
        input: { isGrayTheme: e.target.checked, id: globalSettings._id }
      }
      // optimisticResponse: {
      //   updateGlobalSettingById: {
      //     ...globalSettings,
      //     __typename: 'GlobalSettingModel',
      //     isGrayTheme: e.target.checked
      //   }
      // }
    })
  }

  if (!globalSettings) return null

  return (
    <SettingItemWrapper title="Gray Theme">
      <FormControlLabel
        className={classes.label}
        control={
          <Switch
            checked={globalSettings.isGrayTheme}
            onChange={handleSwitchChange}
            color="primary"
            disabled={isUpdating}
          />
        }
        label="Is Gray Theme?"
        labelPlacement="start"
      />
    </SettingItemWrapper>
  )
}

export default GrayTheme
