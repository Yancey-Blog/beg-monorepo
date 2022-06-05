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
  FormLabel
} from '@mui/material'
import { useFormik } from 'formik'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import useStyles from 'src/shared/globalStyles'
import { parseSearch } from 'src/shared/utils'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderResponse } from 'src/components/Uploader/types'
import { IBestAlbum } from '../types'

interface Props {
  open: boolean
  handleOpen: Function
  createBestAlbum: Function
  updateBestAlbumById: Function
}

const BestAlbumModal: FC<Props> = ({
  open,
  handleOpen,
  createBestAlbum,
  updateBestAlbumById
}) => {
  const { search, state } = useLocation()
  const { id } = parseSearch(search)

  const classes = useStyles()

  const initialValues = {
    title: '',
    artist: '',
    mvUrl: '',
    releaseDate: new Date(),
    coverUrl: ''
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    artist: Yup.string().required('Artist is required.'),
    mvUrl: Yup.string().url().required('Mv Url is required.'),
    releaseDate: Yup.string().required('Release Date is required.'),
    coverUrl: Yup.string().url().required('Post Url is required.')
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
        await updateBestAlbumById({
          variables: { input: { ...values, id } }
        })
      } else {
        await createBestAlbum({
          variables: {
            input: { ...values }
          }
        })
      }

      resetForm()
      handleOpen()
    }
  })

  const onChange = (data: UploaderResponse) => {
    setFieldValue('coverUrl', data.url)
  }

  useEffect(() => {
    resetForm()

    if (id) {
      const { title, artist, mvUrl, releaseDate, coverUrl } =
        state as IBestAlbum

      // @ts-ignore
      setValues({ title, artist, mvUrl, releaseDate, coverUrl })
    }
  }, [id, resetForm, setValues, state])

  return (
    <Dialog open={open} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} a Best Album</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} a Best Album, please enter the following
            fields here. We will send data after clicking the submit button.
          </DialogContentText>
          <TextField
            variant="standard"
            className={classes.textFieldSpace}
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
            className={classes.textFieldSpace}
            error={!!errors.artist}
            helperText={errors.artist}
            required
            label="Artist"
            fullWidth
            {...getFieldProps('artist')}
          />

          <TextField
            variant="standard"
            className={classes.textFieldSpace}
            error={!!errors.mvUrl}
            helperText={errors.mvUrl}
            required
            label="Mv Url"
            fullWidth
            {...getFieldProps('mvUrl')}
          />

          <DesktopDatePicker
            className={classes.textFieldSpace}
            renderInput={(props) => <TextField {...props} />}
            label="Release Date"
            value={values.releaseDate}
            onChange={(date) => setFieldValue('releaseDate', date, true)}
            inputFormat="yyyy/LL/dd"
          />

          <div className={classes.uploaderGroup}>
            <FormLabel required>Cover Url</FormLabel>
            <TextField
              variant="standard"
              error={!!errors.coverUrl}
              helperText={errors.coverUrl}
              style={{ display: 'none' }}
              required
              label="CoverUrl"
              fullWidth
              disabled={true}
              {...getFieldProps('coverUrl')}
            />
            <Uploader
              onChange={onChange}
              defaultFile={getFieldProps('coverUrl').value}
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

export default BestAlbumModal
