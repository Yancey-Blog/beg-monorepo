import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  TextField
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useFormik } from 'formik'
import { DateTime } from 'luxon'
import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Uploader from 'src/components/Uploader'
import { UploaderResponse } from 'src/components/Uploader/types'
import useStyles from 'src/shared/globalStyles'
import { parseSearch } from 'src/shared/utils'
import * as Yup from 'yup'
import useLiveTour from '../useLiveTour'

interface Props {
  open: boolean
  handleOpen: () => void
}

const LiveTourModal: FC<Props> = ({ open, handleOpen }) => {
  const { search, state } = useLocation()
  const { id } = parseSearch(search)
  const { createLiveTour, updateLiveTourById } = useLiveTour()
  const classes = useStyles()

  const initialValues = {
    title: '',
    showTime: DateTime.now(),
    posterUrl: ''
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    showTime: Yup.string().required('Show Time is required.'),
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
      if (typeof id === 'string') {
        await updateLiveTourById({
          variables: { input: { ...values, id } }
        })
      } else {
        await createLiveTour({ variables: { input: values } })
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
      const { title, showTime, posterUrl } = state

      setValues({
        title,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        showTime: DateTime.fromISO(showTime),
        posterUrl
      })
    }
  }, [id, resetForm, setValues, state])

  return (
    <Dialog open={open} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} a Live Tour</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} a Live Tour, please enter the following
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

          <DatePicker
            className={classes.textFieldSpace}
            label="Show Time"
            value={values.showTime}
            onChange={(date) => setFieldValue('showTime', date, true)}
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

export default LiveTourModal
