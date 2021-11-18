import { makeStyles, createStyles } from '@mui/styles'
import { createTheme, adaptV4Theme } from '@mui/material/styles'

const theme = createTheme(
  adaptV4Theme({
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
)

export const tableTheme = () =>
  createTheme(
    adaptV4Theme({
      overrides: {
        // @ts-ignore
        MUIDataTableFilter: {
          resetLink: {
            color: 'transparent',
            width: 100,
            '&::after': {
              content: '"Clear All"',
              color: '#3f51b5',
              position: 'absolute',
              width: 100,
              left: -10
            }
          }
        },
        MUIDataTableFilterList: {
          chip: {
            display: 'none'
          }
        },
        MUIDataTableHead: {
          responsiveStacked: {
            [theme.breakpoints.down('md')]: {
              display: 'table-header-group'
            }
          }
        },
        MuiTableCell: {
          head: {
            [theme.breakpoints.down('md')]: {
              display: 'none'
            }
          }
        },
        MUIDataTableSelectCell: {
          root: {
            [theme.breakpoints.down('md')]: {
              display: 'table-cell'
            }
          }
        },
        MUIDataTableToolbar: {
          filterPaper: {
            [theme.breakpoints.down('md')]: {
              width: '75%',
              maxWidth: '90%'
            },
            [theme.breakpoints.down('sm')]: {
              width: '90%'
            }
          }
        }
      }
    })
  )

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
