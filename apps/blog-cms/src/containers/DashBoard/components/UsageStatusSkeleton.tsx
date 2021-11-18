import { FC } from 'react'
import { Card, Skeleton } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'

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
    },

    firstSkeleton: {
      float: 'right'
    },

    secondSkeleton: {
      margin: '0 auto 12px'
    }
  })
)

const UsageStatusSkeleton: FC = () => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Skeleton
        variant="text"
        animation="wave"
        width={100}
        className={classes.firstSkeleton}
      />
      <Skeleton
        variant="text"
        animation="wave"
        width={240}
        className={classes.secondSkeleton}
      />
      <Skeleton variant="rectangular" animation="wave" height={310} />
    </Card>
  )
}

export default UsageStatusSkeleton
