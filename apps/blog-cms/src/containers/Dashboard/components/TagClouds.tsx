import { FC } from 'react'
import { Paper, Chip } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import PostRankListSkeleton from './PostRankListSkeleton'

interface Props {
  tags: string[]
  loading: boolean
}

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: 16,
      overflowY: 'scroll',
      boxShadow:
        'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px!important',
      borderRadius: '16px!important'
    },

    chip: {
      margin: 8
    },

    header: {
      marginBottom: 16,
      fontSize: 16,
      fontWeight: 600
    }
  })
)

const TagClouds: FC<Props> = ({ tags, loading }) => {
  const classes = useStyles()

  return (
    <>
      {loading ? (
        <PostRankListSkeleton />
      ) : (
        <Paper className={classes.paper}>
          {' '}
          <header className={classes.header}>Tag Clouds</header>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              color="primary"
              className={classes.chip}
            />
          ))}
        </Paper>
      )}
    </>
  )
}

export default TagClouds
