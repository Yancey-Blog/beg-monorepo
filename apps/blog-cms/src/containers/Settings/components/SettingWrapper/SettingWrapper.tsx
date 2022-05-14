import { FC, ReactNode } from 'react'
import { makeStyles, createStyles } from '@mui/styles'

export interface Props {
  children?: ReactNode
}

const useStyles = makeStyles(() =>
  createStyles({
    settingWrapper: {
      display: 'block',
      width: '100%'
    }
  })
)

const SettingWrapper: FC<Props> = ({ children }) => {
  const classes = useStyles()

  return <section className={classes.settingWrapper}>{children}</section>
}

export default SettingWrapper
