import {
  Avatar,
  Button,
  Card,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import { ChangeEvent, FC, useState } from 'react'
import SettingItemWrapper from '../../components/SettingItemWrapper'
import useStyles from '../styles'
import { PostFilterProps } from '../types'
import useGlobalConfig from '../useGlobalConfig'

type Props = PostFilterProps & { cvPostId: string }

const CVPicker: FC<Props> = ({
  id,
  posts,
  isFetching,
  fetchPosts,
  cvPostId
}) => {
  const classes = useStyles()

  const { updateGlobalSettingById, isUpdating } = useGlobalConfig()
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
      variables: { input: { cvPostId: checked, id } }
    })
  }

  return (
    <SettingItemWrapper title="CV Post">
      <p className={classes.checkedId}>post ID: {cvPostId}</p>

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
              <ListItem key={post._id} dense>
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
              disabled={!checked || isUpdating}
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

export default CVPicker
