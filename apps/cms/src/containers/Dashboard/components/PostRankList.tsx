import { Looks3, Looks4, Looks5, LooksOne, LooksTwo } from '@mui/icons-material'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { FC } from 'react'
import { IPostItem } from 'src/containers/Post/types'
import { PostRankListType } from '../types'
import PostRankListSkeleton from './PostRankListSkeleton'

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      display: 'grid',
      boxShadow:
        'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px!important',
      borderRadius: '16px!important'
    },

    list: {
      width: '100%'
    },

    header: {
      marginTop: 16,
      marginLeft: 16,
      fontSize: 16,
      fontWeight: 600
    }
  })
)

interface Props {
  type: PostRankListType
  topPosts: IPostItem[]
  loading: boolean
}

const numbersIcon = [
  <LooksOne />,
  <LooksTwo />,
  <Looks3 />,
  <Looks4 />,
  <Looks5 />
]

const PostRankList: FC<Props> = ({ type, topPosts, loading }) => {
  const classes = useStyles()

  const renderType = (post: IPostItem) => {
    if (type === PostRankListType.PV) {
      return `(PV: ${post.pv})`
    }

    return `(Like: ${post.like})`
  }

  return (
    <Paper className={classes.paper}>
      {loading ? (
        <PostRankListSkeleton />
      ) : (
        <>
          <header className={classes.header}>
            TOP 5 POSTS BY {type === PostRankListType.PV ? 'PV' : 'LIKE'}
          </header>

          <List className={classes.list}>
            {topPosts.map((post, index) => (
              <ListItem key={post._id}>
                <ListItemAvatar>
                  <Avatar src={post.posterUrl} />
                </ListItemAvatar>
                <ListItemText primary={`${post.title} ${renderType(post)}`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="number">
                    {numbersIcon[index]}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Paper>
  )
}

export default PostRankList
