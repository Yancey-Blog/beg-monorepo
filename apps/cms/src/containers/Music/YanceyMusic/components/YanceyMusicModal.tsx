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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderResponse } from 'src/components/Uploader/types'
import { parseSearch } from 'src/shared/utils'
import useStyles from 'src/shared/globalStyles'
import { IYanceyMusic } from '../types'

interface Props {
  open: boolean
  handleOpen: () => void
  createYanceyMusic: () => void
  updateYanceyMusicById: () => void
}

const YanceyMusicModal: FC<Props> = ({
  open,
  handleOpen,
  createYanceyMusic,
  updateYanceyMusicById
}) => {
  const { search, state } = useLocation()
  const { id } = parseSearch(search)

  const classes = useStyles()

  const initialValues = {
    title: '',
    soundCloudUrl: '',
    releaseDate: new Date(),
    posterUrl: ''
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    releaseDate: Yup.string().required('Release Date is required.'),
    soundCloudUrl: Yup.string().url().required('SoundCloud Url is required.'),
    posterUrl: Yup.string().url().required('Post Url is required.')
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
        await updateYanceyMusicById({
          variables: { input: { ...values, id } }
        })
      } else {
        await createYanceyMusic({ variables: { input: values } })
      }

      resetForm()
      handleOpen()
    }
  })

  const onChange = (data: UploaderResponse) => {
    setFieldValue('posterUrl', data.url)
  }

  useEffect(() => {
    resetForm()

    if (id) {
      const { title, soundCloudUrl, releaseDate, posterUrl } =
        state as IYanceyMusic

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setValues({ title, soundCloudUrl, releaseDate, posterUrl })
    }
  }, [id, resetForm, setValues, state])

  return (
    <Dialog open={open} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} a Yancey Music</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} a Yancey Music, please enter the
            following fields here. We will send data after clicking the submit
            button.
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
            error={!!errors.soundCloudUrl}
            helperText={errors.soundCloudUrl}
            required
            label="SoundCloud Url"
            fullWidth
            {...getFieldProps('soundCloudUrl')}
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
            <FormLabel required>Poster Url</FormLabel>
            <TextField
              variant="standard"
              error={!!errors.posterUrl}
              helperText={errors.posterUrl}
              style={{ display: 'none' }}
              required
              label="Poster Url"
              fullWidth
              disabled={true}
              {...getFieldProps('posterUrl')}
            />
            <Uploader
              onChange={onChange}
              defaultFile={getFieldProps('posterUrl').value}
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

export default YanceyMusicModal
