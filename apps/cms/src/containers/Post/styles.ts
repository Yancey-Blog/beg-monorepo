import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    editorWrapper: {
      marginTop: '8px',
      width: '100%'
    },

    header: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)'
    },

    publishTools: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },

    summary: { width: '50%', margin: '24px 0 48px' },

    chipInput: { margin: '24px 0 48px' },

    summaryTxtFiled: {
      marginBottom: '24px'
    },

    btn: { marginLeft: '16px', marginBottom: '16px' },

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
      position: 'relative',
      top: -6
    },

    search: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      zIndex: 1101
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
