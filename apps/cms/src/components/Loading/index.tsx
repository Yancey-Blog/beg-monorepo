import CircularProgress from '@mui/material/CircularProgress'
import { makeStyles } from '@mui/styles'
import { FC } from 'react'

const useStyles = makeStyles({
  mask: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.4)',
    borderRadius: '4px',
    zIndex: 9999
  }
})

const Loading: FC = () => {
  const classes = useStyles()

  return (
    <section className={classes.mask}>
      <CircularProgress />
    </section>
  )
}

export default Loading
