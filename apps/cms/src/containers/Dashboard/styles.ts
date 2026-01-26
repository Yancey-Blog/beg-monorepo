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
    },

    serverStatusWrapper: {
      width: '100%',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      boxShadow:
        'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px!important',
      borderRadius: '16px!important'
    },

    serverStatusItem: {
      borderRadius: 16,
      border: 0
    }
  })
)

export default useStyles