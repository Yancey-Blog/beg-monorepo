import { FC } from 'react'
import { Card, Skeleton } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import SkeletonIterator from 'src/components/SkeletonIterator/SkeletonIterator'

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      padding: 16,
      boxShadow:
        'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
      borderRadius: 16
    },

    header: {
      marginBottom: 32
    },

    skeletonItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 8,
      paddingBottom: 8
    },

    skeletonMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    avatar: {
      marginRight: 16
    }
  })
)

const PostRankListSkeleton: FC = () => {
  const classes = useStyles()

  const SkeletonItem = () => (
    <div className={classes.skeletonItem}>
      <div className={classes.skeletonMeta}>
        <Skeleton
          variant="circular"
          animation="wave"
          width={40}
          height={40}
          className={classes.avatar}
        />
        <Skeleton variant="text" animation="wave" width={240} />
      </div>
      <Skeleton variant="rectangular" animation="wave" width={18} height={18} />
    </div>
  )

  return (
    <Card className={classes.card} elevation={0}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={200}
        className={classes.header}
      />
      <SkeletonIterator count={5} skeletonComponent={SkeletonItem} />
    </Card>
  )
}

export default PostRankListSkeleton
