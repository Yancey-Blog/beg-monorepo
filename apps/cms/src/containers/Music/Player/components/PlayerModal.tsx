import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  FormLabel,
  Switch
} from '@mui/material'
import { useFormik } from 'formik'
import classNames from 'classnames'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderResponse } from 'src/components/Uploader/types'
import globalUseStyles from 'src/shared/globalStyles'
import { parseSearch } from 'src/shared/utils'
import useStyles from '../styles'
import { IPlayer } from '../types'

interface Props {
  open: boolean
  handleOpen: () => void
  createPlayer: () => void
  updatePlayerById: () => void
}

const PlayerModal: FC<Props> = ({
  open,
  handleOpen,
  createPlayer,
  updatePlayerById
}) => {
  const { search, state } = useLocation()
  const { id } = parseSearch(search)

  const globalClasses = globalUseStyles()
  const classes = useStyles()

  const initialValues = {
    title: '',
    artist: '',
    lrc: '[00:00.000]此歌曲为没有填词的纯音乐, 请您欣赏',
    coverUrl: '',
    musicFileUrl: '',
    isPublic: true
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    artist: Yup.string().required('Artist is required.'),
    lrc: Yup.string().required('LRC is required.'),
    coverUrl: Yup.string().required('CoverUrl is required.'),
    musicFileUrl: Yup.string().required('MusicFileUrl is required.'),
    isPublic: Yup.boolean().required('IsPublic is required.')
  })

  const {
    handleSubmit,
    setFieldValue,
    getFieldProps,
    setValues,
    resetForm,
    isSubmitting,
    errors,
    values
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await updatePlayerById({
          variables: { input: { ...values, id } }
        })
      } else {
        await createPlayer({ variables: { input: values } })
      }

      resetForm()
      handleOpen()
    }
  })

  const onCoverUrlChange = (data: UploaderResponse) => {
    setFieldValue('coverUrl', data.url)
  }

  const onMusicFileUrlChange = (data: UploaderResponse) => {
    setFieldValue('musicFileUrl', data.url)
  }

  useEffect(() => {
    resetForm()

    if (id) {
      const { title, artist, lrc, coverUrl, musicFileUrl, isPublic } =
        state as IPlayer

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
      setValues({ title, artist, lrc, coverUrl, musicFileUrl, isPublic })
    }
  }, [id, resetForm, setValues, state])

  return (
    <Dialog open={open} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} a Music Track</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} a Music Track, please enter the following
            fields here. We will send data after clicking the submit button.
          </DialogContentText>

          <TextField
            variant="standard"
            className={globalClasses.textFieldSpace}
            error={!!errors.title}
            helperText={errors.title}
            autoFocus
            required
            label="Title"
            fullWidth
            {...getFieldProps('title')}
          />

          <TextField
            variant="standard"
            className={globalClasses.textFieldSpace}
            error={!!errors.artist}
            helperText={errors.artist}
            required
            label="Artist"
            fullWidth
            {...getFieldProps('artist')}
          />

          <TextField
            variant="standard"
            className={globalClasses.textFieldSpace}
            error={!!errors.lrc}
            helperText={errors.lrc}
            required
            label="LRC"
            fullWidth
            multiline
            rows="10"
            {...getFieldProps('lrc')}
          />

          <div className={globalClasses.uploaderGroup}>
            <FormLabel required>Cover Url</FormLabel>
            <TextField
              variant="standard"
              error={!!errors.coverUrl}
              helperText={errors.coverUrl}
              style={{ display: 'none' }}
              required
              label="Cover Url"
              fullWidth
              disabled={true}
              {...getFieldProps('coverUrl')}
            />
            <Uploader
              onChange={onCoverUrlChange}
              defaultFile={getFieldProps('coverUrl').value}
            />
          </div>

          <div
            className={classNames(
              globalClasses.uploaderGroup,
              classes.btnUploaderGroup
            )}
          >
            <FormLabel required>Music File Url</FormLabel>
            <TextField
              variant="standard"
              error={!!errors.musicFileUrl}
              helperText={errors.musicFileUrl}
              style={{ display: 'none' }}
              required
              label="Music File Url"
              fullWidth
              disabled={true}
              {...getFieldProps('musicFileUrl')}
            />
            <Uploader
              onChange={onMusicFileUrlChange}
              type="simple"
              accept="audio/*"
              defaultFile={getFieldProps('musicFileUrl').value}
            />
          </div>

          <div className={globalClasses.uploaderGroup}>
            <FormLabel required>Is Public</FormLabel>
            <Switch
              color="primary"
              defaultChecked={values.isPublic || true}
              onChange={(e) =>
                setFieldValue('isPublic', e.target.checked, true)
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleOpen()}>
            Cancel
          </Button>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default PlayerModal
