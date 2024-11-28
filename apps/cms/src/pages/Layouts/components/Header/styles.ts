import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: '0 8px 0 16px',
    background: '#fff',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 10000,
    width: 'calc(100% - 260px)',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.6, 1)'
  },
  headerExpand: {
    width: 'calc(100% - 80px)',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.6, 1)'
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
