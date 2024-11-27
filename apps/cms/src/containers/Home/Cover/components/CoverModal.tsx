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
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderResponse } from 'src/components/Uploader/types'
import useStyles from 'src/shared/globalStyles'
import { parseSearch } from 'src/shared/utils'
import { ICover } from '../types'

interface Props {
  open: boolean
  handleOpen: () => void
  createCover: () => void
  updateCoverById: () => void
}

const CoverModal: FC<Props> = ({
  open,
  handleOpen,
  createCover,
  updateCoverById
}) => {
  const classes = useStyles()

  const { search, state } = useLocation()
  const { id } = parseSearch(search)

  const initialValues = {
    title: '',
    coverUrl: '',
    isPublic: true
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    coverUrl: Yup.string().required('Cover Url is required.'),
    isPublic: Yup.boolean().required('Is Public is required.')
  })

  const {
    handleSubmit,
    getFieldProps,
    setValues,
    resetForm,
    isSubmitting,
    errors,
    setFieldValue,
    values
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await updateCoverById({
          variables: { input: { ...values, id } }
        })
      } else {
        await createCover({ variables: { input: values } })
      }

      resetForm()
      handleOpen()
    }
  })

  const onCoverUrlChange = (data: UploaderResponse) => {
    setFieldValue('coverUrl', data.url)
  }

  useEffect(() => {
    resetForm()

    if (id) {
      const { coverUrl, title, isPublic } = state as ICover
      setValues({ coverUrl, title, isPublic })
    }
  }, [id, resetForm, setValues, state])

  return (
    <Dialog open={open} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} a Cover</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} a Cover, please enter the following
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

          <div className={classes.uploaderGroup}>
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

          <div className={classes.uploaderGroup}>
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

export default CoverModal
