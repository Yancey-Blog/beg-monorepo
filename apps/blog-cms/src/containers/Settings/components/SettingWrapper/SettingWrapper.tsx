import { FC } from 'react'
import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    settingWrapper: {
      display: 'block',
      width: '100%'
    }
  })
)

const SettingWrapper: FC = ({ children }) => {
  const classes = useStyles()

  return <section className={classes.settingWrapper}>{children}</section>
}

export default SettingWrapper