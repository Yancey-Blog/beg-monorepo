import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    postDetailWrapper: {
      width: '100%',
      overflowY: 'scroll',
      display: 'flex',
      gap: 16
    },

    editorWrapper: {
      borderRadius: 8,
      width: '100%',
      height: 'calc(100dvh - 144px)',
      overflowX: 'scroll'
    },

    form: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 400,
      flex: 1,
      justifyContent: 'space-between'
    },

    formItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    },

    action: {
      display: 'flex'
    },

    actionCell: {
      display: 'flex',
      alignItems: 'center',
      height: '100%'
    },

    summaryTxtFiled: {
      marginBottom: '24px'
    },

    pagination: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '24px'
    },

    selector: {
      '& .MuiSelect-select': {
        paddingTop: 0,
        paddingBottom: 0
      }
    },

    uploadImageIcon: {
      width: 128,
      height: 128,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    search: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      zIndex: 0
    },
    input: {
      marginLeft: '16px',
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    },
    tableWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    headerWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16
    }
  })
)

export default useStyles
