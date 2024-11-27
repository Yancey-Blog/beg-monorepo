import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // @ts-ignore
    flexDirection: 'row!important',
    padding: '12px 24px 48px',
    backgroundColor: 'transparent!important',
    boxShadow: 'none!important'
  },
  fabIcon: {
    color: '#999!important',
    backgroundColor: '#fff!important',
    boxShadow: `0 2px 2px 0 rgba(153, 153, 153, 0.14),
        0 3px 1px -2px rgba(153, 153, 153, 0.2),
        0 1px 5px 0 rgba(153, 153, 153, 0.12)`,
    '&:hover': { backgroundColor: '#fff' }
  },
  left: {
    display: 'flex',
    alignItems: 'center'
  },

  title: {
    marginLeft: '24px',
    color: '#000'
  },

  marginRight: {
    marginRight: '24px!important'
  },

  anchor: {
    color: '#000',

    '&:hover': {
      textDecoration: 'none'
    }
  },

  menu: {
    '& .MuiListItemIcon-root': {
      minWidth: 42
    }
  }
})

export default useStyles
