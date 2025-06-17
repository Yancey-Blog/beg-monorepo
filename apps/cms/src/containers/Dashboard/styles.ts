import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    dashboradWrapper: {
      width: '100%'
    },

    group: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gridColumnGap: 16,
      gridTemplateRows: '375px 375px 375px',
      gridRowGap: 16,
      marginBottom: 16
    }
  })
)

export default useStyles
