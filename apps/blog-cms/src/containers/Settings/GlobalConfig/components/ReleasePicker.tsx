import { FC, useState, ChangeEvent } from 'react'
import {
  Button,
  TextField,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemIcon,
  RadioGroup,
  Radio,
  Card
} from '@mui/material'
import SettingItemWrapper from '../../components/SettingItemWrapper/SettingItemWrapper'
import { PostFilterProps } from '../types'
import useStyles from '../styles'

type Props = PostFilterProps & { releasePostId: string }

const ReleasePicker: FC<Props> = ({
  id,
  posts,
  isFetching,
  isSubmitting,
  fetchPosts,
  releasePostId,
  updateGlobalSettingById
}) => {
  const classes = useStyles()

  const [searchValue, setSearchValue] = useState('')
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const [checked, setChecked] = useState('')
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.value)
  }

  const onResetRadio = () => {
    setChecked('')
  }

  const onSubmit = async () => {
    await updateGlobalSettingById({
      variables: { input: { releasePostId: checked, id } }
    })
  }

  return (
    <SettingItemWrapper title="Release Post">
      <p className={classes.checkedId}>post ID: {releasePostId}</p>

      <TextField
        variant="standard"
        className={classes.input}
        label="Search Posts By Title"
        onChange={handleInputChange}
      />
      <Button
        className={classes.searchBtn}
        color="primary"
        variant="contained"
        type="submit"
        disabled={!searchValue.trim() || isFetching}
        onClick={() => fetchPosts(searchValue)}
      >
        Search
      </Button>

      {posts.length > 0 ? (
        <Card className={classes.card}>
          <RadioGroup value={checked} onChange={handleRadioChange}>
            {posts.map((post) => (
              <ListItem key={post._id} button dense>
                <ListItemIcon>
                  <Radio edge="start" value={post._id} />
                </ListItemIcon>
                <ListItemAvatar>
                  <Avatar alt={post.title} src={post.posterUrl} />
                </ListItemAvatar>
                <ListItemText primary={post.title} />
              </ListItem>
            ))}
          </RadioGroup>

          <div className={classes.btnGroup}>
            <Button type="reset" onClick={onResetRadio}>
              Reset
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={!checked || isSubmitting}
              onClick={onSubmit}
            >
              Save
            </Button>
          </div>
        </Card>
      ) : null}
    </SettingItemWrapper>
  )
}

export default ReleasePicker
