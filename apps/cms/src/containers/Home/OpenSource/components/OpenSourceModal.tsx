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
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderResponse } from 'src/components/Uploader/types'
import { parseSearch } from 'src/shared/utils'
import useStyles from 'src/shared/globalStyles'
import { IOpenSource } from '../types'

interface Props {
  open: boolean
  handleOpen: () => void
  createOpenSource: () => void
  updateOpenSourceById: () => void
}

const OpenSourceModal: FC<Props> = ({
  open,
  handleOpen,
  createOpenSource,
  updateOpenSourceById
}) => {
  const { search, state } = useLocation()
  const { id } = parseSearch(search)

  const classes = useStyles()

  const initialValues = {
    title: '',
    description: '',
    url: '',
    posterUrl: ''
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    description: Yup.string().required('Description is required.'),
    url: Yup.string().url().required('URL is required.'),
    posterUrl: Yup.string().url().required('Post Url is required.')
  })

  const {
    handleSubmit,
    setFieldValue,
    getFieldProps,
    setValues,
    resetForm,
    isSubmitting,
    errors
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await updateOpenSourceById({
          variables: { input: { ...values, id } }
        })
      } else {
        await createOpenSource({ variables: { input: values } })
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
      const { title, description, url, posterUrl } = state as IOpenSource
      setValues({ title, description, url, posterUrl })
    }
  }, [id, resetForm, setValues, state])

  return (
    <Dialog open={open} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} an Open Source</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} an Open Source, please enter the
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
            id="title"
            label="Title"
            fullWidth
            {...getFieldProps('title')}
          />
          <TextField
            variant="standard"
            className={classes.textFieldSpace}
            error={!!errors.description}
            helperText={errors.description}
            required
            label="Description"
            fullWidth
            {...getFieldProps('description')}
          />
          <TextField
            variant="standard"
            className={classes.textFieldSpace}
            error={!!errors.url}
            helperText={errors.url}
            required
            label="Url"
            fullWidth
            {...getFieldProps('url')}
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

export default OpenSourceModal
