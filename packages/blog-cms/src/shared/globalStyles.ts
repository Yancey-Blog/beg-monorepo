import { makeStyles, createStyles } from '@mui/styles'

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

    textFieldSpace: { marginBottom: 40 },

    editIcon: {
      cursor: 'pointer',
      marginRight: 16
    }
  })
)

export default useStyles
