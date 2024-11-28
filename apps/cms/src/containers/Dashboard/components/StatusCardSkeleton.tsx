import { Card, Skeleton } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { FC } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      padding: 16,
      boxShadow:
        'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px!important',
      borderRadius: '16px!important'
    },

    skeleton: {
      margin: '8px 0 36px'
    }
  })
)

const StatusCardSkeleton: FC = () => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Skeleton variant="text" animation="wave" width={100} />
      <Skeleton
        variant="rectangular"
        animation="wave"
        className={classes.skeleton}
      />
      <Skeleton variant="text" animation="wave" width={200} />
    </Card>
  )
}

export default StatusCardSkeleton
