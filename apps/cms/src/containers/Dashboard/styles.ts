import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    dashboardWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    },

    group: {
      display: 'flex',
      gap: 16
    }
  })
)

export default useStyles
