import { createTheme } from '@mui/material/styles'
import { createStyles, makeStyles } from '@mui/styles'

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
})

const useStyles = makeStyles(() =>
  createStyles({
    addIconFab: {
      boxShadow: 'none!important',
      background: 'none!important',
      color: 'rgba(0, 0, 0, 0.54)'
    },

    uploaderGroup: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 40
    },

    textFieldSpace: { marginTop: 20, marginBottom: 20 },

    editIcon: {
      cursor: 'pointer',
      marginRight: 16
    }
  })
)

export default useStyles
